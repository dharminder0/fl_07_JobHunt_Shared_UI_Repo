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
  ChevronLeft,
  ChevronRight,
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
import { useNavigate } from "react-router";

export default function VendorOnboarding() {
  const navigate = useNavigate();

  const [invitedList, setInvitedList] = React.useState<any[]>([]);
  const [searchText, setSearchText] = React.useState("");
  const [isLoader, setIsLoader] = React.useState<boolean>(true);
  const [isInviteLoader, setIsInviteLoader] = React.useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);
  const [statusData, setStatusData] = React.useState<any>({ id: 0, status: 1 });
  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [records, setRecords] = React.useState<any>({});
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  useEffect(() => {
    getOrgInvitedList();
  }, [pageIndex]);

  const getOrgInvitedList = () => {
    const payload = {
      orgCode: userData?.orgCode,
      relationshipType: [RoleType.Vendor],
      status: InvitedType.Pending,
      page: pageIndex,
      pageSize: pageSize,
    };

    setIsLoader(true);
    getOnboardInvitedList(payload)
      .then((result: any) => {
        setRecords(result);
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

  const handleCardClick = (orgCode: string) => {
    navigate(`${orgCode}`);
  };

  return (
    <div className="px-4 py-1">
      <div className="mt-4">
        {isLoader ? (
          // <PageLoader />
          <Loader />
        ) : invitedList && invitedList?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {invitedList.map((company, idx) => (
                <div key={idx}>
                  <div
                    className="h-100 border p-4 rounded-md cursor-pointer"
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                      handleCardClick(company?.relatedOrgCode);
                      e.stopPropagation();
                    }}
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
            <div className="flex items-center justify-between border-gray-200 bg-white p-2 sm:px-4">
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-base text-gray-700">
                    Showing <span>{(pageIndex - 1) * pageSize + 1}</span> to{" "}
                    <span>
                      {Math.min(pageIndex * pageSize, records?.count || 0)}
                    </span>{" "}
                    of <span>{records?.count || 0}</span> results
                  </p>
                </div>
              </div>
              <div className="flex flex-1 justify-end">
                <IconButton
                  size="small"
                  onClick={() => setPageIndex(pageIndex - 1)}
                  disabled={pageIndex <= 1}
                >
                  <ChevronLeft />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setPageIndex(pageIndex + 1)}
                  disabled={
                    pageIndex >= Math.ceil((records?.count || 0) / pageSize)
                  }
                >
                  <ChevronRight />
                </IconButton>
              </div>
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
