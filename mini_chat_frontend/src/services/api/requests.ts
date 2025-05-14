import axios from "axios";
import axiosInstance from "./axios";


export const apiGet = async <ResponseType>(url: string, config = {}) => {
  try {
    const response = await axiosInstance.get<ResponseType>(url, config);
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


export const apiPost = async <ResponseType, BodyType = any>(url: string, body: BodyType, config = {}) => {
  try {
    const response = await axiosInstance.post<ResponseType>(url, body, config);
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


