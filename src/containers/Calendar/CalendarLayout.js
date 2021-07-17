import { Calendar, Badge, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountTasks, getTasks } from '../../reducer/Task';
import { getToken } from '../../utils/AuthUtils';
import '../Calendar/CalendarLayout.css';

function CalendarWeb(pros) {
    const jwt = getToken();
    console.log(jwt);
    function onPanelChange(value, mode) {
        console.log(value.format('YYYY-MM-DD'), mode);
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTasks(jwt));
        dispatch(getCountTasks(jwt));
    }, [dispatch, jwt]);
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
                    listData.push({ type: 'success', content: 'hello', color: "#" + color, id: x.id })
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
        <Row style={{ justifyContent: "center", marginTop: '30px' }}>
            <Col span={20} style={{ boxShadow: "1px 1px 1px rgb(216, 214, 214)", border: "solid 1px #ccc" }}>
                <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
            </Col>
        </Row>
    );
}
export default CalendarWeb;
