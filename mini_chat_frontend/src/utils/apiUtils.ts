import axios from "axios";
import axiosInstance from "../services/api/axios";

export const apiGet = async <T>(url: string, config = {}) => {
  try {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error in GET request to ${url}:`, error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'An error occurred while fetching data.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};


export const apiPost = async <T, B = any>(url: string, body: B, config = {}) => {
  try {
    const response = await axiosInstance.post<T>(url, body, config);
    return response.data;
  } catch (error) {
    // console.log(error)
    if (axios.isAxiosError(error)) {
      console.error(`Error in POST request to ${url}:`, error.response?.data.message );
      throw new Error(error.response?.data?.message || 'An error occurred while posting data.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};


