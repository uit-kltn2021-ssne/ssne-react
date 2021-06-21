import React from 'react';
import { useState } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { getToken, getUser } from '../../utils/AuthUtils';

const { Content, Footer, Sider } = Layout;
function DefaultLayout(props) {
    const [collapsed, setCollapsed] = useState(false);
    const onCollapsed = () => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };
    const dataUser =JSON.parse(getUser());
    console.log(dataUser);
    const employeeInfo = dataUser.employeeInfo;
    console.log(employeeInfo);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapsed}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <div className='user-avatar'>
                        <Avatar size={64} icon={<UserOutlined />} src={"https://api.ssne.xyz" + employeeInfo.avatar.url}
                            style={{
                                cursor: 'pointer',
                                width: 64,
                                height: 64,
                            }} />
                        <div className='infor'>
                            <p style={{ padding: '10px' }}> {employeeInfo.name}</p>
                            <p> {employeeInfo.position}</p>
                        </div>
                    </div>
                    <Menu.Item icon={<PieChartOutlined />}>
                        <Link to="/dashboard"> Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item icon={<DesktopOutlined />}>
                        <Link to="/colleague"> Colleague</Link>
                    </Menu.Item>
                    <Menu.Item icon={<DesktopOutlined />}>
                        <Link to="/calendar"> Calendar</Link>
                    </Menu.Item>
                    <Menu.Item icon={<DesktopOutlined />}>
                        <Link to="/tasks">Tasks</Link>
                    </Menu.Item>
                    <Menu.Item icon={<DesktopOutlined />}>
                        <Link to="/dayoffs">Day Off</Link>
                    </Menu.Item>
                    <Menu.Item icon={<DesktopOutlined />}>
                        <Link to="/faqs">FAQS</Link>
                    </Menu.Item>
                    <Menu.Item icon={<DesktopOutlined />}>
                        <Link to="/chatbot">Chat Bot</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content>
                    {props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );   
}
export default DefaultLayout;