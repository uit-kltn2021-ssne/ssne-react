import axios from "axios";

const GET_DEPARTMENT= 'GET_DEPARTMENT';
export const getDayOffs = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/departments', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_DEPARTMENT, data: res.data });
    })
    .catch(error => console.log(error));
 };

 const GET_COUNT_DEPARTMENT = "GET_COUNT_DEPARTMENT";
 export const getCountDayOff = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/departments/count', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_COUNT_DEPARTMENT, data: res.data });
    })
    .catch(error => console.log(error));
 }; 

 const ADD_DEPARTMENT  = "ADD_DEPARTMENT";
 export const addDayOff = (jwt,data) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.post('https://api.ssne.xyz/departments', data,
    {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        console.log(1111222);
        dispatch({ type: ADD_DEPARTMENT, data: res.data });
    })
    .catch(error => console.log(error));
 }; 

 const initialState = { data: [] ,count:'',dataAdd:[]};
 export default function departmentReducer(state=initialState,action) {
    switch (action.type) {
        case GET_DEPARTMENT:
            return {
                ...state,
                data:action.data,
            }
        case GET_COUNT_DEPARTMENT:
            return {
                ...state,
                count:action.data,
            }
        case ADD_DEPARTMENT:
            return {
                ...state,
                dataAdd:action.data,
            }
        default:
            return state
    }
 }