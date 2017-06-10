import React from 'react';
import {Modal, Alert} from 'antd';
import superagent from 'superagent';
import cheerio from 'cheerio';
import Cookie from 'js-cookie';
import 'antd/dist/antd.css';

class Card extends React.Component{
    state = {
        imgRatio: "140%",
        imgOpacity: 1,
        textOpacity: 0,
        text: false,
        newsContent: "",
    }

    timer={
        in:null,
        out:null,
    }

    intoImg=(event)=>{
        if(this.timer.out!==null)
            clearInterval(this.timer.out);

        let nowRatio=Number.parseInt(this.state.imgRatio);
        let nowImgOpacity=this.state.imgOpacity;
        let nowTextOpacity=this.state.textOpacity;

        this.timer.in=setInterval(()=>{
            if(nowRatio<=110){
                clearInterval(this.state.timer.in);
            }else{
                nowRatio--;
                nowImgOpacity-=0.015;
                nowTextOpacity+=0.045;
                this.setState({
                    imgRatio: nowRatio+"%",
                    imgOpacity: nowImgOpacity,
                    textOpacity: nowTextOpacity,
                })
            }
        },40);
    }

    outImg=(event)=>{
        if(this.timer.in!==null)
            clearInterval(this.timer.in);

        let nowRatio=Number.parseInt(this.state.imgRatio);
        let nowImgOpacity=this.state.imgOpacity;
        let nowTextOpacity=this.state.textOpacity;

        this.timer.in=setInterval(()=>{
            if(nowRatio>=140){
                clearInterval(this.timer.out);
            }else{
                nowRatio++;
                nowImgOpacity+=0.015;
                nowTextOpacity-=0.045
                this.setState({
                    imgRatio: nowRatio+"%",
                    imgOpacity:nowImgOpacity,
                    textOpacity: nowTextOpacity,
                })
            }
        },40);
    }

    //scrape the content of news
    clickImg=(event)=>{
        superagent.get(this.props.url).end((err,sres)=>{
            let $ = cheerio.load(sres.text);//$代表sres.text
            let content = $('#content').text().trim();//$('#content')表示在sres.text中id为content的内容

            // JSX 默认转义所有字符串，需要 dangerouslySetInnerHTML
            let promise=new Promise((resolve,reject)=>{
                resolve(content);
            });

            promise.then((data)=>{// first step
                // 中间有不可显字符
                let result = data.replace(/[\n\s]+/g, "<br />");
                return result;
            }).then((data)=>{// second step
                this.setState({
                    text:true,
                    newContent:data,
                });
            })
        })

        //push the information of user into db
        let userInfo = Cookie.getJSON('userInfo');
        let req;
        let reqBody;
        if(userInfo==undefined){
            reqBody=`newsID=${this.props.id}`;
        }else{
            reqBody=`name=${userInfo.name}&newsID=${this.props.id}&column=${this.props.type}`;
        }

        req=new Request('http://127.0.0.1:3000/user_behaviour',{
            method: 'POST',
            body: req_body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        fetch(req).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data.msg);
        })
    }

    handleCancel=(event)=>{
        this.setState({text:false});
    }

    render(){
        let cardCSS = {
            display: 'inline-block',
            width: '16.667%',
            height: '200px',
            overflow: 'hidden',
            background: '#000',
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
            padding: '10px 24px',
            fontFamily: '微软雅黑',
            fontSize: '20px',
            lineHeight: '40px'
        }
        let typeAndTitle = "["+this.props.type+"] "+this.props.title;
        return(
            <div style={cardCSS} onClick={this.clickImg} onMouseOver={this.intoImg()} onMouseOut={this.outImg()}>
                <div style={typeAndTitleCSS}>{typeAndTitle}</div>
                <div>
                    <img style={imageCSS} src={this.props.image}/>
                </div>
                {/*对话框*/}
                <Modal
                    width="1100px"
                    title={typeAndTitle}
                    visible={this.state.text}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div style={contentCSS}>
                        正文：
                        <div dangerouslySetInnerHTML={{__html: this.state.newsContent}} /> {/*通常dangerSetInnerHTML(这个糟糕的单词，，这么长。。)是和__html配套使用的，用来在一个标签中插入许多个标签(安全的插入)；*/}

                        <span style={{paddingLeft: '630px'}}>
                            时间：{this.props.time}
                            <a target="_blank" href={this.props.url} style={{paddingLeft: '20px'}}>原文链接</a>
                        </span>
                    </div>
                </Modal>
            </div>
        );
    }

}



export default Card;