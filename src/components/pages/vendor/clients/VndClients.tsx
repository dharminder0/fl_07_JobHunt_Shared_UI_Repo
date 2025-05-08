// App.tsx
import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Chip,
  InputAdornment,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import {
  InvitedType,
  RoleType,
} from "../../../../components/sharedService/enums";
import { getOnboardInvitedList } from "../../../../components/sharedService/apiService";
import { CorporateFareOutlined } from "@mui/icons-material";
import HtmlRenderer from "../../../../components/sharedComponents/HtmlRenderer";
import NoDataAvailable from "../../../sharedComponents/NoDataAvailable";
import Loader from "../../../sharedComponents/Loader";

const VndClients = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const handleDetails = (id: number) => {
    navigate(`${id}?type=activeView`, {
      state: { previousUrl: location.pathname },
    });
  };

  const [tabValue, setTabValue] = React.useState("Active");
  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [isLoader, setIsLoader] = React.useState<boolean>(true);
  const [archivedDatafilterData, setarchivedDatafilterData] = useState<any[]>(
    []
  );
  const [activeDataList, setActiveDataList] = useState<any[]>([]);
  const [searchFilter, setSearchFilter] = useState<any>({
    searchValue: "",
  });

  useEffect(() => {
    getOrgRequestList();
  }, [tabValue]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const getOrgRequestList = () => {
    const payload = {
      // orgCode: userData?.orgCode,
      relatedOrgCode: userData?.orgCode,
      relationshipType: [RoleType.Vendor],
      status:
        tabValue === "Active" ? InvitedType.Accepted : InvitedType.Archived,
      page: pageIndex,
      pageSize: pageSize,
    };
    setIsLoader(true);
    getOnboardInvitedList(payload)
      .then((result: any) => {
        if (result.count > 0) {
          setActiveDataList(result.list);
        } else {
          setActiveDataList([]);
        }
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      });
  };

  return (
    <div className="px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 mt-1">
        <div className="w-1/2">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab value="Active" label="Active Partners" />
            <Tab value="Archived" label="Archived Partners" />
          </Tabs>
        </div>
        <div className="w-1/2 flex flex-row justify-end">
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
                    placeholder="Search Vendors"
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
            </div>
            <IconButton aria-label="filter">
              <FilterListOutlinedIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <>
        {isLoader ? (
          <Loader />
        ) : (
          <>
            {tabValue == "Active" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {activeDataList &&
                    activeDataList?.length > 0 &&
                    activeDataList.map((company, idx) => (
                      <div>
                        <div className="h-100 border p-4 rounded-md cursor-pointer">
                          <div className="flex align-center mb-3">
                            <Avatar
                              alt="Org Icon"
                              src={company.logo || undefined}
                              className="rounded-full !h-10 !w-10 me-3"
                            >
                              {!company.logo && (
                                <CorporateFareOutlined fontSize="small" />
                              )}
                            </Avatar>
                            <div>
                              <Tooltip title={company.orgName} arrow>
                                <p className="text-title line-clamp-1 font-bold">
                                  {company.orgName}
                                </p>
                              </Tooltip>
                              <p className="line-clamp-1 text-base">
                                {company?.location[0] || "-"}
                              </p>
                            </div>
                          </div>

                          <p className="text-base line-clamp-2">
                            <HtmlRenderer content={company?.description} />
                          </p>
                          <div className="flex flex-wrap mt-2">
                            <Chip
                              label={company?.empCount}
                              size="small"
                              variant="outlined"
                              className="my-1 me-1 !text-info"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {activeDataList && activeDataList?.length <= 0 && (
                  <NoDataAvailable />
                )}
              </>
            )}

            {tabValue == "Archived" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {activeDataList &&
                    activeDataList?.length > 0 &&
                    activeDataList.map((company, idx) => (
                      <div>
                        <div className="h-100 border p-4 rounded-md cursor-pointer">
                          <div className="flex align-center mb-3">
                            <Avatar
                              alt="Org Icon"
                              src={company.logo || undefined}
                              className="rounded-full !h-10 !w-10 me-3"
                            >
                              {!company.logo && (
                                <CorporateFareOutlined fontSize="small" />
                              )}
                            </Avatar>
                            <div>
                              <Tooltip title={company.orgName} arrow>
                                <p className="text-title line-clamp-1 font-bold">
                                  {company.orgName}
                                </p>
                              </Tooltip>
                              <p className="line-clamp-1 text-base">
                                {company?.location[0] || "-"}
                              </p>
                            </div>
                          </div>

                          <p className="text-base line-clamp-2">
                            <HtmlRenderer content={company?.description} />
                          </p>
                          <div className="flex flex-wrap mt-2">
                            <Chip
                              label={company?.empCount}
                              size="small"
                              variant="outlined"
                              className="my-1 me-1 !text-info"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {activeDataList && activeDataList?.length <= 0 && (
                  <NoDataAvailable />
                )}
              </>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default VndClients;
