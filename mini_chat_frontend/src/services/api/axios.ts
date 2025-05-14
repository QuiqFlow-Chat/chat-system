import axios from 'axios';
import { tokenStorage } from '../../utils/localStorageUtil';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = tokenStorage.load(); 
      // console.log(token)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  export default axiosInstance;


