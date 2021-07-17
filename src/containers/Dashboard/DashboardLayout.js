import React from 'react';
import '../Dashboard/DashboardLayout.css';
import { Calendar, Row, Col, Button, Table } from 'antd';
import {
  CalendarOutlined,
  UserOutlined,
  AlignLeftOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCountDayOff, getDayOffs } from '../../reducer/Dayoff';
import { getCountEmployees, getEmployees } from '../../reducer/Employee';
import { getCountTasks, getTasks } from '../../reducer/Task';
import { getToken } from '../../utils/AuthUtils';
import Modal from 'antd/lib/modal/Modal';

const { Column } = Table;

function LayoutWeb(props) {
  const [collapsed, setCollapsed] = useState(false);
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
  }, [dispatch, jwt]);
  const dayoffs = useSelector((store) => store.dayoffs.data);
  const count_dayoff = useSelector((store) => store.dayoffs.count);
  const employees = useSelector((store) => store.employees.data);
  const count_employees = useSelector((store) => store.employees.count);
  const tasks = useSelector((store) => store.tasks.data);
  const count_tasks = useSelector((store) => store.tasks.count);
  console.log(tasks);
  var dateFrom = null;
  var dateTo = null;
  var id = '';
  console.log(count_tasks);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  // const listDayOff = dayoffs.map((dayoffs) =>
  //   <li> {dayoffs.reason}</li>
  // );
  function randomColor(taskid) {
    var number = 0;
    for (var i = 0; i < taskid.length; i++) {
      number += taskid[i].charCodeAt(0);
    }
    return Math.floor(number * 1677215).toString(16);
  }
  const onSelectDateHandler = (value) => {
    console.log(value);
    showModal();
  }
  function getListData(value) {
    let listData = [];
    if (tasks.length > 0) {
      tasks.forEach(x => {
        console.log(x);
        var color = randomColor(x.id);
        console.log(color);
        let task1 = x;
        console.log(task1);
        var uxiTimestampFrom = Date.parse(task1.from);
        dateFrom = new Date(uxiTimestampFrom);
        var uxiTimestampTo = Date.parse(task1.to);
        dateTo = new Date(uxiTimestampTo);
        let valueuti = Date.parse(value);
        let valuetmp = new Date(valueuti);
        dateFrom.setHours(0, 0, 0);
        dateTo.setHours(0, 0, 0);
        valuetmp.setHours(0, 0, 0);
        if (dateFrom <= valuetmp && dateTo >= valuetmp) {
          listData.push({ type: 'success', content: 'hello', color: "#" + color,id:x.id })
        }
      });
    }
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    console.log(listData);
    return (
      <div className="events">
        {
          listData.map(item => (
            <div className="canledar-data" task={item.id} style={{ backgroundColor: item.color }}>
            </div>
          ))
        }
      </div>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }
  return (
    <>
      <div>
        <Row className="row-in-dashboard-1" style={{ justifyContent: "center" }}>
          <Col span={8} className="col-content" style={{ backgroundColor: "#fff" }}>
            <Row>
              <Col span={12} className="col-dayoff">
                <p style={{ margin: 0 }}>Ngày nghỉ</p>
                <span style={{ fontSize: 60, fontWeight: 'bold' }}>{count_dayoff}</span>
              </Col>
              <Col span={12} className="col-icon">
                <CalendarOutlined style={{ border: "1px solid #EC4C47", borderRadius: "100%", justifyContent: "center", alignSelf: "center", padding: "10px", background: "#EC4C47", color: "white" }} />
              </Col>
            </Row>
          </Col>
          <Col span={8} className="col-content" style={{ backgroundColor: "#fff" }}>
            <Row>
              <Col span={12} className="col-dayoff">
                <p style={{ margin: 0 }}>Nhân Viên</p>
                <span style={{ fontSize: 60, fontWeight: 'bold' }}>{count_employees}</span>
              </Col>
              <Col span={12} className="col-icon">
                <UserOutlined style={{ border: "1px solid #47B881", borderRadius: "100%", justifyContent: "center", padding: "10px", background: "#47B881", color: "white" }} />
              </Col>
            </Row>
          </Col>
          <Col span={7} className="col-content" style={{ backgroundColor: "#fff" }}>
            <Row>
              <Col span={12} className="col-dayoff">
                <p style={{ margin: 0 }}>Công việc</p>
                <span style={{ fontSize: 60, fontWeight: 'bold' }}>{count_tasks}</span>
              </Col>
              <Col span={12} className="col-icon">
                <AlignLeftOutlined style={{ border: "1px solid #1070CA", borderRadius: "100%", justifyContent: "center", padding: "10px", background: "#1070CA", color: "white" }} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Row style={{ justifyContent: "center", marginTop: '30px' }}>
        <Col span={20} style={{ boxShadow: "1px 1px 1px rgb(216, 214, 214)", border: "solid 1px #ccc" }}>
          <Calendar onPanelChange={onPanelChange} onSelect={onSelectDateHandler} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        </Col>
      </Row>
      <Modal
        visible={visible}
        title="Thông tin công việc "
        style={{ width: "500px" }}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Đóng
          </Button>,
        ]}
      >
      </Modal>
      {/* <Row className="row-in-dashboard-2">
        <Col span={8} className="dayoff">
          <div>
            <h1>Danh sách  nhân viên xin nghỉ</h1>
            <ul>
              {listDayOff}
            </ul>
          </div>
        </Col>
        <Col span={16} className="table-task">
          <Table dataSource={employees}>
            <Column title="Họ tên" dataIndex="name" key="name" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Facebook" dataIndex="facebook" key="facebbook" />
            <Column title="Skypeid" dataIndex="skypeId" key="skypeId" />
            <Column title="Số điện thoại" dataIndex="phoneNumber" key="phoneNumber" />
            <Column title="Giới thiệu " dataIndex="introduction" key="introduction" />
          </Table>
        </Col>
      </Row> */}
    </>
  );
}
export default LayoutWeb;