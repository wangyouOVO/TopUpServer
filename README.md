
# 水表充值模拟终端及服务端实现

 该项目可以模拟不同用户在不同终端的充值过程，并将数据存储在本地或者远端服务器，数据库使用MySQL,服务端使用node搭建，后台管理APP使用C#搭建，同时有web端的模拟充值终端。
 <br />
<br />

<h3 align="center"> 即刻开始！</h3>

<h4>1. 安装MySQL数据库</h4>
 windows：<a href="https://blog.csdn.net/jsugs/article/details/124143762">参考</a> <br />
 linux：<a href="https://blog.csdn.net/zhang_m_h/article/details/123567367">参考</a>  
<h4>2. 安装nodejs框架（本项目版本v16.14.2）</h4>
 windows：<a href="https://blog.csdn.net/weixin_44547599">参考</a>  
 <br />
 linux： <a href="https://blog.csdn.net/qq_45830276/article/details/126022778">参考</a>  
 <br />
<br />
<h4>3. 配置项目</h4>


1. Clone the project

```sh
git clone https://github.com/wangyouOVO/TopUpServer.git
```

2. 下载依赖
```sh
cd TopUpServer
npm install
```
3. 配置数据库

```sh
mysql -uroot -p #输入mysql密码即可进入数据库管理终端

show databases; #展示所有数据库
create database iot; #创建数据库
use iot; #管理新创建的数据库
create table users(id INT primary key auto_increment, 
  name VARCHAR(20), 
  phone VARCHAR(11), 
  rmb decimal(5,2) DEFAULT 0);#创建users表
create table TopUpLog(id INT primary key auto_increment,
  userid INT, 
  username VARCHAR(20),
  topUpBMB DECIMAL(5,2), 
  `time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  Mid INT DEFAULT 1);#创建充值记录表
create table trafficLog(id INT primary key auto_increment, year INT,month INT,day INT,times INT, rmb decimal(5,2) not null default 0);#创建日流量表
exit;#退出sql终端
```
4. 开启mysql服务
```sh
#linux
service mysql start #开启mysql服务
service mysql status #可见当前状态
service mysql stop #不用时可以停止服务
#windows
net start MySQL80 #开启mysql服务
```
  
5. 在nodeServer/db/index.js文件中配置您的数据库信息
```sh
const db = mysql.createPool({
  host: "127.0.0.1", #如果服务和数据库在同一台服务器或者主机，使用“127.0.0.1”即可
  user: "root",
  password: "123", #将123替换为自己的密码
  database: "iot",
});
```

6. 可在项目根目录下开启服务

```sh
node index.js
```
7. 可通过浏览器访问项目了，访问服务可通过在浏览器访问IP
```sh
#本地服务
127.0.0.1 或 127.0.0.1：3000 #端口号可自行在项目根目录下index.js文件中配置
#云服务（如阿里云）
直接输入远程服务器公网ip即可
```
8. 当使用node启动服务时，可能出现杀死终端，进程停止的情况，因此可以使用PM2工具托管我们的服务，使用方法（非必须）：
```sh
npm install -g pm2 #全局安装PM2
ln -s /user/local/nodejs/lib/node_modules/pm2/bin/pm2 /usr/local/bin #通过软连接使得PM2指令可以全局使用，其中‘/user/local/nodejs/lib/node_modules/pm2/bin/pm2’中的‘/user/local/nodejs’是node的安装目录，注意替换。
pm2 start index.js #启动服务！
pm2 stop 0 # 停止 id 为0的指定应用程序
```

<h4>4. 注意事项</h4>

1. 如果在阿里云等云服务器中部署，务必在阿里云服务器管理页面的安全组中修改端口属性，如项目在3000端口，需要给3000端口配置权限，同样，mysql服务在3306端口，也需要开放权限。
2. 如果项目运行后出现：
```sh
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```
报错，是因为MySQL版本问题。在sql终端下：
```sh
alter user 'root'@'localhost' identified with mysql_native_password by '123';  #123替换为自己的密码
flush privileges;
```
重启项目即可解决。



