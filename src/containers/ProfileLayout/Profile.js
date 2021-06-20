import React from 'react';
import '../ProfileLayout/Profile.css';
import { Button, Layout, Menu, Input } from 'antd';
import { Avatar } from 'antd';
import { Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;

class Profile extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">Profile</Menu.Item>
                        <Menu.Item key="2">Account</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Row>
                        <div id='data-user'>
                            <Col id="avatar">
                                <Row>
                                    <Avatar size={64} icon={<UserOutlined />} />
                                </Row>
                                <Button id='upload'>Upload Picture</Button>
                                <Button id='remote'>Remote Picture</Button>
                            </Col>

                            <Col id="profile">
                                <Row>
                                    <span>Basic Profile</span>
                                </Row>
                                <Row>
                                    <Input size="large" placeholder="Họ và tên đệm" />
                                    <br />
                                    <Input size="large" placeholder="Email" />
                                    <br />
                                    <Input size="large" placeholder="Địa chỉ" />
                                    <br />
                                </Row>
                                <Row>
                                    <Input size="large" placeholder="Tên" />
                                    <br />
                                    <Input size="large" placeholder="Số điện thoại" />
                                    <br />
                                    <Input size="large" placeholder="Tỉnh" />
                                    <br />
                                </Row>
                                <Button type="primary">Save Setting</Button>
                            </Col>
                        </div>
                    </Row>

                    <Row>
                    </Row>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
}
export default Profile;