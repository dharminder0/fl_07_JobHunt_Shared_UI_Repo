import React, { useEffect } from "react";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./assets/themes/theme";
import { OrganizationTypeProvider } from "./contexts/OrganizationTypeContext";
import CommonDrawer from "./components/sharedComponents/CommonDrawer";
import { useSelector } from "react-redux";
import { RootState } from "./components/redux/store";
import BackDropLoader from "./components/sharedComponents/BackDropLoader";
import { startNotificationConnection } from "./components/sharedService/signalRService";

function App() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const { currentDrawer } = useSelector((state: RootState) => state.drawer);
  const isBackdropOpen = useSelector(
    (state: RootState) => state.drawer.isBackdropOpen
  );

  useEffect(() => {
    if (!userData?.orgCode) return;

    startNotificationConnection(userData.orgCode);
  }, [userData?.orgCode]);

  return (
    <OrganizationTypeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
        <CommonDrawer name={!currentDrawer ? "" : currentDrawer} />
        {isBackdropOpen && <BackDropLoader />}
      </ThemeProvider>
    </OrganizationTypeProvider>
  );
}

export default App;
