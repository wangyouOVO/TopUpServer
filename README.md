
# 水表充值模拟终端及服务端实现

摘要： 该项目模拟不同用户在不同终端的充值过程，并将数据存储在本地或者远端服务器，数据库使用MySQL,服务端使用node搭建，后台管理使用C#，同时有web端的模拟充值终端
 <br />
<br />

<h3 align="center"> 即刻开始！</h3>

<h4>1. 安装MySQL数据库</h4>
<h4></h4>
[ windows：参考 ](URL)
 windows：参考<a></a>
 linux：参考<a></a>
<h4>2. 安装nodejs框架</h4>
 windows：参考<a></a>
 linux：参考 <a>https://blog.csdn.net/qq_45830276/article/details/126022778</a>  
3. ..

###### **安装步骤**

1. Clone the project

```sh
git clone https://github.com/wangyouOVO/TopUpServer.git
```
2. 配置您的数据库如下两表

 <img src="image/QQ截图20220511213601.png" alt="Logo" width="500" height="400">
  <img src="image/QQ截图20220511213719.png" alt="Logo" width="500" height="400">
  
3.在nodeServer/db/index.js文件中配置您的数据库信息，便可在nodeServer文件下开启终端（用管理员身份打开），输入

```sh
node app.js
```
开启服务器，别忘了在终端中先输入

```sh
net start MySQL80
```
启动数据库，否则会报错

4.使用微信开发者工具导入triprecorder项目，就可以使用了。

<!-- ### 文件目录说明
eg:

```
filetree 
├── ARCHITECTURE.md
├── LICENSE.txt
├── README.md
├── /account/
├── /bbs/
├── /docs/
│  ├── /rules/
│  │  ├── backend.txt
│  │  └── frontend.txt
├── manage.py
├── /oa/
├── /static/
├── /templates/
├── useless.md
└── /util/
```





### 开发的架构 

请阅读[ARCHITECTURE.md](https://github.com/shaojintian/Best_README_template/blob/master/ARCHITECTURE.md) 查阅为该项目的架构。

### 部署

暂无

### 使用到的框架

- [xxxxxxx](https://getbootstrap.com)
- [xxxxxxx](https://jquery.com)
- [xxxxxxx](https://laravel.com)

### 贡献者

请阅读**CONTRIBUTING.md** 查阅为该项目做出贡献的开发者。

#### 如何参与开源项目

贡献使开源社区成为一个学习、激励和创造的绝佳场所。你所作的任何贡献都是**非常感谢**的。


1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



### 版本控制

该项目使用Git进行版本管理。您可以在repository参看当前可用版本。

### 作者

xxx@xxxx

知乎:xxxx  &ensp; qq:xxxxxx    

 *您也可以在贡献者名单中参看所有参与该项目的开发者。*

### 版权说明

该项目签署了MIT 授权许可，详情请参阅 [LICENSE.txt](https://github.com/shaojintian/Best_README_template/blob/master/LICENSE.txt)

### 鸣谢


- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Img Shields](https://shields.io)
- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Pages](https://pages.github.com)
- [Animate.css](https://daneden.github.io/animate.css)
- [xxxxxxxxxxxxxx](https://connoratherton.com/loaders) -->

<!-- links -->
<!-- [your-project-path]:shaojintian/Best_README_template
[contributors-shield]: https://img.shields.io/github/contributors/shaojintian/Best_README_template.svg?style=flat-square
[contributors-url]: https://github.com/shaojintian/Best_README_template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/shaojintian/Best_README_template.svg?style=flat-square
[forks-url]: https://github.com/shaojintian/Best_README_template/network/members
[stars-shield]: https://img.shields.io/github/stars/shaojintian/Best_README_template.svg?style=flat-square
[stars-url]: https://github.com/shaojintian/Best_README_template/stargazers
[issues-shield]: https://img.shields.io/github/issues/shaojintian/Best_README_template.svg?style=flat-square
[issues-url]: https://img.shields.io/github/issues/shaojintian/Best_README_template.svg
[license-shield]: https://img.shields.io/github/license/shaojintian/Best_README_template.svg?style=flat-square
[license-url]: https://github.com/shaojintian/Best_README_template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/shaojintian
 -->
 ### 鸣谢 
 
   <a href="https://github.com/Qpicpicxxz">@陀不妥耶夫斯基 </a>
  
