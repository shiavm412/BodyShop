//@ts-nocheck
import {
  Theme,
  Typography,
  Grid,
  MenuItem,
  Hidden,
  IconButton,
  Menu,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { useHistory, useLocation, useParams } from "react-router-dom";
// import { Helmet } from "react-helmet";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
// import Filters from "./filters";
// import Products from "./listProducts";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "./action";
import { ReducersModal } from "../../component/models";
import RecommendationCarousel from "../../component/common/recommendationCarousel";
// import Skeleton from "@mui/material/Skeleton";
import { Skeleton } from "@mui/material";
import SkeletonProductView from "../../component/common/skeletonList/skeletonProductView";
// import ProductNotFound from "./productNotFound";
import { debug } from "util";
import Head from "next/head";
import Products from "./listProducts";
import Filters from "./filters";
import { FilterProductSkeleton } from "../../../common/skeletonList/filterProductSkeleton";
import Utils from "../../../utils";
import { customGa4Event } from "../../../utils/gtag";
import { useRouter } from "next/router";
declare global {
  interface Window {
    gtag?: any;
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  bannerRoot: {
    background: "var(--white)",
    backdropFilter: "blur(2px)",
    position: "relative",
    // top: "-10vh",
  },
  bannerRoot2: {
    [theme.breakpoints.up("sm")]: {
      top: "-8vh",
    },
  },
  productContainer: {
    background: "var(--white)",
  },
  findContainer: {
    width: "1170px",
    margin: "0 auto",
    maxWidth: "100%",
  },
  filterHead: {
    padding: "60px 20px 15px",
  },
  filterProductText: {
    letterSpacing: "2px",
  },
  leftFilter: {
    display: "flex",
    alignItems: "center",
    "& .MuiTypography-body1": {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2
      )} Druk`,
      marginLeft: theme.spacing(2),
      lineHeight: "23px",
    },
  },
  filterImg: {
    width: 20,
  },
  filters: {
    fontSize: "16px",
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      fontSize: "13px",
      marginTop: theme.spacing(1.5),
      marginLeft: theme.spacing(0),
    },
    // width:"20px"
  },

  select: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.5
    )} Wrok Sans`,
    "& .MuiInput-underline:after": {
      border: "none",
    },
    "& .MuiInput-underline:before": {
      display: "none",
    },

    "& .MuiInput-input": {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2
      )} Druk`,
      marginLeft: theme.spacing(2),
      lineHeight: "23px",
    },
  },
  filterBody: {
    // height: 1400
    // maxHeight: 1000,
  },
  filterFooter: {
    marginTop: theme.spacing(10),
    width: "100%",
  },
  carouselHeading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.4
    )}  Recoleta Alt`,
    color: "#084236",
    lineHeight: 1.5,
    marginBottom: theme.spacing(0.5),
    maxWidth: "500px",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "none",
      fontSize: "16px",
      marginTop: theme.spacing(14.5),
    },
    marginLeft: "10px",
  },
  arrow: {
    padding: theme.spacing(0, 1),
  },
  button: {
    "& .MuiTypography-body1": {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2
      )}  Druk`,

      lineHeight: "23px",
      letterSpacing: "0.04em",
      textTransform: "uppercase",

      color: "var(--black300)",
    },
    "& .MuiIconButton-root": {
      padding: 0,
      borderRadius: "0%",
    },
    "& .MuiIconButton-root:hover": {
      background: "none",
    },
  },
  link: {
    color: "lightblue",
    font: `normal 400 ${theme.spacing(2)}  Work Sans`,
    cursor: "pointer",
  },
  productData: {
    // margin: theme.spacing(1, "0"),
    padding: theme.spacing(0, 1),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0, 0),
    },
  },
}));

function FilterProducts() {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const history = useHistory();
  // const location: any = useLocation();
  // const params: any = useParams();
  const location = useRouter();
  const sortingData = Utils.constants.sortingData;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const query = Utils.CommonFunctions.useQuery();

  let queryFilters = query.get("filters") ?? "{}";
  queryFilters = JSON.parse(
    decodeURIComponent(decodeURIComponent(queryFilters))
  );

  const findSortingData = (id: string) => {
    let sortingObj = sortingData[0];
    if (id)
      sortingObj = sortingData?.find((data: any) => data?.id === Number(id));
    return sortingObj;
  };

  const recommendedData = useSelector(
    (state: ReducersModal) => state.recommendReducer.recommendedData
  );
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  const productData = useSelector(
    (state: ReducersModal) => state.productReducer?.data
  );
  // const filters = useSelector(
  //   (state: any) => state.productFilterReducer?.filters
  // );

  const { filters } = useSelector((state: any) => state.productFilterReducer);

  const [page, setPage] = useState(queryFilters?.page ?? 1);
  const [sorting, setSorting] = React.useState(sortingData[0]);
  const products = productData?.products || {};

  // let keyword = params?.keyword ?? "";
  let keyword = "";

  // const fromPath = location?.state?.fromPath || "";
  const fromPath = "";

  const urlKey = location.query.slug;

  let obj: any = {
    query: keyword,
    page,
    sortBy: sorting?.id?.toString(),
    urlKey,
    otherFilters: [],
    customAttributes: [],
  };

  const [apiParams, setApiParams] = useState(obj);

  const { menuData, authToken } = useSelector(
    (state: ReducersModal) => state.homeReducer
  );

  useEffect(() => {
    window.scrollTo(0, 400);
    // dispatch(showSkeleton());

    let sort = findSortingData(queryFilters?.sortBy);
    setSorting(sort);
    let newQueryFilters = queryFilters;
    let newPage =
      queryFilters?.otherFilters?.length !== 0 ? 1 : queryFilters?.page;
    newQueryFilters = { ...queryFilters, page: newPage };

    setPage(newQueryFilters?.page);
    const payload = { ...obj, ...newQueryFilters, urlKey, query: keyword };

    setApiParams(payload);

    // dispatch(
    //   getProductList(
    //     payload,
    //     true,
    //     (_resp: any) => {
    //       dispatch(hideSkeleton());
    //     },
    //     null,
    //     fromPath === "home"
    //       ? () => {
    //           history.push(
    //             `${Utils.routes.PRODUCT_LIST}?categoryId=${menuData?.[0]?.magentoId}`
    //           );
    //         }
    //       : null
    //   )
    // );
  }, [keyword, urlKey]);

  const getFilteredProductsList = (_recall?: boolean) => {};

  useEffect(() => {
    window.scrollTo(0, 0);
    let params: any = { page, limit: 10, type: "history" };
    if (authToken) {
      // dispatch(showSkeleton());
      dispatch(
        getOthersRecommendations(params, () => {
          dispatch(hideSkeleton());
        })
      );
    }
  }, [authToken]);

  useEffect(() => {
    if (productData?.products) {
      let ProductsArray =
        productData?.products &&
        productData?.products?.data &&
        productData?.products?.data.reduce((i: any, j: any, index: number) => {
          i.push({
            id: j.sku,
            item_id: j.sku,
            name: j.name,
            item_name: j.name,
            currency: "INR",
            index: index + 1,
            brand: "The Body Shop",
            item_brand: "The Body Shop",
            category: j.category?.name,
            item_category: j.category?.name,
            list_id: j.sku,
            item_list_id: j.sku,
            list_name: j.name,
            item_list_name: j.name,
            price: j.price,
            // "quantity":j.sku1
          });
          return i;
        }, []);
      if (typeof window && window.gtag !== "undefined") {
        const gaPayload = {
          items: ProductsArray,
        };
        customGa4Event("view_item_list", gaPayload);
        if (
          process.env.NEXT_PUBLIC_ENV !== "development" &&
          process.env.NEXT_PUBLIC_ENV !== "staging"
        ) {
          window.gtag("event", "view_item_list", gaPayload);
        }
      }
    }
  }, [productData?.products?.data]);

  const handleProductSort = (item: any) => {
    const payload = {
      ...apiParams,
      sortBy: item?.id?.toString(),
      page: 1,
    };

    setAnchorEl(null);
    setSorting(item);
    setApiParams(payload);

    if (location.pathname === "/[slug]/h/[googleKey]") {
      location.push({
        pathname: "/[slug]/h/[googleKey]",
        query: {
          ...location.query,
          search: `${encodeURI(encodeURIComponent(JSON.stringify(payload)))}`,
        },
      });
    }

    if (location.pathname === "/[slug]/[category]/c/[gooogleKey]") {
      location.push({
        pathname: "/[slug]/[category]/c/[gooogleKey]",
        query: {
          ...location.query,
          search: `${encodeURI(encodeURIComponent(JSON.stringify(payload)))}`,
        },
      });
    }

    // if (item) {
    //   // window.scrollTo(0, 400);
    //   // dispatch(showLoader());
    //   // dispatch(
    //   //   getProductList(payload, false, () => {
    //   //     dispatch(hideLoader());
    //   //     history.push({
    //   //       pathname: history.location.pathname,
    //   //       search: `?filters=${encodeURI(
    //   //         encodeURIComponent(JSON.stringify(payload))
    //   //       )}`,
    //   //     });
    //   //   })
    //   // );
    // }
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (_e: any, page: number) => {
    // window.scrollTo(0, 400);
    // setPage(page);

    const payload = {
      ...apiParams,
      page,
      urlKey,
    };
    setApiParams(payload);

    const { slug, googleKey } = location.query;

    if (location.pathname === "/[slug]/h/[googleKey]") {
      location.push({
        pathname: "/[slug]/h/[googleKey]",
        query: {
          ...location.query,
          page,
        },
      });
    }

    if (location.pathname === "/[slug]/[category]/c/[gooogleKey]") {
      location.push({
        pathname: "/[slug]/[category]/c/[gooogleKey]",
        query: {
          ...location.query,
          page,
        },
      });
    }

    if (location.pathname === "/[slug]/h/[googlekey]")
      if (location.pathname === "/[slug]/c/[googleKey]") {
      }

    if (location.pathname === "/[slug]/p/[googleKey]") {
    }

    // location.push()
    // dispatch(showLoader());
    // dispatch(
    //   getProductList(payload, false, () => {
    //     dispatch(hideLoader());
    //     history.push({
    //       pathname: history.location.pathname,
    //       search: `?filters=${encodeURI(
    //         encodeURIComponent(JSON.stringify(payload))
    //       )}`,
    //     });
    //   })
    // );
  };

  return (
    <div className={classes.productContainer}>
      <div className={classes.findContainer}>
        <div
          className={clsx({
            [classes.bannerRoot]: true,
            [classes.bannerRoot2]:
              productData?.categoryData?.id &&
              (productData?.categoryData?.description ||
                productData?.categoryData?.image),
          })}
        >
          {/* {/ Filter Header Section /} */}
          {skeletonLoader || Object.keys(productData).length === 0 ? (
            <FilterProductSkeleton />
          ) : (
            <>
              <Hidden xsDown>
                <div className={classes.filterHead}>
                  <Grid container>
                    {filters && (
                      <Grid item xs={12} sm={3}>
                        <div className={classes.leftFilter}>
                          <img
                            src={Utils.images.TUNE}
                            alt="filter"
                            className={classes.filterImg}
                          />
                          <Typography
                            className={classes.filterProductText}
                            variant="body1"
                          >
                            FILTER PRODUCTS
                          </Typography>
                        </div>
                      </Grid>
                    )}
                    <Grid item xs={6} sm={6}>
                      {productData?.products?.data ? (
                        <Typography className={classes.filters} variant="body1">
                          <strong> Showing </strong>
                          {`${productData?.products?.data?.length ?? "0"} of ${
                            productData?.products?.totalCount ?? "0"
                          } ${
                            productData?.products?.data?.length === 1
                              ? "product"
                              : "products"
                          }`}
                        </Typography>
                      ) : null}
                    </Grid>
                    {filters &&
                      products?.data &&
                      products?.data?.length > 0 && (
                        <Grid item xs={6} sm={3} className={classes.select}>
                          <div className={classes.button}>
                            <IconButton
                              aria-label="account of current user"
                              aria-controls="menu-appbar"
                              aria-haspopup="true"
                              onClick={handleMenu}
                              value={sorting.id}
                              color="inherit"
                            >
                              <Typography>{sorting.name}</Typography>
                              <img
                                src={Utils.images.DOWN_ARROW}
                                className={classes.arrow}
                                alt="downArrow"
                              />
                            </IconButton>
                            <Menu
                              id="menu-appbar"
                              anchorEl={anchorEl}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              keepMounted
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              open={open}
                              onClose={handleClose}
                            >
                              {sortingData?.map((val: any, i: any) => (
                                <MenuItem
                                  key={i}
                                  value={val.id}
                                  onClick={() => handleProductSort(val)}
                                >
                                  {val.name}
                                </MenuItem>
                              ))}
                            </Menu>
                          </div>
                        </Grid>
                      )}
                  </Grid>
                </div>
              </Hidden>
              {/* {/ Listing Body Section /} */}
              <div className={classes.filterBody}>
                <Grid container>
                  <Hidden xsDown>
                    <Grid item xs={11} md={3}>
                      <Filters obj={obj} setParams={setApiParams} />
                    </Grid>
                  </Hidden>
                  <Grid item xs={12} md={9}>
                    <Products
                      setParams={setApiParams}
                      handleChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </div>
            </>
          )}
          {/* <div className={classes.filterFooter}>
            {skeletonLoader || Object.keys(recommendedData).length === 0 ? (
              <>
                <Skeleton height={20} width={"40%"} />
                <SkeletonProductView
                  flag={"recommend"}
                  gridsArray={[1, 2, 3, 4, 5]}
                />
              </>
            ) : recommendedData?.data?.length > 0 ? (
              <>
                <Typography variant="h4" className={classes.carouselHeading}>
                  Why not have another look?
                </Typography>
                <RecommendationCarousel type="plp" />
              </>
            ) : null}
          </div> */}
        </div>
        {/* {/ )} /} */}
      </div>
    </div>
  );
}

export default FilterProducts;
