import { Table, Button, Space, Row, Input, Col } from 'antd';
import {
  SearchOutlined,
  AudioOutlined,
  RollbackOutlined,
  FolderAddOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import '../Colleague/ColleagueLayout.css'
import { useDispatch, useSelector } from 'react-redux';
import { getCountEmployees, getEmployees } from '../../reducer/Employee';
import { getToken } from '../../utils/AuthUtils';

function TableColleague() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const jwt = getToken();
  const columns = [
    {
      title: 'Họ Tên ',
      dataIndex: 'name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'SkypeId',
      dataIndex: 'skypeId',
    },
    {
      title: 'Facebook',
      dataIndex: 'facebook',
    },
    {
      title: 'Giới thiệu bản thân',
      dataIndex: 'introduction',
    },
    {
      title: 'Vị trí làm việc',
      dataIndex: 'position',
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployees(jwt));
    dispatch(getCountEmployees(jwt));
  }, [dispatch, jwt]);
  const employees = useSelector((store) => store.employees.data);
  const count_employees = useSelector((store) => store.employees.count);
  console.log(employees);
  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
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
          <Button type="primary" icon={<FolderAddOutlined />}>Thêm Nhân Viên</Button>
          <Button type="primary" icon={<EditOutlined />}>Chỉnh sửa</Button>
          <Button type="primary" icon={<DeleteOutlined />}>Xóa Nhân Viên</Button>
        </Space>
      </Row>
      <Row className="colleague-row">
        <Col span={20}>
          <Table rowSelection={rowSelection} columns={columns} dataSource={employees} />
        </Col>
      </Row>
    </div>
  );

}
export default TableColleague;