## 博客案例API接口

### 约定
+ 所有的后端接口 统一的访问地址是:http://127.0.0.1:3000
+ 数据可口返回的数据中,必须包含一个err_code 属性,其中0表示成功;1表示接口调用失败
+ 返回数据中,必须要包含一个message属性,这个message属性,表示服务器返回的数据

### 注册用户的API接口
API地址|/regNewUsers|
------|--------------|
请求类型|post
请求参数|`{username,password,nickname}`
请求返回数据类型|JSON
返回数据样式|`{"err_code": 0,"message": "注册用户成功"}`

### 登录帐号等API接口
API地址|/login|
------|--------------|
请求类型|POST
请求参数|{username,password}
请求返回数据类型|JSON
返回数据样式|`{"err_code": 0,"message": "登录成功"}`

### 添加文章的API接口
API地址|/article/add|
------|--------------|
请求类型|POST
请求参数|`{authorId,title,content}`
请求返回数据类型|JSON
返回数据样式|`{"err_code": 0,"message": "发表文章成功，可以跳转到文章详情页面去查看！","id": 14}`

### 编辑文章API接口
API地址|/article/edit|
------|--------------|
请求类型|POST
请求参数|`{id,title,content}`
请求返回数据类型|JSON
返回数据样式|`{"err_code": 0,"message": "更新文章成功！"}`

### 搜索文章API接口
API地址|/search?keyword=1|
------|--------------|
请求类型|GET
请求参数|{keyword}
请求返回数据类型|HTML
返回数据样式|

