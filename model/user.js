let newsPool = require('./index');

let user={};

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
    newsPool.getConnection(function(err,connection){
        if(err){
            console.log("db connect error"+err);
        }

        query='INSERT INTO user (name,email,password) VALUE(?,?,?)';
        for(let i=0;i<data.length;i++){
            connection.query(query,[data[i].name,data[i].email,data[i].password],function(err,result,field){
                if(err){
                    console.log("insert into user error"+err);
                }
            });
        }

        connection.release();

    })
}

user.prefer=function(data,callback){
    newsPool.getConnection(function(err,connection){
        if(err){
            console.log("db connect error"+err);
        }

        query='UPDATE user SET pre_top=?, pre_shehui=?, pre_guonei=?, pre_guoji=?, pre_yule=?, pre_tiyu=?, pre_junshi=?, pre_keji=?, pre_caijing=?, pre_shishang=? WHERE name=?';

        param=[data.pre_top, data.pre_shehui, data.pre_guonei, data.pre_guoji, data.pre_yule, data.pre_tiyu, data.pre_junshi, data.pre_keji, data.pre_caijing, data.pre_shishang, data.name];

        connection.query(query,param,function(err,result,field){
            if(err){
                console.log("update prefer error"+err);
            }else{

                query='SELECT * FROM news WHERE name=?'
                connection.query(query,data.name,function(err,result,field){
                    if(err){
                        console.log("get result from update prefer error"+err);
                    }else{
                        callback(result);
                    }
                })
            }

        })
    
        connection.release()

    })
}

user.visit=function(name,type,callback){
    newsPool.getConnection(function(err,connection){
        if(err){
            console.log("db connect error"+err);
        }

        query='UPDATE news SET '+preType(type)+' = '+preType(type)+'+1'+'WHERE name = ?';
        connection.query(query,[name],function(err,result,field){
            if(err){
                console.log("visit update error :"+err);
            }else{
                callback(result);
            }

        })

        connection.release();
    })
}

user.findByNamePassword=function(data,callback){
    newsPool.getConnection(function(err,connection){
        if(err){
            console.log("db connect error"+err);
        }

        query='SELECT * FROM user WHERE name=? AND password=?';
        connection.query(query,[data.name,data.password],function(err,result,field){
            if(err){
                console.log("findByNamePassword error :"+err);
            }else{
                callback(result);
            }

        })

        connection.release();
    })
}

user.findByNameEmail=function(data,callback){
    newsPool.getConnection(function(err,connection){
        if(err){
            console.log("db connect error"+err);
        }

        query='SELECT * FROM user WHERE name = ? AND email = ?';
        connection.query(query,[data.name,data.email],function(err,result,field){
            if(err){
                console.log("findByNameEmail error :"+err);
            }else{
                callback(result);
            }

        })

        connection.release();
    })
}


module.exports=user;