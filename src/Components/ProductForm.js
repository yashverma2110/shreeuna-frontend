import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { BASE_URL_LOCAL } from "../utils/apiConfig";
import { getAuthToken } from "../utils/common";

const ProductForm = ({ type = "New", category, data = {}, showAlert }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState(data);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category) {
      axios.get(`${BASE_URL_LOCAL}/get/categories`).then((res) => {
        setCategories(res.data.categories);
      });
    }
  }, [category]);

  const handleChangeOfField = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleAddMedicine = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL_LOCAL}/add/medicine`, formData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      .then((res) => {
        showAlert("Added, refresh page!");
        setLoading(false);
      })
      .catch(() => {
        showAlert("Something went wrong!");
        setLoading(false);
      });
  };

  const handleEditMedicine = () => {
    setLoading(true);
    const _id = formData._id;
    delete formData._id;
    axios
      .put(`${BASE_URL_LOCAL}/update/medicine/${_id}`, formData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      .then((res) => {
        showAlert("Done, refresh page!");
        setLoading(false);
      })
      .catch(() => {
        showAlert("Something went wrong");
        setLoading(false);
      });
  };

  const handleAddCategory = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL_LOCAL}/add/category`, formData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      .then((res) => {
        showAlert("Added, refresh page!");
        setLoading(false);
      })
      .catch(() => {
        showAlert("Something went wrong");
        setLoading(false);
      });
  };

  const handleEditCategory = () => {
    setLoading(true);

    axios
      .put(`${BASE_URL_LOCAL}/update/category/${formData._id}`, formData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      .then((res) => {
        showAlert("Done, refresh page!");
        setLoading(false);
      })
      .catch(() => {
        showAlert("Something went wrong");
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    switch (type) {
      case "New":
        if (category) {
          handleAddCategory();
          break;
        }
        handleAddMedicine();
        break;
      case "Edit":
        if (category) {
          handleEditCategory();
          break;
        }
        handleEditMedicine();
        break;
      default:
        break;
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={`${type} Item`} className={classes.title} />
      <CardContent>
        <form className={classes.form}>
          {category ? (
            <TextField
              label="Category"
              type="text"
              name="name"
              variant="outlined"
              value={formData.name}
              className={classes.field}
              onChange={handleChangeOfField}
            />
          ) : (
            <>
              {" "}
              <TextField
                label="Name & Packaging"
                type="text"
                disabled={type === "Show"}
                name="title"
                variant="outlined"
                value={formData.title}
                className={classes.field}
                onChange={handleChangeOfField}
              />
              <TextField
                label="Category"
                type="text"
                disabled={type === "Show"}
                name="category"
                variant="outlined"
                value={formData.category}
                select
                className={classes.field}
                onChange={handleChangeOfField}
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Company"
                type="text"
                variant="outlined"
                disabled={type === "Show"}
                name="company"
                value={formData.company}
                className={classes.field}
                onChange={handleChangeOfField}
              />
              <TextField
                label="Price"
                type="number"
                min={0}
                name="price"
                disabled={type === "Show"}
                variant="outlined"
                value={formData.price}
                className={classes.field}
                onChange={handleChangeOfField}
              />
            </>
          )}
          <Box className={classes.btnContainer}>
            {type !== "Show" && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                disabled={loading}
              >
                Submit
              </Button>
            )}
            {loading && <CircularProgress className={classes.progress} />}
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "400px",
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
  btnContainer: {
    display: "flex",
  },
  progress: {
    marginLeft: "10px",
  },
}));
