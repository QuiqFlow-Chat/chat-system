import axiosInstance from "../services/api/axios";

export const apiGet = async <T>(url: string, config = {}) => {
  try {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiPost = async <T, B = any>(url: string, body: B, config = {}) => {
  try {
    const response = await axiosInstance.post<T>(url, body, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

