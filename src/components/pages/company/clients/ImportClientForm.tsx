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
    <div className="">
      <Button
        variant="outlined"
        onClick={toggleDrawer(true)}
        startIcon={<Add />}
      >
        Import
      </Button>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: "calc(100vw - 250px)" }}>
          <div className="p-4 border-b">
            <h2 className="text-xl">Import</h2>
          </div>
          <div className="p-4 w-[50%] mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-4">
                <div className="space-y-4">
                  <label className="block text-title">Import the file</label>
                  <FileUploadBox title="upload file"  iconType="file" />
                  
                  {/* Submit Button */}
                  <div className="flex">
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ImportClientForm;
