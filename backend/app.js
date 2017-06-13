let express =  require('express');
let session =  require('express-session');
let pug =  require('pug');
let ejs = require('ejs');
let path = require('path');
let bodyParser =  require('body-parser');
let helmet =  require('helmet'); //Helmet是一系列帮助增强Node.JS之Express/Connect等Javascript Web应用安全的中间件。

let router = require('./router');

let app = express();

//app.set用来设置app中的字段
app.set('views', './views');
app.set('view engine', 'ejs');
//app.set('trust proxy', 1);

//使用路由 或 设置中间件
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors 解决跨域问题
app.all('*', (req, res, next) => { //当访问'*'路劲的时候，在http头上加上这些来使其他人能通过网络访问你的网站
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();//把http请求继续传给下面的中间件
});

app.use('/', router);//当访问路径为'/'的时候，调用router路由

//router(app);

app.use('*', function(req, res){//当请求传到这一层说明请求失败，传输404
    res.status(404).send('404 Not Found by Express');
});

app.listen(3000, function(){
    console.log("Server runs on port 3000.");
});
//use 就是增加一个中间件 按顺序从上到下执行 若想传到下一层中间件 在这一层就必须调用next()