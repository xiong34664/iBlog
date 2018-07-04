/*
 * @Author: xiong34664 
 * @Date: 2018-06-30 15:51:22 
 * 项目入口文件
 */
const express = require('express')
//创建web服务器
const app = express()

//导入并注册express-session中间件
const session = require('express-session')
app.use(session({
  secret: 'keyboard cat',  //表示用来对SessionId加密的字符串 任意写
  resave: false,           //如果true 强制session储存到物理磁盘上  从而保证session不会丢失
  saveUninitialized: false  //如果true 表示强制没有初始化的session保存到storage中
}))
//当使用如上的步骤  配置完毕Session中间件之后 今后紫瑶能够访问到req  那么就能够访问到req.session这个对象

//配置模板引擎
//ejs模板引擎中默认文件后缀为ejs
app.set('wive engine','ejs')
app.set('views','./views')

//托管静态资源
app.use('/node_modules',express.static('./node_modules'))

//加载打印请求中间件
app.use(getInfo)

//注册解析表单的body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

//导入路由模块
const router = require('./router')
app.use(router)

//自定义时间格式模块
const moment = require('moment')

app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000')
})

//打印请求中间件
function getInfo(req,res,next) {
    console.log(`${req.method} ${moment().format("HH:mm:ss")} ${req.url}`)
    next()
}

//创建基本服务器
//创建路由
//因为要渲染  所以要创建模板引擎
//我们要渲染页面的时候想要美化样式就要用到bootstrap此时就要静态资源目录node_module