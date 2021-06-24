import { Row, Pagination } from 'antd';
import { SearchOutlined, AudioOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import '../Dayoff/Dayoff.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/AuthUtils';
import { getArticle, getCountArticle } from '../../reducer/Articles';
import ReactMarkdown from 'react-markdown';

function Article() {

    const jwt = getToken();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getArticle(jwt));
        dispatch(getCountArticle(jwt));
    }, [dispatch, jwt]);
    const articles = useSelector((store) => store.articles.data);
    const count_articles = useSelector((store) => store.articles.count);
    console.log(articles);
    console.log(count_articles);
    const listArticles = articles.map((articles) =>
        <>
            <h1>{articles.title}</h1>
            <h2> {articles.slug} </h2>
            <ReactMarkdown>{articles.content}</ReactMarkdown>   
            <ReactMarkdown>{articles.shortContent}</ReactMarkdown>  
        </>
    );
    return (
        <>
            <Row>
                {listArticles}
            </Row>
            <Row>
                <Pagination defaultCurrent={1} total={50} />
            </Row>
        </>
    );
}
export default Article;