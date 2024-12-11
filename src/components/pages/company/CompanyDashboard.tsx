import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  Avatar,
  LinearProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import JobStatistics from "../../common/JobStatistics.tsx";
import { useNavigate } from 'react-router-dom';

interface CompanyDashboardProps {}

const CompanyDashboard: React.FC<CompanyDashboardProps> = () => {
  const navigate = useNavigate();
  const applicantData = [
    { label: "Full Time", value: 45, color: "bg-purple-500" },
    { label: "Part-Time", value: 24, color: "bg-green-500" },
    { label: "Remote", value: 22, color: "bg-blue-500" },
    { label: "Internship", value: 32, color: "bg-yellow-500" },
    { label: "Contract", value: 30, color: "bg-red-500" },
  ];

  const organizationList = [
    {
      title:"Nomad",
      orgType:"Company",
      icon: <svg width="37" height="44" viewBox="0 0 37 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 11.1201V32.4538L18.8241 43.471L19.2494 42.7861L18.8241 22.0811L1.13004 11.1328L0.5 11.1201Z" fill="#449B82" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M36.9501 11.02V32.6542L18.8242 43.4713V22.0812L36.2862 11.0363L36.9501 11.02Z" fill="#9BDB9C" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.725 0.402832L36.95 11.0196L18.8241 22.4377L0.5 11.1198L18.725 0.402832Z" fill="#56CDAD" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.8783 8.91113L21.7143 12.5597V19.9238L15.5383 16.2154L9.59961 19.7306V35.1226L15.7636 31.3002V23.015L22.3473 27.2177L27.8783 23.7879V8.91113Z" fill="white" />
      </svg>,
      redirectTo: "/company"     
    },
    {
      title:"Fleek",
      orgType:"Vendor",
      icon: <svg width="37" height="44" viewBox="0 0 37 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 11.1201V32.4538L18.8241 43.471L19.2494 42.7861L18.8241 22.0811L1.13004 11.1328L0.5 11.1201Z" fill="#449B82" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M36.9501 11.02V32.6542L18.8242 43.4713V22.0812L36.2862 11.0363L36.9501 11.02Z" fill="#9BDB9C" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.725 0.402832L36.95 11.0196L18.8241 22.4377L0.5 11.1198L18.725 0.402832Z" fill="#56CDAD" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.8783 8.91113L21.7143 12.5597V19.9238L15.5383 16.2154L9.59961 19.7306V35.1226L15.7636 31.3002V23.015L22.3473 27.2177L27.8783 23.7879V8.91113Z" fill="white" />
      </svg>,
      redirectTo: "/vendor"           
    },
  ]
  const [selectedOrg, setSelectedOrg] = useState<any>(organizationList[0]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (orgObj?:any) => {
    if(orgObj){
      setSelectedOrg(orgObj);
      navigate(orgObj.redirectTo);
    }
    setAnchorEl(null);
  };

  return (
    <>
      <div className="h-[82px] px-8 py-4 shadow-[0px_-1px_0px_0px_#D6DDEB_inset] flex justify-between">
        <div className='flex gap-5'>
          <div className="icon">{selectedOrg?.icon}</div>
          <div className="dropdown flex flex-col" 
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
          >
            <div className="org font-[Epilogue] font-normal text-base">{selectedOrg?.orgType}</div>
            <div className="title flex flex-row gap-2">
              <div className='font-semibold font-[Epilogue] text-[20px]/[24px]'>{selectedOrg?.title}</div>
              <div>
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5 8.5L12.5 15.5L5.5 8.5" stroke="#25324B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {
              organizationList.map((item)=> (
                <MenuItem className='w-[160px]' onClick={()=>handleClose(item)}>{item.title}</MenuItem>
              ))

            }
          </Menu>
        </div>
        <div className='flex flex-row gap-8'>
          <svg className='my-auto' width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9824 20.2365C11.5004 20.8144 12.1654 21.132 12.8554 21.132H12.8564C13.5494 21.132 14.2174 20.8144 14.7364 20.2355C15.0144 19.928 15.4884 19.9029 15.7954 20.1804C16.1034 20.4579 16.1284 20.9336 15.8514 21.2411C15.0434 22.1396 13.9804 22.6344 12.8564 22.6344H12.8544C11.7334 22.6334 10.6724 22.1386 9.86743 21.2401C9.59043 20.9326 9.61543 20.4569 9.92343 20.1804C10.2314 19.9019 10.7054 19.927 10.9824 20.2365ZM12.9052 1.09912C17.3502 1.09912 20.3362 4.56681 20.3362 7.80511C20.3362 9.47084 20.7592 10.177 21.2082 10.9262C21.6522 11.6654 22.1552 12.5048 22.1552 14.0914C21.8062 18.1451 17.5812 18.4756 12.9052 18.4756C8.22923 18.4756 4.00323 18.1451 3.65822 14.1555C3.65523 12.5048 4.15823 11.6654 4.60223 10.9262L4.75897 10.662C5.1449 9.99757 5.47423 9.27488 5.47423 7.80511C5.47423 4.56681 8.46023 1.09912 12.9052 1.09912ZM12.9052 2.60158C9.41023 2.60158 6.97423 5.34408 6.97423 7.80511C6.97423 9.88753 6.39723 10.8501 5.88723 11.6995C5.47823 12.3816 5.15523 12.9205 5.15523 14.0914C5.32223 15.9805 6.56723 16.9731 12.9052 16.9731C19.2082 16.9731 20.4922 15.9364 20.6582 14.0263C20.6552 12.9205 20.3322 12.3816 19.9232 11.6995C19.4132 10.8501 18.8362 9.88753 18.8362 7.80511C18.8362 5.34408 16.4002 2.60158 12.9052 2.60158Z" fill="#25324B" />
            <path d="M18.5 9.58065C20.4338 9.58065 22 8.01067 22 6.07573C22 4.14078 20.4338 2.5708 18.5 2.5708C16.5662 2.5708 15 4.14078 15 6.07573C15 8.01067 16.5662 9.58065 18.5 9.58065Z" fill="#FF6550" stroke="white" />
          </svg>
          <Button variant="contained" className='bg-[#4640DE]'>
            <svg className='mr-[10px]' width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_279_16506)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 4C13.0523 4 13.5 4.44772 13.5 5V19C13.5 19.5523 13.0523 20 12.5 20C11.9477 20 11.5 19.5523 11.5 19V5C11.5 4.44772 11.9477 4 12.5 4Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 12C4.5 11.4477 4.94772 11 5.5 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H5.5C4.94772 13 4.5 12.5523 4.5 12Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_279_16506">
                  <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                </clipPath>
              </defs>
            </svg>
            <span>Post a job</span>

          </Button>
        </div>
      </div>
      <div className="h-[calc(100%-82px)] overflow-auto">
        <div className="flex">
          <div className="flex-1 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <Typography variant="h5" className="font-bold">
                Good morning, Maria
              </Typography>
              {/* <Button variant="contained" color="primary" className="text-white">
                Post a Job
              </Button> */}
              <svg width="180" height="51" viewBox="0 0 180 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="1" width="179" height="49" fill="white" />
                <rect x="0.5" y="1" width="179" height="49" stroke="#D6DDEB" />
                <path d="M20.096 29.66C19.2853 29.66 18.6267 29.5 18.12 29.18C17.6133 28.8547 17.2427 28.404 17.008 27.828C16.7733 27.2467 16.656 26.5693 16.656 25.796C16.656 25.716 16.656 25.6387 16.656 25.564C16.656 25.484 16.656 25.4067 16.656 25.332H18C18 25.38 18 25.4333 18 25.492C18 25.5453 18 25.6013 18 25.66C18 26.204 18.0693 26.684 18.208 27.1C18.3467 27.516 18.568 27.8413 18.872 28.076C19.1813 28.3107 19.5893 28.428 20.096 28.428C20.5973 28.428 21 28.3107 21.304 28.076C21.608 27.8413 21.8293 27.508 21.968 27.076C22.1067 26.6387 22.176 26.124 22.176 25.532V17.7H23.536V25.708C23.536 26.2787 23.4747 26.804 23.352 27.284C23.2293 27.764 23.032 28.1827 22.76 28.54C22.4933 28.892 22.1413 29.1667 21.704 29.364C21.2667 29.5613 20.7307 29.66 20.096 29.66ZM29.0163 29.652C28.4083 29.652 27.9016 29.548 27.4963 29.34C27.0909 29.1267 26.7683 28.852 26.5283 28.516C26.2936 28.18 26.1256 27.8173 26.0243 27.428C25.9283 27.0333 25.8803 26.6547 25.8803 26.292C25.8803 26.0893 25.8803 25.8813 25.8803 25.668C25.8803 25.4493 25.8803 25.2307 25.8803 25.012V21.004H27.2483V24.836C27.2483 25.0333 27.2483 25.228 27.2483 25.42C27.2483 25.612 27.2483 25.7933 27.2483 25.964C27.2483 26.396 27.3069 26.796 27.4243 27.164C27.5469 27.532 27.7576 27.8307 28.0563 28.06C28.3549 28.284 28.7656 28.396 29.2883 28.396C29.7789 28.396 30.2083 28.2493 30.5763 27.956C30.9443 27.6573 31.2323 27.2867 31.4403 26.844C31.6483 26.396 31.7523 25.9507 31.7523 25.508L32.5443 25.836C32.5443 26.3053 32.4616 26.7667 32.2963 27.22C32.1309 27.668 31.8936 28.076 31.5843 28.444C31.2803 28.812 30.9096 29.1053 30.4723 29.324C30.0403 29.5427 29.5549 29.652 29.0163 29.652ZM31.7523 29.5V21.004H33.1123V29.5H31.7523ZM36.938 16.996V29.5H35.594V16.996H36.938ZM46.8191 17.66V29.5H45.4591V19.14C45.4165 19.1987 45.2831 19.276 45.0591 19.372C44.8405 19.468 44.5685 19.5613 44.2431 19.652C43.9231 19.7373 43.5818 19.7987 43.2191 19.836V18.604C43.5765 18.5453 43.9125 18.4627 44.2271 18.356C44.5471 18.2493 44.8191 18.1347 45.0431 18.012C45.2671 17.884 45.4165 17.7667 45.4911 17.66H46.8191ZM53.1889 29.66C52.6022 29.66 52.1195 29.5587 51.7409 29.356C51.3675 29.148 51.0769 28.8867 50.8689 28.572C50.6609 28.2573 50.5142 27.932 50.4289 27.596C50.3489 27.26 50.3089 26.9613 50.3089 26.7C50.3089 26.6893 50.3089 26.684 50.3089 26.684C50.3089 26.6787 50.3089 26.6733 50.3089 26.668H51.5889C51.5889 26.6733 51.5889 26.6787 51.5889 26.684C51.5889 26.684 51.5889 26.6893 51.5889 26.7C51.5889 26.892 51.6102 27.092 51.6529 27.3C51.7009 27.5027 51.7835 27.692 51.9009 27.868C52.0182 28.044 52.1809 28.1853 52.3889 28.292C52.6022 28.3987 52.8715 28.452 53.1969 28.452C53.6289 28.452 54.0129 28.276 54.3489 27.924C54.6849 27.5667 54.9489 26.9587 55.1409 26.1C55.3382 25.236 55.4369 24.0467 55.4369 22.532H56.0929C56.0929 23.092 55.9515 23.5827 55.6689 24.004C55.3915 24.4253 55.0209 24.7533 54.5569 24.988C54.0982 25.2173 53.5969 25.332 53.0529 25.332C52.3809 25.332 51.8075 25.1693 51.3329 24.844C50.8635 24.5133 50.5035 24.0627 50.2529 23.492C50.0022 22.916 49.8769 22.2573 49.8769 21.516C49.8769 20.7373 50.0075 20.052 50.2689 19.46C50.5302 18.8627 50.9169 18.396 51.4289 18.06C51.9409 17.724 52.5675 17.556 53.3089 17.556C54.0822 17.556 54.7222 17.7773 55.2289 18.22C55.7355 18.6573 56.1115 19.2707 56.3569 20.06C56.6075 20.844 56.7329 21.7587 56.7329 22.804C56.7329 24.068 56.6422 25.1373 56.4609 26.012C56.2795 26.8867 56.0262 27.5933 55.7009 28.132C55.3809 28.6653 55.0049 29.0547 54.5729 29.3C54.1462 29.54 53.6849 29.66 53.1889 29.66ZM53.1729 24.132C53.5995 24.132 53.9782 24.0307 54.3089 23.828C54.6395 23.6253 54.8982 23.34 55.0849 22.972C55.2769 22.604 55.3729 22.1693 55.3729 21.668C55.3729 21.1293 55.2875 20.6413 55.1169 20.204C54.9515 19.7613 54.7142 19.4093 54.4049 19.148C54.0955 18.8867 53.7275 18.756 53.3009 18.756C52.8529 18.756 52.4769 18.8627 52.1729 19.076C51.8689 19.2893 51.6395 19.596 51.4849 19.996C51.3302 20.3907 51.2529 20.868 51.2529 21.428C51.2529 21.9507 51.3249 22.4173 51.4689 22.828C51.6182 23.2333 51.8369 23.5533 52.1249 23.788C52.4129 24.0173 52.7622 24.132 53.1729 24.132ZM62.5714 25.404V24.54H68.1394V25.404H62.5714ZM77.5335 29.66C76.7228 29.66 76.0642 29.5 75.5575 29.18C75.0508 28.8547 74.6802 28.404 74.4455 27.828C74.2108 27.2467 74.0935 26.5693 74.0935 25.796C74.0935 25.716 74.0935 25.6387 74.0935 25.564C74.0935 25.484 74.0935 25.4067 74.0935 25.332H75.4375C75.4375 25.38 75.4375 25.4333 75.4375 25.492C75.4375 25.5453 75.4375 25.6013 75.4375 25.66C75.4375 26.204 75.5068 26.684 75.6455 27.1C75.7842 27.516 76.0055 27.8413 76.3095 28.076C76.6188 28.3107 77.0268 28.428 77.5335 28.428C78.0348 28.428 78.4375 28.3107 78.7415 28.076C79.0455 27.8413 79.2668 27.508 79.4055 27.076C79.5442 26.6387 79.6135 26.124 79.6135 25.532V17.7H80.9735V25.708C80.9735 26.2787 80.9122 26.804 80.7895 27.284C80.6668 27.764 80.4695 28.1827 80.1975 28.54C79.9308 28.892 79.5788 29.1667 79.1415 29.364C78.7042 29.5613 78.1682 29.66 77.5335 29.66ZM86.4538 29.652C85.8458 29.652 85.3391 29.548 84.9338 29.34C84.5284 29.1267 84.2058 28.852 83.9658 28.516C83.7311 28.18 83.5631 27.8173 83.4618 27.428C83.3658 27.0333 83.3178 26.6547 83.3178 26.292C83.3178 26.0893 83.3178 25.8813 83.3178 25.668C83.3178 25.4493 83.3178 25.2307 83.3178 25.012V21.004H84.6858V24.836C84.6858 25.0333 84.6858 25.228 84.6858 25.42C84.6858 25.612 84.6858 25.7933 84.6858 25.964C84.6858 26.396 84.7444 26.796 84.8618 27.164C84.9844 27.532 85.1951 27.8307 85.4938 28.06C85.7924 28.284 86.2031 28.396 86.7258 28.396C87.2164 28.396 87.6458 28.2493 88.0138 27.956C88.3818 27.6573 88.6698 27.2867 88.8778 26.844C89.0858 26.396 89.1898 25.9507 89.1898 25.508L89.9818 25.836C89.9818 26.3053 89.8991 26.7667 89.7338 27.22C89.5684 27.668 89.3311 28.076 89.0218 28.444C88.7178 28.812 88.3471 29.1053 87.9098 29.324C87.4778 29.5427 86.9924 29.652 86.4538 29.652ZM89.1898 29.5V21.004H90.5498V29.5H89.1898ZM94.3755 16.996V29.5H93.0315V16.996H94.3755ZM100.649 29.5V28.324C100.691 28.084 100.817 27.8093 101.025 27.5C101.233 27.1853 101.489 26.8573 101.793 26.516C102.097 26.1747 102.417 25.8387 102.753 25.508C103.094 25.172 103.414 24.8627 103.713 24.58C104.086 24.228 104.451 23.8627 104.809 23.484C105.171 23.1 105.473 22.6947 105.713 22.268C105.953 21.8413 106.073 21.3933 106.073 20.924C106.073 20.2253 105.91 19.692 105.585 19.324C105.259 18.956 104.771 18.772 104.121 18.772C103.598 18.772 103.179 18.8813 102.865 19.1C102.55 19.3187 102.323 19.6253 102.185 20.02C102.046 20.4147 101.977 20.876 101.977 21.404H100.609C100.609 20.6413 100.737 19.972 100.993 19.396C101.249 18.8147 101.638 18.364 102.161 18.044C102.683 17.7187 103.342 17.556 104.137 17.556C104.867 17.556 105.478 17.7 105.969 17.988C106.459 18.2707 106.827 18.6653 107.073 19.172C107.323 19.6787 107.449 20.2653 107.449 20.932C107.449 21.3693 107.366 21.7933 107.201 22.204C107.041 22.6093 106.83 22.996 106.569 23.364C106.307 23.7267 106.025 24.0653 105.721 24.38C105.422 24.6893 105.137 24.9693 104.865 25.22C104.427 25.62 104.014 26.0093 103.625 26.388C103.241 26.7667 102.918 27.116 102.657 27.436C102.401 27.756 102.246 28.0307 102.193 28.26H107.529V29.5H100.649ZM116.358 18.892H111.75L111.334 22.78C111.35 22.716 111.404 22.6307 111.494 22.524C111.59 22.4173 111.729 22.308 111.91 22.196C112.097 22.084 112.329 21.9907 112.606 21.916C112.884 21.8413 113.209 21.804 113.582 21.804C114.553 21.804 115.289 22.1507 115.79 22.844C116.297 23.5373 116.55 24.452 116.55 25.588C116.55 26.4627 116.414 27.204 116.142 27.812C115.876 28.42 115.489 28.8813 114.982 29.196C114.476 29.5053 113.862 29.66 113.142 29.66C112.561 29.66 112.054 29.5747 111.622 29.404C111.196 29.228 110.844 28.9827 110.566 28.668C110.294 28.3533 110.089 27.9853 109.95 27.564C109.817 27.1427 109.75 26.6813 109.75 26.18C109.75 26.1747 109.75 26.172 109.75 26.172C109.75 26.1667 109.75 26.1613 109.75 26.156H111.102C111.102 26.1613 111.102 26.1667 111.102 26.172C111.102 26.172 111.102 26.1747 111.102 26.18C111.108 26.9853 111.289 27.5667 111.646 27.924C112.009 28.2813 112.513 28.46 113.158 28.46C113.574 28.46 113.932 28.356 114.23 28.148C114.534 27.94 114.766 27.6253 114.926 27.204C115.092 26.7827 115.174 26.252 115.174 25.612C115.174 24.7587 115.017 24.1107 114.702 23.668C114.393 23.2253 113.937 23.004 113.334 23.004C112.945 23.004 112.604 23.0813 112.31 23.236C112.017 23.3853 111.774 23.5693 111.582 23.788C111.396 24.0067 111.262 24.2147 111.182 24.412L109.87 24.076L110.598 17.7H116.358V18.892Z" fill="#25324B" />
                <g clip-path="url(#clip0_1_5270)">
                  <path d="M159.001 19.6665H149.001C148.08 19.6665 147.334 20.4127 147.334 21.3332V31.3332C147.334 32.2536 148.08 32.9998 149.001 32.9998H159.001C159.921 32.9998 160.667 32.2536 160.667 31.3332V21.3332C160.667 20.4127 159.921 19.6665 159.001 19.6665Z" stroke="#4640DE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M157.334 18V21.3333" stroke="#4640DE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M150.666 18V21.3333" stroke="#4640DE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M147.334 24.6665H160.667" stroke="#4640DE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M152.333 28H150.666V29.6667H152.333V28Z" stroke="#4640DE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_1_5270">
                    <rect width="20" height="20" fill="white" transform="translate(144 15.5)" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Overview Cards */}
            <Grid container spacing={2} className="mb-6">
              <Grid item xs={12} md={4}>
                <Card sx={{ background: "#4640DE" }}>
                  <CardContent>
                    <Typography variant="h6" color="white">
                      76
                    </Typography>
                    <Typography color="white">New candidates to review</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ background: "#56CDAD" }}>
                  <CardContent>
                    <Typography variant="h6" color="white">
                      3
                    </Typography>
                    <Typography color="white">Schedule for today</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ background: "#26A4FF" }}>
                  <CardContent>
                    <Typography variant="h6" color="white">
                      24
                    </Typography>
                    <Typography color="white">Messages received</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Job Statistics */}
            <div className="flex items-center justify-between mb-4">
              <JobStatistics />
              <Box className="p-6 gap-6 w-1/3">
                {/* Job Open Card */}
                <Box className="bg-white border-2 p-4 mb-2">
                  <Typography variant="h6" className="text-gray-900 font-bold">
                    Job Open
                  </Typography>
                  <Typography variant="h4" className="text-gray-900 font-bold mt-2">
                    12
                  </Typography>
                  <Typography className="text-gray-500">Jobs Opened</Typography>
                </Box>

                {/* Applicants Summary Card */}
                <Box className="bg-white border-2 p-4">
                  <Typography variant="h6" className="text-gray-900 font-bold">
                    Applicants Summary
                  </Typography>
                  <Typography variant="h4" className="text-gray-900 font-bold mt-2">
                    67
                  </Typography>
                  <Typography className="text-gray-500">Applicants</Typography>

                  {/* Progress Bars */}
                  <Box className="mt-4">
                    {applicantData.map((item, index) => (
                      <Box key={index} className="mb-3">
                        <Box className="flex justify-between mb-1">
                          <Typography className="text-sm text-gray-600">
                            {item.label}
                          </Typography>
                          <Typography className="text-sm text-gray-600">
                            {item.value}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(item.value / 67) * 100} // Percentage calculation
                          className={`h-2 rounded ${item.color}`}
                          sx={{ background: item.color }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </div>

            {/* Job Updates */}
            <Typography variant="h6">Job Updates</Typography>

            <Grid container spacing={2}>
              {[1, 2, 3, 4].map((job) => (
                <Grid item xs={12} sm={6} md={3} key={job}>
                  <Card>
                    <CardContent>
                      <Avatar className="mb-2">A</Avatar>
                      <Typography variant="h6">Social Media Assistant</Typography>
                      <Typography>Nomad - Paris, France</Typography>
                      <Typography className="text-sm text-gray-500">
                        5 applied of 10 capacity
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>     
    </>
  );
};

export default CompanyDashboard;