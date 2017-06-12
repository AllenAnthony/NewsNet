let mysql = require('mysql');

//创建一个connection
let newsPool = mysql.createConnection({
    host     : 'localhost',       //主机
    user     : 'root',               //MySQL认证用户名
    password : '',        //MySQL认证用户密码
    database: 'news',
    port: '3306',                   //端口号
});

//创建一个connection
newsPool.connect(function(err){
    if(err){
        console.log('[query] - :'+err);
        return;
    }
    console.log('[connection connect]  succeed!');
});


module.exports = newsPool;

