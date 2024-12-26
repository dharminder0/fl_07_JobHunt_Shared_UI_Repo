import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  IconButton,
  Chip,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import { Edit, Download, AccountCircleOutlined } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import MenuDrpDwn from "../../../../components/shared/MenuDrpDwn";
import StatusDialog from "../../../../components/shared/StatusDialog";
import MatchingSkillsDialog from "../../../../components/shared/MatchingSkillsDialog";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SearchIcon from "@mui/icons-material/Search";

const applicantData = [
  {
    id: 1,
    vendor: "Fleek IT Solutions",
    name: "Harshit Tandon",
    requirement: "React js Developer",
    client: "Airtel",
    status: "In Review",
    date: "13-07-2024",
    ai: 60,
    vendorLogo:
      "https://fleekitsolutions.com/wp-content/uploads/2023/09/favicon-32x32-1.png",
    clientLogo:
      "https://assets.airtel.in/static-assets/new-home/img/favicon-16x16.png",
  },
  {
    id: 2,
    vendor: "DevStringX Technologies",
    name: "Raj Pathar",
    requirement: "Sr. Angular developer",
    client: "IBM Consulting",
    status: "New",
    date: "12-06-2024",
    ai: 70,
    vendorLogo:
      "https://www.devstringx.com/wp-content/uploads/2018/03/favicon.ico",
    clientLogo:
      "https://www.ibm.com/content/dam/adobe-cms/default-images/favicon.svg",
  },
  {
    id: 3,
    vendor: "Binemiles Technologies",
    name: "Sajid Sarkar",
    requirement: "React Native mobile developer",
    client: "Capgemini",
    status: "Rejected",
    date: "18-05-2024",
    ai: 50,
    vendorLogo:
      "https://www.capgemini.com/wp-content/uploads/2021/06/cropped-favicon.png?w=192",
    clientLogo:
      "https://www.capgemini.com/wp-content/uploads/2021/06/cropped-favicon.png?w=192",
  },
  {
    id: 4,
    vendor: "SDET Tech Pvt. Ltd",
    name: "Amit Kumar",
    requirement: "Frontend developer",
    client: "NTT DATA",
    status: "Shortlisted",
    date: "11-04-2024",
    ai: 80,
    vendorLogo:
      "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
    clientLogo:
      "https://www.nttdata.com/global/en/-/media/assets/images/android-chrome-256256.png?rev=8dd26dac893a4a07bae174ff25e900ef",
  },
  {
    id: 5,
    vendor: "Fleek IT Solutions",
    name: "Harshit Tandon",
    requirement: ".Net developer",
    client: "Airtel",
    status: "Placed",
    date: "13-07-2024",
    ai: 65,
    vendorLogo:
      "https://fleekitsolutions.com/wp-content/uploads/2023/09/favicon-32x32-1.png",
    clientLogo:
      "https://assets.airtel.in/static-assets/new-home/img/favicon-16x16.png",
  },
];

const activeData = [
  {
    id: 1,
    name: "Fleek IT Solutions",
    description:
      "Stripe is a software platform for starting and running internet businesses.",
    tags: ["Onsite", "50-100", "QA Testing"],
    place: "Noida",
    contracts: "20",
    logo: "https://fleekitsolutions.com/wp-content/uploads/2023/09/favicon-32x32-1.png",
    candidate: 5,
    avgScore: 70,
  },
  {
    id: 2,
    name: "DevStringX Technologies",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "10-50", "App Tech"],
    place: "Delhi(NCR)",
    contracts: "10",
    logo: "https://www.devstringx.com/wp-content/uploads/2018/03/favicon.ico",
    candidate: 3,
    avgScore: 60,
  },
  {
    id: 3,
    name: "Binemiles Technologies",
    description:
      "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "500+", "Other Tech"],
    place: "Gurgaon",
    contracts: "12",
    logo: "https://binmile.com/wp-content/uploads/2022/07/bmt-favicon.png",
    candidate: 2,
    avgScore: 80,
  },
];

const allVendors = [
  {
    id: 1,
    name: "Cyient Limited",
    description:
      "Stripe is a software platform for starting and running internet businesses with this platform.",
    tags: ["Onsite", "50-100", "QA Testing"],
    place: "Noida",
    logo: "https://www.cyient.com/hubfs/enhancer.png",
    candidate: 5,
    avgScore: 75,
  },
  {
    id: 3,
    name: "Exzeo Software Pvt Ltd",
    description:
      "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "500+", "Other Tech"],
    place: "Gurgaon",
    logo: "https://binmile.com/wp-content/uploads/2022/07/bmt-favicon.png",
    candidate: 2,
    avgScore: 70,
  },
  {
    id: 4,
    name: "Nucleus Software Exports ",
    description:
      "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Onsite", "0-10", "App Tech"],
    place: "Mumbai",
    logo: "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
    candidate: 7,
    avgScore: 65,
  },
];

const RequirementDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.state || {};
  const [activeTab, setActiveTab] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState("New");
  const [matchingScore, setMatchingScore] = React.useState(0);
  const [filteredApplicants, setFilteredApplicants] = useState<any[]>([]);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleStatusDialog = (status: string) => {
    setIsDialogOpen(true);
    setSelectedStatus(status);
  };

  const handleMatchingDialog = (score: number) => {
    setIsMatchOpen(true);
    setMatchingScore(score);
  };

  const getVendorDetails = (id: number) => {
    navigate(`/company/myvendors/${id}?type=activeView`, {
      state: { previousUrl: location.pathname },
    });
  };

  const [searchFilter, setSearchFilter] = useState<any>({
    searchValue: "",
    status: !params?.status ? [] : [params?.status],
  });

  const [filterList, setFilterList] = useState<any>({
    status: [
      "New",
      "In Review",
      "Shortlisted",
      "Technical Assessment",
      "Interview Round I",
      "Interview Round II",
      "Rejected",
      "Placed",
    ],
  });

  useEffect(() => {
    // Filtering logic
    const filtered = applicantData.filter((item) => {
      // Check status filter
      const statusMatch =
        searchFilter.status.length === 0 ||
        searchFilter.status.includes(item.status);
      // Check search input
      const searchMatch =
        searchFilter.searchValue === "" ||
        item.name
          .toLowerCase()
          .includes(searchFilter.searchValue.toLowerCase());
      return statusMatch && searchMatch;
    });
    setFilteredApplicants(filtered);
  }, [searchFilter, setFilteredApplicants]);

  return (
    <div className="flex flex-1">
      <div className="w-[70%] p-3 border-e">
        {/* Header */}
        <Box className="flex justify-between items-center">
          <div className="flex flex-row gap-3">
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              className="!w-[50px] !h-[50px]"
              onClick={() => {
                navigate("/company/myrequirements");
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <h5 className="text-heading group/item flex items-center">
                Social Media Assistant
                <div className="group/edit invisible group-hover/item:visible">
                  <span className="group-hover/edit:text-gray-700 ">
                    <IconButton aria-label="edit" sx={{ marginLeft: 2 }}>
                      <Edit fontSize="inherit" />
                    </IconButton>
                  </span>
                </div>
              </h5>
              <div className="flex items-center">
                <img
                  src="https://assets.airtel.in/static-assets/new-home/img/favicon-16x16.png"
                  alt=""
                  style={{ width: 16, height: 16 }}
                />
                <p className="text-title mx-2">Airtel</p>

                <div>
                  <Chip
                    label="Remote"
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: 10 }}
                    className="my-1 me-1"
                  />
                  <Chip
                    label="Positions: 3"
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: 10 }}
                    className="my-1 me-1"
                  />
                  <Chip
                    label="6 months"
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: 10 }}
                    className="my-1 me-1"
                  />
                  <Chip
                    label="Global"
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: 10 }}
                    className="my-1 me-1"
                  />
                </div>
              </div>
            </Box>
          </div>
        </Box>
        <div>
          {/* Description */}
          <div className="mb-4 mt-2">
            <p className="text-gray-600 text-base">
              Stripe is looking for a Social Media Marketing expert to help
              manage our online networks. You will be responsible for monitoring
              our social media channels, creating content, finding effective
              ways to engage the community and incentivize others to engage on
              our channels.
            </p>
          </div>

          {/* Responsibilities */}
          <Box className="mb-4">
            <p className="text-title mb-2">Responsibilities</p>
            <ul className="list-none">
              {[
                "Community engagement to ensure that is supported and actively represented online",
                "Focus on social media content development and publication",
                "Marketing and strategy support",
                "Stay on top of trends on social media platforms, and suggest content ideas to the team",
                "Engage with online communities",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-600 text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Box>
        </div>

        {/* Tabs */}
        <div className="flex mb-3 items-center justify-between">
          <div>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              scrollButtons
            >
              <Tab label="Applicants" />
              <Tab label="Analytics" />
            </Tabs>
          </div>
          <div>
            {activeTab == 0 && (
              <>
                <div className="flex flex-row gap-1 p-1 justify-end overflow-hidden">
                  <div className="flex text-center flex-nowrap my-auto">
                    <div className="flex grow w-[220px] mr-2">
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
                      <MenuDrpDwn
                        menuList={filterList?.status}
                        placeholder="Status"
                        handleSelectedItem={(selectedItems) => {
                          setSearchFilter({
                            ...searchFilter,
                            status: selectedItems,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <IconButton aria-label="filter">
                    <FilterListOutlinedIcon />
                  </IconButton>
                </div>
              </>
            )}
          </div>
        </div>

        {activeTab == 0 && (
          <>
            <div className="table-body">
              <table>
                <thead>
                  <tr>
                    <th className="add-right-shadow">Candidate Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Application Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplicants.map((applicant, index) => (
                    <tr key={index}>
                      <th className="add-right-shadow">
                        <div>{applicant.name}</div>
                        <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                          <div
                            className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700"
                            onClick={() => getVendorDetails(applicant.id)}
                          >
                            <img
                              src={applicant.vendorLogo}
                              style={{ height: 12, width: 12 }}
                              className="me-1"
                            />
                            <Tooltip title={applicant.vendor} arrow>
                              <span className="text-ellipsis overflow-hidden truncate">
                                {applicant.vendor}
                              </span>
                            </Tooltip>
                          </div>
                          <div className="flex text-info items-center">
                            <div
                              className="flex cursor-pointer"
                              onClick={() => handleMatchingDialog(applicant.ai)}
                            >
                              <svg
                                width="14px"
                                height="14px"
                                viewBox="0 0 512 512"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <title>ai</title>
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
                              <span> {applicant.ai}%</span>
                            </div>
                            <div className="ms-2 text-indigo-500 cursor-pointer hover:text-indigo-700 ">
                              <Download fontSize="inherit" />
                              <span className="text-info">CV</span>
                            </div>
                          </div>
                        </div>
                      </th>
                      <td>{applicant.requirement}</td>
                      <td>
                        <Typography
                          className={`inline-block px-3 py-1 !text-base rounded-full cursor-pointer ${
                            applicant.status === "Placed"
                              ? "bg-green-100 text-green-700"
                              : applicant.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : applicant.status === "New"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-indigo-100 text-indigo-700"
                          }`}
                          onClick={() => handleStatusDialog(applicant.status)}
                        >
                          {applicant.status}
                        </Typography>
                      </td>
                      <td>{applicant.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <div className="w-[30%] p-3">
        {/* <div className="text-title mb-3 mt-1">Similar Requirements</div> */}
        <div className="text-title mb-3 mt-1">Empaneled</div>
        {activeData.map((company) => (
          <div
            className="mb-2 border rounded-md p-2 cursor-pointer hover:border-indigo-700 hover:bg-primary-hover"
            onClick={() => getVendorDetails(company.id)}
          >
            <div className="flex items-center mb-1">
              <img
                src={
                  !company.logo
                    ? "/assets/images/Companylogo.png"
                    : company.logo
                }
                alt={company.name}
                className="me-3"
                style={{ width: 30, height: 30 }}
              />
              <div>
                <Tooltip title={company.name} arrow>
                  <span className="text-ellipsis overflow-hidden truncate text-base font-bold">
                    {company.name}
                  </span>
                </Tooltip>
                <p className="text-base">{company.place}</p>
              </div>
            </div>

            <div>
              <span className="text-base me-4 flex items-center mb-1">
                <AccountCircleOutlined
                  fontSize="inherit"
                  className="text-indigo-600 mr-1"
                />
                Matching Candidate: {company.candidate}
              </span>

              <div
                className="text-base flex"
                // onClick={() => handleMatchingDialog(company.avgScore)}
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
                Avg Score: {company.avgScore}%
              </div>
            </div>
          </div>
        ))}

        <div className="text-title mb-3 mt-4">All Vendors</div>
        {allVendors.map((company) => (
          <div
            className="mb-2 border rounded-md p-2 cursor-pointer hover:border-indigo-700 hover:bg-primary-hover"
            onClick={() => getVendorDetails(company.id)}
          >
            <div className="flex items-center mb-1">
              <img
                src={
                  !company.logo
                    ? "/assets/images/Companylogo.png"
                    : company.logo
                }
                alt={company.name}
                className="me-3"
                style={{ width: 30, height: 30 }}
              />
              <div>
                <Tooltip title={company.name} arrow>
                  <span className="text-ellipsis overflow-hidden truncate text-base font-bold">
                    {company.name}
                  </span>
                </Tooltip>
                <p className="text-base">{company.place}</p>
              </div>
            </div>

            <div>
              <span className="text-base me-4 flex items-center mb-1">
                <AccountCircleOutlined
                  fontSize="inherit"
                  className="text-indigo-600 mr-1"
                />
                Matching Candidate: {company.candidate}
              </span>

              <div
                className="text-base flex"
                // onClick={() => handleMatchingDialog(company.avgScore)}
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
                Avg Score: {company.avgScore}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <StatusDialog
        title="Applicant Status"
        statusData={filterList.status}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedStatus={selectedStatus}
      />
      <MatchingSkillsDialog
        title="Matching Score Analysis"
        isMatchOpen={isMatchOpen}
        setIsMatchOpen={setIsMatchOpen}
        aiScore={matchingScore}
      />
    </div>
  );
};

export default RequirementDetails;
