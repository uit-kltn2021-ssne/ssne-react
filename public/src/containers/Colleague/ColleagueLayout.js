import { Table, Button, Space, Row, Input, Col, Alert } from 'antd';
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
import { addEmployees, getCountEmployees, getEmployees } from '../../reducer/Employee';
import { getToken } from '../../utils/AuthUtils';
import Modal from 'antd/lib/modal/Modal';
import TextArea from 'antd/lib/input/TextArea';

function TableColleague() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const jwt = getToken();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email ,setEmail] =useState('');
  const [skypeId,setSkypeId]= useState('');
  const [facebook,setFacebook] =useState(''); 
  const [introduction, setIntroduction] = useState('');
  const [position, setPosition] = useState('');
  var dataEmployee = {
  "name": name,
  "phoneNumber": phone,
  "email": email,
  "skypeId": skypeId,
  "facebook": facebook,
  "employeeId": "",
  "department": "",
  "introduction": introduction,
  "checklist": [
    ""
  ],
  "tasks": [
    ""
  ],
  "position": position,
  "support_tickets": [
    ""
  ],
  "support_replies": [
    ""
  ],
  "user": "",
  "created_by": "",
  "updated_by": ""
}
  const showModal = () => {
    setVisible(true);
};
  const handleOk = () => {
    setLoading1(true);
    dispatch(addEmployees(jwt, dataEmployee));
    setTimeout(() => {
        setLoading1(false);
        setVisible(false);
    }, 3000);
};

const handleCancel = () => {
    setVisible(false);
};
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
          <Button type="primary" icon={<FolderAddOutlined/>} onClick={showModal}>Thêm Nhân Viên</Button>
          <Modal
                        visible={visible}
                        title="Thông tin nhân viên "
                        onOk={handleOk}
                        style={{width:"500px"}}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Quay lại
                            </Button>,
                            <Button key="submit" type="primary" loading={loading1} onClick={handleOk}>
                                Ok
                            </Button>
                        ]}
                    >
                        <Input
                            placeholder="Họ tên"
                            onChange={(event) => setName(event.target.value)}
                            style={{ margin:"10px"}}
                        />
                        <Input
                            placeholder="Số điện thoại "
                            onChange={(event) => setPhone(event.target.value)}
                            style={{ margin:"10px"}}
                        />
                        <Input
                            placeholder="Email"
                            onChange={(event) => setEmail(event.target.value)}
                            style={{ margin:"10px"}}
                        />
                        <Input
                            placeholder="SkypeId"
                            onChange={(event) => setSkypeId(event.target.value)}
                            style={{ margin:"10px"}}
                        />
                        <Input
                            placeholder="Facebook"
                            onChange={(event) => setFacebook(event.target.value)}
                            style={{ margin:"10px"}}
                        />
                        <Input
                            placeholder="Vị trí làm việc"
                            onChange={(event) => setPosition(event.target.value)}
                            style={{ margin:"10px"}}
                        /> 
                        <TextArea
                            placeholder="Giới thiệu bản thân"
                            onChange={(event) => setIntroduction(event.target.value)}
                            style={{ margin:"10px",width:"350px",height:"140px"}}
                        />                     
                    </Modal>
          <Button type="primary" icon={<EditOutlined />}>Chỉnh sửa</Button>
          <Button type="primary" icon={<DeleteOutlined />}>Xóa Nhân Viên</Button>
        </Space>
      </Row>
      <Row className="colleague-row">
        <Col span={20}>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={employees} />
        </Col>
      </Row>
     
    </div>
    
  );

}
export default TableColleague;