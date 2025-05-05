import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  IconButton,
  Chip,
  Tooltip,
  InputAdornment,
  Avatar,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Edit,
  Download,
  AccountCircleOutlined,
  CorporateFareOutlined,
  RefreshOutlined,
} from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import MenuDrpDwn from "../../../sharedComponents/MenuDrpDwn";
import StatusDialog from "../../../sharedComponents/StatusDialog";
import MatchingSkillsDialog from "../../../sharedComponents/MatchingSkillsDialog";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  getMatchingVendors,
  getOnboardInvitedList,
  getOrgDetailsList,
  getRequirementApplicants,
  getRequirementsListById,
  matchRequirementToCandidates,
  upsertRequirementHot,
} from "../../../../components/sharedService/apiService";
import {
  ApplicantsStatus,
  RequirementStatus,
} from "../../../../components/sharedService/shareData";
import {
  ApplicationEnums,
  InvitedType,
  RoleType,
} from "../../../../components/sharedService/enums";
import moment from "moment";
import MenuDrpDwnV2 from "../../../../components/sharedComponents/MenuDrpDwnV2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/components/redux/store";
import {
  closeBackdrop,
  openBackdrop,
  openDrawer,
} from "../../../../components/features/drawerSlice";
import SuccessDialog from "../../../../components/sharedComponents/SuccessDialog";
import HtmlRenderer from "../../../../components/sharedComponents/HtmlRenderer";
import TablePreLoader from "../../../../components/sharedComponents/TablePreLoader";
import IconAi from "../../../../components/sharedComponents/IconAi";

const RequirementDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const drawerState = useSelector((state: any) => state.drawer);

  const params = location.state || {};
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [activeTab, setActiveTab] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState("New");
  const [matchingScore, setMatchingScore] = React.useState(0);
  const [activeDataList, setActiveDataList] = useState<any>({});
  const [requirementData, setRequirementData] = useState<any>(null);
  const [applicantData, setApplicantData] = useState<any[]>([]);
  const [status, setStatus] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<any>("");
  const [checked, setChecked] = React.useState(false);
  const [isLoader, setIsLoader] = useState<any>(false);
  const [isSuccessPopup, setIsSuccessPopup] = useState<any>(false);
  const [updateStatus, setUpdateStatus] = useState<any>({});

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

  const getVendorDetails = (id: number) => {
    navigate(`/company/myvendors/${id}?type=activeView`, {
      state: { previousUrl: location.pathname },
    });
  };

  const pathSegments = document.location.pathname.split("/");
  const uniqueId = pathSegments.pop();

  useEffect(() => {
    dispatch(openBackdrop());
    if (uniqueId) {
      getRequirementsData(uniqueId);
    }
  }, []);

  useEffect(() => {
    if (!drawerState?.isOpen && uniqueId) {
      getRequirementsData(uniqueId);
    }
  }, [drawerState.isOpen]);

  useEffect(() => {
    if (
      searchText?.length > 2 ||
      searchText?.length == 0 ||
      status?.length > 0
    ) {
      getRequirementApplicant(uniqueId);
    }
  }, [status, searchText]);

  const getRequirementsData = (uniqueId: any) => {
    getRequirementsListById(uniqueId)
      .then((result: any) => {
        if (result) {
          setRequirementData(result);
          setChecked(result.hot);
          getMatchingVendorsList(result.id);
        }
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1000);
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
      status: status,
      searchText: searchText,
      page: 1,
      pageSize: 10,
    };
    setIsLoader(true);
    getRequirementApplicants(payload)
      .then((result: any) => {
        if (result.count >= 0) {
          setApplicantData(result.list);
        }
        setTimeout(() => {
          setIsLoader(false);
          dispatch(closeBackdrop());
        }, 1000);
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsLoader(false);
          dispatch(closeBackdrop());
        }, 1000);
      });
  };

  const upsertHotRequirement = (event: React.ChangeEvent<HTMLInputElement>) => {
    const payload = {
      requirementUniqueId: uniqueId,
      hot: !event.target.checked ? 0 : 1,
    };
    setChecked(event.target.checked);

    dispatch(openBackdrop());
    upsertRequirementHot(payload)
      .then((result: any) => {
        if (result.success) {
          setUpdateStatus(result);
          setIsSuccessPopup(true);
        }
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 1000);
      })
      .catch((error: any) => {
        setTimeout(() => {
          dispatch(closeBackdrop());
          setIsSuccessPopup(false);
        }, 1000);
      });
  };

  const getMatchingVendorsList = (requirementId: any) => {
    const payload = {
      requirementId: requirementId,
      orgCode: userData.orgCode,
    };
    setIsLoader(true);
    getMatchingVendors(payload)
      .then((result: any) => {
        if (result) {
          setActiveDataList(result);
        }
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      });
  };

  const getCandidates = async () => {
    dispatch(openBackdrop());
    try {
      const data = await matchRequirementToCandidates([requirementData.id]);
      if (data && data[0].status == "Success") {
        setIsSuccessPopup(true);
        setUpdateStatus({ success: true, message: "Matching candidate found" });
        setTimeout(() => {
          dispatch(closeBackdrop());
          getMatchingVendorsList(requirementData.id);
        }, 2000);
      }
    } catch (err) {
      setIsSuccessPopup(false);
      setUpdateStatus({
        success: false,
        message: "Matching candidate not found",
      });
      setTimeout(() => {
        dispatch(closeBackdrop());
      }, 1000);
    }
  };

  return (
    <div className="flex flex-1">
      <div className="w-[70%] p-3 border-e min-h-screen">
        {requirementData && (
          <div>
            {/* Header */}
            <Box className="flex justify-between items-center">
              <div className="flex flex-row gap-3">
                <IconButton
                  color="primary"
                  aria-label="add to shopping cart"
                  className="!w-[50px] !h-[50px]"
                  onClick={() => {
                    navigate("/company/myrequirements");
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Box>
                  <h5 className="text-heading group/item flex items-center">
                    {requirementData?.title}
                    <div className="group/edit invisible group-hover/item:visible">
                      <span className="group-hover/edit:text-gray-700 ">
                        <IconButton
                          aria-label="edit"
                          sx={{ marginLeft: 2 }}
                          onClick={() =>
                            dispatch(
                              openDrawer({
                                drawerName: "CmpUpdateRequirement",
                                data: requirementData,
                              })
                            )
                          }
                        >
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
              <div>
                <Switch
                  checked={checked}
                  onChange={upsertHotRequirement}
                  size="small"
                  inputProps={{ "aria-label": "controlled" }}
                  color="error"
                />
                <span className="text-base">High Priority</span>
              </div>
            </Box>
            <div>
              {/* Description */}
              <div className="mb-4 mt-2 text-gray-600 text-base">
                <HtmlRenderer content={requirementData?.description} />
              </div>

              {/* Responsibilities */}
              <Box className="mb-4">
                <p className="text-title mb-2">Remarks</p>
                <p className="text-gray-600 text-base">
                  {requirementData?.remarks}
                </p>
              </Box>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex mb-3 items-center justify-between">
          <div>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              scrollButtons
            >
              <Tab label="Applicants" />
              <Tab label="Analytics" />
            </Tabs>
          </div>
          <div>
            {activeTab == 0 && (
              <>
                <div className="flex flex-row gap-1 p-1 justify-end overflow-hidden">
                  <div className="flex text-center flex-nowrap my-auto">
                    <div className="flex grow w-[220px] mr-2">
                      <div className="flex-col flex-grow">
                        <TextField
                          size="small"
                          className="w-full"
                          value={searchText}
                          onChange={(event) =>
                            setSearchText(event.target.value)
                          }
                          placeholder="Search"
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon fontSize="inherit" />
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </div>
                    </div>
                    <div className="max-w-full shrink-0">
                      <MenuDrpDwnV2
                        menuList={ApplicantsStatus}
                        placeholder="Status"
                        handleSelectedItem={(selectedItems) =>
                          setStatus(selectedItems)
                        }
                      />
                    </div>
                  </div>
                  <IconButton aria-label="filter">
                    <FilterListOutlinedIcon />
                  </IconButton>
                </div>
              </>
            )}
          </div>
        </div>

        {activeTab == 0 && (
          <>
            <div className="table-body">
              <table>
                <thead>
                  <tr>
                    <th className="add-right-shadow">Candidate Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Application Date</th>
                  </tr>
                </thead>

                <TablePreLoader data={applicantData} isTableLoader={isLoader} />

                <tbody>
                  {applicantData?.length > 0 &&
                    applicantData.map((applicant, index) => (
                      <tr key={index}>
                        <th className="add-right-shadow">
                          <div>
                            {applicant.firstName + " " + applicant.lastName}
                          </div>
                          <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                            <div
                              className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700"
                              onClick={() =>
                                getVendorDetails(applicant.vendorOrgCode)
                              }
                            >
                              <img
                                src={applicant.vendorLogo}
                                style={{ height: 12, width: 12 }}
                                className="me-1"
                              />
                              <Tooltip title={applicant.vendorOrgName} arrow>
                                <span className="text-ellipsis overflow-hidden truncate">
                                  {applicant.vendorOrgName}
                                </span>
                              </Tooltip>
                            </div>
                            <div className="flex text-info items-center">
                              <div
                                className="flex cursor-pointer"
                                onClick={() =>
                                  handleMatchingDialog(applicant.ai || 65)
                                }
                              >
                                <IconAi />
                                <span> {applicant.ai || 65}%</span>
                              </div>
                              <div className="ms-2 text-indigo-500 cursor-pointer hover:text-indigo-700 ">
                                <Download fontSize="inherit" />
                                <span className="text-info">CV</span>
                              </div>
                            </div>
                          </div>
                        </th>
                        <td>{applicant.title}</td>
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
                          {moment(applicant.applicationDate).format(
                            "DD-MM-YYYY"
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <div className="w-[30%] p-3">
        <div className="flex justify-between items-center mb-3">
          <div className="text-title">Empaneled</div>
          <IconButton aria-label="refresh" onClick={getCandidates}>
            <Tooltip title="Refresh matching vendors">
            <RefreshOutlined fontSize="inherit" />
            </Tooltip>
          </IconButton>
        </div>
        {activeDataList.empaneledVendor?.length > 0 && (
          <>
            {activeDataList.empaneledVendor.map((vendor: any) => (
              <div
                className="mb-2 border rounded-md p-2 cursor-pointer hover:border-indigo-700 hover:bg-primary-hover"
                onClick={() => getVendorDetails(vendor.matchingOrgCode)}
              >
                <div className="flex items-center mb-1">
                  <Avatar
                    alt={vendor.orgName}
                    src={vendor?.orgLogo || undefined}
                    className="rounded-full !h-8 !w-8 mr-1"
                  >
                    {!vendor?.orgLogo && (
                      <CorporateFareOutlined fontSize="medium" />
                    )}
                  </Avatar>
                  <div>
                    <Tooltip title={vendor.orgName} arrow>
                      <span className="text-ellipsis overflow-hidden truncate text-base font-bold">
                        {vendor.orgName}
                      </span>
                    </Tooltip>
                    <p className="text-base">{vendor?.city}</p>
                  </div>
                </div>

                <div>
                  <span className="text-base me-4 flex items-center mb-1">
                    <AccountCircleOutlined
                      fontSize="inherit"
                      className="text-indigo-600 mr-1"
                    />
                    Matching Candidate: {vendor?.numberOfCandidates}
                  </span>

                  <div
                    className="text-base flex"
                    // onClick={() => handleMatchingDialog(company.avgScore)}
                  >
                    <IconAi />
                    Avg Score: {vendor?.averageMatchingScore}%
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {activeDataList.publicVendor?.length > 0 && (
          <>
            <div className="text-title mb-3 mt-4">All Vendors</div>
            {activeDataList.publicVendor.map((company: any) => (
              <div
                className="mb-2 border rounded-md p-2 cursor-pointer hover:border-indigo-700 hover:bg-primary-hover"
                onClick={() => getVendorDetails(company.matchingOrgCode)}
              >
                <div className="flex items-center mb-1">
                  <Avatar
                    alt={company.orgName}
                    src={company?.logo || undefined}
                    className="rounded-full !h-8 !w-8 mr-1"
                  >
                    {!company?.logo && (
                      <CorporateFareOutlined fontSize="medium" />
                    )}
                  </Avatar>
                  <div>
                    <Tooltip title={company.orgName} arrow>
                      <span className="text-ellipsis overflow-hidden truncate text-base font-bold">
                        {company.orgName}
                      </span>
                    </Tooltip>
                    <p className="text-base">{company?.city}</p>
                  </div>
                </div>

                <div>
                  <span className="text-base me-4 flex items-center mb-1">
                    <AccountCircleOutlined
                      fontSize="inherit"
                      className="text-indigo-600 mr-1"
                    />
                    Matching Candidate: {company?.numberOfCandidates}
                  </span>

                  <div
                    className="text-base flex"
                    // onClick={() => handleMatchingDialog(company.avgScore)}
                  >
                    <IconAi />
                    Avg Score: {company?.averageMatchingScore || 65}%
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <StatusDialog
        title="Applicant Status"
        statusData={ApplicantsStatus}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedStatus={selectedStatus}
      />
      <MatchingSkillsDialog
        title="Matching Score Analysis"
        isMatchOpen={isMatchOpen}
        setIsMatchOpen={setIsMatchOpen}
        aiScore={matchingScore}
      />

      {isSuccessPopup && (
        <SuccessDialog
          title={updateStatus?.message}
          isOpenModal={isSuccessPopup}
          setIsOpenModal={setIsSuccessPopup}
          type={!updateStatus?.success ? "error" : "success"}
        />
      )}
    </div>
  );
};

export default RequirementDetails;
