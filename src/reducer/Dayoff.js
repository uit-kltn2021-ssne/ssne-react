import axios from "axios";

const GET_DAY_OFF= 'GET_DAY_OFF';
export const getDayOff = (jwt) => (dispatch) => {
    const AuthStr = 'Bearer '.concat(jwt); 
    axios.get('https://api.ssne.xyz/day-offs', {
    headers: {
      Authorization:AuthStr
      },
    })
    .then(res => {
        dispatch({ type: GET_DAY_OFF, data: res.data });
        console.log(1111);
    })
    .catch(error => console.log(error));
 };
 const initialState = { data: [] };
 export default function dayOffReducer(state=initialState,action) {
    switch (action.type) {
        case GET_DAY_OFF:
            return {
                ...state,
                data:action.data,
            }
        default:
            return state
    }
 }