// // authService.ts
// import axios from "axios";
// import { API_BASE_URL } from "../constants/api";

// export const login = async (email: string, password: string) => {
//   return axios.post(`${API_BASE_URL}/auth/login`, {
//     email,
//     password,
//   });
// };

// authService.ts
import axios from "axios";
import { API_BASE_URL } from "../constants/api";
export const login = async (email: string, password: string) => {
  return axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
};
src / api / axios.ts;
/////////////////////
import { API_BASE_URL } from "../constants/api";
import axios from "axios";
import tokenStorage from "../utils/storage";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// Interceptor
api.interceptors.request.use(
  (config) => {
    const token = tokenStorage.load();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default api;
