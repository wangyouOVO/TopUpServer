const express = require('express')
const bodyParser=require("body-parser");
// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据
// const ejs = require('ejs');
const path = require("path"); //Node.js内置模块



const app = express()
const port = 3000

// 配置cors跨域
const cors = require("cors");
app.use(cors());

// 配置解析表单数据的中间件application/x-www-form-urlencoded格式
app.use(express.urlencoded({ extended: false }));
// var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//配置ejs视图的目录
app.set("views", __dirname + "/views");    //    '/views代表存放视图的目录'
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

// 优化res.send()代码
// 响应数据的中间件,next交给后面的路由处理
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});


// 导入并注册新用户路由模块(里面可以调用res.cc了)
const userRouter = require("./router/user");
app.use("/user", userRouter);
// 导入并使用个人中心的路由模块
const managerRouter = require("./router/manager");
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use("/manager", managerRouter);


// app.post('/', urlencodedParser,function (req, res) {
//     console.log("收到了")
//     console.log(req.body)
//     // var html = "./view/VM.html"
//     // res.send({na: "OK"})
//     res.render("VM")
//   })

app.get('/', (req, res) => {
    console.log(req.query)
    // res.send('Hello World!')
    res.render("VM")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

