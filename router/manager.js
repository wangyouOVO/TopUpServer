const express = require("express");
// 创建路由对象
const router = express.Router();
// 导入用户路由处理函数模块
const managerHandler = require("../router_handler/manager.js");

router.get("/",  managerHandler.showManagerWin);
router.post("/register",  managerHandler.regUser);


// 把路由对象共享出去
module.exports = router;
