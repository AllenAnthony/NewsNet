var newsPool = require('./index');

var user={};


// Users:
// id(key AUTO_INCREMENT)
// name
// email
// password
// pre_top
// pre_shehui
// pre_guonei
// pre_guoji
// pre_yule
// pre_tiyu
// pre_junshi
// pre_keji
// pre_caijing
// pre_shishang

preType = function(type){
    return "pre_"+type;
}

// add user
user.add=function(data,callback){
    query='INSERT INTO user (name,email,password) VALUE(?,?,?)';
    console.log(data);
    newsPool.query(query,[data.name,data.email,data.password],function(err,result,field){
        if(err){
            console.log("insert into user error"+err);
        }
        console.log(result);
        callback(result);
    });

}

user.prefer=function(data,callback){
    query='UPDATE user SET pre_top=?, pre_shehui=?, pre_guonei=?, pre_guoji=?, pre_yule=?, pre_tiyu=?, pre_junshi=?, pre_keji=?, pre_caijing=?, pre_shishang=? WHERE name=?';

    param=[data.pre_top, data.pre_shehui, data.pre_guonei, data.pre_guoji, data.pre_yule, data.pre_tiyu, data.pre_junshi, data.pre_keji, data.pre_caijing, data.pre_shishang, data.name];

    newsPool.query(query,param,function(err,result,field){
        if(err){
            console.log("update prefer error"+err);
        }else{

            query='SELECT * FROM news WHERE name=?'
            newsPool.query(query,data.name,function(err,result,field){
                if(err){
                    console.log("get result from update prefer error"+err);
                }else{
                    callback(result);
                }
            })
        }

    })
}

user.visit=function(name,type,callback){
    query='UPDATE news SET '+preType(type)+' = '+preType(type)+'+1'+'WHERE name = ?';
    newsPool.query(query,[name],function(err,result,field){
        if(err){
            console.log("visit update error :"+err);
        }else{
            callback(result);
        }

    })

}

user.findByNamePassword=function(data,callback){
    query='SELECT * FROM user WHERE name=? AND password=?';
    newsPool.query(query,[data.name,data.password],function(err,result,field){
        if(err){
            console.log("findByNamePassword error :"+err);
        }else{
            callback(result);
        }

    })

}

user.findByNameEmail=function(data,callback){
    let myquery='SELECT * FROM user WHERE name = ? AND email = ?';
    newsPool.query(myquery,[data.name,data.email],function(err,result,field){
        if(err){
            console.log("findByNameEmail error :"+err);
        }else{
            callback(result);
        }

    })
}


module.exports=user;