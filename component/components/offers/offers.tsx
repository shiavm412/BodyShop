import {
  
  Theme,
  Typography,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Utils from "../../utils";
import { useState } from "react";
import ShopNow from "./shopNow";
import clsx from "clsx";
import _ from "lodash";
import { Box } from "@mui/material";
import Image from "next/image";
import CustomButton from "../../common/button";


const useStyles = makeStyles((theme: Theme) =>
  ({
    productContainer: {},

    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3.6
      )}  Work Sans`,
      fontWeight: 600,
      lineHeight: "42px",
    },

    innerContainer: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(1.5),
      },
    },
    ImgDiv: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1),
      boxShadow: "0px 5px 20px rgba(35, 30, 30, 0.06)",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
    },
    img: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
    },
    noImgBackground: {
      backgroundColor: "#F8F3E9",
      objectFit: "contain",
      padding: "10px",
    },
    cardHeading: {
      font: `normal ${theme.spacing(1.8)}  Recoleta Alt Bold`,
      lineHeight: "24px",
      color: "var(--black)",
      margin: theme.spacing(0.8, 0),
      width: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.6)}  Recoleta Alt Bold`,
        letterSpacing: "0.06em",
      },
    },
    cardSubHeading: {
      font: `normal ${theme.spacing(1.4)}  Work Sans`,
      lineHeight: "24px",
      color: "var(--secondary-black)",
      height: "70px",
      overflow: "hidden",
      // whiteSpace:"break-spaces",
      // textOverflow:"ellipsis"
      // [theme.breakpoints.down("md")]: {
      //   width: '50px',
      // },
      // [theme.breakpoints.down("sm")]: {
      //   width: '80%',
      // },
      [theme.breakpoints.down("xs")]: {
        height: "auto",
        font: `normal ${theme.spacing(1.4)}  Work Sans Medium`,
        lineHeight: "22.4px",
        letterSpacing: "0.02em",
      },
    },
    btn: {
      textAlign: "center",
      margin: theme.spacing(1, 0),
      width: "50%",
      [theme.breakpoints.down("xs")]: {
        width: "45%",
        "& .MuiButton-label": {
          font: `normal ${theme.spacing(1.4)}  Work Sans Medium`,
        },
      },
      "& .MuiButton-root": {
        fontSize: "14px",
      },
    },
    skeleton: {
      margin: theme.spacing(0, 2),
    },
    offerDiv: {
      padding: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        padding: 0,
        flexBasis: "100%",
      },
    },
  })
);
interface Props {
  navigateTo: Function;
  offersData: any;
}

function Offers({ navigateTo, offersData }: Props) {
  const classes = useStyles();
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

  const [state, setState] = useState({
    openShopNow: false,
  });
  // const handleShopNowOpen = () => {
  //   setState({ ...state, openShopNow: true });

  // };

  const handleShopNowClose = () => {
    setState({ ...state, openShopNow: false });
  };

  return (
    <>
      <div className={classes.productContainer}>
        <div className={classes.innerContainer}>
          <Grid container>
            {offersData?.map((item: any, index: number) => (
              <Grid
                item
                sm={6}
                md={6}
                lg={4}
                key={index}
                className={classes.offerDiv}
              >
                <div className={classes.ImgDiv}>
                  {item?.offer_image ? (
                    <img
                      src={`${IMAGE_URL}${item.offer_image}`}
                      alt="one"
                      className={
                        item.offer_image
                          ? classes.img
                          : clsx(classes.img, classes.noImgBackground)
                      }
                    />
                  ) : (
                    <div
                      className={
                        item.offer_image
                          ? classes.img
                          : clsx(classes.img, classes.noImgBackground)
                      }
                    >
                      {" "}
                      <Image src={Utils.images.PRODUCT_PLACEHOLDER} alt="Product" width={40} height={40} />
                    </div>
                  )}
                  <div>
                    <Typography variant="h3" className={classes.cardHeading}>
                      {item?.title
                        ? _.truncate(
                            Utils.CommonFunctions.replaceHtmlTag(item.title),
                            { length: 30 }
                          )
                        : ""}
                    </Typography>
                  </div>
                  <div>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                      <div
                        className={classes.cardSubHeading}
                        dangerouslySetInnerHTML={{
                          __html: item?.content
                            ? _.truncate(
                                Utils.CommonFunctions.replaceHtmlTag(
                                  item.content
                                ),
                                { length: 127 }
                              )
                            : "",
                        }}
                      />
                    </Box>
                    <Box sx={{ display: { xs: "block", sm: "none" } }}>
                      <div
                        className={classes.cardSubHeading}
                        dangerouslySetInnerHTML={{
                          __html: item?.content ? item.content : "",
                        }}
                      />
                    </Box>
                  </div>
                  <div className={classes.btn}>
                    {item?.button && (
                      <CustomButton
                        type={"submit"}
                        color="primary"
                        fullWidth
                        text={item?.button || ""}
                        onClick={() => navigateTo(item)}
                      />
                    )}
                    <ShopNow
                      open={state.openShopNow}
                      handleClose={handleShopNowClose}
                    />
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}

export default Offers;
