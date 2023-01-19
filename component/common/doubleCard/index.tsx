import { Button, Grid, Theme, Typography } from "@mui/material";
import clsx from "clsx";
import _ from "lodash";
// import { ICON_TWO, PRODUCT_PLACEHOLDER } from "utils/constantImages";
import Utils from "../../utils";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  doubleCardRoot: {
    position: "relative",
    overflow: "hidden",
  },
  imgDiv: {
    position: "absolute",
    top: "-350px",
    [theme.breakpoints.down(1280)]: {
      top: "-170px",
      width: "40%",
    },
    [theme.breakpoints.down(800)]: {
      top: "-120px",
      width: "40%",
    },
    [theme.breakpoints.down(500)]: {
      top: "-120px",
      width: "80%",
    },
  },
  // removeIconTwo: {
  //   position: "absolute",
  //   background: `url(${Utils.images.ICON_TWO}) top left no-repeat`,
  //   top: "-50%",
  //   left: "-10%",
  //   width: "50%",
  //   height: "100%",
  //   transform: "rotate(45deg)",
  // },
  // removeIconTwo: {
  //   position: "absolute",
  //   background: `url(${Utils.images.ICON_TWO}) top left no-repeat`,
  //   top: "-10%",
  //   left: "-10%",
  //   width: "50%",
  //   height: "100%",
  //   transform: "rotate(45deg)",
  // },
  // [theme.breakpoints.down("lg")]: {
  //   top: "-30%",
  //   left: "-10%",
  //   width: "50%",
  //   height: "100%",
  //   position: "absolute",
  //   transform: "rotate(104deg)",
  //   background: "url(/assets/images/icon2.png) top left no-repeat",
  // },
  // [theme.breakpoints.down("sm")]: {
  //   top: "-45%",
  //   left: "-7%",
  //   width: "50%",
  //   height: "100%",
  //   position: "absolute",
  //   transform: "rotate(45deg)",
  //   background: "url(/assets/images/icon2.png) top left no-repeat",
  // },

  maxWidthDiv: {
    // maxWidth: "1920px",
    padding: theme.spacing(1.2, 2),
    margin: theme.spacing(0, 10),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(0, "auto"),
    },
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
    cursor: "pointer",
    width: "80%",
    height: "476px",
    border: "4px solid var(--white)",
    filter: "drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.1))",
  },
  floatRight: {
    float: "right",
    marginRight: "25%",
    [theme.breakpoints.down("md")]: {
      marginRight: "0%",
    },
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  smallImg: {
    cursor: "pointer",
    position: "absolute",
    right: "3%",
    bottom: "0px",
    width: "50%",
    border: "4px solid var(--white)",
    filter: "drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.1))",
    zIndex: 1,
    height: "300px",
  },
  floatLeft: {
    left: "-22%",
    [theme.breakpoints.down("md")]: {
      left: "0%",
    },
  },
  gridItemContent: {
    display: "flex",

    padding: theme.spacing(13, 3),
    position: "relative",
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
      padding: theme.spacing(4, 0),
    },
  },
  gridItemContent2: {
    display: "flex",

    padding: theme.spacing(13, 5),
    position: "relative",
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
      padding: theme.spacing(4, 0),
    },
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
    font: `normal ${theme.spacing(2)} Druk Bold`,
    letterSpacing: "1px",
    color: "var(--primary)",
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.spacing(1.6),
    },
    textTransform: "uppercase",
  },
  heading: {
    font: `normal ${theme.spacing(4)} Druk Bold`,
    letterSpacing: "1px",
    color: "var(--primary)",
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.spacing(3),
    },
    textTransform: "uppercase",
  },
  paragraph: {
    font: `normal ${theme.spacing(1.6)} Work Sans Regular`,
    color: "var(--primary)",
    lineHeight: "19px",
    maxWidth: "400px",
    margin: theme.spacing(2, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.spacing(1.4),
      maxWidth: "none",
    },
  },
  btn: {
    font: `normal 600 ${theme.spacing(1.6)} Work Sans`,
    borderRadius: 4,
    padding: theme.spacing(1.5, 3),
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.spacing(1.4),
    },
    // '& .MuiButton-label': {
    //   textTransform: 'capitalize',
    //   "&::after": {
    //     textTransform: 'capitalize',
    //   },
    //   "&::before": {
    //     textTransform: 'capitalize',
    //   }
    //   }
  },
  noImgBackground: {
    backgroundColor: "#F8F3E9",
    padding: "25px",
  },
  imgHide: {
    display: "none",
  },
}));

type AppProps = {
  rightImg?: boolean;
  data: any;
  navigateTo: Function;
};

function DoubleCard({ data, rightImg, navigateTo }: AppProps) {
  const classes = useStyles();
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

  return (
    <>
      <div className={clsx(classes.doubleCardRoot)}>
        <div className={clsx(rightImg && classes.imgHide)}>
          <span className={classes.imgDiv}>
            {/* <ICON_TWO /> */}
            "pending"
          </span>
        </div>

        {/* <div className={clsx(!rightImg && classes.removeIconTwo)}></div> */}
        <Grid
          container
          className={clsx(classes.maxWidthDiv, rightImg && classes.reverse)}
        >
          <Grid item xs={12} sm={6} className={classes.gridItem}>
            <div className={clsx(!rightImg && classes.flowerImg)}></div>
            <div
              className={clsx(classes.smallImg, rightImg && classes.floatLeft)}
              onClick={() => navigateTo(data)}
            >
              {data?.web_img_path_first ? (
                <img
                  src={`${IMAGE_URL}${data.web_img_path_first}`}
                  alt="small"
                  className={
                    data?.web_img_path_first
                      ? classes.img
                      : clsx(classes.img, classes.noImgBackground)
                  }
                />
              ) : (
                <div
                  className={
                    data?.web_img_path_first
                      ? classes.img
                      : clsx(classes.img, classes.noImgBackground)
                  }
                >
                  {" "}
                  "pending"
                  {/* <PRODUCT_PLACEHOLDER /> */}
                </div>
              )}
             
            </div>
            <div
              className={clsx(classes.bigImg, rightImg && classes.floatRight)}
              onClick={() => navigateTo(data)}
            >
              {data?.web_img_path_second ? (
                <img
                  src={`${IMAGE_URL}${data.web_img_path_second}`}
                  alt="big img"
                  className={
                    data?.web_img_path_second
                      ? classes.img
                      : clsx(classes.img, classes.noImgBackground)
                  }
                />
              ) : (
                <div
                  className={
                    data?.web_img_path_second
                      ? classes.img
                      : clsx(classes.img, classes.noImgBackground)
                  }
                >
                  {/* <PRODUCT_PLACEHOLDER /> */}
                  "pending"
                </div>
              )}
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className={
              rightImg ? classes.gridItemContent : classes.gridItemContent2
            }
          >
            <div className={clsx(rightImg && classes.flowerImgContent)}></div>
            <div>
              <Typography className={classes.subheading}>
                {data.tips_month || ""}
              </Typography>
              <Typography className={classes.heading}>{data.title}</Typography>
              <Typography className={classes.paragraph}>
                {data?.description
                  ? _.truncate(
                      Utils.CommonFunctions.replaceHtmlTag(data.description),
                      { length: 250 }
                    )
                  : ""}
              </Typography>
              {data?.button_text && (
                <Button
                  color="primary"
                  variant="outlined"
                  className={classes.btn}
                  onClick={() => navigateTo(data)}
                >
                  {data.button_text}
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default DoubleCard;
