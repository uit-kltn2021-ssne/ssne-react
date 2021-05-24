import { Table, Button, Row, Input } from 'antd';
import { SearchOutlined, AudioOutlined } from '@ant-design/icons';
import React from 'react';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

class TableColleague extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
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
        <Row>
          <Button type="primary" icon={<SearchOutlined />}>
            Search
        </Button>
          <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
          <Button type="primary" icon={<SearchOutlined />}>Add User</Button>
        </Row>
        <Row>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </Row>
      </div>
    );
  }
}
export default TableColleague;