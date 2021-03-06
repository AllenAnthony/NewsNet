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
    res=null;
    if(type=="头条"){
        res="pre_top";
    }else if(type=="社会"){
        res="pre_shehui";
    }else if(type=="国内"){
        res="pre_guonei";
    }else if(type=="国际"){
        res="pre_guoji";
    }else if(type=="娱乐"){
        res="pre_yule";
    }else if(type=="体育"){
        res="pre_tiyu";
    }else if(type=="军事"){
        res="pre_junshi";
    }else if(type=="科技"){
        res="pre_keji";
    }else if(type=="财经"){
        res="pre_caijing";
    }else if(type=="时尚"){
        res="pre_shishang";
    }else{
        console.log("prefer type transfer error");
    }
    return res;
};

visitType = (type)=>{
    res=null;
    if(type=="头条"){
        res="visit_top";
    }else if(type=="社会"){
        res="visit_shehui";
    }else if(type=="国内"){
        res="visit_guonei";
    }else if(type=="国际"){
        res="visit_guoji";
    }else if(type=="娱乐"){
        res="visit_yule";
    }else if(type=="体育"){
        res="visit_tiyu";
    }else if(type=="军事"){
        res="visit_junshi";
    }else if(type=="科技"){
        res="visit_keji";
    }else if(type=="财经"){
        res="visit_caijing";
    }else if(type=="时尚"){
        res="visit_shishang";
    }else{
        console.log("visit type transfer error");
    }
    return res;
};

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
    console.log("prefer update");
    console.log(data);
    console.log(data.settingArr[2]);
    query='UPDATE user SET pre_top=?, pre_shehui=?, pre_guonei=?, pre_guoji=?, pre_yule=?, pre_tiyu=?, pre_junshi=?, pre_keji=?, pre_caijing=?, pre_shishang=? WHERE name=?';

    param=[data.settingArr[0], data.settingArr[2], data.settingArr[4], data.settingArr[6], data.settingArr[8], data.settingArr[10], data.settingArr[12], data.settingArr[14], data.settingArr[16], data.settingArr[18], data.name];

    newsPool.query(query,param,function(err,result,field){
        if(err){
            console.log("update prefer error"+err);
        }else{

            query='SELECT * FROM user WHERE name=?'
            newsPool.query(query,data.name,function(err,result,field){
                if(err){
                    console.log("get result from update prefer error"+err);
                }else{
                    callback(result);
                }
            })
        }

    })
};

user.visit=function(name,type,callback){
    query='UPDATE user SET '+visitType(type)+' = '+visitType(type)+' + 1 '+'WHERE name = ?';
    console.log("visit query: "+query);
    newsPool.query(query,[name],function(err,result,field){
        if(err){
            console.log("visit update error :"+err);
        }else{
            console.log("visit success");
            callback(result);
        }

    })

};

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