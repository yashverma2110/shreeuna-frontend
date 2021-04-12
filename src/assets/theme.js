const { createMuiTheme } = require("@material-ui/core");

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#126e82",
      contrastText: "#fff",
    },
    secondary: {
      main: "#d8e3e7",
    },
  },
});

export default theme;
