import { Theme, Grid, Hidden } from '@mui/material';
import { makeStyles } from '@mui/styles';
// import { useHistory, useParams } from "react-router-dom";
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
// import Utils from "../../component/utils";
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from './action';
// import { ReducersModal } from "../../component/models/index";
// import Skeleton from "@mui/material/Skeleton";
// import {
//   hideLoader,
//   hideSkeleton,
//   showLoader,
//   showSkeleton,
// } from "../../store/home/action";
// import { FilterProductSkeleton } from "../../component/common/skeletonList/filterProductSkeleton";
import MobileSortAndFilter from './mobileSortAndFilter';
// import SearchField from "../../component/headers/searchField";
import MobileProducts from './mobileProducts';
import Utils from '../../../utils';
import { customGa4Event } from '../../../utils/gtag';
import { FilterProductSkeleton } from '../../../common/skeletonList/filterProductSkeleton';
// import { handleScrollHeight } from "../../component/utils/scroll";
// import { useLocation } from "react-router-dom";
// import { customGa4Event } from "../../component/utils/gtag";

// import { customEvent } from "../../utils/gtag";

declare global {
  interface Window {
    gtag?: any;
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  bannerRoot: {
    background: 'var(--white)',
    backdropFilter: 'blur(2px)',
    position: 'relative',
    // top: "-10vh",
  },
  bannerRoot2: {
    [theme.breakpoints.up('sm')]: {
      top: '-10vh',
    },
  },
  productContainer: {
    background: 'var(--white)',
  },
  findContainer: {
    width: '1170px',
    margin: '0 auto',
    maxWidth: '100%',
  },
  filterHead: {
    padding: '60px 20px 15px',
  },
  filterProductText: {
    letterSpacing: '2px',
  },
  leftFilter: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiTypography-body1': {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2
      )} Druk`,
      marginLeft: theme.spacing(2),
      lineHeight: '23px',
    },
  },
  filterImg: {
    width: 20,
  },
  filters: {
    fontSize: '16px',
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      fontSize: '13px',
      marginTop: theme.spacing(1.5),
      marginLeft: theme.spacing(0),
    },
    // width:"20px"
  },

  select: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.5
    )} Wrok Sans`,
    '& .MuiInput-underline:after': {
      border: 'none',
    },
    '& .MuiInput-underline:before': {
      display: 'none',
    },

    '& .MuiInput-input': {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2
      )} Druk`,
      marginLeft: theme.spacing(2),
      lineHeight: '23px',
    },
  },
  filterBody: {
    // height: 1400
    // maxHeight: 1000,
  },
  filterFooter: {
    marginTop: theme.spacing(10),
    width: '100%',
  },
  carouselHeading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.4
    )}  Recoleta Alt`,
    color: '#084236',
    lineHeight: 1.5,
    marginBottom: theme.spacing(0.5),
    maxWidth: '500px',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'none',
      fontSize: '16px',
      marginTop: theme.spacing(14.5),
    },
    marginLeft: '10px',
  },
  arrow: {
    padding: theme.spacing(0, 1),
  },
  button: {
    '& .MuiTypography-body1': {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2
      )}  Druk`,

      lineHeight: '23px',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',

      color: 'var(--black300)',
    },
    '& .MuiIconButton-root': {
      padding: 0,
    },
    '& .MuiIconButton-root:hover': {
      background: 'none',
    },
  },
  link: {
    color: 'lightblue',
    font: `normal 400 ${theme.spacing(2)}  Work Sans`,
    cursor: 'pointer',
  },
  searchDivComponent: {
    position: 'sticky',
    width: '100%',
    top: '50px',
    background: 'var(--white)',
    zIndex: 9,
    padding: theme.spacing(0, 1.6),
  },
}));

function MobileFilterProducts() {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const history = useHistory();
  // const location: any = useLocation();
  // const params: any = useParams();
  const query = Utils.CommonFunctions.useQuery();
  const sortingData = Utils.constants.sortingData;

  let queryFilters = query?.get('filters') ?? '{}';
  queryFilters = JSON.parse(
    decodeURIComponent(decodeURIComponent(queryFilters))
  );

  const [isFetching, setIsFetching] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [rectHeight, setRectHeight] = useState(0);

  const menuData = useSelector(
    (state: any) => state.homeReducer.mobileMenusData
  );
  const fromRoutePath = useSelector((state: any) => state.homeReducer.fromPath);
  const skeletonLoader = useSelector((state: any) => {
    return state.loadingReducer.skeletonLoader;
  });
  const productData = useSelector((state: any) => state.productReducer?.data);
  const products = productData.products;

  useEffect(() => {
    let ProductsArray =
      productData?.products &&
      productData?.products?.data &&
      productData?.products?.data.reduce((i: any, j: any, index: number) => {
        i.push({
          id: j.sku,
          item_id: j.sku,
          name: j.name,
          item_name: j.name,
          currency: 'INR',
          index: index + 1,
          brand: 'The Body Shop',
          item_brand: 'The Body Shop',
          category: j?.category?.name,
          item_category: j.category?.name,
          list_id: j.sku,
          item_list_id: j.sku,
          list_name: j?.category?.name,
          // "item_list_name": j.name,
          price: j.price,
          // "quantity":j.sku1
        });
        return i;
      }, []);

    if (typeof window && window.gtag !== 'undefined') {
      const gtagPayload = {
        items: ProductsArray,
        category: ProductsArray?.[0]?.category,
      };
      if (
        process.env.NEXT_PUBLIC_ENV !== 'development' &&
        process.env.NEXT_PUBLIC_ENV !== 'staging'
      ) {
        window.gtag('event', 'view_item_list', gtagPayload);
      }
      customGa4Event('view_item_list', gtagPayload);
    }
  }, [productData?.products?.data]);

  // let keyword = location?.pathname.includes("/search/")
  //   ? location?.pathname?.split("/")?.pop() ?? params?.keyword ?? ""
  //   : "";
  let keyword = '';

  // let categoryId = params?.id ?? "";
  let categoryId = '';

  // const fromPath = location?.state?.fromPath || "";
  const fromPath = '';

  const getOffset = (element: any) => {
    const rect = element?.getBoundingClientRect();
    setRectHeight(rect!?.height);
    return rect!?.height;
  };

  const listenToScroll = () => {
    let heightToHideFrom =
      getOffset(document.querySelector('#mobile-prod-container')) - 100;
  };

  // const urlKey = location.pathname.includes("/c/")
  //   ? location.pathname.split("/c/")?.[0]?.split("/")?.pop()
  //   : location.pathname.includes("/h/")
  //   ? location.pathname.split("/h/")?.[0]?.split("/")?.pop()
  //   : "";

  let obj: any = {
    query: keyword,
    page,
    sortBy: sortingData[0]?.id?.toString(),
    // urlKey,
    limit: 18,
    otherFilters: [],
    customAttributes: [],
  };

  const [productListParams, setParams] = useState(obj);

  useEffect(() => {
    setParams({ ...productListParams, ...obj, page: 1, categoryId });
    setPage(queryFilters?.page ?? 1);
    // dispatch(showSkeleton());
    // dispatch(
    //   getProductList(
    //     { ...queryFilters, limit: 18, page: 1, urlKey, query: keyword },
    //     true,
    //     (resp: any) => {
    //       dispatch(hideSkeleton());
    //       dispatch({
    //         type: Utils.ActionName.FROM_PATH,
    //         payload: { fromPath: "" },
    //       });
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
  }, [
    keyword,

    // urlKey
  ]);

  useEffect(() => {
    if (queryFilters) {
      const data = { ...obj, ...queryFilters, page: 1 };
      // dispatch(
      //   getProductList(data, false, () => {
      //     dispatch(hideLoader());
      //     setParams(data);
      //   })
      // );
    }
  }, []);

  const handleChange = (hasMore: boolean, pageNum?: number) => {
    if (hasMore && fromRoutePath !== 'pdp') {
      let pageSize = pageNum ? pageNum : hasMore ? page + 1 : page;
      setPage(pageSize);
      const params = { ...obj, ...productListParams, page: pageSize };
      setParams(params);
      // showLoader();
      // dispatch(
      //   getProductList(
      //     params,
      //     false,
      //     () => {
      //       dispatch(hideLoader());
      //       dispatch(hideSkeleton());
      //     },
      //     products
      //   )
      // );
    } else {
      // dispatch(hideLoader());
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = (e: any) => {
    listenToScroll();
    // handleScrollHeight(e, (value: boolean) => {
    //   // if(fromPath!=="pdp")
    //   setIsFetching(value);
    // });
  };
  useEffect(() => {
    if (!isFetching) return;
    // dispatch(showLoader());

    handleChange(products?.nextPage > 0 ? true : false);
  }, [isFetching]);

  return (
    <div id="mobile-prod-container" className={classes.productContainer}>
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
          {/* Filter Header Section */}
          {skeletonLoader || Object.keys(productData).length === 0 ? (
            <FilterProductSkeleton />
          ) : (
            <>
              {/* Listing Body Section */}
              <div className={classes.filterBody}>
                <Grid container>
                  <Hidden smUp>
                    {keyword && (
                      <Grid
                        item
                        xs={12}
                        md={9}
                        className={classes.searchDivComponent}
                      >
                        {/* <SearchField
                          value={keyword}
                          handleClick={() =>
                            history.push(Utils.routes.MOBILE_SEARCH)
                          }
                        /> */}
                      </Grid>
                    )}
                  </Hidden>

                  <Grid item xs={12} md={9}>
                    <Hidden smUp>
                      <MobileSortAndFilter
                        rectHeight={rectHeight}
                        productData={productData}
                        setPage={setPage}
                        setParams={setParams}
                        obj={obj}
                      />
                    </Hidden>
                    <MobileProducts
                      products={products}
                      handleChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </div>
            </>
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default MobileFilterProducts;
