// @ts-nocheck
import { IconButton, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import Utils from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// import {
//   addToWishList,
//   removeFromWishList,
// } from "./../../components/common/product/action";
import { ProductDetailModal, ReducersModal } from '../../../models';
// import ImageMagnifier from "./imageMagnifier";
// import { hideLoader } from "../home/actions";
import {
  addToWishlist as eventAddToWishlist,
  removeFromWishlist as eventRemoveFromWishlist,
} from '../../../utils/event/action';
import ReactImageMagnify from 'react-image-magnify';
import { isAuthenticated } from '../../../utils/session';
// import { useNavigate } from "react-router-dom";
// import MessageDialogue from "../../components/common/product/messageDialogue";
// import { getWishList } from "../wishlist/action";
import { Box } from '@mui/material';
import MessageDialogue from '../../../common/product/messageDialogue';
// import { FAVORITE_ICON, HEART, PRODUCT_PLACEHOLDER } from "utils/constantImages";

const useStyles = makeStyles((theme: Theme) => ({
  productImageContainer: {
    margin: theme.spacing(2, 2, 2, 0),
    height: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    maxWidth: '600px',
    maxHeight: '750px',
    width: '100%',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      margin: theme.spacing(0),
    },
  },
  productImage: {
    width: '100%',
    backgroundColor: 'var(--white)',
    borderRadius: 8,
    height: 'inherit',
    // maxWidth: "600px",
    // maxHeight: "750px",

    // height: '280px',
    '& img': {
      display: 'block',
      // margin: "20px auto",
      width: '100%',
      height: '580px',
      // maxWidth: "600px",
      // maxHeight: "750px",

      objectFit: 'cover',
      [theme.breakpoints.down('xs')]: {
        height: '100%',
        aspectRatio: '2/3',
        // height: "100%",
        // objectFit: "contain",
        objectFit: 'cover',
        width: '100%',
      },
      //   objectFit: "contain",
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2),
      height: '420px',
    },
  },
  productThumbContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 100,
    // margin: "20px auto",
    '& div': {
      width: '80px',
      height: '100px',
      margin: theme.spacing(0, 1, 1, 1),
      borderRadius: 4,
      display: 'block',
      '& img': {
        width: '100%',
        height: '100%',
        margin: '0px auto',
        cursor: 'pointer',
        objectFit: 'cover',

        [theme.breakpoints.down('xs')]: {},
      },
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(0, 0, 0, 1),
      },
    },
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
      flexDirection: 'row',
    },
  },
  innerContainer: {
    height: '400px',

    '& .image-gallery-thumbnail.active, .image-gallery-thumbnail:focus': {
      border: '1px solid var(--main-opacity)',
    },
    '& .image-gallery-thumbnail:hover': {
      border: '1px solid var(--main-opacity)',
    },
    '& .image-gallery-icon:hover': {
      color: 'var(--main-opacity)',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: theme.spacing(0),
      margin: theme.spacing(2, 0, 1, 0),
    },
  },

  bottomIcons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '40px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      position: 'fixed',
      backgroundColor: 'white',
      bottom: 0,
      padding: theme.spacing(0, 0, 0, 2),
      zIndex: '1',
      width: '100%',
      left: 0,
    },
  },
  addToBagContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2, 0, 0),
    '& .MuiIconButton-root:hover': {
      background: 'none',
    },
  },

  incButton: {
    margin: theme.spacing(0, 2),
    '& .MuiIconButton-root:hover': {
      background: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 0),
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  wishImg: {
    margin: theme.spacing(0, 0),
    '&.MuiIconButton-root:hover': {
      background: 'none',
      backgroundColor: 'transparent',
    },
  },
  productPlaceholder: {
    padding: '20px',
    width: '100%',
  },
  bottomIconsMobile: {
    display: 'none',

    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      position: 'fixed',
      backgroundColor: 'white',
      bottom: 0,
      padding: theme.spacing(0, 0, 0, 2),
      zIndex: '1',
      width: '100%',
      left: 0,
      justifyContent: 'space-between',
    },
  },
  heartImg: {
    position: 'absolute',
    top: '0%',
    right: '17%',
    zIndex: 1,
    [theme.breakpoints.down('md')]: {
      top: '0%',
      right: '30%',
    },
    [theme.breakpoints.down('xs')]: {
      top: '0%',
      right: '0%',
    },
  },
  placeholderDiv: {
    width: '500px',
    height: '750px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '400px',
    },
  },
  messageHeading: {
    font: `normal 700 ${theme.spacing(2.0)} Work Sans`,
    color: 'var(--black300)',
    lineHeight: '28px',
    marginBottom: '9px',

    // margin: theme.spacing(0.8, 0),
  },
}));

const ProductImages = (props: any) => {
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

  var productData1 = props && props?.details;
  const dispatch: any = useDispatch();
  // const history = useNavigate();

  const classes = useStyles();
  const router = useRouter();
  // const [state, setState] = React.useState({
  //     displayImage: '',
  //     sliderImages: [],
  //     open: false,
  //     productCount: 1,
  //     productDetails: true,
  //     imageSaved: false,
  //     wishlistAdded: false,
  // });
  const [loginAlert, showLoginAlert] = useState(false);
  const [like, setLike] = React.useState(
    productData1?.wishlists?._id ? true : false
  );
  const { callback } = props;
  const [images, setImages] = React.useState<any>([]);
  const [mainImageIndex, setMainImageIndex] = React.useState(0);
  const [loader, setLoader] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  const productData: ProductDetailModal = useSelector(
    (state: ReducersModal) => state.productDetailReducer
  );

  // const totalCount = useSelector(
  //   (state: ReducersModal) => state.wishlistReducer.totalCount
  // );

  useEffect(() => {
    // setImages(productData?.selectedVariantData?.image || []);
    setImages(
      productData?.selectedVariantData?.image?.length > 0
        ? productData?.selectedVariantData?.image
        : productData?.product?.image || []
    );
  }, [productData]);
  // if (productData?.productData?.details?.images?.length > 0) {
  //     let new_image = IMAGE_URL + 'catalog/product' + productData?.productData?.details?.images[0]?.file
  //     if (new_image && new_image !== state.displayImage) {
  //         let images: any = [];
  //         productData?.productData?.details?.images?.map((img: any, index: any) => {
  //             images.push(IMAGE_URL + 'catalog/product' + img.file)
  //         }
  //         );
  //         setState({ ...state, displayImage: new_image, sliderImages: images })

  //         productData.productData.details.images = null;
  //     }
  // }

  // useEffect(() => {
  //     if (productData1) {
  //         var images: any = [];
  //         var firstImage = '';
  //         productData1?.image?.map((img: any, index: any) => {
  //             if (index === 0) {
  //                 firstImage = IMAGE_URL + 'catalog/product' + img.file
  //             }
  //             images.push(IMAGE_URL + 'catalog/product' + img.file)
  //         })
  //         state.sliderImages = images;
  //         setState({ ...state, sliderImages: images, displayImage: firstImage });
  //         // if (productData1.isWishlisted && !state.wishlistAdded) {
  //         //     setLike(!like)
  //         //     setState({ ...state, wishlistAdded: true})
  //         // }
  //     }
  // }, [productData1]);

  // const handleOpen = () => {
  //     setState({ ...state, open: true });
  // };

  // const handleClose = () => {
  //     setState({ ...state, open: false });
  // };

  // const handleSetImage = (image: any) => {
  //     setState({ ...state, displayImage: image.target.src });
  // }

  const handleLike = (status: boolean, product: any) => {
    // setLike(!like);
    setLoader(true);
    if (status) {
      let data: any = {
        productId: product?.magentoId,
        type: product?.type || 'simple',
        attributeData: product?.configurableProductOptions?.length
          ? [
              {
                id: product?.configurableProductOptions?.[0]?.attribute_id,
                value:
                  product?.configurableProductOptions?.[0]?.values?.[0]
                    ?.value_index,
              },
            ]
          : [],
      };
      // addToWishList(data)
      //   .then((resp) => {
      //     if (resp) {
      //       setLike(true);
      //       setWishlistId(resp?.data?.data?._id);
      //       // dispatch({
      //       //   type: Utils.ActionName.WISHLIST,
      //       //   payload: { totalCount: totalCount + 1 },
      //       // });
      //       let categoryAttributesIndex = product?.customAttributes.findIndex(
      //         (i: any) => i.attribute_code === 'category_ids'
      //       );
      //       let categoryAttributesData =
      //         product?.customAttributes[categoryAttributesIndex];
      //       let categoryArray = categoryAttributesData?.label.reduce(
      //         (i: any, j: any) => {
      //           i.push({
      //             CategoryName: j.label,
      //             CategoryId: j.value,
      //           });
      //           return i;
      //         },
      //         []
      //       );
      //       dispatch(getWishList({ limit: 10, page: 1 }));

      //       dispatch({
      //         type: 'show-alert',
      //         payload: {
      //           type: 'success',
      //           message: 'Product added to wishlist',
      //         },
      //       });
      //       eventAddToWishlist({
      //         ProductId: `${product?.magentoId}`,
      //         ProductName: `${product?.name}`,
      //         Price: `${product?.price}`,
      //         Category: JSON.stringify(categoryArray),
      //         FromScreen: `pdp`,
      //       });

      //       if (callback) {
      //         callback();
      //         dispatch(hideLoader());
      //       }
      //     } else {
      //       dispatch(hideLoader());
      //     }
      //     setLoader(false);
      //   })
      //   .catch((err) => {
      //     setLoader(false);

      //     if (err?.response?.data?.message)
      //       dispatch({
      //         type: 'show-alert',
      //         payload: {
      //           type: 'error',
      //           message: err?.response?.data?.message,
      //         },
      //       });
      //   });
    } else {
      // removeFromWishList(
      //   wishlistId
      //     ? wishlistId
      //     : product.wishlists && product.wishlists?._id
      //     ? product.wishlists?._id
      //     : product._id
      // )
      //   .then((resp) => {
      //     if (resp) {
      //       setLike(false);
      //       // dispatch({
      //       //   type: Utils.ActionName.WISHLIST,
      //       //   payload: { totalCount: totalCount - 1 },
      //       // });
      //       let categoryAttributesIndex = product?.customAttributes.findIndex(
      //         (i: any) => i.attribute_code === 'category_ids'
      //       );
      //       let categoryAttributesData =
      //         product?.customAttributes[categoryAttributesIndex];
      //       let categoryArray = categoryAttributesData?.label.reduce(
      //         (i: any, j: any) => {
      //           i.push({
      //             CategoryName: j.label,
      //             CategoryId: j.value,
      //           });
      //           return i;
      //         },
      //         []
      //       );
      //       dispatch(getWishList({ limit: 10, page: 1 }));
      //       dispatch({
      //         type: 'show-alert',
      //         payload: {
      //           type: 'success',
      //           message: 'Product removed from wishlist',
      //         },
      //       });
      //       eventRemoveFromWishlist({
      //         ProductId: `${product.magentoId}`,
      //         ProductName: `${product.name}`,
      //         Price: `${product.price}`,
      //         Category: JSON.stringify(categoryArray),
      //         FromScreen: `pdpI`,
      //       });
      //       if (callback) {
      //         callback();
      //         dispatch(hideLoader());
      //       }
      //     } else {
      //       dispatch(hideLoader());
      //     }
      //     setLoader(false);
      //   })
      //   .catch((err) => {
      //     setLoader(false);
      //     if (err?.response?.data?.message)
      //       dispatch({
      //         type: 'show-alert',
      //         payload: {
      //           type: 'error',
      //           message: err?.response?.data?.message,
      //         },
      //       });
      //   });
    }
  };

  // const handleProductCount = (option: string) => {
  //     const maxLimit = productData1?.stockItem?.max_sale_qty || 10;
  //     const minLimit = productData1?.stockItem?.min_sale_qty || 1;
  //     if (option === "+") {
  //         if (state.productCount < maxLimit) {
  //             setState({ ...state, productCount: state.productCount + 1 });
  //         }
  //         if (state.productCount === maxLimit) {
  //             dispatch({
  //                 type: "show-alert", payload: {
  //                     type: "error",
  //                     message: `We're sorry! Only ${maxLimit} unit(s) allowed in each order`
  //                 }
  //             })
  //         }
  //     }
  //     if (option === "-") {
  //         if (state.productCount > minLimit) {
  //             setState({ ...state, productCount: state.productCount - 1 });
  //         }
  //     }
  // };

  // const onNotify = (data: any) => {
  //     let attributeData: any = {}
  //     if (data.type !== 'simple') {
  //         const configurableData = data.configurableProductOptions?.[0];
  //         attributeData.id = configurableData?.attribute_id
  //         attributeData.value = configurableData?.values?.[0]?.value_index
  //     }
  //     const email = localStorage.getItem('email');
  //     const message = `We will notify you over the mail ${email} once the product is back in stock`;
  //     const params = {
  //         productId: data.magentoId,
  //         attributeData: data.type !== 'simple' ? [attributeData] : [],
  //         type: data.type
  //     }
  //     notifyMe(params).then(() => {
  //         dispatch({
  //             type: "show-alert", payload: {
  //                 type: "success",
  //                 message
  //             }
  //         })
  //     }).catch((error) => {

  //     })

  // }

  return (
    <>
      <MessageDialogue
        cancelText={'Cancel'}
        okText={'Okay'}
        open={loginAlert}
        handleClose={() => showLoginAlert(!loginAlert)}
        onOk={() => {
          router.push(
            `${Utils.routes.LOGIN_OTP}?redirectTo=${location.pathname}`
          );
          showLoginAlert(false);
        }}
        message={'Please login to proceed'}
        heading={'The Body Shop'}
        headingClass={classes.messageHeading}
      />
      <div className={classes.innerContainer}>
        <div className={classes.productImageContainer}>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <div>
              {like ? (
                <IconButton
                  aria-label="favorite"
                  className={classes.heartImg}
                  // onClick={() => handleLike(false, productData)}
                >
                  <img
                    src={Utils.images.FAVORITE_ICON}
                    alt="heart"
                    onClick={() => {
                      if (!loader)
                        if (isAuthenticated()) handleLike(false, productData1);
                        else showLoginAlert(true);
                    }}
                  />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="favorite"
                  className={classes.heartImg}
                  onClick={() => {
                    if (!loader)
                      if (isAuthenticated()) handleLike(true, productData1);
                      else showLoginAlert(true);
                  }}
                >
                  <img src={Utils.images.HEART} alt="heart" />
                </IconButton>
              )}
            </div>
          </Box>

          <div>
            {images?.[mainImageIndex]?.file ? (
              <>
                <Box sx={{ display: { sm: 'block', xs: 'none' } }}>
                  <div style={{ width: '500px', height: '750px' }}>
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          alt: 'Product Image',
                          isFluidWidth: false,
                          src: `${IMAGE_URL}catalog/product${images?.[mainImageIndex]?.file}`,
                          width: 500,
                          height: 750,
                        },
                        largeImage: {
                          src: `${IMAGE_URL}catalog/product${images?.[mainImageIndex]?.file}`,
                          width: 1200,
                          // height: 3000,
                          height: 1800,
                        },
                        enlargedImageContainerDimensions: {
                          width: '100%',
                          height: '100%',
                          zIndex: 9999,
                          position: 'absolute',
                        },
                        enlargedImagePosition: 'beside',
                        enlargedImageStyle: {
                          minWidth: '1200px',
                          // height: "100px",
                          zIndex: 100000,
                        },
                      }}
                    />
                  </div>
                </Box>
                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                  <div className={classes.productImage}>
                    <img
                      src={`${IMAGE_URL}catalog/product${images?.[mainImageIndex]?.file}`}
                      alt="productImage"
                    />
                  </div>
                </Box>
              </>
            ) : (
              // <ImageMagnifier
              //   src={`${IMAGE_URL}catalog/product${images?.[mainImageIndex]?.file}`}
              // />
              <div className={classes.placeholderDiv}>
                <span className={classes.productPlaceholder}>
                  {/* <PRODUCT_PLACEHOLDER /> */}
                </span>
              </div>
            )}
          </div>

          <div className={classes.productThumbContainer}>
            {images?.map((item: any, index: any) => (
              <div key={index}>
                <img
                  src={`${IMAGE_URL}catalog/product${item?.file}`}
                  alt="product"
                  onClick={(_item): void => setMainImageIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>
        {/* {props?.opacity === '0' ?
                        <div className={classes.bottomIcons}>
                            {productData1?.isWishlisted || like ?
                                <IconButton aria-label="favorite" onClick={() => handleLike(false, productData1)} className={classes.wishImg} >
                                    <img src={Utils.images.FAVORITE_ICON} alt="heart"
                                    />
                                </IconButton>
                                :
                                <IconButton aria-label="favorite" onClick={() => handleLike(true, productData1)} className={classes.wishImg} >
                                    <img src={Utils.images.HEART}
                                        alt="heart"
                                    />
                                </IconButton>
                            }
                            
                                <div className={classes.addToBagContainer}>
                                {productData?.checkStock && productData1 && productData1?.stockItem?.is_in_stock ?
                                        <>
                                        <IconButton aria-label="decrease">
                                            <img src={Utils.images.DECREASING_ICON} alt="decreasing" className={classes.incButton} onClick={() => handleProductCount('-')} />
                                        </IconButton>
                                        <Typography>{state.productCount}</Typography>
                                        <IconButton aria-label="increase">
                                            <img src={Utils.images.INCREASING_ICON} alt="increasing" className={classes.incButton} onClick={() => handleProductCount('+')} />
                                        </IconButton>
                                        </>
                                        :
                                        null
                                }
                                {productData?.checkStock && productData1 && productData1?.stockItem?.is_in_stock ?
                                    <ContainedButton text="Add to Bag" type="button"
                                        onClick={handleOpen}
                                    />
                                    :
                                    <ContainedButton text="Notify Me" type="button" onClick={() => onNotify(productData1)} />
                                }
                                <SuccessModal
                                    open={state.open}
                                    handleClose={handleClose}
                                    details={productData1}
                                    quantity={state.productCount}
                                />
                            </div>
                            
                        </div>
                    :
                        null
                    } */}

        {/* <div className={classes.bottomIconsMobile}>
                    {productData1?.isWishlisted || like ?
                        <IconButton aria-label="favorite" onClick={() => handleLike(false, productData1)} className={classes.wishImg} >
                            <img src={Utils.images.FAVORITE_ICON} alt="heart"
                            />
                        </IconButton>
                        :
                        <IconButton aria-label="favorite" onClick={() => handleLike(true, productData1)} className={classes.wishImg} >
                            <img src={Utils.images.HEART}
                                alt="heart"
                            />
                        </IconButton>
                    }

                    <div className={classes.addToBagContainer}>
                        {productData?.product?.isInStock && productData1 && productData1?.stockItem?.is_in_stock ?
                            <>
                                <IconButton aria-label="decrease">
                                    <img src={Utils.images.DECREASING_ICON} alt="decreasing" className={classes.incButton} onClick={() => handleProductCount('-')} />
                                </IconButton>
                                <Typography>{state.productCount}</Typography>
                                <IconButton aria-label="increase">
                                    <img src={Utils.images.INCREASING_ICON} alt="increasing" className={classes.incButton} onClick={() => handleProductCount('+')} />
                                </IconButton>
                            </>
                            :
                            null
                        }
                        {productData?.product?.isInStock && productData1 && productData1?.stockItem?.is_in_stock ?
                            <ContainedButton text="Add to Bag" type="button"
                                onClick={handleOpen}
                            />
                            :
                            <ContainedButton isOutline isGreen text="Notify Me" type="button" onClick={() => onNotify(productData1)} />
                        }
                        <SuccessModal
                            open={state.open}
                            handleClose={handleClose}
                            details={productData1}
                            quantity={state.productCount}
                        />
                    </div>

                </div> */}

        {/* <div className={classes.bottomIconsMobile}>
                    {productData1?.isWishlisted || like ?
                        <IconButton aria-label="favorite" onClick={() => handleLike(false, productData1)} className={classes.wishImg} >
                            <img src={Utils.images.FAVORITE_ICON} alt="heart"
                            />
                        </IconButton>
                        :
                        <IconButton aria-label="favorite" onClick={() => handleLike(true, productData1)} className={classes.wishImg} >
                            <img src={Utils.images.HEART}
                                alt="heart"
                            />
                        </IconButton>
                    }

                    <div className={classes.addToBagContainer}>
                        {productData?.selectedVariantData?.isInStock ?
                            <ContainedButton text="Add to Bag" type="button"
                                onClick={handleOpen}
                            />
                            :
                            <ContainedButton isOutline isGreen text="Notify Me" type="button" onClick={() => onNotify(productData1)} />
                        }
                        <SuccessModal
                            open={state.open}
                            handleClose={handleClose}
                            details={productData1}
                            quantity={state.productCount}
                        />
                    </div>

                </div> */}
      </div>
    </>
  );
};

export default ProductImages;
