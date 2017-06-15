import React from 'react';
import { Form, Icon, Input, Checkbox, Modal } from 'antd';
import {login} from './util';
import 'antd/dist/antd.css';
import './login.css'

const FormItem = Form.Item;

class LoginForm extends React.Component{
    state = {
        show: false,
        confirmLoading: false,
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                var success = login(values.username, values.password, (result) => {
                    if(result){
                        this.setState({
                            show: false,
                        })
                    }
                });
            }
        });
    }
    handleOk = () => {
        this.handleSubmit(event);
    };
    componentWillReceiveProps(nextProps) {
        this.setState({
            show: nextProps.show
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        return (
            <Modal
                width={720}
                title="用户登录"
                visible={this.state.show}
                onCancel={this.props.cancel}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
            >
                <div style={{ margin: '30px 0px 0px 43px' }}>
                    <Form onSubmit={this.handleSubmit} >
                        <FormItem
                            {...formItemLayout}
                            label="Username"
                            hasFeedback
                        >
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="password"
                            hasFeedback
                        >
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input />
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

const Login = Form.create()(LoginForm);

export default Login;