let mysql = require('mysql');

let newsPool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'news',
    charset: "utf8"
});

newsPool.getConnection(function(err,connection){
    if(err){
        console.log("database connect error: %s",err.message);
    }
});

module.exports=newsPool;

