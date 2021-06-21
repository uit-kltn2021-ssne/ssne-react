import { Table, Button, Row, Input, Col } from 'antd';
import { SearchOutlined, AudioOutlined } from '@ant-design/icons';
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
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'PhoneNumber',
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
      title: 'Introduction',
      dataIndex: 'introduction',
    },
    {
      title: 'Position',
      dataIndex: 'position',
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployees(jwt));
    dispatch(getCountEmployees(jwt));
  },[dispatch, jwt]);
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
          <Col span={24}>
            <Button type="primary" icon={<SearchOutlined />}>Back</Button> 
            <Button type="primary" icon={<SearchOutlined />}>
              Search
            </Button>
            <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
            <Button type="primary" icon={<SearchOutlined />}>Add User</Button>
            <Button type="primary" icon={<SearchOutlined />}>Edit User</Button>
            <Button type="primary" icon={<SearchOutlined />}>Delete User</Button>
          </Col>
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