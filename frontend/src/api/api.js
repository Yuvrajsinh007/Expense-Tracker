import axios from 'axios';

// Use the environment variable for backend URL
const API_URL = process.env.REACT_APP_API_URL;

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;