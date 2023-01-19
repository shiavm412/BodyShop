// @ts-nocheck
import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Drawer,
  Button,
  Divider,
  IconButton,
  Grid,
  createStyles,
  Theme,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  addToWishlist as eventAddToWishlist,
  removeFromWishlist as eventRemoveFromWishlist,
} from '../../utils/event/action';
// import Utils from "../../../utils";
// import { createStyles, Theme, Typography } from "@material-ui/core";
// import { addToWishList, removeFromWishList } from "../product/action";
// import { Link } from "react-router-dom";
// import { notifyMe } from "../product/action";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   showLoader,
//   hideLoader,
//   hideSkeleton,
// } from "../../../pages/home/actions";
// import { getWishList } from "../../../pages/wishlist/action";
// import {
//   addToWishlist as eventAddToWishlist,
//   removeFromWishlist as eventRemoveFromWishlist,
// } from "../../../utils/event/action";
import _ from 'lodash';
// import { ReducersModal } from "../../../models";
import { Box } from '@mui/material';
import Utils from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, notifyMe, removeFromWishList } from '../product/action';
import { getWishList } from '../wishlist/action';
import Link from 'next/link';
import Image from 'next/image';
// import { getWishList } from "../../../pages/wishlist/action";
// import BACK_ARROW from "../../../assets/images/backarrow.png";

// import { CROSS, FAVORITE_ICON, HEART, PRODUCT_PLACEHOLDER } from "utils/constantImages";
// import { a } from "react-spring";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullList: {
      // padding: theme.spacing(1.5),
      width: '440px',
      [theme.breakpoints.down('xs')]: {
        // maxWidth: "320px",
        // width: "fit-content",
        width: '100%',
      },
    },
    imageContainer: {
      padding: theme.spacing(2),
      justifyContent: 'space-between',
    },
    headerDiv: {
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'start',
      },
    },
    header: {
      font: `normal ${theme.spacing(2.4)} Recoleta`,
      color: theme.palette.primary.main,
      fontWeight: 600,
      // textTransform: "uppercase",
    },
    imgDiv: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: 4,
      height: '100%',
      // backgroundColor: "var(--light-creame-color)",
      padding: '10%',
      '& img': {
        width: '100%',
      },
    },
    textDiv: {
      display: 'flex',
      flexDirection: 'column',
      // padding: theme.spacing(0, 1)
    },
    textBrand: {
      font: `normal ${theme.spacing(1.6)} Work Sans`,
      fontWeight: 600,
      color: 'var(--secondary-black)',
      lineHeight: '24px',
      [theme.breakpoints.down('xs')]: {
        fontSize: '14px',
      },
    },
    textQty: {
      font: `normal ${theme.spacing(1.3)} Work Sans`,
      color: 'var(--light-gray)',
      textTransform: 'uppercase',
      lineHeight: '19px',
      [theme.breakpoints.down('xs')]: {
        fontSize: '11px',
      },
    },
    textPrice: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )} Work Sans`,
      marginTop: theme.spacing(1),
      color: 'var(--green-color)',
    },
    btnContainer: {
      padding: theme.spacing(3, 2),
      borderRadius: '4px',
      position: 'sticky',
      backgroundColor: 'var(--white)',
      bottom: 0,
      '& .MuiButton-root': {
        padding: theme.spacing(1.2, 0),
        width: '100%',
      },
      '& .MuiButton-label': {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.6
        )} Work Sans`,
      },
      [theme.breakpoints.down('xs')]: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
      },
    },
    heartImg: {
      position: 'absolute',
      top: '0%',
      right: '0%',
      padding: 0,
    },
    colorContainer: {
      display: 'flex',
      maxWidth: '83%',
      // justifyContent: "space-between",
    },
    selectSize: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )} Recoleta Alt`,
      lineHeight: '22px',
      letterSpacing: '0.02em',
      color: 'var(--secondary-black)',
      margin: theme.spacing(3, 0, 1.5, 0),
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(3, 0, 0, 0),
      },
    },
    buttonContainer: {
      width: '100%',
      '& .MuiToggleButton-root': {
        border: '1px solid var(--light-gray-text)',
        padding: '12px 18px',
        textTransform: 'none',
        borderRadius: '2px',
        font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
          1.3
        )} Work Sans`,
        lineHeight: '15px',
        color: 'var(--light-gray)',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
        // width: "80%",
        [theme.breakpoints.down('xs')]: {
          padding: theme.spacing(0.8, 1),
          width: 75,
          height: 40,
        },
      },
      // "& .MuiToggleButtonGroup-groupedHorizontal:not(:first-child)": {
      //   marginLeft: "20px",
      //   [theme.breakpoints.down("md")]: {
      //     margin: theme.spacing(0),
      //   },
      // },
      '& .MuiToggleButton-root.Mui-selected': {
        color: 'var(--white)',
        backgroundColor: 'var(--main-opacity)',
      },
      '& > *': {
        // width: 85,
        // padding: theme.spacing(0, 1)
      },
    },
    toggleContainer: {
      padding: theme.spacing(2),

      // margin: theme.spacing(1),
      '& .MuiToggleButtonGroup-root': {
        [theme.breakpoints.down('md')]: {
          display: 'inline-flex',
        },
      },
    },
    imgBox: {
      display: 'flex',
      justifyContent: 'center',
      // alignItems: "center",
      // height: 65,
      // width: 65,
      // marginRight: theme.spacing(1),
      // padding: theme.spacing(0.5),
      // backgroundColor: "var(--light-creame-color)",
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0.8, 1),
      },
      '& img': {
        width: '100%',
        objectFit: 'contain',
      },
    },
    fontLabel: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )} Work Sans`,
      color: 'var(--secondary-black)',
      margin: theme.spacing(1, 0),
      textAlign: 'center',
      [theme.breakpoints.down('xs')]: {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.2
        )} Work Sans`,
        margin: theme.spacing(1, 0.8),
      },
    },
    cursor: {
      cursor: 'pointer',
    },
    btn: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )} Work Sans`,

      '& .MuiButton-contained': {
        color: 'var(--white)',
      },
      borderRadius: 4,
      textTransform: 'none',
      padding: theme.spacing(1, 2),
      width: 'max-content',
    },
    btnRadius: {
      borderRadius: 4,
    },
    outOfStock: {
      font: 'normal 600 12px Work Sans  ',
    },
    variantContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        alignItems: 'baseline',
        marginTop: 10,
      },
    },
    amountDiv: {
      display: 'flex',
      alignItems: 'center',
      margin: theme.spacing(0.5, 0),
      flexDirection: 'column',
    },
    amount: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )} Work Sans`,
      color: 'var(--secondary-black)',
      marginRight: theme.spacing(0.5),
    },
    amount1: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )} Work Sans`,
      color: theme.palette.primary.main,
      lineHeight: 2,
    },
    mrp: {
      marginLeft: theme.spacing(1),
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )} Work Sans`,
      color: 'var(--light-gray)',
      textDecorationLine: 'line-through',
    },
    line: {
      width: 'calc(1.414 * 200px)',
      transform: 'rotate(-27deg)',
      transformOrigin: 'bottom left',
      borderTop: '1px solid var(--light-gray)',
      position: 'absolute',
      bottom: '-1px',
      left: '-1px',
      boxSizing: 'border-box',
      // height: "1px",
      // background: "var(--light-gray)",
      // transform: "rotate(-27deg)",
      // width: theme.spacing(8.7),
      // position: "relative",
      // top: "-21px",
      // left: "0px",
    },
    backArrow: {
      width: theme.spacing(2.5),
      height: 'auto',
    },
    drawer: {
      [theme.breakpoints.down('xs')]: {
        '& .MuiDrawer-paperAnchorRight': {
          left: 0,
        },
      },
    },
  })
);

interface Props {
  visible: boolean;
  toggleDrawer: Function;
  item: any;
  addToCart: Function;
  section: 'wishlist' | 'plp' | 'recommend' | 'tips';
}

const SelectSize: React.FC<any> = (props: Props) => {
  const dispatch: any = useDispatch();
  const classes = useStyles();

  const IMAGE_URL = Utils.constants.productImage;
  const { item, visible, toggleDrawer, addToCart, section } = props;
  let configurableOptions = item?.configurableProductOptions?.[0];
  let configurableLinks = item?.configurableProductLinks;

  let desc = item?.customAttributes.find(
    (val: any) => val.attribute_code === 'short_description'
  );

  const [wishlist, setWishlist] = React.useState(item?.isWishlisted);

  let defaultVariantIndex = configurableLinks.findIndex(
    (item: any) => item.isInStock
  );
  defaultVariantIndex = defaultVariantIndex > -1 ? defaultVariantIndex : 0;
  let selectedVariantData = configurableLinks?.[defaultVariantIndex];

  let discPrice = selectedVariantData?.customAttributes?.find(
    (item: any) => item.attribute_code === 'special_price'
  );

  const findDefaultSelection = (size: string) => {
    const obj = configurableOptions?.values?.find(
      (option: any) => option?.label?.toLowerCase() === size?.toLowerCase()
    );
    return obj;
  };

  const [selectedVariant, setSelectedVariant] = React.useState(
    findDefaultSelection(selectedVariantData?.size)
  );

  const [totalPrice, setTotalPrice] = React.useState(
    discPrice?.value ?? selectedVariantData?.price
  );
  const [productImage, setProductImage] = React.useState(
    selectedVariantData?.image?.[0]?.file
  );

  const [isInStock, setIsInStock] = React.useState(
    configurableLinks?.[defaultVariantIndex]?.isInStock
  );

  const plpData = useSelector((state: any) => state.productReducer?.data);

  const [product, setProduct]: any = React.useState({
    productId: item.magentoId,
    attributeData: [
      {
        value: selectedVariant.value_index,
        id: configurableOptions.attribute_id,
      },
    ],
    type: item.type,
    quantity: 1,
    wishlistItemId: section === 'wishlist' ? item?.wishlists?._id : '',
  });

  let pathname = Utils.CommonFunctions.seoUrl({ ...item, plpData }, 'pdp');
  // const handleLike = (status: boolean, item: any) => {

  //   if (status) {
  //     let data: any = {
  //       productId: item.magentoId,
  //       type: item.type,
  //       attributeData: item.configurableProductOptions?.length ?
  //         [
  //           {
  //             id: item.configurableProductOptions?.[0]?.attribute_id,
  //             value: item.configurableProductOptions?.[0]?.values?.[0].value_index
  //           }
  //         ]
  //         :
  //         [],
  //     }
  //     addToWishList(data).then(() => {
  //       if (callback)
  //         callback()
  //     })
  //   } else {
  //     removeFromWishList(item.wishlists ? item.wishlists?._id : item._id).then(() => {
  //       if (callback)
  //         callback()
  //     })
  //   }
  //   setWishlist(!wishlist)
  // }

  const handleLike = (status: boolean, product: any) => {
    setWishlist(!wishlist);

    if (status) {
      let data: any = {
        productId: item.magentoId,
        type: item.type,
        attributeData: item.configurableProductOptions?.length
          ? [
              {
                id: item.configurableProductOptions?.[0]?.attribute_id,
                value:
                  item.configurableProductOptions?.[0]?.values?.[0].value_index,
              },
            ]
          : [],
      };
      if (section === 'wishlist') {
        // dispatch(showLoader());
      }
      addToWishList(data)
        .then((resp) => {
          if (resp) {
            let categoryAttributesIndex = item?.customAttributes.findIndex(
              (i: any) => i.attribute_code === 'category_ids'
            );
            let categoryAttributesData =
              item?.customAttributes[categoryAttributesIndex];
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
            eventAddToWishlist({
              ProductId: `${item?.magentoId}`,
              ProductName: `${item?.name}`,
              Price: `${item?.price}`,
              Category: JSON.stringify(categoryArray),
              FromScreen: `${section}`,
            });

            if (section === 'wishlist') {
              dispatch(getWishList({ limit: 10, page: 1 }));
            } else {
              product.isWishlisted = true;
              product.wishlists = {
                _id: resp?.data?.data?._id,
              };

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
            // dispatch(hideLoader());
            // dispatch(hideSkeleton());
          }
        })
        .catch((err) => {
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
      if (section === 'wishlist') {
        // dispatch(showLoader());
      }

      removeFromWishList(
        product.wishlists ? product.wishlists?._id : product._id
      )
        .then((resp) => {
          if (resp) {
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
            eventRemoveFromWishlist({
              ProductId: `${product.magentoId}`,
              ProductName: `${product.name}`,
              Price: `${product.price}`,
              Category: JSON.stringify(categoryArray),
              FromScreen: `${section}`,
            });

            if (section === 'wishlist') {
              dispatch({
                type: Utils.ActionName.WISHLIST_UPDATE,
                payload: product?.wishlists?._id,
              });
              // dispatch(hideLoader());
            } else {
              product.isWishlisted = false;

              dispatch({ type: 'product.update', payload: product });
              dispatch({ type: 'recommend.update', payload: product });

              dispatch({
                type: 'show-alert',
                payload: {
                  type: 'success',
                  message: 'Product removed from wishlist',
                },
              });
            }
          } else {
            // dispatch(hideLoader());
          }
        })
        .catch((err) => {
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
  };

  const selectProduct = (selectedItem: any, finalPrice: any) => {
    // let selectedProduct = configurableLinks?.find((item: any) => item?.size?.toLowerCase() === selectedItem?.label?.toLowerCase())
    let selectedProduct = configurableLinks?.find(
      (val: any) =>
        val?.value?.toLowerCase() === selectedItem?.label?.toLowerCase()
    );
    let data = {
      productId: item.magentoId,
      attributeData: [
        {
          value: selectedItem?.value_index,
          id: configurableOptions.attribute_id,
        },
      ],
      type: item.type,
      quantity: 1,
    };

    setProduct(data);
    setSelectedVariant(selectedItem);
    // setTotalPrice(selectedProduct?.price ?? item?.price)
    setTotalPrice(finalPrice);
    setIsInStock(selectedProduct?.isInStock);
    setProductImage(selectedProduct?.image?.[0]?.file);
  };

  const onNotify = (data: any) => {
    let attributeData: any = [];
    if (data.type !== 'simple') {
      attributeData = [
        {
          value: selectedVariant.value_index,
          id: configurableOptions.attribute_id,
        },
      ];
    }
    // const message = `We will notify you over the mail ${email} once the product is back in stock`;
    const params = {
      productId: data.magentoId,
      attributeData,
      type: data.type,
    };
    notifyMe(params)
      .then((resp) => {
        if (resp?.data?.message) {
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'success',
              message: resp?.data?.message,
            },
          });
        }
      })
      .catch((_error) => {});
  };

  // let cartTimeout = setTimeout(toggleDrawer(false), 3000)
  // const options=configurableOptions?.values?.sort((a:any,b:any)=>a?.label?.slice(0,a?.label?.length-2)-b?.label?.slice(0,b?.label?.length-2));
  const optionLinkArr = configurableOptions?.values?.map((option: any) => {
    const obj = configurableLinks.find(
      (link: any) => link?.value == option?.label
    );
    option.configurableProductLink = obj || {};
    return option;
  });
  const sortedOptionLinkArr = optionLinkArr.sort(
    (a: any, b: any) =>
      a?.configurableProductLink?.price - b?.configurableProductLink?.price
  );

  const list = () => (
    <div
      className={classes.fullList}
      role="presentation"
      // onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(false)}
    >
      <div className={classes.headerDiv}>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <div style={{ flexBasis: '35%' }}>
            <img
              src={Utils.images.BACK_ARROW}
              className={classes.backArrow}
              onClick={(e) => toggleDrawer(false)(e)}
              alt="back"
            />
          </div>
        </Box>

        <Typography
          className={classes.header}
        >
          {`Select ${configurableOptions?.label}`}
          </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <div
            className={classes.cursor}
            onClick={(e) => toggleDrawer(false)(e)}
          >
            <Image src={Utils.images.CROSS} alt="cross" width={40} height={40}/>
          </div>
        </Box>
      </div>
      <Divider />
      <Grid container className={classes.imageContainer}>
        <Grid item xs={3}>
          <div className={classes.imgDiv}>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {wishlist ? (
                <IconButton
                  aria-label="favorite"
                  className={classes.heartImg}
                  onClick={() => handleLike(false, item)}
                >
                  {/* <img src={Utils.images.FAVORITE_ICON} alt="heart" /> */}
                  {/* <FAVORITE_ICON /> */}
                </IconButton>
              ) : (
                <IconButton
                  aria-label="favorite"
                  className={classes.heartImg}
                  onClick={() => handleLike(true, item)}
                >
                  {/* <img src={Utils.images.HEART} alt="heart" /> */}
                  {/* <HEART /> */}
                </IconButton>
              )}
            </Box>
            <Link
              // to={Utils.CommonFunctions.replaceUrlParams(
              //   Utils.routes.PRODUCT_DETAIL,
              //   { ":id": item?.magentoId }
              // )}
              href={pathname}
            >
              {productImage ? (
                <img src={`${IMAGE_URL}${productImage}`} alt="product" />
              ) : (
                ""
                // <PRODUCT_PLACEHOLDER />
              )}
            </Link>
          </div>
        </Grid>

        <Grid item xs={8}>
          <div className={classes.textDiv}>
            <Typography className={classes.textBrand}>{item?.name}</Typography>
            <Typography
              className={classes.textQty}
              // dangerouslySetInnerHTML={{ __html: desc?.value }}
              dangerouslySetInnerHTML={{
                __html: _.truncate(
                  Utils.CommonFunctions.replaceHtmlTag(desc?.value),
                  { length: 55 }
                ),
              }}
            ></Typography>
            <Typography
              className={classes.textPrice}
            >{`${configurableOptions?.values?.length} ${configurableOptions?.label}`}</Typography>

            {/* <div className={classes.colorContainer}> */}
            <Grid container spacing={1}>
              {configurableLinks?.map((value: any, i: any) => (
                <Grid item xs={3} key={i}>
                  <div className={classes.imgBox}>
                    {value?.image?.[0]?.file ? (
                      <img
                        src={`${IMAGE_URL}${value?.image?.[0]?.file}`}
                        alt="product"
                      />
                    ) : (
                      ""
                      // <PRODUCT_PLACEHOLDER />
                    )}
                  </div>
                </Grid>
              ))}
            </Grid>
            {/* </div> */}
          </div>
        </Grid>
      </Grid>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Divider />
      </Box>
      <div className={classes.toggleContainer}>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography className={classes.selectSize}>
            {`Select ${configurableOptions?.label}`}
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <Typography className={classes.selectSize}>
            {`${configurableOptions?.label}`}
          </Typography>
        </Box>

        <div>
          <ToggleButtonGroup
            aria-label="text alignment"
            className={classes.buttonContainer}
          >
            <Grid container>
              {sortedOptionLinkArr?.map((val: any, i: any) => {
                let configProduct = val?.configurableProductLink || {};
                // configurableLinks?.find(
                //   (item: any) =>
                //     item?.value?.toLowerCase() === val?.label?.toLowerCase()
                // );
                let discPrice = configProduct?.customAttributes?.find(
                  (item: any) => item.attribute_code === 'special_price'
                )?.value;
                let price = configProduct?.price;
                let finalPrice = discPrice ?? price;
                return (
                  <Grid item xs={4} sm={3} key={i}>
                    <div
                      onClick={() => selectProduct(val, finalPrice)}
                      className={classes.variantContainer}
                    >
                      <ToggleButton
                        selected={
                          val.value_index === selectedVariant.value_index
                        }
                        value={val.value_index}
                        aria-label="left aligned"
                      >
                        <div>
                          {val.label}
                          {!configProduct?.isInStock && (
                            <div className={classes.line}></div>
                          )}
                        </div>
                      </ToggleButton>
                      <div className={classes.amountDiv}>
                        {discPrice ? (
                          <>
                            <Typography className={classes.fontLabel}>
                              ₹{Utils.CommonFunctions.decimalFlat(discPrice, 0)}
                            </Typography>
                            {
                              <Typography className={classes.mrp}>
                                ₹{Utils.CommonFunctions.decimalFlat(price, 0)}
                              </Typography>
                            }
                          </>
                        ) : (
                          <>
                            <Typography className={classes.fontLabel}>
                              ₹{Utils.CommonFunctions.decimalFlat(price, 0)}
                            </Typography>
                          </>
                        )}
                      </div>

                      {/* <Typography className={classes.fontLabel}>₹{price ? Utils.CommonFunctions.decimalFlat(price) : 0}</Typography> */}
                      {/* <Typography className={classes.fontLabel}>₹{price ? Utils.CommonFunctions.decimalFlat(price) : 0}</Typography> */}
                      {!configProduct?.isInStock ? (
                        <Typography
                          className={classes.outOfStock}
                          color="error"
                        >
                          Out of Stock
                        </Typography>
                      ) : null}
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </ToggleButtonGroup>
        </div>
      </div>
      <Divider />

      <div className={classes.btnContainer}>
        {/* <Button variant="contained" color="primary" onClick={(e) => {
          addToCart(product)
          toggleDrawer(false)(e)
        }}>
          Add to Bag: ₹{Utils.CommonFunctions.decimalFlat(totalPrice)}
        </Button> */}
        {isInStock ? (
          <Button
            className={classes.btnRadius}
            variant="contained"
            color="primary"
            onClick={(e) => {
              addToCart(product);
              toggleDrawer(false)(e);
            }}
          >
            Add to Bag: ₹{Utils.CommonFunctions.decimalFlat(totalPrice)}
          </Button>
        ) : (
          <Button
            color="primary"
            variant="outlined"
            className={classes.btn}
            onClick={() => onNotify(item)}
          >
            {'Notify Me'}
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        {visible && (
          <Drawer
            transitionDuration={{ enter: 500, exit: 1000 }}
            // transitionDuration={{ exit: 3000 }}
            anchor={'right'}
            open={visible}
            onClose={(e) => toggleDrawer(false)(e)}
            className={classes.drawer}
          >
            {list()}
          </Drawer>
        )}
      </React.Fragment>
    </div>
  );
};
export default SelectSize;
