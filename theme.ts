import { createTheme } from "@mui/material";

export const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#2563eb",
      dark: "#1d4ed8",
      contrastText: "#fff",
    },
    secondary: {
      main: "#10b981",
    },
  },
});
