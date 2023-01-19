import  { useEffect, useState } from "react";
import Heading from "./Heading";
import Utils from "../../utils";
import {  Grid, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import Product from "../../components/common/product";
import { getWishList } from "./action";
import { useDispatch, useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import _ from "lodash";
import { screenViewed } from "../../utils/event/action";
import events from "../../utils/event/constant";
import { Box, CircularProgress } from "@mui/material";
/**
 * Components
 */
import Suggestions from "./suggestions";
import SkeletonProductView from "../skeletonList/skeletonProductView";
import Product from "../product";
// import { hideSkeleton, showSkeleton } from "../home/actions";
// import SkeletonProductView from "../../components/common/skeletonList/skeletonProductView";
// import OrderNotFound from "../account/orders/orderNotFound";

const useStyles = makeStyles((theme:Theme) => ({
  mainContainer: {
    height: "700px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    // padding: theme.spacing(3, 13.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0, 0),
    },
  },
  outerDiv: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0),
    },
  },
  wishlistDiv: {
    width: "calc(100% + 40px)",
    margin: theme.spacing(-2),
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      width: "100%",
      display: "flex",
      // flexDirection: "column"
    },

  },
  product: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    padding: "20px 0",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr 1fr",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
    },
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .MuiTypography-h3": {
      marginTop: theme.spacing(1.5),
      fontFamily: "Recoleta",
      fontSize: 28,
    },
  },
  totalItem: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2
    )} Druk`,
    padding: theme.spacing(2, 1),
    lineHeight: "23px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  background: {
    [theme.breakpoints.down("xs")]: {
      height: "350px",
      background: "#F7F3E8",
    },
  },
  secondDiv: {
    [theme.breakpoints.down("xs")]: {
      borderTop: "10px solid #F7F3E8",
      borderBottom: "10px solid #F7F3E8",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: "#fff",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
}));

const Wishlist = () => {
  const classes = useStyles();
  const dispatch : any = useDispatch();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [firstCall, setFirstCall] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const limit = 10;
  const wishlistData: any =
    useSelector((state: ReducersModal) => state.wishlistReducer)
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  useEffect(() => {
    if (firstCall) {
      // dispatch(showSkeleton());
      fetchData(() => {
        setIsFetching(false);
        setFirstCall(false);
        // dispatch(hideSkeleton());

      })
    }

    /**
     * Event logger
     */
    screenViewed({
      ScreenName: events.SCREEN_WISHLIST,
      CTGenerated: "WEB",
    });

    return () => {
      dispatch({ type: Utils.ActionName.WISHLIST, payload: {} })
    }
  }, []);

  const fetchData = (callback: Function) => {
    dispatch(
      getWishList({ limit, page }, (_resp: any) => {
        setPage(page + 1);
        callback();
      })
    );
  }

  const handleScroll = (e: any) => {
    const bottom = Math.abs(Math.ceil(e.target.scrollHeight - e.target.scrollTop) - e.target.clientHeight) < 300;
    if (bottom && wishlistData?.nextPage !== -1) {
      setIsFetching(true)
    }
  };

  useEffect(() => {
    if (isFetching && !firstCall)
      fetchData(() => {
        setIsFetching(false)
      })

  }, [isFetching]);

  return (
    <div onScroll={handleScroll} className={classes.mainContainer}>
      <Heading item={wishlistData?.totalCount} />

      {skeletonLoader ? (
        <SkeletonProductView flag={"wishlist"} />
      ) : !_.isEmpty(wishlistData?.data) ? (
        <div className={classes.secondDiv}>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
          {wishlistData?.totalCount && (
              <Typography className={classes.totalItem}>
                {`${wishlistData?.totalCount} ${wishlistData?.totalCount > 1 ? "Items" : "Item"
                  }`}
              </Typography>
            )}
          </Box>
          <Grid container
            className={classes.wishlistDiv}>
            {wishlistData?.data?.map((item: any, i: any) => {
              let image = item?.image?.[0]?.file;
              // let image = _.find(item.customAttributes, { attribute_code: 'image' });
              let configurableProduct = item?.configurableProductLinks?.find((item: any) => item?.isInStock) || item?.configurableProductLinks?.[0]
              let desc = item?.type === "configurable" ? _.find(configurableProduct?.customAttributes, { attribute_code: "short_description" })
                : _.find(item?.customAttributes, {
                  attribute_code: "short_description",
                });
              return (
                <Grid item xs={6} sm={4} className={classes.outerDiv} key={i}>
                  <Product
                    section="wishlist"
                    key={item?._id}
                    detail={_.truncate(
                      Utils.CommonFunctions.replaceHtmlTag(desc?.value),
                      { length: 80 }
                    )}
                    rate={item?.price}
                    img={image}
                    attr={item}
                  />
                </Grid>
              );
            })}
          </Grid>
          {isFetching && wishlistData.nextPage !== -1 && (
            <div className={classes.loader}>
              <CircularProgress color="primary" />
              </div>
          )}
        </div>
      ) : (""
        // <OrderNotFound
        //   background={classes.background}
        //   emptyBagIcon={true}
        //   message={"Your wishlist is empty."}
        //   hideButton={true}
        // />
      )}
      {wishlistData?.data?.length === 0 ? <Suggestions /> : null}
    </div>
  );
};

export default Wishlist;
