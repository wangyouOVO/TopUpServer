// 在这里定义和用户相关的路由处理函数，供/router/user.js模块进行调用
// 导入数据库操作模块
const db = require("../db/index");

exports.showManagerWin = (req, res) => {
  res.render("Register");
}

// 注册用户的处理函数
exports.regUser = (req, res) => {
  //@ 接受数据
  var userinfo = {
    username: req.query.name,
    phone: req.query.phone
  };
  //@ 判断数据是否合法
  if (!userinfo.username || !userinfo.phone) {
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
      { name: userinfo.username, phone: userinfo.phone, rmb: preRMB },
      function (err, results) {
        if (err) return res.cc(err);
        res.cc("注册成功！", 0);
      }
    );
  });
};

//统计终端流量
exports.trafficStatistic = (req, res) => {
  //@ 接受数据
  const queryData = req.query;
  //SELECT * FROM [表名] WHERE [字段名] BETWEEN 'yyyy-MM-dd hh:mm:ss.000' AND 'yyyy-MM-dd hh:mm:ss.999';
  //SELECT * FROM `表名` WHERE createAt BETWEEN DATE_FORMAT("2020-06-28 13:47:29",'%Y-%m-%d %H:%i:%s') AND DATE_FORMAT("2020-06-28 13:47:44",'%Y-%m-%d %H:%i:%s')
  //查询所有数据时
  if( queryData.Mid == 0 ){
      console.log("yes")
       // 定义SQL语句
      const sqlStr_1 = "SELECT * FROM TopUpLog WHERE time BETWEEN  '2022-10-01 00:00:00' AND '2022-10-10 23:59:59'";
      db.query(sqlStr_1, (err, results) => {
        console.log(results)
        console.log(typeof(results[0]?.time.toString()))
        console.log(results[0]?.time.toString())
      })
      res.cc("all", 0);
  }

  // //查询单独数据时
  // if (!userinfo.username || !userinfo.phone) {
  //   return res.send({ status: 1, message: "开户人姓名，手机号不能为空！" });
  // }

  
  // // 定义SQL语句
  // const sqlStr_1 = "select * from users where phone=?";
  // db.query(sqlStr_1, userinfo.phone, (err, results) => {
  //   // 执行 SQL 语句失败
  //   if (err) {
  //     //   return res.send({ status: 1, message: err.message });
  //     return res.cc(err);
  //   }

  //   if (results.length > 0) {

  //     return res.cc("该手机号已开户！请换手机号重试");
  //   }

  //   // @插入新用户
  //   const sqlStr_2 = "insert into users set ?";
  //   const preRMB = 0;
  //   db.query(
  //     sqlStr_2,
  //     { name: userinfo.username, phone: userinfo.phone, rmb: preRMB },
  //     function (err, results) {
  //       if (err) return res.cc(err);
  //       res.cc("注册成功！", 0);
  //     }
  //   );
  // });
};