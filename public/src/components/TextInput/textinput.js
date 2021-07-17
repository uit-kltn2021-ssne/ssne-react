import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
class TextInputComponent extends React.Component {
    render() {
        return(
           <Input placeholder="default size" prefix={<UserOutlined />} />
        );
    }
}
export default TextInputComponent;