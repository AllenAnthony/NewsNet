let express = require('express');
let superagent = require('superagent');

let news = require('./model/news');
let user = require('./model/user');

let router=express.Router();
let newsType = ["top", "shehui", "guonei", "guoji", "yule", "tiyu", "junshi", "keji", "caijing", "shishang"];

let isFreshing=0;

router.get('/fresh', function(req, res, next) {
    for(let i = 0; i < newsType.length; i++){
        superagent.get('http://v.juhe.cn/toutiao/index?type='+newsType[i]+'&key=98703f292c4aebba837423e10aee73b1').end(function(err, myres){
            let jsonData=JSON.parse(myres.text);
            News.add(jsonData.result.data,(result)=>{});
        });
    }
    res.send("fresh success");
});



router.get('/',function(req,res,next){
    res.render('index');
});

router.get('/init',function(req,res,next){
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

router.post('/getone',(req,res,next)=>{
    News.getOneByTypeOrdered(Number.parseInt(req.body.index),req.body.type,(result)=>{
        if(result){
            res.json({
                code:0,
                msg:'successful',
                news:result,
            })
        }else{
            res.json({
                code:-1,
                msg:'failed'
            })
        }
    })
});

router.post('/register',(req,res,next)=>{
    let promise=new Promise((resolve,reject)=>{
        user.findByNameEmail(req.body,(result)=>{
            if(result.length!=0){
                res.json({
                    code:-1,
                    msg:"user name and email are duplicated"
                })
            }else{
                res.json({
                    code:-1,
                    msg:"register failed, database error"
                })
            }
        })
    })
});

router.post('/login',(req,res,next)=>{
   user.findByNamePassword(req.body,(result)=>{
       if(result.length==0){
           res.json({
               code:-1,
               msg:"username or password incorrect!"
           })
       }else{
           result[0].code=0;
           result[0].msg="log in successfully";
           res.json(result[0]);// return id
       }
    })
});

router.post('/setting',(req,res,next)=>{
   user.prefer(req.body,(result)=>{
       if(result.length>0){
           result[0].code=0;
           result[0].msg="personal preference update successfully";//result is a list of many dictionaries(only one here), result[0] is the first item found, and is a dictionary
           res.json(result[0]);
       }else{
           res.json({
               code:-1,
               msg:"personal preference update failed"
           })

       }
   })
});

router.post('/user_behaviour',(req,res,next)=>{
   let data={
       newsID:Number.parseInt(req.body.newsID),
       name:req.body.name,
       column:req.body.column,
   };

   news.click(data.newsID,(newsResult)=>{
       user.visit(data.name,data.column,(userResult)=>{
           if(newsResult && userResult){
               res.json({
                   code:0,
                   msg:"user operation recorded"
               })
           }else if(newsResult || userResult){
               if(newsResult){
                   res.json({
                       code:-1,
                       msg:"click news recorded"
                   })
               }else{
                   res.json({
                       code:-1,
                       msg:"user visit recorded"
                   })
               }
           }else{
               res.json({
                   code:-1,
                   msg:"fail to record user operation"
               })
           }
       })
   })

});

router.post('/update_cookie',(req,res,next)=>{

    let info={
        name:req.body.name,
        email:req.body.email
    };

    user.findByNameEmail(info,(result)=>{// result is a list with only one dictionary(item)
        if(result.length>0){
            result[0].code=0;
            result[0].msg="fail to get user's information";
            res.json(result[0]);
        }else{
            res.json({
                code:-1,
                mag:"success to get user's information"
            })
        }
    })
});



module.exports=router;