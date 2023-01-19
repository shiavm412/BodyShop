import {
  Theme,
  Typography,
  Avatar,
  Rating,
} from "@mui/material";
import { makeStyles , createStyles} from "@mui/styles";


import _ from "lodash";
import { useRouter } from "next/router";
import Utils from "../../../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      font: `normal 700 ${theme.spacing(1.6)}  Recoleta Alt Bold`,
      color: "var(--secondary-black)",
      textTransform: "capitalize",
      letterSpacing: "0.04em",
      marginTop: theme.spacing(1),
    },
    container: {
      width: "100%",
      height: "auto",
      padding: theme.spacing(1),
    },
    productDiv: {
      position: "relative",
    },
    imgDiv: {},
    productImg: {
      width: theme.spacing(16.5),
      height: theme.spacing(20),
      // border: "1px solid white",
      // borderRadius: "12px",
      // "&.MuiPaper-elevation1": {
      //   boxShadow: "none",
      // },
    },
    productImg2: {
      width: "100%",
      height: "100%",
    },
    heartImg: {
      position: "absolute",
      top: "8px",
      right: "8px",
    },
    outerDiv: {
      display: "flex",
      gap: "10px",
      overflowX: "auto",
      marginTop: theme.spacing(2),
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    textDiv: {},
    mainProduct: {
      display: "flex",
      flexDirection: "column",
      width: "50%",
    },
    title: {
      // font: `normal 700 ${theme.spacing(1.5)}  Recoleta Alt`,
      // color: "var(--secondary-black)",
      // textTransform: "capitalize",
      // letterSpacing: "0.04em",
      // marginTop: theme.spacing(1),

      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2
      )} Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: "25px",
      height: 50,
      // height: '60px',
      [theme.breakpoints.down("xs")]: {
        //   height: '80px',
        font: "normal 700 15px Work Sans",
        lineHeight: "24px",
      },
      // textOverflow: "ellipsis",
      overflow: "hidden",
      // whiteSpace: "nowrap",
    },
    rating: {
      color: theme.palette.secondary.light,
      [theme.breakpoints.down("xs")]: {
        fontSize: "17px",
      },
    },
    count: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )} Work Sans`,
      color: "var(--light-gray)",
      [theme.breakpoints.down("xs")]: {
        marginLeft: "5px",
      },
      // marginTop: theme.spacing(0.3),
    },
    rateDiv: {
      margin: theme.spacing(0.5, 0),
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      [theme.breakpoints.down("xs")]: {
        fontSize: "17px",
        marginBottom: "9px",
      },
    },
    avatarImg: {
      width: "40px",
      height: "40px",
    },
    userName: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.2
      )} Work Sans`,
      color: "var(--secondary-black)",
      marginLeft: theme.spacing(1),
    },
    userDiv: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      margin: theme.spacing(0.5, 0),
    },
    description: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.2
      )} Work Sans`,
      color: "var(--light-gray)",
      inlineSize: "100%",
      overflowWrap: "break-word",
    },
    viewDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      marginTop: "8px",
    },
    viewBtn: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )} Work Sans`,
      color: "var(--primary)",
      marginRight: theme.spacing(0.5),
    },
    noImage: {
      width: "100%",
      height: "100%",
      padding: "20px",
    },
    noAvatarImage: {
      width: "40px",
      height: "40px",
      padding: "5px",
    },
  })
);
interface Props {
  latestReviews: any;
}
export default function LatestReviews({ latestReviews }: Props) {
  const classes = useStyles();
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;
  const history = useRouter();

  const redirect = (item: any) => {
    const pathname = Utils.CommonFunctions.seoUrl({ ...item, customAttributes: item.urlObj }, "pdp")
    history.push(pathname)

    // const path = Utils.CommonFunctions.replaceUrlParams(
    //   Utils.routes.PRODUCT_DETAIL,
    //   { ":id": item?.magentoId }
    // );
    // history.push({
    //   pathname: path,
    //   state: { pageName: "" },
    // });
  };

  return latestReviews?.length > 0 ? (
    <div>
      <div className={classes.container}>
        <Typography variant="h4" className={classes.heading}>
          Latest Reviews
        </Typography>

        <div className={classes.outerDiv}>
          {latestReviews.map((item: any) => (
            <div key={item?._id} className={classes.mainProduct}>
              <div className={classes.productDiv}>
                <div className={classes.productImg}>
                  <img
                    src={
                      item?.image?.[0]?.file
                        ? IMAGE_URL + "/catalog/product" + item.image?.[0].file
                        : Utils.images.PRODUCT_PLACEHOLDER
                    }
                    className={
                      item?.image?.[0]?.file
                        ? classes.productImg2
                        : classes.noImage
                    }
                    alt="imgProduct"
                  />
                </div>
              </div>
              <div className={classes.textDiv}>
                <Typography variant="h5" className={classes.title}>
                  {item?.name
                    ? _.truncate(
                      Utils.CommonFunctions.replaceHtmlTag(item?.name),
                      { length: 35 }
                    )
                    : ""}
                </Typography>
                <div className={classes.rateDiv}>
                  <Rating
                    className={classes.rating}
                    name="read-only"
                    value={item?.avgRating ? item.avgRating : 0}
                    readOnly
                  />
                  <Typography className={classes.count}>
                    ({item?.ratingCount || 0})
                  </Typography>
                </div>
                <div className={classes.userDiv}>
                  <Avatar
                    //  src={item?.review?.authorImage ?IMAGE_URL+ item?.review?.authorImage : Utils.images.PRODUCT_PLACEHOLDER}
                    //  className={item?.review?.authorImage ? classes.avatarImg : classes.noImage}

                    src={
                      item?.review?.authorImage
                        ? IMAGE_URL + item?.review?.authorImage
                        : Utils.images.PRODUCT_PLACEHOLDER
                    }
                    className={
                      item?.review?.authorImage
                        ? classes.avatarImg
                        : classes.noAvatarImage
                    }
                    alt="profileImg"
                  />

                  <Typography className={classes.userName}>
                    {" "}
                    {item?.review?.authorName || ""}
                  </Typography>
                </div>
                <Typography variant="h6" className={classes.description}>
                  {item?.review?.comment
                    ? _.truncate(
                      Utils.CommonFunctions.replaceHtmlTag(
                        item?.review?.comment
                      ),
                      { length: 60 }
                    )
                    : ""}
                </Typography>
                <div className={classes.viewDiv}>
                  <Typography
                    className={classes.viewBtn}
                    onClick={() => redirect(item)}
                  >
                    VIEW
                  </Typography>
                  <img src={Utils.images.ARROW_VIEW} alt="arrow" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
}
