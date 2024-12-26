import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Add, UploadFileRounded } from "@mui/icons-material";
import {
  Box,
  Drawer,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@mui/system/styled";
import FileUploadBox from "../../../common/FileUploadBox";

const steps = [
  { label: "Select Post Type", description: "" },
  { label: "Fill Post Details", description: "" },
  { label: "Share Preferences", description: "" },
];

const ImportClientForm = () => {
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

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
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
    <div className="flex flex-col my-auto mr-2">
      <Button
        variant="outlined"
        onClick={toggleDrawer(true)}
        startIcon={<Add />}
      >
        Import
      </Button>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="h-full w-[calc(100vw-250px)]">
          <div className="p-4  py-2  border-b">
            <h2 className="text-xl">Import</h2>
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

export default ImportClientForm;
