const express = require("express")
const app = express()
const session = require('express-session')
const artTemplate = require('art-template');
const bodyParser = require("body-parser")
const router = require("./router/router")
const MongoStore  = require("connect-mongo")(session);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 

app.engine('html',require('express-art-template'));

app.use("/node_modules/", express.static('./node_modules/'));
app.use("/public/", express.static('./public/'));

app.use(session({
  // 生成密文是有一套算法的来计算生成密文，如果网站都使用默认的密文生成方式， 就会有一定的重复和被破解的概率，所以为了增加这个安全性，算法对外暴露了一个混入私钥的接口，算法在生成密文的时候会混入我们添加的自定义成分
  secret: 'blog',
  resave: false,
  name: "session_id",
  // 如果为 true 无论是否往 Session 中存储数据，都直接给客户端发送一个 Cookie 小票
  // 如果为 false，则只有在往 Session 中写入数据的时候才会下发小票
  // 推荐设置为 true
  saveUninitialized: true,
  store:new MongoStore({
        url: 'mongodb://localhost/user',  //数据库的地址  shop是数据库名
        touchAfter: 24 * 3600   // 通过这样做，设置touchAfter:24 * 3600，您在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
    })
}))

app.use(router)

app.listen(3000, function (req, res) {
	console.log("server running...");
})





