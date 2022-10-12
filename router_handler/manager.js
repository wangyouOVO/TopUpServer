// 在这里定义和用户相关的路由处理函数，供/router/user.js模块进行调用
// 导入数据库操作模块
const db = require("../db/index");

exports.showManagerWin = (req ,res ) =>{
    res.render("Register");
}

// 注册用户的处理函数
exports.regUser = (req, res) => {
  //@ 接受表单数据
  const userinfo = req.body;

  //@ 判断数据是否合法
  if (!userinfo.username || !userinfo.phone ) {
    return res.send({ status: 1, message: "开户人姓名，手机号不能为空！" });
  }

  //@ 执行SQL语句判断用户名是否被占用
  // 定义SQL语句
  const sqlStr_1 = "select * from users where phone=?";
  db.query(sqlStr_1, userinfo.phone, (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      //   return res.send({ status: 1, message: err.message });
      return res.cc(err);
    }

    if (results.length > 0) {

      return res.cc("该手机号已开户！请换手机号重试");
    }

    // @插入新用户
    const sqlStr_2 = "insert into users set ?";
    const preRMB = 0;
    db.query(
      sqlStr_2,
      { name: userinfo.username, phone: userinfo.phone ,rmb: preRMB},
      function (err, results) {
        if (err) return res.cc(err);
        res.cc("注册成功！", 0);
      }
    );
  });
};

