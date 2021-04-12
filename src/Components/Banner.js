import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import banner from "../assets/img/banner-medicines.webp";

const Banner = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia image={banner} title="banner" className={classes.bannerImg} />
      <CardHeader
        title={
          <Typography variant="h5" className={classes.titleTxt}>
            <i>A wise man will make more opportunities than he finds</i>
          </Typography>
        }
        className={classes.title}
      />
    </Card>
  );
};

export default Banner;

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  bannerImg: {
    height: "30vh",
    width: "100vw",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleTxt: {
    padding: "0px 5px",
    width: "100%",
    textAlign: "center",
    borderRadius: "8px",
  },
}));
