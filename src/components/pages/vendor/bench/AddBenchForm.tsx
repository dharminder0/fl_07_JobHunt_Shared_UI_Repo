import { useState } from "react";
import { Add } from "@mui/icons-material";
import {
  Box,
  Chip,
  Drawer,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { TextField, Button, MenuItem } from "@mui/material";
import FileUploadBox from "../../../common/FileUploadBox";

const AddBenchForm = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (file) {
        console.log("Selected file:", file.name, file.size, file.type);
      } else {
        console.log("No file selected.");
      }
    };
  

  return (
    <div className="flex flex-col my-auto">
      <Button
        className="!mr-2"
        variant="outlined"
        onClick={toggleDrawer(true)}
        startIcon={<Add />}
      >
        Import Bench
      </Button>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
      <div className="h-full w-[calc(100vw-250px)]">
          <div className="p-4  py-2  border-b">
            <h2 className="text-heading">Import bench</h2>
          </div>
          <div className="p-4 w-[50%] overflow-auto h-[calc(100%-95px)] mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-4">
                <div className="space-y-4">
                  <label className="block text-title">Import the file</label>
                  <FileUploadBox title="upload file" iconType="file" />


                </div>
              </div>
            </form>
          </div>
          <div className="px-4 py-2 border-t">
            <div className="flex justify-end">
              <Button variant="contained" color="primary" onClick={handleSubmit}
                sx={{ width: 125 }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default AddBenchForm;
