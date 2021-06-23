import React from 'react';
import '../Dashboard/DashboardLayout.css';
import { Layout } from 'antd';
import { Calendar,  Row, Col, Button, Table } from 'antd';
import {
  CalendarOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCountDayOff, getDayOffs } from '../../reducer/Dayoff';
import { getCountEmployees, getEmployees } from '../../reducer/Employee';
import { getCountTasks, getTasks } from '../../reducer/Task';
import { getToken, removeToken, removeUser } from '../../utils/AuthUtils';
import { useHistory } from 'react-router-dom';

const { Column } = Table;

function LayoutWeb(props) {
  const [collapsed, setCollapsed] = useState(false);
  let history = useHistory();
  const onCollapsed = () => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };
  const jwt = getToken();
  console.log(jwt);
  function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDayOffs(jwt));
    dispatch(getCountDayOff(jwt));
    dispatch(getEmployees(jwt));
    dispatch(getCountEmployees(jwt));
    dispatch(getTasks(jwt));
    dispatch(getCountTasks(jwt));
  },[dispatch, jwt]);
  const dayoffs = useSelector((store) => store.dayoffs.data);
  const count_dayoff =useSelector((store) => store.dayoffs.count);
  const employees = useSelector((store) => store.employees.data);
  const count_employees = useSelector((store) => store.employees.count);
  const tasks = useSelector((store) => store.tasks.data);
  const count_tasks = useSelector((store) => store.tasks.count);
  console.log(tasks);
  console.log(count_tasks);
  const listDayOff = dayoffs.map((dayoffs) => 
        <li> {dayoffs.reason}</li>
  );
  const Logout =() => {
      removeToken();
      removeUser();
      history.push('/login');
  }
  const onSelectDateHandler=(value)=>{
    console.log(value)
  }
  console.log("render dashboard");
  return (
    <>
      {console.log("render dashboard")}
          <div>
            <Row className="row-in-dashboard-1">
              <Col span={7} className="col-content">
                <Row>
                  <Col span={12} className="col-dayoff">
                    <p>Day Off</p>
                    <p>{count_dayoff}</p>
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
                    <p>{count_employees}</p>
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
                    <p>{count_tasks}</p>
                  </Col>
                  <Col span={12} className="col-icon" style={{ color: "#EC4C47" }}>
                    <CalendarOutlined />
                  </Col>
                </Row>
              </Col>
              <Col span={1} >
                <Button type="primary" onClick={Logout}>Log out</Button>
              </Col>
            </Row>
          </div>
          <Row style={{ justifyContent: "center" }}>
            <Col span={20}>
              <Calendar onPanelChange={onPanelChange} onSelect={onSelectDateHandler} />
            </Col>
          </Row>
          <Row className="row-in-dashboard-2">
            <Col span={8} className="dayoff">
              <div>
                <h1>Reason for Day Off</h1>
                <ul>
                  {listDayOff}
                </ul>
              </div>
            </Col>
            <Col span={16} className="table-task">
              <Table dataSource={employees}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Facebook" dataIndex="facebook" key="facebbook"/>
                <Column title="Skypeid" dataIndex="skypeId" key="skypeId" />
                <Column title="PhoneNumber" dataIndex="phoneNumber" key="phoneNumber" />
                <Column title="Introduction" dataIndex="introduction" key="introduction"/>
              </Table>
            </Col>
          </Row>
         </>
  );
}
export default LayoutWeb;