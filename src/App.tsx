import React from "react";
import "./App.css";
import AppRoutes from "./components/AppRoutes.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./assets/themes/theme.ts";

const muiButtontheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: 'primary'
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ThemeProvider theme={muiButtontheme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </ThemeProvider>
  );
}

export default App;
