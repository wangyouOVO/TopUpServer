// 导入mysql模块
const mysql = require("mysql");

// 创建数据库连接对象
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "12147414Wt",
  database: "iot",
});
console.log('连接数据库成功！')
// 共享db数据库连接对象
module.exports = db;