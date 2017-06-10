import React from 'react';
import { Form, Icon, Input, Checkbox, Modal } from 'antd';
import {login} from './util';
import 'antd/dist/antd.css';
import './login.css'

const FormItem = Form.Item;

class LoginForm extends React.Component{
    state={
        show:false,
        confirmLaoding:false
    }

    handleSubmit=(e)=>{
        e.preventDefault();//通过调用该方法，可以阻止提交表单
        this.props.form.validateFields((err, values) => { //props.form.validateFields方法对表单的各个字段进行校验，校验完成后会调用传入的回调方法，回调方法可以接收到错误信息err和表单值对象values，方便对校验结果进行处理
            let success=login(values.username,values.password,(result)=>{
                if(result){
                    this.setState({
                        show:false,
                    })
                }
            })
        });
    }

    handleOK=()=>{
        this.handleSubmit(event);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            show:nextProps.show,
        })
    }

    render(){
        const{getFieldDecorator}=this.props.from;
        return(
            <Modal
                width={420}
                title="用户登录"
                visible={this.state.show}
                onCancel={this.props.cancel}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
            >
                <div style={{ margin: '30px 0px 0px 43px' }}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot"><span style={{color: '#5f5f5f'}}>Or </span><a onClick={this.props.loginToRegister}>register now!</a></a>
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        );
    }
}

const Login=Form.create()(LoginForm);

export default Login;