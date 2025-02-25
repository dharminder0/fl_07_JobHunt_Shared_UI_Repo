import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CreateClientForm from "./CreateClientForm";
import ImportClientForm from "./ImportClientForm";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import MenuDrpDwn from "../../../sharedComponents/MenuDrpDwn";
import { getClientsList } from "../../../../components/sharedService/apiService";
import Loader from "../../../sharedComponents/Loader";
import { useSelector } from "react-redux";
import TablePreLoader from "../../../../components/sharedComponents/TablePreLoader";
import React from "react";

const clientDataObj = [
  {
    id: 1,
    name: "Airtel",
    requirement: 5,
    activeContracts: 10,
    pastContracts: 20,
    status: "Active",
    logo: "https://assets.airtel.in/static-assets/new-home/img/favicon-16x16.png",
  },
  {
    id: 2,
    name: "IBM Consulting",
    requirement: 7,
    activeContracts: 8,
    pastContracts: 16,
    status: "Active",
    logo: "https://www.ibm.com/content/dam/adobe-cms/default-images/favicon.svg",
  },
  {
    id: 3,
    name: "Capgemini",
    requirement: 3,
    activeContracts: 6,
    pastContracts: 13,
    status: "Active",
    logo: "https://www.capgemini.com/wp-content/uploads/2021/06/cropped-favicon.png?w=192",
  },
  {
    id: 4,
    name: "NTT DATA",
    requirement: 2,
    activeContracts: 5,
    pastContracts: 12,
    status: "Active",
    logo: "https://www.nttdata.com/global/en/-/media/assets/images/android-chrome-256256.png?rev=8dd26dac893a4a07bae174ff25e900ef",
  },
  {
    id: 5,
    name: "Cognizant",
    requirement: 4,
    activeContracts: 7,
    pastContracts: 17,
    status: "Active",
    logo: "https://companieslogo.com/img/orig/CTSH-82a8444b.png",
  },
];

export default function Clients() {
  const navigate = useNavigate();
  const location = useLocation();
  const [clientData, setclientData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<any>(1);
  const [status, setStatus] = useState<any>(1);
  const [pageSize, setPageSize] = useState<any>(10);
  const [clientList, setClientList] = useState<any[]>([]);
  const [isTableLoader, setIsTableLoader] = React.useState(true);
  const drawerState = useSelector((state: any) => state.drawer);

  const [searchFilter, setSearchFilter] = useState<any>({
    searchValue: "",
    status: [],
  });
  const [filterList, setFilterList] = useState<any>({
    status: ["Active", "Inactive"],
  });
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  useEffect(() => {
    // Filtering logic
    const filtered = clientDataObj.filter((item) => {
      // Check search input
      const statusMatch =
        searchFilter.status.length === 0 ||
        searchFilter.status.includes(item.status);
      const searchMatch =
        searchFilter.searchValue === "" ||
        item.name
          .toLowerCase()
          .includes(searchFilter.searchValue.toLowerCase());
      return searchMatch && statusMatch;
    });
    setclientData(filtered);
  }, [searchFilter]);

  const handleRowClick = (clientCode: number, tab: string) => {
    navigate(`${clientCode}?type=${tab}`, {
      state: { previousUrl: location.pathname },
    });
  };

  useEffect(() => {
    if (!drawerState.isOpen) {
      getClientsListData();
    }
  }, [drawerState]);

  useEffect(() => {
    if (searchValue?.length > 3 || searchValue?.length <= 0) {
      getClientsListData();
    }
  }, [searchValue]);

  const getClientsListData = () => {
    const payload = {
      searchText: searchValue,
      orgCode: userData?.orgCode,
      status: status,
      page: pageIndex,
      pageSize: pageSize,
    };
    setIsTableLoader(true);
    getClientsList(payload)
      .then((result: any) => {
        if (result?.count > 0) {
          setTimeout(() => {
            setClientList(result.list);
            setIsTableLoader(false);
          }, 1000);
        }
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsTableLoader(false);
        }, 1000);
      });
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
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search Client"
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
        <ImportClientForm />
        <CreateClientForm />
      </div>
      {/* {clientList && clientList?.length <= 0 && (
        <div className="flex justify-center align-center">
          <CircularProgress size={24} />
        </div>
      )} */}
      <div className="table-body">
        <table>
          <thead>
            <tr>
              <th className="add-right-shadow">Name</th>
              <th>Open Requirements</th>
              <th>Active Contracts</th>
              <th>Past Contracts</th>
              <th>Status</th>
            </tr>
          </thead>

          <TablePreLoader isTableLoader={isTableLoader} data={clientList} />

          <tbody>
            {clientList.map((item, index) => (
              <tr key={index}>
                <th
                  className="add-right-shadow wide-250 cursor-pointer hover:text-indigo-700"
                  onClick={() => handleRowClick(item.clientCode, "activeView")}
                >
                  <div className="flex">
                    {item?.logoURL && (
                      <img
                        src={item.faviconURL}
                        style={{ height: 16, width: 16 }}
                        className="me-1"
                      />
                    )}
                    {item.clientName}
                  </div>
                </th>
                <td
                  className="add-right-shadow wide-250 cursor-pointer hover:text-indigo-700"
                  onClick={() => handleRowClick(item.clientCode, "openView")}
                >
                  {item?.requirement || "-"}
                </td>
                <td
                  className="cursor-pointer hover:text-indigo-700"
                  onClick={() => handleRowClick(item.clientCode, "activeView")}
                >
                  {item?.activeContracts || "-"}
                </td>
                <td
                  className="cursor-pointer hover:text-indigo-700"
                  onClick={() => handleRowClick(item.clientCode, "pastView")}
                >
                  {item?.pastContracts || "-"}
                </td>
                <td>{item?.status === 1 ? "Active" : "Inactive"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
