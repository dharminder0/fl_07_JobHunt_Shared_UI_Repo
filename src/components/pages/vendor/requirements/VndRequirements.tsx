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
  getRequirementsList,
  matchRequirementToCandidates,
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
  openBackdrop,
  openDrawer,
} from "../../../../components/features/drawerSlice";
import IconAi from "../../../../components/sharedComponents/IconAi";

const VndRequirements = ({ benchDrawerData = {} }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const params = location.state || {};
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
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [status, setStatus] = useState<any[]>(
    !paramStatus ? [] : [paramStatus]
  );
  const [client, setClient] = React.useState<any[]>([]);
  const [resource, setResource] = useState<any[]>([]);
  const [requirementData, SetRequirementData] = React.useState<any>([]);
  const [requirementCount, setRequirementCount] = React.useState<any>();

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
          state: { previousUrl: location.pathname },
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

  const handleOpenDrawer = (name: string, data: any) => {
    dispatch(openDrawer({ drawerName: name, data: !data ? {} : data }));
  };

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerObj((prev) => ({ ...prev, isOpen: open }));
  };

  const handleMatchingDialog = (score: number) => {
    setMatchingObj((prev) => ({ ...prev, isOpen: true, score: score }));
  };

  const handleStatusDialog = (status: string) => {
    setIsDialogOpen(true);
    setSelectedStatus(status);
  };

  // const clientList = useClientList(userData?.orgCode);

  const getRequirementsData = () => {
    setIsTableLoader(true);
    const payload = {
      orgCode: userData.orgCode,
      searchText: searchText,
      page: pageIndex,
      pageSize: pageSize,
      locationType: resource,
      status: status,
      // clientCode: client,
      userId: userData.userId,
      roleType: [activeRole === "vendor" && RoleType.Vendor],
      isHotEnable: !params?.isHot ? false : true,
    };

    getRequirementsList(payload)
      .then((result: any) => {
        if (result && result?.totalPages > 0) {
          SetRequirementData(result.list);
          setRequirementCount(result.count);
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

  const isSelected = (id: number) => selectedRows.includes(id);
  const isAllSelected = selectedRows.length === requirementData?.length;

  const toggleRowSelection = (row: any) => {
    setSelectedRows((prevSelectedRows) => {
      const exists = prevSelectedRows.includes(row.id);
      if (exists) {
        // Remove the row id if it's already selected
        return prevSelectedRows.filter((id) => id !== row.id);
      }
      // Add the row id if it's not selected
      return [...prevSelectedRows, row.id];
    });
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === requirementData?.length) {
      setSelectedRows([]); // Deselect all
    } else {
      setSelectedRows(requirementData?.map((row: any) => row.id)); // Store only IDs
    }
  };

  // const handleMatchingCandidate = async () => {
  //   dispatch(openBackdrop());
  //   try {
  //     const data = await matchRequirementToCandidates(selectedRows);
  //     if (data && data.length >= 0) {
  //       setTimeout(() => {
  //         setIsSuccessPopup({
  //           isVisible: true,
  //           type: "success",
  //           message: "Found Matching Candidate",
  //         });
  //         dispatch(closeBackdrop());
  //       }, 1000);
  //     }
  //   } catch (err) {
  //     console.error("Failed to fetch candidates:", err);
  //     setIsSuccessPopup({
  //       isVisible: true,
  //       type: "error",
  //       message: "Error to found matching candidate",
  //     });
  //     setTimeout(() => {
  //       dispatch(closeBackdrop());
  //     }, 1000);
  //   }
  // };

  const handleMatchingCandidate = async () => {
    const payload = {
      resourceId: [],
      requirementId: selectedRows,
    };
    dispatch(openBackdrop());
    upsertMatchingIds(payload)
      .then((result: any) => {
        if (result && result?.length >= 0) {
          setTimeout(() => {
            setIsSuccessPopup({
              isVisible: true,
              type: "success",
              message: "Found Matching Candidate",
            });
            getRequirementsData();
            dispatch(closeBackdrop());
          }, 1000);
        }
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsSuccessPopup({
            isVisible: true,
            type: "error",
            message: "Error to found matching candidate",
          });
          dispatch(closeBackdrop());
        }, 1000);
      });
  };

  const getCandidates = async () => {
    dispatch(openBackdrop());
    try {
      const data = await matchRequirementToCandidates(selectedRows);
      if (data) {
        setTimeout(() => {
          setIsSuccessPopup({
            isVisible: true,
            type: "success",
            message: "Found Matching Candidate",
          });
          getRequirementsData();
          dispatch(closeBackdrop());
        }, 1000);
      }
    } catch (err) {
      setTimeout(() => {
        setIsSuccessPopup({
          isVisible: true,
          type: "error",
          message: "Error to found matching candidate",
        });
        dispatch(closeBackdrop());
      }, 1000);
    }
  };

  return (
    <>
      <div className="px-2 py-3 h-[calc(100%-20px)]">
        <div
          className={`flex flex-row gap-1 mb-1 ${!benchDrawerData?.isOpen ? "justify-between" : "justify-end"}`}
        >
          {!benchDrawerData?.isOpen && (
            <div className="flex items-center">
              <Button
                variant="text"
                disabled={selectedRows?.length <= 0}
                onClick={getCandidates}
              >
                <IconAi />
                Check matching candidate
              </Button>
            </div>
          )}
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
              {/* <div className="max-w-full shrink-0">
                <MenuDrpDwnByValue
                  menuList={clientList}
                  placeholder="Client"
                  handleSelectedItem={(selectedItems) =>
                    setClient(selectedItems)
                  }
                />
              </div> */}
              <div className="max-w-full shrink-0">
                <MenuDrpDwnV2
                  menuList={RequirementStatus}
                  placeholder="Status"
                  handleSelectedItem={(selectedItems) =>
                    setStatus(selectedItems)
                  }
                  selectedId={status[0]}
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
                {!benchDrawerData?.isOpen && (
                  <th className="multi-select">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="cursor-pointer"
                    />
                  </th>
                )}
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
                  <tr key={requirement.uniqueId}>
                    {!benchDrawerData?.isOpen && (
                      <th className="multi-select">
                        <input
                          type="checkbox"
                          checked={isSelected(requirement.id)}
                          onChange={() => toggleRowSelection(requirement)}
                          className="cursor-pointer"
                        />
                      </th>
                    )}
                    <th className="add-right-shadow">
                      <div className="flex items-center justify-between">
                        <div
                          onClick={() => handleRowClick(requirement.uniqueId)}
                          className="cursor-pointer hover:text-indigo-700"
                        >
                          {requirement.title}
                        </div>
                        <div className="flex text-secondary-text text-info">
                          <div className="mx-2">
                            {benchDrawerData?.isOpen && (
                              <div
                                className="flex justify-end cursor-pointer hover:text-indigo-700"
                                onClick={() => handleMatchingDialog(64)}
                              >
                                <IconAi />
                                <span> {requirement?.aiScore || 64}%</span>
                              </div>
                            )}
                          </div>
                          <div
                            className="cursor-pointer hover:text-indigo-700"
                            onClick={() =>
                              handleOpenDrawer("MatchingCandidates", {
                                id: requirement?.id,
                                role: requirement?.title,
                                client: requirement.clientName,
                                clientLogo: requirement.clientFavicon,
                                uniqueId: requirement.uniqueId,
                              })
                            }
                          >
                            {benchDrawerData.isOpen
                              ? "Apply"
                              : `${requirement?.matchingCandidates || 0} Matching Candidates`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                        <div
                          className="flex items-center min-w-[135px] max-w-[150px]"
                          // onClick={() =>
                          //   handleClickToClient(
                          //     requirement.partnerCode,
                          //     "activeView"
                          //   )
                          // }
                        >
                          {requirement?.partnerFavicon && (
                            // <img
                            //   src={requirement.clientFavicon}
                            //   style={{ height: 12, width: 12 }}
                            //   className="me-1"
                            // />
                            <Avatar
                              src={
                                !requirement.partnerFavicon
                                  ? ""
                                  : requirement.partnerFavicon
                              }
                              alt={requirement.partnerName}
                              sx={{ width: 12, height: 12, fontSize: 10 }}
                            />
                          )}
                          {requirement?.partnerName && (
                            <Tooltip title={requirement.partnerName} arrow>
                              <span className="text-ellipsis overflow-hidden truncate ps-1">
                                {requirement.partnerName}
                              </span>
                            </Tooltip>
                          )}
                        </div>
                        <div className="flex w-[128px] justify-end">
                          {requirement?.locationTypeName && (
                            <div className="flex items-center ms-1">
                              <LocationOnOutlined
                                fontSize="inherit"
                                className="mr-1"
                              />
                              <span>
                                {requirement?.locationTypeName || "-"}
                              </span>
                            </div>
                          )}
                          {requirement?.duration && (
                            <div className="flex items-center ms-1">
                              <AccessTimeOutlined
                                fontSize="inherit"
                                className="mr-1"
                              />
                              <span className="truncate w-[70px]">
                                {requirement?.duration || "-"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                    <td>
                      <Typography
                        className={`inline-block cursor-pointer px-3 py-1 !text-base rounded-full ${
                          requirement.statusName === "Open"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                        onClick={() =>
                          handleStatusDialog(requirement.statusName)
                        }
                      >
                        {requirement.statusName || "-"}
                      </Typography>
                    </td>
                    <td>
                      {moment(requirement.createdOn).format("DD-MM-YYYY")}
                    </td>
                    <td
                      className="cursor-pointer hover:text-indigo-700"
                      onClick={() =>
                        handleClickToClient(requirement.clientCode, "openView")
                      }
                    >
                      {requirement.positions} ({requirement?.placed || 0})
                    </td>
                    <td>{requirement?.applicants || "-"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-2 sm:px-4">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-base text-gray-700">
                Showing <span>{(pageIndex - 1) * pageSize + 1}</span> to{" "}
                <span>
                  {Math.min(pageIndex * pageSize, requirementCount || 0)}
                </span>{" "}
                of <span>{requirementCount || 0}</span> results
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
                pageIndex >= Math.ceil((requirementCount || 0) / pageSize)
              }
            >
              <ChevronRight />
            </IconButton>
          </div>
        </div>

        <Drawer
          anchor="right"
          open={drawerObj.isOpen}
          onClose={toggleDrawer(false)}
        >
          <div style={{ width: "calc(100vw - 250px)" }}>
            <VndBench drawerData={drawerObj} />
          </div>
        </Drawer>

        {benchDrawerData?.isOpen && (
          <MatchingSkillsDialog
            title="Matching Score Analysis"
            isMatchOpen={matchingObj.isOpen}
            setIsMatchOpen={(e: any) =>
              setMatchingObj((prev) => ({ ...prev, isOpen: e }))
            }
            aiScore={matchingObj?.score}
          />
        )}

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

export default VndRequirements;
