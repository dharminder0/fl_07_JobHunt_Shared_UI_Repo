import React from "react";
import "./App.css";
import AppRoutes from "./components/AppRoutes.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./assets/themes/theme.ts";
import { OrganizationTypeProvider } from "./contexts/OrganizationTypeContext.tsx";


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
