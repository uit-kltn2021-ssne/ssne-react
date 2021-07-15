import { Table, Button, Row, Input, Col, Modal, Form, Space, DatePicker, Select } from 'antd';
import { SearchOutlined, AudioOutlined, RollbackOutlined, FolderAddOutlined } from '@ant-design/icons';
import React from 'react';
import '../Dayoff/Dayoff.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/AuthUtils';
import { addFaqs, getFaqs } from '../../reducer/Faq';

const { Option } = Select;
const columns = [
    {
        title: 'Chủ đề ',
        dataIndex: 'subject',
    },
    {
        title: 'Nội Dung',
        dataIndex: 'content',
    },
    {
        title: 'Loại hỗ trợ',
        dataIndex: 'type',
    },
    {
        title: ' Trạng thái',
        dataIndex: 'status',
    },
];

function Support() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [visible, setVisible] = useState(false);
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [owner, setOwner] = useState("");
    const [support_replies, setSupportReplies] = useState("");
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
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    var dataSupport = {
        "subject": subject,
        "content": content,
        "type": type,
        "owner": owner,
        "status": status,
        "support_replies": [
            "string"
        ],
    }

    const jwt = getToken();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFaqs(jwt));

    }, [dispatch, jwt]);
    const faqs = useSelector((store) => store.faq.data);
    const onSearch = value => console.log(value);

    const getQuestion = event => {
        setQuestion(event.target.value);
    }
    const getAnswer = event => {
        setAnswer(event.target.value);
    }
    const handleOk = () => {
        setLoading1(true);
        dispatch(addFaqs(jwt, dataSupport));
        setTimeout(() => {
            setLoading1(false);
            setVisible(false);
        }, 3000);
    };
    return (
        <div>
            <Row className="colleague-row-1" >
                <Col span={24}>
                    <Button type="primary" icon={<RollbackOutlined />}>Quay lại</Button>
                    <Button type="primary" icon={<SearchOutlined />}>
                        Tìm Kiếm
                    </Button>
                    <Search placeholder="Nhập FAQ muốn tìm kiếm" allowClear onSearch={onSearch} style={{ width: 200 }} />
                    <Button type="primary" icon={<FolderAddOutlined />} onClick={showModal}>Thêm Hỗ Trợ </Button>
                    <Modal
                        visible={visible}
                        title="Thêm Hỗ Trợ"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Quay lại
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                                OK
                            </Button>
                        ]}
                    >
                        <Input
                            placeholder="Chủ Đề"
                            onChange={(event) => setSubject(event.target.value)}
                        />
                        <Input
                            placeholder="Nội Dung"
                            onChange={(event) => setContent(event.target.value)}
                        />

                        <Select
                            onChange={(event) =>{setType(event.target.value)}}
                            placeholder="Loại hỗ trợ"
                            
                        >
                            <Option value="it_support">Hỗ trợ IT</Option>
                            <Option value="hr_support"> Hỗ trợ HR</Option>
                            <Option value="other">Khác </Option>
                        </Select>
                        {/* <Select
                            onChange={(event) =>{setStatus(event.target.value)}}
                            style={{ width: 200 }}
                            placeholder="Trạng thái"
                        >
                            <Option value="pending"> Đang chờ xử lý </Option>
                            <Option value="approved">Đã Duyệt</Option>
                            <Option value="rejected">Từ Chối</Option>
                        </Select> */}
                    </Modal>
                </Col>
            </Row>
            <Row className="colleague-row">
                <Col span={20}>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={faqs} />
                </Col>
            </Row>
        </div>
    );
}
export default Support;