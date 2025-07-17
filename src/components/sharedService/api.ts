import axios from "axios";
import configData from "./config";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    Accept: "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  },
});

// Interceptor to add Bearer token dynamically
api.interceptors.request.use((config) => {
  if (process.env.REACT_APP_API_BEARER) {
       config.headers.Authorization = `Bearer ${process.env.REACT_APP_API_BEARER}`;
  }
  return config;
});

export default api;
