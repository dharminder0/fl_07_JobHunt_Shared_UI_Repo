import React from "react";
import { Tab, Tabs } from "@mui/material";

export default function Settings() {
  const [value, setValue] = React.useState("profile");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="p-4">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="profile" label="Company Profile" />
        <Tab value="login" label="Login Details" />
        <Tab value="notifications" label="Notifications" />
      </Tabs>
    </div>
  );
}
