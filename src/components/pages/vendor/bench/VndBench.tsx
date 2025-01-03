import {
  AccountCircleOutlined,
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddBenchForm from "./AddBenchForm";
import MatchingSkillsDialog from "../../../../components/shared/MatchingSkillsDialog";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import MenuDrpDwn from "../../../../components/shared/MenuDrpDwn";
import AddAIBench from "./AddAIBench";
import BenchPreview from "./BenchPreview";
import VndRequirements from "../requirements/VndRequirements";
import SuccessDialog from "../../../../components/shared/SuccessDialog";
import { positions } from "@mui/system";

const benchData = [
  {
    id: 1,
    resource: "Raj Pathar",
    role: "Software Associate",
    skills: "Angular, React, DevOps",
    experience: "8 years",
    location: "Noida",
    availability: "Immediate",
    aiScore: 78,
    matchingJobs: 2,
  },
  {
    id: 2,
    resource: "Harshit Tandon ",
    role: "Front End Lead",
    skills: "Angular, DevOps, .net, C#",
    experience: "8 years",
    location: "Hyderabad",
    availability: "Immediate",
    aiScore: 80,
    matchingJobs: 3,
  },
  {
    id: 3,
    resource: "Sajid Sarkar ",
    role: "Software Developer",
    skills: "Angular, React, Azure",
    experience: "4 years",
    location: "Noida",
    availability: "Immediate",
    aiScore: 75,
    matchingJobs: 1,
  },
  {
    id: 4,
    resource: "Vaibav Rastogi",
    role: "Front End Developer",
    skills: "Angular, React",
    experience: "3 years",
    location: "Hyderabad",
    availability: "Immediate",
    aiScore: 60,
    matchingJobs: 0,
  },
];

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
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [benchFliterData, setbenchFliterData] = useState<any[]>([]);
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);
  const [matchingScore, setMatchingScore] = React.useState(0);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("benchTab");
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

  useEffect(() => {
    // Filtering logic
    const filtered = benchData.filter((item) => {
      // Check search input
      const availabilityMatch =
        searchFilter.availability.length === 0 ||
        searchFilter.availability.includes(item.availability);
      const roleMatch =
        searchFilter.roles.length === 0 ||
        searchFilter.roles.includes(item.role);
      const searchMatch =
        searchFilter.searchValue === "" ||
        item.role
          .toLowerCase()
          .includes(searchFilter.searchValue.toLowerCase());
      return searchMatch && roleMatch && availabilityMatch;
    });
    setbenchFliterData(filtered);
  }, [searchFilter]);

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
      const exists = prevSelectedRows.some(
        (selectedRow) => selectedRow.id === row.id
      );
      if (exists) {
        // Remove the row if it's already selected
        return prevSelectedRows.filter(
          (selectedRow) => selectedRow.id !== row.id
        );
      }
      // Add the row if it's not selected
      return [...prevSelectedRows, row];
    });
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === benchData.length) {
      setSelectedRows([]); // Deselect all
    } else {
      setSelectedRows(benchData); // Select all
    }
  };

  const isSelected = (id: number) => selectedRows.some((row) => row.id === id);
  const isAllSelected = selectedRows.length === benchData.length;

  const handleApply = () => {
    setIsSuccessPopup(true);
    setSelectedRows([]);
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
              <div className="flex grow w-[220px] mx-2">
                <div className="flex-col flex-grow">
                  <TextField
                    size="small"
                    className="w-full"
                    value={searchFilter.searchValue}
                    onChange={(event) =>
                      setSearchFilter({
                        ...searchFilter,
                        searchValue: event.target.value,
                      })
                    }
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
              </div>
              <div className="max-w-full shrink-0">
                <MenuDrpDwn
                  menuList={filterList?.availability}
                  placeholder="Availability"
                  handleSelectedItem={(selectedItems) => {
                    setSearchFilter({
                      ...searchFilter,
                      availability: selectedItems,
                    });
                  }}
                />
              </div>
            </div>
            <IconButton aria-label="filter">
              <FilterListOutlinedIcon />
            </IconButton>
            {!drawerData?.isOpen && <AddBenchForm />}
            {!drawerData?.isOpen && <AddAIBench />}
          </div>
          {/* </div> */}
        </div>

        {activeTab === "benchTab" && (
          <>
            <div className="table-body">
              <table>
                <thead>
                  <tr>
                    {drawerData?.isOpen && (
                      <th className="multi-select">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={toggleSelectAll}
                          className="cursor-pointer"
                        />
                      </th>
                    )}
                    <th className="add-right-shadow">Resource name</th>
                    <th>Role</th>
                    <th>Skill Set</th>
                    <th>Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {benchFliterData.map((item, index) => (
                    <tr
                      key={item?.id}
                      className={`${
                        isSelected(item.id) ? "bg-blue-100" : "bg-white"
                      }`}
                    >
                      {drawerData?.isOpen && (
                        <th className="multi-select">
                          <input
                            type="checkbox"
                            checked={isSelected(item.id)}
                            onChange={() => toggleRowSelection(item)}
                            className="cursor-pointer"
                          />
                        </th>
                      )}
                      <th className="add-right-shadow">
                        <div className="flex items-center">
                          <AccountCircleOutlined
                            fontSize="medium"
                            className="text-secondary-text"
                          />
                          <div className="ms-2 w-[100%]">
                            <div className="flex items-center justify-between text-base">
                              <div
                                onClick={() =>
                                  handleDrawer("bench", true, { id: item?.id })
                                }
                                className="cursor-pointer hover:text-indigo-700"
                              >
                                {item.resource}
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-secondary-text text-info">
                              <div className="flex">
                                <p>
                                  <WorkHistory fontSize="inherit" />{" "}
                                  {item.experience}
                                </p>
                                <p className="ms-1">
                                  <LocationOn fontSize="inherit" />{" "}
                                  {item.location}
                                </p>
                              </div>
                              {!drawerData?.isOpen && (
                                <div
                                  className="flex justify-end cursor-pointer hover:text-indigo-700"
                                  onClick={() =>
                                    handleDrawer("requirement", true, {
                                      id: item?.id,
                                      resource: item.resource,
                                      experience: item.experience,
                                      location: item.location,
                                    })
                                  }
                                >
                                  {item.matchingJobs} Matching positions
                                </div>
                              )}
                              {drawerData?.isOpen && (
                                <div
                                  className="flex justify-end cursor-pointer hover:text-indigo-700"
                                  onClick={() =>
                                    handleMatchingDialog(item.aiScore)
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
                                  <span> {item.aiScore}%</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </th>
                      <td>{item.role}</td>
                      <td>{item.skills}</td>
                      <td>{item.availability}</td>
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
                <tbody>
                  {teckStackData.map((item, index) => (
                    <tr key={item?.id}>
                      <th className="add-right-shadow">{item.tech}</th>
                      <td>
                        <div
                          className="cursor-pointer hover:text-indigo-700"
                          onClick={() =>
                            handleDrawer("techStack", true, {
                              tech: item.tech,
                            })
                          }
                        >
                          {item.resources}
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
                <BenchPreview />
              </div>
            )}
            {drawerObj.type === "requirement" && (
              <div className="px-4">
                <VndRequirements benchDrawerData={drawerObj} />
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
          title="Application has been submitted successfully"
          isOpenModal={isSuccessPopup}
          setIsOpenModal={setIsSuccessPopup}
        />
      )}
    </>
  );
}
