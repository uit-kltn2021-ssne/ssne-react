import { Table, Button, Row, Input, Col, Modal, Form, Space } from 'antd';
import { SearchOutlined, AudioOutlined, RollbackOutlined, FolderAddOutlined } from '@ant-design/icons';
import React from 'react';
import '../Dayoff/Dayoff.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/AuthUtils';
import { addFaqs, getFaqs } from '../../reducer/Faq';


const columns = [
    {
        title: 'Câu Hỏi ',
        dataIndex: 'question',
    },
    {
        title: 'Câu Trả Lời',
        dataIndex: 'answer',
    },
];

function FAQ() {
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
    var dataQuestion = {
        "question": question,
        "answer": answer,
    };
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
        dispatch(addFaqs(jwt, dataQuestion));
        setTimeout(() => {
            setLoading1(false);
            setVisible(false);
        }, 3000);
    };
    return (
        <div>
            <Row className="colleague-row-1" >
                <Space wrap style={{ marginBottom: 10 }}>
                    <Button type="primary" icon={<RollbackOutlined />}>Quay lại</Button>
                    <Button type="primary" icon={<SearchOutlined />}>
                        Tìm Kiếm
                    </Button>
                    <Search placeholder="Nhập câu hỏi muốn tìm" allowClear onSearch={onSearch}/>
                    <Button type="primary" icon={<FolderAddOutlined />} onClick={showModal}>Thêm FAQS </Button>
                    <Modal
                        visible={visible}
                        title="FAQ"
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
                        <Form.Item
                            label="Câu Hỏi"
                            name="Question"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập câu hỏi !',
                                },
                            ]}
                        >
                            <Input onChange={getQuestion} />
                        </Form.Item>

                        <Form.Item
                            label="Answer"
                            name="answer"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập câu trả lời',
                                },
                            ]}
                        >
                            <Input onChange={getAnswer} />
                        </Form.Item>
                    </Modal>
                </Space>
            </Row>
            <Row className="colleague-row">
                <Col span={20}>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={faqs} />
                </Col>
            </Row>
        </div>
    );
}
export default FAQ;