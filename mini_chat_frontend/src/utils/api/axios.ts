import axios from 'axios';
import { tokenStorage } from '../storage';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3777/api/miniChat",
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


