
import { Grid, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";

import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import Utils from "../../utils";
// import { FACEBOOK, INSTAGRAM, TWITTER, YOUTUBE } from "utils/constantImages";

const useStyles = makeStyles((theme: Theme) =>
  ({
    mediaFooter: {
      backgroundColor: "var(--creame-color)",
      padding: theme.spacing(0, 2),
    },
    maxWidthDiv: {
      // maxWidth: "var(--max-width)",
      margin: theme.spacing(0, "auto"),
    },
    gridItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2, 0),
      "&:nth-child(2)": {
        borderLeft: "1px solid var(--dark-creame-color)",
        // borderRight: "1px solid var(--dark-creame-color)",
        [theme.breakpoints.down("xs")]: {
          border: "none",
        },
      },
    },
    heading: {
      textTransform: "uppercase",
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(2),
      },
    },
    subheading: {
      textAlign: "center",
      margin: theme.spacing(1, 1),
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.4),
      },
    },
    paragraph: {
      fontWeight: 700,
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.4),
      },
    },
    socialIconDiv: {
      width: "80%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    imgDiv: {
      width: 36,
      height: 36,
      backgroundColor: "var(--dark-creame-color)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      "& a": {
        width: "21px",
        height: "21px",
        display: "flex",
        placeContent: "center",
      },
    },
    select: {
      backgroundColor: "var(--white)",
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )} Wrok Sans`,
      width: "50%",
      "& .MuiSelect-icon": {
        color: "var(--black)",
      },
    },
    subscribeHeading: {
      margin: 0,
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.6
      )} Druk`,
      letterSpacing: "0.06em",
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.8),
        width: "100%",
        textAlign: "left",
      },
    },
    subscribeSubheading: {
      margin: theme.spacing(0.5, 0, 1),

      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.4),
        width: "100%",
        textAlign: "left",
      },
    },
    emailInput: {
      backgroundColor: "var(--white)",
      border: `1px solid ${theme.palette.secondary.main}`,
      paddingLeft: theme.spacing(1),
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )} Work Sans`,
      height: "54px",
      // flexBasis: "70%",
      width: "90%",
      borderRadius: "4px",

      "& > .MuiButton-root": {
        borderRadius: 0,
        height: "104%",
        width: "39%",
        padding: "0px 5px",
        boxShadow: "none",
        "& .MuiButton-label": {
          color: "var(--primary)",
          font: "normal 500 15px Work Sans SemiBold",
        },
      },
      // "& .MuiInputBase-input": {
      //   height: "100%",
      // },
      [theme.breakpoints.down("sm")]: {
        // width: "auto",
        // textOverflow: "ellipse",
        // padding: theme.spacing(0.5, 4, 0.5, 1),
      },
    },
    linkHeading: {
      color: "var( --light-creame-color)",
      marginBottom: theme.spacing(1.5),
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.4),
      },
    },
  })
);

const MediaFooter = () => {
  const classes = useStyles();
  
 

  // const [country, setCountry] = useState("India");
  const configData = useSelector(
    (state: any) => state.configReducer.generalConfigs
  );

  return (
    <>
      <div className={classes.mediaFooter}>
        <Grid container className={classes.maxWidthDiv}>
          <Grid item xs={12} sm={6} md={6} className={classes.gridItem}>
            <Typography className={classes.heading} variant="h4">
              {configData?.needHelpTitle || ""}
            </Typography>
            <Typography className={classes.subheading} variant="body2">
              {configData?.needHelpDescription || ""}
            </Typography>
            <Typography className={classes.paragraph} variant="body1">
              {configData?.needHelpHours || ""}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} className={classes.gridItem}>
            <Typography className={classes.heading} variant="h4">
              Follow Us
            </Typography>
            <Typography className={classes.subheading} variant="body2">
              Be first to know new arrivals & exclusive offers.
            </Typography>
            <div className={classes.socialIconDiv}>
              <div className={classes.imgDiv}>
                <a
                  target="_blank"
                  href="https://www.facebook.com/TheBodyShopIndia/"
                >
                  <Image src={Utils.images.FACEBOOK} alt="facebook" width={11} height={21}/>
                </a>
              </div>
              <div className={classes.imgDiv}>
                <a target="_blank" href="https://twitter.com/TheBodyShopIND">
                  <Image src={Utils.images.TWITTER} alt="twitter" width={22} height={17}/>
                </a>
              </div>
              <div className={classes.imgDiv}>
                <a
                  target="_blank"
                  href="https://www.instagram.com/thebodyshopindia/"
                >
                  <Image src={Utils.images.INSTAGRAM} alt="instgram" width={20} height={21}/>
                </a>
              </div>
              
              <div className={classes.imgDiv}>
                <a
                  target="_blank"
                  href="https://www.youtube.com/channel/UChdVYSGTX-mQTx-h5630wSA"
                >
                  <img src={Utils.images.YOUTUBE} alt="youtube" width={36} height={36}/>
                </a>
              </div>
              
            </div>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
           
            <Typography
              variant="h4"
              className={[classes.heading, classes.subscribeHeading].join(" ")}
            >
              Subscribe to Our Newsletter
            </Typography>
            <Typography
              className={classes.subheading} variant="body2"
            >
              Be the first to know about our exclusive offers.
            </Typography>
            
            <Input
              className={classes.emailInput}
              placeholder="Email Address"
              disableUnderline={true}
              endAdornment={
                <Button
                  type="button"
                  color="secondary"
                  variant="contained"
                >
                  Subscribe
                </Button>
              }
            />
          </Grid> */}
        </Grid>
      </div>
    </>
  );
};

export default MediaFooter;
