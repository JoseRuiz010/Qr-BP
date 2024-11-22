import axios from 'axios';
import { config } from '../config/config';

interface configRequest {
    method: string;
    url: string;
    token?: string | null;
    headers?: any;
    params?: any;
    data?: any;
    body?: any;
}

const axiosInstance = axios.create({
    baseURL: config.url,
    headers: {'X-Custom-Header': 'foobar'}
});
const getConfig = ({method, url, token, params, body}:configRequest) => {
    const config = {
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json',
        },
        params: params
    };

    if (method !== 'GET') {
        config.data = body;
    }
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    } 
    
    return config;
};

export const Request = async ({method, url, token = null, params = {}, body = {}}:configRequest) => {
    const config = getConfig({method, url, token, params, body});

    try {
        const response = await axiosInstance(config);
        console.log('Response:', response.data);
        const errorRQ = response?.data?.error;
        console.log('Error:', errorRQ); 
        if (errorRQ) throw new Error(errorRQ.message);
        return {data:response.data.data};
    } catch (error) {
        const errorRQ = error?.response?.data?.error?.message || error?.message || 'Error making request';
        console.error('Error making request:', errorRQ);
        return {error: errorRQ};
    }
};
 