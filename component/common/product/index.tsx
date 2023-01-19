import Utils from '../../utils';
import { useState, useEffect } from 'react';
import { addToWishList, removeFromWishList } from './action';
import { useDispatch, useSelector } from 'react-redux';
import AddToCart from '../addToCart';
import _ from 'lodash';

// import { getWishList } from "../../../pages/wishlist/action";
import { makeStyles } from '@mui/styles';

import clsx from 'clsx';
import MessageDialogue from './messageDialogue';
import { useRouter } from 'next/router';
import { ReducersModal } from '../../models';
import { isAuthenticated } from '../../utils/session';
import { IconButton, Rating, Theme, Typography } from '@mui/material';
import {
  hideLoader,
  hideSkeleton,
  showLoader,
} from '../../../store/home/action';
// import { FAVORITE_ICON, HEART, PRODUCT_PLACEHOLDER } from "utils/constantImages";

const useStyles = makeStyles((theme: Theme) => ({
  productCard1: {
    padding: theme.spacing(3, 1),
    [theme.breakpoints.down('sm')]: {
      padding: '10px 0px 10px 10px',
    },
  },
  productcard3: {
    padding: theme.spacing(3, 1),
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    },
  },
  productCard4: {
    padding: theme.spacing(3, 1),
    [theme.breakpoints.down('sm')]: {
      padding: '10px 0px',
    },
  },
  productcard2: {
    padding: theme.spacing(3, 1),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 1, 0, 0),
    },
  },
  imageContainer: {
    position: 'relative',
    cursor: 'pointer',
  },
  freeSampleImgDiv: {
    position: 'relative',
  },
  imgDiv1: {
    borderRadius: 4,
    height: '400px',
    // display: "flex",
    // justifyContent: "center",
    // height: "300px",
    // display: "block",
    // maxWidth: "300px",
    // maxHeight: "300px",
    // width: "260px",
    // height: "300px",
    // [theme.breakpoints.down("sm")]: {
    //   height: "250px",
    // },

    [theme.breakpoints.down(1930)]: {
      height: '370px',
    },
    [theme.breakpoints.down(1540)]: {
      height: '300px',
    },
    [theme.breakpoints.down(1360)]: {
      height: '280px',
    },

    [theme.breakpoints.down('md')]: {
      height: '250px',
    },
    [theme.breakpoints.down('xs')]: {
      // maxWidth: "150px",
      // maxHeight: "160px",
      height: '210px',
    },
    // backgroundColor: "var(--light-creame-color)",
    // position: "relative",
    // padding: "10%",
    // "& img": {
    //   width: "100%",
    //   // objectFit: "contain",
    //   objectFit: "cover",
    // },
  },
  productPlaceholder: {
    // margin: "15%",
    // width: "70%",
    width: '300px',
    height: '300px',
    // objectFit: "contain",
    padding: '20px',
    [theme.breakpoints.down('xs')]: {
      width: '230px',
      height: '200px',
    },
  },
  imgSecondPlaceHolder: {
    width: '300px',
    height: '350px',
    // objectFit: "contain",
    padding: '20px',
    [theme.breakpoints.down('xs')]: {
      width: '230px',
      height: '230px',
    },
  },
  imgSecond: {
    borderRadius: 4,
    // display: "flex",
    // justifyContent: "center",
    // height: "300px",
    // display: "block",
    // maxWidth: "290px",
    // maxHeight: "350px",
    // width: "280px",
    height: '280px',
    // width: "100%",
    [theme.breakpoints.down('xs')]: {
      // maxWidth: "180px",
      // maxHeight: "230px",
      height: '210px',
    },
  },

  freeSampleImg: {
    // width: "150px",
    height: '200px',
    [theme.breakpoints.down('xs')]: {
      height: '160px',
    },
  },
  productImage: {
    height: '100%',
    aspectRatio: '2/3',
    // height: "100%",
    // objectFit: "contain",
    objectFit: 'cover',
    width: '100%',
    // width: "100%",
    // height: "100%",
    // objectFit: "contain",
    // objectFit: "cover",
    // [theme.breakpoints.down("xs")]: {
    //   width: "100%",
    //   height: "100%",
    // },
  },
  productSecond: {
    height: '100%',
    aspectRatio: '2/3',
    // height: "100%",
    // objectFit: "contain",
    objectFit: 'cover',
    width: '100%',
    // [theme.breakpoints.down("xs")]: {
    //   width: "180px",
    //   height: "230px",
    // },
  },
  heartImg: {
    position: 'absolute',
    right: '2%',
    top: '3%',
  },
  heartImg2: {
    position: 'absolute',
    right: '3%',
    top: '4%',
    '& > img': {
      maxWidth: '100%',
      maxHeight: '100%',
    },
  },

  contentDiv: {
    margin: theme.spacing(1, 0),
    cursor: 'pointer',
  },
  freeSampleContentDiv: {
    margin: theme.spacing(1, 0),
  },
  name1: {
    font: `normal ${theme.spacing(2)} Work Sans Bold`,
    color: 'var(--secondary-black)',
    lineHeight: '25px',
    height: 50,
    // height: '60px',
    [theme.breakpoints.down('xs')]: {
      //   height: '80px',
      font: 'normal 15px Work Sans Bold',
      lineHeight: '24px',
    },
    // textOverflow: "ellipsis",
    overflow: 'hidden',
    // whiteSpace: "nowrap",
  },
  starDiv: {
    margin: theme.spacing(0.5, 0),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      fontSize: '17px',
      marginBottom: '0px',
      alignItems: 'inherit',
    },
  },
  count: {
    font: `normal ${theme.spacing(1.4)} Work Sans Regular`,
    color: 'var(--light-gray)',
    marginTop: theme.spacing(0.3),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(0),
      marginLeft: theme.spacing(0.5),
    },
  },
  discription: {
    font: `normal ${theme.spacing(1.2)} Work Sans Regular`,
    color: 'var(--light-gray)',
    height: 30,
    [theme.breakpoints.down('sm')]: {
      // height: 50,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
    },
    [theme.breakpoints.down('xs')]: {
      height: 30,
    },
  },
  discription1: {
    font: `normal ${theme.spacing(1.6)} Work Sans Regular`,
    lineHeight: 1.6,
    color: 'var(--light-gray)',
  },
  secondDescription: {
    font: `normal ${theme.spacing(1.2)} Work Sans Regular`,
    color: 'var(--light-gray)',
    height: 30,
    [theme.breakpoints.down('sm')]: {
      // height: 50,
    },
  },
  quantity: {
    font: `normal ${theme.spacing(1.4)} Work Sans Regular`,
    lineHeight: 1.6,
    height: '16px',
    margin: theme.spacing(1, 0, 0, 0),
    color: theme.palette.primary.main,
    textTransform: 'lowercase',
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0),
      color: 'var(--light-gray)',
      font: `normal ${theme.spacing(1.1)} Work Sans Regular`,
    },
  },
  amountDiv: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0.5, 0),
    height: '16px',
  },
  amount: {
    font: `normal ${theme.spacing(1.5)} Work Sans BOld`,
    color: 'var(--secondary-black)',
    marginRight: theme.spacing(0.5),
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans Bold`,
    },
  },
  amount1: {
    font: `normal ${theme.spacing(1.8)} Work Sans Bold`,
    color: theme.palette.primary.main,
    lineHeight: 2,
    [theme.breakpoints.down('xs')]: {
      color: 'black',
      font: `normal ${theme.spacing(1.4)} Work Sans Bold`,
    },
  },
  mrp: {
    marginRight: '10px',
    font: `normal ${theme.spacing(1.5)} Work Sans Medium`,
    color: 'var(--light-gray)',
    textDecorationLine: 'line-through',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },
  btn: {
    font: `normal ${theme.spacing(1.5)} Work Sans Medium`,
    color: 'var(--white)',
    borderRadius: 2,
    textTransform: 'capitalize',
    padding: theme.spacing(1, 2),
  },
  rating: {
    color: theme.palette.secondary.light,
    [theme.breakpoints.down('xs')]: {
      fontSize: '17px',
      marginBottom: '9px',
    },
  },
  cursor: {
    cursor: 'inherit',
  },
  secondStarDiv: {
    display: 'none',
  },
  multiLineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },
  messageHeading: {
    font: `normal 700 ${theme.spacing(2.0)} Work Sans`,
    color: 'var(--black300)',
    lineHeight: '28px',
    marginBottom: '9px',

    // margin: theme.spacing(0.8, 0),
  },
  productOuterDIV: {
    padding: theme.spacing(1, 1),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
}));

interface Props {
  section: 'wishlist' | 'plp' | 'recommend' | 'tips' | 'cart';
  img: string;
  detail: string;
  rate: string;
  quantity?: string;
  attr: any;
  type?: string;
  productName?: string;
  isSearchOrRecommend?: boolean;
  flag?: string;
}

const Product = (props: Props) => {
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const history = useRouter();

  // const params: any = useParams();
  const {
    section,
    attr,
    img,
    detail,
    productName,
    type,
    isSearchOrRecommend,
    flag,
  } = props;
  const productData = attr;
  const [like, setLike] = useState(productData?.isWishlisted);
  const [loginAlert, showLoginAlert] = useState(false);
  // const totalCount = useSelector(
  //   (state: ReducersModal) => state.wishlistReducer.totalCount
  // );
  const plpData = useSelector(
    (state: ReducersModal) => state?.productReducer?.data
  );
  const cartData = useSelector(
    (state: ReducersModal) => state.shoppingBagReducer
  );

  const [addActive, setAddActive] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleContentClick = () => {};

  useEffect(() => {
    setLike(productData?.isWishlisted);
  }, [productData?.isWishlisted]);

  let freeSamples = cartData?.items?.filter(
    (item: any) => item.type === 'sample'
  ).length;

  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

  const handleLike = (status: boolean, product: any) => {
    if (status) {
      setAddActive(true);
      setTimeout(() => {
        setAddActive(false);
      }, 1000);
    }
    setLoader(true);
    // setLike(!like);

    if (status) {
      let data: any = {
        productId: product.magentoId,
        type: product.type,
        attributeData: product.configurableProductOptions?.length
          ? [
              {
                id: product.configurableProductOptions?.[0]?.attribute_id,
                value:
                  product.configurableProductOptions?.[0]?.values?.[0]
                    .value_index,
              },
            ]
          : [],
      };
      // if (section === "wishlist") {
      //   dispatch(showLoader());
      // }
      addToWishList(data)
        .then((resp) => {
          setLike(true);
          let categoryAttributesIndex = product?.customAttributes.findIndex(
            (item: any) => item.attribute_code === 'category_ids'
          );
          let categoryAttributesData =
            product?.customAttributes[categoryAttributesIndex];
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
          if (resp) {
            // eventAddToWishlist({
            //   ProductId: `${product?.magentoId}`,
            //   ProductName: `${product?.name}`,
            //   Price: `${product?.price}`,
            //   Category: JSON.stringify(categoryArray),
            //   FromScreen: `${section}`,
            // });
            product.isWishlisted = true;
            product.wishlists = {
              _id: resp?.data?.data?._id,
            };
            // dispatch({
            //   type: Utils.ActionName.WISHLIST,
            //   payload: { totalCount: totalCount + 1 },
            // });

            if (section === 'wishlist' || section === 'plp') {
              // dispatch(getWishList({ limit: 10, page: 1 }));
              dispatch({ type: 'recommend.update', payload: product });
            } else {
              // dispatch(getWishList({ limit: 10, page: 1 }));
              dispatch({ type: 'product.update', payload: product });
              dispatch({ type: 'recommend.update', payload: product });
              dispatch({
                type: 'show-alert',
                payload: {
                  type: 'success',
                  message: 'Product added to wishlist',
                },
              });
            }
          } else {
            dispatch(hideLoader());
            dispatch(hideSkeleton());
          }
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);

          if (err?.response?.data?.message)
            dispatch({
              type: 'show-alert',
              payload: {
                type: 'error',
                message: err?.response?.data?.message,
              },
            });
        });
    } else {
      if (product.wishlists ? product.wishlists?._id : product._id) {
        if (section === 'wishlist') {
          dispatch(showLoader());
        }
        removeFromWishList(
          product.wishlists ? product.wishlists?._id : product._id
        )
          .then((resp) => {
            if (resp) {
              setLike(false);
              let categoryAttributesIndex = product?.customAttributes.findIndex(
                (i: any) => i.attribute_code === 'category_ids'
              );
              let categoryAttributesData =
                product?.customAttributes[categoryAttributesIndex];
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
              // eventRemoveFromWishlist({
              //   ProductId: `${product.magentoId}`,
              //   ProductName: `${product.name}`,
              //   Price: `${product.price}`,
              //   Category: JSON.stringify(categoryArray),
              //   FromScreen: `${section}`,
              // });

              product.isWishlisted = false;
              // if (section !== "wishlist") {
              //   dispatch({
              //     type: Utils.ActionName.WISHLIST,
              //     payload: { totalCount: totalCount - 1 },
              //   });
              // }

              if (
                section === 'wishlist' ||
                section === 'plp' ||
                section === 'recommend' ||
                section === 'cart'
              ) {
                // dispatch(
                //   getWishList({ limit: 10, page: 1 }, () => {
                //     dispatch(hideLoader());
                //   })
                // );
                dispatch({ type: 'recommend.update', payload: product });
              } else {
                dispatch({ type: 'product.update', payload: product });
                dispatch({ type: 'recommend.update', payload: product });
                // dispatch(
                //   getWishList({ limit: 10, page: 1 }, () => {
                //     dispatch(hideLoader());
                //   })
                // );
                dispatch({
                  type: 'show-alert',
                  payload: {
                    type: 'success',
                    message: 'Product removed from wishlist',
                  },
                });
              }
            } else {
              dispatch(hideLoader());
            }
            setLoader(false);
          })
          .catch((err) => {
            setLoader(false);

            if (err?.response?.data?.message)
              dispatch({
                type: 'show-alert',
                payload: {
                  type: 'error',
                  message: err?.response?.data?.message,
                },
              });
          });
      }
    }
  };


  const categoryId = productData?.category?.child_category?.magentoId;

  const navigateTo = () => {
    if (props.type && props.type === 'freeSample')
      history.push({ pathname: '/shopping-bag' });
    else {
      // let productUrlTitle = productData.customAttributes.find((item: any) => item.attribute_code === "url_key")?.value
      // let productUrlKey = productData.customAttributes.find((item: any) => item.attribute_code === "google_category")?.value
      // let pathname = `/${plpData?.categoryData?.child_category?.urlPath}/${productUrlTitle}/p/${productUrlKey}`

      let pathname = Utils.CommonFunctions.seoUrl(
        { ...productData, plpData },
        'pdp'
      );
      let state: any = {
        urlKey:
          productData && productData.type == 'simple'
            ? productData.urlKey
            : productData.configurableProductLinks &&
              productData?.configurableProductLinks?.[0]?.urlKey,
        // urlKey:productData.urlKey,
        pageName: '',
        isSearched:
          type === 'mobile-home' ||
          type === 'home' ||
          type === 'wishlist-recommend' ||
          type === 'mybag'
            ? 1
            : null,
        isSearchOrRecommend:
          section === 'recommend' ||
          props?.type === 'mobile-home' ||
          isSearchOrRecommend
            ? true
            : false,
      };

      // if (history?.location?.pathname.includes("/c/")) {
      //   state.categoryId = plpData?.categoryData?.id ?? 0;
      // } else {
      //   state.categoryId = productData?.category?.child_category?.magentoId
      // }

      const categoryId =
        productData?.category && productData?.category?.child_category
          ? productData?.category?.child_category?.magentoId
          : 124;

      // history.push(
      //   {
      //     pathname,
      //     search: `${location.search}`,
      //   },
      //   { query: state }
      // );
      let googleCode = productData?.customAttributes?.find(
        (item: any) => item.attribute_code === 'google_category'
      )?.value;
      const { urlKey } = state;

      if (history.query.slug) {
        history.push({
          pathname: '/[slug]/[category]/[subcategory]/p/[googleKey]',
          query: {
            slug: `${history.query.slug}`,
            category: `${
              productData?.category &&
              productData?.category?.child_category
                ? productData?.category?.child_category?.urlKey
                : 'trending'
            }`,
            // category: `${history.query.category}`,
            subcategory: `${urlKey}`,
            googleKey: `${googleCode ? googleCode : 'p000069'}`,
            val: categoryId,
          },
        });
      } else {
        history.push({
          pathname: '/[slug]/[category]/[subcategory]/p/[googleKey]',
          query: {
            slug: `${productData.category.urlKey}`,
            category: `${
              productData?.category &&
              productData?.category?.child_category
                ? productData?.category?.child_category?.urlKey
                : 'trending'
            }`,
            // category: categoryId,
            subcategory: `${urlKey}`,
            googleKey: `${googleCode ? googleCode : 'p000069'}`,
            val: categoryId,
          },
        });
      }
      // history.push(`trending/new-in/${urlKey}/p/${categoryId}`);

      // history.push({
      //   pathname: Utils.CommonFunctions.replaceUrlParams(
      //     Utils.routes.PRODUCT_DETAIL,
      //     { ":id": productData?.magentoId }
      //   ),
      //   state: {
      //     pageName: "",
      //     isSearched:
      //       type === "mobile-home" ||
      //       type === "home" ||
      //       type === "wishlist-recommend" ||
      //       type === "mybag"
      //         ? 1
      //         : null,
      //     isSearchOrRecommend:
      //       section === "recommend" ||
      //       props?.type === "mobile-home" ||
      //       isSearchOrRecommend
      //         ? true
      //         : false,
      //   },
      // });
    }
  };

  let configurableProduct =
    productData?.configurableProductLinks?.find(
      (item: any) => item?.isInStock
    ) || productData?.configurableProductLinks?.[0];

  const configWeight = _.find(configurableProduct?.customAttributes, {
    attribute_code: 'size',
  })?.label?.[0]?.label;
  const customWeight =
    _.find(productData.customAttributes, {
      attribute_code: 'size',
    })?.label?.[0]?.label || null;

  let weight =
    productData?.type === 'configurable' ? configWeight : customWeight;

  let discPrice =
    productData?.type === 'configurable'
      ? configurableProduct?.customAttributes?.find(
          (item: any) => item.attribute_code === 'special_price'
        )?.value
      : productData?.customAttributes?.find(
          (item: any) => item.attribute_code === 'special_price'
        )?.value;
  let rate =
    productData?.type === 'configurable'
      ? configurableProduct?.price
      : productData?.price;

  const isInStock =
    productData?.type === 'configurable'
      ? configurableProduct?.isInStock || false
      : productData?.isInStock;

  return (
    <>
      <div
        className={
          props.type === 'freeSample'
            ? classes.productOuterDIV
            : props.type === 'myOrder'
            ? classes.productcard2
            : props.flag === 'bestSeller' ||
              flag === 'trending' ||
              flag === 'recommended'
            ? classes.productCard1
            : flag === 'searchBestSeller'
            ? classes.productCard4
            : classes.productcard3
        }
      >
        {
          // loginAlert &&
          <MessageDialogue
            cancelText={'Cancel'}
            okText={'Okay'}
            open={loginAlert}
            handleClose={() => showLoginAlert(!loginAlert)}
            onOk={() => {
              history.push('/login-via-otp');
            }}
            message={'Please login to proceed'}
            heading={'The Body Shop'}
            headingClass={classes.messageHeading}
          />
        }
        <div
          className={
            props.type !== 'freeSample'
              ? classes.imageContainer
              : classes.freeSampleImgDiv
          }
        >
          {section !== 'cart' ? (
            <>
              {props.section === 'plp' ? (
                <div className={`${addActive ? 'active' : ''}`}>
                  <div className={'content'} onClick={handleContentClick}>
                    <IconButton
                      aria-label="favorite"
                      className={classes.heartImg}
                      onClick={() => {
                        if (!loader)
                          if (isAuthenticated())
                            handleLike(like ? false : true, productData);
                          else showLoginAlert(true);
                      }}
                    >
                      {like ? (
                        <img src={Utils.images.FAVORITE_ICON} alt="heart" />
                      ) : (
                        <img src={Utils.images.HEART} alt="heart" />
                      )}
                    </IconButton>
                    <span className="perticles-circle"></span>
                  </div>
                </div>
              ) : (
                <div
                  className={classes.heartImg2}
                  onClick={() => {
                    if (isAuthenticated())
                      handleLike(like ? false : true, productData);
                    else showLoginAlert(true);
                  }}
                >
                  {like ? (
                    <img src={Utils.images.FAVORITE_ICON} alt="heart" />
                  ) : (
                    <img src={Utils.images.HEART} alt="heart" />
                  )}
                </div>
              )}
            </>
          ) : null}
          <div
            className={
              props.type && props.type === 'freeSample' ? classes.cursor : ''
            }

            // to={
            //   props.type && props.type === "freeSample"
            //     ? "/shopping-bag"
            //     : Utils.CommonFunctions.replaceUrlParams(
            //       Utils.routes.PRODUCT_DETAIL,
            //       { ":id": productData?.magentoId }
            //     )
            // }
          >
            <div
              className={clsx(
                props.section === 'recommend' && props.type !== 'freeSample'
                  ? classes.imgDiv1
                  : props.type === 'freeSample'
                  ? classes.freeSampleImg
                  : classes.imgSecond
              )}
              onClick={navigateTo}
            >
              {img ? (
                <img
                  src={`${IMAGE_URL}catalog/product${img}`}
                  className={clsx(
                    props.section === 'recommend'
                      ? classes.productImage
                      : classes.productSecond
                  )}
                  alt="img one"
                />
              ) : (
                <div
                  className={clsx(
                    props.section === 'recommend'
                      ? classes.productPlaceholder
                      : classes.imgSecondPlaceHolder
                  )}
                >
                  {/* <PRODUCT_PLACEHOLDER /> */}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          onClick={navigateTo}
          className={
            props.type && props.type === 'freeSample' ? classes.cursor : ''
          }
          // to={
          //   props.type && props.type === "freeSample"
          //     ? "/shopping-bag"
          //     : Utils.CommonFunctions.replaceUrlParams(
          //       Utils.routes.PRODUCT_DETAIL,
          //       { ":id": productData?.magentoId }
          //     )
          // }
        >
          <div
            className={
              props.type !== 'freeSample'
                ? classes.contentDiv
                : classes.freeSampleContentDiv
            }
            onClick={navigateTo}
          >
            {/* <Typography className={props.isWishlist ? classes.name1 : classes.name}> */}
            <Typography className={classes.name1}>
              {/* {productData?.name} */}
              {productName
                ? productName
                : productData?.name
                ? _.truncate(
                    Utils.CommonFunctions.replaceHtmlTag(productData?.name),
                    { length: 80 }
                  )
                : ''}
            </Typography>
            {/* </Link> */}
            {/* <div className={classes.starDiv}> */}
            <div
              className={
                props.type && props.type === 'freeSample'
                  ? classes.secondStarDiv
                  : classes.starDiv
              }
            >
              <Rating
                className={classes.rating}
                name="read-only"
                value={productData?.avgRating}
                readOnly
              />
              <Typography className={classes.count}>
                ({productData?.ratingCount})
              </Typography>
            </div>
            {/* <Typography className={ classes.discription} dangerouslySetInnerHTML={{ __html: props.detail }}> */}
            {/* <Typography className={classes.discription}>
              {detail ?? null}
            </Typography> */}
            <div
              // className={classes.discription}
              className={
                props.type && props.type === 'freeSample'
                  ? clsx(classes.secondDescription, classes.multiLineEllipsis)
                  : clsx(classes.discription)
              }
              dangerouslySetInnerHTML={{ __html: detail ?? '' }}
            />
            {/* <Typography className={classes.quantity}>{props.quantity}</Typography> */}
            <Typography className={classes.quantity}>{weight}</Typography>
            {type !== 'freeSample' ? (
              <>
                {rate && rate !== '0' ? (
                  <div className={classes.amountDiv}>
                    {discPrice ? (
                      <>
                        {
                          <Typography className={classes.mrp}>
                            ₹{Utils.CommonFunctions.decimalFlat(rate, 0)}
                          </Typography>
                        }
                        <Typography className={classes.amount1}>
                          ₹{Utils.CommonFunctions.decimalFlat(discPrice, 0)}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography className={classes.amount1}>
                          ₹{Utils.CommonFunctions.decimalFlat(rate, 0)}
                        </Typography>
                      </>
                    )}
                  </div>
                ) : (
                  <div className={classes.amountDiv} />
                )}
              </>
            ) : null}
          </div>
        </div>
        {section === 'cart' &&
        (freeSamples >= cartData?.freeSampleCount ||
          cartData.items.findIndex(
            (item: any) => productData.magentoId === item?.productId
          ) > -1) ? (
          <AddToCart
            isInStock={isInStock}
            isSearchOrRecommend={
              props?.type === 'mobile-home' || isSearchOrRecommend
            }
            type={type}
            product={productData}
            section={section}
            disabled
          />
        ) : (
          <AddToCart
            isInStock={isInStock}
            isSearchOrRecommend={
              section === 'recommend' ||
              props?.type === 'mobile-home' ||
              isSearchOrRecommend
            }
            type={type}
            product={productData}
            section={section}
          />
        )}

        {/* <Button
                color="primary"
                variant="contained"
                className={classes.btn}
                disableElevation
            >
                Add to Bag
            </Button> */}
      </div>
      {/* } */}
    </>
  );
};

export default Product;
