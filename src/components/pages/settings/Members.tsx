import { useEffect, useState } from "react";
import {
  Add,
  CancelOutlined,
  CheckCircleOutlineOutlined,
  ChevronLeft,
  ChevronRight,
  DeleteOutlineOutlined,
  FilterList,
  PersonOffOutlined,
  PersonOutlineRounded,
  PersonRemoveOutlined,
  Search,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import AddNewMemberForm from "../../sharedComponents/AddNewMemberForm";
import { openDrawer } from "../../../components/features/drawerSlice";
import { AppDispatch } from "../../../components/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMember,
  getMembersList,
} from "../../../components/sharedService/apiService";
import moment from "moment";
import TablePreLoader from "../../../components/sharedComponents/TablePreLoader";
import React from "react";
import { result } from "lodash";

export default function Members() {
  const dispatch: AppDispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [isTableLoader, setIsTableLoader] = useState(true);
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [membersList, setMembersList] = useState<any[]>([]);
  const [records, setRecords] = React.useState<any>({});
  const [isDeleteLoader, setIsDeleteLoader] = React.useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);
  const [memberId, setMemberId] = React.useState<number>();

  const drawerState = useSelector((state: any) => state.drawer);

  const handleOpenDrawer = (name: string, data?: any) => {
    dispatch(openDrawer({ drawerName: name, data: data }));
  };

  useEffect(() => {
    if (search?.length > 2 || search?.length == 0) {
      getMemberListData();
    }
  }, [search, pageIndex]);

  useEffect(() => {
    if (!drawerState.isOpen) {
      getMemberListData();
    }
  }, [drawerState]);

  const getMemberListData = () => {
    const payload = {
      searchText: search,
      orgCode: userData?.orgCode,
      access: [],
      status: 1,
      page: pageIndex,
      pageSize: pageSize,
    };
    setIsTableLoader(true);
    getMembersList(payload)
      .then((result: any) => {
        setRecords(result);
        if (result.count > 0) {
          setMembersList(result.list);
        } else {
          setMembersList([]);
        }
        setTimeout(() => {
          setIsTableLoader(false);
        }, 1000);
      })
      .catch(() => {
        setMembersList([]);
        setTimeout(() => {
          setIsTableLoader(false);
        }, 1000);
      });
  };

  const handleConfirmPopup = (id: number) => {
    setIsPopupOpen(true);
    setMemberId(id);
  };

  const handleDeleteMember = () => {
    setIsDeleteLoader(true);
    deleteMember(memberId)
      .then((result: any) => {
        if (result) {
          setTimeout(() => {
            setIsDeleteLoader(false);
            setIsPopupOpen(false);
            getMemberListData();
          }, 1000);
        }
      })
      .catch((error: any) => {
        setTimeout(() => {
          setIsDeleteLoader(false);
        }, 1000);
      });
  };

  return (
    <>
      <div className="px-4 py-3">
        <Box className="flex items-center justify-end mb-2">
          <Box className="flex items-center space-x-4">
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search className="mr-2" fontSize="small" />,
              }}
            />
            <Button variant="outlined" startIcon={<FilterList />}>
              Filter
            </Button>
            {/* <AddNewMemberForm /> */}
            <Button
              variant="outlined"
              onClick={() => handleOpenDrawer("InviteNewMember")}
              startIcon={<Add />}
            >
              Invite new team member
            </Button>
          </Box>
        </Box>
        <div className="table-body">
          <table>
            <thead>
              <tr>
                <th className="add-right-shadow">Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Access</th>
                <th>Status</th>
                <th>Joining Date</th>
              </tr>
            </thead>

            <TablePreLoader isTableLoader={isTableLoader} data={membersList} />

            <tbody>
              {membersList.map((member, index) => (
                <tr key={index}>
                  <th className="add-right-shadow group/item">
                    <div className="flex justify-between">
                      <div
                        onClick={() =>
                          handleOpenDrawer("UpdateDetails", member)
                        }
                        className="cursor-pointer hover:text-indigo-700"
                      >
                        {member.firstName} {member.lastName}
                      </div>
                      {member.userName !== userData.email && (
                        <div className="group/edit invisible group-hover/item:visible">
                          <div
                            className="text-title text-red-700 cursor-pointer"
                            onClick={() => {
                              handleConfirmPopup(member.id);
                            }}
                          >
                            <DeleteOutlineOutlined
                              fontSize="small"
                              color="error"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </th>
                  <td className="truncate text-ellipsis">
                    <Tooltip title={member.userName} arrow>
                      {member.userName}
                    </Tooltip>
                  </td>
                  <td>{member.phone || "-"}</td>
                  <td>
                    {member?.role?.length > 0 &&
                      member?.role.map((access: any, index: number) => (
                        <span>
                          {access === "Client" ? "Partner" : access}
                          {index !== member?.role?.length - 1 && ", "}
                        </span>
                      ))}
                  </td>
                  <td>{member.status || "-"}</td>
                  <td>{member.createdOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-gray-200 bg-white px-2 sm:px-4">
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
      </div>

      {isPopupOpen && (
        <React.Fragment>
          <Dialog
            // fullScreen={fullScreen}
            open={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogContent>
              <div className="flex justify-center mb-4">
                <PersonRemoveOutlined fontSize="large" color="error" />
              </div>
              <p className="text-base">
                Are you sure to want to delete this member?
              </p>
            </DialogContent>
            <DialogActions className="!mb-2 !me-2">
              <Button
                autoFocus
                onClick={() => setIsPopupOpen(false)}
                variant="outlined"
                size="small"
              >
                Close
              </Button>
              <Button
                onClick={handleDeleteMember}
                autoFocus
                variant="contained"
                size="small"
                loading={isDeleteLoader}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
    </>
  );
}
