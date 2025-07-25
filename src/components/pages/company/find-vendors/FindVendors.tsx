import { useEffect, useState } from "react";
import {
  TextField,
  Chip,
  IconButton,
  InputAdornment,
  Tooltip,
  Avatar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuDrpDwnV2 from "../../../sharedComponents/MenuDrpDwnV2";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import {
  getOrgDetailsList,
  getSkillsList,
} from "../../../../components/sharedService/apiService";
import MenuDrpDwn from "../../../sharedComponents/MenuDrpDwn";
import Loader from "../../../sharedComponents/Loader";
import {
  ChevronLeft,
  ChevronRight,
  CorporateFareOutlined,
} from "@mui/icons-material";
import { RoleType } from "../../../../components/sharedService/enums";
import HtmlRenderer from "../../../../components/sharedComponents/HtmlRenderer";
import React from "react";
import NoDataAvailable from "../../../../components/sharedComponents/NoDataAvailable";

const FindVendors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const [companiesfilterData, setcompaniesfilterData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [technology, setTechnology] = useState<string[]>([]);
  const [resource, setResource] = useState<any[]>([]);
  const [strength, setStrength] = useState<string[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [records, setRecords] = React.useState<any>({});

  const [filterList, setFilterList] = useState<any>({
    TechnologiesList: [],
    requirementType: [
      {
        id: 1,
        name: "Onsite",
        value: "Onsite",
      },
      {
        id: 2,
        name: "Hybrid",
        value: "Hybrid",
      },
      {
        id: 3,
        name: "Remote",
        value: "Remote",
      },
    ],
    companyStrength: ["0-10", "10-50", "50-100", "100-500", "500+"],
  });

  // const handleDetails = (id: number) => {
  //   navigate(`${id}`);
  // };

  const handleDetails = (id: number) => {
    navigate(`${id}?type=benchView`, {
      state: { previousUrl: location.pathname },
    });
  };

  const getOrgDetailsListData = () => {
    const payload = {
      role: RoleType.Vendor,
      orgCode: userData?.orgCode,
      page: pageIndex,
      pageSize: pageSize,
      searchText: searchText.trim(),
      technology,
      resource,
      strength,
    };
    setIsLoader(true);
    getOrgDetailsList(payload)
      .then((result: any) => {
        setRecords(result);
        if (result.count > 0) {
          setcompaniesfilterData(result.list);
        } else {
          setcompaniesfilterData([]);
        }
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      });
  };

  const getSkillList = () => {
    getSkillsList().then((result: any) => {
      if (result) {
        setFilterList((prev: any) => ({
          ...prev,
          TechnologiesList: result,
        }));
      }
    });
  };

  useEffect(() => {
    if (searchText?.length > 2 || searchText?.length == 0) {
      getOrgDetailsListData();
    }
  }, [searchText, technology, resource, strength, pageIndex]);

  useEffect(() => {
    getSkillList();
  }, []);

  return (
    <div className="px-4 pb-4">
      {/* Header */}

      {/* Search and Filters */}
      <div className="flex justify-between items-center mt-1">
        <h5 className="text-heading">Find Vendors</h5>
        <div className="flex flex-row gap-1 justify-end mb-1">
          <div className="flex flex-row gap-1 p-1 overflow-hidden">
            <div className="flex text-center flex-nowrap my-auto">
              <div className="flex grow w-[220px] mr-2">
                <div className="flex-col flex-grow">
                  <TextField
                    size="small"
                    className="w-full"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
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
              <div className="max-w-full shrink-0">
                <MenuDrpDwn
                  menuList={filterList?.TechnologiesList}
                  placeholder="Technologies"
                  handleSelectedItem={(selectedItems) => {
                    setTechnology(selectedItems);
                  }}
                />
              </div>
              <div className="max-w-full shrink-0">
                <MenuDrpDwnV2
                  menuList={filterList?.requirementType}
                  placeholder="Resources"
                  handleSelectedItem={(selectedItems) =>
                    setResource(selectedItems)
                  }
                />
              </div>
              <div className="max-w-full shrink-0">
                <MenuDrpDwn
                  menuList={filterList?.companyStrength}
                  placeholder="Strength"
                  handleSelectedItem={(selectedItems) => {
                    setStrength(selectedItems);
                  }}
                />
              </div>
            </div>
            <IconButton aria-label="filter">
              <FilterListOutlinedIcon />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Sidebar and Companies List */}
      {!isLoader ? (
        <div className="">
          {/* Company Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {companiesfilterData &&
              companiesfilterData?.length > 0 &&
              companiesfilterData.map((company, idx) => (
                <div onClick={() => handleDetails(company.orgCode)}>
                  <div className="h-full border p-4 rounded-md cursor-pointer">
                    <div className="flex align-center mb-4">
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
                        {company.location[0] && (
                          <p className="line-clamp-1 text-base">
                            {company.location[0]}
                          </p>
                        )}
                        {company?.statusName && (
                          <p
                            className={`line-clamp-1 text-base ${
                              company?.status === 2
                                ? "text-green-600"
                                : company?.status === 3
                                  ? "text-red-500"
                                  : company?.status === 0 ||
                                      company?.status === 1
                                    ? "text-orange-500"
                                    : ""
                            }`}
                          >
                            {company?.statusName}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-base line-clamp-2">
                      <HtmlRenderer content={company?.description} />
                    </p>
                    {/* <div className="flex flex-wrap h-16 mt-2">
                    {company.tags.map((tag: string, idx: any) => (
                      <Chip
                        key={idx}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: 10 }}
                        className="my-1 me-1"
                      />
                    ))}
                  </div> */}
                  </div>
                </div>
              ))}
          </div>
          {companiesfilterData && companiesfilterData?.length <= 0 ? (
            <NoDataAvailable />
          ) : (
            <div className="flex items-center justify-between border-gray-200 bg-white p-2 sm:px-4">
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
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default FindVendors;
