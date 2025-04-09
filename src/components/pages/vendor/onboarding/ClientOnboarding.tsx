import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
import { Chip } from "@mui/material";
import HtmlRenderer from "../../../../components/sharedComponents/HtmlRenderer";
import {
  Cancel,
  CancelOutlined,
  Check,
  CheckCircleOutlineOutlined,
  CloseOutlined,
  CorporateFareOutlined,
} from "@mui/icons-material";
import {
  InvitedType,
  RoleType,
} from "../../../../components/sharedService/enums";
import {
  getOnboardInvitedList,
  inviteStatusChange,
} from "../../../../components/sharedService/apiService";
import PageLoader from "../../../../components/sharedComponents/PageLoader";
import Loader from "../../../sharedComponents/Loader";
import NoDataAvailable from "../../../sharedComponents/NoDataAvailable";
import { useLocation, useNavigate } from "react-router";

export default function ClientOnboarding() {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = React.useState("Invited");
  const [invitedList, setInvitedList] = React.useState<any[]>([]);
  const [searchText, setSearchText] = React.useState("");
  const [isLoader, setIsLoader] = React.useState<boolean>(true);
  const [isInviteLoader, setIsInviteLoader] = React.useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);
  const [statusData, setStatusData] = React.useState<any>({ id: 0, status: 1 });
  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    getOrgInvitedList();
  }, [value]);

  const getOrgInvitedList = () => {
    const payload = {
      ...(value === "Invited" && { orgCode: userData?.orgCode }),
      ...(value === "Requested" && { relatedOrgCode: userData?.orgCode }),
      relationshipType: [RoleType.Vendor],
      status: InvitedType.Pending,
      page: pageIndex,
      pageSize: pageSize,
    };

    setIsLoader(true);
    getOnboardInvitedList(payload)
      .then((result: any) => {
        if (result.count > 0) {
          setInvitedList(result.list);
        } else {
          setInvitedList([]);
        }
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      });
  };

  const handleConfirmPopup = (id: number, status: number) => {
    setIsPopupOpen(true);
    setStatusData({ id: id, status: status });
  };

  const handleInvitation = () => {
    setIsInviteLoader(true);
    inviteStatusChange(statusData.id, statusData.status)
      .then((result: any) => {
        if (result) {
          setTimeout(() => {
            setIsInviteLoader(false);
            setIsPopupOpen(false);
            getOrgInvitedList();
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

  const handleDetails = (id: number) => {
    navigate(`${id}?type=activeView`, {
      state: { previousUrl: location.pathname },
    });
  };

  return (
    <div className="px-4 py-1">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="Invited" label="Invited for Empanelment" />
        <Tab value="Requested" label="Requested for Empanelment" />
      </Tabs>

      <div className="mt-4">
        {isLoader ? (
          // <PageLoader />
          <Loader />
        ) : (
          <>
            {value == "Invited" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {invitedList &&
                    invitedList?.length > 0 &&
                    invitedList.map((company, idx) => (
                      <div>
                        <div
                          className="h-100 border p-4 rounded-md cursor-pointer"
                          onClick={() => handleDetails(company.orgCode)}
                        >
                          <div className="flex align-center mb-4">
                            <Avatar
                              alt="Org Icon"
                              src={company.logo || undefined}
                              className="rounded-full !h-10 !w-10 me-3"
                            >
                              {!company.logo && (
                                <CorporateFareOutlined fontSize="small" />
                              )}
                            </Avatar>
                            <div>
                              <Tooltip title={company.orgName} arrow>
                                <p className="text-title line-clamp-1 font-bold">
                                  {company.orgName}
                                </p>
                              </Tooltip>
                              <p className="line-clamp-1 text-base">
                                {company?.location[0] || "-"}
                              </p>{" "}
                              {company.statusName && (
                                <Link href="#" underline="none" fontSize={12}>
                                  {company.statusName}
                                </Link>
                              )}
                            </div>
                          </div>
                          <p className="text-base line-clamp-2">
                            <HtmlRenderer content={company?.description} />
                          </p>
                          <div className="flex flex-wrap mt-2">
                            <Chip
                              label={company?.empCount}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: 10 }}
                              className="my-1 me-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {invitedList && invitedList?.length <= 0 && <NoDataAvailable />}
              </>
            )}

            {value == "Requested" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {invitedList &&
                    invitedList?.length > 0 &&
                    invitedList.map((company, idx) => (
                      <div>
                        <div
                          className="h-100 border p-4 rounded-md cursor-pointer"
                          onClick={() => handleDetails(company.orgCode)}
                        >
                          <div className="flex align-center">
                            <Avatar
                              alt="Org Icon"
                              src={company.logo || undefined}
                              className="rounded-full !h-10 !w-10 me-3"
                            >
                              {!company.logo && (
                                <CorporateFareOutlined fontSize="small" />
                              )}
                            </Avatar>
                            <div>
                              <Tooltip title={company.orgName} arrow>
                                <p className="text-title line-clamp-1 font-bold">
                                  {company.orgName}
                                </p>
                              </Tooltip>
                              <p className="line-clamp-1 text-base">
                                {company?.location[0] || "-"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between w-full my-1">
                            {company.statusName && (
                              <Link
                                href="#"
                                underline="none"
                                fontSize={12}
                                color="warning"
                              >
                                {company.statusName}
                              </Link>
                            )}
                            <div>
                              <Tooltip title="Accept">
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleConfirmPopup(company?.id, 2)
                                  }
                                >
                                  <Check fontSize="small" color="success" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Declined">
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleConfirmPopup(company?.id, 3)
                                  }
                                >
                                  <CloseOutlined
                                    fontSize="small"
                                    color="error"
                                  />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </div>
                          <p className="text-base line-clamp-2">
                            <HtmlRenderer content={company?.description} />
                          </p>
                          <div className="flex flex-wrap mt-2">
                            <Chip
                              label={company?.empCount}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: 10 }}
                              className="my-1 me-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {invitedList && invitedList?.length <= 0 && <NoDataAvailable />}
              </>
            )}
          </>
        )}

        {isPopupOpen && (
          <React.Fragment>
            <Dialog
              // fullScreen={fullScreen}
              open={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              aria-labelledby="responsive-dialog-title"
            >
              {/* <DialogTitle id="responsive-dialog-title">
                {"Use Google's location service?"}
              </DialogTitle> */}
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
              <DialogActions>
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
                  {statusData?.status === 2 && "Accept"}
                  {statusData?.status === 3 && "Declined"}
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
