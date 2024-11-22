import { withLoading } from "../../helpers/withLoading";
import { getBienApi } from "../../services/bien/getBienApi";
import { authStore } from "../authStore";
import { bienStore } from "../bienStore";

 


const get = async (data:string ) =>{
  const store = bienStore.getState();
  const token = authStore.getState().token || ''; 
  console.log('TOKEN', token);
  withLoading(store, async () => await getBienApi(data, token));
};

const clear = () => {
  const store = bienStore.getState();
  store.clear();
};


export const bienAction = {
  get,
  clear
}