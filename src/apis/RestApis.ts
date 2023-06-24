import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = 'http://223.130.136.211:3000/'; // Replace with your API base URL

// Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define a function to handle response data
const handleResponse = <T>(response: AxiosResponse<T>): T => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

// Define a function to handle request errors
const handleError = (error: any): Promise<never> => {
  // Customize error handling as per your needs
  console.error('Request error:', error);
  return Promise.reject(error);
};

// Define functions for common HTTP methods

// GET method
const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return axiosInstance
    .get<T>(url, config)
    .then(handleResponse)
    .catch(handleError);
};

// POST method
const post = <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
  return axiosInstance
    .post<T>(url, data, config)
    .then(handleResponse)
    .catch(handleError);
};

// DELETE method
const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return axiosInstance
    .delete<T>(url, config)
    .then(handleResponse)
    .catch(handleError);
};

// PUT method
const put = <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
  return axiosInstance
    .put<T>(url, data, config)
    .then(handleResponse)
    .catch(handleError);
};

// PATCH method
const patch = <T>(url : string, data : any, config? : AxiosRequestConfig) : Promise<T> => {
  return axiosInstance
    .patch<T>(url, data, config)
    .then(handleResponse)
    .catch(handleError);
}

export { get, post, del, put, patch };
