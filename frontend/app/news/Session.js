import React from 'react';
import {Modal, Alert,Card} from 'antd';
import superagent from 'superagent';
import cheerio from 'cheerio';
import Cookie from 'js-cookie';
import 'antd/dist/antd.css';
import './Session.css';
//import * as fs from 'fs';

// 暂时不考虑卡片打开后 内部的图
class Session extends React.Component{
    state = {
        imgRatio: "140%",
        imgOpacity: 1,
        textOpacity: 0,
        text: false,
        newsContent: "",
    };
    clickImg = (event) => {
        superagent.get(this.props.url).end((err, sres) => {
            if(err){
                //error
            }

            let $ = cheerio.load(sres.text);
            let content = $('#content').text().trim();

            let promise = new Promise((resolve, reject) => {
                resolve(content);
            });
            promise.then((data) => {
                let result = data.replace(/[\n\s]+/g, "<br />");
                return result;
            }).then((data) => {
                this.setState({
                    text: true,
                    newsContent: data,
                });
            })
        })

        //将用户操作放入数据库
        let userInfo = Cookie.getJSON('userInfo');
        let req;
        let req_body;
        if(userInfo == undefined){
            req_body = `newsID=${this.props.id}`;
        }else{
            req_body = `name=${userInfo.name}&newsID=${this.props.id}&column=${this.props.type}`;
        }
        console.log("put the user behavior into db");
        console.log(req_body);
        req = new Request('http://127.0.0.1:3000/click_visit', {
            method: 'POST',
            body: req_body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        fetch(req).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data.msg);
        })
    };
    handleCancel = (event) => {
        this.setState({
            text: false,
        });
    };
    render(){
        let cardCSS = {
            display: 'inline-block',
            width: '25%',
            height: '300px',
            overflow: 'hidden',
            background: '#fff',
            cursor: "pointer",
        };
        let imageCSS = {
            width: this.state.imgRatio,
            height: this.state.imgRatio,
            opacity: this.state.imgOpacity,

            textAlign: 'center',
            verticalAlign: 'middle',
        };
        let typeAndTitleCSS = {
            opacity: this.state.textOpacity,

            width: '16.667%',
            height: '200px',
            fontSize: '20px',
            position: 'absolute',
            zIndex: '100',
            color: '#fff',
            textAlign: 'center',
            padding: '60px 1%',
        };
        let contentCSS = {
            padding: '0px 24px',
            fontFamily: '微软雅黑',
            fontSize: '15px',
            lineHeight: '40px'
        };

        let typeAndTitle = "["+this.props.type+"] "+this.props.title+"   ---"+this.props.time;
        return(
            <div style={cardCSS} onClick={this.clickImg} >
                <Card  bodyStyle={{ padding: 5 }}>
                    <div className="custom-image">
                        <img alt="example" width="100%" src={this.props.image} />
                    </div>
                    <div className="custom-card">
                        <h3>{typeAndTitle}</h3>
                    </div>
                </Card>
                <Modal
                    width="1100px"
                    title={typeAndTitle}
                    visible={this.state.text}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div style={contentCSS}>
                        <a target="_blank" href={this.props.url} style={{paddingLeft: '0px'}}>原文链接</a>
                        <div dangerouslySetInnerHTML={{__html: this.state.newsContent}} />
                    </div>
                </Modal>
            </div>
        );

    }
}

export default Session;