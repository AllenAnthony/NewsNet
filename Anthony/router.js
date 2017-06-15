var bodyParser = require('body-parser');
var multer  = require('multer');
var cookieParser = require('cookie-parser')

var fs = require("fs");
var express = require('express');

var app = express();
app.use(express.static('public'));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));


// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res) {
    console.log("Cookies: ", req.cookies)
})

//  POST 请求
app.post('/', function (req, res) {
    console.log("主页 POST 请求");
    res.send('Hello POST');
})

app.get('/show.html',function (req,res) {
    res.sendfile(__dirname+"/"+"show.html")
})

app.get('/process_get',function (req,res) {
    myres={
        "first_name":req.query.first_name,
        "last_name":req.query.last_name
    }
    console.log(myres);
    res.send(JSON.stringify(myres));

})

//  /del_user 页面响应
app.get('/del_user', function (req, res) {
    console.log("/del_user 响应 DELETE 请求");
    res.send('删除页面');
})

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
    console.log("/list_user GET 请求");
    res.send('用户列表页面');
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
})



app.post('/process_post', urlencodedParser, function (req, res) {

    // 输出 JSON 格式
    response = {
        "my_first_name":req.body.first_name,
        "my_last_name":req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})


app.post('/file_upload', function (req, res) {

    console.log(req.files[0]);  // 上传的文件信息

    var des_file = __dirname + "/upload/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname
                };
            }
            console.log( response );
            res.end( JSON.stringify( response ) );
        });
    });
})




var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
