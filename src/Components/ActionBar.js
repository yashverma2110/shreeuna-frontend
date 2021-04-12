import React, { useState } from "react";
import { Box, Button, makeStyles, Modal } from "@material-ui/core";
import ProductForm from "./ProductForm";

const ActionBar = ({ showAlert }) => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  return (
    <Box display="flex" justifyContent="center" className={classes.root}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setIsModalOpen(true)}
      >
        Add Product
      </Button>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setShowCategory(true)}
      >
        Add Category
      </Button>
      <Modal
        open={isModalOpen || showCategory}
        onClose={() => {
          setShowCategory(false);
          setIsModalOpen(false);
        }}
        className={classes.modal}
      >
        <ProductForm category={showCategory} showAlert={showAlert} />
      </Modal>
    </Box>
  );
};

export default ActionBar;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px 0px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    outline: "none",
  },
}));
