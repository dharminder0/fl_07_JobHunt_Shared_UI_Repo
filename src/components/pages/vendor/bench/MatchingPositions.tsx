import { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
  Drawer,
  Button,
  Avatar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AccessTimeOutlined,
  AccountCircleOutlined,
  ChevronLeft,
  ChevronRight,
  LocationOn,
  LocationOnOutlined,
  WorkHistory,
} from "@mui/icons-material";
import MatchingSkillsDialog from "../../../sharedComponents/MatchingSkillsDialog";
import SuccessDialog from "../../../sharedComponents/SuccessDialog";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SearchIcon from "@mui/icons-material/Search";
import VndBench from "../bench/VndBench";
import StatusDialog from "../../../sharedComponents/StatusDialog";
import React from "react";
import {
  getMatchingPositions,
  getRequirementsList,
  matchRequirementToCandidates,
  upsertApplications,
  upsertMatchingIds,
} from "../../../../components/sharedService/apiService";
import {
  LocationTypeStatus,
  RequirementStatus,
} from "../../../../components/sharedService/shareData";
import TablePreLoader from "../../../../components/sharedComponents/TablePreLoader";
import { RoleType } from "../../../../components/sharedService/enums";
import MenuDrpDwnV2 from "../../../../components/sharedComponents/MenuDrpDwnV2";
import moment from "moment";
import { useClientList } from "../../../../components/hooks/useClientList";
import MenuDrpDwnByValue from "../../../../components/sharedComponents/MenuDrpDwnByValue";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../components/redux/store";
import {
  closeBackdrop,
  closeDrawer,
  openBackdrop,
} from "../../../../components/features/drawerSlice";
import { useSafeNavigate } from "../../../../components/hooks/useSafeNavigate";
import { useSafeLocation } from "../../../../components/hooks/useSafeLocation";
import IconAi from "../../../../components/sharedComponents/IconAi";

const MatchingPositions = ({ benchDrawerData = {} }: any) => {
  const navigate = useSafeNavigate();
  const location = useSafeLocation();
  const dispatch: AppDispatch = useDispatch();
  const params = location?.state || {};
  const paramStatus = !params?.status
    ? benchDrawerData?.status
    : params?.status;

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const activeRole = localStorage.getItem("activeRole") || "";
  const [drawerObj, setDrawerObj] = useState({ data: {}, isOpen: false });
  const [matchingObj, setMatchingObj] = useState({ isOpen: false, score: 0 });
  const [isSuccessPopup, setIsSuccessPopup] = useState<any>({
    isVisible: false,
    type: "success",
    message: "",
  });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState("Open");
  const [isTableLoader, setIsTableLoader] = React.useState(true);
  const [searchText, setSearchText] = React.useState("");
  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(15);
  const [status, setStatus] = useState<any[]>(
    !paramStatus ? [] : [paramStatus]
  );
  const [client, setClient] = React.useState<any[]>([]);
  const [resource, setResource] = useState<any[]>([]);
  const [requirementData, SetRequirementData] = React.useState<any>([]);

  const handleRowClick = (id: number) => {
    if (!benchDrawerData.isOpen) {
      navigate(`${id}`);
    } else {
      window.open(
        window.location.origin + `/vendor/requirements/${id}`,
        "_blank"
      );
    }
  };

  const handleClickToClient = (id: number, tab: string) => {
    if (!benchDrawerData.isOpen) {
      if (tab) {
        navigate(`/vendor/clients/${id}?type=${tab}`, {
          state: { previousUrl: location?.pathname },
        });
      }
    }
  };

  const handleDrawer = (data: object, isOpen: boolean) => {
    if (benchDrawerData.isOpen) {
      // setIsSuccessPopup(true);
      setIsSuccessPopup({
        isVisible: true,
        type: "success",
        message: "Application has been submitted successfully",
      });
    } else {
      setDrawerObj((prev) => ({ ...prev, data: data, isOpen: isOpen }));
    }
  };

  const handleApply = (uniqueId: any) => {
    const payload = {
      resourceId: [benchDrawerData.id],
      requirementUniqueId: uniqueId,
      status: 1,
      userId: userData.userId,
    };
    dispatch(openBackdrop());
    upsertApplications(payload)
      .then((result: any) => {
        if (result.success) {
          setTimeout(() => {
            dispatch(closeBackdrop());
            setIsSuccessPopup({
              isVisible: true,
              type: "success",
              message: "Application has been submitted successfully",
            });
          }, 1000);
          setTimeout(() => {
            dispatch(closeDrawer());
          }, 3000);
        }
      })
      .catch((error: any) => {
        setTimeout(() => {
          dispatch(closeBackdrop());
        }, 500);
      });
  };

  const handleMatchingDialog = (score: number) => {
    setMatchingObj((prev) => ({ ...prev, isOpen: true, score: score }));
  };

  const handleStatusDialog = (status: string) => {
    setIsDialogOpen(true);
    setSelectedStatus(status);
  };

  const clientList = useClientList(userData?.orgCode);

  const getRequirementsData = () => {
    setIsTableLoader(true);
    const payload = {
      resourcesId: benchDrawerData?.id,
      orgCode: userData.orgCode,
    };

    getMatchingPositions(payload)
      .then((result: any) => {
        if (result && result?.length > 0) {
          SetRequirementData(result[0].Records);
        } else {
          SetRequirementData([]);
        }
        setTimeout(() => {
          setIsTableLoader(false);
        }, 1000);
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsTableLoader(false);
        }, 1000);
      });
  };

  useEffect(() => {
    if (searchText?.length > 3 || searchText?.length == 0) {
      getRequirementsData();
    }
  }, [searchText, resource, status, client, pageIndex]);

  return (
    <>
      <div className="px-2 py-3 h-[calc(100%-20px)]">
        <div className="flex content-header border-b flex justify-between items-center pb-2">
          <div className="px-8 flex">
            <svg
              className="absolute cursor-pointer left-[8px] top-[14px]"
              onClick={() => dispatch(closeDrawer())}
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20 20L4 4.00003M20 4L4.00002 20"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <h2 className="text-heading">Matching Positions</h2>
          </div>
        </div>

        <div className="flex flex-row gap-1 mb-1 justify-between items-center">
          <div>
            <p>{benchDrawerData?.resource}</p>
          </div>
          <div className="flex flex-row gap-1 p-1 overflow-hidden">
            <div className="flex text-center flex-nowrap my-auto">
              <div className="flex grow w-[220px] mr-2">
                <div className="flex-col flex-grow">
                  <TextField
                    size="small"
                    className="w-full"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
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
                <MenuDrpDwnByValue
                  menuList={clientList}
                  placeholder="Client"
                  handleSelectedItem={(selectedItems) =>
                    setClient(selectedItems)
                  }
                />
              </div>
              <div className="max-w-full shrink-0">
                <MenuDrpDwnV2
                  menuList={RequirementStatus}
                  placeholder="Status"
                  handleSelectedItem={(selectedItems) =>
                    setStatus(selectedItems)
                  }
                />
              </div>
              <div className="max-w-full shrink-0">
                <MenuDrpDwnV2
                  menuList={LocationTypeStatus}
                  placeholder="Resources"
                  handleSelectedItem={(selectedItems) =>
                    setResource(selectedItems)
                  }
                />
              </div>
            </div>
            <IconButton aria-label="filter">
              <FilterListOutlinedIcon />
            </IconButton>
          </div>
        </div>
        <div className="table-body">
          <table>
            <thead>
              <tr>
                <th className="add-right-shadow">Role</th>
                <th>Status</th>
                <th>Date Posted</th>
                <th>Positions (Placed)</th>
                <th>Applicants</th>
              </tr>
            </thead>

            <TablePreLoader
              isTableLoader={isTableLoader}
              data={requirementData}
            />

            <tbody>
              {!isTableLoader &&
                requirementData?.length > 0 &&
                requirementData.map((requirement: any) => (
                  <tr key={requirement.UniqueId}>
                    <th className="add-right-shadow">
                      <div className="flex items-center justify-between">
                        <div
                          onClick={() => handleRowClick(requirement.UniqueId)}
                          className="cursor-pointer hover:text-indigo-700"
                        >
                          {requirement.Title}
                        </div>
                        <div className="flex text-secondary-text text-info">
                          <div className="mx-2">
                            <div
                              className="flex justify-end cursor-pointer hover:text-indigo-700"
                              onClick={() =>
                                handleMatchingDialog(requirement?.MatchingScore)
                              }
                            >
                              <IconAi />
                              <span> {requirement?.MatchingScore || 0}%</span>
                            </div>
                          </div>
                          <div
                            className="cursor-pointer hover:text-indigo-700"
                            onClick={() => handleApply(requirement.UniqueId)}
                          >
                            Apply
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                        <div
                          className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700"
                          onClick={() =>
                            handleClickToClient(
                              requirement.clientCode,
                              "activeView"
                            )
                          }
                        >
                          {requirement?.clientLogo && (
                            <Avatar
                              src={
                                !requirement.clientLogo
                                  ? ""
                                  : requirement.clientLogo
                              }
                              alt={requirement.clientName}
                              sx={{ width: 12, height: 12, fontSize: 10 }}
                            />
                          )}
                          {requirement?.clientName && (
                            <Tooltip title={requirement.clientName} arrow>
                              <span className="text-ellipsis overflow-hidden truncate ps-1">
                                {requirement.clientName}
                              </span>
                            </Tooltip>
                          )}
                        </div>
                        <div className="flex w-[128px] justify-end">
                          {requirement?.Location && (
                            <div className="flex items-center ms-1">
                              <LocationOnOutlined
                                fontSize="inherit"
                                className="mr-1"
                              />
                              <span>{requirement?.Location || "-"}</span>
                            </div>
                          )}
                          {requirement?.Duration && (
                            <div className="flex items-center ms-1">
                              <AccessTimeOutlined
                                fontSize="inherit"
                                className="mr-1"
                              />
                              <span className="truncate w-[70px]">
                                {requirement?.Duration || "-"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                    <td>
                      <Typography
                        className={`inline-block cursor-pointer px-3 py-1 !text-base rounded-full ${
                          requirement.StatusName === "Open"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                        onClick={() =>
                          handleStatusDialog(requirement.StatusName)
                        }
                      >
                        {requirement.StatusName || "-"}
                      </Typography>
                    </td>
                    <td>
                      {moment(requirement.UpdatedOn).format("DD-MM-YYYY")}
                    </td>
                    <td
                      className="cursor-pointer hover:text-indigo-700"
                      onClick={() =>
                        handleClickToClient(requirement.clientCode, "openView")
                      }
                    >
                      {requirement.Positions} ({requirement?.placed || 0})
                    </td>
                    <td>{requirement?.applicants || "-"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* <div className="flex items-center justify-between border-t border-gray-200 bg-white px-2 sm:px-4">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-base text-gray-700">
                Showing <span>{(pageIndex - 1) * pageSize + 1}</span> to{" "}
                <span>
                  {Math.min(pageIndex * pageSize, requirementData?.count || 0)}
                </span>{" "}
                of <span>{requirementData?.count || 0}</span> results
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
                pageIndex >= Math.ceil((requirementData?.count || 0) / pageSize)
              }
            >
              <ChevronRight />
            </IconButton>
          </div>
        </div> */}

        <MatchingSkillsDialog
          title="Matching Score Analysis"
          isMatchOpen={matchingObj.isOpen}
          setIsMatchOpen={(e: any) =>
            setMatchingObj((prev) => ({ ...prev, isOpen: e }))
          }
          aiScore={matchingObj?.score}
        />

        {isSuccessPopup && (
          <SuccessDialog
            title={isSuccessPopup?.message}
            isOpenModal={isSuccessPopup?.isVisible}
            setIsOpenModal={(value: any) => {
              setIsSuccessPopup({
                isVisible: value,
                type: "",
                message: "",
              });
            }}
            type={isSuccessPopup?.type}
          />
        )}
      </div>

      <StatusDialog
        title="Requirement Status"
        statusData={RequirementStatus}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedStatus={selectedStatus}
        isVendor={true}
      />
    </>
  );
};

export default MatchingPositions;
