var express = require('express');
var superagent = require('superagent');

var news = require('../model/news');
var user = require('../model/user');

var router=express.Router()
var newsType = ["top", "shehui", "guonei", "guoji", "yule", "tiyu", "junshi", "keji", "caijing", "shishang"];

var isFreshing=0;

router.get('/fresh',function(req,res,next){

    if(isFreshing==0){
        isFreshing=1;
        while(1){
            for(var i=0;i<newsType.length;i++){
                superagent.get('http://v.juhe.cn/toutiao/index?type='+newsType[i]+'&key=98703f292c4aebba837423e10aee73b1').end(function(err, item){
                    if(err)
                        continue;
                    else
                        news.add(JSON.parse(item).result.data,function(result){
                        });
                });
            }

            res.send("fresh success");
        }
    }
        

})

router.get('/',function(req,res,next){
    res.render('../index.html',{});
})

router.get('/all',function(req,res,next){
    news.getAll(function(result){
        if(result.length==0){
            res.json({
                code:0,
                content:result
            })
        }else{
            res.json({
                code:1,
                content:result
            })
        }
    })
})

router.post()




module.exports=router;