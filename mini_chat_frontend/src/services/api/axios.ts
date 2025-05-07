import axios from 'axios';
import { API_BASE_URL } from '../../constants/api';
import { tokenStorage } from '../../utils/storage';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
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


