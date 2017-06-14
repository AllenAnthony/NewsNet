// News:
// id(key AUTO_INCREMENT)
// title
// time
// author
// url
// image
// type
// click_count

let newsPool = require('./index');
let news = {};

news.add = function(data,callback){

    let query = 'INSERT INTO news (title,time,author,url,image,type) VALUES(?,?,?,?,?,?)';
    for(let i=0;i<data.length;i++){
        //console.log(data[i].category);
        if(data[i].category!==null){
            newsPool.query(query,[data[i].title,data[i].date,data[i].author_name,data[i].url,data[i].thumbnail_pic_s,data[i].category],function(err,results,fields){
                if(err){
                    console.log("insert data into db error"+ err);
                }
            })
        }
        //console.log("插入成功");
    }


}

news.getAll = function(callback){

    let query='SELECT * FROM news ORDER by id DESC';
    newsPool.query(query,[],function(err,result,field){
            if(err){
                console.log("get all error"+err);
            }

            callback(result);
        })
}

news.getOneByTypeOrdered=function(type,callback){

    let query='SELECT * FROM news WHERE type = ? ORDER BY click_count DESC, id DESC';
    newsPool.query(query,[type],function(err,result,field){
        if(err){
            console.log("get One By Type Ordered error"+err);
        }else{
            callback(result);
        }
    })

}

news.click=function(id,callback){
    let query='UPDATE news SET click_count = click_count +1 WHERE id = ?';
    newsPool.query(query,[id],function(err,result,field){
        if(err){
            console.log("update click_count error"+err);
        }else{
            if(result.affectedRows==1){
                callback(true);
            }else{
                callback(false);
            }
        }
    })

}

module.exports=news;

