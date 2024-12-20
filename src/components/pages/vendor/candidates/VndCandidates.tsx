import { Download } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuDrpDwn from "../../../../components/shared/MenuDrpDwn";
import StatusDialog from "../../../../components/shared/StatusDialog";
import MatchingSkillsDialog from "../../../../components/shared/MatchingSkillsDialog";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SearchIcon from "@mui/icons-material/Search";

const applicantData = [
  {
    id: 1,
    name: "Harshit Tandon",
    requirement: "React js Developer",
    client: "Sterlite Technologies",
    status: "In Review",
    date: "13-07-2024",
    ai: 50,
    logo: "https://static.ambitionbox.com/assets/v2/images/rs:fit:200:200:false:false/bG9jYWw6Ly8vbG9nb3Mvb3JpZ2luYWxzL3N0ZXJsaXRlLXRlY2hub2xvZ2llcy5qcGc.webp",
  },
  {
    id: 2,
    name: "Raj Pathar",
    requirement: "Sr. Angular developer",
    client: "upGrad",
    status: "Shortlisted",
    date: "12-06-2024",
    ai: 60,
    logo: "https://prod-mphs.upgrad.com/hubfs/45938370-0-Gloop-01%20(1).webp",
  },
  {
    id: 3,
    name: "Sajid Sarkar",
    requirement: "React Native mobile developer",
    client: "Xoriant",
    status: "New",
    date: "18-05-2024",
    ai: 65,
    logo: "https://www.xoriant.com/cdn/ff/2zqY0wtIPH_7bO8GKthC5LM_btmFMJbTa_6fDC9hg-M/1693224947/public/favicon.png",
  },
  {
    id: 4,
    name: "Amit Kumar",
    requirement: "Frontend developer",
    client: "Iris Software",
    status: "Placed",
    date: "11-04-2024",
    ai: 63,
    logo: "https://www.irissoftware.com/wp-content/uploads/2020/11/favicon.png",
  },
  {
    id: 5,
    name: "Harshit Tandon",
    requirement: ".Net developer",
    client: "Infinite Computer Solutions",
    status: "Placed",
    date: "13-07-2024",
    ai: 70,
    logo: "https://www.infinite.com/wp-content/uploads/2023/03/favicon.png",
  },
  {
    id: 6,
    name: "Raj Pathar",
    requirement: ".Net MVC Support",
    client: "QualityKiosk Technologies",
    status: "Interview Round I",
    date: "12-06-2024",
    ai: 80,
    logo: "https://qualitykiosk.com/wp-content/uploads/2021/08/Logo_QK_Brand-Mark_Black-300x300.png",
  },
  {
    id: 7,
    name: "Sajid Sarkar",
    requirement: "Azure Devops Engineer",
    client: "Zoho",
    status: "Rejected",
    date: "18-05-2024",
    ai: 75,
    logo: "https://www.zohowebstatic.com/sites/zweb/images/favicon.ico",
  },
  {
    id: 8,
    name: "Amit Kumar",
    requirement: "Devops AWS Certified engineer",
    client: "Onward Technologies",
    status: "Hired",
    date: "11-04-2024",
    ai: 68,
    logo: "https://www.onwardgroup.com/images/favicon.svg",
  },
];

export default function VndCandidates() {
  const location = useLocation();
  const params = location.state || {};
  const [search, setSearch] = useState("");
  const [filteredApplicants, setFilteredApplicants] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState("New");
  const [matchingScore, setMatchingScore] = React.useState(0);
  const [filterList, setFilterList] = useState<any>({
    client: ["upGrad", "Iris Software", "Sterlite Technologies"],
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

  const [searchFilter, setSearchFilter] = useState<any>({
    searchValue: "",
    client: [],
    status: !params?.status ? [] : [params?.status],
  });

  useEffect(() => {
    // Filtering logic
    const filtered = applicantData.filter((item) => {
      // Check client filter
      const statusMatch =
        searchFilter.status.length === 0 ||
        searchFilter.status.includes(item.status);
      // Check client filter
      const clientMatch =
        searchFilter.client.length === 0 ||
        searchFilter.client.includes(item.client);
      // Check search input
      const searchMatch =
        searchFilter.searchValue === "" ||
        item.name
          .toLowerCase()
          .includes(searchFilter.searchValue.toLowerCase()) ||
        item.requirement
          .toLowerCase()
          .includes(searchFilter.searchValue.toLowerCase());

      return clientMatch && statusMatch && searchMatch;
    });
    setFilteredApplicants(filtered);
  }, [searchFilter, setFilteredApplicants]);

  const navigate = useNavigate();
  const handleRowClick = (id: number) => {
    navigate(`/vendor/clients/${id}?type=activeView`, {
      state: { previousUrl: location.pathname },
    });
  };

  const handleStatusDialog = (status: string) => {
    setIsDialogOpen(true);
    setSelectedStatus(status);
  };

  const handleMatchingDialog = (score: number) => {
    setIsMatchOpen(true);
    setMatchingScore(score);
  };

  return (
    <div className="px-4 py-1">
      <div className="flex flex-row gap-1 justify-end mb-1">
        <div className="flex flex-row gap-1 p-1 overflow-hidden">
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
                menuList={filterList?.client}
                placeholder="Client"
                handleSelectedItem={(selectedItems) => {
                  setSearchFilter({ ...searchFilter, client: selectedItems });
                }}
              />
            </div>
            <div className="max-w-full shrink-0">
              <MenuDrpDwn
                menuList={filterList?.status}
                placeholder="Status"
                handleSelectedItem={(selectedItems) => {
                  setSearchFilter({ ...searchFilter, status: selectedItems });
                }}
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
              <th className="add-right-shadow">Candidate Name</th>
              <th>Requirement</th>
              {/* <th>Client</th> */}
              <th>Status</th>
              <th>Application Date</th>
              {/* <th>CV</th> */}
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
                      onClick={() => handleRowClick(applicant.id)}
                    >
                      <img
                        src={applicant.logo}
                        style={{ height: 12, width: 12 }}
                        className="me-1"
                      />
                      <Tooltip title={applicant.vendor} arrow>
                        <span className="text-ellipsis overflow-hidden truncate">
                          {applicant.client}
                        </span>
                      </Tooltip>
                    </div>
                    <div className="flex text-info">
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
                {/* <td className="wide-250 cursor-pointer">
                  <div className="flex items-center">
                    <img
                      src={applicant.logo}
                      style={{ height: 16, width: 16 }}
                      className="me-1"
                    />
                    {applicant.client}
                  </div>
                </td> */}
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
                {/* <td>
                  <Button
                  className="pointer-events-none"
                    variant="outlined"
                    size="small"
                    startIcon={<PictureAsPdf />}
                  >
                    Download
                  </Button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StatusDialog
        title="Applicant Status"
        statusData={filterList.status}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedStatus={selectedStatus}
        isVendor={true}
      />
      <MatchingSkillsDialog
        title="Matching Score Analysis"
        isMatchOpen={isMatchOpen}
        setIsMatchOpen={setIsMatchOpen}
        aiScore={matchingScore}
      />
    </div>
  );
}
