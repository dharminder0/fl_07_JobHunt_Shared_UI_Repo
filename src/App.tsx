import React from "react";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./assets/themes/theme";
import { OrganizationTypeProvider } from "./contexts/OrganizationTypeContext";
import CommonDrawer from "./components/common/CommonDrawer";
import { useSelector } from "react-redux";
import { RootState } from "./components/redux/store";

function App() {
  const { currentDrawer } = useSelector((state: RootState) => state.drawer);
  return (
    <OrganizationTypeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
        <CommonDrawer name={!currentDrawer ? "" : currentDrawer} />
      </ThemeProvider>
    </OrganizationTypeProvider>
  );
}

export default App;
