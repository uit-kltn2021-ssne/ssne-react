// import axios from "axios";
import { getToken } from "./AuthUtils";

const getDefaultConfig =()=>{
    const token=getToken();
    const AuthStr = 'Bearer '.concat(token); 
    return {
        headers: {
            Authorization:AuthStr
            },
        timeOUt:10000
    }
}

// export const get=(url, data)=>{
//     return axios.create({
//         method: 'GET',
//         ...getDefaultConfig(),
//         data:{
//             ...data
//         }
//     })
// }