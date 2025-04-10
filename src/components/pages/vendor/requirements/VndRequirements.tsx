import { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
  Drawer,
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
import { getRequirementsList } from "../../../../components/sharedService/apiService";
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

const VndRequirements = ({ benchDrawerData = {} }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.state || {};
  const paramStatus = !params?.status
    ? benchDrawerData?.status
    : params?.status;

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const activeRole = localStorage.getItem("activeRole") || "";
  const [drawerObj, setDrawerObj] = useState({ data: {}, isOpen: false });
  const [matchingObj, setMatchingObj] = useState({ isOpen: false, score: 0 });
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);
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
          state: { previousUrl: location.pathname },
        });
      }
    }
  };

  const handleDrawer = (data: object, isOpen: boolean) => {
    if (benchDrawerData.isOpen) {
      setIsSuccessPopup(true);
    } else {
      setDrawerObj((prev) => ({ ...prev, data: data, isOpen: isOpen }));
    }
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

  const clientList = useClientList(userData?.orgCode);

  const getRequirementsData = () => {
    setIsTableLoader(true);
    const payload = {
      orgCode: userData.orgCode,
      searchText: searchText,
      page: pageIndex,
      pageSize: pageSize,
      locationType: resource,
      status: status,
      clientCode: client,
      userId: userData.userId,
      roleType: [activeRole === "vendor" && RoleType.Vendor],
    };

    getRequirementsList(payload)
      .then((result: any) => {
        if (result && result?.totalPages > 0) {
          SetRequirementData(result);
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
        <div className="flex flex-row gap-1 justify-end mb-1">
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
              data={requirementData.list}
            />

            <tbody>
              {!isTableLoader &&
                requirementData.list?.length > 0 &&
                requirementData.list.map((requirement: any) => (
                  <tr key={requirement.uniqueId}>
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
                                <svg
                                  width="14px"
                                  height="14px"
                                  viewBox="0 0 512 512"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g
                                    id="Page-1"
                                    stroke="none"
                                    stroke-width="1"
                                    fill="none"
                                    fill-rule="evenodd"
                                  >
                                    <g
                                      id="icon"
                                      fill="#4640DE"
                                      transform="translate(64.000000, 64.000000)"
                                    >
                                      <path
                                        d="M320,64 L320,320 L64,320 L64,64 L320,64 Z M171.749388,128 L146.817842,128 L99.4840387,256 L121.976629,256 L130.913039,230.977 L187.575039,230.977 L196.319607,256 L220.167172,256 L171.749388,128 Z M260.093778,128 L237.691519,128 L237.691519,256 L260.093778,256 L260.093778,128 Z M159.094727,149.47526 L181.409039,213.333 L137.135039,213.333 L159.094727,149.47526 Z M341.333333,256 L384,256 L384,298.666667 L341.333333,298.666667 L341.333333,256 Z M85.3333333,341.333333 L128,341.333333 L128,384 L85.3333333,384 L85.3333333,341.333333 Z M170.666667,341.333333 L213.333333,341.333333 L213.333333,384 L170.666667,384 L170.666667,341.333333 Z M85.3333333,0 L128,0 L128,42.6666667 L85.3333333,42.6666667 L85.3333333,0 Z M256,341.333333 L298.666667,341.333333 L298.666667,384 L256,384 L256,341.333333 Z M170.666667,0 L213.333333,0 L213.333333,42.6666667 L170.666667,42.6666667 L170.666667,0 Z M256,0 L298.666667,0 L298.666667,42.6666667 L256,42.6666667 L256,0 Z M341.333333,170.666667 L384,170.666667 L384,213.333333 L341.333333,213.333333 L341.333333,170.666667 Z M0,256 L42.6666667,256 L42.6666667,298.666667 L0,298.666667 L0,256 Z M341.333333,85.3333333 L384,85.3333333 L384,128 L341.333333,128 L341.333333,85.3333333 Z M0,170.666667 L42.6666667,170.666667 L42.6666667,213.333333 L0,213.333333 L0,170.666667 Z M0,85.3333333 L42.6666667,85.3333333 L42.6666667,128 L0,128 L0,85.3333333 Z"
                                        id="Combined-Shape"
                                      ></path>
                                    </g>
                                  </g>
                                </svg>
                                <span> {requirement?.aiScore || 64}%</span>
                              </div>
                            )}
                          </div>
                          <div
                            className="cursor-pointer hover:text-indigo-700"
                            onClick={() =>
                              handleDrawer(
                                {
                                  role: requirement.title,
                                  client: requirement.clientName,
                                  clientLogo: requirement.clientLogo,
                                  uniqueId: requirement.uniqueId,
                                },
                                true
                              )
                            }
                          >
                            {benchDrawerData.isOpen
                              ? "Apply"
                              : `${requirement?.matchingCandidate || 3} Matching Candidates`}
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
                            <img
                              src={requirement.clientLogo}
                              style={{ height: 12, width: 12 }}
                              className="me-1"
                            />
                          )}
                          {requirement?.clientName && (
                            <Tooltip title={requirement.clientName} arrow>
                              <span className="text-ellipsis overflow-hidden truncate">
                                {requirement.clientName}
                              </span>
                            </Tooltip>
                          )}
                        </div>
                        <div className="flex w-[128px]">
                          {requirement?.locationTypeName && (
                            <div className="flex items-center ms-1">
                              <LocationOnOutlined
                                fontSize="inherit"
                                className="mr-1"
                              />
                              <span>{requirement.locationTypeName}</span>
                            </div>
                          )}
                          {requirement?.duration && (
                            <div className="flex items-center ms-1">
                              <AccessTimeOutlined
                                fontSize="inherit"
                                className="mr-1"
                              />
                              <span>{requirement.duration}</span>
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
                        handleClickToClient(requirement.id, "openView")
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
            title="Application has been submitted successfully"
            isOpenModal={isSuccessPopup}
            setIsOpenModal={setIsSuccessPopup}
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
