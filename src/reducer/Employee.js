import axios from "axios";

const GET_EMPLOYEES= 'GET_EMPLOYEES';
export const getEmployees = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/employees', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_EMPLOYEES, data: res.data });
    })
    .catch(error => console.log(error));
 };

 const GET_COUNT_EMPLOYEES  = "GET_COUNT_EMPLOYEES";
 export const getCountEmployees = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/employees/count', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_COUNT_EMPLOYEES, data: res.data });
    })
    .catch(error => console.log(error));
 }; 

 const ADD_EMPLOYEES= 'ADD_EMPLOYEES';
export const addEmployees = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/employees', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: ADD_EMPLOYEES, data: res.data });
    })
    .catch(error => console.log(error));
 };


 const initialState = { data: [] ,count:''};
 export default function employeeReducer(state=initialState,action) {
    switch (action.type) {
        case GET_EMPLOYEES:
            return {
                ...state,
                data:action.data,
            }
        case GET_COUNT_EMPLOYEES:
            return {
                ...state,
                count:action.data,
            }
        default:
            return state
    }
 }