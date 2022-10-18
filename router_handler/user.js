// 在这里定义和用户相关的路由处理函数，供/router/user.js模块进行调用
// 导入数据库操作模块
const db = require("../db/index");
const config = require("../config")

// 选择充值终端
exports.selectTerminal = (req, res) => {
  const queryTerminals = "select * from TerminalList where status<2";
  db.query(queryTerminals, (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      return res.cc(err);
    }
    return res.render("select", {Terminals: results,ip: config.ip,port: config.port})
  })
}

exports.topUp = (req, res) => {
  //@ 接受表单数据
  const orderinfo = req.body;

  //@ 判断数据是否合法
  if (!orderinfo.phone || !orderinfo.rmb) {
    return res.render("RES", { status: 1, message: "注意：手机号码或充值金额不能为空！！可联系营业厅开户或自主开户", ip: config.ip, port: config.port })
  }

  //@ 执行SQL语句判断用户名是否被占用
  // 定义SQL语句
  const sqlStr_1 = "select * from users where phone=?";
  db.query(sqlStr_1, orderinfo.phone, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if (results.length == 0) {
      return res.render("RES", { status: 1, message: "注意：该手机号码未开户！！可联系营业厅开户或自主开户", ip: config.ip, port: config.port })

    }
    const userInfo = results[0];
    let newRMB;
    newRMB = userInfo.rmb + parseFloat(orderinfo.rmb);
    console.log(newRMB)
    //更新用户余额信息
    const updataRMB = "update users set rmb=? where id=?";
    db.query(
      updataRMB,
      [newRMB, userInfo.id],
      function (err, results) {
        if (err) return res.cc(err);
      }
    );

    //更新充值信息
    const sqlStr_2 = "insert into TopUpLog set ?";
    db.query(
      sqlStr_2,
      { userid: userInfo.id, username: userInfo.name, Mid: orderinfo.device, topUpRMB: orderinfo.rmb },
      function (err, results) {
        if (err) return res.cc(err);
      }
    );

    //更新流量信息
    const queryTraffic = "select * from trafficLog where year=? AND month=? AND day=? AND Mid=?";
    const addTraffic = "insert into trafficLog set ?";
    const updataTraffic = "update trafficLog set rmb=? , times=? where id=?";
    var date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    var addTrafficFun = () => {
      db.query(
        addTraffic,
        { year: year, month: month, day: day, times: 1, rmb: orderinfo.rmb, Mid: orderinfo.device },
        function (err, results) {
          if (err) {
            console.log("cuole2")
            return res.cc(err);
          }
          return res.render("RES", { status: 0, message: "恭喜你，充值成功！！", ip: config.ip, port: config.port, newRMB: newRMB })
        }
      );
    }
    var updataTrafficFun = (id, times, updatarmb) => {
      db.query(
        updataTraffic,
        [updatarmb, times, id],
        function (err, results) {
          if (err) {
            console.log("cuole1")
            return res.cc(err);
          }
          return res.render("RES", { status: 0, message: "恭喜你，充值成功！！", ip: config.ip, port: config.port, newRMB: newRMB })
        }
      );
    }
    db.query(
      queryTraffic,
      [year, month, day, orderinfo.device],
      function (err, results) {
        if (err) {
          console.log("cuole3")
          return res.cc(err);
        };
        if (results.length == 0) {
          addTrafficFun();
        } else {
          const id = results[0].id;
          console.log("-------")
          console.log(results[0].rmb)
          console.log(orderinfo.rmb)
          console.log(parseFloat(orderinfo.rmb))
          const updatarmb = (results[0].rmb + parseFloat(orderinfo.rmb)).toFixed(2);
          console.log(updatarmb)
          const times = results[0].times + 1;
          updataTrafficFun(id, times, updatarmb)
        }
      }
    );

  });
};

exports.rendertopup = (req,res) => {
  const Mid = Number(req.query.Mid) ;
  console.log(Mid)
  const queryTerminal = "select * from TerminalList where Mid=?";
  db.query(queryTerminal,Mid, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    console.log(results)
    return res.render("VM",{terminal: results[0],ip: config.ip,port: config.port})
  })
}