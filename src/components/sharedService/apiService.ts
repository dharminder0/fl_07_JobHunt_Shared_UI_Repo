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
  const response = await api.get("V1/User/getAllUsers");
  return response.data;
};

export const usertUser = async (payload: object) => {
  const response = await api.post("V1/users/signUp", payload);
  return response.data;
};

export const userLogin = async (payload: object) => {
  const response = await api.post("V1/users/login", payload);
  return response.data;
};

export const userLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("activeRole");
  localStorage.removeItem("role");
  localStorage.removeItem("userData");
  localStorage.removeItem("companyName");
  localStorage.removeItem("companyType");
};

export const upsertCompanyInfo = async (payload: object) => {
  const response = await api.post("V1/Organization/AddInfo", payload);
  return response.data;
};

export const upsertRequirement = async (payload: object) => {
  const response = await api.post("V1/Requirement/Upsert", payload);
  return response.data;
};

export const generateRequirement = async (payload: object) => {
  const response = await api.post("V1/Prompt/GenerateContent", payload);
  return response.data;
};

export const resendEVerify = async (email: object) => {
  const response = await api.post(`V1/users/resend-email?EmailId=${email}`);
  return response.data;
};

export const setEVerify = async (token: string, otp: string) => {
  const response = await api.post(
    `/V1/users/Email/Verify?userToken=${token}&otp=${otp}`
  );
  return response.data;
};

export const getOrgProfileDetails = async (orgCode: string) => {
  const response = await api.get(
    `V1/Organization/GetProfile?orgCode=${orgCode}`
  );
  return response.data;
};

export const getStateList = async (useFor: string) => {
  const response = await api.get(
    `v1/ListValues/MasterListValue?name=${useFor}`
  );
  return response.data;
};

export const updateOrgProfileDetails = async (payload: any) => {
  const response = await api.post("V1/Organization/UpsertProfile", payload);
  return response.data;
};

export const getUserDetailsByEmail = async (email: any) => {
  const response = await api.get(`V1/users/${email}`);
  return response.data;
};

export const getOrgDetailsList = async (payload: any) => {
  const response = await api.post("V1/OrgProfiles/Search", payload);
  return response.data;
};

export const updateUserDetails = async (payload: any) => {
  const response = await api.post("V1/users/UpdateProfile", payload);
  return response.data;
};

export const changePassword = async (payload: any) => {
  const response = await api.post("V1/users/ChangePassword", payload);
  return response.data;
};

export const dispatchedInvitation = async (payload: any) => {
  const response = await api.post(
    "V1/Organization/DispatchedInvitation",
    payload
  );
  return response.data;
};

export const shareRequirement = async (payload: any) => {
  const response = await api.post(
    "V1/RequirementVendors/ShareRequirement",
    payload
  );
  return response.data;
};

export const getRequirementsList = async () => {
  const response = await api.get("V1/Requirement/GetList");
  return response.data;
};

export const getRequirementsListById = async (uniqueId:any) => {
  const response = await api.get(`V1/Requirement/GetList/${uniqueId}`);
  return response.data;
}

export default api;
