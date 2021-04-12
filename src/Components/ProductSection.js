import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getAuthToken, isLoggedIn } from "../utils/common";
import ProductForm from "./ProductForm";
import axios from "axios";
import { BASE_URL_LOCAL } from "../utils/apiConfig";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Visibility from "@material-ui/icons/Visibility";

const ProductSection = ({ category, _id, showAlert, loading }) => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState();
  const [list, setList] = useState([]);
  const [currItem, setCurrItem] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (_id) {
      setShowLoading(true);
      axios
        .get(`${BASE_URL_LOCAL}/get/medicine/${_id}`)
        .then((res) => {
          setList(res.data.medicines);
        })
        .then((res) => setShowLoading(false));
    }
  }, [_id]);

  const handleItemEdit = (data) => {
    setCurrItem(data);
    setIsModalOpen(true);
  };

  const handleItemShow = (data) => {
    setCurrItem(data);
    setIsModalShowing(true);
  };

  const handleDeleteMedicine = (data) => {
    axios
      .delete(`${BASE_URL_LOCAL}/delete/medicine/${data._id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      .then((res) => {
        showAlert("Deleted successfully, refresh!");
        setOpenDialog(null);
      });
  };

  if (loading || showLoading)
    return (
      <Grid container>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ height: "25vh" }}
          >
            <CircularProgress />
          </Box>
        </Grid>
      </Grid>
    );

  return (
    <Card className={classes.root} elevation={3}>
      <CardHeader
        title={category}
        action={
          isLoggedIn() && (
            <IconButton
              onClick={() =>
                setCategoryEdit({
                  name: category,
                  _id,
                })
              }
            >
              <Edit color="secondary" />
            </IconButton>
          )
        }
        className={classes.title}
      />
      <CardContent className={classes.cardContent}>
        <Grid container>
          <Grid item xs={6}>
            <Typography className={classes.columnHeader}>
              Product Name
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.columnHeader}>Price</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.columnHeader}>Company</Typography>
          </Grid>
          {list.map((medicine, index) => (
            <Grid item xs={12} key={index}>
              <Grid container id="hoverParent">
                <Box id="hoverOnEdit">
                  {isLoggedIn() ? (
                    <>
                      {" "}
                      <IconButton onClick={() => handleItemEdit(medicine)}>
                        <Edit style={{ color: "white" }} fontSize="large" />
                      </IconButton>
                      <IconButton onClick={() => setOpenDialog(medicine)}>
                        <Delete style={{ color: "red" }} fontSize="large" />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton onClick={() => handleItemShow(medicine)}>
                      <Visibility style={{ color: "white" }} fontSize="large" />
                    </IconButton>
                  )}
                </Box>
                <Grid item xs={6}>
                  <Typography className={classes.columnContent}>
                    {medicine.title}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography className={classes.columnContent}>
                    {medicine.price}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className={classes.columnContent}>
                    {medicine.company}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <Modal
        open={isModalShowing || isModalOpen || Boolean(categoryEdit)}
        onClose={() => {
          setCategoryEdit(null);
          setIsModalOpen(false);
          setIsModalShowing(false);
        }}
        className={classes.modal}
      >
        <ProductForm
          type={isModalShowing ? "Show" : "Edit"}
          data={categoryEdit || currItem}
          category={Boolean(categoryEdit)}
          showAlert={showAlert}
        />
      </Modal>
      <Dialog open={Boolean(openDialog)} onClose={() => setOpenDialog(null)}>
        <DialogTitle>Delete {openDialog?.title} ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently delete the record
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(null)} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              handleDeleteMedicine(openDialog);
            }}
            color="danger"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProductSection;

const useStyles = makeStyles(
  (theme) => ({
    root: {
      margin: "15px 10px",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      background: theme.palette.primary.main,
      color: "white",
      textAlign: "center",
      padding: "5px",
    },
    titleTxt: {
      color: "white",
      background: "rgba(0,0,0,0.5)",
      padding: "0px 5px",
      textAlign: "center",
      borderRadius: "8px",
    },
    cardContent: {
      padding: "5px",
    },
    columnHeader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      fontSize: "0.9em",
      fontWeight: 600,
      border: "1px solid white",
      background: theme.palette.primary.main,
      height: "100%",
      color: "white",
      padding: "5px 0px",
    },
    columnContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "0.9em",
      fontWeight: 600,
      border: "1px solid white",
      background: theme.palette.secondary.main,
      height: "100%",
      color: "black",
      padding: "5px 0px",
      textAlign: "center",
      textTransform: "uppercase",
    },
  }),
  { index: 1 }
);
