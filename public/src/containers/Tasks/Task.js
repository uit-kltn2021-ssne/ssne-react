import { Table, Button, Row, Input, Col, Modal, Switch, DatePicker, Space } from 'antd';
import { SearchOutlined, AudioOutlined, EditOutlined, RollbackOutlined, FolderAddOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import '../Dayoff/Dayoff.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/AuthUtils';
import { getCountTasks, getTasks } from '../../reducer/Task';
import TextArea from 'antd/lib/input/TextArea';


const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Date From',
        dataIndex: 'from',
    },
    {
        title: 'Date To',
        dataIndex: 'to',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];

function Task() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(true);
    const [employee, setEmployee] = useState('');
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const start = () => {
        setLoading({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setLoading1(true);
        setTimeout(() => {
            setLoading1(false);
            setVisible(false);
        }, 3000);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };
    // const { loading, selectedRowKeys } = this.state;
    // const { visible, loading1 } = this.state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const { Search } = Input;

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );
    const jwt = getToken();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTasks(jwt));
        dispatch(getCountTasks(jwt));
    }, [dispatch, jwt]);
    const tasks = useSelector((store) => store.tasks.data);
    const count_tasks = useSelector((store) => store.tasks.count);
    console.log(tasks);
    const getDateFrom = (date, dateString) => {
        setDateFrom(dateString);
        console.log(date, dateString);
    }
    const getDateTo = (date, dateString) => {
        setDateTo(dateString);
        console.log(date, dateString);
    }
    const onSearch = value => console.log(value);
    return (
        <div>
            <Row className="colleague-row-1" >
                <Space wrap style={{ marginBottom: 10 }}>
                    <Button type="primary" icon={<RollbackOutlined />}>Quay l???i</Button>
                    <Button type="primary" icon={<SearchOutlined />}>
                        T??m ki???m
                    </Button>
                    <Search placeholder="input search text" allowClear onSearch={onSearch} />
                    <Button type="primary" icon={<FolderAddOutlined />} onClick={showModal}>Th??m C??ng vi???c </Button>
                    <Modal
                        visible={visible}
                        title="Th??m C??ng Vi???c"
                        onOk={handleOk}
                        style={{width:"500px"}}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Quay L???i
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                                Ok
                            </Button>
                        ]}
                    >
                        <Input
                            placeholder="Ti??u ?????"
                            onChange={(event) => setTitle(event.target.value)}
                            style={{ margin:"10px",width: "340px"}}
                        />
                        <Input
                            placeholder="T??n Nh??n Vi??n"
                            onChange={(event) => setEmployee(event.target.value)}
                            style={{ margin:"10px",width: "340px"}}
                        />
                       
                        <Space direction="vertical">
                            <DatePicker onChange={getDateFrom}   placeholder="Ch???n ng??y b???t ?????u" style={{ margin:"10px",width: "340px"}}/>
                            
                        </Space>,
                        <Space direction="vertical">
                            <DatePicker onChange={getDateTo}   placeholder="Ch???n ng??y  k???t th??c" style={{ margin:"10px",width: "340px"}}/>
                        </Space>,
                        <TextArea
                            placeholder="M?? t??? c??ng vi???c"
                            onChange={(event) => setDescription(event.target.value)}
                            style={{ margin:"10px",width: "340px",height:"100px"}}
                        />
                        <Switch checkedChildren="???? Ho??n Th??nh" unCheckedChildren="Ch??a Ho??n Th??nh" style={{ margin:"10px"}} />
                    </Modal>
                    <Button type="primary" icon={<EditOutlined />}>Ch???nh s???a c??ng vi???c </Button>
                    <Button type="primary" icon={<DeleteOutlined />}>X??a C??ng Vi???c </Button>
                </Space>
            </Row>
            <Row className="colleague-row">
                <Col span={20}>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={tasks} />
                </Col>
            </Row>
        </div>
    );
}
export default Task;