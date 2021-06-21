import { Table, Button, Row, Input, Col, Modal } from 'antd';
import { SearchOutlined, AudioOutlined } from '@ant-design/icons';
import React from 'react';
import '../Dayoff/Dayoff.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/AuthUtils';
import { getCountDayOff, getDayOffs } from '../../reducer/Dayoff';


const columns = [
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
];

function DayOff() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [visible, setVisible] = useState(false);
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
                        title="Title"
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