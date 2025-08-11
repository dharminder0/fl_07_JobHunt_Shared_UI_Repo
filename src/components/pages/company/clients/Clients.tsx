import {
  Button,
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
import { useDispatch, useSelector } from "react-redux";
import TablePreLoader from "../../../../components/sharedComponents/TablePreLoader";
import React from "react";
import { AppDispatch } from "../../../../components/redux/store";
import { openDrawer } from "../../../../components/features/drawerSlice";
import { Add, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ClientStatus } from "../../../../components/sharedService/shareData";
import MenuDrpDwnV2 from "../../../../components/sharedComponents/MenuDrpDwnV2";

export default function Clients() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const [clientData, setclientData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<any>(1);
  const [status, setStatus] = useState<any>([]);
  const [pageSize, setPageSize] = useState<any>(15);
  const [clientList, setClientList] = useState<any[]>([]);
  const [isTableLoader, setIsTableLoader] = React.useState(true);
  const [clientCount, setClientCount] = useState<any>(0);
  const drawerState = useSelector((state: any) => state.drawer);

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

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
  }, [searchValue, status, pageIndex]);

  const getClientsListData = () => {
    const payload = {
      searchText: searchValue.trim(),
      orgCode: userData?.orgCode,
      status: status,
      page: pageIndex,
      pageSize: pageSize,
    };
    setIsTableLoader(true);
    getClientsList(payload)
      .then((result: any) => {
        setClientCount(result?.count);
        if (result?.count > 0) {
          setTimeout(() => {
            setClientList(result.list);
            setIsTableLoader(false);
          }, 500);
        } else {
          setTimeout(() => {
            setClientList([]);
            setIsTableLoader(false);
          }, 500);
        }
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsTableLoader(false);
        }, 1000);
      });
  };

  const handleDrawer = () => {
    dispatch(openDrawer({ drawerName: "AddClient" }));
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
              <MenuDrpDwnV2
                menuList={ClientStatus}
                placeholder="Status"
                handleSelectedItem={(selectedItems) => {
                  setStatus(selectedItems);
                }}
                selectedId={status}
              />
            </div>
          </div>
          <IconButton aria-label="filter">
            <FilterListOutlinedIcon />
          </IconButton>
        </div>
        {/* <ImportClientForm /> */}
        {/* <CreateClientForm /> */}
        <div className="flex flex-col my-auto mr-2">
          <Button variant="outlined" onClick={handleDrawer} startIcon={<Add />}>
            Add new client
          </Button>
        </div>
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
                    {item?.faviconURL && (
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
                  {item?.openRequirements || "-"}
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
      {clientCount > 15 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-2 sm:px-4">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-base text-gray-700">
                Showing <span>{(pageIndex - 1) * pageSize + 1}</span> to{" "}
                <span>{Math.min(pageIndex * pageSize, clientCount || 0)}</span>{" "}
                of <span>{clientCount || 0}</span> results
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
              disabled={pageIndex >= Math.ceil((clientCount || 0) / pageSize)}
            >
              <ChevronRight />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}
