import {
 
  Theme,
  Typography,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import BreadCrumb from "../../common/breadCrumb";
import { saveLocationHistory } from "../../common/breadCrumb/action";
import { ROUTE_CONSTANTS } from "../../constants/routeConstants";
import Utils from "../../utils";
import Image from "next/image";
// import { MOBILE_OFFER_ICON } from "utils/constantImages";
// import BANNER_HOME from "/images/bannerHome.png";

const useStyles = makeStyles((theme: Theme) =>
  ({
    root: {
      [theme.breakpoints.down("xs")]: {
        height: "180px",
        background: "rgba(35, 30, 30, 0.06)",
        // padding:"10px 0px",
        display: "flex",
        // alignItems:"center",
        width: "100%",
        padding: "0px 0px",
      },
    },
    bannerRoot: {
      // background: `linear-gradient(rgba(51, 51, 51, 0.1), rgba(51, 51, 51, 0.1)), url(${Utils.images.PLPIMG}) center center  no-repeat`,
      backgroundSize: "cover !important",
      maxWidth: "100%",
      height: "72vh",
      display: "flex",
      backdropFilter: "blur(2px)",
      flexDirection: "column",
      filter: "drop-shadow(0px 0px 30px rgba(146, 146, 146, 0.1))",
      [theme.breakpoints.down("xs")]: {
        height: "150px",
        marginTop: "15px",
        width: "100%",
      },
      // height: "80vh",
      // alignItems: "center",
      // justifyContent: "center",
      // flexDirection: "column",
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        6
      )} Druk`,
      color: "var(--white)",
      textAlign: "center",
      lineHeight: "70px",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1.7
        )} Recoleta Alt Bold`,
        color: "#D6CD56",
        lineHeight: "32px",
        letterSpacing: "0.05em",
      },
    },
    routeName: {
      padding: theme.spacing(2, 0, 0, 1.5),
      font: `normal ${theme.spacing(1.3)} Work Sans`,
      fontWeight: 600,
      lineHeight: "15px",

      color: "#FFFFFF",
    },
    subHeading: {
      font: `normal  ${theme.spacing(1.6)} Work Sans`,
      width: "678px",
      color: "var(--white)",
      textAlign: "center",
      lineHeight: "19px",
      margin: theme.spacing(0.5),
      [theme.breakpoints.down("xs")]: {
        width: "auto",
        marginLeft: "0px",
        font: `normal  ${theme.spacing(1.1)} Work Sans Medium`,
        textAlign: "initial",
        letterSpacing: "0.02em",
        lineHeight: "12px"
      },
    },
    btn: {
      "&.MuiButton-root": {
        borderRadius: 2,
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.6
        )} Work Sans`,
        textTransform: "capitalize",
        padding: theme.spacing(2, 4),
        color: "var(--white)",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.4),
      },
    },

    findContainer: {
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "20px",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "flex-start",
        margin: "20px",
      },
    },
    innerFindContainer: {
      textAlign: "center",
      background: "rgba(0, 0, 0, 0.4)",
      opacity: "0.8",
      boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
      borderRadius: "2px",
      padding: theme.spacing(3),
      [theme.breakpoints.down("xs")]: {
        // background: "none",
        display: "flex",
        justifyContent: "flex-start",
        // padding: "0px",
        padding: theme.spacing(0.5),

      },
    },
    breadcrumb: {
      padding: theme.spacing(2, 0, 0, 1.5),
      font: `normal ${theme.spacing(1.3)} Work Sans`,
      fontWeight: 600,
      lineHeight: "15px",
      color: "#FFFFFF",
    },
    img: {
      marginRight: "20px",
      // marginLeft: "10px"
    },
    content: {
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
  })
);
interface Props {
  promotionalProduct: any;
  navigateTo: Function;
  mobileView?: boolean;
}

function Banner({ promotionalProduct }: Props) {
  const classes = useStyles();
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;
  const dispatch : any = useDispatch();
  useEffect(() => {
    let breadCrumbData = [
      {
        title: "Home",
        action: "/",
      },
    ];
    dispatch(saveLocationHistory(breadCrumbData));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.root}>
      <div
        className={classes.bannerRoot}
        style={{
          background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${
            promotionalProduct?.web_img
              ? `${IMAGE_URL}${promotionalProduct.web_img}`
              : `${Utils.images.BANNER_HOME}`
          }) center center  no-repeat`,
        }}
        // onClick={() => navigateTo(promotionalProduct)}
      >
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <div className={classes.breadcrumb}>
            <BreadCrumb
              type="white"
              breadcrumb={[
                { title: "Home", action: "/" },
                { title: "Offers", action: ROUTE_CONSTANTS.BANKOFFER },
              ]}
            />
          </div>
        </Box>
        <div className={classes.findContainer}>
          <div className={classes.innerFindContainer}>
            <div className={classes.img}>
              <Image src={Utils.images.MOBILE_OFFER_ICON} alt="mobileOffer" width={40} height={40} />
            </div>
            <div className={classes.content}>
              <Typography variant="h2" className={classes.heading}>
                {promotionalProduct?.title || ""}
              </Typography>
              <div
                className={classes.subHeading}
                dangerouslySetInnerHTML={{
                  __html: promotionalProduct?.description || "",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
