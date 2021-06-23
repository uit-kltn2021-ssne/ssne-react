import axios from "axios";

const GET_TASKS= 'GET_TASKS';
export const getTasks = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/tasks', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_TASKS, data: res.data });
    })
    .catch(error => console.log(error));
 };

 const GET_COUNT_TASKS  = "GET_COUNT_TASKS";
 export const getCountTasks = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/tasks/count', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_COUNT_TASKS, data: res.data });
    })
    .catch(error => console.log(error));
 }; 

 const initialState = { data: [] ,count:''};
 export default function taskReducer(state=initialState,action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                data:action.data,
            }
        case GET_COUNT_TASKS:
            return {
                ...state,
                count:action.data,
            }
        default:
            return state
    }
 }