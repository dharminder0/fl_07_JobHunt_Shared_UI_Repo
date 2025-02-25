import MenuDrpDwn from "../../../sharedComponents/MenuDrpDwn";
import StatusDialog from "../../../sharedComponents/StatusDialog";
import MatchingSkillsDialog from "../../../sharedComponents/MatchingSkillsDialog";
import { Download } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const applicantData = [
  {
    id:1,
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
    id:2,
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
    id:3,
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
    id:4,
    vendor: "SDET Tech Pvt. Ltd",
    name: "Amit Kumar",
    requirement: "Frontend developer",
    client: "NTT DATA",
    status: "Placed",
    date: "11-04-2024",
    ai: 80,
    vendorLogo:
      "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
    clientLogo:
      "https://www.nttdata.com/global/en/-/media/assets/images/android-chrome-256256.png?rev=8dd26dac893a4a07bae174ff25e900ef",
  },
  {
    id:5,
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
  {
    id:6,
    vendor: "SDET Tech Pvt. Ltd",
    name: "Vaibhav Rastogi",
    requirement: "Devops AWS Certified engineer",
    client: "NTT DATA",
    status: "Interview Round I",
    date: "11-04-2024",
    ai: 76,
    vendorLogo:
      "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
    clientLogo:
      "https://www.nttdata.com/global/en/-/media/assets/images/android-chrome-256256.png?rev=8dd26dac893a4a07bae174ff25e900ef",
  },
  {
    id:7,
    vendor: "DevStringX Technologies",
    name: "Raj Pathar",
    requirement: ".Net MVC Support",
    client: "IBM Consulting",
    status: "Shortlisted",
    date: "12-06-2024",
    ai: 56,
    vendorLogo:
      "https://www.devstringx.com/wp-content/uploads/2018/03/favicon.ico",
    clientLogo:
      "https://www.ibm.com/content/dam/adobe-cms/default-images/favicon.svg",
  },
  {
    id:8,
    vendor: "Binemiles Technologies",
    name: "Sajid Sarkar",
    requirement: "Azure Devops Engineer",
    client: "Capgemini",
    status: "Rejected",
    date: "18-05-2024",
    ai: 82,
    vendorLogo:
      "https://binmile.com/wp-content/uploads/2022/07/bmt-favicon.png",
    clientLogo:
      "https://binmile.com/wp-content/uploads/2022/07/bmt-favicon.png",
  },
  {
    id:9,
    vendor: "SDET Tech Pvt. Ltd",
    name: "Amit Kumar",
    requirement: "Devops AWS Certified engineer",
    client: "NTT DATA",
    status: "Interview Round I",
    date: "11-04-2024",
    ai: 55,
    vendorLogo:
      "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
    clientLogo:
      "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
  },
];

export default function MyCandidates() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.state || {};
  const [filteredApplicants, setFilteredApplicants] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState("New");
  const [matchingScore, setMatchingScore] = React.useState(0);

  const [filterList, setFilterList] = useState<any>({
    client: ["Airtel", "IBM Consulting", "Capgemini", "NTT DATA"],
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

  const handleRowClick = (id: number, type: string) => {
    switch (type) {
      case "vendor":
        navigate(`/company/myvendors/${id}?type=activeView`,{ state: { previousUrl: location.pathname },})
        break;
      case "client":
        navigate(`/company/clients/${id}?type=activeView`, { state: { previousUrl: location.pathname },})
        break;
    }
  };

  useEffect(() => {
    // Filtering logic
    const filtered = applicantData.filter((item) => {
      // Check status filter
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
          .includes(searchFilter.searchValue.toLowerCase());
      return statusMatch && searchMatch && clientMatch;
    });
    setFilteredApplicants(filtered);
  }, [searchFilter, setFilteredApplicants]);

  const handleStatusDialog = (status: string) => {
    setIsDialogOpen(true);
    setSelectedStatus(status);
  };

  const handleMatchingDialog = (score: number) => {
    setIsMatchOpen(true);
    setMatchingScore(score);
  };

  return (
    <div className="px-4 py-1 h-full">
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
              {/* <th>Vendor</th> */}
              <th>Role</th>
              <th className="wide-200">Client</th>
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
                      onClick={() => handleRowClick(applicant.id, "vendor")}
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
                        className="flex cursor-pointer hover:text-indigo-700"
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
                      <div className="ms-2 text-indigo-500 cursor-pointer hover:text-indigo-700">
                        <Download fontSize="inherit" />
                        <span className="text-info">CV</span>
                      </div>
                    </div>
                  </div>
                </th>
                {/* <td className="wide-250">
                  <div className="flex ">
                    <img
                      src={applicant.vendorLogo}
                      style={{ height: 16, width: 16 }}
                      className="me-1"
                    />
                    {applicant.vendor}
                  </div>
                </td> */}
                <td>{applicant.requirement}</td>
                <td
                  className="wide-200 cursor-pointer hover:text-indigo-700"
                  onClick={() => handleRowClick(applicant.id, "client")}
                >
                  <div className="flex">
                    <img
                      src={applicant.clientLogo}
                      style={{ height: 16, width: 16 }}
                      className="me-1"
                    />
                    {applicant.client}
                  </div>
                </td>
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
