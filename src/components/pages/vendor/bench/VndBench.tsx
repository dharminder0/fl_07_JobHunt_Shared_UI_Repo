import {
  AccountCircleOutlined,
  ChevronLeft,
  ChevronRight,
  LocationOn,
  QuestionMarkOutlined,
  WorkHistory,
} from "@mui/icons-material";
import {
  TextField,
  InputAdornment,
  IconButton,
  Drawer,
  Button,
  Tabs,
  Tab,
  DialogActions,
  DialogContent,
  Dialog,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MatchingSkillsDialog from "../../../sharedComponents/MatchingSkillsDialog";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import BenchPreview from "./BenchPreview";
import SuccessDialog from "../../../sharedComponents/SuccessDialog";
import {
  benchAvailabiltyUpdate,
  getBenchList,
  getTechStackList,
  matchCandidateToRequirements,
  upsertApplications,
} from "../../../../components/sharedService/apiService";
import { AvailabilityStatus } from "../../../../components/sharedService/shareData";
import MenuDrpDwnV2 from "../../../../components/sharedComponents/MenuDrpDwnV2";
import TablePreLoader from "../../../../components/sharedComponents/TablePreLoader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../components/redux/store";
import {
  closeBackdrop,
  openBackdrop,
  openDrawer,
} from "../../../../components/features/drawerSlice";
import MatchingPositions from "./MatchingPositions";
import IconAi from "../../../../components/sharedComponents/IconAi";
import { AvailabilityEnums } from "../../../../components/sharedService/enums";
import AvailabilityDialog from "../../../../components/sharedComponents/AvailabilityDialog";

export default function VndBench({ drawerData = {} }: any) {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const dispatch: AppDispatch = useDispatch();
  const drawerState = useSelector((state: any) => state.drawer);

  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<any>({ type: "", message: "" });
  const [isTableLoader, setIsTableLoader] = React.useState(true);
  const [isUpdateLoader, setIsUpdateLoader] = React.useState(false);
  const [matchingScore, setMatchingScore] = React.useState(0);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(15);
  const [searchText, SetSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("benchTab");
  const [benchDatadetails, setbenchDatadetails] = useState<any[]>([]);
  const [records, setRecords] = React.useState<any>({});
  const [availability, setAvailability] = useState<any[]>([]);
  const [techStack, setTechStack] = useState<any[]>([]);
  const [drawerObj, setDrawerObj] = useState({
    type: "bench",
    isOpen: false,
    data: {},
    status: "Open",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState({
    availabilityId: 1,
    benchId: 0,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (
      (searchText?.length > 2 || searchText?.length === 0) &&
      activeTab === "benchTab"
    ) {
      fetchBenchList();
    }

    if (activeTab === "techStack") {
      getTechStacks();
    }
  }, [searchText, availability, activeTab, pageIndex]);

  useEffect(() => {
    if (!drawerState.isOpen) {
      fetchBenchList();
    }
  }, [drawerState]);

  const fetchBenchList = () => {
    const payload = {
      searchText: searchText.trim(),
      orgCode: userData.orgCode,
      page: pageIndex,
      availability: availability,
      pageSize: pageSize,
      topSkillId: drawerData?.data?.id ?? 0,
    };
    setIsTableLoader(true);
    getBenchList(payload)
      .then((result: any) => {
        setRecords(result);
        if (result?.list && result?.list.length >= 0) {
          setbenchDatadetails(result.list);
          setTimeout(() => {
            setIsTableLoader(false);
          }, 1000);
        }
      })
      .catch((error) => {
        setbenchDatadetails([]);
        setTimeout(() => {
          setIsTableLoader(false);
        }, 1000);
      });
  };

  const getTechStacks = () => {
    setIsTableLoader(true);
    const payload = {
      orgCode: userData.orgCode,
      searchText: searchText.trim(),
      pageSize: pageSize,
      page: pageIndex,
    };
    getTechStackList(payload).then((result: any) => {
      setRecords(result);
      if (result && result?.data.length >= 0) {
        setTechStack(result.data);
      }
      setTimeout(() => {
        setIsTableLoader(false);
      }, 1000);
    });
  };

  const handleMatchingDialog = (score: number) => {
    setIsMatchOpen(true);
    setMatchingScore(score);
  };

  const handleDrawer = (useFor: string, isOpen: boolean, obj: any) => {
    if (drawerData?.isOpen) {
      window.open(
        window.location.origin + `/vendor/bench/${obj?.id}`,
        "_blank"
      );
    } else {
      setDrawerObj((prev) => ({
        ...prev,
        type: useFor,
        isOpen: isOpen,
        data: obj,
      }));
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
    if (selectedRows.length === benchDatadetails.length) {
      setSelectedRows([]); // Deselect all
    } else {
      setSelectedRows(benchDatadetails.map((row) => row.id)); // Store only IDs
    }
  };

  const isSelected = (id: number) => selectedRows.includes(id);
  const isAllSelected = selectedRows.length === benchDatadetails.length;

  const handleApply = () => {
    const payload = {
      resourceId: selectedRows,
      requirementUniqueId: drawerData.data.uniqueId,
      status: 1,
      userId: userData.userId,
    };
    upsertApplications(payload).then((result: any) => {
      if (result.success) {
        setShowPopup({
          type: "success",
          message: "Application has been submitted successfully",
        });
        setTimeout(() => {
          setIsSuccessPopup(true);
          setSelectedRows([]);
          setDrawerObj((prev: any) => ({ ...prev, isOpen: false }));
        }, 500);
      }
    });
  };

  const handleOpenDrawer = (name: string, obj?: any) => {
    if (drawerData?.isOpen) {
      window.open(
        window.location.origin + `/vendor/bench/${obj?.id}`,
        "_blank"
      );
    } else {
      dispatch(openDrawer({ drawerName: name, data: !obj ? {} : obj }));
    }
  };

  const getRequirements = async () => {
    setIsPopupOpen(false);
    dispatch(openBackdrop());
    try {
      const data = await matchCandidateToRequirements(selectedRows);
      if (data) {
        setShowPopup({
          type: "success",
          message: "Found Matching Positions",
        });
        setTimeout(() => {
          setIsSuccessPopup(true);
          fetchBenchList();
          dispatch(closeBackdrop());
        }, 1000);
      }
    } catch (err) {
      setShowPopup({
        type: "error",
        message: "Error to found matching Positions",
      });
      setTimeout(() => {
        setIsSuccessPopup(true);
        dispatch(closeBackdrop());
      }, 1000);
    }
  };

  const handleAvailabilityUpdate = (availabilityId: number) => {
    const payload = {
      id: selectedIds.benchId,
      orgCode: userData.orgCode,
      availability: availabilityId,
    };
    dispatch(openBackdrop());
    benchAvailabiltyUpdate(payload)
      .then((result: any) => {
        if (result) {
          setbenchDatadetails([]);
          fetchBenchList();
          setTimeout(() => {
            setDialogOpen(false);
            dispatch(closeBackdrop());
          }, 2000);
        } else {
          setTimeout(() => {
            dispatch(closeBackdrop());
          }, 1000);
        }
      })
      .catch((error: any) => {
        setTimeout(() => {
          dispatch(closeBackdrop());
          setDialogOpen(false);
        }, 1000);
      });
  };

  const handleMatchingDrawer = (item: any) => {
    if (item?.availability !== AvailabilityEnums.NotAvailable) {
      handleOpenDrawer("MatchingPositions", {
        id: item?.id,
        resource: item?.firstName + item?.lastName,
        experience: item?.cv?.profile?.experience,
        location: item?.location,
      });
    }
  };

  return (
    <>
      {drawerData?.isOpen && drawerData.type !== "techStack" && (
        <div className="border-b py-2 px-4 flex justify-between items-center">
          <h5 className="text-heading">Matching Candidates</h5>
        </div>
      )}
      <div className="px-4 py-3 h-full">
        <div className="flex flex-row gap-1 justify-between items-center mb-1">
          {/* <div> */}
          {drawerData?.isOpen ? (
            <>
              <div>
                {drawerData?.data.role && (
                  <p className="text-title">{drawerData?.data.role}</p>
                )}
                {drawerData?.data.tech && (
                  <p className="text-title">{drawerData?.data.tech}</p>
                )}
                <div className="flex items-center text-info">
                  {drawerData?.data.clientLogo && (
                    <img
                      src={drawerData?.data.clientLogo}
                      style={{ height: 12, width: 12 }}
                      className="me-1"
                    />
                  )}
                  <p className="text-base text-secondary-text">
                    {drawerData?.data.client}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                scrollButtons
              >
                <Tab label="Bench" value="benchTab" />
                <Tab label="Tech Stack" value="techStack" />
              </Tabs>
            </div>
          )}
          {/* </div> */}
          {/* <div className="flex mb-3 items-center justify-between"> */}

          <div className="flex flex-row gap-1 p-1 overflow-hidden">
            <div className="flex text-center flex-nowrap my-auto">
              {activeTab === "benchTab" && (
                <>
                  {drawerData?.isOpen && drawerData.type !== "techStack" && (
                    <Button
                      variant="contained"
                      size="small"
                      disabled={selectedRows?.length <= 0}
                      className="!mr-2"
                      onClick={handleApply}
                    >
                      Apply
                    </Button>
                  )}
                  {!drawerData?.isOpen && drawerData.type !== "techStack" && (
                    <Button
                      variant="text"
                      size="small"
                      disabled={selectedRows?.length <= 0}
                      className="!mr-2"
                      onClick={() => setIsPopupOpen(true)}
                    >
                      <IconAi />
                      Check matching positions
                    </Button>
                  )}

                  <div className="flex grow w-[220px] mx-2">
                    <div className="flex-col flex-grow">
                      <TextField
                        size="small"
                        className="w-full"
                        value={searchText}
                        onChange={(event) => SetSearchText(event.target.value)}
                        placeholder="Search Resources"
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon fontSize="inherit" />
                              </InputAdornment>
                            ),
                            // endAdornment: (
                            //   <InputAdornment
                            //     position="end"
                            //     className="cursor-pointer"
                            //   >
                            //     <CloseOutlined fontSize="inherit" />
                            //   </InputAdornment>
                            // ),
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className="max-w-full shrink-0">
                    <MenuDrpDwnV2
                      menuList={AvailabilityStatus}
                      placeholder="Availability"
                      handleSelectedItem={(selectedItems) =>
                        setAvailability(selectedItems)
                      }
                    />
                  </div>
                </>
              )}
            </div>

            {activeTab === "techStack" && (
              <div className="flex grow w-[220px] mx-2">
                <div className="flex-col flex-grow">
                  <TextField
                    size="small"
                    className="w-full"
                    value={searchText}
                    onChange={(event) => SetSearchText(event.target.value)}
                    placeholder="Search Resources"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="inherit" />
                          </InputAdornment>
                        ),
                        // endAdornment: (
                        //   <InputAdornment
                        //     position="end"
                        //     className="cursor-pointer"
                        //   >
                        //     <CloseOutlined fontSize="inherit" />
                        //   </InputAdornment>
                        // ),
                      },
                    }}
                  />
                </div>
              </div>
            )}

            <IconButton aria-label="filter">
              <FilterListOutlinedIcon />
            </IconButton>

            {!drawerData?.isOpen && (
              // <AddAIBench handleGetBenchDetail={fetchBenchList} />
              <div className="flex flex-col my-auto mr-2">
                <Button
                  variant="outlined"
                  onClick={() => handleOpenDrawer("AddAIBench")}
                >
                  <IconAi />
                  Add Bench
                </Button>
              </div>
            )}
          </div>
          {/* </div> */}
        </div>

        {activeTab === "benchTab" && (
          <>
            <div className="table-body">
              <table>
                <thead>
                  <tr>
                    <th className="multi-select">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        className="cursor-pointer"
                      />
                    </th>
                    <th className="add-right-shadow">Resource name</th>
                    <th>Role</th>
                    {/* <th>Skill Set</th> */}
                    <th>Availability</th>
                  </tr>
                </thead>

                <TablePreLoader
                  isTableLoader={isTableLoader}
                  data={benchDatadetails}
                />

                <tbody>
                  {benchDatadetails?.length > 0 &&
                    benchDatadetails.map((item, index) => (
                      <tr
                        key={item?.id}
                        className={`${
                          isSelected(item.id) ? "bg-blue-100" : "bg-white"
                        }`}
                      >
                        <th className="multi-select">
                          <input
                            type="checkbox"
                            checked={isSelected(item.id)}
                            onChange={() => toggleRowSelection(item)}
                            className="cursor-pointer"
                            disabled={
                              item.availability ===
                              AvailabilityEnums.NotAvailable
                            }
                          />
                        </th>

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
                                  //   handleDrawer(
                                  //     "bench",
                                  //     true,
                                  //     JSON.parse(item.cv)
                                  //   )
                                  // }

                                  onClick={() => {
                                    item.cv.id = item.id;
                                    handleOpenDrawer("benchPreview", item.cv);
                                  }}
                                  className="cursor-pointer hover:text-indigo-700"
                                >
                                  {item?.firstName} {item?.lastName}
                                </div>

                                {!drawerData?.isOpen && (
                                  <div
                                    className="flex justify-end cursor-pointer hover:text-indigo-700"
                                    onClick={() => handleMatchingDrawer(item)}
                                  >
                                    {item.matchingCount} Matching positions
                                  </div>
                                )}
                                {/* {drawerData?.isOpen && (
                                  <div
                                    className="flex justify-end cursor-pointer hover:text-indigo-700"
                                    // onClick={() =>
                                    //   handleMatchingDialog(item?.aiScore)
                                    // }
                                  >
                                    <IconAi />
                                    <span> {item?.matchingScore || "-"}%</span>
                                  </div>
                                )} */}
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
                        <td>{item.title || "-"}</td>
                        {/* <td>{item.skills || "-"}</td> */}
                        <td>
                          <Typography
                            className={`inline-block px-3 py-1 !text-base rounded-full cursor-pointer ${
                              item?.availability ===
                              AvailabilityEnums.NotAvailable
                                ? "bg-red-100 text-red-700"
                                : "bg-indigo-100 text-indigo-700"
                            }`}
                            onClick={() => {
                              setDialogOpen(true);
                              setSelectedIds((prev) => ({
                                ...prev,
                                benchId: item.id,
                                availabilityId: item.availability,
                              }));
                            }}
                          >
                            {item?.availabilityName}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-gray-200 bg-white px-2 sm:px-4">
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
        )}

        {activeTab === "techStack" && (
          <>
            <div className="table-body">
              <table>
                <thead>
                  <tr>
                    <th className="add-right-shadow">Technology</th>
                    <th>Resources</th>
                  </tr>
                </thead>

                <TablePreLoader
                  isTableLoader={isTableLoader}
                  data={techStack}
                />

                <tbody>
                  {techStack.map((item, index) => (
                    <tr key={item?.id}>
                      <th className="add-right-shadow">{item.skillName}</th>
                      <td>
                        <div
                          className="cursor-pointer hover:text-indigo-700"
                          onClick={() =>
                            handleDrawer("techStack", true, {
                              tech: item.skillName,
                              id: item.id,
                            })
                          }
                        >
                          {item.resourceCount}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-gray-200 bg-white px-2 sm:px-4">
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-base text-gray-700">
                    Showing <span>{(pageIndex - 1) * pageSize + 1}</span> to{" "}
                    <span>
                      {Math.min(pageIndex * pageSize, records?.totalCount || 0)}
                    </span>{" "}
                    of <span>{records?.totalCount || 0}</span> results
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
                    pageIndex >= Math.ceil((records?.totalCount || 0) / pageSize)
                  }
                >
                  <ChevronRight />
                </IconButton>
              </div>
            </div>
          </>
        )}

        {drawerData?.isOpen && (
          <MatchingSkillsDialog
            title="Matching Score Analysis"
            isMatchOpen={isMatchOpen}
            setIsMatchOpen={setIsMatchOpen}
            aiScore={matchingScore}
          />
        )}

        <Drawer
          anchor="right"
          open={drawerObj.isOpen}
          onClose={toggleDrawer(false)}
        >
          <div className="w-[calc(100vw-250px)] h-full">
            {/* header */}

            <div className="px-8 py-2 border-b flex">
              <svg
                className="absolute cursor-pointer left-[8px] top-[11px]"
                onClick={toggleDrawer(false)}
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
              <h2 className="text-heading">
                {drawerObj.type === "bench" && "Bench Resource Preview"}
                {drawerObj.type === "techStack" && "Matching Resources"}
                {drawerObj.type === "requirement" && "Matching Positions"}
              </h2>
            </div>

            {drawerObj.type === "bench" && (
              <div className="overflow-auto h-[calc(100%-38px)]">
                <BenchPreview benchData={drawerObj.data} />
              </div>
            )}
            {drawerObj.type === "requirement" && (
              <div className="px-4">
                <MatchingPositions benchDrawerData={drawerObj} />
              </div>
            )}
            {drawerObj.type === "techStack" && (
              <VndBench drawerData={drawerObj} />
            )}
          </div>
        </Drawer>
      </div>
      {isSuccessPopup && (
        <SuccessDialog
          title={showPopup?.message}
          isOpenModal={isSuccessPopup}
          setIsOpenModal={setIsSuccessPopup}
          type={showPopup?.type}
        />
      )}

      {isPopupOpen && (
        <React.Fragment>
          <Dialog
            // fullScreen={fullScreen}
            open={isPopupOpen}
            // onClose={() => setIsPopupOpen(false)}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogContent>
              <div className="flex justify-center mb-4">
                <IconAi width="40px" height="40px" />
              </div>
              <p className="text-base">
                Are you sure to want to check matching ai score of candidates?
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
                onClick={getRequirements}
                autoFocus
                variant="contained"
                size="small"
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}

      <AvailabilityDialog
        isOpen={dialogOpen}
        selectedIds={selectedIds}
        onClose={() => {
          setDialogOpen(false);
          setSelectedIds((prev) => ({
            ...prev,
            availabilityId: 1,
          }));
        }}
        onSave={handleAvailabilityUpdate}
      />
    </>
  );
}
