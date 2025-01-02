import { useState } from "react";
import {
  Add,
  DeleteOutlineOutlined,
  FilterList,
  Search,
} from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import AddNewMemberForm from "../../../components/common/AddNewMemberForm";
import { openDrawer } from "../../../components/features/drawerSlice";
import { AppDispatch } from "../../../components/redux/store";
import { useDispatch } from "react-redux";

const applicantData = [
  {
    name: "Somya Srivastava",
    email: "somya@opstree.com",
    phone: "9087654321",
    access: "Admin",
    status: "Active",
    date: "13-07-2021",
  },
  {
    name: "Diksha",
    email: "diksha@opstree.com",
    phone: "9086655322",
    access: "Vendor",
    status: "Active",
    date: "21-09-2022",
  },
];

export default function Members() {
  const dispatch: AppDispatch = useDispatch();

  const [search, setSearch] = useState("");
  const filteredApplicants = applicantData.filter((applicant) =>
    applicant.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenDrawer = (name: string) => {
    dispatch(openDrawer(name));
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
          <tbody>
            {filteredApplicants.map((applicant, index) => (
              <tr key={index}>
                <th className="add-right-shadow group/item">
                  <div className="flex justify-between">
                    <div
                      onClick={() => handleOpenDrawer("UpdateDetails")}
                      className="cursor-pointer hover:text-indigo-700"
                    >
                      {applicant.name}
                    </div>
                    <div className="group/edit invisible group-hover/item:visible">
                      <div className="text-title text-red-700 cursor-pointer">
                        <DeleteOutlineOutlined fontSize="inherit" />
                      </div>
                    </div>
                  </div>
                </th>
                <td>{applicant.email}</td>
                <td>{applicant.phone}</td>
                <td>{applicant.access}</td>
                <td>{applicant.status}</td>
                <td>{applicant.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
