import axios from "axios";
import configData from "./config.json";

const api = axios.create({
  baseURL: configData.API_BASE_URL,
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
  if (configData.API_BEARER) {
    config.headers.Authorization = `Bearer ${configData.API_BEARER}`;
  }
  return config;
});

export default api;
