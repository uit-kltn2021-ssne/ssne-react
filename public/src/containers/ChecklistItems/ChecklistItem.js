import { Table, Button, Row, Input, Col, Modal, Form, Space, DatePicker, Select } from 'antd';
import { SearchOutlined, AudioOutlined, RollbackOutlined, FolderAddOutlined } from '@ant-design/icons';
import React from 'react';
import '../Dayoff/Dayoff.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/AuthUtils';
import { getChecklist } from '../../reducer/ChecklistItems';

const { Option } = Select;
const columns = [
    {
        title: 'Tiêu đề ',
        dataIndex: 'title',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
    },
    {
        title: 'Tag',
        dataIndex: 'tag',
    },
    {
        title: ' Employee',
        dataIndex: 'employee',
    },
];

function CheckList() {
    
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [employee, setEmployee] = useState("");
    
    
    
   
    const jwt = getToken();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getChecklist(jwt));
    }, [dispatch, jwt]);
    const checklist = useSelector((store) => store.checkitem.data);
    const onSearch = value => console.log(value);

    return (
        <div>
            <Row className="colleague-row-1" >
                <Space wrap style={{ marginBottom: 10 }}>
                    <Button type="primary" icon={<RollbackOutlined />}>Quay lại</Button>
                    {/* <Button type="primary" icon={<SearchOutlined />}>
                        Tìm Kiếm
                    </Button>
                    <Search placeholder="Nhập checklist muốn tìm kiếm" allowClear onSearch={onSearch} style={{ width: 200 }} /> */}
                </Space>
            </Row>
            <Row className="colleague-row">
                <Col span={20}>
                    <Table columns={columns} dataSource={checklist} />
                </Col>
            </Row>
        </div>
    );
}
export default CheckList;