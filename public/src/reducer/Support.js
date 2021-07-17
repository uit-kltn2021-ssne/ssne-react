import axios from "axios";

const GET_SUPPORT= 'GET_SUPPORT';
export const getSupport = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/supports', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_SUPPORT, data: res.data });
    })
    .catch(error => console.log(error));
 };

 const GET_COUNT_SUPPORT = "GET_COUNT_SUPPORT";
 export const getCountSupport = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/supports/count', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_COUNT_SUPPORT, data: res.data });
    })
    .catch(error => console.log(error));
 }; 

 const ADD_SUPPORT  = "ADD_SUPPORT";
 export const addSupport = (jwt,data) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.post('https://api.ssne.xyz/supports', data,
    {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: ADD_SUPPORT, data: res.data });
    })
    .catch(error => console.log(error));
 }; 

 const initialState = { data: [] ,count:'',dataAdd:[]};
 export default function supportReducer(state=initialState,action) {
    switch (action.type) {
        case GET_SUPPORT:
            return {
                ...state,
                data:action.data,
            }
        case GET_COUNT_SUPPORT:
            return {
                ...state,
                count:action.data,
            }
        case ADD_SUPPORT:
            return {
                ...state,
                dataAdd:action.data,
            }
        default:
            return state
    }
 }