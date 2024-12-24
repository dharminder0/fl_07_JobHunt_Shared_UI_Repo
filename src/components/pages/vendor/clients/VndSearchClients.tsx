// App.tsx
import { FilterList, Search } from "@mui/icons-material";
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Chip,
  Box,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import MenuDrpDwn from "../../../../components/shared/MenuDrpDwn";

const companies = [
  {
    id: 1,
    name: "Motherson Technology",
    description:"Stripe is a software platform for starting and running internet businesses.",
    tags: ["Onsite", "50-100", "Full-Stack Development"],
    place: "Noida",
    logo: "https://www.mothersontechnology.com/wp-content/uploads/2021/06/cropped-cropped-favicon-192x192.png",
  },
  {
    id: 2,
    name: "Axtria",
    description:"Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "10-50", "Mobile App Development"],
    place: "Delhi(NCR)",
    logo: "https://39530062.fs1.hubspotusercontent-na1.net/hub/39530062/hubfs/Axtria/Home/Axtria_Logo-300x102.png?width=300&height=102&name=Axtria_Logo-300x102.png",
  },
  {
    id: 3,
    name: "MPS Limited",
    description: "Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Remote", "500+", "Front-End Development"],
    place: "Gurgaon",
    logo: "https://d12ux7ql5zx5ks.cloudfront.net/wp-content/uploads/MPS_LOGO_37df55fb0f6fe049cc780587d3693251-11.png",
  },
  {
    id: 4,
    name: "Orient Technologies",
    description:"Square builds common business tools in unconventional ways and used best technologies...",
    tags: ["Hybrid", "0-10", "Full-Stack Development"],
    place: "Mumbai",
    logo: "https://static.ambitionbox.com/assets/v2/images/rs:fit:200:200:false:false/bG9jYWw6Ly8vbG9nb3Mvb3JpZ2luYWxzL29yaWVudC10ZWNobm9sb2dpZXMuanBn.webp",
  },
  {
    id: 5,
    name: "Nucleus Software Exports",
    description: "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Remote", "100-200", "Front-End Development"],
    place: "Gujrat",
    logo: "https://static.ambitionbox.com/assets/v2/images/rs:fit:200:200:false:false/bG9jYWw6Ly8vbG9nb3Mvb3JpZ2luYWxzL251Y2xldXMtc29mdHdhcmUtZXhwb3J0cy5qcGc.webp",
  },
  {
    id: 6,
    name: "Unimoni",
    description:  "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Hybrid", "50-100", "Cloud Technologies"],
    place: "Gurgaon",
    logo: "https://www.unimoni.in/images/icon/favicon.ico",
  },
  {
    id: 7,
    name: "Damco Solutions",
    description:"Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Onsite", "100-200", "Mobile App Development"],
    place: "Pune",
    logo: "https://www.damcogroup.com/wp-content/themes/DamcoNew/images/favicon.ico",
  },
  {
    id: 8,
    name: "Foray Software",
    description:  "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Hybrid", "10-50", "Mobile App Development"],
    place: "Gurgaon",
    logo: "https://www.foraysoft.com/assets/images/favicon.png",
  },
  {
    id: 7,
    name: "Impetus Technologies",
    description:"Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Remote", "50-100", "Full-Stack Development"],
    place: "Pune",
    logo: "https://www.impetus.com/wp-content/uploads/2022/02/cropped-favicon-32x32.png",
  },
];

const VndSearchClients = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [companiesfilterData, setcompaniesfilterData] = useState<any[]>([]);
   const [searchFilter, setSearchFilter] = useState<any>({
     searchValue: "",
     technologies:[],
     requirementType: [],
     companyStrength: [],
   });
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
     requirementType: ["Remote", "Hybrid", "Onsite"],
     companyStrength: [ "0-10",
       "10-50",
       "50-100",
       "100-500",
       "500+"],
   });
 

  useEffect(() => {
     const filtered = companies.filter((item) => {
       const searchMatch =
         !searchFilter.searchValue ||
         item.name.toLowerCase().includes(searchFilter.searchValue.toLowerCase());
         const TechnologieMatch =
         searchFilter.technologies.length === 0 ||
         searchFilter.technologies.some((tech:any) => item.tags.includes(tech));
         const requirementTypeMatch =
         searchFilter.requirementType.length === 0 ||
         searchFilter.requirementType.some((tech:any) => item.tags.includes(tech));
         const CompanyStrengthMatch =
         searchFilter.companyStrength.length === 0 ||
         searchFilter.companyStrength.some((tech:any) => item.tags.includes(tech));
       return searchMatch && TechnologieMatch && requirementTypeMatch && CompanyStrengthMatch;
     });
     setcompaniesfilterData(filtered)
 
   }, [searchFilter]);

  const handleDetails = (id: number) => {
    navigate(`${id}?type=activeView`, {
      state: { previousUrl: location.pathname },
    });
  };
  return (
    <div className="px-4 py-1">
      {/* Header */}

      {/* Search and Filters */}
      <div className="flex justify-between items-center">
        <h5 className="text-heading">Search Clients</h5>      
         <div className="flex justify-end items-center">
            <div className="flex flex-row gap-1 justify-end mb-1">
              <div className='flex flex-row gap-1 p-1 overflow-hidden'>
                <div className='flex text-center flex-nowrap my-auto'>
                  <div className='flex grow w-[220px] mr-2'>
                    <div className='flex-col flex-grow'>
                      <TextField
                        size='small'
                        className='w-full'
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
                              <InputAdornment position='start'>
                                <SearchIcon fontSize='inherit' />
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
                    setSearchFilter({ ...searchFilter, technologies: selectedItems });
                  }}
                />
              </div>
              <div className="max-w-full shrink-0">
                <MenuDrpDwn
                  menuList={filterList?.requirementType}
                  placeholder="Resources"
                  handleSelectedItem={(selectedItems) => {
                    setSearchFilter({ ...searchFilter, requirementType: selectedItems });
                  }}
                />
                </div>
              <div className="max-w-full shrink-0">
                <MenuDrpDwn
                  menuList={filterList?.companyStrength}
                  placeholder="Strength"
                  handleSelectedItem={(selectedItems) => {
                    setSearchFilter({ ...searchFilter, companyStrength: selectedItems });
                  }}
                />
              </div>
                </div>
                  <IconButton aria-label='filter'>
                    <FilterListOutlinedIcon />
                  </IconButton>
              </div>
            </div>
          </div>
      </div>

      {/* Sidebar and Companies List */}
      <div className="flex">
        {/* Sidebar */}
        {/* <div className="w-[200px]">
          <div className="grid">
            <p className="text-title ">Technologies</p>
            {[
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
            ].map((size, idx) => (
              <FormControlLabel
                key={idx}
                control={<Checkbox />}
                label={size}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "12px", // Set your desired font size
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                }}
              />
            ))}
          </div>
          <div className="grid">
            <p className="text-title mt-2">Resources</p>
            {["Onsite", "Offsite", "Hybrid"].map((industry, idx) => (
              <FormControlLabel
                key={idx}
                control={<Checkbox />}
                label={industry}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "12px", // Set your desired font size
                  },
                }}
              />
            ))}
          </div>
          <div className="grid mt-2">
            <p className="text-title">Company Strength</p>
            {[
              "0-10 (15)",
              "10-50 (26)",
              "50-100 (45)",
              "100-500 (20)",
              "500+ (19)",
            ].map((size, idx) => (
              <FormControlLabel
                key={idx}
                control={<Checkbox />}
                label={size}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "12px", // Set your desired font size
                  },
                }}
              />
            ))}
          </div>
        </div> */}

        {/* Company Cards */}        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" >
            {companiesfilterData.map((company, idx) => (
              <div onClick={() => handleDetails(company.id)} >
                <div className="h-100 border p-4 rounded-md cursor-pointer">
                  <div className="flex align-center mb-4">
                    <img
                      src={
                        !company.logo
                          ? "/assets/images/Companylogo.png"
                          : company.logo
                      }
                      alt={company.name}
                      className="me-3"
                      style={{ width: 50, height: 50 }}
                    />
                    <div>
                      <Tooltip title={company.name} arrow>
                        <p className="text-title line-clamp-1 font-bold">{company.name}</p>
                      </Tooltip>
                      <p className="line-clamp-1 text-base">{company.place}</p>
                    </div>
                  </div>
                  <Tooltip title={company.description} arrow>
                  <p className="text-base line-clamp-2">{company.description}</p>
                  </Tooltip>
                  <div className="flex flex-wrap mt-2">
                    {company.tags.map((tag:string, idx:any) => (
                      <Chip
                        key={idx}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: 10 }}
                        className="my-1 me-1"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default VndSearchClients;
