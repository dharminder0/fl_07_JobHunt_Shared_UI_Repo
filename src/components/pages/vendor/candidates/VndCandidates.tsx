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
import MenuDrpDwn from "../../../sharedComponents/MenuDrpDwn";
import StatusDialog from "../../../sharedComponents/StatusDialog";
import MatchingSkillsDialog from "../../../sharedComponents/MatchingSkillsDialog";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../components/redux/store";
import { openDrawer } from "../../../../components/features/drawerSlice";
import { getApplicantsList } from "../../../../components/sharedService/apiService";
import moment from "moment";
import MenuDrpDwnV2 from "../../../../components/sharedComponents/MenuDrpDwnV2";
import { ApplicantsStatus } from "../../../../components/sharedService/shareData";
import TablePreLoader from "../../../../components/sharedComponents/TablePreLoader";
import { useClientList } from "../../../../components/hooks/useClientList";
import MenuDrpDwnByValue from "../../../../components/sharedComponents/MenuDrpDwnByValue";
import { ApplicationEnums } from "../../../../components/sharedService/enums";
import IconAi from "../../../../components/sharedComponents/IconAi";

export default function VndCandidates() {
  const location = useLocation();
  const params = location.state || {};
  const dispatch: AppDispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const [applicantData, setApplicantData] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isMatchOpen, setIsMatchOpen] = React.useState(false);
  const [isTableLoader, setIsTableLoader] = React.useState(true);
  const [selectedStatus, setSelectedStatus] = React.useState("New");
  const [searchValue, setSearchValue] = React.useState("");
  const [status, setStatus] = React.useState<any[]>([]);
  const [client, setClient] = React.useState<any[]>([]);
  const [pageIndex, setPageIndex] = React.useState<any>(1);
  const [matchingScore, setMatchingScore] = React.useState(0);

  const navigate = useNavigate();
  const handleRowClick = (clientCode: number) => {
    navigate(`/vendor/clients/${clientCode}?type=activeView`, {
      state: { previousUrl: location.pathname },
    });
  };

  const clientList = useClientList(userData?.orgCode);

  useEffect(() => {
    if (searchValue?.length > 2 || searchValue?.length == 0) {
      getApplicantsListData();
    }
  }, [searchValue, status, pageIndex, client]);

  const getApplicantsListData = () => {
    const payload = {
      searchText: searchValue,
      clientOrgName: client,
      status: status,
      userId: userData.userId,
      page: pageIndex,
      pageSize: 10,
    };
    setIsTableLoader(true);
    getApplicantsList(payload)
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

  const handleStatusDialog = (status: string) => {
    setIsDialogOpen(true);
    setSelectedStatus(status);
  };

  const handleMatchingDialog = (score: number) => {
    setIsMatchOpen(true);
    setMatchingScore(score);
  };

  const handleOpenDrawer = (name: string, cvData: any) => {
    dispatch(openDrawer({ drawerName: name, data: cvData }));
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
                handleSelectedItem={(selectedItems) => setClient(selectedItems)}
              />
            </div>
            <div className="max-w-full shrink-0">
              <MenuDrpDwnV2
                menuList={ApplicantsStatus}
                placeholder="Status"
                handleSelectedItem={(selectedItems) => setStatus(selectedItems)}
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
              <th>Status</th>
              <th>Application Date</th>
            </tr>
          </thead>

          <TablePreLoader isTableLoader={isTableLoader} data={applicantData} />

          <tbody>
            {applicantData.map((applicant, index) => (
              <tr key={index}>
                <th className="add-right-shadow">
                  <div className="cursor-pointer hover:text-indigo-700">
                    {applicant.firstName} {applicant.lastName}
                  </div>
                  <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                    <div
                      className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700"
                      onClick={() => handleRowClick(applicant.clientCode)}
                    >
                      {applicant.clientOrgLogo && (
                        <img
                          src={applicant.clientOrgLogo}
                          style={{ height: 12, width: 12 }}
                          className="me-1"
                        />
                      )}
                      <Tooltip title={applicant.clientOrgName} arrow>
                        <span className="text-ellipsis overflow-hidden truncate">
                          {applicant.clientOrgName}
                        </span>
                      </Tooltip>
                    </div>
                    <div className="flex text-info">
                      <div
                        className="flex cursor-pointer"
                        onClick={() =>
                          handleMatchingDialog(applicant.matchScore)
                        }
                      >
                        <IconAi />
                        <span> {applicant.matchScore || 0}%</span>
                      </div>
                      <div
                        className="ms-2 text-indigo-500 cursor-pointer hover:text-indigo-700 "
                        onClick={() =>
                          handleOpenDrawer("benchPreview", applicant?.cv)
                        }
                      >
                        <Download fontSize="inherit" />
                        <span className="text-info">CV</span>
                      </div>
                    </div>
                  </div>
                </th>
                <td>{applicant.title}</td>
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
                    onClick={() => handleStatusDialog(applicant.statusName)}
                  >
                    {applicant.statusName}
                  </Typography>
                </td>
                <td>
                  {moment(applicant.applicationDate).format("DD-MM-YYYY")}
                </td>
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
