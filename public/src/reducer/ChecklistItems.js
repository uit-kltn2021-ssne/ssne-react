import axios from "axios";

const GET_CHECKLIST= 'GET_CHECKLIST';
export const getChecklist = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/checklist-items', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_CHECKLIST, data: res.data });
    })
    .catch(error => console.log(error));
 };

 const GET_COUNT_CHECKLIST  = "GET_COUNT_CHECKLIST";
 export const getCountChecklist = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/checklist-items/count', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_COUNT_CHECKLIST, data: res.data });
    })
    .catch(error => console.log(error));
 }; 

 const ADD_CHECKLIST  = "ADD_CHECKLIST";
 export const addCHECKLIST = (jwt,data) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.post('https://api.ssne.xyz/checklist-items', data,
    {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        console.log(1111222);
        dispatch({ type: ADD_CHECKLIST, data: res.data });
    })
    .catch(error => console.log(error));
 }; 

 const initialState = { data: [] ,count:'',dataAdd:[]};
 export default function checklistItemReducer(state=initialState,action) {
    switch (action.type) {
        case GET_CHECKLIST:
            return {
                ...state,
                data:action.data,
            }
        case GET_COUNT_CHECKLIST:
            return {
                ...state,
                count:action.data,
            }
        case ADD_CHECKLIST:
            return {
                ...state,
                dataAdd:action.data,
            }
        default:
            return state
    }
 }