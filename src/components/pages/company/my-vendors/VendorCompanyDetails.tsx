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

  const activeContracts = [
    {
      id: 1,
      title: "Social Media Assistant",
      startDate: "20-04-2024",
      endDate: "12-08-2024",
      client: "Airtel",
      resource: "Raj Kumar",
      logo: "https://assets.airtel.in/static-assets/new-home/img/favicon-16x16.png",
    },
    {
      id: 2,
      title: "Android Developer",
      startDate: "18-03-2024",
      endDate: "16-09-2024",
      client: "IBM",
      resource: "Sajid Sarkar",
      logo: "https://www.ibm.com/content/dam/adobe-cms/default-images/favicon.svg",
    },
    {
      id: 3,
      title: "Angular Developer",
      startDate: "02-01-2024",
      endDate: "06-10-2024",
      client: "SDET Tech",
      resource: "Amit Thakur",
      logo: "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
    },
    {
      id: 4,
      title: "iOS Developer",
      startDate: "26-04-2024",
      endDate: "18-11-2024",
      client: "DevStringx",
      resource: "Harshit Pandey",
      logo: "https://www.devstringx.com/wp-content/uploads/2018/03/favicon.ico",
    },
    {
      id: 1,
      title: "QA Automation",
      startDate: "13-05-2024",
      endDate: "10-12-2024",
      client: "JigNect Technologies",
      resource: "Vinod Agarwal",
      logo: "https://jignect.tech/wp-content/uploads/2023/01/cropped-JT-Main-ONLY-LOGO-01-192x192.png",
    },
  ];

  const jobData = [
    {
      id: 1,
      role: "Social Media Assistant",
      status: "Open",
      datePosted: "20-05-2020",
      applicants: "19",
      client: "OpsTree Solutions",
      requirementType: "Remote",
      noOfPositions: 3,
      contractPeriod: "6 months",
      visibility: "Global",
      logo: "https://opstree.com/wp-content/uploads/2024/10/FavIcon-OpsTree-100x100.png",
    },
    {
      id: 2,
      role: "Senior Designer",
      status: "On hold",
      datePosted: "16-05-2020",
      applicants: "1,234",
      client: "Creative Solutions Ltd.",
      requirementType: "Hybrid",
      noOfPositions: 5,
      contractPeriod: "12 months",
      visibility: "Empaneled",
      logo: "https://cdn.creative-sols.com/assets/img/favicon-32x32.png",
    },
    {
      id: 3,
      role: "Visual Designer",
      status: "Open",
      datePosted: "15-05-2020",
      applicants: "2,435",
      client: "Design Pros Inc.",
      requirementType: "Onsite",
      noOfPositions: 2,
      contractPeriod: "3 months",
      visibility: "Limited",
      logo: "https://www.prototypehouse.com/favicon.ico",
    },
    {
      id: 4,
      role: "Data Science",
      status: "Closed",
      datePosted: "13-05-2020",
      applicants: "6,234",
      client: "OpsTree Solutions",
      requirementType: "Remote",
      noOfPositions: 10,
      contractPeriod: "9 months",
      visibility: "Global",
      logo: "https://opstree.com/wp-content/uploads/2024/10/FavIcon-OpsTree-100x100.png",
    },
    {
      id: 5,
      role: "Kotlin Developer",
      status: "Closed",
      datePosted: "12-05-2020",
      applicants: "12",
      client: "Tech Innovators LLC",
      requirementType: "Hybrid",
      noOfPositions: 20,
      contractPeriod: "18 months",
      visibility: "Empaneled",
      logo: "https://techinnovators.dev/icon_dark.ico",
    },
  ];

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
          setTabValue(
            result.content.status === InvitedType.Accepted
              ? "activeView"
              : "benchView"
          );
          if (result.content.status !== InvitedType.Accepted) {
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
    const payload: any = {
      partnerCode: userData.orgCode,
      vendorCode: orgData.orgCode,
      statusId: 1,
      createdBy: userData.userId,
    };
    setIsInviteLoader(true);
    dispatchedInvitation(payload)
      .then((result: any) => {
        if (result?.success) {
          setIsSuccessPopup(true);
          setTimeout(() => {
            getOrgProfile();
            setIsInviteLoader(false);
            handleClose();
          }, 1000);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          setIsInviteLoader(false);
        }, 1000);
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

  const getContractData = () => {
    const payload = {
      pageNumber: 1,
      pageSize: 10,
      isActiveContracts: tabValue === "activeView" ? true : false,
      isPastContracts: tabValue === "pastView" ? true : false,
      isOpenPosition: tabValue === "openView" ? true : false,
      partnerCode: userData.orgCode,
      vendorCode: orgData.orgCode,
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
    getContractData();
  }, [tabValue]);

  return (
    <div className="min-h-screen p-6">
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
                <Tab value="benchView" label="Bench Strength" />
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
                            {item.title}
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
                          <td>{item.requirmentPostedDate}</td>
                          <td>{item?.endDate || "-"}</td>
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
            {orgData.status === 0 || orgData.status == InvitedType.Declined ? (
              <Button
                onClick={handleClickOpen}
                variant="outlined"
                startIcon={<HandshakeOutlined />}
              >
                Invite for Empanelment
              </Button>
            ) : (
              <p
                className={`line-clamp-1 text-base ${
                  orgData?.status === 2
                    ? "text-green-600"
                    : orgData?.status === 3
                      ? "text-red-500"
                      : orgData?.status === 0 || orgData?.status === 1
                        ? "text-orange-500"
                        : ""
                }`}
              >
                {orgData?.statusName}
              </p>
            )}

            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogContent>
                <div className="space-y-4">
                  <p className="text-heading">Invite Vendors for Empanelment</p>
                  <p className="text-base">
                    Click the 'Invite' button to send a notification to vendors.
                    Interested vendors will follow the instructions to complete
                    the process. You can track their progress and manage
                    empaneled vendors from the 'Manage Vendors' section.
                  </p>
                  <p className="text-base">Write a Personalized Message</p>
                </div>
                <form className="mt-2 space-y-4">
                  <TextField
                    label="Message"
                    value={empMessage}
                    onChange={(e) => setEmpMessage(e.target.value)}
                    fullWidth
                    variant="outlined"
                    multiline
                    required
                    rows={3}
                  />
                </form>
              </DialogContent>
              <DialogActions sx={{ paddingBottom: 2, paddingRight: 3 }}>
                <Button autoFocus onClick={handleClose} variant="outlined">
                  Close
                </Button>
                <Button
                  variant="contained"
                  disabled={!empMessage}
                  onClick={handleInvitation}
                  loading={isInviteLoader}
                >
                  Invite
                </Button>
              </DialogActions>
            </Dialog>
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
    </div>
  );
};

export default VendorCompanyDetails;
