import {
  IconButton,
  MuiThemeProvider,
  Snackbar,
  Typography,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import theme from "./assets/theme";
import ActionBar from "./Components/ActionBar";
import Banner from "./Components/Banner";
import Header from "./Components/Header";
import LoginPage from "./Components/LoginPage";
import ProductSection from "./Components/ProductSection";
import { BASE_URL_LOCAL } from "./utils/apiConfig";
import { isLoggedIn } from "./utils/common";

function App() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [showAlert, setAlert] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL_LOCAL}/get/categories/withmeds`).then((res) => {
      setData(res.data.category ?? []);
      setLoading(false);
    });
  }, []);

  const handleCloseSnackbar = () => setAlert(null);

  return (
    <MuiThemeProvider theme={theme}>
      <Header showLoginPage={setIsLoginPage} />
      {isLoginPage ? (
        <LoginPage showLogin={setIsLoginPage} showAlert={setAlert} />
      ) : (
        <>
          <Banner />
          {isLoggedIn() && <ActionBar showAlert={setAlert} />}
          {data && data.length === 0 && (
            <Typography style={{ textAlign: "center" }}>
              <b>Log In to start adding products</b>
            </Typography>
          )}
          {data &&
            data.map((item, index) => (
              <ProductSection
                key={index}
                category={item.name}
                _id={item._id}
                showAlert={setAlert}
                loading={loading}
              />
            ))}
        </>
      )}
      <Snackbar
        open={Boolean(showAlert)}
        message={showAlert}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </MuiThemeProvider>
  );
}

export default App;
