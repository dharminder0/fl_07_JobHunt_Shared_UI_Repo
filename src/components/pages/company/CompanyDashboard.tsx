import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button, Chip, Grid2, Avatar } from "@mui/material";
import JobStatistics from "../../sharedComponents/JobStatistics";
import { CorporateFareOutlined, Share } from "@mui/icons-material";
import {
  getAllUsers,
  getDashboardReqCounts,
  getTopClients,
  getTopVendors,
} from "../../sharedService/apiService";
import { RequirementsStatus } from "../../../components/sharedService/enums";

interface CompanyDashboardProps {}

const CompanyDashboard: React.FC<CompanyDashboardProps> = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [requirementCounts, setRequirementCounts] = useState<any>({});
  const [topCLients, setTopCLients] = useState<any[]>([]);
  const [topVendor, setTopVendors] = useState<any[]>([]);
  const openViewList = (typeofList: string) => {
    let currentPath = window.location.pathname;
    const newPath = currentPath.replace("dashboard", typeofList);
    navigate(newPath);
  };

  const applicantData = [
    {
      logo: "https://fleekitsolutions.com/wp-content/uploads/2023/09/favicon-32x32-1.png",
      label: "Fleek IT Solutions",
      value: 25,
      color: "bg-purple-500",
    },
    {
      logo: "https://www.devstringx.com/wp-content/uploads/2018/03/favicon.ico",
      label: "DevStringX Technologies",
      value: 14,
      color: "bg-green-500",
    },
    {
      logo: "https://binmile.com/wp-content/uploads/2022/07/bmt-favicon.png",
      label: "Binemiles Technologies",
      value: 12,
      color: "bg-blue-500",
    },
    {
      logo: "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
      label: "SDET Tech Pvt. Ltd",
      value: 8,
      color: "bg-yellow-500",
    },
    {
      logo: "https://jignect.tech/wp-content/uploads/2023/01/cropped-JT-Main-ONLY-LOGO-01-192x192.png",
      label: "JigNect Technologies",
      value: 10,
      color: "bg-red-500",
    },
  ];
  const applicantItems = [
    {
      logo: "https://assets.airtel.in/static-assets/new-home/img/favicon-16x16.png",
      label: "Airtel",
      value: 21,
      color: "bg-purple-500",
    },
    {
      logo: "https://www.ibm.com/content/dam/adobe-cms/default-images/favicon.svg",
      label: "IBM Consulting",
      value: 17,
      color: "bg-green-500",
    },
    {
      logo: "https://www.capgemini.com/wp-content/uploads/2021/06/cropped-favicon.png?w=192",
      label: "Capgemini",
      value: 18,
      color: "bg-blue-500",
    },
    {
      logo: "https://www.nttdata.com/global/en/-/media/assets/images/android-chrome-256256.png?rev=8dd26dac893a4a07bae174ff25e900ef",
      label: "NTT DATA",
      value: 16,
      color: "bg-yellow-500",
    },
    {
      logo: "https://companieslogo.com/img/orig/CTSH-82a8444b.png",
      label: "Cognizant",
      value: 21,
      color: "bg-red-500",
    },
  ];
  const hotTech = [
    {
      logo: "https://reactnative.dev/img/header_logo.svg",
      label: "React Native",
      value: 35,
      color: "bg-purple-500",
    },
    {
      logo: "https://angular.dev/assets/icons/favicon-48x48.png",
      label: "Angular",
      value: 27,
      color: "bg-green-500",
    },
    {
      logo: "https://www.gstatic.com/devrel-devsite/prod/v3239347c48d1e3c46204782fd038ba187a6753dfa7d7a0d08a574587ae2085f5/android/images/favicon.svg",
      label: "Android Developer",
      value: 23,
      color: "bg-blue-500",
    },
    {
      logo: "https://vuejs.org/logo.svg",
      label: "Vue Developer",
      value: 34,
      color: "bg-yellow-500",
    },
    { logo: "", label: "QA Automation", value: 36, color: "bg-red-500" },
  ];

  const attentionData = [
    {
      id: 1,
      client: "Airtel",
      label: "Social Media Assistant",
      logo: "https://assets.airtel.in/static-assets/new-home/img/favicon-16x16.png",
      vendor: "Fleek IT Solutions",
    },
    {
      id: 2,
      client: "IBM Consulting",
      label: "QA Automation",
      logo: "https://www.ibm.com/content/dam/adobe-cms/default-images/favicon.svg",
      vendor: "Global Vendors",
    },
    {
      id: 3,
      client: "Capgemini",
      label: "React native developer",
      logo: "https://www.capgemini.com/wp-content/uploads/2021/06/cropped-favicon.png?w=192",
      vendor: "Empanelled Vendors",
    },
    {
      id: 4,
      client: "NTT DATA",
      label: "Web Application",
      logo: "https://www.nttdata.com/global/en/-/media/assets/images/android-chrome-256256.png?rev=8dd26dac893a4a07bae174ff25e900ef",
      vendor: "DevStingX Technologies",
    },
  ];

  const handleCardClick = (page: string, status: any) => {
    navigate(`/company/${page}`, {
      state: { status: status }, // Passing state data
    });
  };

  useEffect(() => {
    getReqDetailCounts();
    getTopClientsList();
    getTopVendorsList();
  }, []);

  const getReqDetailCounts = () => {
    getDashboardReqCounts(userData?.orgCode).then((result: any) => {
      if (Object.keys(result).length >= 0) {
        setRequirementCounts(result);
      }
    });
  };

  const getTopClientsList = () => {
    getTopClients({
      orgCode: userData?.orgCode,
      pageNumber: 1,
      pageSize: 5,
    }).then((result: any) => {
      if (result.totalPages >= 0) {
        setTopCLients(result.list);
      }
    });
  };

  const getTopVendorsList = () => {
    getTopVendors({
      orgCode: userData?.orgCode,
      pageNumber: 1,
      pageSize: 5,
    }).then((result: any) => {
      if (result.totalPages >= 0) {
        setTopVendors(result.list);
      }
    });
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
        <div
          className="bg-primary-light p-3 rounded-md flex flex-col items-center shadow cursor-pointer hover:bg-primary-hover"
          onClick={() =>
            handleCardClick("myrequirements", RequirementsStatus.Open)
          }
        >
          <Typography variant="h5" className="!text-indigo-950">
            {requirementCounts?.openPositions}
          </Typography>
          {/* <p className="text-white text-heading mb-2">76</p> */}
          <p className="text-base">Open Positions</p>
        </div>

        <div
          className="bg-primary-light p-3 rounded-md flex items-center flex-col shadow cursor-pointer hover:bg-primary-hover"
          onClick={() =>
            handleCardClick("myrequirements", RequirementsStatus.Open)
          }
        >
          <Typography variant="h5" className="!text-indigo-800">
            {requirementCounts?.hotRequirements}
          </Typography>
          <p className="text-base">Hot Requirements</p>
        </div>

        <div
          className="bg-primary-light p-3 rounded-md flex items-center flex-col shadow cursor-pointer hover:bg-primary-hover"
          onClick={() => handleCardClick("candidates", "Interview Round I")}
        >
          <Typography variant="h5" className="!text-indigo-600">
            {requirementCounts?.interviewScheduled}
          </Typography>
          <p className="text-base">Interview Scheduled</p>
        </div>

        <div
          className="bg-primary-light p-3 rounded-md flex items-center flex-col shadow cursor-pointer hover:bg-primary-hover"
          onClick={() => handleCardClick("candidates", "In Review")}
        >
          <Typography variant="h5" className="!text-indigo-400">
            {requirementCounts?.candidatesToReview}
          </Typography>
          <p className="text-base">Candidates to review</p>
        </div>

        <div
          className="bg-primary-light p-3 rounded-md flex items-center flex-col shadow cursor-pointer hover:bg-primary-hover"
          onClick={() => handleCardClick("myrequirements", true)}
        >
          <Typography variant="h5" className="!text-red-600">
            {requirementCounts?.totalApplicants}
          </Typography>
          <p className="text-base">No Applicants</p>
        </div>
      </div>
      <div className="flex-1 px-4 pb-4">
        {/* Job Statistics */}
        <div className="flex-1 flex justify-between md:flex-wrap sm:flex-col md:flex-row">
          <JobStatistics pieTitle="Requirements" />
          <Box className="gap-6 sm:w-[99%] lg:w-[33%] md:w-[49%] mb-4">
            {/* Applicants Summary Card */}
            <Box className="bg-white border px-4 rounded-md">
              <div className="flex justify-between">
                <p className="pt-4 text-title">Top Vendors</p>
                <p className="pt-4 text-title">Placements</p>
              </div>
              {/* Progress Bars */}
              <Box className="mt-4">
                {topVendor.map((item, index) => (
                  <Box key={index} className="mb-3">
                    <Box className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <Avatar
                          alt="Org Icon"
                          src={item?.vendorLogo || undefined}
                          className="rounded-full !h-6 !w-6"
                        >
                          {!item?.vendorLogo && (
                            <CorporateFareOutlined fontSize="small" />
                          )}
                        </Avatar>
                        <p className="text-base ms-2">{item.vendorName}</p>
                      </div>
                      <p className="text-title ms-2">{item.totalPlacements}</p>
                    </Box>
                  </Box>
                ))}
              </Box>
              <div className="mb-1.5 text-end">
                <Button
                  variant="text"
                  onClick={() => openViewList("myvendors")}
                >
                  View all
                </Button>
              </div>
            </Box>
          </Box>
          <Box className="gap-6 sm:w-[99%] lg:w-[33%] md:w-[49%] mb-4">
            {/* Applicants Summary Card */}
            <Box className="bg-white border px-4 rounded-md">
              <div className="flex justify-between">
                <p className="pt-4 text-title">Top Clients</p>
                <p className="pt-4 text-title">Positions</p>
              </div>
              {/* Progress Bars */}
              <Box className="mt-4">
                {topCLients.map((item, index) => (
                  <Box key={index} className="mb-3">
                    <Box className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <Avatar
                          alt="Org Icon"
                          src={item.clientLogo || undefined}
                          className="rounded-full !h-6 !w-6"
                        >
                          {!item.clientLogo && (
                            <CorporateFareOutlined fontSize="small" />
                          )}
                        </Avatar>
                        <p className="text-base ms-2">{item.clientName}</p>
                      </div>
                      <p className="text-title ms-2">{item.totalPositions}</p>
                    </Box>
                  </Box>
                ))}
                <div className="mb-1.5 text-end">
                  <Button
                    variant="text"
                    onClick={() => openViewList("clients")}
                  >
                    View all
                  </Button>
                </div>
              </Box>
            </Box>
          </Box>
        </div>
        {/* <div className="flex gap-2 md:flex-wrap sm:flex-col md:flex-row">
          <Box className="gap-6 sm:w-[99%] lg:w-[33%] md:w-[49%] mb-4">
            
            <Box className="bg-white border px-4 rounded-md">
              <div className="flex justify-between">
                <p className="pt-4 text-title">Trending Technologies</p>
                <p className="pt-4 text-title">Positions</p>
              </div>
             
              <Box className="mt-4">
                {hotTech.map((item, index) => (
                  <Box key={index} className="mb-3">
                    <Box className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <img
                          src={
                            !item.logo
                              ? "/assets/images/Companylogo1.png"
                              : item.logo
                          }
                          className="rounded-full"
                          style={{ width: 25, height: 25 }}
                        />
                        <p className="text-base ms-2">{item.label}</p>
                      </div>
                      <p className="text-title ms-2">{item.value}</p>
                    </Box>
                  </Box>
                ))}
                <div className="mb-1.5 text-end">
                  <Button variant="text">View all</Button>
                </div>
              </Box>
            </Box>
          </Box>
        </div> */}

        {/* Job Updates */}
        <p className="text-heading mb-4 mt-6">Requirements need attention</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {attentionData.map((requirement) => (
            <Grid2 size={3} key={requirement.id}>
              <div
                className="border rounded-md p-3 hover:bg-indigo-50 hover:border-indigo-700 cursor-pointer"
                onClick={() =>
                  navigate(`/company/myrequirements/${requirement.id}`)
                }
              >
                <div className="flex">
                  <img
                    src={
                      !requirement.logo
                        ? "/assets/images/Companylogo1.png"
                        : requirement.logo
                    }
                    className="rounded-full mb-2"
                    style={{ width: 36, height: 36 }}
                  />
                  <div className="ms-3">
                    <p className="text-title">{requirement.label}</p>
                    <p className="text-base">{requirement.client}</p>
                  </div>
                </div>
                <div className="flex flex-wrap mb-1">
                  <Chip
                    label="Remote"
                    variant="outlined"
                    className="my-1 me-1 !text-info"
                    size="small"
                  />
                  <Chip
                    label="Positions: 3"
                    variant="outlined"
                    className="my-1 me-1 !text-info"
                    size="small"
                  />
                  <Chip
                    label="12-12-2024"
                    variant="outlined"
                    className="my-1 me-1 !text-info"
                    size="small"
                  />
                </div>

                <Button variant="text" startIcon={<Share />} size="small">
                  {requirement.vendor}
                </Button>
              </div>
            </Grid2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
