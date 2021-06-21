import React from 'react';
import '../Dashboard/DashboardLayout.css';
import { Layout, Menu } from 'antd';
import { Calendar, Avatar, Row, Col, Button, Table } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getDayOff } from '../../reducer/Dayoff';

const { Content, Footer, Sider } = Layout;
const { Column } = Table;

function LayoutWeb() {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapsed = () => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };
  const dataUser = JSON.parse(sessionStorage.getItem("resData"));
  console.log(dataUser);
  var employeeInfo = dataUser.user.employeeInfo;
  var jwt = dataUser.jwt;
  function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    // Cập nhật tiêu đề trang web sử dụng API trình duyệt
    dispatch(getDayOff(jwt));
  },[dispatch, jwt]);
  const dayoff = useSelector(( store) => store.dayoff.data);
  console.log(dayoff);
  const data = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
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
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/dashboard"> Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/colleague"> Colleague</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/calendar"> Calendar</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/tasks">Tasks</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/dayoff">Day Off</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/chatbot">Chat Bot</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content>
          <div>
            <Row className="row-in-dashboard-1">
              <Col span={7} className="col-content">
                <Row>
                  <Col span={12} className="col-dayoff">
                    <p>Day Off</p>
                    <p>4</p>
                  </Col>
                  <Col span={12} className="col-icon" style={{ color: "#EC4C47" }}>
                    <CalendarOutlined className='icon-cal' />
                  </Col>
                </Row>
              </Col>
              <Col span={7} className="col-content">
                <Row>
                  <Col span={12} className="col-dayoff">
                    <p>Colleague</p>
                  </Col>
                  <Col span={12} className="col-icon" style={{ color: "#EC4C47" }}>
                    <CalendarOutlined />
                  </Col>
                </Row>
              </Col>
              <Col span={7} className="col-content">
                <Row>
                  <Col span={12} className="col-dayoff">
                    <p>Task</p>
                  </Col>
                  <Col span={12} className="col-icon" style={{ color: "#EC4C47" }}>
                    <CalendarOutlined />
                  </Col>
                </Row>
              </Col>
              <Col span={1} >
                <Button type="primary">Log out</Button>
              </Col>
            </Row>
          </div>
          <Row style={{ justifyContent: "center" }}>
            <Col span={20}>
              <Calendar onPanelChange={onPanelChange} />
            </Col>
          </Row>
          <Row className="row-in-dashboard-2">
            <Col span={8} className="dayoff">
              <div>
                <h1>Day Off</h1>
                <ul>
                  <li>
                    <span> Day 1</span>
                  </li>
                  <li>
                    <span> Day 2</span>
                  </li>
                  <li>
                    <span> Day 3</span>
                  </li>
                </ul>
              </div>
            </Col>
            <Col span={16} className="table-task">
              <Table dataSource={data}>
                <Column title="Name" dataIndex="firstName" key="firstName" />
                <Column title="Email" dataIndex="lastName" key="lastName" />
                <Column title="Skypeid" dataIndex="age" key="age" />
                <Column title="PhoneNumber" dataIndex="address" key="address" />
              </Table>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}
export default LayoutWeb;