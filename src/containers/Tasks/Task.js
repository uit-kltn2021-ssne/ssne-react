import { Table, Button, Row, Input, Col, Modal, Switch, DatePicker, Space } from 'antd';
import { SearchOutlined, AudioOutlined, EditOutlined, RollbackOutlined, FolderAddOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import '../Dayoff/Dayoff.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/AuthUtils';
import { getCountTasks, getTasks } from '../../reducer/Task';


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
                    <Button type="primary" icon={<RollbackOutlined />}>Quay lại</Button>
                    <Button type="primary" icon={<SearchOutlined />}>
                        Tìm kiếm
                    </Button>
                    <Search placeholder="input search text" allowClear onSearch={onSearch} />
                    <Button type="primary" icon={<FolderAddOutlined />} onClick={showModal}>Thêm Công việc </Button>
                    <Modal
                        visible={visible}
                        title="Thêm Công Việc"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Return
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                                Submit
                            </Button>
                        ]}
                    >
                        <Input
                            placeholder="Tiêu đề"
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        <Input
                            placeholder="Tên Nhân Viên"
                            onChange={(event) => setEmployee(event.target.value)}
                        />
                        <Input
                            placeholder="Mô tả công việc"
                            onChange={(event) => setDescription(event.target.value)}
                        />
                        <Space direction="vertical">
                            <DatePicker onChange={getDateFrom} />
                        </Space>,
                        <Space direction="vertical">
                            <DatePicker onChange={getDateTo} />
                        </Space>,
                        <Switch checkedChildren="Đã Hoàn Thành" unCheckedChildren="Chưa Hoàn Thành" />
                    </Modal>
                    <Button type="primary" icon={<EditOutlined />}>Chỉnh sửa công việc </Button>
                    <Button type="primary" icon={<DeleteOutlined />}>Xóa Công Việc </Button>
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