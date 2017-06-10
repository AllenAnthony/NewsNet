import React from 'react';
import {Modal,message} from 'antd';
import Cookie from 'js-cookie';
import 'antd/dist/antd.css';

class Setting extends React.Component{
    state={
        show:false,
        confirmLoading:false,
        values:[5,5,5,5,5,5,5,5,5,5],
    }
    type=["toutiao","shehui","guonei","guoji","yule","tiyu","junshi","keji","caijing","shishang"];

    handleOK=()=>{
        let userInfo=Cookie.getJSON('userInfo');
        const url = 'http://127.0.0.1:3000/setting';
        let req=new Request(url,{
            method:'POST',
            body:'name=${userInfo.name}&settingArr=${this.state.values}',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        fetch(req).then((response)=>{
            return response.json();
        }).then((data)=>{
           if(data.code==0){
               Cookie.set("userInfo",data);
               message.success(data.msg);

               this.setState({
                   show: false,
               })
           }else{
               message.warning(data.msg);
           }
        });

    }

    handleChange=(event)=>{
        let inputArray=event.target.parenrNode.parentNode.childNodes;
        let newValues=[];
        for(let i=0;i<inputArray.length;i++){
            let tmp=inputArray[i].childNodes[6].value;
            tmp=tmp > 5 ? 5:tmp;
            tmp=tmp < 0 ? 0:tmp;
            newValues[i]=tmp;
        }

        this.setState({
            values:newValues,
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.state.show!=nextProps.show){
            let userInfo=Cookie.getJSON('userInfo');
            if(userInfo==undefined){
                message.warning("please login in at first");
            }else{
                this.setState({
                    show:nextProps.show,
                    values:[userInfo.pre_top, userInfo.pre_shehui, userInfo.pre_guonei, userInfo.pre_guoji, userInfo.pre_yule, userInfo.pre_tiyu, userInfo.pre_junshi, userInfo.pre_keji, userInfo.pre_caijing, userInfo.pre_shishang],
                })
            }
        }
    }

    render(){
        let textCSS = {
            fontFamily: '微软雅黑',
            fontSize:  '18px',
            lineHeight: '24px',
            paddingBottom: '12px'
        };

        let settingArr=this.type.map((item,index)=>{
            return (
                <div key={index} style={textCSS}>
                    {item}：<input id={index} type="number" value={this.state.values[index]} onChange={this.handleChange} />
                </div>
            )
        })

        return (
            <Modal
                width={360}
                title="个人偏好设置"
                visible={this.state.show}
                onCancel={this.props.cancel}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
            >
                <div style={{margin: '24px 0px 24px 30px'}}>
                    {settingArr}
                </div>
            </Modal>
        );
    };

}

export default Setting;