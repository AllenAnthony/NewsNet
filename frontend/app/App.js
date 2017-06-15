import React from 'react';
import { Layout, Menu, Icon, message } from 'antd';
import Cookie from 'js-cookie';

import Users from "./users/index"
import News from "./news/index";
import About from "./about/index";
import {updateCookie} from './users/util'


const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import 'antd/dist/antd.css';
import './App.css';

class App extends React.Component {

    state = {
        current:0,
        loginShow: false,
        regShow: false,
        setShow: false,
        newsShow: true,
        aboutShow: false,
        collapsed: false,
        loginTextShow: true,
        mode: 'inline',
        newsArr: [],
        newsType: ["我喜欢", "头条", "社会", "国内", "国际", "娱乐", "体育", "军事", "科技", "财经", "时尚"],
        duringDays: 0,
        column: "头条",   //默认栏目头条
        columnLikeRatio: [],
    };


    showMyState = ()=>{
        console.log("this.state.loginShow: "+this.state.loginShow);
        console.log("this.state.regShow: "+this.state.regShow);
        console.log("this.state.setShow: "+this.state.setShow);
        console.log("this.state.newsShow: "+this.state.newsShow);
        console.log("this.state.aboutShow: "+this.state.aboutShow);
        console.log("this.state.collapsed: "+this.state.collapsed);
        console.log("this.state.loginTextShow: "+this.state.loginTextShow);
        console.log("this.state.newsArr: "+this.state.newsArr[0]);
        console.log("this.state.duringDays: "+this.state.duringDays);
        console.log("this.state.column: "+this.state.column);
        console.log("this.state.columnLikeRatio: "+this.state.columnLikeRatio);
    };

    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
            loginTextShow: !collapsed,
        });
    };

    navHandleClick = (event)=>{
        this.setState({
            current: event.key,
        });
    };

    handleClick = (event) => {
        var value = event.target.outerHTML;
        var nowState;
        if(value.includes("登陆")){
            nowState = {
                loginShow: true,
                regShow: false,
                setShow: false,
            };
        }else if(value.includes("注册")){
            nowState = {
                loginShow: false,
                regShow: true,
                setShow: false,
            };
        }else if(value.includes("个人设置")){
            nowState = {
                loginShow: false,
                regShow: false,
                setShow: true,
            };
        }else if(value.includes("新闻中心")||value.includes("global")){
            nowState = {
                loginShow: false,
                regShow: false,
                setShow: false,
                newsShow: true,
                aboutShow: false,
            }
        }else if(value.includes("关于")||value.includes("file")){
            nowState = {
                loginShow: false,
                regShow: false,
                setShow: false,
                newsShow: false,
                aboutShow: true,
            }
        }else{
            //新闻栏目
            let column = event.target.innerText;
            if(column == "我喜欢"){
                var userInfo = getUserInfo();
                if(userInfo == undefined){
                    message.warning('please sign in');
                }else{
                    updateCookie(userInfo.name, userInfo.email, (result) => {
                        console.log("updateCookie return  "+result);
                        nowState = {
                            loginShow: false,
                            regShow: false,
                            setShow: false,
                            newsShow: true,
                            aboutShow: false,
                        };

                        userInfo = getUserInfo();
                        console.log("cookie 中的 userInfo");
                        console.log(userInfo);
                        nowState.column = "我喜欢";
                        let tmpLikeRatio = [{
                            type: "头条",
                            prefer: userInfo.pre_top,
                            visit: userInfo.visit_top,
                            ratio: 0
                        },{
                            type: "社会",
                            prefer: userInfo.pre_shehui,
                            visit: userInfo.visit_shehui,
                            ratio: 0
                        },{
                            type: "国内",
                            prefer: userInfo.pre_guonei,
                            visit: userInfo.visit_guonei,
                            ratio: 0
                        },{
                            type: "国际",
                            prefer: userInfo.pre_guoji,
                            visit: userInfo.visit_guoji,
                            ratio: 0
                        },{
                            type: "娱乐",
                            prefer: userInfo.pre_yule,
                            visit: userInfo.visit_yule,
                            ratio: 0
                        },{
                            type: "体育",
                            prefer: userInfo.pre_tiyu,
                            visit: userInfo.visit_tiyu,
                            ratio: 0
                        },{
                            type: "军事",
                            prefer: userInfo.pre_junshi,
                            visit: userInfo.visit_junshi,
                            ratio: 0
                        },{
                            type: "科技",
                            prefer: userInfo.pre_keji,
                            visit: userInfo.visit_keji,
                            ratio: 0
                        },{
                            type: "财经",
                            prefer: userInfo.pre_caijing,
                            visit: userInfo.visit_caijing,
                            ratio: 0
                        },{
                            type: "时尚",
                            prefer: userInfo.pre_shishang,
                            visit: userInfo.visit_shishang,
                            ratio: 0
                        }];
                        let maxVisit = getMaxOfArrObj(tmpLikeRatio, "visit");
                        let sumRatio = 0;

                        for(let item of tmpLikeRatio){
                            item.ratio = (0.5*item.visit/maxVisit) + (0.5*item.prefer/5);
                            sumRatio += item.ratio
                        }
                        for(let item of tmpLikeRatio){
                            item.ratio /= sumRatio;
                            item.ratio = Number.parseFloat(item.ratio.toFixed(2));
                        }
                        console.log(tmpLikeRatio);
                        nowState.columnLikeRatio = tmpLikeRatio.slice(0);
                        this.setState(nowState);
                    })
                }
            }else{
                console.log("column:"+column);
                nowState = {
                    loginShow: false,
                    regShow: false,
                    setShow: false,
                    newsShow: true,
                    aboutShow: false,
                    column: column,
                }
            }
        }
        this.setState(nowState);
    };
    handleModalCancel = () => {
        this.setState({
            loginShow: false,
            regShow: false,
            setShow: false,
        })
    };
    handleLoginToRegister = () => {
        this.setState({
            loginShow: false,
            regShow: true,
            setShow: false,
        })
    }
    componentDidMount() {
        const url = 'http://127.0.0.1:3000/init';
        var req = new Request(url, {method: 'GET',type:'json'});

        const mSecPerDay = 86400000;
        const startTime = new Date("Apr 6 2017");
        var nowTime = Date.now();
        var duringDays = (nowTime - startTime)/mSecPerDay;

        fetch(req).then((response) => {
            return response.json();
        }).then((data) => {
            if(data.code == 1){
                this.setState({
                    newsArr: data.content,
                    duringDays: Number.parseInt(duringDays),
                });
                console.log(data);
                console.log("第一次赋初值");
                console.log(this.state.newsArr[0]);
            }else{
                alert("服务器响应错误");
            }
        });
    }
    render() {
        let userStateCSS = {
            margin: '10px 18px 6px 18px',
            textAlign: 'center',
            fontSize: '20px',
            fontFamily: '微软雅黑',
            color: '#ffffff',
            display: this.state.loginTextShow ? 'block' : 'none',
        };
        let netCSS = {
            margin: '10px 18px 6px 18px',
            textAlign: 'center',
            fontSize: '20px',
            fontFamily: '微软雅黑',
            color: '#ffffff',
            display: this.state.loginTextShow ? 'block' : 'none',
        };
        let userCSS = {
            margin: '0px 18px 6px 18px',
            textAlign: 'left',
            fontSize: '20px',
            fontFamily: '微软雅黑',
            color: '#ffffff',
            display: this.state.loginTextShow ? 'block' : 'none',
        };

        let newsNav = this.state.newsType.map((item, index) => {
            return(
                <Menu.Item key={index}><div onClick={this.handleClick}>{item}</div></Menu.Item>
            )
        });
        this.showMyState();

        return (
            <Layout style={{ height: "100vh"}}>
                <Sider
                    width={90}
                    style={{ background: '#0dbdff' }}
                >
                    <div style={netCSS}>News</div>
                    <div style={netCSS}>Net</div>
                    <br/><br/><br/>
                    <div style={userStateCSS}>
                        {getWelcomedInfo()}
                        <hr style={{marginTop: '5px'}} />
                    </div>
                    <Menu  mode={this.state.mode}>

                        <Menu.Item style={{ background: '#0dbdff' }}><div className="nav-text" onClick={this.handleClick}>登陆</div></Menu.Item>
                        <Menu.Item style={{ background: '#0dbdff' }}><div className="nav-text" onClick={this.handleClick}>注册</div></Menu.Item>
                        <Menu.Item style={{ background: '#0dbdff' }}><div className="nav-text" onClick={this.handleClick}>个人设置</div></Menu.Item>
                        {/*<SubMenu*/}
                            {/*title={<div><Icon type="user" /><span className="nav-text">用户中心</span></div>}*/}
                        {/*>*/}
                            {/*<Menu.Item><div onClick={this.handleClick}>登陆</div></Menu.Item>*/}
                            {/*<Menu.Item><div onClick={this.handleClick}>注册</div></Menu.Item>*/}
                            {/*<Menu.Item><div onClick={this.handleClick}>个人设置</div></Menu.Item>*/}
                        {/*</SubMenu>*/}

                        {/*<SubMenu*/}
                            {/*title={<div onClick={this.handleClick}><Icon type="global" /><span className="nav-text">新闻中心</span></div>}*/}
                        {/*>*/}
                            {/*{newsNav}*/}
                        {/*</SubMenu>*/}

                        {/*<Menu.Item>*/}
                                {/*<div onClick={this.handleClick}>*/}
                                    {/*<Icon type="file" />*/}
                                    {/*<span className="nav-text">关于</span>*/}
                                {/*</div>*/}
                        {/*</Menu.Item>*/}
                    </Menu>
                </Sider>
                <Layout style={{ background: "#fff"}}>
                    <Menu
                        onClick={this.navHandleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                    >
                        <Menu.Item key="top">
                            <div onClick={this.handleClick} style={{fontSize:24}}>头条</div>
                        </Menu.Item>
                        <Menu.Item key="shehui">
                            <div onClick={this.handleClick} style={{fontSize:24}}>社会</div>
                        </Menu.Item>
                        <Menu.Item key="guonei">
                            <div onClick={this.handleClick} style={{fontSize:24}}>国内</div>
                        </Menu.Item>
                        <Menu.Item key="guoji">
                            <div onClick={this.handleClick} style={{fontSize:24}}>国际</div>
                        </Menu.Item>
                        <Menu.Item key="yule">
                            <div onClick={this.handleClick} style={{fontSize:24}}>娱乐</div>
                        </Menu.Item>
                        <Menu.Item key="tiyu">
                            <div onClick={this.handleClick} style={{fontSize:24}}>体育</div>
                        </Menu.Item>
                        <Menu.Item key="junshi">
                            <div onClick={this.handleClick} style={{fontSize:24}}>军事</div>
                        </Menu.Item>
                        <Menu.Item key="keji">
                            <div onClick={this.handleClick} style={{fontSize:24}}>科技</div>
                        </Menu.Item>
                        <Menu.Item key="caijing">
                            <div onClick={this.handleClick} style={{fontSize:24}}>财经</div>
                        </Menu.Item>
                        <Menu.Item key="youmaylike">
                            <div onClick={this.handleClick} style={{fontSize:24}}>我喜欢</div>
                        </Menu.Item>
                        {/*<Menu.Item key="shishang">*/}
                            {/*<div onClick={this.handleClick} style={{fontSize:24}}>时尚</div>*/}
                        {/*</Menu.Item>*/}
                    </Menu>
                    <Users loginShow={this.state.loginShow} regShow={this.state.regShow} setShow={this.state.setShow} cancel={this.handleModalCancel} loginToRegister={this.handleLoginToRegister}/>
                    <News newsArr={this.state.newsArr} show={this.state.newsShow} column={this.state.column} columnLikeRatio={this.state.columnLikeRatio} />
                    <About duringDays={this.state.duringDays} newsNum={this.state.newsArr.length} show={this.state.aboutShow} />
                </Layout>
            </Layout>
        );
    }
}

function getUserInfo() {
    var userInfo = Cookie.getJSON('userInfo');
    return userInfo;
}

function getWelcomedInfo() {
    var userInfo = getUserInfo();
    if(userInfo == undefined){
        return "please log in";
    }else{
        return userInfo.name;
    }
}


function getMaxOfArrObj(arr, property) {
    var result = 0;
    for(let item of arr){
        if(item[property] > result) result = item[property];
    }
    return result;
}

export default App;