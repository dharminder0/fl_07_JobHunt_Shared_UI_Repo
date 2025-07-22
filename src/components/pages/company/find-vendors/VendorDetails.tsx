import React, { useEffect } from "react";
import {
  Grid,
  Box,
  Tabs,
  Tab,
  Link,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  AccessTimeOutlined,
  AccountCircleOutlined,
  CorporateFareOutlined,
  HandshakeOutlined,
  Language,
  LocationOn,
  LocationOnOutlined,
  MailOutline,
  Phone,
  WorkHistory,
} from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import {
  dispatchedInvitation,
  getBenchList,
  getOrgProfileDetails,
  getVendorContractData,
} from "../../../../components/sharedService/apiService";
import Loader from "../../../sharedComponents/Loader";
import HtmlRenderer from "../../../../components/sharedComponents/HtmlRenderer";
import {
  InvitedType,
  LocationType,
} from "../../../../components/sharedService/enums";
import SuccessDialog from "../../../sharedComponents/SuccessDialog";
import TablePreLoader from "../../../../components/sharedComponents/TablePreLoader";
import moment from "moment";
import Pagination from "../../../../components/sharedComponents/Pagination";

const VendorDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");
  const pathSegments = location.pathname.split("/");
  const activeRole = localStorage.getItem("activeRole") || "";

  const [previousUrl, setpreviousUrl] = React.useState("");
  const [isLoader, setIsLoader] = React.useState<boolean>(false);
  const [isInviteLoader, setIsInviteLoader] = React.useState<boolean>(false);
  const [isSuccessPopup, setIsSuccessPopup] = React.useState<boolean>(false);
  const handleRowClick = (id: any) => {};
  const [open, setOpen] = React.useState(false);
  const [orgData, setOrgData] = React.useState<any>([]);
  const [empMessage, setEmpMessage] = React.useState<any>("");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [tabValue, setTabValue] = React.useState("benchView");
  const [isTableLoader, setIsTableLoader] = React.useState(true);
  const [contractData, setContractData] = React.useState<any>([]);
  const [benchList, setBenchList] = React.useState<any>([]);
  const [pageIndex, setPageIndex] = React.useState<any>(1);
  const [pageSize, setPageSize] = React.useState<any>(10);
  const [totalCount, setTotalCount] = React.useState<any>(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getOrgProfile();
  }, [pathSegments[pathSegments.length - 1]]);

  useEffect(() => {
    if (location.state && location.state.previousUrl) {
      setpreviousUrl(location.state.previousUrl);
    }
    if (type) {
      !type ? setTabValue("benchView") : setTabValue(type);
    }
  }, [type, location.state]);

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
          fetchBenchList(result.content.orgCode);
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

  const userData = JSON.parse(localStorage.userData);
  const handleInvitation = () => {
    const payload: any = {
      partnerCode: userData.orgCode,
      vendorCode: orgData.orgCode,
      statusId: 1,
      createdBy: userData.userId,
      message: empMessage,
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    navigate(`?type=${newValue}`);
  };

  useEffect(() => {
    if (tabValue !== "benchView") {
      getContractData();
    } else if (orgData.orgCode) {
      fetchBenchList(orgData.orgCode);
    }
  }, [tabValue, totalCount, pageIndex]);

  const fetchBenchList = (orgCode: any) => {
    const payload = {
      searchText: "",
      orgCode: orgCode,
      page: pageIndex,
      availability: [],
      pageSize: pageSize,
      topSkillId: 0,
    };
    setIsTableLoader(true);
    getBenchList(payload)
      .then((result: any) => {
        setTotalCount(result.count);
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
      pageNumber: pageIndex,
      pageSize: pageSize,
      isActiveContracts: tabValue === "activeView" ? true : false,
      isPastContracts: tabValue === "pastView" ? true : false,
      isOpenPosition: tabValue === "openView" ? true : false,
      partnerCode:
        activeRole === "vendor"
          ? pathSegments[pathSegments.length - 1]
          : userData.orgCode,
      vendorCode:
        activeRole !== "vendor"
          ? pathSegments[pathSegments.length - 1]
          : userData.orgCode,
    };
    setIsTableLoader(true);
    getVendorContractData(payload)
      .then((result: any) => {
        setTotalCount(result.content.totalRecords);
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

  return (
    <>
      <div className="min-h-screen p-6">
        {!isLoader ? (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <IconButton
                  color="primary"
                  aria-label="add to shopping cart"
                  className="!w-[50px] !h-[50px]"
                  onClick={() => {
                    navigate(-1);
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
                    {!orgData?.logo && (
                      <CorporateFareOutlined fontSize="medium" />
                    )}
                  </Avatar>
                </div>
                <div>
                  <p className="text-heading">{orgData?.orgName}</p>
                </div>
              </div>
            </div>

            <Grid container spacing={6}>
              {/* Company Profile */}
              <Grid item xs={12} md={9}>
                <div className="mt-2 text-base text-gray-700">
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
                      <>
                        <div className="table-body mt-4">
                          <table>
                            <thead>
                              <tr>
                                <th className="add-right-shadow">Title</th>
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
                                  <th className="add-right-shadow">
                                    {item.requirementTitle}
                                    <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                                      <div className="flex ">
                                        {item?.locationType && (
                                          <div className="flex items-center me-1">
                                            <LocationOnOutlined
                                              fontSize="inherit"
                                              className="mr-1"
                                            />
                                            <span>
                                              {Object.keys(LocationType).find(
                                                (k) =>
                                                  LocationType[k] ==
                                                  item.locationType
                                              )}
                                            </span>
                                          </div>
                                        )}
                                        {item?.contractPeriod && (
                                          <div className="flex items-center">
                                            <AccessTimeOutlined
                                              fontSize="inherit"
                                              className="mr-1"
                                            />
                                            <span className="truncate w-[100px]">
                                              {item?.contractPeriod || "-"}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </th>
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

                        {contractData?.length > 0 && totalCount > 10 && (
                          <Pagination
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                            pageSize={pageSize}
                            totalCount={totalCount}
                          />
                        )}
                      </>
                    )}
                    {tabValue === "pastView" && (
                      <>
                        <div className="table-body mt-4">
                          <table>
                            <thead>
                              <tr>
                                <th className="add-right-shadow">Title</th>
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
                                      <div className="flex ">
                                        {item?.locationType && (
                                          <div className="flex items-center me-1">
                                            <LocationOnOutlined
                                              fontSize="inherit"
                                              className="mr-1"
                                            />
                                            <span>
                                              {Object.keys(LocationType).find(
                                                (k) =>
                                                  LocationType[k] ==
                                                  item.locationType
                                              )}
                                            </span>
                                          </div>
                                        )}
                                        {item?.contractPeriod && (
                                          <div className="flex items-center">
                                            <AccessTimeOutlined
                                              fontSize="inherit"
                                              className="mr-1"
                                            />
                                            <span className="truncate w-[100px]">
                                              {item?.contractPeriod || "-"}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </th>
                                  <td>
                                    {moment(item.requirmentPostedDate).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </td>
                                  <td>
                                    {moment(item.endDate).format("DD-MM-YYYY")}
                                  </td>
                                  <td>{item.resourceName}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {contractData?.length > 0 && totalCount > 10 && (
                          <Pagination
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                            pageSize={pageSize}
                            totalCount={totalCount}
                          />
                        )}
                      </>
                    )}
                    {tabValue === "openView" && (
                      <>
                        <div className="table-body mt-4">
                          <table>
                            <thead>
                              <tr>
                                <th className="add-right-shadow">Role</th>
                                <th>Date Posted</th>
                                <th>No. of Positions</th>
                              </tr>
                            </thead>

                            <TablePreLoader
                              isTableLoader={isTableLoader}
                              data={contractData}
                            />

                            <tbody>
                              {contractData.map((job: any, index: number) => (
                                <tr
                                  key={index}
                                  onClick={() => handleRowClick(job?.id)}
                                >
                                  <th className="add-right-shadow">
                                    <div className="cursor-pointer hover:text-indigo-700">
                                      {job.requirementTitle}
                                    </div>
                                    <div className="flex items-center text-secondary-text text-info mt-1">
                                      <div className="flex ">
                                        {job?.locationType && (
                                          <div className="flex items-center me-1">
                                            <LocationOnOutlined
                                              fontSize="inherit"
                                              className="mr-1"
                                            />
                                            <span>
                                              {Object.keys(LocationType).find(
                                                (k) =>
                                                  LocationType[k] ==
                                                  job.locationType
                                              )}
                                            </span>
                                          </div>
                                        )}
                                        {job?.contractPeriod && (
                                          <div className="flex items-center">
                                            <AccessTimeOutlined
                                              fontSize="inherit"
                                              className="mr-1"
                                            />
                                            <span className="truncate w-[100px]">
                                              {job?.contractPeriod || "-"}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </th>
                                  <td>
                                    {moment(job.requirmentPostedDate).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </td>
                                  <td>{job.numberOfPosition}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {contractData?.length > 0 && totalCount > 10 && (
                          <Pagination
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                            pageSize={pageSize}
                            totalCount={totalCount}
                          />
                        )}
                      </>
                    )}
                    {tabValue === "benchView" && (
                      <>
                        <div className="table-body mt-4">
                          <table>
                            <thead>
                              <tr>
                                <th className="add-right-shadow">
                                  Resource name
                                </th>
                                <th>Skill Set</th>
                                <th>Availability</th>
                              </tr>
                            </thead>

                            <TablePreLoader
                              isTableLoader={isTableLoader}
                              data={benchList}
                            />

                            <tbody>
                              {benchList.map((item: any, index: number) => (
                                <tr
                                  key={index}
                                  onClick={() => handleRowClick(item.id)}
                                >
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
                                  <td>{item.availabilityName}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {benchList?.length > 0 && totalCount > 10 && (
                          <Pagination
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                            pageSize={pageSize}
                            totalCount={totalCount}
                          />
                        )}
                      </>
                    )}
                  </Box>
                </div>
              </Grid>

              {/* Tech Stack and Office Location */}
              <Grid item xs={12} md={3}>
                <div className="mb-2 space-y-4">
                  {orgData.status === 0 ||
                  orgData.status == InvitedType.Declined ? (
                    <Button
                      onClick={handleClickOpen}
                      variant="outlined"
                      startIcon={<HandshakeOutlined fontSize="inherit" />}
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
                        <p className="text-heading">
                          Invite Vendors for Empanelment
                        </p>
                        <p className="text-base">
                          Click the 'Invite' button to send a notification to
                          vendors. Interested vendors will follow the
                          instructions to complete the process. You can track
                          their progress and manage empaneled vendors from the
                          'Manage Vendors' section.
                        </p>
                        <p className="text-base">
                          Write a Personalized Message
                        </p>
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
                      <Button
                        autoFocus
                        onClick={handleClose}
                        variant="outlined"
                      >
                        Close
                      </Button>
                      <Button
                        variant="contained"
                        disabled={!empMessage.trim()}
                        onClick={handleInvitation}
                        loading={isInviteLoader}
                      >
                        Invite
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <div className="mt-4">
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

                {orgData?.officeLocation &&
                  orgData?.officeLocation?.length > 0 && (
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
              </Grid>
            </Grid>
          </>
        ) : (
          <Loader />
        )}
      </div>
      {isSuccessPopup && (
        <SuccessDialog
          title="Invited successfully for Empanelment"
          isOpenModal={isSuccessPopup}
          setIsOpenModal={setIsSuccessPopup}
        />
      )}
    </>
  );
};

export default VendorDetails;
