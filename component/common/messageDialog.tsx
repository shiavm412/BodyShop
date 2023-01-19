
import {
  Theme,
 
  Dialog,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import {makeStyles , createStyles} from "@mui/styles";
import React from "react";
import CustomButton from "./button";
import clsx from "clsx";
// import { ReducersModal } from "../../models";
// import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Image from "next/image";
import Utils from "../utils";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:first-child": {
        paddingTop: 0,
      },
      "& .MuiDialog-paperWidthSm": {
        // maxWidth: 438
        minWidth: 438,
        width: 438,
        [theme.breakpoints.down("xs")]: {
          minWidth: "95%",
          width: "100%",
        },
      },
    },
    drawerRoot: {
      "&:first-child": {
        paddingTop: 0,
      },
      "& .MuiDialog-paperWidthSm": {
        // maxWidth: 438
        minWidth: 438,
        width: 438,
        [theme.breakpoints.down("xs")]: {
          minWidth: "90%",
        },
      },
      [theme.breakpoints.down("xs")]: {
        "& .MuiDialog-paper": {
          width: "100vw",
          height: "100vh",
          margin: 0,
          maxHeight: "initial",
          paddingTop: theme.spacing(2),
        },
      },
    },
    mainContainer: {
      display: "flex",
      textAlign: "center",
      justifyContent: "space-between",
      flexDirection: "column",
      padding: theme.spacing(3.5, 2, 2, 2),
      [theme.breakpoints.down("sm")]: {
        // padding: theme.spacing(3.5, 10),
      },
      [theme.breakpoints.down("xs")]: {
        // padding: theme.spacing(5),
      },
    },
    heading: {
      fontFamily: "Work Sans",
      fontSize: "26px",
      lineHeight: "30px",
      color: "var(--black)",
      // '& .MuiTypography-h3': {
      //     fontSize: '22px !important'
      // },
      // '& .MuiTypography-h6': {
      //     fontSize: '18px !important'
      // }
    },
    textContent: {
      alignSelf: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "85%",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    description: {
      marginTop: "13px",
      font: "normal 500 18px Work Sans",
      color: "#333333",
      lineHeight: "26px",
      [theme.breakpoints.down("xs")]: {
        font: "normal 500 16px Work Sans",
      },
    },
    divider: {
      margin: "35px 0px 8px 0px",
      color: "#F2F2F2",
    },
    image: {
      marginBottom: "21px",
      width: "71px",
      height: "71px",
      display: "flex",
      justifySelf: "center",
      alignSelf: "center",
    },
    closeIcon: {
      float: "right",
      cursor: "pointer",
      padding: "20px",
    },
    closeIconContainer: {
      width: "100%",
    },
    mobileHeaderContainer: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "35px",
      padding: theme.spacing(3, 1.6),
      position: "sticky",
      top: 0,
      zIndex: 9999,
    },

    backArrow: {
      width: theme.spacing(2.5),
      height: "auto",
    },
    secondDialog: {
      display: "none",
    },
  })
);

interface Props {
  open: boolean;
  handleClose: Function;
  onOk: Function;
  message: any;
  cancelText: string;
  okText: string;
  okButtonProps?: any;
  cancelButtonProps?: any;
  heading?: any;
  icon?: any;
  headingClass?: string;
  closePopUp?: boolean;
  modaltype?: string;
  onClosePopUp?: Function;
  className?: any;
  // alignOkButton?: boolean
}

const MessageDialog = ({
  open = true,
  handleClose,
  onOk,
  heading = "",
  message,
  cancelText,
  okText,
  // okButtonProps,
  // cancelButtonProps,
  icon,
  headingClass,
  onClosePopUp,
  closePopUp,
  // modaltype,
  className,
}: // alignOkButton
Props) => {
  const classes = useStyles();
  const history = useRouter();

  const isMembershipAdded = 
    typeof window !== "undefined" && localStorage?.getItem("isMembershipAdded");

  const onSubmit = (_e: any) => {
    onOk();
  };
  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem("isMembershipAdded");
  //   }
  // },[])
  return (
    <React.Fragment>
      <Dialog
        open={open}
        className={clsx(
          heading !== "Payment Failed" ? classes.root : classes.drawerRoot,
          className ? className : ""
        )}
      >
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <div
            className={
              heading === "Payment Failed"
                ? classes.mobileHeaderContainer
                : classes.secondDialog
            }
          >
            <span
              onClick={() => {
                localStorage.removeItem("isMembershipAdded");
                if (
                  heading === "Payment Failed" ||
                  heading === "Payment Pending"
                ) {
                  history.push("/");
                } else handleClose();
              }}
            >
              <div className={classes.backArrow}>
                <Image src={Utils.images.BACK_ARROW} alt="back" width={30}  height={30} />
              </div>
            </span>
          </div>
        </Box>
        {closePopUp && (
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <div
              className={classes.closeIconContainer}
              onClick={() => {
                if (onClosePopUp) onClosePopUp();
              }}
            >
              <span className={classes.closeIcon}>
              <Image src={Utils.images.CROSS} alt="cross" width={30}  height={30}/>
              </span>
            </div>
          </Box>
        )}

        <div className={classes.mainContainer}>
          {icon ? <img className={classes.image} src={icon} alt="icons" /> : ""}
          <div className={classes.textContent}>
            {heading ? (
              <Typography
                variant="h3"
                className={headingClass ? headingClass : classes.heading}
              >
                {heading}
              </Typography>
            ) : null}
            {typeof message == "string" ? (
              <Typography variant="h6" className={classes.description}>
                {message}
              </Typography>
            ) : (
              message
            )}
          </div>
          <Divider className={classes.divider} />
          <Grid container spacing={2} style={{ justifyContent: "center" }}>
            {((cancelText === "Convert To COD" && !isMembershipAdded) ||
              (cancelText && cancelText !== "Convert To COD")) && (
              <Grid item xs={6}>
                <CustomButton
                  type="button"
                  color="primary"
                  fullWidth
                  variant="outlined"
                  text={cancelText}
                  onClick={() => handleClose()}
                />
              </Grid>
            )}
            {/* {alignOkButton ? <Grid item xs={3} /> : ""} */}
            <Grid item xs={6}>
              <CustomButton
                fullWidth
                type="button"
                color="primary"
                variant="contained"
                text={okText}
                onClick={onSubmit}
              />
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default MessageDialog;
