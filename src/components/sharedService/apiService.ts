import axios from "axios";
import api from "./api";

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

export const forgotPassword = async (email: string) => {
  const response = await api.post(`V1/users/ForgetPassword?email=${email}`);
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

export const getOrgProfileDetails = async (payload: any) => {
  const response = await api.post("V1/Organization/GetProfile", payload);
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

export const getRequirementsList = async (payload: any) => {
  const response = await api.post("V1/Requirement/Search", payload);
  return response.data;
};

export const getRequirementsListById = async (uniqueId: any) => {
  const response = await api.get(`V1/Requirement/GetList/${uniqueId}`);
  return response.data;
};

export const getClientLists = async (orgCode: any) => {
  const response = await api.get(`V1/Clients/ListByOrgCode?orgCode=${orgCode}`);
  return response.data;
};

export const getClientsList = async (payload: any) => {
  const response = await api.post("V1/Clients/Search", payload);
  return response.data;
};

export const upsertClient = async (payload: any) => {
  const response = await api.post("V1/Clients/Upsert", payload);
  return response.data;
};

export const getClientDataByClientCode = async (clientCode: any) => {
  const response = await api.get(
    `/V1/Clients/ClientCode?clientCode=${clientCode}`
  );
  return response.data;
};

export const getOnboardInvitedList = async (payload: any) => {
  const response = await api.post("V1/Organization/Empaneled-list", payload);
  return response.data;
};

export const inviteStatusChange = async (payload: any) => {
  const response = await api.post("V1/Organization/manageInvitation", payload);
  return response.data;
};

export const addNewMember = async (payload: any) => {
  const response = await api.post("V1/user/AddMember", payload);
  return response.data;
};

export const deleteMember = async (userId: any) => {
  const response = await api.post(`V1/users/DeleteMember?userId=${userId}`);
  return response.data;
};

export const setMemberPassword = async (payload: any) => {
  const response = await api.post("V1/users/SetPassword", payload);
  return response.data;
};

export const getMembersList = async (payload: any) => {
  const response = await api.post("V1/users/member/Search", payload);
  return response.data;
};

export const updateUserEmail = async (oldEmail: any, newEmail: any) => {
  const response = await api.post(
    `V1/users/ChangeEmail?OldEmail=${oldEmail}&NewEmail=${newEmail}`
  );
  return response.data;
};

export const UpsertBenchDetail = async (payload: any) => {
  const response = await api.post("V1/Bench/Upsert", payload);
  return response.data;
};

export const getBenchDetails = async (orgcode: any) => {
  const response = await api.get(`V1/Bench/${orgcode}`);
  return response.data;
};

export const getBenchList = async (payload: any) => {
  const response = await api.post("V1/Bench/Search", payload);
  return response.data;
};

export const benchAvailabiltyUpdate = async (payload: any) => {
  const response = await api.post("V1/Bench/update-availability", payload);
  return response.data;
};

export const upsertApplications = async (payload: any) => {
  const response = await api.post("V1/Applications/Upsert", payload);
  return response.data;
};

export const getApplicantsList = async (payload: any) => {
  const response = await api.post("V1/Applications/Search", payload);
  return response.data;
};

export const getRequirementApplicants = async (payload: any) => {
  const response = await api.post(
    "V1/Requirement/Get/Applicants?requirementUniqueId",
    payload
  );
  return response.data;
};

export const getClientApplicantsList = async (payload: any) => {
  const response = await api.post(
    "V1/Applicants/Company/GetListByOrgCode",
    payload
  );
  return response.data;
};

export const getDashboardReqCounts = async (orgCode: any) => {
  const response = await api.get(`V1/Requirement/Company-dashboard/${orgCode}`);
  return response.data;
};

export const getVndDashboardReqCounts = async (
  userId: any,
  orgCode: any,
  roleTyle: any
) => {
  const response = await api.get(
    `V1/Requirement/Vendor-dashboard/${userId}/${orgCode}?roleType=${roleTyle}`
  );
  return response.data;
};

export const updateRequirementStatus = async (
  requirementId: any,
  status: any
) => {
  const response = await api.post(
    `V1/Requirement/UpdateStatus?requirementId=${requirementId}&status=${status}`
  );
  return response.data;
};

export const getTopClients = async (payload: any) => {
  const response = await api.post(
    "V1/Applicants/Company/Vacancies/Active",
    payload
  );
  return response.data;
};

export const getTopVendors = async (payload: any) => {
  const response = await api.post("V1/Applicants/Company/TopVendors", payload);
  return response.data;
};

export const getRequirementWeekGraph = async (payload: any) => {
  const response = await api.post(
    "V1/Requirement/Company-dashboard/Day-Week/Graph",
    payload
  );
  return response.data;
};

export const getRequirementStatusGraph = async (payload: any) => {
  const response = await api.post(
    "V1/Requirement/Company-dashboard/Requirement/Graph",
    payload
  );
  return response.data;
};

export const getVndRequirementWeekGraph = async (payload: any) => {
  const response = await api.post(
    "V1/Requirement/Vendor-dashboard/Day-Week/Graph",
    payload
  );
  return response.data;
};

export const getVndRequirementStatusGraph = async (payload: any) => {
  const response = await api.post(
    "V1/Requirement/Vendor-dashboard/Requirement/Graph",
    payload
  );
  return response.data;
};

export const getVndTopClients = async (payload: any) => {
  const response = await api.post(
    "V1/Applicants/Vendor/Vacancies/Active",
    payload
  );
  return response.data;
};

export const upsertRequirementHot = async (payload: any) => {
  const response = await api.post("V1/Requirement/Hot-Upsert", payload);
  return response.data;
};

export const getHotRequirements = async (payload: any) => {
  const response = await api.post("V1/Requirement/Hot-Vacancies", payload);
  return response.data;
};

export const getTechStackList = async (payload: any) => {
  const response = await api.post(`V1/Resources/TechStack`, payload);
  return response.data;
};

export const getSkillsList = async () => {
  const response = await api.get("V1/Skill/GetList");
  return response.data;
};

export const upsertMatchingIds = async (payload: any) => {
  const response = await api.post("V1/MatchRecord/GetMatchRecord", payload);
  return response.data;
};

export const getCVDetailById = async (id: any) => {
  const response = await api.get(`V1/Bench/GetCv?id=${id}`);
  return response.data;
};

export const getMatchingPositions = async (payload: any) => {
  const response = await api.post("V1/Bench/MatchResult", payload);
  return response.data;
};

export const getMatchingCandidates = async (payload: any) => {
  const response = await api.post("V1/Requirement/MatchResult", payload);
  return response.data;
};

export const upsetAvatar = async (payload: any) => {
  const response = await api.post("V1/Bench/Cv/UpsertAvtar", payload);
  return response.data;
};

export const getMatchingVendors = async (payload: any) => {
  const response = await api.post("V1/Requirement/MatchingVendors", payload);
  return response.data;
};

export const getVendorContractData = async (payload: any) => {
  const response = await api.post("V1/Resources/contracts", payload);
  return response.data;
};

export const getSimilerRequirements = async (payload: any) => {
  const response = await api.post("V1/Requirement/matching", payload);
  return response.data;
};

export const getClientsContractData = async (payload: any) => {
  const response = await api.post("V1/Resources/shared-contracts", payload);
  return response.data;
};

export const updateApplicantsStatus = async (payload: any) => {
  const response = await api.post("v1/applicant/upsert-status", payload);
  return response.data;
};

export const getApplicantsStatusHistory = async (applicantId: any) => {
  const response = await api.get(
    `v1/applicant/status-history?applicantId=${applicantId}`
  );
  return response.data;
};

export const getNotificationsList = async (payload: any) => {
  const response = await api.post(`V1/Notifications/list`, payload);
  return response.data;
};

export const getNotificationUpdate = async (id: any) => {
  const response = await api.post(
    `V1/Notifications/update-status?notificationId=${id}&isRead=true`
  );
  return response.data;
};

export const getNotificationCounts = async (orgCode: any) => {
  const response = await api.post(`V1/Notifications/Count?orgCode=${orgCode}`);
  return response.data;
};

export const matchRequirementToCandidates = async (
  requirementIds: number[]
) => {
  try {
    const response = await axios.post(
      "https://fl-07-agent-shared-api-test.azurewebsites.net/match_requirement_to_candidates",
      {
        requirement_ids: requirementIds,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // rethrow if you want the caller to handle it
  }
};

export const matchCandidateToRequirements = async (candidate_ids: number[]) => {
  try {
    const response = await axios.post(
      "https://fl-07-agent-shared-api-test.azurewebsites.net/match_candidate_to_requirements",
      {
        candidate_ids: candidate_ids,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // rethrow if you want the caller to handle it
  }
};

export default api;
