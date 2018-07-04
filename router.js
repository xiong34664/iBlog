/*
 * @Author: xiong34664 
 * @Date: 2018-07-02 00:24:38 
 * 路由模块
 */
const express = require('express')
const router = express.Router()

//导入controller业务逻辑模块
const ctrl = require('./controller.js')

//监听根路径请求
router.get('/', ctrl.showIndexPage)

//获取注册页面
router.get('/register', ctrl.showRegPage)

router.post('/register', ctrl.regNewUser)

//获取登录页面
router.get('/login', ctrl.showLoginPage)

router.post('/login', ctrl.login)

//注销
router.get('/logout', ctrl.logout)

//展示添加文章页面
router.get('/article/add',ctrl.showAddArticlePage)

// 发表文章
router.post('/article/add', ctrl.addNewArticle)

// 展示文章详情页
router.get('/article/info', ctrl.showArticleInfoPage)

// 请求 文章编辑页面
router.get('/article/edit', ctrl.showEditArticlePage)

// 编辑文章
router.post('/article/edit', ctrl.editArticle)

//搜索文章
router.get('/search',ctrl.searchArticle)

module.exports = router