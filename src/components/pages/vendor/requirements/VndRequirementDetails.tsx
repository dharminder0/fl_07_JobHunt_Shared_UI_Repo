import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";
import { Edit, Download, CorporateFareOutlined } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import MatchingSkillsDialog from "../../../sharedComponents/MatchingSkillsDialog";
import StatusDialog from "../../../sharedComponents/StatusDialog";
import {
  getRequirementsListById,
  getRequirementApplicants,
  getRequirementsList,
} from "../../../../components/sharedService/apiService";
import moment from "moment";
import { ApplicantsStatus } from "../../../../components/sharedService/shareData";
import {
  ApplicationEnums,
  RoleType,
} from "../../../../components/sharedService/enums";
import HtmlRenderer from "../../../../components/sharedComponents/HtmlRenderer";
import TablePreLoader from "../../../../components/sharedComponents/TablePreLoader";
import { AppDispatch } from "@/components/redux/store";
import { useDispatch } from "react-redux";
import {
  closeBackdrop,
  openBackdrop,
} from "../../../../components/features/drawerSlice";
import IconAi from "../../../../components/sharedComponents/IconAi";

const VndRequirementDetails = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const activeRole = localStorage.getItem("activeRole") || "";
  const [activeTab, setActiveTab] = useState(0);
  const [matchingScore, setMatchingScore] = React.useState(0);
  const [isLoader, setIsLoader] = React.useState(false);
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState("New");
  const [requirementData, setRequirementData] = useState<any>(null);
  const [similiarData, SetSimiliarData] = useState<any>(null);
  const [applicantData, setApplicantData] = useState<any[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleStatusDialog = (status: string) => {
    setIsDialogOpen(true);
    setSelectedStatus(status);
  };

  const handleMatchingDialog = (score: number) => {
    setIsMatchOpen(true);
    setMatchingScore(score);
  };

  const getRequirementDetails = (id: number) => {
    navigate(`/vendor/requirements/${id}`);
  };

  const pathSegments = document.location.pathname.split("/");
  const uniqueId = pathSegments.pop();
  useEffect(() => {
    dispatch(openBackdrop());
    getRequirementsData(uniqueId);
    getRequirementApplicant(uniqueId);
  }, [uniqueId]);

  const getRequirementsData = (uniqueId: any) => {
    getRequirementsListById(uniqueId)
      .then((result: any) => {
        if (result) {
          setRequirementData(result);
          getRequirementsSimiliarData(result?.title);
          setTimeout(() => {
            dispatch(closeBackdrop());
          }, 1000);
        }
      })
      .catch((error: any) => {
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1000);
      });
  };
  const getRequirementApplicant = (uniqueId: any) => {
    const payload = {
      requirementUniqueId: uniqueId,
      page: 1,
      pageSize: 10,
    };
    setIsLoader(true);
    getRequirementApplicants(payload)
      .then((result: any) => {
        if (result.count >= 0) {
          setApplicantData(result.list);
          setTimeout(() => {
            setIsLoader(false);
          }, 1000);
        }
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsLoader(false);
          dispatch(closeBackdrop());
        }, 1000);
      });
  };

  const getRequirementsSimiliarData = (searchText: string) => {
    const payload = {
      orgCode: userData.orgCode,
      searchText: searchText ?? "",
      page: 1,
      pageSize: 5,
      status: [1],
      userId: userData.userId,
      roleType: [activeRole === "vendor" && RoleType.Vendor],
    };

    getRequirementsList(payload)
      .then((result: any) => {
        if (result && result?.totalPages > 0) {
          SetSimiliarData(result.list);
        } else {
          SetSimiliarData([]);
        }
      })
      .catch((error: any) => {
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1000);
      });
  };

  return (
    <div className="flex">
      {/* Header */}

      <div className="w-[70%] min-h-screen p-3">
        <Box className="flex justify-between items-center">
          <div className="flex flex-row gap-3">
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              className="!w-[50px] !h-[50px]"
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <h5 className="text-heading group/item flex items-center">
                {requirementData?.title}
                <div className="group/edit invisible group-hover/item:visible">
                  <span className="group-hover/edit:text-gray-700 ">
                    <IconButton aria-label="edit" sx={{ marginLeft: 2 }}>
                      <Edit fontSize="small" />
                    </IconButton>
                  </span>
                </div>
              </h5>
              <div className="flex items-center">
                {requirementData?.clientFavicon && (
                  <img
                    src={requirementData?.clientFavicon}
                    alt=""
                    style={{ width: 16, height: 16 }}
                  />
                )}
                <p className="text-title mx-2">
                  {" "}
                  {requirementData?.clientName}
                </p>

                <div>
                  {requirementData?.locationTypeName && (
                    <Chip
                      label={requirementData?.locationTypeName}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: 10 }}
                      className="my-1 me-1"
                    />
                  )}
                  {requirementData?.clientName && (
                    <Chip
                      label={`Positions: ${requirementData?.positions}`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: 10 }}
                      className="my-1 me-1"
                    />
                  )}
                  {requirementData?.experience && (
                    <Chip
                      label={requirementData?.experience}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: 10 }}
                      className="my-1 me-1"
                    />
                  )}

                  {requirementData?.visibilityName && (
                    <Chip
                      label={requirementData?.visibilityName}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: 10 }}
                      className="my-1 me-1"
                    />
                  )}
                </div>
              </div>
            </Box>
          </div>
        </Box>
        <div>
          {/* Description */}
          <div className="mb-4 mt-2 text-gray-600 text-base">
            <HtmlRenderer content={requirementData?.description} />
          </div>

          {/* Responsibilities */}
          <Box>
            <p className="text-title mb-2">Remarks</p>
            <p className="text-gray-600 text-base">
              {requirementData?.remarks}
            </p>
          </Box>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Applicants" />
          <Tab label="Analytics" />
        </Tabs>

        {activeTab == 0 && (
          <>
            <div className="table-body mt-3">
              <table>
                <thead>
                  <tr>
                    <th className="add-right-shadow">Name</th>
                    <th>Status</th>
                    <th>Application Date</th>
                  </tr>
                </thead>

                <TablePreLoader isTableLoader={isLoader} data={applicantData} />

                <tbody>
                  {applicantData.map((applicant, index) => (
                    <tr
                      key={index}
                      // onClick={() => handleRowClick(applicant.id)}
                    >
                      <th className="add-right-shadow">
                        <div className="flex items-center justify-between text-info mt-1">
                          <div className="text-base">
                            {applicant?.firstName + " " + applicant?.lastName}
                          </div>
                          <div className="flex text-info items-center text-secondary-text">
                            <div
                              className="flex cursor-pointer"
                              // onClick={() =>
                              //   handleMatchingDialog(applicant?.ai)
                              // }
                            >
                              <IconAi />
                              <span> {applicant?.ai || 74}%</span>
                            </div>
                            <div className="ms-2 text-indigo-500 cursor-pointer hover:text-indigo-700 ">
                              <Download fontSize="inherit" />
                              <span className="text-info">CV</span>
                            </div>
                          </div>
                        </div>
                      </th>
                      <td>
                        <Typography
                          className={`inline-block px-3 py-1 !text-base rounded-full cursor-pointer ${
                            applicant.status === ApplicationEnums.Selected
                              ? "bg-green-100 text-green-700"
                              : applicant.status === ApplicationEnums.Rejected
                                ? "bg-red-100 text-red-700"
                                : applicant.status === ApplicationEnums.New
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-indigo-100 text-indigo-700"
                          }`}
                          onClick={() =>
                            handleStatusDialog(applicant.statusName)
                          }
                        >
                          {applicant.statusName}
                        </Typography>
                      </td>
                      <td>
                        {moment(applicant.applicationDate).format("DD-MM-YYYY")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <div className="w-[30%] border-s p-3">
        <div className="text-title mb-3 mt-1">Similar Requirements</div>
        {similiarData?.length > 0 ? (
          similiarData.map((item: any) => (
            <div
              className="mb-2 border rounded-md p-2 cursor-pointer hover:border-indigo-700 hover:bg-primary-hover"
              onClick={() => getRequirementDetails(item?.uniqueId)}
            >
              <div className="flex items-center justify-between">
                <div className="text-base text-ellipsis overflow-hidden truncate">
                  {item.title}
                </div>
                <div className="flex text-secondary-text text-info">
                  <div>{item?.matchingCandidate || 2} Matching Candidates</div>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap text-secondary-text text-info mt-1">
                <div className="flex items-center w-full">
                  {!item.clientFavicon ? (
                    <CorporateFareOutlined fontSize="medium" />
                  ) : (
                    <img
                      src={item.clientFavicon}
                      style={{ height: 12, width: 12 }}
                      className="me-1"
                    />
                  )}
                  <Tooltip title={item.clientName} arrow>
                    <span className="text-ellipsis overflow-hidden truncate">
                      {item.clientName}
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <p className="text-base text-center">No Data Available</p>
          </>
        )}
      </div>

      <MatchingSkillsDialog
        title="Matching Score Analysis"
        isMatchOpen={isMatchOpen}
        setIsMatchOpen={setIsMatchOpen}
        aiScore={matchingScore}
      />

      <StatusDialog
        title="Applicant Status"
        statusData={ApplicantsStatus}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedStatus={selectedStatus}
        isVendor={true}
      />
    </div>
  );
};

export default VndRequirementDetails;
