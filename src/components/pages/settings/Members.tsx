import { useEffect, useState } from "react";
import {
  Add,
  DeleteOutlineOutlined,
  FilterList,
  Search,
} from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import AddNewMemberForm from "../../sharedComponents/AddNewMemberForm";
import { openDrawer } from "../../../components/features/drawerSlice";
import { AppDispatch } from "../../../components/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getMembersList } from "../../../components/sharedService/apiService";
import moment from "moment";
import TablePreLoader from "../../../components/sharedComponents/TablePreLoader";

export default function Members() {
  const dispatch: AppDispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [isTableLoader, setIsTableLoader] = useState(true);
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [membersList, setMembersList] = useState<any[]>([]);

  const drawerState = useSelector((state: any) => state.drawer);

  const handleOpenDrawer = (name: string, data?: any) => {
    dispatch(openDrawer({ drawerName: name, data: data }));
  };

  useEffect(() => {
    if (search?.length > 2 || search?.length == 0) {
      getMemberListData();
    }
  }, [search]);

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

  return (
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
                      onClick={() => handleOpenDrawer("UpdateDetails", member)}
                      className="cursor-pointer hover:text-indigo-700"
                    >
                      {member.firstName} {member.lastName}
                    </div>
                    <div className="group/edit invisible group-hover/item:visible">
                      <div className="text-title text-red-700 cursor-pointer">
                        <DeleteOutlineOutlined fontSize="inherit" />
                      </div>
                    </div>
                  </div>
                </th>
                <td>{member.userName}</td>
                <td>{member.phone || "-"}</td>
                <td>
                  {member?.role?.length > 0 &&
                    member?.role.map((access: any, index: number) => (
                      <span>
                        {access}
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
    </div>
  );
}
