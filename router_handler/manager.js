// 在这里定义和用户相关的路由处理函数，供/router/user.js模块进行调用
// 导入数据库操作模块
const { resolveInclude } = require("ejs");
const db = require("../db/index");
const config = require("../config")



// 展示注册界面
exports.showManagerWin = (req, res) => {
  res.render("Register", { ip: config.ip, port: config.port });
}

// 注册用户的处理函数
exports.regUser = (req, res) => {

  //@ 接受数据
  var userinfo = {
    username: req.query.name,
    phone: req.query.phone,
    app: req.query?.app
  };

  console.log(userinfo.app)
  console.log(userinfo.username)
  console.log(userinfo.phone)

  //@ 判断数据是否合法
  if (!userinfo.username || !userinfo.phone) {
    if (userinfo.app !== undefined) { return res.send({ status: 1, message: "开户人姓名，手机号不能为空！" }); }
    else
      return res.render("RES", { status: 1, message: "注意：开户人姓名，手机号不能为空！", ip: config.ip, port: config.port })
  }

  //@ 执行SQL语句判断用户名是否被占用
  const sqlStr_1 = "select * from users where phone=?";
  db.query(sqlStr_1, userinfo.phone, (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      //   return res.send({ status: 1, message: err.message });
      return res.cc(err);
    }

    if (results.length > 0) {
      if (userinfo.app !== undefined) { return res.send({ status: 1, message: "该手机号已开户！请换手机号重试！" }); }
      else
        return res.render("RES", { status: 1, message: "注意：该手机号已开户！请换手机号重试", ip: config.ip, port: config.port })
    }

    // @插入新用户
    const sqlStr_2 = "insert into users set ?";
    const preRMB = 0;
    db.query(
      sqlStr_2,
      { name: userinfo.username, phone: userinfo.phone, rmb: preRMB },
      function (err, results) {
        if (err) return res.cc(err);
        if (userinfo.app !== undefined) { return res.send({ status: 0, message: "恭喜你，开户成功!!" }); }
        else
          return res.render("RES", { status: 0, message: "恭喜你，开户成功!!", ip: config.ip, port: config.port, newRMB: 0 })
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
    if (results.length == 0) return res.cc("该手机号未开户！");
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
exports.askLog = (req, res) => {
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

//更新版本
exports.updataVersion = (req, res) => {
  const queryLastVeresion = "select * from TerminalList where id=1;"
  db.query(queryLastVeresion, (err, results) => {
    if (err) return res.cc(err);
    const newversion = results[0].version + 1
    const updataversion = "update TerminalList set version=? ;"
    db.query(updataversion, [newversion], (err, results) => {
      if (err) return res.cc(err);
      return res.send({ status: 0, message: "更新成功！", version: newversion })
    })
  })
}

//添加终端
exports.addTerminal = (req, res) => {
  const terminalinfo = req.query;
  //@ 判断数据是否合法
  if (!terminalinfo.Mid || !terminalinfo.address) {
    return res.send({ status: 1, message: "注册终端信息不能为空！" });
  }
  const queryTerminal = "select * from TerminalList where Mid=?";
  db.query(queryTerminal,Number(terminalinfo.Mid), (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if(results.length>0){
      return res.cc("该设备号已被注册！");
    }
    const addterminal = "insert into TerminalList set ?";
    db.query(addterminal,{Mid:Number(terminalinfo.Mid),status:0,address:terminalinfo.address},(err,results)=>{
      if(err) return res.cc(err);
      return res.send({ status: 0, message: "添加终端成功！"});
    })
  })
}

//更新终端状态
exports.fixTerminal = (req, res) => {
  const terminalinfo = req.query;
  if (!terminalinfo.Mid) {
    return res.send({ status: 1, message: "修改终端信息不能为空！" });
  }
  const queryTerminal = "select * from TerminalList where Mid=?";
  db.query(queryTerminal,Number(terminalinfo.Mid), (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if(results.length == 0){
      return res.cc("该设备号尚未注册！");
    }
    const addterminal = "update TerminalList set status=? where Mid=?";
    db.query(addterminal,[Number(terminalinfo.status),Number(terminalinfo.Mid)],(err,results)=>{
      if(err) return res.cc(err);
      return res.send({ status: 0, message: "修改终端状态成功！"});
    })
  })
}

//删除终端
exports.removeTerminal = (req, res) => {
  const terminalinfo = req.query;
  if (!terminalinfo.Mid) {
    return res.send({ status: 1, message: "终端号不能为空！" });
  }
  const queryTerminal = "select * from TerminalList where Mid=?";
  db.query(queryTerminal,Number(terminalinfo.Mid), (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if(results.length == 0){
      return res.cc("该设备号尚未注册！");
    }
    const addterminal = "update TerminalList set status=? where Mid=?";
    db.query(addterminal,[2,Number(terminalinfo.Mid)],(err,results)=>{
      if(err) return res.cc(err);
      return res.send({ status: 0, message: "删除终端成功！"});
    })
  })
}

exports.queryTerminal = (req, res) => {
  const queryTerminals = "select * from TerminalList";
  db.query(queryTerminals, (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      return res.cc(err);
    }
    return res.send({Terminals: results})
  })
}