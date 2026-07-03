import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563EB",
    },

    secondary: {
      main: "#10B981",
    },

    background: {
      default: "#F5F7FB",
      paper: "#FFFFFF",
    },
  },

  shape: {
    borderRadius: 16,
  },

  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", sans-serif`,

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    body1: {
      fontSize: 15,
    },
  },
});

export default theme;
