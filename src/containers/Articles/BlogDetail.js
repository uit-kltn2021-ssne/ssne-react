import { Input } from 'antd';

import React from 'react';
import '../Articles/Article.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/AuthUtils';
import { getArticle, getCountArticle } from '../../reducer/Articles';
import ReactMarkdown from 'react-markdown';
import { useLocation } from 'react-router-dom';

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
function BlogDetail() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const { state } = useLocation();
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

    const listArticles = articles.map((articles) =>

        <li> <h1>{articles.title} </h1></li>

    );

    return (
        <div style={{ backgroundColor: '#fff', margin: 20, padding: 20 }}>
            <h1 style={{ fontSize: 30 }}>{state.articles.title}</h1>
            <div>
                {/* <p> {state.articles.id}</p> */}
                {/* <p> {state.articles.content}</p> */}
                <ReactMarkdown>{state.articles.content}</ReactMarkdown>

            </div>
        </div>
    );

}
export default BlogDetail;