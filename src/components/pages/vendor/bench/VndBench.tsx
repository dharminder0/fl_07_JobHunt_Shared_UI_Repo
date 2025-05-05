import {
  AccountCircleOutlined,
  Cancel,
  CancelOutlined,
  CloseOutlined,
  LocationOn,
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
  debounce,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AddBenchForm from "./AddBenchForm";
import MatchingSkillsDialog from "../../../sharedComponents/MatchingSkillsDialog";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import AddAIBench from "./AddAIBench";
import BenchPreview from "./BenchPreview";
import VndRequirements from "../requirements/VndRequirements";
import SuccessDialog from "../../../sharedComponents/SuccessDialog";
import {
  getBenchDetails,
  getBenchList,
  getTechStackList,
  matchCandidateToRequirements,
  matchRequirementToCandidates,
  upsertApplications,
  upsertMatchingIds,
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

const teckStackData = [
  {
    id: 1,
    tech: "Angular",
    resources: 3,
  },
  {
    id: 2,
    tech: "React js",
    resources: 5,
  },
  {
    id: 3,
    tech: "Devops",
    resources: 2,
  },
];

export default function VndBench({ drawerData = {} }: any) {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const dispatch: AppDispatch = useDispatch();
  const drawerState = useSelector((state: any) => state.drawer);

  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [benchFliterData, setbenchFliterData] = useState<any[]>([]);
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<any>({ type: "", message: "" });
  const [isTableLoader, setIsTableLoader] = React.useState(true);
  const [matchingScore, setMatchingScore] = React.useState(0);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [searchText, SetSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("benchTab");
  const [benchDatadetails, setbenchDatadetails] = useState<any[]>([]);
  const [availability, setAvailability] = useState<any[]>([]);
  const [techStack, setTechStack] = useState<any[]>([]);
  const [drawerObj, setDrawerObj] = useState({
    type: "bench",
    isOpen: false,
    data: {},
    status: "Open",
  });
  const [filterList, setFilterList] = useState<any>({
    availability: ["Immediate"],
    roles: [
      "Software Associate",
      "Front End Lead",
      "Software Developer",
      "Front End Developer",
    ],
  });
  const [searchFilter, setSearchFilter] = useState<any>({
    searchValue: "",
    availability: [],
    roles: [],
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  // getBenchDetails(userData.orgCode)
  //   .then((result: any) => {
  //     if (result && result.length > 0) {
  //       setbenchDatadetails(result);
  //     } else {
  //       setbenchDatadetails([]);
  //     }
  //   })
  //   .catch((error: any) => {
  //     console.error("Error fetching bench details:", error);
  //     setbenchDatadetails([]);
  //   });

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
  }, [searchText, availability, activeTab]);

  useEffect(() => {
    if (!drawerState.isOpen) {
      fetchBenchList();
    }
  }, [drawerState]);

  const fetchBenchList = () => {
    const payload = {
      searchText: searchText,
      orgCode: userData.orgCode,
      page: 1,
      availability: availability,
      pageSize: 20,
    };
    setIsTableLoader(true);
    getBenchList(payload)
      .then((result: any) => {
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
    getTechStackList(userData.orgCode).then((result: any) => {
      if (result && result?.length >= 0) {
        setTechStack(result);
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

  const handleMatchingPositions = async () => {
    const payload = {
      resourceId: selectedRows,
      requirementId: [],
    };
    dispatch(openBackdrop());
    upsertMatchingIds(payload)
      .then((result: any) => {
        if (result && result?.length >= 0) {
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
      })
      .catch((error: any) => {
        setShowPopup({
          type: "error",
          message: "Error to found matching Positions",
        });
        setTimeout(() => {
          setIsSuccessPopup(true);
          dispatch(closeBackdrop());
        }, 1000);
      });
  };

  const getRequirements = async () => {
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
                  onClick={getRequirements}
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
              {/* <div className="max-w-full shrink-0">
                <MenuDrpDwn
                  menuList={filterList?.roles}
                  placeholder="Roles"
                  handleSelectedItem={(selectedItems) => {
                    setSearchFilter({
                      ...searchFilter,
                      roles: selectedItems,
                    });
                  }}
                />
              </div> */}
              <div className="max-w-full shrink-0">
                <MenuDrpDwnV2
                  menuList={AvailabilityStatus}
                  placeholder="Availability"
                  handleSelectedItem={(selectedItems) =>
                    setAvailability(selectedItems)
                  }
                />
              </div>
            </div>
            <IconButton aria-label="filter">
              <FilterListOutlinedIcon />
            </IconButton>
            {/* {!drawerData?.isOpen && <AddBenchForm />} */}
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

                                  onClick={() =>
                                    handleOpenDrawer("benchPreview", item.cv)
                                  }
                                  className="cursor-pointer hover:text-indigo-700"
                                >
                                  {item?.firstName} {item?.lastName}
                                </div>

                                {!drawerData?.isOpen && (
                                  <div
                                    className="flex justify-end cursor-pointer hover:text-indigo-700"
                                    onClick={() =>
                                      handleOpenDrawer("MatchingPositions", {
                                        id: item?.id,
                                        resource:
                                          item?.firstName + item?.lastName,
                                        experience:
                                          item?.cv?.profile?.experience,
                                        location: item?.location,
                                      })
                                    }
                                  >
                                    {item.matchingCount} Matching positions
                                  </div>
                                )}
                                {drawerData?.isOpen && (
                                  <div
                                    className="flex justify-end cursor-pointer hover:text-indigo-700"
                                    onClick={() =>
                                      handleMatchingDialog(item?.aiScore || 60)
                                    }
                                  >
                                    <IconAi />
                                    <span> {item?.aiScore || 60}%</span>
                                  </div>
                                )}
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
                        <td>{item?.availabilityName || "-"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
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
                      <th className="add-right-shadow">{item.SkillName}</th>
                      <td>
                        <div
                          className="cursor-pointer hover:text-indigo-700"
                          onClick={() =>
                            handleDrawer("techStack", true, {
                              tech: item.SkillName,
                            })
                          }
                        >
                          {item.ResourceCount}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

            <div className="px-4 py-2 border-b">
              <h2 className="text-heading">
                {drawerObj.type === "bench" && "Bench Resource Preview"}
                {drawerObj.type === "techStack" && "Angular"}
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
    </>
  );
}
