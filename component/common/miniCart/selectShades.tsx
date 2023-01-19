import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import {Button, Divider, Drawer, List, Theme, Typography} from "@mui/material";
import Image from "next/image";
import Utils from "../../utils";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullList: {
      width: "400px",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "360px",
      },
    },
    headerDiv: {
      padding: theme.spacing(2, 1),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    header: {
      font: `normal ${theme.spacing(2.4)} Recoleta`,
      color: "var(--green-color)",
      fontWeight: 600,
      textTransform: "uppercase",
    },
    imgDiv: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    btn: {
      display: "flex",
      justifyContent: "space-around",
      margin: theme.spacing(3, 0),
      padding: theme.spacing(1.2, 0),
      width: "100%",
      height: "auto",
      borderRadius: "4px",
      "& .MuiButton-label": {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.6
        )} Work Sans`,
      },
    },
   
    heartImg: {
      position: "absolute",
      top: "7%",
      right: "7%",
      padding:0
    },
    innerContainer: {
      display: "flex",
      justifyContent: "space-between",
      padding: theme.spacing(1.5, 1.3),
    },
    shade: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )} Recoleta`,
      lineHeight: "33px",
      color: theme.palette.primary.main,
    },

    detailsContainer: {
      padding: theme.spacing(0, 1),
    },
    title: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )} Work Sans`,
      lineHeight: "24px",
      color: "var(--secondary-black)",
    },
    details: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.3
      )} Work Sans`,
      lineHeight: "15px",
      padding: theme.spacing(1, 0),
      color: "var(--light-gray)",
    },
    shadeNumber: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )} Work Sans`,
      lineHeight: "16px",
      padding: theme.spacing(2, 0, 1.5),
      color: theme.palette.primary.main,
    },
    productContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      padding: theme.spacing(0, 1),
    },
    name: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )} Work Sans`,
      lineHeight: "24px",
      color: "var(--secondary-black)",
      textAlign: "center",
    },
    name1: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )} Work Sans`,
      lineHeight: "24px",
      color: "var(--secondary-black)",
      textAlign: "center",
      margin: theme.spacing(0, 0, 1, 0),
    },
    productNumber: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.3
      )} Work Sans`,
      lineHeight: "24px",
      color: "var(--light-gray)",
      textAlign: "center",
    },
    itemContainer: {
      padding: theme.spacing(1.5, 0.5),
    },
    buttonContainer: {
      padding: theme.spacing(1.5, 1.3),
    },
    colorContainer: {
      display: "flex",
      maxWidth: "83%",
      justifyContent: "space-between",
    },
    colors: {
      backgroundColor: "#DE6D96",
      display: "flex",
      width: "18px",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(0.2, 0, 0.2, 0.1),
    },
    crossBtn: {
      cursor: 'pointer',
    }
  })
);

interface Props {
  position: any;
  visible: boolean;
  toggleDrawer: Function;
  closeShadesOpenSize: Function;
  item: any;
  toggleSelectSizeDrawer: Function
}
const SelectShades: React.FC<any> = (props: Props) => {
  const classes = useStyles();
  const { toggleDrawer, visible, position, closeShadesOpenSize, item } = props;

  const list = (_anchor: any) => (
    <div
      className={classes.fullList}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.headerDiv}>
        <Typography className={classes.header}>Select Shade</Typography>
        <div className={classes.crossBtn}
            onClick={toggleDrawer(position, false)}>
         <Image src={Utils.images.CROSS} alt="cross" width={20} height={20} />
         
        </div>
      </div>
      <Divider />
      <List>
        <div className={classes.innerContainer}>
          <div className={classes.imgDiv}>
            <Image
              src={Utils.images.HEART}
              alt="heart"
              width={20} height={20}
              className={classes.heartImg}
            />
            <Image
              src={Utils.images.LIPSTICK}
              alt="item"
              width={20} height={20}
              style={{ width: "100%" }}
            />
          </div>
          <div className={classes.detailsContainer}>
            <Typography className={classes.title}>
              Key Beauty Long Stay Matte Lipstick
            </Typography>
            <Typography className={classes.details}>
              MATTE FINISHLONG • LASTING
            </Typography>
            <Typography className={classes.shadeNumber}>12 Shades</Typography>
            <div className={classes.colorContainer}>
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <React.Fragment key={i}>
                  <div className={classes.colors}>
                    {i === 1 ? <img src={Utils.images.TICK} alt="tick" /> : ""}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <Divider light />
        <div className={classes.productContainer}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={classes.itemContainer}>
               <Image
              src={Utils.images.LIPSTICK}
              alt="item"
              width={20} height={20}
              style={{ width: "100%" }}
            />
              <Typography className={classes.name}>910 MILAN PANSY</Typography>
              <Typography className={classes.productNumber}>
                #1096167
              </Typography>
            </div>
          ))}
        </div>
        <Divider light />
        <div className={classes.buttonContainer}>
          <Typography className={classes.name1}>910 MILAN PANSY</Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => closeShadesOpenSize(item)}
          >
            Add to Bag: ₹6.50
          </Button>
        </div>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        {/* <Button>
          <img
            src={Utils.images.CART}
            alt="cart"
            onClick={toggleDrawer("right", true)}
          />
        </Button> */}
        <Drawer
          anchor={position}
          open={visible}
          onClose={toggleDrawer(position, false)}
        >
          {list(position)}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
export default SelectShades;
