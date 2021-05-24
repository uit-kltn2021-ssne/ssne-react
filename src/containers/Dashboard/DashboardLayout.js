import React from 'react';
import '../Dashboard/DashboardLayout.css';
import { Layout, Menu } from 'antd';
import { Calendar } from 'antd';
import { Row, Col } from 'antd';
import { Table } from 'antd';
import { Avatar } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
// import TextInputComponent from '../../components/TextInput/textinput.js';
const { Content, Footer, Sider } = Layout;
const { Column, ColumnGroup } = Table;
class LayoutWeb extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    function onPanelChange(value, mode) {
      console.log(value.format('YYYY-MM-DD'), mode);
    }
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
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <div class='user-avatar'>
              <Avatar size={64} icon={<UserOutlined />}
                style={{
                  cursor: 'pointer',
                  width: 64,
                  height: 64,
                }} />
              <div class='infor'>
                <span> Student</span>
                <span> DEV </span>
              </div>
            </div>
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              DashBoard
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Colleague
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Calendar
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Tasks
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Day Off
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              ChatBot
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Row>
              <Col span={1}>Day Off</Col>
              <Col span={2}>Colleague</Col>
              <Col span={3}>Tasks</Col>
            </Row>
            <Row>
              <Calendar onPanelChange={onPanelChange} />
            </Row>
            <Row>
              <Col className="dayoff">
                <div>
                  <span>Day Off</span>
                </div>
                <ul>
                  <li>
                    <div>
                      <span> Day 1</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span> Day 2</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span> Day 3</span>
                    </div>
                  </li>
                </ul>
              </Col>
              <Col className="table-task">
                <Table dataSource={data}>
                  <ColumnGroup title="Name">
                    <Column title="First Name" dataIndex="firstName" key="firstName" />
                    <Column title="Last Name" dataIndex="lastName" key="lastName" />
                  </ColumnGroup>
                  <Column title="Age" dataIndex="age" key="age" />
                  <Column title="Address" dataIndex="address" key="address" />
                </Table>
              </Col>
            </Row>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default LayoutWeb;