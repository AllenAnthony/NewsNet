// News:
// id(key AUTO_INCREMENT)
// title
// Time
// author
// url
// image
// type
// click_count

var newsPool = require('./index');
var news = {};

news.add = function(data,callback){
    newsPool.getConnection(function(err,connection){
        if(err){
            console.log("database connect error:" + err);
        }

        var query = 'INSERT INTO news (title,time,author,url,image,type,click_count) VALUES(?,?,?,?,?,?,0)';
        for(var i=0;i<data.length;i++){
            connection.query(query,[data[i].title,data[i].date,data[i].author_name,data[i].url,data[i].thumbnail_pic_s,data[i].category],function(err,results,fields){
                if(err){
                    console.log("insert data into db error"+ err);
                }
            })
        }

        connection.release();
    })
}

news.getAll = function(callback){
    newsPool.getConnection(function(err,connectoin){
        if(err){
            console.log("db connect error"+err);
        }

        var query='SELECT * FROM news ORDER by id DESC';
        connection.query(query,[],function(err,result,fields){
            if(err){
                console.log("get all error"+err);
            }

            callback(result);
            connection.release();
        })

    })
}



