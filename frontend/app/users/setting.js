import React from 'react';
import { Modal, message,Input,Col} from 'antd';
import Cookie from 'js-cookie';
import 'antd/dist/antd.css';

const InputGroup = Input.Group;

class Setting extends React.Component{
    state = {
        show: false,
        confirmLoading: false,
        values: [6,6,6,6,6,6,6,6,6,6],
    };
    type = ["头条", "社会", "国内", "国际", "娱乐", "体育", "军事", "科技", "财经","时尚"];

    handleOk = () => {
        let userInfo = Cookie.getJSON('userInfo');
        const url = 'http://127.0.0.1:3000/setting';
        let req = new Request(url, {
            method: 'POST',
            body: `name=${userInfo.name}&settingArr=${this.state.values}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log("setting : "+this.state.values);

        fetch(req).then((response) => {
            return response.json();
        }).then((data) => {
            if(data.code == 0){
                Cookie.set('userInfo', data);
                message.success(data.msg);

                this.setState({
                    show: false,
                })

            }else{
                message.warning(data.msg);
            }
        });
    };

    handleChange = (event) => {
        let inputArr = event.target.parentNode.parentNode.childNodes;
        let changedValue = this.state.values;
        let i;
        console.log(inputArr);
        console.log(inputArr.length);
        for(i = 0; i < inputArr.length; i++){
            let tmpResult = Number.parseInt(inputArr[i].childNodes[3].value);
            tmpResult = tmpResult > 6 ? 6 : tmpResult;
            tmpResult = tmpResult < 0 ? 0 : tmpResult;
            changedValue[Number.parseInt(inputArr[i].childNodes[3].id)] = tmpResult;
        }
        console.log(changedValue);
        this.setState({
            values: changedValue,
        })
    };

    componentWillReceiveProps(nextProps) {
        if(this.state.show != nextProps.show){
            let userInfo = Cookie.getJSON('userInfo')
            if(userInfo == undefined){
                message.warning("please sign in");
            }else{
                this.setState({
                    show: nextProps.show,
                    values: [userInfo.pre_top, userInfo.pre_shehui, userInfo.pre_guonei, userInfo.pre_guoji, userInfo.pre_yule, userInfo.pre_tiyu, userInfo.pre_junshi, userInfo.pre_keji, userInfo.pre_caijing,userInfo.pre_shishang]
                })
            }
        }
    }
    render() {
        let textCSS = {
            fontFamily: '微软雅黑',
            fontSize:  '18px',
            lineHeight: '24px',
            paddingBottom: '12px'
        };
        return (
            <Modal
                width={720}
                title="setting"
                visible={this.state.show}
                onCancel={this.props.cancel}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
            >
                <InputGroup size="small">
                    <Col span="12">
                        <div style={{margin: '10px 20px 10px 0px'}} >
                            <div key={0} style={textCSS}>
                                头条：<input id={0} type="number" value={this.state.values[0]} onChange={this.handleChange} />
                            </div>
                        </div>
                    </Col>
                    <Col span="12">
                        <div style={{margin: '10px 20px 10px 0px'}} >
                            <div key={1} style={textCSS}>
                                社会：<input id={1} type="number" value={this.state.values[1]} onChange={this.handleChange} />
                            </div>
                        </div>
                    </Col>
                </InputGroup>

                <InputGroup size="small">
                    <Col span="12">
                        <div style={{margin: '10px 20px 10px 0px'}} >
                            <div key={2} style={textCSS}>
                                国内：<input id={2} type="number" value={this.state.values[2]} onChange={this.handleChange} />
                            </div>
                        </div>
                    </Col>
                    <Col span="12">
                        <div style={{margin: '10px 20px 10px 0px'}} >
                            <div key={3} style={textCSS}>
                                国际：<input id={3} type="number" value={this.state.values[3]} onChange={this.handleChange} />
                            </div>
                        </div>
                    </Col>
                </InputGroup>

                <InputGroup size="small">
                    <Col span="12">
                        <div style={{margin: '10px 20px 10px 0px'}} >
                            <div key={4} style={textCSS}>
                                娱乐：<input id={4} type="number" value={this.state.values[4]} onChange={this.handleChange} />
                            </div>
                        </div>
                    </Col>
                    <Col span="12">
                        <div style={{margin: '10px 20px 10px 0px'}} >
                            <div key={5} style={textCSS}>
                                体育：<input id={5} type="number" value={this.state.values[5]} onChange={this.handleChange} />
                            </div>
                        </div>
                    </Col>
                </InputGroup>

                <InputGroup size="small">
                    <Col span="12">
                        <div style={{margin: '10px 20px 10px 0px'}} >
                            <div key={6} style={textCSS}>
                                军事：<input id={6} type="number" value={this.state.values[6]} onChange={this.handleChange} />
                            </div>
                        </div>
                    </Col>
                    <Col span="12">
                        <div style={{margin: '10px 20px 10px 0px'}} >
                            <div key={7} style={textCSS}>
                                科技：<input id={7} type="number" value={this.state.values[7]} onChange={this.handleChange} />
                            </div>
                        </div>
                    </Col>
                </InputGroup>

                <InputGroup size="small">
                    <Col span="12">
                        <div style={{margin: '10px 20px 10px 0px'}} >
                            <div key={8} style={textCSS}>
                                财经：<input id={8} type="number" value={this.state.values[8]} onChange={this.handleChange} />
                            </div>
                        </div>
                    </Col>
                </InputGroup>
            </Modal>
        );
    }
}

export default Setting;