// 在这里定义和用户相关的路由处理函数，供/router/user.js模块进行调用
// 导入数据库操作模块
const db = require("../db/index");

exports.topUp = (req, res) => {
  //@ 接受表单数据
  const orderinfo = req.body;

  //@ 判断数据是否合法
  if (!orderinfo.phone || !orderinfo.rmb) {
    // return res.send({ status: 1, message: "手机号码或充值金额不能为空！" });
    return res.render("RES",{Flag : 1 ,msg : "手机号码或充值金额不能为空！！"})
  }

  //@ 执行SQL语句判断用户名是否被占用
  // 定义SQL语句
  const sqlStr_1 = "select * from users where phone=?";
  db.query(sqlStr_1, orderinfo.phone, (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      return res.cc(err);
    }
    if (results.length == 0) {
      // return res.cc("该手机号码未开户！");
      return res.render("RES",{Flag : 2 ,msg : "该手机号码未开户！"})

    }
    const userInfo = results[0];
    let newRMB;
    newRMB = userInfo.rmb + parseFloat(orderinfo.rmb);
    console.log(newRMB)
    const updataRMB = "update users set rmb=? where id=?";
    db.query(
        updataRMB,
        [newRMB,userInfo.id],
        function (err, results) {
          if (err) return res.cc(err);      
        }
      );
    const sqlStr_2 = "insert into TopUpLog set ?";
    db.query(
      sqlStr_2,
      { userid: userInfo.id, username: userInfo.name, Mid: orderinfo.device, topUpRMB: orderinfo.rmb },
      function (err, results) {
        if (err) return res.cc(err);      
        // res.cc("充值成功！", 0);
        return res.render("RES",{Flag : 0 ,msg : "充值成功！！"})
      }
    );
  });
};

