import { Col, Input, Row } from 'antd';

import React from 'react';
import '../Articles/Article.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/AuthUtils';
import { getArticle, getCountArticle } from '../../reducer/Articles';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

const { Search } = Input;
const columns = [
    {
        title: 'Tiêu đề ',
        dataIndex: 'title',
    },
    {
        title: 'Slug',
        dataIndex: 'slug',
    },
    {
        title: ' Tóm tắt nội dung',
        dataIndex: 'short_content',
    },
    {
        title: 'Nội Dung',
        dataIndex: 'content',
    },

];
function Article() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [visible, setVisible] = useState(false);
    const jwt = getToken();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getArticle(jwt));
        dispatch(getCountArticle(jwt));
    }, [dispatch, jwt]);
    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };
    const onSearch = value => console.log(value);
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const articles = useSelector((store) => store.articles.data);
    const count_articles = useSelector((store) => store.articles.count);
    console.log(articles);
    console.log(count_articles);

    const listArticles = articles.map((article) =>
        <Col className="col-article" span={11}>
            <Row style={{ paddingLeft: '12px', height: '100%', alignContent: 'center' }}>
                <Col span={20}>
                    <Link
                        to={{
                            pathname: `/article/${article.id}`,
                            state: { articles: article }
                        }}
                    >

                        <div style={{ fontSize: "18px", color: '#66788A' }}>{article.title} </div>

                    </Link>
                </Col>
                <Col span={1} className='icon-article'>
                    <RightOutlined />
                </Col>
            </Row>
        </Col>
    );

    return (
        <>

            <div style={{ justifyContent: 'center' }}>
                <p style={{ fontSize: "30px", color: '#66788A', textAlign: 'center', fontWeight: 'bold' }}>Sổ tay nhân viên </p>
                <Row style={{ justifyContent: 'space-evenly' }}>
                    {listArticles}
                </Row>
            </div>
        </>
    );

}
export default Article;