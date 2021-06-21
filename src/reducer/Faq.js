import axios from "axios";

const GET_FAQS= 'GET_FAQS';
export const getFaqs = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/faqs', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        console.log(111);
        dispatch({ type: GET_FAQS, data: res.data });
    })
    .catch(error => console.log(error));
 };

 const ADD_FAQS  = "ADD_FAQS";
 export const addFaqs = (jwt,data) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.post('https://api.ssne.xyz/faqs', data,
    {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: ADD_FAQS, data: res.data });
    })
    .catch(error => console.log(error));
 }; 

 const initialState = { data:[] ,question:[]};
 export default function dayOffReducer(state=initialState,action) {
    switch (action.type) {
        case ADD_FAQS:
            return {
                ...state,
                question:action.data,
            }
        case GET_FAQS:
            return {
                ...state,
                data:action.data,
            }
        default:
            return state
    }
 }