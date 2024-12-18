import { useState } from "react";
import { Add } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { TextField, Button, MenuItem, Typography } from "@mui/material";

const AddNewMemberForm = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    access: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    // Add your submit logic here
  };

  return (
    <div className="">
      <Button
        variant="contained"
        onClick={toggleDrawer(true)}
        startIcon={<Add />}
      >
        Invite new team member
      </Button>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: "calc(100vw - 250px)" }}>
          <div className="p-4 border-b">
            <h2 className="text-heading">Add new team member</h2>
          </div>

          <div className="p-4 w-[50%] mx-auto">
            <p className="text-center text-title my-4">Invite memeber</p>

            <form className="space-y-4">
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                size="small"
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                size="small"
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                variant="outlined"
                fullWidth
                size="small"
              />
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                variant="outlined"
                fullWidth
                size="small"
              />
              <TextField
                select
                label="Access"
                name="access"
                value={formData.access}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                size="small"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="vendor">Vendor</MenuItem>
                <MenuItem value="company">Company</MenuItem>
              </TextField>

              <div className="text-center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ width: 150 }}
                >
                  Invite
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default AddNewMemberForm;
