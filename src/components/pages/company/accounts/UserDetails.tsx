import { Tab, Tabs } from "@mui/material";
import React from "react";

export default function UserDetails() {
  const [tabValue, setTabValue] = React.useState("Profile");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <div className="px-6">
      {/* Header */}

      <Tabs
        value={tabValue}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="Profile" label="My Profile" />
        <Tab value="Change" label="Change Password" />
      </Tabs>
    </div>
  );
}
