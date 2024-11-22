import { Request } from "../request";

 
const login=async(data:any)=>{
    return await Request({method:'POST',url:'/auth/login',token:null,headers:null,body:{...data},params:null})
    .then((response:any)=>{
        console.log('RETURN FROM API', response);
        return response
    })
}

export const authServices = {
    login
}