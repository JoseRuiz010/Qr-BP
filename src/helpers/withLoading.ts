// utils/withLoading.js

export const withLoading = async (store:any, fn:any) => {
  store.setLoading();
  try {
    const response = await fn();
    console.log({response})
    if (response.data) {
       store.setData(response.data);
    }
    if (response.error) {
      throw new Error(response.error || response.error.message || 'Error en la petición');
    }
  } catch (error) {    
    store.setError(error.message);
  }
};