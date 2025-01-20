// src/apiService.ts
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL:
    process.env.API_BASE_URL ||
    "https://fl-07-jobhunt-shared-api-test.azurewebsites.net/api/",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    Accept: "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  },
});

export const getAllUsers = async () => {
  const response = await api.get("User/getAllUsers");
  return response.data;
};

export const usertUser = async (payload: object) => {
  const response = await api.post("User/signUp", payload);
  return response.data;
};

export const userLogin = async (payload: object) => {
  const response = await api.post("User/login", payload);
  return response.data;
};

export const usertCompanyInfo = async (payload: object) => {
  const response = await api.post("Company/CompanyInfo", payload);
  return response.data;
};

export default api;
