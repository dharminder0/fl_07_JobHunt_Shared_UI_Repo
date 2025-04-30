import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button, Chip, Grid2, Avatar } from "@mui/material";
import JobStatistics from "../../sharedComponents/JobStatistics";
import {
  Add,
  AddOutlined,
  CorporateFareOutlined,
  Share,
} from "@mui/icons-material";
import {
  getAllUsers,
  getDashboardReqCounts,
  getHotRequirements,
  getTopClients,
  getTopVendors,
} from "../../sharedService/apiService";
import { RequirementsStatus } from "../../../components/sharedService/enums";
import moment from "moment";
import Loader from "../../../components/sharedComponents/Loader";

interface CompanyDashboardProps {}

const CompanyDashboard: React.FC<CompanyDashboardProps> = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const [isLoading, setIsLoading] = useState(true);
  const [requirementCounts, setRequirementCounts] = useState<any>({});
  const [topCLients, setTopCLients] = useState<any[]>([]);
  const [topVendor, setTopVendors] = useState<any[]>([]);
  const [hotRequirements, setHotRequirements] = useState<any[]>([]);
  const openViewList = (typeofList: string) => {
    let currentPath = window.location.pathname;
    const newPath = currentPath.replace("dashboard", typeofList);
    navigate(newPath);
  };

  const handleCardClick = (page: string, status: any) => {
    navigate(`/company/${page}`, {
      state: { status: status }, // Passing state data
    });
  };

  const loadDashboardData = async () => {
    setIsLoading(true); // Show loader at the start

    try {
      const [counts, clients, vendors, hotReqs] = await Promise.all([
        getDashboardReqCounts(userData?.orgCode),
        getTopClients({
          orgCode: userData?.orgCode,
          pageNumber: 1,
          pageSize: 5,
        }),
        getTopVendors({
          orgCode: userData?.orgCode,
          pageNumber: 1,
          pageSize: 5,
        }),
        getHotRequirements({
          orgCode: userData?.orgCode,
          page: 1,
          pageSize: 10,
        }),
      ]);

      if (Object.keys(counts).length >= 0) {
        setRequirementCounts(counts);
      }
      if (clients.totalPages >= 0) {
        setTopCLients(clients.list);
      }
      if (vendors.totalPages >= 0) {
        setTopVendors(vendors.list);
      }
      if (hotReqs.totalPages >= 0) {
        setHotRequirements(hotReqs.list);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false); // Hide loader after all requests complete
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <>
      {!isLoading ? (
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
                {requirementCounts?.noApplications}
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
                    {topVendor?.length > 0 && (
                      <p className="pt-4 text-title">Placements</p>
                    )}
                  </div>
                  {/* Progress Bars */}
                  <Box className="mt-4">
                    {topVendor?.length > 0 ? (
                      topVendor.map((item, index) => (
                        <Box key={index} className="mb-3">
                          <Box className="flex justify-between mb-1">
                            <div className="flex items-center">
                              <Avatar
                                alt={item.vendorName}
                                src={item?.vendorLogo || undefined}
                                className="rounded-full !h-6 !w-6"
                              >
                                {!item?.vendorLogo && (
                                  <CorporateFareOutlined fontSize="small" />
                                )}
                              </Avatar>
                              <p className="text-base ms-2">
                                {item.vendorName}
                              </p>
                            </div>
                            <p className="text-title ms-2">
                              {item.totalPlacements}
                            </p>
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <div className="pb-5 text-center">
                        <p className="text-base mb-5">
                          You haven't empaneled any vendors. Start by clicking
                          'Invite Vendors' button to search vendors to
                          streamline your partnerships.
                        </p>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => openViewList("findvendors")}
                          startIcon={<AddOutlined fontSize="small" />}
                        >
                          Invite Vendors
                        </Button>
                      </div>
                    )}
                  </Box>
                  {topVendor?.length > 0 && (
                    <div className="mb-1.5 text-end">
                      <Button
                        variant="text"
                        onClick={() => openViewList("myvendors")}
                      >
                        View all
                      </Button>
                    </div>
                  )}
                </Box>
              </Box>
              <Box className="gap-6 sm:w-[99%] lg:w-[33%] md:w-[49%] mb-4">
                {/* Applicants Summary Card */}
                <Box className="bg-white border px-4 rounded-md">
                  <div className="flex justify-between">
                    <p className="pt-4 text-title">Top Clients</p>
                    {topCLients?.length > 0 && (
                      <p className="pt-4 text-title">Positions</p>
                    )}
                  </div>
                  {/* Progress Bars */}
                  <Box className="mt-4">
                    {topCLients?.length > 0 ? (
                      topCLients.map((item, index) => (
                        <Box key={index} className="mb-3">
                          <Box className="flex justify-between mb-1">
                            <div className="flex items-center">
                              <Avatar
                                alt={item.clientName}
                                src={item.clientLogo || undefined}
                                className="rounded-full !h-6 !w-6"
                              >
                                {!item.clientLogo && (
                                  <CorporateFareOutlined fontSize="small" />
                                )}
                              </Avatar>
                              <p className="text-base ms-2">
                                {item.clientName}
                              </p>
                            </div>
                            <p className="text-title ms-2">
                              {item.totalPositions}
                            </p>
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <div className="pb-5 text-center">
                        <p className="text-base mb-5">
                          You haven't added any clients. Start by adding your
                          top clients to showcase your portfolio.
                        </p>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => openViewList("clients")}
                          startIcon={<AddOutlined fontSize="small" />}
                        >
                          Create new clients
                        </Button>
                      </div>
                    )}
                    {topCLients?.length > 0 && (
                      <div className="mb-1.5 text-end">
                        <Button
                          variant="text"
                          onClick={() => openViewList("clients")}
                        >
                          View all
                        </Button>
                      </div>
                    )}
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

            {hotRequirements?.length > 0 && (
              <>
                <p className="text-heading mb-4 mt-6">
                  Requirements need attention
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {hotRequirements.map((requirement) => (
                    <Grid2 size={3} key={requirement.id}>
                      <div
                        className="border rounded-md p-3 hover:bg-indigo-50 hover:border-indigo-700 cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/company/myrequirements/${requirement.RequirementUniqueId}`
                          )
                        }
                      >
                        <div className="flex">
                          <Avatar
                            alt={requirement.ClientName}
                            src={requirement.ClientLogo || undefined}
                            className="rounded-full !h-8 !w-8"
                          >
                            {!requirement.ClientLogo && (
                              <CorporateFareOutlined fontSize="small" />
                            )}
                          </Avatar>
                          <div className="ms-3">
                            <p className="text-title">{requirement.Title}</p>
                            <p className="text-base">
                              {requirement.ClientName}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap mb-1">
                          <Chip
                            label={requirement.LocationTypeName}
                            variant="outlined"
                            className="my-1 me-1 !text-info"
                            size="small"
                          />
                          <Chip
                            label={`Positions: ${requirement.Positions}`}
                            variant="outlined"
                            className="my-1 me-1 !text-info"
                            size="small"
                          />
                          <Chip
                            label={moment(requirement.CreatedOn).format(
                              "DD-MM-YYYY"
                            )}
                            variant="outlined"
                            className="my-1 me-1 !text-info"
                            size="small"
                          />
                        </div>

                        <Button
                          variant="text"
                          startIcon={<Share />}
                          size="small"
                        >
                          {requirement.VisibilityName}
                        </Button>
                      </div>
                    </Grid2>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

export default CompanyDashboard;
