import React from 'react';
import { Layout, Menu, Avatar, Button } from 'antd';
import {
    DashboardOutlined,
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
import { Helmet } from "react-helmet";


const { Content, Footer, Sider, Header } = Layout;
function DefaultLayout(props) {
    const dataUser = JSON.parse(getUser());
    console.log(dataUser);
    const employeeInfo = dataUser.employee_info;
    let history = useHistory();
    const Logout = () => {
        removeToken();
        removeUser();
        history.push('/login');
    }
    return (
        <Layout >
            <Header>
                <Menu theme="dark" mode="horizontal" style={{ background: "#3F51B5", color: "#FFFFFF", display: 'flex', flexDirection: 'row' }}>
                    <Menu.Item key="1" style={{ color: "#FFFFFF" }}>ChatbotHH</Menu.Item>
                    <Menu.Item key="5" style={{ marginLeft: auto, color: "#FFFFFF" }} onClick={Logout}> Log Out </Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider style={{ background: "#FFFFFF" }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" style={{ background: "#FFFFFF" }}>
                        <div className='user-avatar'>
                            <Avatar size={90} icon={<UserOutlined />} src={"https://api.ssne.xyz" + employeeInfo.avatar.url}
                                style={{
                                    cursor: 'pointer',
                                    width: 90,
                                    height: 90,
                                }} />
                            <div className='infor'>
                                <p style={{ paddingTop: '20px', color: "#66788A", fontSize: "17px" }}> {employeeInfo.name}</p>
                                <p style={{ paddingTop: '10px', color: "#66788A", fontSize: "17px" }}>  {employeeInfo.position}</p>
                            </div>
                        </div>

                        <Menu.Item key="1" icon={<DashboardOutlined />} style={{ color: "#0000FF", fontSize: "18px" }}>
                            <Link to="/dashboard" style={{ color: "#66788A" }}> Bảng Điều Khiển </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined />} style={{ color: "#0000FF", fontSize: "18px" }}>
                            <Link to="/colleague" style={{ color: "#66788A" }}> Nhân Viên </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<CalendarOutlined />} style={{ color: "#0000FF", fontSize: "18px" }}>
                            <Link to="/calendar" style={{ color: "#66788A" }}> Lịch trình </Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<AlignLeftOutlined />} style={{ color: "#0000FF", fontSize: "18px" }}>
                            <Link to="/tasks" style={{ color: "#66788A" }}> Công Việc </Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<CalendarOutlined />} style={{ color: "#0000FF", fontSize: "18px" }}>
                            <Link to="/dayoffs" style={{ color: "#66788A" }}>Ngày nghỉ </Link>
                        </Menu.Item>
                        <Menu.Item key="6" icon={<QuestionOutlined />} style={{ color: "#0000FF", fontSize: "18px" }}>
                            <Link to="/faqs" style={{ color: "#66788A" }}>FAQS</Link>
                        </Menu.Item>
                        {/* <Menu.Item key="7" icon={<RobotOutlined />} style={{ color: "#0000FF", fontSize: "18px" }}>
                            <Link to="/chatbot" style={{ color: "#66788A" }}>Chat Bot</Link>
                        </Menu.Item> */}
                        <Menu.Item key="8" icon={<RobotOutlined />} style={{ color: "#0000FF", fontSize: "18px" }}>
                            <Link to="/checklist" style={{ color: "#66788A" }}>Danh mục công việc</Link>
                        </Menu.Item>
                        <Menu.Item key="9" icon={<RobotOutlined />} style={{ color: "#0000FF", fontSize: "18px" }}>
                            <Link to="/article" style={{ color: "#66788A" }}>Bài viết</Link>
                        </Menu.Item>
                        {/* <Menu.Item key="10" icon={<RobotOutlined />} style={{ color: "#0000FF", fontSize: "18px" }}>
                            <Link to="/support" style={{ color: "#66788A" }}>Hỗ Trợ</Link>
                        </Menu.Item> */}
                        {/* <Menu.Item key="11" icon={<RobotOutlined />} style={{ color: "#0000FF" ,fontSize: "18px"}}>
                            <Link to="/support-reply" style={{ color: "#66788A" }}>Câu trả lời hỗ trợ</Link>
                        </Menu.Item> */}
                    </Menu>
                </Sider>
                <Content style={{ padding: '20px' }}>
                    {props.children}
                </Content>
            </Layout>
            <Helmet>
                <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
            </Helmet>
            <df-messenger
                intent="WELCOME"
                chat-icon="https://img.icons8.com/glyph-neue/64/000000/bot.png"
                chat-title="Chatbot"
                agent-id="1c418cdf-98a3-4492-8ecf-60033905475b"
                language-code="en"
            ></df-messenger>
            <Footer style={{ textAlign: 'center' }}>ChatBot HH</Footer>
        </Layout>
    );
}
export default DefaultLayout;