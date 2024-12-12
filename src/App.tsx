import React from "react";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./assets/themes/theme";
import { OrganizationTypeProvider } from "./contexts/OrganizationTypeContext";


function App() {
  return (
    <OrganizationTypeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </OrganizationTypeProvider>
  );
}

export default App;
