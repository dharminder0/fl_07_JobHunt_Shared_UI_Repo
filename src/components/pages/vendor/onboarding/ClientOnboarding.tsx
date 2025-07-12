import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
import Loader from "../../../sharedComponents/Loader";
import NoDataAvailable from "../../../sharedComponents/NoDataAvailable";
import { useLocation, useNavigate } from "react-router";

export default function ClientOnboarding() {
  const navigate = useNavigate();
  const location = useLocation();

  const [invitedList, setInvitedList] = React.useState<any[]>([]);
  const [isLoader, setIsLoader] = React.useState<boolean>(true);
  const [isInviteLoader, setIsInviteLoader] = React.useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);
  const [statusData, setStatusData] = React.useState<any>({ id: 0, status: 1 });
  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  useEffect(() => {
    getOrgInvitedList();
  }, []);

  const getOrgInvitedList = () => {
    const payload = {
      relatedOrgCode: userData?.orgCode,
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
      <div className="mt-4">
        {isLoader ? (
          <Loader />
        ) : invitedList && invitedList?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {invitedList.map((company, idx) => (
                <div key={idx}>
                  <div
                    className="h-100 border p-4 rounded-md cursor-pointer"
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                      e.stopPropagation();
                      handleDetails(company.orgCode);
                    }}
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
                        <Link underline="none" fontSize={12} color="warning">
                          {company.statusName}
                        </Link>
                      )}
                      <div>
                        <Tooltip title="Accept">
                          <IconButton
                            size="small"
                            onClick={(e: any) => {
                              e.stopPropagation();
                              handleConfirmPopup(company?.id, 2);
                            }}
                            className="!me-3"
                          >
                            <Check fontSize="small" color="success" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Declined">
                          <IconButton
                            size="small"
                            onClick={(e: any) => {
                              e.stopPropagation();
                              handleConfirmPopup(company?.id, 3);
                            }}
                          >
                            <CloseOutlined fontSize="small" color="error" />
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
          </>
        ) : (
          <NoDataAvailable />
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
