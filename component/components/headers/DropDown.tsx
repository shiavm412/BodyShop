// import React from "react";
// import { SUB_MENU_PIC, SHOP_NOW_ARROW } from "utils/constantImages";

import { Typography } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   dropdownContent: {
//     display: "none",
//     position: "absolute",
//     backgroundColor: "var(--white)",
//     width: "100%",
//     borderTop: "1px solid var(--border-color)",
//     left: "0",
//     top: "50px",
//     zIndex: 1,
//     padding: theme.spacing(1.5, 4.4, 1.5, 1.2),
//   },
//   listTitle: {
//     font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
//       2
//     )} Recoleta`,
//     lineHeight: "27px",
//     letterSpacing: "0.06em",
//     color: "var(--primary)",
//   },
//   links: {
//     font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
//       1.5
//     )} Work Sans`,
//     lineHeight: "18px",
//     color: "var(--primary)",
//     margin: theme.spacing(1.5, 0),
//   },
//   container: {
//     display: "flex",
//   },
//   container1: {
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   picTitle: {
//     font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
//       3
//     )} Druk`,
//     lineHeight: "35px",
//     letterSpacing: "0.02em",
//     textTransform: "uppercase",
//     textShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
//     position: "absolute",
//     width: "70%",
//     left: "4%",
//     top: "2%",
//   },
//   picContainer: {
//     position: "relative",
//     color: "var(--white)",
//   },
//   shopNow: {
//     font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
//       1.6
//     )} Work Sans`,
//     lineHeight: "19px",
//     letterSpacing: "0.02em",
//     textShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
//     left: "4%",
//     top: "54%",
//     position: "absolute",
//   },
// }));

const shopTrendingData = [
  "Bestsellers",
  "New in",
  "Special edition",
  "Top rated",
  "Travel sizes",
  "Vegan products",
  "Summer Essentials",
];

const selfCareData = [
  "Body butters",
  "Guide to self care",
  "Hand care essentials",
];

const DropDown = () => {
  // const classes = useStyles();
  return (
    <div>
      <div className={["dropdownContent", "hoverDropdown"].join(" ")}>
        <div className={"container1"}>
          <div className={"container"}>
            <div style={{ padding: "0 30px " }}>
              <Typography className={"listTitle"}>
                Shop Trending
              </Typography>
              {shopTrendingData.map((i) => (
                <Typography className={"links"} key={i}>
                  {i}
                </Typography>
              ))}
            </div>
            <div style={{ padding: "0 30px " }}>
              <Typography className={"listTitle"}>Self care</Typography>
              {selfCareData.map((i) => (
                <Typography className={"links"} key={i}>
                  {i}
                </Typography>
              ))}
            </div>
            <div style={{ padding: "0 30px " }}>
              <Typography className={"listTitle"}>
                Refer a friend
              </Typography>
              <Typography className={"links"}>
                Get 20% off when you refer a friend
              </Typography>
            </div>
          </div>
          <div className={"picContainer"}>
            <Typography className={"picTitle"}>
              Our Most Powerful Haircare ever
            </Typography>
            {/* <img src={SUB_MENU_PIC} alt="product" /> */}
            <Typography className={"shopNow"}>
              Shop Now{" "}
              <span>
                {/* <img src={SHOP_NOW_ARROW} alt="arrow" /> */}
              </span>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
