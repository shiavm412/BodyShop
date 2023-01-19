/* eslint-disable complexity */
import React, { useState, useEffect } from 'react';
import Rate from './Rate';
import Return from './Return';
import { Typography, Grid, Badge, Theme, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AvailableOffers from './AvailableOffers';
import DeliveryOptions from './DeliveryOptions';
import ProductDetails from './ProductDetails';
import ProductImages from './ProductImages';
import HowToUse from './HowToUse';
import RatingsReviews from './RatingsReviews';
import CustomerReviews from './CustomerReviews';
import CompleteRoutine from './CompleteRoutine';
import { useDispatch, useSelector } from 'react-redux';
// import { getProductData, getReviews } from './action';
import { ReducersModal } from '../../../models';
import ReactHtmlParser from 'react-html-parser';

// import ReactHtmlParser from "react-html-parser";
import RecommendationCarousel from '../../../common/recommendationCarousel';
import Utils from '../../../utils';
import BreadCrumb from '../../../common/breadCrumb';
import FixedBottomPanel from './fixedBottomPanel';
import Skeleton from '@mui/material/Skeleton';
import Rewards from './rewards';
import {
  productViewed,
  screenViewed,
  updateProfile,
} from '../../../utils/event/action';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
import AdditionalInformation from './additionalInformation';
import SmallMighty from './SmallMighty';
import _ from 'lodash';
import events from '../../../utils/event/constant';
import { customGa4Event } from '../../../utils/gtag';
import images from '../../../utils/images';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { PageMeta } from '../../../page-meta/PageMeta';
import { getProductData, getReviews } from './action';
import { hideSkeleton, showSkeleton } from '../../../../store/home/action';
import { wrapper } from '../../../../store/store';

declare global {
  interface Window {
    gtag?: any;
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    padding: theme.spacing(5, 4),
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    minWidth: '1000px',
    maxWidth: '1440px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: theme.spacing(2, 1),
      maxWidth: 'none',
      minWidth: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '100px',
      maxWidth: 'none',
      minWidth: 'auto',
      margin: theme.spacing(2, 1),
      padding: theme.spacing(2, 1),
    },
  },
  breadcrum: {
    display: 'flex',
    flexBasis: '100%',
    width: '100%',
    '& .MuiTypography-body1': {
      color: 'gray',
      font: `normal ${theme.typography.fontWeightLight} Work Sans`,
      padding: theme.spacing(0, 2),
    },
  },
  container: {
    flexBasis: '50%',
    position: 'sticky',
    top: '220px',
  },
  productDetails: {
    flexBasis: '50%',
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('sm')]: {
      // maxHeight: '600px',
      overflowY: 'auto',
      '& ::-webkit-scrollbar-thumb': {
        background: 'rgba(90, 90, 90)',
      },
      '&::-webkit-scrollbar': {
        width: '0px',
        height: '0px',
      },
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 0.2),
      flexBasis: '100%',
    },
  },

  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Work Sans`,
    lineHeight: '18px',
    letterSpacing: '0.02em',
    color: 'var(--black)',
  },

  list: {
    padding: theme.spacing(1, 0, 0, 3),
  },

  filterFooter: {
    marginTop: theme.spacing(5),
    width: '100%',
    marginBlockStart: '370px',
    [theme.breakpoints.down('xs')]: {
      marginBlockStart: '0px',
    },
  },
  carouselHeading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.4
    )}  Recoleta Alt`,
    color: '#084236',
    lineHeight: 1.5,
    margin: theme.spacing(0, 0, 0.5, 2),
    maxWidth: '500px',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'none',
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}  Recoleta Alt Bold`,
      margin: theme.spacing(0, 0, 0.5, 0),
      color: 'var(--black)',
    },
  },
  // accordionHeading: {
  //   fontWeight: "bold",
  // },
  content: {
    paddingLeft: '0px',
    [theme.breakpoints.down('xs')]: {
      '& strong': {
        color: 'var(--black)',
      },
    },
  },

  skeletonView: {
    margin: theme.spacing(2),
  },
  description: {
    marginTop: '10px',
    font: `normal 400 ${theme.spacing(1.5)} Work Sans`,
    lineHeight: '27px',
  },
  title: {
    marginTop: '10px',
    font: `normal 700 ${theme.spacing(1.4)}  Recoleta Alt`,
    color: 'black',
  },

  btnDiv: {
    [theme.breakpoints.down('xs')]: {
      zIndex: 1200,
      position: 'fixed',
      top: '19px',
      right: '20px',
    },
  },
  fixedIcon: {
    display: 'flex',
    placeItems: 'center',
    position: 'sticky',
    top: '19px',
  },
  searchIcon: {
    width: theme.spacing(2.2),
    height: theme.spacing(2.2),
    marginLeft: theme.spacing(2.5),
  },
  badge: {
    color: theme.palette.primary.main,
  },
  sideBarLogo: {
    display: 'flex',
    padding: theme.spacing(1),
    backgroundColor: 'var(--primary)',
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: theme.spacing(1),

      '& .MuiTypography-body2': {
        font: `normal 700  18px Druk`,
        color: theme.palette.secondary.main,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      },
      '& .MuiTypography-body1': {
        font: `normal 400  12px Work Sans`,
        color: 'var(--white)',
      },
    },
  },
  logo: {
    height: '40px',
    width: '40px',
  },
}));

const ProductDetail = (props: any) => {
  // let query = Utils.CommonFunctions.useQuery();
  const router = useRouter();
  const query = router.query;
  // const location: any = useLocation();
  let isSearched = router.query.isSearched;

  const classes = useStyles();

  let productDetail: any = {};
  let linkedProducts: any = {};
  const id = router.query.id || null;
  const searched = router.query.isSearched || null;
  // const searched = true;
  // const isSearchOrRecommend = location?.state?.isSearchOrRecommend || null;
  const isSearchOrRecommend = 'location?.state?.isSearchOrRecommend' || null;
  const dispatch: any = useDispatch();
  const [opacity, toggleOpacity] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');
  const [rectHeight, setRectHeight] = useState(0);
  const [sideBar, setSideBar] = React.useState(false);
  const [breadCrumData, setBreadCrumb] = React.useState<any>([]);

  const productData: any = useSelector(
    (state: any) => state?.productDetailReducer
  );
  const totalItems = useSelector(
    (state: any) => state?.shoppingBagReducer?.totalItems
  );
  const userInfo = useSelector(
    (state: any) => state?.userDetailReducer?.userInfo
  );
  const skeletonLoader = useSelector((state: any) => {
    return state?.loadingReducer?.skeletonLoader;
  });

  console.log(productData.product.configurableProductOptions?.[0]?.values);


  useEffect(() => {
    if (productData) {
      if (productData?.redirect === 'Not Found') {
        productData.redirect = '';
        props.history.push('/not-found');
      }
      if (productData && productData.product) {
        let categoryAttributesIndex =
          productData &&
          productData.product &&
          productData.product.customAttributes &&
          productData.product.customAttributes.findIndex(
            (item: any) => item.attribute_code === 'category_ids'
          );
        let categoryAttributesData =
          productData &&
          productData.product &&
          productData.product.customAttributes &&
          productData?.product?.customAttributes[categoryAttributesIndex];
        let categoryArray = categoryAttributesData?.label.reduce(
          (i: any, j: any) => {
            i.push({
              CategoryName: j.label,
              CategoryId: j.value,
            });
            return i;
          },
          []
        );
        productViewed({
          ProductId: `${productData?.product.magentoId}`,
          Category: JSON.stringify(categoryArray),
          ProductName: `${productData?.product?.name}`,
          ProductSKU: `${productData?.product?.sku}`,
          FromScreen: `plp`, //not available
        });
        if (typeof window && window.gtag !== 'undefined') {
          const gtagPayload = {
            currency: 'INR',
            category: productData?.product?.categoryData?.name,
            items: [
              {
                id: productData?.product?.sku,
                item_id: productData?.product?.sku,
                name: productData?.product?.name,
                item_name: productData?.product?.name,
                brand: 'The Body Shop',
                item_brand: 'The Body Shop',
                category: productData?.product?.categoryData?.name,
                item_category: productData?.product?.categoryData?.name,
                variant: productData?.selectedVariant?.label,
                item_variant: productData?.selectedVariant?.label,
                price: productData?.selectedVariantData?.price,
                quantity: 1,
              },
            ],
          };
          customGa4Event('view_item', gtagPayload);
          if (
            process.env.NEXT_PUBLIC_ENV !== 'development' &&
            process.env.NEXT_PUBLIC_ENV !== 'staging'
          ) {
            window.gtag('event', 'view_item', gtagPayload);
          }
        }
        let size = productData?.selectedVariantData?.customAttributes?.find(
          (val: any) => val.attribute_code === 'size'
        );
        if (
          productData &&
          productData.product &&
          productData.product.configurableProductLinks &&
          productData.product.configurableProductLinks.length > 0
        ) {
          updateProfile(
            'recent_viewed_product_parent_id',
            `${productData?.product?.sku}`
          ); // outer
          updateProfile(
            'recent_viewed_product_id',
            `${productData?.selectedVariantData?.magentoId}`
          ); //child sku
        } else {
          updateProfile(
            'recent_viewed_product_id',
            `${productData?.product?.magentoId}`
          );
        }
        updateProfile(
          'recent_viewed_product_name',
          `${productData?.product?.name}`
        );
        updateProfile('recent_viewed_product_size', size?.label[0]?.label);

        //breadcrumb data
        let breadcrumb = [
          {
            title: 'Home',
            action: '/',
          },
          {
            action: {
              pathname: `${Utils.CommonFunctions.seoUrl(
                { ...productData?.product?.categoryData, is_root: 1 },
                'plp'
              )}`,
              state: { categoryId: productData?.product?.categoryData?.id },
            },
            title: `${productData?.product?.categoryData?.name}`,
          },
        ];
        if (productData?.product?.categoryData?.child_category?.name) {
          breadcrumb.push({
            action: {
              pathname: `${Utils.CommonFunctions.seoUrl(
                productData?.product?.categoryData?.child_category,
                'plp'
              )}`,
              state: { categoryId: productData?.product?.categoryData?.id },
            },
            title: `${productData?.product?.categoryData?.child_category?.name}`,
          });
        }
        breadcrumb.push({
          title: productData?.selectedVariantData?.name,
          // title: productData?.product?.name ? productData?.product?.name  :productData?.selectedVariantData?.name,
          action: props?.location?.pathname,
        });
        setBreadCrumb(breadcrumb);
      }
    }
    // setVideoUrl(getAttributeValue("how_to_video_url"));
  }, [productData]);

  useEffect(() => {
    dispatch({
      type: Utils.ActionName.FROM_PATH,
      payload: { fromPath: 'pdp' },
    });

    //@ts-ignore

    // return () => {
    //   //@ts-ignore
    //   zE('webWidget', 'updateSettings', {
    //     webWidget: {
    //       offset: {
    //         horizontal: '0px',
    //         vertical: '0px',
    //       },
    //     },
    //   });
    // };
  }, []);

  const recommendedData = useSelector(
    (state: any) => state?.recommendReducer?.recommendedData?.data
  );

  const configs: any = useSelector(
    (state: any) => state?.configReducer?.generalConfigs
  );

  // const urlkey = location.pathname.split('/p/')?.[0]?.split('/').pop();
  const { subcategory, googleKey } = query;

  const getData = (callback?: any) => {
    let params: any = {
      id: id,
      subcategoryId: googleKey ? googleKey : 0,
      urlKey: subcategory ?? subcategory,
    };
    // if (isSearched || searched) {
    //   params.isSearched = 1;
    // }
    // dispatch(
    //   getProductData(params, (resp: any) => {
    //     // dispatch(hideSkeleton());

    //     // const productSku = "BS-91942001"
    //     const productSku = resp?.product?.sku || '';
    //     dispatch(
    //       getReviews(`?sku=${productSku}&page=1&limit=3`, (_resp: any) => {
    //         // setRatingData(resp?.data?.[0] || {})
    //         if (callback) callback();
    //       })
    //     );
    //   })
    // );
  };

  useEffect(() => {
    // dispatch(showSkeleton());
    getData();
    window.scrollTo(0, 0);
    screenViewed({
      ScreenName: events.SCREEN_PDP,
      CTGenerated: 'WEB',
    });
  }, [id]);

  const listenToScroll = () => {
    //@ts-ignore
    let heightToHideFrom =
      getOffset(document.querySelector('#container')) - 100;
  };

  const getOffset = (element: any) => {
    const rect = element?.getBoundingClientRect();
    setRectHeight(rect!?.height);

    return rect!?.height;
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
  }, []);

  if (productData) {
    productDetail = productData.product;
    linkedProducts = productData.linkedProducts;
  }

  const getAttributeValue = (attributeCode: any) => {
    if (productDetail && productDetail?.customAttributes?.length > 0) {
      const attributeObj = productDetail?.customAttributes?.find((el: any) => {
        return el.attribute_code === attributeCode;
      });
      if (attributeObj && attributeObj?.value) {
        if (attributeObj.value?.includes('&lt')) {
          let new_value = attributeObj?.value?.replaceAll('&lt;', '<');
          new_value = new_value?.replaceAll('&gt;', '>');
          return new_value;
        }
        return attributeObj.value;
      }
    }
    return '';
  };

  const toggleDrawer = (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setSideBar(!sideBar);
  };
  const redirect = () => {
    const type = userInfo.tierType === 2 ? 1 : 2;

    Router.push({
      pathname: Utils.routes.UPGRADE_MEMBERSHIP,
      query: { type, pageName: 'My Dashboard' },
    });
  };

  const metaTitle =
    productData &&
    productData.product &&
    _.find(productData.product.customAttributes, {
      attribute_code: 'meta_title',
    });
  const metaDescription =
    productData &&
    productData.product &&
    _.find(productData.product.customAttributes, {
      attribute_code: 'meta_description',
    });

  const metaKeyword =
    productData &&
    productData.product &&
    _.find(productData.product.customAttributes, {
      attribute_code: 'meta_keyword',
    });

  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

  return (
    <>
      {/* <PageMeta
        title={`${
          metaTitle && metaTitle.value
            ? metaTitle.value
            : productData?.product?.name
            ? `${productData?.product?.name} | The Body Shop`
            : 'The Body Shop'
        }`}
        description={
          metaDescription && metaDescription.value
            ? metaDescription.value
            : 'The Body Shop'
        }
        keywords={ metaKeyword && metaKeyword.value
          ? metaKeyword.value
          : 'The Body Shop'}
        // canonicalUrl={URL + props.location.pathname}
       
      /> */}

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <div className={classes.btnDiv}>
          <div className={classes.fixedIcon}>
            <div
              className={classes.searchIcon}
              onClick={() => router.push(Utils.routes.MOBILE_SEARCH)}
            >
              <img src={images.SEARCHICON} alt="google" />
            </div>
            <div className={classes.searchIcon}>
              <Link href={Utils.routes.SHOPPING_BAG}>
                <Badge badgeContent={totalItems} className={classes.badge}>
                  <img src={images.CARTM} alt="logo" />
                </Badge>
              </Link>
            </div>
          </div>
        </div>
        <div>
          {
            // (userInfo?.tierType ===3||userInfo?.tierType === 2)
            userInfo?.tierType !== 1 && userInfo?.tierType !== 2 && (
              <div
                className={classes.sideBarLogo}
                onClick={(e: any) => {
                  toggleDrawer(e);
                  redirect();
                }}
              >
                <img
                  className={classes.logo}
                  src={images.LYBC_FIVE}
                  alt="logo"
                />
                <div>
                  <Typography variant="body2">
                    {configs?.lybc_banner_title || ''}
                  </Typography>
                  <Typography variant="body1">
                    {configs?.lybc_banner_description || ''}{' '}
                  </Typography>
                </div>
              </div>
            )
          }
        </div>
      </Box>
      <div className={classes.mainContainer}>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <BreadCrumb breadcrumb={breadCrumData} />
        </Box>

        <Grid container id="container">
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <Grid item xs={12}>
              <ProductDetails details={productDetail} />
            </Grid>
          </Box>

          <Grid item xs={12} sm={6} style={{ zIndex: 9, position: 'relative' }}>
            <div className={classes.container}>
              {skeletonLoader ? (
                <Skeleton
                  variant="rectangular"
                  height={450}
                  className={classes.skeletonView}
                />
              ) : (
                <ProductImages
                  callback={() => {}}
                  details={productData && productData?.product}
                  opacity={opacity}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.productDetails}>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <ProductDetails details={productDetail} />
              </Box>
              <Rate />

              <Return />

              {!skeletonLoader && (
                <Rewards details={productData?.rewardData || []} />
              )}

              <AvailableOffers />
              <DeliveryOptions />
              {skeletonLoader ? (
                <Skeleton variant="rectangular" height={200} />
              ) : (
                <>
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {getAttributeValue('how_to_use')?.length > 0 ? (
                      <HowToUse
                        video_url={videoUrl}
                        howToUse={
                          <Box>
                            {ReactHtmlParser(
                              getAttributeValue('how_to_use_video')
                            )}
                          </Box>
                        }
                        textDescription={
                          <Box>
                            {ReactHtmlParser(getAttributeValue('how_to_use'))}
                          </Box>
                        }
                      />
                    ) : null}
                  </Box>

                  <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    {ReactHtmlParser(getAttributeValue('how_to_use'))?.length >
                    0 ? (
                      <HowToUse
                        video_url={videoUrl}
                        howToUse={
                          <Box>{ReactHtmlParser('how_to_use_video')}</Box>
                        }
                        textDescription={
                          <Box>{ReactHtmlParser('how_to_use')}</Box>
                        }
                      />
                    ) : null}
                  </Box>

                  <SmallMighty />

                  <AdditionalInformation />
                </>
              )}
              <RatingsReviews getData={getData} />
              <CustomerReviews getData={getData} />
              {linkedProducts && linkedProducts.length > 0 ? (
                <CompleteRoutine
                  details={linkedProducts}
                  product={productDetail}
                />
              ) : null}
            </div>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <FixedBottomPanel
                // isSearched={isSearched || searched || isSearchOrRecommend}
                isSearched={true}
                rectHeight={rectHeight}
                data={productDetail}
              />
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <FixedBottomPanel
                isSearched={true}
                // isSearched={isSearched || searched || isSearchOrRecommend}
                rectHeight={rectHeight}
                data={productDetail}
              />
            </Box>
          </Grid>
        </Grid>
        <div
          className={classes.filterFooter}
          onMouseEnter={() => toggleOpacity(false)}
          onMouseLeave={() => toggleOpacity(true)}
        >
          {recommendedData?.length > 0 ? (
            <Typography variant="h4" className={classes.carouselHeading}>
              Recommended For You
            </Typography>
          ) : null}
          <RecommendationCarousel type="pdp" />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
