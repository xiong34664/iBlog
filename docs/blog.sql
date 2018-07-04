/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50553
Source Host           : 127.0.0.1:3306
Source Database       : node

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-07-04 17:17:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `isdel` int(1) NOT NULL DEFAULT '0' COMMENT '0 ''未删除'' 1 ''已删除''',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'root', '123456', '小黑', '0');
INSERT INTO `user` VALUES ('10', 'xiaoba', '123456', '小白', '0');
INSERT INTO `user` VALUES ('8', 'xb', '123456', '小小白', '0');
INSERT INTO `user` VALUES ('2', 'xiaohei', '123456', '小小黑', '0');
INSERT INTO `user` VALUES ('5', 'xiaobai', '123456', '小白', '0');

DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text,
  `ctime` varchar(255) NOT NULL,
  `authorId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES ('1', '1', '111', '2017-12-12 10:55:34', '2');
INSERT INTO `articles` VALUES ('2', '1', '# 111', '2017-12-12 10:57:05', '2');
INSERT INTO `articles` VALUES ('3', '2', '22222', '2017-12-12 11:14:51', '2');
INSERT INTO `articles` VALUES ('4', '3', '333', '2017-12-12 11:16:08', '2');
INSERT INTO `articles` VALUES ('5', '4', '444', '2017-12-12 11:17:33', '2');
INSERT INTO `articles` VALUES ('6', '5', '555', '2017-12-12 11:20:18', '2');
INSERT INTO `articles` VALUES ('7', '6', '666', '2017-12-12 11:20:36', '5');
INSERT INTO `articles` VALUES ('8', 'Node.js', '##这个博客以后可以做什么\r\n1. 可以自己尝试着买一个月的阿里 ECS 服务器（不要买虚拟主机）\r\n2. 可以使用Node，利用博客的一些技术点，自己做一个 完整的、带有前后台交互的网站\r\n3. 把做好的网站，部署到自己的 阿里云 ECS 服务器中\r\n4. 这样，只要你把 自己服务器的IP地址，以 80 端口暴露出来，这样，别人就能随时访问你的网站了；\r\n5. 对于网站开发来说，前端是颜值， 后端是灵魂；', '2017-12-12 11:32:04', '1');
INSERT INTO `articles` VALUES ('9', '移动App', '## 什么是移动App开发\r\n\r\n+ 这些软件是如何开发出来的？\r\n+ 安卓和苹果共有的软件，又是如何开发出来的？\r\n\r\n关于移动App开发，我们需要知道的几个概念：\r\n\r\n+ 原生开发：\r\n+ 混合开发：\r\n+ 什么是`移动App`，和我们之前学的`移动Web`有什么区别？\r\n - App是`Application`的缩写，含义为：`“可安装的应用程序”`；\r\n    + 常见的App，按照`平台`分为两部分：\r\n     - 一部分是PC端的可执行程序：\r\n       + 浏览器、WebStorm、Sublime、VSCode、电脑QQ、电脑游戏\r\n     - 一部分为移动端的应用程序：\r\n       + 手机浏览器、手机QQ、手机微信、支付宝、手机游戏\r\n    + 常见的App，按照`功能`，分为`应用`和`游戏`两部分；\r\n+ 什么是Web：特指基于浏览器开发的网站（说白了就是运行在浏览器中的网页）；\r\n+ Web特点：Web网站是由好多页面组成的，基于Http协议的请求响应模型，运行在浏览器之中；', '2017-12-12 11:40:21', '2');
INSERT INTO `articles` VALUES ('10', '这是李四发表的文章1', '李四啊1', '2017-12-12 11:45:57', '2');
INSERT INTO `articles` VALUES ('11', '为什么活得这么累', '+ 因为穷？\r\n+ 因为长的太帅了，长的帅的人，总要比别人多承受一些东西；所以活得累；\r\n+ 你哪儿来的自信？？？', '2017-12-12 15:10:41', '1');
INSERT INTO `articles` VALUES ('12', 'CSS实现图片轮播', 'jsn打开就能打开金三顺看撒看见你谁看谁骄傲看见你萨科技男就拿上吧ja', '2018-07-03 21:51:23', '8');
INSERT INTO `articles` VALUES ('13', '你好啊  123123', '这是我的第一篇文章', '2018-07-04 15:40:34', '8');
INSERT INTO `articles` VALUES ('14', '你好吧', '这是我的第二篇文章', '2018-07-04 15:44:55', '8');
