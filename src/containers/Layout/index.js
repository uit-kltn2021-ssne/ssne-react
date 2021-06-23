import React from 'react';
import { Layout, Menu, Avatar, Button } from 'antd';
import {
    DashboardOutlined,
    DesktopOutlined,
    CalendarOutlined,
    AlignLeftOutlined,
    QuestionOutlined,
    RobotOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getUser } from '../../utils/AuthUtils';
import "../Layout/index.css"
import { removeToken, removeUser } from '../../utils/AuthUtils';
import { useHistory } from 'react-router-dom';
import { auto } from '@popperjs/core';


const { Content, Footer, Sider, Header } = Layout;
function DefaultLayout(props) {
    const dataUser = JSON.parse(getUser());
    console.log(dataUser);
    const employeeInfo = dataUser.employeeInfo;
    console.log(employeeInfo);
    let history = useHistory();
    const Logout = () => {
        removeToken();
        removeUser();
        history.push('/login');
    }
    return (
        <Layout >
            <Header>
                    <Menu theme="dark" mode="horizontal" style={{ background: "#3F51B5", color: "#FFFFFF" ,display:'flex', flexDirection:'row' }}>
                        <Menu.Item key="1" style={{ color: "#FFFFFF" }}>ChatbotHH</Menu.Item>
                        <Menu.Item key="5" style={{marginLeft:auto, color: "#FFFFFF" }} onClick={Logout}> Log Out </Menu.Item>
                    </Menu>
            </Header>
            <Layout>
                <Sider style={{ background: "#FFFFFF" }}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{ background: "#FFFFFF" }}>
                        <div className='user-avatar'>
                            <Avatar size={64} icon={<UserOutlined />} src={"https://api.ssne.xyz" + employeeInfo.avatar.url}
                                style={{
                                    cursor: 'pointer',
                                    width: 64,
                                    height: 64,
                                }} />
                            <div className='infor'>
                                <p style={{ padding: '10px', color: "#66788A" }}> {employeeInfo.name}</p>
                                <p style={{ color: "#66788A" }}>  {employeeInfo.position}</p>
                            </div>
                        </div>

                        <Menu.Item icon={<DashboardOutlined />} style={{ color: "0000FF" }}>
                            <Link to="/dashboard" style={{ color: "#66788A" }}> Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item icon={<UserOutlined />} style={{ color: "#0000FF" }}>
                            <Link to="/colleague" style={{ color: "#66788A" }}> Colleague</Link>
                        </Menu.Item>
                        <Menu.Item icon={<CalendarOutlined />} style={{ color: "#0000FF" }}>
                            <Link to="/calendar" style={{ color: "#66788A" }}> Calendar</Link>
                        </Menu.Item>
                        <Menu.Item icon={<AlignLeftOutlined />} style={{ color: "#0000FF" }}>
                            <Link to="/tasks" style={{ color: "#66788A" }}>Tasks</Link>
                        </Menu.Item>
                        <Menu.Item icon={<CalendarOutlined />} style={{ color: "#0000FF" }}>
                            <Link to="/dayoffs" style={{ color: "#66788A" }}>Day Off</Link>
                        </Menu.Item>
                        <Menu.Item icon={<QuestionOutlined />} style={{ color: "#0000FF" }}>
                            <Link to="/faqs" style={{ color: "#66788A" }}>FAQS</Link>
                        </Menu.Item>
                        <Menu.Item icon={<RobotOutlined />} style={{ color: "#0000FF" }}>
                            <Link to="/chatbot" style={{ color: "#66788A" }}>Chat Bot</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    {props.children}
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
}
export default DefaultLayout;