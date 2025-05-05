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
import { getClientApplicantsList } from "../../../../components/sharedService/apiService";
import moment from "moment";
import { ApplicantsStatus } from "../../../../components/sharedService/shareData";
import MenuDrpDwnV2 from "../../../../components/sharedComponents/MenuDrpDwnV2";
import TablePreLoader from "../../../../components/sharedComponents/TablePreLoader";
import MenuDrpDwnByValue from "../../../../components/sharedComponents/MenuDrpDwnByValue";
import { useClientList } from "../../../../components/hooks/useClientList";
import { ApplicationEnums } from "../../../../components/sharedService/enums";
import IconAi from "../../../../components/sharedComponents/IconAi";
import { openDrawer } from "../../../../components/features/drawerSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/components/redux/store";

export default function MyCandidates() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const params = location.state || {};
  const [filteredApplicants, setFilteredApplicants] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState("New");
  const [selectedApplicant, setSelectedApplicant] = React.useState({});
  const [selectedClients, setSelectedClients] = React.useState<any[]>([]);
  const [isTableLoader, setIsTableLoader] = React.useState(true);
  const [matchingScore, setMatchingScore] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  const [status, setStatus] = React.useState<any[]>([]);
  const [pageIndex, setPageIndex] = React.useState<any>(1);
  const [applicantData, setApplicantData] = useState<any[]>([]);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const handleRowClick = (id: number, type: string) => {
    switch (type) {
      case "vendor":
        navigate(`/company/myvendors/${id}?type=activeView`, {
          state: { previousUrl: location.pathname },
        });
        break;
      case "client":
        navigate(`/company/clients/${id}?type=activeView`, {
          state: { previousUrl: location.pathname },
        });
        break;
    }
  };

  const handleStatusDialog = (applicant: any) => {
    setIsDialogOpen(true);
    setSelectedApplicant({
      resourceId: [applicant.resourceId],
      requirementUniqueId: applicant.requirementUniqueId,
      userId: userData.userId,
      comment: !applicant.comment ? "" : applicant.comment,
    });
    setSelectedStatus(applicant.statusName);
  };

  const handleMatchingDialog = (score: number) => {
    setIsMatchOpen(true);
    setMatchingScore(score);
  };

  useEffect(() => {
    if (searchValue?.length > 2 || searchValue?.length == 0) {
      getApplicantsListData();
    }
  }, [searchValue, status, pageIndex, selectedClients]);

  const getApplicantsListData = () => {
    const payload = {
      searchText: searchValue,
      client: selectedClients,
      status: status,
      resources: [],
      orgCode: userData.orgCode,
      page: 1,
      pageSize: 10,
    };
    setIsTableLoader(true);
    getClientApplicantsList(payload)
      .then((result: any) => {
        if (result?.list && result?.list.length > 0) {
          setApplicantData(result.list);
          setIsTableLoader(false);
        } else {
          setApplicantData([]);
          setIsTableLoader(false);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching bench details:", error);
        setApplicantData([]);
        setIsTableLoader(false);
      });
  };

  const clientList = useClientList(userData?.orgCode);

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
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
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
                handleSelectedItem={(selectedItems) => {
                  setSelectedClients(selectedItems);
                }}
              />
            </div>
            <div className="max-w-full shrink-0">
              <MenuDrpDwnV2
                menuList={ApplicantsStatus}
                placeholder="Status"
                handleSelectedItem={(selectedItems) => {
                  setStatus(selectedItems);
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

          <TablePreLoader isTableLoader={isTableLoader} data={applicantData} />

          <tbody>
            {applicantData.map((applicant, index) => (
              <tr key={index}>
                <th className="add-right-shadow">
                  <div>{applicant.firstName + " " + applicant.lastName}</div>
                  <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                    <div
                      className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700"
                      onClick={() =>
                        handleRowClick(applicant.vendorOrgCode, "vendor")
                      }
                    >
                      <img
                        src={applicant?.vendorLogo}
                        style={{ height: 12, width: 12 }}
                        className="me-1"
                      />
                      <Tooltip title={applicant.vendorOrgName} arrow>
                        <span className="text-ellipsis overflow-hidden truncate">
                          {applicant.vendorOrgName}
                        </span>
                      </Tooltip>
                    </div>
                    <div className="flex text-info items-center">
                      <div
                        className="flex cursor-pointer hover:text-indigo-700"
                        onClick={() => handleMatchingDialog(applicant.ai || 75)}
                      >
                        <IconAi />
                        <span> {applicant.ai || 75}%</span>
                      </div>
                      <div
                        className="ms-2 text-indigo-500 cursor-pointer hover:text-indigo-700"
                        onClick={() =>
                          dispatch(
                            openDrawer({
                              drawerName: "benchPreview",
                              data: JSON.parse(applicant.cv),
                            })
                          )
                        }
                      >
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
                <td>{applicant.role}</td>
                <td
                  className="wide-200 cursor-pointer hover:text-indigo-700"
                  onClick={() => handleRowClick(applicant.clientCode, "client")}
                >
                  <div className="flex">
                    {applicant?.clientLogo && (
                      <img
                        src={applicant?.clientLogo}
                        style={{ height: 16, width: 16 }}
                        className="me-1"
                      />
                    )}
                    {applicant.clientName || "Self"}
                  </div>
                </td>
                <td>
                  <Typography
                    className={`inline-block px-3 py-1 !text-base rounded-full cursor-pointer ${
                      applicant.status === ApplicationEnums.Selected
                        ? "bg-green-100 text-green-700"
                        : applicant.status === ApplicationEnums.Rejected
                          ? "bg-red-100 text-red-700"
                          : applicant.status === ApplicationEnums.New
                            ? "bg-orange-100 text-orange-700"
                            : "bg-indigo-100 text-indigo-700"
                    }`}
                    onClick={() => handleStatusDialog(applicant)}
                  >
                    {applicant.statusName}
                  </Typography>
                </td>
                <td>
                  {moment(applicant.applicationDate).format("DD-MM-YYYY")}
                </td>
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
        statusData={ApplicantsStatus}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedStatus={selectedStatus}
        selectedRow={selectedApplicant}
        onFinish={getApplicantsListData}
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
