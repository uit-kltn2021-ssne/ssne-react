import axios from "axios";

const GET_DAY_OFF= 'GET_DAY_OFF';
export const getDayOffs = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/day-offs', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_DAY_OFF, data: res.data });
    })
    .catch(error => console.log(error));
 };

 const GET_COUNT_DAYOFF  = "GET_COUNT_DAYOFF";
 export const getCountDayOff = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/day-offs/count', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_COUNT_DAYOFF, data: res.data });
    })
    .catch(error => console.log(error));
 }; 

 const ADD_DAYOFF  = "ADD_DAYOFF";
 export const addDayOff = (jwt,data) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.post('https://api.ssne.xyz/day-offs', data,
    {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        console.log(1111222);
        dispatch({ type: ADD_DAYOFF, data: res.data });
    })
    .catch(error => console.log(error));
 }; 

 const initialState = { data: [] ,count:'',dataAdd:[]};
 export default function dayOffReducer(state=initialState,action) {
    switch (action.type) {
        case GET_DAY_OFF:
            return {
                ...state,
                data:action.data,
            }
        case GET_COUNT_DAYOFF:
            return {
                ...state,
                count:action.data,
            }
        case ADD_DAYOFF:
            return {
                ...state,
                dataAdd:action.data,
            }
        default:
            return state
    }
 }