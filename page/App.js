import React from 'react';
import { Layout, Menu, Icon, message } from 'antd';
import Cookie from 'js-cookie';

import User from "../element/user/index";
import News from "../element/news/index";
import About from "../element/about/index";
import {updateCookie} from "../element/user/util";

import "antd/dist/antd/antd.css";
import "./App.css"

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

function getUsesrInfo(){
    return Cookie.getJSON('userInfo');
}

function getWelcomeInfo(){
    let userInfo = getUsesrInfo();
    if(userInfo == undefined){
        return "please login in at first !"
    }else{
        return "welcome, "+userInfo.name;
    }
}

function getMaxOfArray(arr,property){
    let result=0;
    for(let item in arr){
        if(item[property] > result){
            result = item[property];
        }
    }

    return result;
}

class App extends React.Component{
    state = {
        loginShow: false,
        regShow: false,
        setShow: false,
        newsShow: false,
        aboutShow: false,
        collapsed: false,
        loginTextShow: true,
        mode: 'inline',
        newsArr: [],
        newsType: ["猜你喜欢", "头条", "社会", "国内", "国际", "娱乐", "体育", "军事", "科技", "财经", "时尚"],
        duringDays: 0,
        column: "头条",   //默认栏目头条
        columnLikeRatio: [],
    }

    onCollapse = (collapsed) => {
        this.setState({
            collapse,
            mode: collapsed? 'vertical' : 'inline',
            loginTextShow: !collapsed
        });
    };

    handleClick = (event) => {
        let value = event.target.outerHTML;
        let nowState;

        if(value.includes("login in")){
            nowState = {
                loginShow: true,
                regShow: false,
                setShow: false,
            }
        }else if(value.includes("sign up")){
            nowState = {
                loginShow: false,
                regShow: true,
                setShow: false,
            };
        }else if(value.includes("individual setting")){
            nowState = {
                loginShow: false,
                regShow: false,
                setShow: true,
            };
        }else if(value.includes("news center") || value.includes("global")){
            nowState = {
                loginShow: false,
                regShow: false,
                setShow: false,
                newsShow: true,
                aboutShow: false,
            }
        }else if(value.includes("about") || value.includes("file")){
            nowState = {
                loginShow: false,
                regShow: false,
                setShow: false,
                newsShow: false,
                aboutShow: true,
            }
        }else{
            let column = event.target.innerText;
            if(column == "you may like"){
                let userInfo = getUsesrInfo();
                if(userInfo == undefined){
                    message.warning("please login in at first");
                }else{
                    updateCookie(userInfo.name, userInfo.email, (result) => {
                        nowState = {
                            loginShow: false,
                            regShow: false,
                            setShow: false,
                            newsShow: true,
                            aboutShow: false,
                        };

                        userInfo = getUserInfo();
                        nowState.column = "you may like";
                        let tmpLikeRatio = [{
                            type: "toutiao",
                            like: userInfo.pre_top,
                            visit: userInfo.visit_top,
                            ratio: 0
                        },{
                            type: "shehui",
                            like: userInfo.pre_shehui,
                            visit: userInfo.visit_shehui,
                            ratio: 0
                        },{
                            type: "guonei",
                            like: userInfo.pre_guonei,
                            visit: userInfo.visit_guonei,
                            ratio: 0
                        },{
                            type: "guoji",
                            like: userInfo.pre_guoji,
                            visit: userInfo.visit_guoji,
                            ratio: 0
                        },{
                            type: "yule",
                            like: userInfo.pre_yule,
                            visit: userInfo.visit_yule,
                            ratio: 0
                        },{
                            type: "tiyu",
                            like: userInfo.pre_tiyu,
                            visit: userInfo.visit_tiyu,
                            ratio: 0
                        },{
                            type: "junshi",
                            like: userInfo.pre_junshi,
                            visit: userInfo.visit_junshi,
                            ratio: 0
                        },{
                            type: "keji",
                            like: userInfo.pre_keji,
                            visit: userInfo.visit_keji,
                            ratio: 0
                        },{
                            type: "caijing",
                            like: userInfo.pre_caijing,
                            visit: userInfo.visit_caijing,
                            ratio: 0
                        },{
                            type: "shishang",
                            like: userInfo.pre_shishang,
                            visit: userInfo.visit_shishang,
                            ratio: 0
                        }];
                        let maxVisit = getMaxOfArray(tmpLikeRatio, "visit");
                        let sumRatio = 0;

                        for(let item of tmpLikeRatio){
                            item.ratio = (0.5*item.visit/maxVisit) + (0.5*item.like/5);
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

    handleCancel = () => {
        this.setState({
            loginShow: false,
            regShow: false,
            setShow: false,
        })
    }

    handleLoginToregiser = () =>{
        this.setState({
            loginShow: false,
            regShow: true,
            setShow: false,
        })
    }

    compomentDidMount() {
        const url = 'http://127.0.0.1:3000/init';
        let req = new Requset(url, {method: 'GET',type:'json'});

        const mSecPerDay = 86400000;
        const startTime = new Date("June 7 2017");
        let nowTime = Date.now();
        let duringDays = (nowTime - startTime)/mSecPerDay;

        fetch(req).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);

            if(data.code==0){
                this.setState({
                    newsArr: data.content,
                    duringDays: Number.parseInt(duringDays),
                })
            }else{
                alert("server respond incorrectly");
            }
        })
    }

    render(){
        let userStateCSS = {
            margin: '10px 18px 6px 18px',
            textAlign: 'center',
            fontSize: '20px',
            fontFamily: '微软雅黑',
            color: '#ffffff',
            display: this.state.loginTextShow ? 'block' : 'none',
        }

        let newsNav = this.state.newsType.map((item,index)=>{
            return(
                <Menu.Item key={index}>
                    <div onClick={this.handleClick()}>
                        {item}
                    </div>
                </Menu.Item>
            )
        })

        return (
            <Layout style={{ height: "100vh" }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <div style={userStateCSS}>
                        {getWelcomedInfo()}
                        <hr style={{marginTop: '5px'}} />
                    </div>
                    <Menu theme="dark" mode={this.state.mode}>
                        <SubMenu
                            title={<div><Icon type="user" /><span className="nav-text">user center</span></div>}
                        >
                            <Menu.Item><div onClick={this.handleClick}>login in</div></Menu.Item>
                            <Menu.Item><div onClick={this.handleClick}>sign up</div></Menu.Item>
                            <Menu.Item><div onClick={this.handleClick}>individual setting</div></Menu.Item>
                        </SubMenu>

                        <SubMenu
                            title={<div onClick={this.handleClick}><Icon type="global" /><span className="nav-text">news center</span></div>}
                        >
                            {newsNav}
                        </SubMenu>

                        <Menu.Item>
                            <div onClick={this.handleClick}>
                                <Icon type="file" />
                                <span className="nav-text">about</span>
                            </div>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ background: "#fff"}}>
                    <Users loginShow={this.state.loginShow} regShow={this.state.regShow} setShow={this.state.setShow} cancel={this.handleModalCancel} loginToRegister={this.handleLoginToRegister}/>
                    <News newsArr={this.state.newsArr} show={this.state.newsShow} column={this.state.column} columnLikeRatio={this.state.columnLikeRatio} />
                    <About duringDays={this.state.duringDays} newsNum={this.state.newsArr.length} show={this.state.aboutShow} />
                </Layout>
            </Layout>
        )

    }



}

export default App;