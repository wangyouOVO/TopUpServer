// 在这里定义和用户相关的路由处理函数，供/router/user.js模块进行调用
// 导入数据库操作模块
const { resolveInclude } = require("ejs");
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
  //仅获取今年的数据
  const year = new Date().getFullYear();
  const month = queryData.Month;

  var queryAllFun = () => {
    const queryDay = "SELECT * FROM trafficLog WHERE year=? AND month=?";
    db.query(queryDay, [year, month], (err, results) => {
      if (err) return res.cc(err);
      var dataDay = new Array(30).fill(0);
      for (var i = 0; i < results.length; i++) {
        dataDay[results[i].day - 1] = dataDay[results[i].day - 1] + results[i].rmb;
      }
      const queryMonth = "SELECT * FROM trafficLog WHERE year=?";
      db.query(queryMonth, [year], (err, results) => {
        if (err) return res.cc(err);
        var dataMonth = new Array(12).fill(0);
        for (var i = 0; i < results.length; i++) {
          dataMonth[results[i].month - 1] = dataMonth[results[i].month - 1] + results[i].rmb;
        }
        const respon = {
          status: 0,
          dataDay,
          dataMonth
        }
        console.log(respon);
        res.send(respon)
      })
    })
  }

  var queryforOneFun = () => {
    const queryDay = "SELECT * FROM trafficLog WHERE year=? AND month=? AND Mid=?";
    const queryMonth = "SELECT * FROM trafficLog WHERE year=? AND Mid=?";
    db.query(queryDay, [year, month, queryData.Mid], (err, results) => {
      if (err) return res.cc(err);
      var dataDay = new Array(30).fill(0);
      console.log(arr)
      for (var i = 0; i < results.length; i++) {
        dataDay[results[i].day - 1] = dataDay[results[i].day - 1] + results[i].rmb;
      }
      db.query(queryMonth, [year, queryData.Mid], (err, results) => {
        if (err) return res.cc(err);
        var dataMonth = new Array(12).fill(0);
        for (var i = 0; i < results.length; i++) {
          dataMonth[results[i].month - 1] = dataMonth[results[i].month - 1] + results[i].rmb;
        }
        const respon = {
          status: 0,
          dataDay,
          dataMonth
        }
        console.log(respon);
        res.send(respon)
      })
    })
  }

  //查询所有数据时
  if (queryData.Mid == 0) {

    console.log("查询所有终端流量")
    queryAllFun()

  } else {
    console.log("查询单个终端流量")
    queryforOneFun()
  }
};

//查询单个用户的充值记录
exports.reserchUser = (req, res) => {
  var userinfo = {
    phone: req.query.phone
  };
  if (!userinfo.phone) {
    return res.send({ status: 1, message: "查询手机号不能为空！" });
  }
  const queryUser = "select * from TopUpLog where userid=?";
  const queryUser1 = "select * from users where phone=?";
  db.query(queryUser1, userinfo.phone, (err, results) => {
    if (err) return res.cc(err);
    if(results.length == 0) return res.cc("该手机号未开户！");
    var respon = new Object();
    respon.remainRmb = results[0].rmb;
    db.query(queryUser, results[0].id, (err, results) => {
      if (err) return res.cc(err);
      respon.status = 0;
      respon.dataUser = results;
      console.log(respon)
      res.send(respon)

    })

  })


}

//获取最新充值记录
exports.askLog = (req, res) =>{
  const queryLastData = "select * from (select * from TopUpLog order by id desc limit 10) as a order by id;"
  db.query(
    queryLastData,
    function (err, results) {
      if (err) return res.cc(err);
      const respon = {
        status: 0,
        dataList: results
      }
      res.send(respon)
    }
  );
}