// App.tsx
import { useEffect, useState } from "react";
import {
  TextField,
  Chip,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuDrpDwnV2 from "../../../../components/shared/MenuDrpDwnV2";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { getOrgDetailsList } from "../../../../components/sharedService/apiService";
import MenuDrpDwn from "../../../../components/shared/MenuDrpDwn";
import Loader from "../../../../components/shared/Loader";

const companies = [
  {
    id: 1,
    name: "Cyient Limited",
    description:
      "Stripe is a software platform for starting and running internet businesses with this platform.",
    tags: ["Onsite", "50-100", "Full-Stack Development"],
    place: "Noida",
    logo: "https://www.cyient.com/hubfs/enhancer.png",
  },
  {
    id: 2,
    name: "3Pillar Global Noida",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "10-50", "Mobile App Development"],
    place: "Delhi(NCR)",
    logo: "https://www.3pillarglobal.com/favicon.png",
  },
  {
    id: 3,
    name: "Exzeo Software Pvt Ltd",
    description:
      "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Remote", "500+", "Front-End Development"],
    place: "Gurgaon",
    logo: "https://binmile.com/wp-content/uploads/2022/07/bmt-favicon.png",
  },
  {
    id: 4,
    name: "Nucleus Software Exports ",
    description:
      "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Hybrid", "0-10", "Full-Stack Development"],
    place: "Mumbai",
    logo: "https://sdettech.com/wp-content/themes/sdetech/assets/images/favicon.png",
  },
  {
    id: 5,
    name: "Ucodice Technologies IT ",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Remote", "100-200", "Front-End Development"],
    place: "Pune",
    logo: "https://www.ucodice.com/images/new_logo_for_white_background.png",
  },
  {
    id: 6,
    name: "Shadow infosystem(P) ",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Hybrid", "50-100", "Cloud Technologies"],
    place: "Pune",
    logo: "https://www.shadowinfosystem.com/static/media/shadow-png-logo2-1.53ac2f8235b19116a576.png",
  },
  {
    id: 7,
    name: "Nexthoughts Software Technologies",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "100-200", "Mobile App Development"],
    place: "Pune",
    logo: "https://nexthoughts.com/wp-content/uploads/2019/12/cropped-Fevicon-logo-192x192.png",
  },
  {
    id: 8,
    name: "GrapeCity India Private ",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Hybrid", "10-50", "Mobile App Development"],
    place: "Pune",
    logo: "https://static.wixstatic.com/media/81da1e_1ce1c15b17274da5bc0c8193c28f4780%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/81da1e_1ce1c15b17274da5bc0c8193c28f4780%7Emv2.png",
  },
  {
    id: 7,
    name: "Eastern Software Solutions",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Remote", "50-100", "Full-Stack Development"],
    place: "Pune",
    logo: "https://www.essindia.com/assets/img/favicon.png",
  },
];

const MyClients = () => {
  const navigate = useNavigate();
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
      role: ["2"],
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
        console.error("Error fetching data:", error);
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
                      <img
                        src={
                          !company.logo
                            ? "/assets/images/Companylogo.png"
                            : company.logo
                        }
                        alt={company.orgName}
                        className="me-3"
                        style={{ width: 50, height: 50 }}
                      />
                      <div>
                        <Tooltip title={company.orgName} arrow>
                          <p className="text-title line-clamp-1 font-bold">
                            {company.orgName}
                          </p>
                        </Tooltip>
                        <p className="line-clamp-1 text-base">
                          {company.place}
                        </p>
                      </div>
                    </div>
                    <Tooltip title={company.description} arrow>
                      <p className="text-base line-clamp-2">
                        {company.description}
                      </p>
                    </Tooltip>
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

export default MyClients;
