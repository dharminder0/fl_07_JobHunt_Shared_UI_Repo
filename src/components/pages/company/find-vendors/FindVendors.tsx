import { useEffect, useState } from "react";
import {
  TextField,
  Chip,
  IconButton,
  InputAdornment,
  Tooltip,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuDrpDwnV2 from "../../../sharedComponents/MenuDrpDwnV2";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { getOrgDetailsList } from "../../../../components/sharedService/apiService";
import MenuDrpDwn from "../../../sharedComponents/MenuDrpDwn";
import Loader from "../../../sharedComponents/Loader";
import { CorporateFareOutlined } from "@mui/icons-material";
import { RoleType } from "../../../../components/sharedService/enums";
import HtmlRenderer from "../../../../components/sharedComponents/HtmlRenderer";

const FindVendors = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const [companiesfilterData, setcompaniesfilterData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [technology, setTechnology] = useState<string[]>([]);
  const [resource, setResource] = useState<any[]>([]);
  const [strength, setStrength] = useState<string[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filterList, setFilterList] = useState<any>({
    TechnologiesList: [
      "Mobile App Development",
      "Front-End Development",
      "Back-End Development",
      "Full-Stack Development",
      "Cloud Technologies",
      "Artificial Intelligence (AI)",
      "Machine Learning (ML)",
      "Blockchain Development",
      "Data Science & Analytics",
      "Cybersecurity Solutions",
      "Internet of Things (IoT)",
      "DevOps",
      "QA",
      "QA Automation",
      "Augmented Reality (AR)",
      "Virtual Reality (VR)",
      "Progressive Web Applications (PWA)",
      "Microservices Architecture",
      "Low-Code/No-Code Development",
      "Robotic Process Automation (RPA)",
      "5G & Edge Computing Solutions",
    ],
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

  const handleDetails = (id: number) => {
    navigate(`${id}`);
  };

  const getOrgDetailsListData = () => {
    const payload = {
      role: [RoleType.Vendor],
      orgCode: userData?.orgCode,
      page: pageIndex,
      pageSize: pageSize,
      searchText,
      technology,
      resource,
      strength,
    };
    setIsLoader(true);
    getOrgDetailsList(payload)
      .then((result: any) => {
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

  useEffect(() => {
    getOrgDetailsListData();
  }, [searchText, technology, resource, strength, pageIndex, pageSize]);

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
        <div className="flex">
          {/* Company Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {companiesfilterData &&
              companiesfilterData?.length > 0 &&
              companiesfilterData.map((company, idx) => (
                <div onClick={() => handleDetails(company.orgCode)}>
                  <div className="h-100 border p-4 rounded-md cursor-pointer">
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
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default FindVendors;
