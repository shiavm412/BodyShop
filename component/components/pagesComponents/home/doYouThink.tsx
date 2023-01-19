import {
 
  Theme,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { useState } from "react";
import CustomButton from "../../../common/button";
import Utils from "../../../utils";
// import RatingModal from "../../pages/rating&review/rating";
// import Skeleton from "@mui/material/Skeleton";
// import { useSelector } from "react-redux";
// import { ReducersModal } from "../../models";
// import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) =>
  ({
    doYouThink: {
      padding: theme.spacing(2.5, 2),
      margin: theme.spacing(2, 0),
      backgroundColor: theme.palette.primary.main,
    },
    skelton: {
      margin: theme.spacing(2, 0),
    },
    maxWidthDiv: {
      margin: theme.spacing(0, "auto"),
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      padding: "0px 90px",
      [theme.breakpoints.down("md")]: {
        padding: "0px 15px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0px 5px",
      },
      // maxWidth: "var(--max-width)",
    },
    gridItem: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "baseline",
      [theme.breakpoints.down("sm")]: {
        alignItems: "center",
        marginBottom: "20px",
        textAlign: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "center",
        marginBottom: theme.spacing(3),
      },
    },
    leftDiv: {
      marginRight: "10%",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0),
      },
      // [theme.breakpoints.down("sm")]: {
      //   // margin: theme.spacing(0),
      //   display:"flex",
      //   flexDirection:"column",
      //   alignItems:"center",
      //   width:"100%"
      // },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )}  Recoleta Alt`,
      color: "var(--white)",
      lineHeight: "40px",
      marginBottom: theme.spacing(0.5),
      maxWidth: "200px",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "none",
        fontSize: "16px",
      },
      textTransform: "lowercase",
      "&::first-letter": {
        textTransform: "capitalize",
      },
      [theme.breakpoints.down("sm")]: {
        // alignItems: "center",
        // marginBottom:"20px"
        maxWidth: "100%",
        textAlign: "center",
      },
    },
    paragraph: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.6
      )}  Recoleta Alt`,
      color: "var(--text-color)",
      letterSpacing: "-0.3333px",
      textTransform: "lowercase",
      "&::first-letter": {
        textTransform: "capitalize",
      },
    },
    rightDiv: {},
    productAndTextDiv: {
      display: "flex",
      marginBottom: theme.spacing(2.5),
    },

    imgDetails: {
      font: `normal 400 ${theme.spacing(1.4)}  Work Sans`,
      color: "var(--text-color)",
      maxWidth: "225px",
      lineHeight: "22.4px",
      letterSpacing: "-0.333px",
      marginBottom: theme.spacing(0.5),
      [theme.breakpoints.down("xs")]: {
        maxWidth: "none",
      },
    },
    starDiv: {
      "& img": {
        "&:not(:last-child)": {
          marginRight: theme.spacing(1),
        },
      },
    },
    reviewBtn: {
      "&.MuiButton-root": {
        borderRadius: 4,
        font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
          1.4
        )} Work Sans`,
        textTransform: "capitalize",
        padding: theme.spacing(1.5, 3),
        color: "var(--white)",
        border: "1px solid var(--white)",
        // width: "270px",
        [theme.breakpoints.down("xs")]: {
          width: "100%",
        },
      },
    },
    imgDiv: {
      width: "98px",
      height: "120px",
      backgroundColor: "var(--light-creame-color)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 4,
      marginRight: theme.spacing(1.5),
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    noImage: {
      width: "100%",
      height: "100%",
      padding: "10px",
    },
  })
);
interface Props {
  data: any;
  getRateOrdersData: Function;
}
const DoYouThink: React.FC<Props> = (props: Props) => {
  const { data } = props;
  const history = useRouter();
  const classes = useStyles();
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

  // const [ratingModalVisibility, setRatingModalVisibility] = useState(false);
  //@ts-ignore
  const [product, setProduct] = useState<any>();

  const handleRatingModalOpen = (product: string) => {
    setProduct(product);
    // setRatingModalVisibility(true);
  };

  // const handleRatingModalClose = () => {
  //   setRatingModalVisibility(false);
  //   getRateOrdersData();
  // };

  return (
    <>
      <div className={classes.doYouThink}>
        <Grid container spacing={2} className={classes.maxWidthDiv}>
          <Grid item xs={12} sm={12} md={3} className={classes.gridItem}>
            <div className={classes.leftDiv}>
              <Typography variant="h4" className={classes.heading}>
                what do you think of the item?
              </Typography>
              <Typography variant="body2" className={classes.paragraph}>
                rate your purchase
              </Typography>
            </div>
          </Grid>

          {data.map((item: any, index: number) => {
            const img = item?.items?.image?.[0]?.file
              ? IMAGE_URL + "catalog/product" + item?.items?.image?.[0]?.file
              : Utils.images.PRODUCT_PLACEHOLDER;
            if (index <= 2)
              return (
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.productAndTextDiv}>
                    <div className={classes.imgDiv}>
                      <img
                        className={
                          item?.items?.image?.[0]?.file
                            ? classes.img
                            : classes.noImage
                        }
                        src={img}
                        alt="product one"
                      />
                    </div>
                    <div>
                      <Typography
                        variant="body2"
                        className={classes.imgDetails}
                      >
                        {item?.items?.name || ""}
                      </Typography>
                      <div className={classes.starDiv}>
                        {Array.of(1, 2, 3, 4, 5).map((num) => (
                          <img
                            src={Utils.images.STAR}
                            alt="star"
                            key={num}
                            onClick={() =>
                              handleRatingModalOpen(item?.items || "")
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Grid>
              );
          })}

          <Grid item xs={12} sm={6} md={3}>
            <CustomButton
              onClick={() => {
                history.push(Utils.routes.ORDER_HISTORY);
              }}
              type="button"
              className={classes.reviewBtn}
              fullWidth={true}
              text={"Review More Products"}
            />
          </Grid>
        </Grid>
        {/* {ratingModalVisibility && (
          <RatingModal
            product={product}
            // sku={productSku}
            open={ratingModalVisibility}
            handleClose={handleRatingModalClose}
          />
        )} */}
      </div>
    </>
  );
};

export default DoYouThink;
