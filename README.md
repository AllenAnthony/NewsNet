# NewsNet
### author: Anthony
This is a News gathering web site for course BS

### 安装    
打开Apache和MySQL, MySQL在3306端口监听
在本地的MySQL数据库中创建数据库news： 
 
`CREATE DATABASE news`

之后创建数据表news和user，具体代码脚本见NewsNet.sql脚本文件

首先你需要安装Node.js和npm  
所需要的库已经一并上传，所以不需要npm install，若出现库引用错误可以npm install重新安装依赖库  
在backend文件夹下npm start  
在frontend文件夹下npm start

浏览器打开 **http://localhost:3100/** 即可

### 设计
- 用户系统
    - 注册和登陆
    - 个人爱好设置
    - 根据用户行为，用户点击新闻，来预测用户所感兴趣的新闻并加入 **我喜欢** 这一栏
- 新闻系统
    - 调用*聚合新闻API*接口
	- 新闻实时更新
	- 分为9个新闻栏目
	    - 头条
	    - 社会
	    - 国内
	    - 国际
	    - 娱乐
	    - 体育
	    - 军事
	    - 科技
	    - 财经
	- 另外加上了**我喜欢**个性推荐这一栏

### 前后端设计框架
- 前端
    - 框架：React
    - UI库：Ant Design
    - 打包：Webpack
- 后端
    - 框架：Node+Express
    - 数据库：Mysql


