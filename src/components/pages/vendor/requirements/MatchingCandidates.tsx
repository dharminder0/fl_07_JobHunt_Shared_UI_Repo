import {
  AccountCircleOutlined,
  LocationOn,
  WorkHistory,
} from "@mui/icons-material";
import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import MatchingSkillsDialog from "../../../sharedComponents/MatchingSkillsDialog";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SuccessDialog from "../../../sharedComponents/SuccessDialog";
import {
  getBenchList,
  getMatchingCandidates,
  upsertApplications,
} from "../../../../components/sharedService/apiService";
import { AvailabilityStatus } from "../../../../components/sharedService/shareData";
import MenuDrpDwnV2 from "../../../../components/sharedComponents/MenuDrpDwnV2";
import TablePreLoader from "../../../../components/sharedComponents/TablePreLoader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../components/redux/store";
import {
  closeDrawer,
  openDrawer,
} from "../../../../components/features/drawerSlice";

export default function MatchingCandidates({ drawerData = {} }: any) {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const dispatch: AppDispatch = useDispatch();
  const drawerState = useSelector((state: any) => state.drawer);

  const [drawerDatas, setDrawerDatas] = React.useState(drawerData ?? {});
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<any>({ type: "", message: "" });
  const [isTableLoader, setIsTableLoader] = React.useState(true);
  const [matchingScore, setMatchingScore] = React.useState(0);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [searchText, SetSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("benchTab");
  const [benchDatadetails, setbenchDatadetails] = useState<any[]>([]);
  const [availability, setAvailability] = useState<any[]>([]);
  const [drawerObj, setDrawerObj] = useState({
    type: "bench",
    isOpen: false,
    data: {},
    status: "Open",
  });

  useEffect(() => {
    if (searchText?.length > 2 || searchText?.length == 0) {
      fetchBenchList();
    }
  }, [searchText, availability, activeTab]);

  useEffect(() => {
    if (!drawerState.isOpen) {
      fetchBenchList();
    }
  }, [drawerState]);

  const fetchBenchList = () => {
    const payload = {
      requirementId: drawerDatas.id,
      orgCode: userData.orgCode,
    };
    setIsTableLoader(true);
    getMatchingCandidates(payload)
      .then((result: any) => {
        if (result && result?.length > 0) {
          setbenchDatadetails(result[0].Records);
        } else {
          setbenchDatadetails([]);
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

  const handleMatchingDialog = (score: number) => {
    setIsMatchOpen(true);
    setMatchingScore(score);
  };

  const handleOpenCV = (id: any) => {
    window.open(window.location.origin + `/vendor/bench/${id}`, "_blank");
  };

  const toggleRowSelection = (row: any) => {
    setSelectedRows((prevSelectedRows) => {
      const exists = prevSelectedRows.includes(row.BenchId);
      if (exists) {
        // Remove the row id if it's already selected
        return prevSelectedRows.filter((BenchId) => BenchId !== row.BenchId);
      }
      // Add the row id if it's not selected
      return [...prevSelectedRows, row.BenchId];
    });
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === benchDatadetails.length) {
      setSelectedRows([]); // Deselect all
    } else {
      setSelectedRows(benchDatadetails.map((row) => row.BenchId)); // Store only IDs
    }
  };

  const isSelected = (BenchId: number) => selectedRows.includes(BenchId);
  const isAllSelected = selectedRows.length === benchDatadetails.length;

  const handleApply = () => {
    const payload = {
      resourceId: selectedRows,
      requirementUniqueId: drawerDatas.uniqueId,
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
    if (drawerDatas?.isOpen) {
      window.open(
        window.location.origin + `/vendor/bench/${obj?.id}`,
        "_blank"
      );
    } else {
      dispatch(openDrawer({ drawerName: name, data: !obj ? {} : obj?.Cv }));
    }
  };

  return (
    <>
      <div className="border-b py-2 px-4 flex justify-between items-center">
        <div className="px-4 flex">
          <svg
            className="absolute cursor-pointer left-[8px] top-[11px]"
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
          <h2 className="text-heading">Matching Candidates</h2>
        </div>
      </div>

      <div className="px-4 py-3 h-full">
        <div className="flex flex-row gap-1 justify-between items-center mb-1">
          <div>
            {drawerDatas?.role && (
              <p className="text-title">{drawerDatas?.role}</p>
            )}
            {drawerDatas?.tech && (
              <p className="text-title">{drawerDatas?.tech}</p>
            )}
            <div className="flex items-center text-info">
              {drawerDatas?.clientLogo && (
                <img
                  src={drawerDatas?.clientLogo}
                  style={{ height: 12, width: 12 }}
                  className="me-1"
                />
              )}
              <p className="text-base text-secondary-text">
                {drawerDatas?.client}
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-1 p-1 overflow-hidden">
            <div className="flex text-center flex-nowrap my-auto">
              <Button
                variant="contained"
                size="small"
                disabled={selectedRows?.length <= 0}
                className="!mr-2"
                onClick={handleApply}
              >
                Apply
              </Button>

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
                      isSelected(item.BenchId) ? "bg-blue-100" : "bg-white"
                    }`}
                  >
                    <th className="multi-select">
                      <input
                        type="checkbox"
                        checked={isSelected(item.BenchId)}
                        onChange={() => toggleRowSelection(item)}
                        className="cursor-pointer"
                      />
                    </th>

                    <th className="add-right-shadow">
                      <div className="flex items-center">
                        {!item.Cv?.avatar ? (
                          <AccountCircleOutlined
                            fontSize="medium"
                            className="text-secondary-text"
                          />
                        ) : (
                          <img
                            src={item.Cv?.avatar}
                            alt={item?.FirstName}
                            style={{ height: 24, width: 24 }}
                            className="rounded-full"
                          />
                        )}
                        <div className="ms-2 w-[100%]">
                          <div className="flex items-center justify-between text-base">
                            <div
                              onClick={() => handleOpenCV(item.BenchId)}
                              className="cursor-pointer hover:text-indigo-700"
                            >
                              {item?.FirstName} {item?.LastName}
                            </div>

                            {/* {!drawerDatas?.isOpen && (
                              <div
                                className="flex justify-end cursor-pointer hover:text-indigo-700"
                                onClick={() =>
                                  handleDrawer("requirement", true, {
                                    id: item?.id,
                                    resource: item?.FirstName + item?.LastName,
                                    // experience: item?.experience,
                                    // location: item?.location,
                                  })
                                }
                              >
                                {item.matchingJobs} Matching positions
                              </div>
                            )} */}
                            <div
                              className="flex justify-end cursor-pointer hover:text-indigo-700"
                              onClick={() =>
                                handleMatchingDialog(item?.MatchScore || 0)
                              }
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
                              <span> {item?.MatchScore || 0}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-secondary-text text-info">
                            <div className="flex">
                              {item?.Cv?.profile?.experience && (
                                <p>
                                  <WorkHistory fontSize="inherit" />{" "}
                                  {item?.Cv?.profile?.experience}
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
                    <td>{item.Title || "-"}</td>
                    {/* <td>{item.skills || "-"}</td> */}
                    <td>{item?.AvailabilityName || "-"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <MatchingSkillsDialog
          title="Matching Score Analysis"
          isMatchOpen={isMatchOpen}
          setIsMatchOpen={setIsMatchOpen}
          aiScore={matchingScore}
        />
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
