import { Table, Button, Row, Input, Col, Modal, DatePicker, Space,InputNumber } from 'antd';
import { SearchOutlined, AudioOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import '../Dayoff/Dayoff.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/AuthUtils';
import { addDayOff, getCountDayOff, getDayOffs } from '../../reducer/Dayoff';


const columns = [

    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Reason',
        dataIndex: 'reason',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    {
        title: 'NumberOfHours',
        dataIndex: 'numberOfHours',
    },
   
    {
        title: 'Phone Number',
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
    var dataDayOff ={
        "reason": reason,
        "date": date,
        "numberOfHours": numberOfHours,
        "name": setName,
        "phoneNumber": "03981879",
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
        dispatch(addDayOff(jwt,dataDayOff));
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
    const getDate = (date, dateString) =>{
        setDate(dateString);
        console.log(date, dateString);
    }
    const getNumberOfHour = (value) =>{
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
                <Col span={24}>
                    <Button type="primary" icon={<SearchOutlined />}>Back</Button>
                    <Button type="primary" icon={<SearchOutlined />}>
                        Search
                    </Button>
                    <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
                    <Button type="primary" icon={<SearchOutlined />} onClick={showModal}>Add Day Off </Button>
                    <Modal
                        visible={visible}
                        title="Day Off "
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
                            placeholder="Reason"
                            onChange= {(event) => setReason(event.target.value)}
                        />
                        <Input
                            placeholder="Name Employee"
                            onChange= {(event) => setName(event.target.value)}
                        />
                        <Input
                            placeholder="Phone Number"
                            onChange= {(event) => setPhoneNumber(event.target.value)}
                        />
                        <Space direction="vertical">
                            <DatePicker onChange={getDate} />
                        </Space>,
                        <InputNumber min={1} max={8}
                            placeholder="Number Of Hours"
                            onChange= {getNumberOfHour}
                        />
                    </Modal>

                    <Button type="primary" icon={<SearchOutlined />}>Edit Day Off </Button>
                    <Button type="primary" icon={<SearchOutlined />}>Delete Day Off </Button>
                </Col>
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