/*
 * @Author: xiong34664 
 * @Date: 2018-07-02 00:24:27 
 * 业务逻辑模块  只负责处理业务逻辑
 */
//导入操作数据库的文件
const conn = require('./model.js')

const moment = require('moment')
// 导入 mditor
const mditor = require('mditor')
const parser = new mditor.Parser()

function showIndexPage(req, res) {
    // res.send('这个基本的服务器已经可以运行了！')
    // console.log(req.session.islogin)
    // console.log(req.session.user)

    // 获取文章首页的数据

    let list = [] // 文章列表
    // 获取当前要显示的页码值
    const nowPage = parseInt(req.query.page) || 1
    // 每页显示的记录条数
    const pageSize = 5

    // -- LIMIT 0, 2    获取第1页      (页码值 - 1) * 每页显示的记录条数     ( nowPage - 1 ) * pageSize
    // -- LIMIT 2, 2    获取第2页
    // -- LIMIT 4, 2    获取第3页
    // -- LIMIT 6, 2    获取第4页

    const sqlStr = `select articles.*, user.nickname 
    from articles LEFT JOIN user 
    ON articles.authorId=user.id  
    order by id desc
    LIMIT ${ (nowPage - 1) * pageSize}, ${pageSize};
    select count(*) as totalcount from articles;`

    conn.query(sqlStr, (err, results) => {
        // 把文章列表，赋值给 list
        list = results[0]
        // 获取到总记录条数
        const totalcount = results[1][0].totalcount

        res.render('./index.ejs', {
            islogin: req.session.islogin,
            user: req.session.user,
            list, // 文章列表
            totalPage: Math.ceil(totalcount / pageSize), //总页数
            nowPage // 当前的页码
        })
    })
}

const showRegPage = (req, res) => {
    res.render('./user/register.ejs', {})
}

const login = (req, res) => {
    const data = req.body
    conn.query('select *from user where username = ?', data.username, (err, results) => {
        if (err) return res.json({ err_code: 1, message: '登录失败' })
        if (results.length !== 1) return res.json({ err_code: 1, message: '该用户暂未注册' })
        if (results[0].password !== data.password) return res.json({ err_code: 1, message: '密码错误' })
        req.session.islogin = true
        req.session.user = results[0]
        res.json({ err_code: 0, message: '登录成功' })
    })
}

const showLoginPage = (req, res) => {
    res.render('./user/login.ejs', {})
}

const regNewUser = (req, res) => {
    //注册业务逻辑分析
    //注意在后端开发中 更多的是处理业务逻辑  在后端中  业务逻辑会比较复杂  因此  你的流程一定要严谨
    //既然后端的业务逻辑比较复杂  所以 后端静态会画业务逻辑流程图
    const data = req.body

    if (data.username.length <= 0 || data.password.length <= 0 || data.nickname.length <= 0) {
        //注册失败表单不完整
        return res.json({ err_code: 1, message: '注册失败,请填写完整的表单数据' })
    }
    //检测是否别占用
    conn.query('select count(*) as count from user where username =?', data.username, (err, results) => {
        if (err) return res.json({ err_code: 1, message: '注册用户失败' })
        if (results[0].count !== 0) return res.json({ err_code: 1, message: '此用户已被占有,请更换其他用户名重试' })
        conn.query('insert into user set ?', data, (err, results) => {
            if (err) return res.json({ err_code: 1, message: '注册用户失败' })
            if (results.affectedRows !== 1) return res.json({ err_code: 1, message: '注册用户失败' })
            res.json({ err_code: 0, message: '注册用户成功' })
        })
    })
}

const logout = (req, res) => {
    //注销Session登录
    req.session.destroy((err) => {
        //express 服务器端跳转的方法
        res.redirect('/')
    })
}

const showAddArticlePage = (req, res) => {
    if (!req.session.islogin) return res.redirect('/login')
    res.render('./article/add.ejs', {
        islogin: req.session.islogin,
        user: req.session.user
    })
}

const addNewArticle = (req, res) => {
    if (!req.session.islogin) return res.redirect('/login')
    const article = req.body
    article.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
    const sqlStr = 'insert into articles set ?'
    conn.query(sqlStr, article, (err, results) => {
        if (err || results.affectedRows != 1) return res.json({ err_code: 1, message: '发表文章失败！' })
        res.json({ err_code: 0, message: '发表文章成功，可以跳转到文章详情页面去查看！', id: results.insertId })
    })
}

const showArticleInfoPage = (req, res) => {
    const id = req.query.id
    let articleInfo = {}
    const sqlStr = 'select articles.*, user.nickname from articles LEFT JOIN user ON articles.authorId=user.id where articles.id =?'
    conn.query(sqlStr, id, (err, results) => {
        if (results.length === 1) articleInfo = results[0]
        // 在渲染文章页面之前，先对文章的内容，做转换，转为 html 格式
        articleInfo.content = parser.parse(articleInfo.content || '')
        // 渲染文章详情页面
        res.render('./article/info.ejs', {
            islogin: req.session.islogin,
            user: req.session.user,
            article: articleInfo
        })
    })
}

const showEditArticlePage = (req, res) => {
    if (!req.session.islogin) return res.redirect('/login')
    const id = req.query.id
    const sql = 'select * from articles where id=?'
    conn.query(sql, id, (err, results) => {
        // 如果 执行Sql语句失败，则直接跳转到首页
        if (err) return res.redirect('/')
        // 如果查询到的文章数据为空，则直接跳转到首页
        if (results.length !== 1) return res.redirect('/')

        // 当获取到文章的信息后，应该先和当作登录人的Id进行对比，如果相同，才显示编辑页面，否则直接跳转到首页
        if (results[0].authorId != req.session.user.id) return res.redirect('/')

        res.render('./article/edit.ejs', {
            islogin: req.session.islogin,
            user: req.session.user,
            article: results[0]
        })
    })
}

const editArticle = (req, res) => {
    if (!req.session.islogin) return res.redirect('/login')
    const article = req.body
    const sqlStr = 'update articles set ? where id = ?'
    conn.query(sqlStr, [article, article.id], (err, results) => {
        if (err || results.affectedRows !== 1) return res.json({ err_code: 1, message: '更新文章失败！' })
        res.json({ err_code: 0, message: '更新文章成功！' })
    })
}

const searchArticle = (req,res) => {
    const keyword = req.query.keyword

    let list = [] // 文章列表
    // 获取当前要显示的页码值
    const nowPage = parseInt(req.query.page) || 1
    // 每页显示的记录条数
    const pageSize = 5

    // -- LIMIT 0, 2    获取第1页      (页码值 - 1) * 每页显示的记录条数     ( nowPage - 1 ) * pageSize
    // -- LIMIT 2, 2    获取第2页
    // -- LIMIT 4, 2    获取第3页
    // -- LIMIT 6, 2    获取第4页

    const sqlStr = `select articles.*, user.nickname 
    from articles LEFT JOIN user 
    ON articles.authorId=user.id where title LIKE '%${keyword}%' 
    order by id desc
    LIMIT ${ (nowPage - 1) * pageSize}, ${pageSize};
    select count(*) as totalcount from articles where title LIKE '%${keyword}%';`

    conn.query(sqlStr, (err, results) => {
        // 把文章列表，赋值给 list
        list = results[0]
        // 获取到总记录条数
        const totalcount = results[1][0].totalcount

        res.render('./search.ejs', {
            islogin: req.session.islogin,
            user: req.session.user,
            list, // 文章列表
            totalPage: Math.ceil(totalcount / pageSize), //总页数
            nowPage, // 当前的页码
            keyword  //当前搜索得到关键词
        })
    })

}

module.exports = {
    showIndexPage,  //显示主页
    showRegPage,    //显示注册页面
    regNewUser,     //注册
    showLoginPage,  //显示登录页面
    login,         //登录
    logout,           //退出登录
    showAddArticlePage,  //展示添加文章页面
    addNewArticle,     //发表文章页面
    showArticleInfoPage,  //展示文章详情
    showEditArticlePage,  //请求文章编辑页面
    editArticle,           //编辑文章
    searchArticle          //搜索文章
}