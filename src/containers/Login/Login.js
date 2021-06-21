import React from 'react';
import axios from 'axios';
import '../Login/Login.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Layout, Menu } from 'antd';
import { storeToken, getToken, storeUser } from '../../utils/AuthUtils';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
const { Header, Content } = Layout;
export default function Login(props) {
    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");
    useEffect(() => {
    }, []);
    const setUsername = event => {
        setUserName(event.target.value);
    }
    const setPassword = event => {
        setPassWord(event.target.value);
    }
    const handleSubmit = event => {
        event.preventDefault();
        console.log(username);
        console.log(password);
        axios.post('https://api.ssne.xyz/auth/local', {
            identifier: username,
            password: password,
        })
            .then(res => {
                const data = res.data;
                storeToken(data.jwt);
                storeUser(JSON.stringify(data.user));
                props.history.push('/dashboard');

            })
            .catch(error => console.log(error));
    }
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
                            <Input onChange={setUsername} />
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
                            <Input.Password onChange={setPassword} />
                        </Form.Item>

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
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