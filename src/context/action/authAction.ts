import { authServices } from "../../services/auth/login";
import { authStore } from "../authStore";

const store = authStore.getState();

const login = async (data = {}) => {
  try {
    console.log('DATA FROM ACTION', data);
    store.setLoading();
    
    // Adding a delay of 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const respuesta = await authServices.login(data);
    console.log('RETURN FROM ACTION', respuesta);
    if (respuesta.error) throw new Error(respuesta.error);
    if (respuesta.data) {
      const { token, ...rest } = respuesta.data;
      store.login(token, rest);
    }
  } catch (error) {
    if (error instanceof Error)
    store.setError(error?.message);
  }
  // store.login(respuesta);
}

const logout = () => authStore.setState({ isAuth: false,user:null, token: null });

export const authAction = {
  login,
  logout
}