
import { useEffect } from "react";

import Utils from "../../utils";
import request from "../../utils/request";
import { useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import countries from "./countries.json";
import Link from "next/link";
import { ReducersModal } from "../../models";
import { Theme, Box, Typography, Grid, Select, MenuItem } from "@mui/material";
// import { getAuthToken } from "../../utils/session";
import { makeStyles } from "@mui/styles";


const useStyles : any = makeStyles((theme: Theme) =>
  ({
    footerRoot: {
      backgroundColor: "var(--primary)",
      padding: theme.spacing(0, 10),
      [theme.breakpoints.down("md")]: {
        padding: theme.spacing(0, 1),
      },
    },
    subheading: {
      textAlign: "center",
      margin: theme.spacing(1, 1),
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.4),
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
        top: "calc(50% - 13px)",
      },
      "& .MuiSelect-iconOutlined": {
        left: "7px",
      },
      "& .MuiSelect-outlined.MuiSelect-outlined": {
        paddingLeft: "32px",
      },
    },
    maxWidthDiv: {
      // maxWidth: "var(--max-width)",
      margin: theme.spacing(0, "auto"),
      padding: theme.spacing(2.5, 0, 1),
    },
    heading: {
      color: "#D6CE4B",
      marginBottom: theme.spacing(1.5),
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      font: "26px Druk Bold",
      lineHeight: "1.235",

      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(2),
      },

     
    },
    linkDiv: {
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        flexWrap: "wrap",
      },
    },
    link: {
      [theme.breakpoints.down("xs")]: {
        flexBasis: "50%",
      },
    },
    linkHeading: {
      color: "var( --light-creame-color)",
      marginBottom: theme.spacing(1.5),
      font: "16px Work Sans Medium",
    
    lineHeight: "1.334",
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.4),
      },
    },
    subscribeDiv: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: theme.spacing(1, 0),
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

    downFooter: {
      backgroundColor: "#00352B",
      padding: theme.spacing(1),
    },
    caption: {
      color: "var( --light-creame-color)",
      textAlign: "center",
      fontSize: theme.spacing(1.3),
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.2),
      },
    },
    emailInput: {
      backgroundColor: "var(--white)",
      padding: theme.spacing(0.5, 1),
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )} Work Sans`,
      height: "54px",
      // flexBasis: "70%",
      width: "30%",
      "& .MuiInputBase-input": {
        height: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "auto",
        textOverflow: "ellipse",
        padding: theme.spacing(0.5, 4, 0.5, 1),
      },
      "&:before": {
        border: 0,
      },
    },
  })
,);

const Footer = () => {
  const classes = useStyles();
  const [country, setCountry] = useState("India");
  const dispatch = useDispatch();
  const { footerMenu, authToken } = useSelector(
    (state: ReducersModal) => state.homeReducer
  );
  const [footerNavigation, setFooterNavigation] = useState(footerMenu);
  useEffect(() => {
    // if (authToken) {
      // if (!footerNavigation.length) {
        request
          .get(Utils.endPoints.FOOTER)
          .then((resp: any) => {

            setFooterNavigation(resp?.data?.data);
            dispatch({
              type: Utils.ActionName.FOOTER_MENU,
              payload: { footerMenu: resp?.data?.data },
            });
          })
          .catch((err: any) => {
            if (err?.response?.data?.message)
              dispatch({
                type: "show-alert",
                payload: {
                  type: "error",
                  message: err.response.data.message,
                },
              });
          });
      // }
    // }
  }, []);

  // const sideLink = (heading: string) => (
  //   <Box my={1}>
  //     <Typography variant="h4" className={classes.heading}>
  //       {heading}
  //     </Typography>
  //     <div className={classes.linkDiv}>
  //       {usefulInformations.map((item, index) => (
  //         <Link to={item.link} key={index} className={classes.link}>
  //           <Typography variant="h5" className={classes.linkHeading}>
  //             {item.title}
  //           </Typography>
  //         </Link>
  //       ))}
  //     </div>
  //   </Box>
  // );

  // const waysShop = (heading: string) => (
  //   <Box my={1}>
  //     <Typography variant="h4" className={classes.heading}>
  //       {heading}
  //     </Typography>
  //     <div className={classes.linkDiv}>
  //       {waysToShop.map((item, index) => (
  //         <Link to={item.link} key={index} className={classes.link}>
  //           <Typography variant="h5" className={classes.linkHeading}>
  //             {item.title}
  //           </Typography>
  //         </Link>
  //       ))}
  //     </div>
  //   </Box>
  // );

  const navigationLink = (navigation: any) => (
    <Box my={1}>
      <Typography variant="h4" className={classes.heading}>
        {navigation.title}
      </Typography>
      <div className={classes.linkDiv}>
        {navigation.data?.map((item: any, index: any) => {
          return (
            <Link
              href={
                item["EntityId"] !== "private-sales"
                  ? item["EntityId"] === "store"
                    ? "/stores"
                    : `/${item["EntityId"]}`
                  : "/"
              }
              key={index + navigation.title}
              className={classes.link}
            >
              <Typography variant="h5" className={classes.linkHeading}>
                {item["Title"]}
              </Typography>
            </Link>
          );
        })}
      </div>
    </Box>
  );
  return (
    <>
      <div className={classes.footerRoot}>
        <div className={classes.maxWidthDiv}>
          <Grid container>
            {footerNavigation?.map((nav: any, index: any) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  {navigationLink(nav)}
                </Grid>
              );
            })}
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6} md={4} />
            <Grid item xs={12} sm={6} md={4} />
            <Grid item xs={12} sm={6} md={4}>
              {/* <Typography className={classes.heading} variant="h4">
                GLOBAL
              </Typography>
              <Typography className={classes.linkHeading} variant="body2">
                Lorem Ipsum is simply dummy text of industry.
              </Typography> */}
              <Select
                id="demo-simple-select"
                labelId="demo-simple-select-label"
                value={country}
                variant="outlined"
                onChange={(e: any) => setCountry(e.target.value)}
                placeholder={"Select"}
                className={classes.select}
              >
                {countries?.map((item: any, index: any) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item.country}
                      onClick={() => {
                        window.open(item.href, "_blank");
                      }}
                    >
                      {item.country}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
          {/* <div className={classes.subscribeDiv}>
            <Typography
              variant="h4"
              className={["heading, "subscribeHeading].join(" ")}
            >
              Subscribe to Our Newsletter
            </Typography>
            <Typography
              variant="h5"
              className={[
                "linkHeading,
                "subscribeSubheading,
              ].join(" ")}
            >
              Be the first to know about our new arrivals and exclusive offers.
            </Typography>
            <Input className={classes.emailInput} placeholder="Email Address" />
          </div> */}
        </div>
      </div>
      <div className={classes.downFooter}>
        <Typography variant="body1" className={classes.caption}>
          © {new Date().getFullYear()} The Body Shop. All Rights Reserved.
        </Typography>
        <Typography variant="body1" className={classes.caption}>
          The Body Shop International Limited (Company No. 1284170), Watersmead,
          Littlehampton, West Sussex, BN17 6LS.
        </Typography>
      </div>
    </>
  );
};

export default Footer;
