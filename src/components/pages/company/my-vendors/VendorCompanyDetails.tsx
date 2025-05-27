import React, { useEffect } from "react";
import {
  Grid,
  Box,
  Tabs,
  Tab,
  Chip,
  Link,
  IconButton,
  Tooltip,
  Avatar,
  useMediaQuery,
  useTheme,
  DialogContent,
  Button,
  DialogActions,
  TextField,
  Dialog,
} from "@mui/material";
import {
  AccessTimeOutlined,
  AccountCircleOutlined,
  CancelOutlined,
  Check,
  CheckCircleOutlineOutlined,
  CloseOutlined,
  CorporateFareOutlined,
  Handshake,
  HandshakeOutlined,
  Language,
  LocationOn,
  LocationOnOutlined,
  MailOutline,
  Phone,
  PictureAsPdf,
  Share,
  WorkHistory,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  dispatchedInvitation,
  getBenchList,
  getOrgProfileDetails,
  getVendorContractData,
  inviteStatusChange,
} from "../../../../components/sharedService/apiService";
import HtmlRenderer from "../../../../components/sharedComponents/HtmlRenderer";
import {
  InvitedType,
  RoleType,
} from "../../../../components/sharedService/enums";
import TablePreLoader from "../../../../components/sharedComponents/TablePreLoader";
import SuccessDialog from "../../../../components/sharedComponents/SuccessDialog";
import moment from "moment";

const VendorCompanyDetails = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const pathSegments = location.pathname.split("/");
  const searchParams = new URLSearchParams(location.search);
  const userData = JSON.parse(localStorage.userData);

  const type = searchParams.get("type");
  const activeRole = localStorage.getItem("activeRole") || "";
  const [tabValue, setTabValue] = React.useState("benchView");
  const [orgData, setOrgData] = React.useState<any>([]);
  const [benchList, setBenchList] = React.useState<any>([]);
  const [contractData, setContractData] = React.useState<any>([]);
  const [isLoader, setIsLoader] = React.useState<boolean>(false);
  const [previousUrl, setpreviousUrl] = React.useState("");
  const [isInviteLoader, setIsInviteLoader] = React.useState<boolean>(false);
  const [isSuccessPopup, setIsSuccessPopup] = React.useState<boolean>(false);
  const [isTableLoader, setIsTableLoader] = React.useState(true);
  const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);
  const [statusData, setStatusData] = React.useState<any>({ id: 0, status: 1 });
  const handleRowClick = (id: any) => {};

  const [open, setOpen] = React.useState(false);
  const [empMessage, setEmpMessage] = React.useState<any>("");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (location.state && location.state.previousUrl) {
      setpreviousUrl(location.state.previousUrl);
    }
    if (type) {
      !type ? setTabValue("activeView") : setTabValue(type);
    }
  }, [type, location.state]);

  useEffect(() => {
    getOrgProfile();
  }, [pathSegments[pathSegments.length - 1]]);

  const getOrgProfile = () => {
    setIsLoader(true);
    const payload = {
      orgCode: pathSegments[pathSegments.length - 1],
      relatedOrgCode: userData.orgCode,
    };
    getOrgProfileDetails(payload)
      .then((result: any) => {
        if (result.success) {
          setOrgData(result.content);
          if (result.content.status !== InvitedType.Accepted) {
            setTabValue("benchView");
            fetchBenchList(result.content.orgCode);
          }
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    navigate(`?type=${newValue}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInvitation = () => {
    setIsInviteLoader(true);
    const payload = {
      partnerVendorRelId: statusData.id,
      statusId: statusData.status,
      updatedBy: userData.userId,
    };
    inviteStatusChange(payload)
      .then((result: any) => {
        if (result) {
          setTimeout(() => {
            setIsInviteLoader(false);
            setIsPopupOpen(false);
            navigate("/vendor/onboarding");
          }, 500);
        }
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsInviteLoader(false);
          setIsPopupOpen(false);
        }, 500);
      });
  };

  const fetchBenchList = (orgCode: any) => {
    const payload = {
      searchText: "",
      orgCode: orgCode,
      page: 1,
      availability: [],
      pageSize: 20,
    };
    setIsTableLoader(true);
    getBenchList(payload)
      .then((result: any) => {
        if (result?.list && result?.list.length >= 0) {
          setBenchList(result.list);
          setTimeout(() => {
            setIsTableLoader(false);
          }, 1000);
        }
      })
      .catch((error) => {
        setBenchList([]);
        setTimeout(() => {
          setIsTableLoader(false);
        }, 1000);
      });
  };

  const handleConfirmPopup = (id: number, status: number) => {
    setIsPopupOpen(true);
    setStatusData({ id: id, status: status });
  };

  const getContractData = () => {
    const payload = {
      pageNumber: 1,
      pageSize: 10,
      isActiveContracts: tabValue === "activeView" ? true : false,
      isPastContracts: tabValue === "pastView" ? true : false,
      isOpenPosition: tabValue === "openView" ? true : false,
      partnerCode: activeRole === "vendor" ? orgData.orgCode : userData.orgCode,
      vendorCode: activeRole !== "vendor" ? orgData.orgCode : userData.orgCode,
    };
    setIsTableLoader(true);
    getVendorContractData(payload)
      .then((result: any) => {
        if (result && result.success && result.content.totalRecords > 0) {
          setContractData(result.content.records);
          setTimeout(() => {
            setIsTableLoader(false);
          }, 500);
        } else {
          setContractData([]);
          setTimeout(() => {
            setIsTableLoader(false);
          }, 500);
        }
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsTableLoader(false);
        }, 500);
      });
  };

  useEffect(() => {
    if (tabValue !== "benchView") {
      getContractData();
    } else if (orgData.orgCode) {
      fetchBenchList(orgData.orgCode);
    }
  }, [tabValue]);

  return (
    <div className="h-full p-6">
      {/* Header Section */}
      <div className="mb-6 ">
        <div className="flex items-center gap-4 mb-4">
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            className="!w-[50px] !h-[50px]"
            onClick={() => {
              navigate(previousUrl);
            }}
            size="small"
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <div>
            <Avatar
              alt="Org Icon"
              src={orgData?.logo || undefined}
              className="rounded-full !h-12 !w-12"
            >
              {!orgData?.logo && <CorporateFareOutlined fontSize="medium" />}
            </Avatar>
          </div>
          <div>
            <p className="text-heading">{orgData?.orgName}</p>
            {/* <div className="mt-1">
              <Chip
                label="Web Development"
                variant="outlined"
                sx={{ fontSize: 12 }}
                className="my-1 me-1 !text-info"
                size="small"
              />
            </div> */}
          </div>
        </div>
      </div>

      {/* Company Profile and Tech Stack */}
      <Grid container spacing={6}>
        {/* Company Profile */}
        <Grid item xs={12} md={9}>
          <div className="mt-2 text-gray-700 text-base">
            <HtmlRenderer content={orgData?.description} />
          </div>
          <div className="my-2">
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={tabValue}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
              >
                {orgData.status === InvitedType.Accepted && (
                  <Tab value="activeView" label="Active Contracts" />
                )}
                {orgData.status === InvitedType.Accepted && (
                  <Tab value="pastView" label="Past Contracts" />
                )}
                {orgData.status === InvitedType.Accepted && (
                  <Tab value="openView" label="Open Positions" />
                )}
                {activeRole !== "vendor" && (
                  <Tab value="benchView" label="Bench Strength" />
                )}
              </Tabs>
              {tabValue === "activeView" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Title</th>
                        {/* <th>Client</th> */}
                        <th>Start Date</th>
                        <th>Resource</th>
                      </tr>
                    </thead>

                    <TablePreLoader
                      isTableLoader={isTableLoader}
                      data={contractData}
                    />

                    <tbody>
                      {contractData.map((item: any, index: number) => (
                        <tr
                          key={index}
                          onClick={() => handleRowClick(item?.id)}
                        >
                          {/* <th className="add-right-shadow">{item.title}</th> */}
                          <th className="add-right-shadow">
                            {item.requirementTitle}
                            <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                              <div className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700">
                                <img
                                  src={item?.clientLogoUrl}
                                  style={{ height: 12, width: 12 }}
                                  className="me-1"
                                />
                                <Tooltip title={item?.client} arrow>
                                  <span className="text-ellipsis overflow-hidden truncate">
                                    {item?.client || "Self"}
                                  </span>
                                </Tooltip>
                              </div>
                            </div>
                          </th>
                          {/* <td className="wide-200">
                            <div className="flex">
                              <img
                                src={item.logo}
                                style={{ height: 16, width: 16 }}
                                className="me-1"
                              />
                              {item.client}
                            </div>
                          </td> */}
                          <td>
                            {moment(item.requirmentPostedDate).format(
                              "DD-MM-YYYY"
                            )}
                          </td>
                          <td>{item.resourceName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {tabValue === "pastView" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Title</th>
                        {/* <th>Client</th> */}
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Resource</th>
                      </tr>
                    </thead>

                    <TablePreLoader
                      isTableLoader={isTableLoader}
                      data={contractData}
                    />

                    <tbody>
                      {contractData.map((item: any, index: number) => (
                        <tr
                          key={index}
                          onClick={() => handleRowClick(item?.id)}
                        >
                          <th className="add-right-shadow">
                            {item.requirementTitle}
                            <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                              <div className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700">
                                <img
                                  src={item?.clientLogoUrl}
                                  style={{ height: 12, width: 12 }}
                                  className="me-1"
                                />
                                <Tooltip title={item?.client} arrow>
                                  <span className="text-ellipsis overflow-hidden truncate">
                                    {item?.client || "Self"}
                                  </span>
                                </Tooltip>
                              </div>
                            </div>
                          </th>
                          {/* <td className="wide-200">
                            <div className="flex items-center">
                              <img
                                src={item.logo}
                                style={{ height: 16, width: 16 }}
                                className="me-1"
                              />
                              {item.client}
                            </div>
                          </td> */}
                          <td>
                            {moment(item.requirmentPostedDate).format(
                              "DD-MM-YYYY"
                            )}
                          </td>
                          <td>{moment(item.endDate).format("DD-MM-YYYY")}</td>
                          <td>{item.resourceName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {tabValue === "openView" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Role</th>
                        {/* <th>Client</th> */}
                        <th>Date Posted</th>
                        {/* <th>Requirement Type</th> */}
                        <th>No. of Positions</th>
                        {/* <th>Contract period</th> */}
                      </tr>
                    </thead>

                    <TablePreLoader
                      isTableLoader={isTableLoader}
                      data={contractData}
                    />

                    <tbody>
                      {contractData.map((job: any, index: number) => (
                        <tr key={index} onClick={() => handleRowClick(job?.id)}>
                          {/* <th className="add-right-shadow">{job.role}</th> */}
                          <th className="add-right-shadow">
                            <div className="cursor-pointer hover:text-indigo-700">
                              {job.requirementTitle}
                            </div>
                            <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                              <div className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700">
                                <img
                                  src={job?.clientLogoUrl}
                                  style={{ height: 12, width: 12 }}
                                  className="me-1"
                                />
                                <Tooltip title={job?.client} arrow>
                                  <span className="text-ellipsis overflow-hidden truncate">
                                    {job?.client || "Self"}
                                  </span>
                                </Tooltip>
                              </div>
                              <div className="flex w-[128px] justify-end">
                                {job?.Location && (
                                  <div className="flex items-center ms-1">
                                    <LocationOnOutlined
                                      fontSize="inherit"
                                      className="mr-1"
                                    />
                                    <span>{job?.Location || "-"}</span>
                                  </div>
                                )}
                                {job?.contractPeriod && (
                                  <div className="flex items-center ms-1">
                                    <AccessTimeOutlined
                                      fontSize="inherit"
                                      className="mr-1"
                                    />
                                    <span className="truncate w-[70px]">
                                      {job?.contractPeriod || "-"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </th>
                          {/* <td className="wide-200">
                            <div className="flex">
                              <img
                                src={job.logo}
                                style={{ height: 16, width: 16 }}
                                className="me-1"
                              />
                              {job.client}
                            </div>
                          </td> */}
                          <td>
                            {moment(job.requirmentPostedDate).format(
                              "DD-MM-YYYY"
                            )}
                          </td>
                          {/* <td>
                            <Typography
                              className={`px-3 py-1 rounded-full !text-base text-center ${
                                job.requirementType === "Onsite"
                                  ? "text-blue-700 border border-blue-700"
                                  : "text-yellow-700 border border-yellow-700"
                              }`}
                            >
                              {job.requirementType}
                            </Typography>
                          </td> */}
                          <td>{job.numberOfPosition}</td>
                          {/* <td>{job.contractPeriod}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {tabValue === "benchView" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Resource name</th>
                        <th>Skill Set</th>
                        {/* <th>Experience</th> */}
                        {/* <th>Location</th> */}
                        <th>Availability</th>
                      </tr>
                    </thead>

                    <TablePreLoader
                      isTableLoader={isTableLoader}
                      data={benchList}
                    />

                    <tbody>
                      {benchList.map((item: any, index: number) => (
                        <tr key={index} onClick={() => handleRowClick(item.id)}>
                          <th className="add-right-shadow">
                            <div className="flex items-center">
                              {!item.avtar ? (
                                <AccountCircleOutlined
                                  fontSize="medium"
                                  className="text-secondary-text"
                                />
                              ) : (
                                <img
                                  src={item.avtar}
                                  alt={item?.firstName}
                                  style={{ height: 24, width: 24 }}
                                  className="rounded-full"
                                />
                              )}
                              <div className="ms-2 w-[100%]">
                                <div className="flex items-center justify-between text-base">
                                  <div
                                    // onClick={() =>
                                    //   handleOpenDrawer("benchPreview", item.cv)
                                    // }
                                    className="cursor-pointer hover:text-indigo-700"
                                  >
                                    {item?.firstName}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-secondary-text text-info">
                                  <div className="flex">
                                    {item?.cv?.profile?.experience && (
                                      <p>
                                        <WorkHistory fontSize="inherit" />{" "}
                                        {item?.cv?.profile?.experience}
                                      </p>
                                    )}
                                    {item?.location && (
                                      <p className="ms-1">
                                        <LocationOn fontSize="inherit" />{" "}
                                        {item.location}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </th>
                          <td className="truncate">
                            {item.cv.top_skills?.length > 0 &&
                              item.cv.top_skills.map((skill: any) => (
                                <span>{skill}, </span>
                              ))}
                          </td>
                          {/* <td>{item.experience}</td> */}
                          {/* <td>{item.location}</td> */}
                          <td>{item.availabilityName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Box>
          </div>
        </Grid>

        {/* Tech Stack and Office Location */}
        <Grid item xs={12} md={3}>
          <div className="mb-2 space-y-4">
            {(orgData.status == 1 || orgData.status == InvitedType.Pending) && (
              <div>
                {/* <Button
                  size="small"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleConfirmPopup(orgData?.id, 2);
                  }}
                  variant="outlined"
                  endIcon={<Check fontSize="small" color="success" />}
                  className="!me-3"
                >
                  Accept
                </Button>

                <Button
                  size="small"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleConfirmPopup(orgData?.id, 3);
                  }}
                  variant="outlined"
                  endIcon={<CloseOutlined fontSize="small" color="error" />}
                >
                  Declined
                </Button> */}
                <Button
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleConfirmPopup(orgData?.id, 2);
                  }}
                  color="success"
                  endIcon={<Check fontSize="small" color="success" />}
                  className="!me-3"
                >
                  Accept
                </Button>
                <Button
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleConfirmPopup(orgData?.id, 3);
                  }}
                  color="error"
                  endIcon={<CloseOutlined fontSize="small" color="error" />}
                >
                  Declined
                </Button>
              </div>
            )}
            {orgData.status == InvitedType.Accepted && (
              <p className="text-green-600 text-base">{orgData.statusName}</p>
            )}
          </div>
          <div>
            <h5 className="text-heading mb-2">Contact Information</h5>

            <ul className="text-gray-700 text-base">
              <li>
                <Link href={`mailto:${orgData?.email}`} underline="none">
                  <MailOutline fontSize="small" /> {orgData?.email}
                </Link>
              </li>
              <li>
                <Link href={`tel:${orgData?.phone}`} underline="none">
                  <Phone fontSize="small" /> {orgData?.phone}
                </Link>
              </li>
              <li>
                <Link href={orgData?.website} underline="none">
                  <Language fontSize="small" /> {orgData?.website}
                </Link>
              </li>
            </ul>
          </div>

          {orgData?.officeLocation && orgData?.officeLocation?.length > 0 && (
            <div className="mt-4">
              <h5 className="text-heading mb-2">Office Location</h5>
              <ul className="text-gray-700 text-base">
                {orgData?.officeLocation?.map((item: any) => (
                  <li key={item.city}>
                    <LocationOnOutlined fontSize="small" /> {item.city},{" "}
                    {item.stateName}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* 
          <div className="mt-4">
            <h5 className="text-heading mb-2">Resource Offering</h5>

            <Chip
              label="Remote"
              variant="outlined"
              sx={{ fontSize: 12 }}
              className="my-1 me-1"
            />

            <Chip
              label="Onsite"
              variant="outlined"
              sx={{ fontSize: 12 }}
              className="my-1 me-1"
            />

            <Chip
              label="Hybrid"
              variant="outlined"
              sx={{ fontSize: 12 }}
              className="my-1 me-1"
            />
          </div> */}
          {/* <div className="mt-4">
            <h5 className="text-heading mb-2">Company Deck</h5>
            <PictureAsPdf fontSize="large" />
          </div> */}
        </Grid>
      </Grid>
      {isSuccessPopup && (
        <SuccessDialog
          title="Invited successfully for Empanelment"
          isOpenModal={isSuccessPopup}
          setIsOpenModal={setIsSuccessPopup}
        />
      )}

      {isPopupOpen && (
        <React.Fragment>
          <Dialog
            // fullScreen={fullScreen}
            open={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogContent>
              <div className="flex justify-center mb-4">
                {statusData?.status === 2 && (
                  <CheckCircleOutlineOutlined
                    fontSize="large"
                    color="success"
                  />
                )}
                {statusData?.status === 3 && (
                  <CancelOutlined fontSize="large" color="error" />
                )}
              </div>
              <p className="text-base">
                Are you sure to want to{" "}
                {statusData?.status === 2 ? "accept" : "reject"} this
                invitation?
              </p>
            </DialogContent>
            <DialogActions className="!mb-2 !me-2">
              <Button
                autoFocus
                onClick={() => setIsPopupOpen(false)}
                variant="outlined"
                size="small"
              >
                Close
              </Button>
              <Button
                onClick={handleInvitation}
                autoFocus
                variant="contained"
                size="small"
                loading={isInviteLoader}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
    </div>
  );
};

export default VendorCompanyDetails;
