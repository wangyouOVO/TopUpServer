const express = require("express");
// 创建路由对象
const router = express.Router();
// 导入用户路由处理函数模块
const managerHandler = require("../router_handler/manager.js");

// router.get("/",  managerHandler.selectTerminal);
router.get("/",  managerHandler.showManagerWin);
router.get("/register",  managerHandler.regUser);
router.get("/traffic",  managerHandler.trafficStatistic);
router.get("/reserch",  managerHandler.reserchUser);
router.get("/ask",  managerHandler.askLog);
router.get("/updata",  managerHandler.updataVersion);
router.get("/addTerminal",  managerHandler.addTerminal);
router.get("/fixTerminal",  managerHandler.fixTerminal);
router.get("/removeTerminal",  managerHandler.removeTerminal);
router.get("/queryTerminal",  managerHandler.queryTerminal);

// 把路由对象共享出去
module.exports = router;
