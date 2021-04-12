import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { BASE_URL_LOCAL } from "../utils/apiConfig";
import ArrowBack from "@material-ui/icons/ArrowBack";

const LoginPage = ({ showLogin, showAlert }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({});

  const handleInputChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL_LOCAL}/user/login`, formData)
      .then((res) => {
        localStorage.setItem("xxxkey!!", res.data.token);
        showAlert("Welcome Back!");
        showLogin(false);
      })
      .catch((err) => {
        showAlert("Something went wrong");
      });
  };

  return (
    <div className={classes.root}>
      <Card className={classes.loginCard} elevation={3}>
        <CardHeader
          title="Login"
          subheader={<Typography>Only for admin</Typography>}
          action={
            <IconButton>
              <ArrowBack color="secondary" />
            </IconButton>
          }
          className={classes.title}
        />
        <CardContent>
          <form className={classes.form}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              name="email"
              className={classes.field}
              onChange={handleInputChange}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              className={classes.field}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogin}
              type="submit"
            >
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginCard: {
    width: "300px",
  },
  title: {
    background: theme.palette.primary.main,
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  field: {
    margin: "10px 0px",
    width: "100%",
  },
}));
