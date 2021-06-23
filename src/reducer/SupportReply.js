import axios from "axios";

const GET_SUPPORTREPLY= 'GET_SUPPORTREPLY';
export const getSupportReply = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/support-replies', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_SUPPORTREPLY, data: res.data });
    })
    .catch(error => console.log(error));
 };

 const GET_COUNT_SUPPORTREPLY = "GET_COUNT_SUPPORTREPLY";
 export const getCountSupportReply = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/support-replies/count', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_COUNT_SUPPORTREPLY, data: res.data });
    })
    .catch(error => console.log(error));
 }; 

 const ADD_SUPPORTREPLY  = "ADD_SUPPORTREPLY";
 export const addSupportReply = (jwt,data) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.post('https://api.ssne.xyz/support-replies', data,
    {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: ADD_SUPPORTREPLY, data: res.data });
    })
    .catch(error => console.log(error));
 }; 

 const initialState = { data: [] ,count:'',dataAdd:[]};
 export default function supportReplyReducer(state=initialState,action) {
    switch (action.type) {
        case GET_SUPPORTREPLY:
            return {
                ...state,
                data:action.data,
            }
        case GET_COUNT_SUPPORTREPLY:
            return {
                ...state,
                count:action.data,
            }
        case ADD_SUPPORTREPLY:
            return {
                ...state,
                dataAdd:action.data,
            }
        default:
            return state
    }
 }