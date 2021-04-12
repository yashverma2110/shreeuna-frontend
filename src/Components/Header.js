import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import logo from "../assets/img/shreeunalogo.webp";
import MoreVert from "@material-ui/icons/MoreVert";
import { getAuthToken, isLoggedIn } from "../utils/common";
import { BASE_URL_LOCAL } from "../utils/apiConfig";
import axios from "axios";

const Header = ({ showLoginPage }) => {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLoginPage = () => {
    showLoginPage(true);
    setOpenMenu(false);
  };

  const handleLogout = () => {
    axios
      .post(
        `${BASE_URL_LOCAL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      )
      .then(() => {
        localStorage.clear();
        window.refresh();
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <img src={logo} alt="logo" />
          <Typography variant="h5" className={classes.title}>
            Shree Medical Agencies
          </Typography>
          <IconButton id="menu-target" onClick={() => setOpenMenu(true)}>
            <MoreVert color="secondary" />
          </IconButton>
        </Toolbar>
        <Menu
          id="simple-menu"
          anchorEl={() => document.querySelector("#menu-target")}
          keepMounted
          open={openMenu}
          onClose={() => setOpenMenu(false)}
        >
          {isLoggedIn() ? (
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          ) : (
            <MenuItem onClick={handleLoginPage}>Login</MenuItem>
          )}
        </Menu>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
};

export default Header;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    paddingLeft: "10px",
    fontSize: "1.4em",
  },
  offset: theme.mixins.toolbar,
}));
