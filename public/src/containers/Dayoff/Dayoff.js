import { Table, Button, Row, Input, Col, Modal, DatePicker, Space, InputNumber } from 'antd';
import { SearchOutlined, AudioOutlined, EditOutlined, RollbackOutlined, FolderAddOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import '../Dayoff/Dayoff.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/AuthUtils';
import { addDayOff, getCountDayOff, getDayOffs } from '../../reducer/Dayoff';


const columns = [

    {
        title: 'Họ Tên',
        dataIndex: 'name',
    },
    {
        title: 'Lí do Nghỉ',
        dataIndex: 'reason',
    },
    {
        title: 'Ngày',
        dataIndex: 'date',
    },
    {
        title: 'Số tiếng nghỉ trong ngày',
        dataIndex: 'numberOfHours',
    },

    {
        title: 'Số điện thoại liên lạc ',
        dataIndex: 'phoneNumber',
    },
];

function DayOff() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [visible, setVisible] = useState(false);
    const { TextArea } = Input;
    const [value, setValue] = useState('');
    const [reason, setReason] = useState('');
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [numberOfHours, setNumberOfHours] = useState(0);
    const jwt = getToken();
    var dataDayOff = {
        "reason": reason,
        "date": date,
        "numberOfHours": numberOfHours,
        "name": name,
        "phoneNumber": phonenumber,
    };
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
        dispatch(addDayOff(jwt, dataDayOff));
        setTimeout(() => {
            setLoading1(false);
            setVisible(false);
        }, 3000);
    };

    const handleCancel = () => {
        setVisible(false);
    };
    const onChange = ({ target: { value } }) => {
        setValue(value);
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
    const getDate = (date, dateString) => {
        setDate(dateString);
        console.log(date, dateString);
    }
    const getNumberOfHour = (value) => {
        setNumberOfHours(value);
        console.log('changed', value);
    }
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

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDayOffs(jwt));
        dispatch(getCountDayOff(jwt));
    }, [dispatch, jwt]);
    const dayoffs = useSelector((store) => store.dayoffs.data);
    const count_dayoff = useSelector((store) => store.dayoffs.count);
    console.log(dayoffs);

    const onSearch = value => console.log(value);
    return (
        <div>
            <Row className="colleague-row-1" >
                <Space wrap style={{ marginBottom: 10 }}>
                    <Button type="primary" icon={<RollbackOutlined />}>Quay lại</Button>
                    <Button type="primary" icon={<SearchOutlined />}>
                        Tìm Kiếm
                    </Button>
                    <Search placeholder="input search text" allowClear onSearch={onSearch} />
                    <Button type="primary" icon={<FolderAddOutlined />} onClick={showModal}>Thêm Ngày Nghỉ </Button>
                    <Modal
                        visible={visible}
                        title="Xin nghỉ phép "
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Quay lại
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                                Ok
                            </Button>
                        ]}
                    >
                        <Input
                            placeholder="Lí do xin nghỉ"
                            onChange={(event) => setReason(event.target.value)}
                            style={{ margin:"10px",width: "340px"}}
                        />
                        <Input
                            placeholder="Tên Nhân Viên"
                            onChange={(event) => setName(event.target.value)}
                            style={{ margin:"10px",width: "340px"}}
                        />
                        <Input
                            placeholder="Số điện thoại"
                            onChange={(event) => setPhoneNumber(event.target.value)}
                            style={{ margin:"10px",width: "340px"}}
                        />
                        <Space direction="vertical">
                            <DatePicker placeholder="Chọn ngày" onChange={getDate} style={{ margin:"10px",width: "340px"}} />
                        </Space>,
                        <InputNumber min={1} max={8}
                            placeholder="Số giờ nghỉ"
                            onChange={getNumberOfHour}
                            style={{ margin:"10px",width: "340px"}}
                        />
                    </Modal>

                    <Button type="primary" icon={<EditOutlined />}> Chỉnh Sửa Ngày Nghỉ </Button>
                    <Button type="primary" icon={<DeleteOutlined />}>Xóa Ngày Nghỉ </Button>
                </Space>
            </Row>
            <Row className="colleague-row">
                <Col span={20}>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={dayoffs} />
                </Col>
            </Row>
        </div>
    );
}
export default DayOff;