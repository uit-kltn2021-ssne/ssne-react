import React from 'react';
import axios from 'axios';
import '../Login/Login.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Layout, Menu } from 'antd';
import { Redirect,Route } from 'react-router-dom';
const { Header, Content } = Layout;
export default class Login extends React.Component {
    constructor(pros) {
        super(pros);
        this.state = {
            username: "",
            password: ""
        };
    }
    setUserName = event => {
        this.setState({ username: event.target.value});
        console.log(this.state.username);
    }
    setPassword = event => {
        this.setState({ password: event.target.value });
    }
    componentDidMount() {
    }
    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.username);
        console.log(this.state.password);
        axios.post('https://api.ssne.xyz/auth/local', {
            identifier: this.state.username,
            password: this.state.password,
        })
            .then(res => {
                const data = res.data;
                console.log(data);
                sessionStorage.setItem('resData', JSON.stringify(data));
                this.props.history.push('/dashboard');

            })
            .catch(error => console.log(error));
    }
    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };
        const onFinish = (values) => {
            console.log('Success:', values);
        };
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">ChatbotHH</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input onChange={this.setUserName} />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password onChange={this.setPassword} />
                            </Form.Item>

                            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="row"> </div>
                </Content>
            </Layout>
        );
    };
};