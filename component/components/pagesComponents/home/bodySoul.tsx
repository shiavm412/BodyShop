import { Button, Grid, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

import Utils from "../../../utils";

const useStyles = makeStyles((theme: Theme) =>
  ({
    doubleCardRoot: {
      padding: theme.spacing(1, 2),
      position: "relative",
      overflow: "hidden",
    },
    removeIconTwo: {
      position: "absolute",
      background: `url(${Utils.images.ICON_TWO}) top left no-repeat`,
      top: "-50%",
      left: "-10%",
      width: "50%",
      height: "100%",
      transform: "rotate(45deg)",
    },
    maxWidthDiv: {
      maxWidth: "var(--max-width)",
      margin: theme.spacing(0, "auto"),
    },
    reverse: {
      flexDirection: "row-reverse",
    },
    gridItem: {
      position: "relative",
      paddingBottom: "7%",
    },
    flowerImg: {
      position: "absolute",
      right: "-14%",
      top: "5%",
      // background: `url(${Utils.images.ICON_THREE}) center no-repeat`,
      width: "50%",
      height: "50%",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    bigImg: {
      width: "80%",
      filter: "drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.1))",
    },
    floatRight: {
      float: "right",
    },
    img: {
      width: "100%",
      height: "auto",
    },
    smallImg: {
      position: "absolute",
      right: "3%",
      bottom: "0px",
      width: "50%",
      filter: "drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.1))",
      zIndex: 1,
    },
    floatLeft: {
      left: "0",
    },
    gridItemContent: {
      display: "flex",
      alignItems: "center",
      paddingTop: theme.spacing(1),
      position: "relative",
    },
    flowerImgContent: {
      position: "absolute",
      left: "14%",
      bottom: "5%",
      // background: `url(${Utils.images.ICON_THREE}) center no-repeat`,
      width: "50%",
      height: "50%",
      transform: "rotate(90deg)",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    subheading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2
      )} Druk`,
      letterSpacing: '0.04em',
      color: theme.palette.primary.main,
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.spacing(1.6),
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        4
      )} Druk`,
      letterSpacing: '0.04em',
      color: theme.palette.primary.main,
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.spacing(3),
      },
    },
    paragraph: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.6
      )} Work Sans`,
      color: theme.palette.primary.main,
      lineHeight: "19px",
      maxWidth: "400px",
      margin: theme.spacing(2, 0),
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.spacing(1.4),
        maxWidth: "none",
      },
    },
    btn: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )} Work Sans`,
      borderRadius: 4,
      textTransform: "capitalize",
      padding: theme.spacing(1.5, 3),
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.spacing(1.4),
      },
    },
  })
);

type AppProps = {
  rightImg?: boolean;
};

function BodySoul({ rightImg }: AppProps) {
  const classes = useStyles();
  return (
    <div className={clsx(classes.doubleCardRoot)}>
      <div className={clsx(!rightImg && classes.removeIconTwo)}></div>
      <Grid
        container
        className={clsx(classes.maxWidthDiv, rightImg && classes.reverse)}
      >
        <Grid item xs={12} sm={6} className={classes.gridItem}>
          <div className={clsx(!rightImg && classes.flowerImg)}></div>
          <div
            className={clsx(classes.smallImg, rightImg && classes.floatLeft)}
          >
            <img src={Utils.images.SOUL1} alt="small" className={classes.img} />
          </div>
          <div className={clsx(classes.bigImg, rightImg && classes.floatRight)}>
            <img
              src={Utils.images.SOUL2}
              alt="big img"
              className={classes.img}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.gridItemContent}>
          <div className={clsx(rightImg && classes.flowerImgContent)}></div>
          <div>
            <Typography className={classes.subheading}>JULY</Typography>
            <Typography className={classes.heading}>
              LIQUID PEEL CLEANSERS
            </Typography>
            <Typography className={classes.paragraph}>
              And if you’re bunked up in a busy city full of environmental
              challenges – you might be looking for something a little different
              to help your skin feel as fresh as a daisy after a day in the
              thick of it. We’ve got something of a cleansing revelation for
              you, our Liquid Face Peels. These smooth manoeuvres go on as a gel
              and react with your skin’s pH and turn.
            </Typography>
            <Button color="primary" variant="outlined" className={classes.btn}>
              Discover More
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default BodySoul;
