import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Avatar,
  useTheme,
  DialogContent,
  Button,
  DialogActions,
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
  Language,
  LocationOn,
  LocationOnOutlined,
  MailOutline,
  Phone,
  WorkHistory,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  getBenchList,
  getOrgProfileDetails,
  getVendorContractData,
  inviteStatusChange,
} from "../../../../components/sharedService/apiService";
import HtmlRenderer from "../../../../components/sharedComponents/HtmlRenderer";
import {
  InvitedType,
  LocationType,
} from "../../../../components/sharedService/enums";
import TablePreLoader from "../../../../components/sharedComponents/TablePreLoader";
import SuccessDialog from "../../../../components/sharedComponents/SuccessDialog";
import moment from "moment";
import Pagination from "../../../../components/sharedComponents/Pagination";

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
  const [pageIndex, setPageIndex] = useState<any>(1);
  const [pageSize, setPageSize] = useState<any>(10);
  const [totalCount, setTotalCount] = useState<any>(0);

  const handleRowClick = (id: any) => {};

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
    setPageIndex(1);
    navigate(`?type=${newValue}`);
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
            // navigate("/vendor/onboarding");
            getOrgProfile();
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

  const handleConfirmPopup = (id: number, status: number) => {
    setIsPopupOpen(true);
    setStatusData({ id: id, status: status });
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

  useEffect(() => {
    if (tabValue !== "benchView") {
      getContractData();
    } else if (orgData.orgCode) {
      fetchBenchList(orgData.orgCode);
    }
  }, [tabValue, pageIndex, totalCount]);

  const handleBack = () => {
    if (previousUrl) {
      navigate(previousUrl);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="h-full p-6">
      {/* Header Section */}
      <div className="mb-6 ">
        <div className="flex items-center gap-4 mb-4">
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            className="!w-[50px] !h-[50px]"
            onClick={handleBack}
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
                                            LocationType[k] == item.locationType
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
                                            LocationType[k] == item.locationType
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
                            <td>{moment(item.endDate).format("DD-MM-YYYY")}</td>
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
                                            LocationType[k] == job.locationType
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
                          <th className="add-right-shadow">Resource name</th>
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
            {(orgData.status == 1 || orgData.status == InvitedType.Pending) && (
              <div>
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
              <li className="truncate text-ellipsis mb-1">
                <Tooltip title={orgData?.email} arrow>
                  <span className="text-indigo-600 cursor-pointer hover:text-indigo-700">
                    <MailOutline fontSize="small" />
                    <a href={`mailto:${orgData?.email}`}> {orgData?.email}</a>
                  </span>
                </Tooltip>
              </li>
              <li className="truncate text-ellipsis mb-1">
                <Tooltip title={orgData?.phone} arrow>
                  <span className="text-indigo-600 cursor-pointer hover:text-indigo-700">
                    <Phone fontSize="small" />
                    <a href={`tel:${orgData?.phone}`}> {orgData?.phone}</a>
                  </span>
                </Tooltip>
              </li>
              <li className="truncate text-ellipsis mb-1">
                <Tooltip title={orgData?.website} arrow>
                  <span className="text-indigo-600 cursor-pointer hover:text-indigo-700">
                    <Language fontSize="small" />
                    <a href={orgData?.website} target="_blank">
                      {" "}
                      {orgData?.website}
                    </a>
                  </span>
                </Tooltip>
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
