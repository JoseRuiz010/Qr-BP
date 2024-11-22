import { Request } from "../request";

 
  
export const getBienApi= async (id:string, token:string) => {
   try {
      const res =await Request({method:'GET',url:`/bienes/${id}`, token})
       if(res.error) throw new Error(res.error || 'Error getting bien');
      return res
   } catch (error) {
      return {error: error.message || error}
   }
}
