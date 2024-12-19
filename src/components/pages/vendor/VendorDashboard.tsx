import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Avatar,
  LinearProgress,
  Button,
  Chip,
} from "@mui/material";
import JobStatistics from "../../common/JobStatistics";
import { Share } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface VendorDashboard {}

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

const VendorDashboard: React.FC<VendorDashboard> = () => {
  const navigate = useNavigate();

  const handleCardClick = (page: string, status: any) => {
    navigate(`/vendor/${page}`, {
      state: { status: status }, // Passing state data
    });
  };

  return (
    <div className="flex">
      <div className="flex-1 p-4">
        {/* Overview Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div
            className="bg-primary-light p-3 rounded-md flex flex-col items-center shadow cursor-pointer hover:bg-primary-hover"
            onClick={() => handleCardClick("requirements", "Open")}
          >
            <Typography variant="h5" className="!text-indigo-950">
              5
            </Typography>
            <p className="text-base">Open Requirements</p>
          </div>

          <div
            className="bg-primary-light p-3 rounded-md flex items-center flex-col shadow cursor-pointer hover:bg-primary-hover"
            onClick={() => handleCardClick("requirements", "Hot")}
          >
            <Typography variant="h5" className="!text-indigo-800">
              3
            </Typography>
            <p className="text-base">Hot Requirements</p>
          </div>

          <div
            className="bg-primary-light p-3 rounded-md flex items-center flex-col shadow cursor-pointer hover:bg-primary-hover"
            onClick={() => handleCardClick("candidates", "Interview Scheduled")}
          >
            <Typography variant="h5" className="!text-indigo-600">
              7
            </Typography>
            <p className="text-base">Interview Scheduled</p>
          </div>

          <div
            className="bg-primary-light p-3 rounded-md flex items-center flex-col shadow cursor-pointer hover:bg-primary-hover"
            onClick={() => handleCardClick("requirements", true)}
          >
            <Typography variant="h5" className="!text-indigo-400">
              4
            </Typography>
            <p className="text-base">Total job applied</p>
          </div>
        </div>
        {/* Job Statistics */}
        <div className="flex justify-between mb-4">
          <JobStatistics />
        </div>
        <div className="flex space-x-3">
          <Box className="gap-6 w-[33%]">
            {/* Applicants Summary Card */}
            <Box className="bg-white border px-4 rounded-md">
              <div className="flex justify-between">
                <p className="pt-4 text-title">Top Clients</p>
                <p className="pt-4 text-title">Requirments</p>
              </div>
              {/* Progress Bars */}
              <Box className="mt-4">
                {applicantItems.map((item, index) => (
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
              </Box>
            </Box>
          </Box>
          <Box className="gap-6 w-[33%]">
            {/* Applicants Summary Card */}
            <Box className="bg-white border px-4 rounded-md">
              <div className="flex justify-between">
                <p className="pt-4 text-title">Trending Technologies</p>
                <p className="pt-4 text-title">Requirments</p>
              </div>
              {/* Progress Bars */}
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
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
