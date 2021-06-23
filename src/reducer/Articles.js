import axios from "axios";

const GET_ARTICLE= 'GET_ARTICLE';
export const getArticle = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/articles', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_ARTICLE, data: res.data });
    })
    .catch(error => console.log(error));
 };

 const GET_COUNT_ARTICLE = "GET_COUNT_ARTICLE";
 export const getCountArticle = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/articles/count', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_COUNT_ARTICLE, data: res.data });
    })
    .catch(error => console.log(error));
 }; 

 const ADD_ARTICLE  = "ADD_ARTICLE";
 export const addArticles = (jwt,data) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.post('https://api.ssne.xyz/articles', data,
    {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: ADD_ARTICLE, data: res.data });
    })
    .catch(error => console.log(error));
 }; 

 const initialState = { data: [] ,count:'',dataAdd:[]};
 export default function ArticleReducer(state=initialState,action) {
    switch (action.type) {
        case GET_ARTICLE:
            return {
                ...state,
                data:action.data,
            }
        case GET_COUNT_ARTICLE:
            return {
                ...state,
                count:action.data,
            }
        case ADD_ARTICLE:
            return {
                ...state,
                dataAdd:action.data,
            }
        default:
            return state
    }
 }