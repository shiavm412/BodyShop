import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Grid, IconButton } from "@mui/material";
// import Utils from "../../../utils";
import { Theme, Typography } from "@mui/material";
import { addToWishList, removeFromWishList } from "../../common/product/action";
import { useDispatch, useSelector } from "react-redux";
import { notifyMe } from "../product/action";
import {
  addToWishlist as eventAddToWishlist,
  removeFromWishlist as eventRemoveFromWishlist,
} from '../../utils/event/action';
// import { Link } from "react-router-dom";
// import {
//   showLoader,
//   hideLoader,
//   hideSkeleton,
// } from "../../../pages/home/actions";
// import { getWishList } from "../../../pages/wishlist/action";
import CustomRadio from "./CustomRadio";
// import {
//   addToWishlist as eventAddToWishlist,
//   removeFromWishlist as eventRemoveFromWishlist,
// } from "../../../utils/event/action";
import _ from "lodash";
// import { ReducersModal } from "../../../models";
import { Box } from "@mui/material";
// import { CROSS, FAVORITE_ICON, HEART, PRODUCT_PLACEHOLDER } from "utils/constantImages";
import BACK_ARROW from "../../../assets/images/backarrow.png";
import Utils from "../../utils";
import { getWishList } from "../wishlist/action";
import Link from "next/link";

// import { debug } from "util";

const useStyles = makeStyles((theme: Theme) => ({
    fullList: {
      width: "440px",
      [theme.breakpoints.down("xs")]: {
        // maxWidth: "320px",
        width: "100%",
        marginBottom: 50,
        "& .MuiDrawer-paperAnchorRight": {
          left: 0,
        },
      },
    },
    imageContainer: {
      padding: theme.spacing(2),
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerDiv: {
      padding: theme.spacing(2),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        // displa
      },
    },
    header: {
      font: `normal ${theme.spacing(2.4)} Recoleta`,
      color: theme.palette.primary.main,
      fontWeight: 600,
      [theme.breakpoints.down("xs")]: {
        font: "normal 700 20px Work Sans",
        width: "90%",
        diplay: "flex",
        textAlign: "center",
        lineHeight: "23.4px",
        letterSpacing: "0.8px",
        color: "var(--black)",
      },
      // textTransform: "uppercase",
    },
    imgDiv: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      borderRadius: 4,
      height: 180,
      // backgroundColor: "var(--light-creame-color)",
      // padding: "10%",
      "& img": {
        width: "100%",
      },
      [theme.breakpoints.down("xs")]: {
        height: 120,
      },
    },
    textDiv: {
      display: "flex",
      flexDirection: "column",
      padding: "12px",
    },
    textBrand: {
      font: `normal ${theme.spacing(1.6)} Work Sans`,
      fontWeight: 600,
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        font: `normal 700 20px Recoleta Alt Bold`,
        // letterSpacing: "1px",
        lineHeight: "27px",
      },
    },
    ColourHeading: {
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        font: `normal 700 18px Recoleta Alt Bold`,
        letterSpacing: "1px",
        lineHeight: "28px",
        paddingLeft: "20px",
        paddingTop: "20px",
      },
    },
    textQty: {
      font: `normal ${theme.spacing(1.3)} Work Sans`,
      color: "var(--light-gray)",
      textTransform: "uppercase",
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
        textTransform: "capitalize",
      },
    },
    textPrice: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )} Work Sans`,
      marginTop: theme.spacing(1.5),
      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing(0.6),
      },
    },
    btnContainer: {
      padding: theme.spacing(3, 2),
      borderRadius: "2px",
      position: "sticky",
      backgroundColor: "var(--white)",
      bottom: 0,
      "& .MuiButton-root": {
        padding: theme.spacing(1.2, 0),
        width: "100%",
        [theme.breakpoints.down("xs")]: {
          width: "auto !important",
          padding: "15px 20px",
        },
      },
      "& .MuiButton-label": {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.6
        )} Work Sans`,
      },
      [theme.breakpoints.down("xs")]: {
        position: "fixed",
        bottom: "0",
        width: "auto !important",
        padding: theme.spacing(2),
        background: "white",
        left: 0,
        right: 0,
        borderTop: "1px solid lightgray",
      },
    },
    heartImg: {
      position: "absolute",
      top: "7%",
      right: "7%",
      padding: 0,
    },
    colorContainer: {
      display: "flex",
      flexWrap: "wrap",
    },
    brandDiv: {
      "& div": {
        width: 32,
        height: 32,
        // border: "1px solid red",
        marginRight: 10,
      },
      display: "flex",
      margin: "10px 0px",
      [theme.breakpoints.down("xs")]: {
        margin: "5px 0px",
      },
    },
    brandName: {
      font: `normal ${theme.spacing(1.4)} Work Sans`,
      fontWeight: 500,
      textTransform: "uppercase",
      display: "flex",
      alignItems: "center",
    },
    cursor: {
      cursor: "pointer",
    },
    btnRadius: {
      borderRadius: 4,
    },
    btn: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )} Work Sans`,
      "& .MuiButton-contained": {
        color: "var(--white)",
      },
      borderRadius: 4,
      textTransform: "none",
      padding: theme.spacing(1, 2),
      width: "max-content",
      [theme.breakpoints.down("xs")]: {
        width: "auto",
        // padding:"10px"
      },
    },
    productContainer: {
      padding: theme.spacing(2),
      // margin: theme.spacing(0,1),
    },
    itemContainer: {
      padding: theme.spacing(1.5, 0.5),
    },
    name: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )} Work Sans`,
      lineHeight: "24px",
      color: "var(--secondary-black)",
      textAlign: "center",
      // textTransform: "capitalize",
      // overflow: "hidden",
      // textOverflow: "ellipsis",
      // display: "-webkit-box",
      // "-webkit-line-clamp": 1,
      // "-webkit-box-orient": "vertical",
    },
    productNumber: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.3
      )} Work Sans`,
      lineHeight: "24px",
      color: "var(--light-gray)",
      textAlign: "center",
    },
    productImageContainer: {
      height: 150,
      width: "auto",
      // padding: theme.spacing(1),
      display: "flex",
      justifyContent: "center",
      "& img": {
        // objectFit: "contain",
        objectFit: "cover",
      },
      [theme.breakpoints.down("xs")]: {
        height: 100,
      },
    },
    productImage: {
      // height: "180px",
      // [theme.breakpoints.down("xs")]: {
      //   height: "140px",
      // },
      width: "100%",
      height: "100%",
      objectFit: "cover",
      aspectRatio: "2/3",
    },
    productImageDiv: {
      width: "125px",
      [theme.breakpoints.down("xs")]: {
        width: "95px",
      },
    },
    outOfStock: {
      font: "normal 600 12px Work Sans",
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        fontSize: "11px",
        marginTop: "5px",
      },
    },
    outOfStockFooter: {
      [theme.breakpoints.down("xs")]: {
        font: "normal 700 18px Revoleta Alt",
        marginTop: "5px",
      },
    },
    variantContainer: {
      padding: theme.spacing(0, 1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    selected: {
      border: "2px solid var(--main-opacity)",
      borderRadius: 2,
    },
    amountDiv: {
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(0.5, 0),
      flexDirection: "column",
    },
    fontLabel: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )} Work Sans`,
      color: "var(--secondary-black)",
      margin: theme.spacing(1, 0),
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.2
        )} Work Sans`,
        margin: theme.spacing(1, 0.8),
      },
    },
    mrp: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )} Work Sans`,
      color: "var(--light-gray)",
      textDecorationLine: "line-through",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
          1.6
        )} Work Sans`,
      },
    },

    btnDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing(0),
      },
    },
    view: {
      font: `normal 600 ${theme.spacing(1.8)} Work Sans`,
      lineHeight: "18px",
      color: "var(--secondary-black)",
    },
    discView: {
      font: `normal 600 ${theme.spacing(1.8)} Work Sans`,
      lineHeight: "18px",
      color: "var(--secondary-black)",
      paddingLeft: "20px",
    },
    grandHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )} Work Sans`,
      lineHeight: "19px",
      color: "var(--green-color)",
      [theme.breakpoints.down("xs")]: {
        color: "var(--main-opacity)",
        fontSize: "13px",
        marginTop: "5px",
      },
    },

    checkOutBtn: {
      borderRadius: 4,
      font: `normal 600 ${theme.spacing(1.4)} Work Sans`,
      textTransform: "capitalize",
      padding: theme.spacing(1.5, 0),
      flexBasis: "47%",
    },
    saveBagBtn: {
      borderRadius: 4,
      font: `normal 600 ${theme.spacing(1.4)} Work Sans`,
      textTransform: "capitalize",
      padding: theme.spacing(1.5, 0),
      flexBasis: "47%",
    },
    grandTotalDiv2: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "baseline",
      },
    },
    priceDiv: {
      display: "flex",
      flexDirection: "row-reverse",
    },
    backArrow: {
      width: theme.spacing(2.5),
      height: "auto",
      cursor: "pointer",
    },
  })
);

interface Props {
  visible: boolean;
  toggleDrawer: Function;
  item: any;
  addToCart: Function;
  // callback?: Function;
  section: "wishlist" | "plp" | "recommend" | "tips";
}

export default function Shades(props: Props) {
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const IMAGE_URL = Utils.constants.productImage;
  const { toggleDrawer, visible, item, addToCart, section } = props;
  let configurableOptions = item?.configurableProductOptions?.[0];
  let configurableLinks = item?.configurableProductLinks;
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [wishlist, setWishlist] = React.useState(item?.isWishlisted);
  const plpData = useSelector(
    (state: any) => state?.productReducer?.data
  );

  let desc = item?.customAttributes.find(
    (val: any) => val.attribute_code === "short_description"
  );
  let discPrice = item?.customAttributes?.find(
    (item: any) => item.attribute_code === "special_price"
  );

  // const [desc, SetDesc] = React.useState(item?.customAttributes.find((val: any) => val.attribute_code === "short_description"))
  // const [selectedVariant, setSelectedVariant] = React.useState(configurableOptions?.values?.[0]);
  // const [totalPrice, setTotalPrice] = React.useState(item?.price);
  // const [isInStock, setIsInStock] = React.useState(item?.isInStock);
  // const [isInStock, setIsInStock] = React.useState(configurableLinks?.[0]?.isInStock);
  // const [productImage, setProductImage] = React.useState(item?.image?.[0]?.file);
  // let defaultVariantIndex = configurableLinks.findIndex((item: any) => item.isInStock)
  // defaultVariantIndex = defaultVariantIndex > -1 ? defaultVariantIndex : 0
  // let selectedVariantData = configurableLinks?.[defaultVariantIndex]

  let selectedVariantData =
    configurableLinks.find((item: any) => item.isInStock) ||
    configurableLinks?.[0];

  let tempp = configurableOptions?.values?.find(
    (item: any) =>
      item?.label?.toLowerCase() === selectedVariantData?.value?.toLowerCase()
  );

  const [selectedVariant, setSelectedVariant] = React.useState(tempp);

  const [totalPrice, setTotalPrice] = React.useState(
    discPrice?.value ?? selectedVariantData?.price
  );
  const [productImage, setProductImage] = React.useState(
    selectedVariantData?.image?.[0]?.file
  );

  const [isInStock, setIsInStock] = React.useState(
    selectedVariantData?.isInStock
  );

  const [product, setProduct]: any = React.useState({
    productId: item.magentoId,
    attributeData: [
      {
        value: selectedVariant?.value_index,
        id: configurableOptions.attribute_id,
      },
    ],
    type: item.type,
    quantity: 1,
    wishlistItemId: section === "wishlist" ? item?.wishlists?._id : "",
  });

  const selectShade = (
    product: any,
    finalPrice: any,
    _price: any,
    discountedPrice: any
  ) => {
    // let selectedProduct = configurableLinks?.find((item: any) => item?.color?.toLowerCase() === product?.label?.toLowerCase() || item?.shade?.toLowerCase() === product?.label?.toLowerCase())
    let selectedProduct = configurableLinks?.find(
      (val: any) => val?.value?.toLowerCase() === product?.label?.toLowerCase()
    );

    let data = {
      productId: item.magentoId,
      attributeData: [
        {
          value: product?.value_index,
          id: configurableOptions.attribute_id,
        },
      ],
      type: item.type,
      quantity: 1,
    };
    setProduct(data);
    setSelectedVariant(product);
    setTotalPrice(finalPrice);
    setIsInStock(selectedProduct?.isInStock);
    setProductImage(selectedProduct?.image?.[0]?.file);
    setDiscountedPrice(discountedPrice);
  };

  useEffect(() => {
    // const val = configurableOptions?.values?.[0] || {}
    // let configProduct = configurableLinks?.find(
    //   (item: any) =>
    //     item?.value?.toLowerCase() === val?.label?.toLowerCase()
    // );
    // let discPrice = configProduct?.customAttributes?.find(
    //   (item: any) => item.attribute_code === "special_price"
    // )?.value;
    // let priceVal = configProduct?.price;
    // let finalPrice = discPrice ?? priceVal;
    // selectShade(val, finalPrice, priceVal, discPrice)
  }, []);

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
                  item.configurableProductOptions?.[0]?.values?.[0]
                    ?.value_index,
              },
            ]
          : [],
      };
      if (section === "wishlist") {
        // dispatch(showLoader());
      }
      addToWishList(data)
        .then((resp) => {
          if (resp) {
            let categoryAttributesIndex = item?.customAttributes.findIndex(
              (i: any) => i.attribute_code === "category_ids"
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

            if (section === "wishlist") {
              dispatch(getWishList({ limit: 10, page: 1 }));
            } else {
              product.isWishlisted = true;
              product.wishlists = {
                _id: resp?.data?.data?._id,
              };

              dispatch({ type: "product.update", payload: product });
              dispatch({ type: "recommend.update", payload: product });
              dispatch({
                type: "show-alert",
                payload: {
                  type: "success",
                  message: "Product added to wishlist",
                },
              });
            }
          } else {
            // dispatch(hideLoader());
            // dispatch(hideSkeleton());
          }
        })
        .catch((err: any) => {
          if (err?.response?.data?.message)
            dispatch({
              type: "show-alert",
              payload: {
                type: "error",
                message: err?.response?.data?.message,
              },
            });
        });
    } else {
      if (section === "wishlist") {
        // dispatch(showLoader());
      }

      removeFromWishList(
        product.wishlists ? product.wishlists?._id : product._id
      )
        .then((resp) => {
          if (resp) {
            let categoryAttributesIndex = product?.customAttributes.findIndex(
              (i: any) => i.attribute_code === "category_ids"
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

            if (section === "wishlist") {
              dispatch({
                type: Utils.ActionName.WISHLIST_UPDATE,
                payload: product?.wishlists?._id,
              });
              // dispatch(hideLoader());
            } else {
              product.isWishlisted = false;

              dispatch({ type: "product.update", payload: product });
              dispatch({ type: "recommend.update", payload: product });

              dispatch({
                type: "show-alert",
                payload: {
                  type: "success",
                  message: "Product removed from wishlist",
                },
              });
            }
          } else {
            // dispatch(hideLoader());
          }
        })
        .catch((err: any) => {
          if (err?.response?.data?.message)
            dispatch({
              type: "show-alert",
              payload: {
                type: "error",
                message: err?.response?.data?.message,
              },
            });
        });
    }
  };

  const onNotify = (data: any) => {
    let attributeData: any = [];
    if (data.type !== "simple") {
      attributeData = [
        {
          value: selectedVariant?.value_index,
          id: configurableOptions.attribute_id,
        },
      ];
    }
    // const email = localStorage.getItem("email");
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
            type: "show-alert",
            payload: {
              type: "success",
              message: resp?.data?.message,
            },
          });
        }
      })
      .catch((_error) => {});
  };

  let pathname = Utils.CommonFunctions.seoUrl({ ...item, plpData }, "pdp");

  const list = () => (
    <div
      className={classes.fullList}
      role="presentation"
      // onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <div className={classes.headerDiv}>
          <Typography
            className={classes.header}
          >
            {`Select ${configurableOptions?.label}`}
            </Typography>
          <div
            className={classes.cursor}
            onClick={(e) => toggleDrawer(false)(e)}
          >
            <img src={Utils.images.CROSS} alt="cross" />
          </div>
        </div>
      </Box>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <div className={classes.headerDiv}>
            {/* <img
              src={BACK_ARROW}
              alt="image"
              className={classes.backArrow}
              onClick={(e) => toggleDrawer(false)(e)}
            /> */}
          <Typography
            className={classes.header}
          >{`Select ${configurableOptions?.label}`}</Typography>
          <div></div>
        </div>
      </Box>
      <Divider />
      <Grid container className={classes.imageContainer}>
        <Grid item xs={5}>
          <div className={classes.imgDiv}>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {item.isWishlisted ? (
                <IconButton
                  aria-label="favorite"
                  className={classes.heartImg}
                  onClick={() => handleLike(false, item)}
                >
                  {/* <FAVORITE_ICON /> */}
                  <img src={Utils.images.FAVORITE_ICON} alt="heart" />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="favorite"
                  className={classes.heartImg}
                  onClick={() => handleLike(true, item)}
                >
                  <img src={Utils.images.HEART} alt="heart" />
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
                <div className={classes.productImageDiv}>
                  <img
                    className={classes.productImage}
                    src={`${IMAGE_URL}${productImage}`}
                    alt="product"
                  />
                </div>
              ) : (
                ""
                // <PRODUCT_PLACEHOLDER />
              )}
            </Link>
          </div>
        </Grid>
        <Grid item xs={7}>
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
            {/* <Typography className={classes.textPrice} color="primary">
              Select colour
            </Typography> */}
            {/* <div className={classes.brandDiv}>
              <div style={{ backgroundColor: selectedVariant.label }}></div>
              <Typography className={classes.brandName} color="primary">
                {selectedVariant.label}
              </Typography>
            </div> */}

            {/* <div className={classes.colorContainer}>
              {configurableOptions?.values.map((val: any, i: any) => (
                <React.Fragment key={i}>
                  <CustomRadio style={{ backgroundColor: val.label }} checked={selectedVariant.value_index === val.value_index} value={val.value_index} name="shade" onChange={() => selectShade(val)} />
                </React.Fragment>
              ))}
            </div> */}
          </div>
        </Grid>
      </Grid>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Divider />
      </Box>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Typography className={classes.ColourHeading}>Colour</Typography>
      </Box>
      <Grid container className={classes.productContainer}>
        {configurableOptions?.values.map((val: any, i: any) => {
          let shadeColor = Utils.CommonFunctions.getColor(val);
          let configProduct = configurableLinks?.find(
            (item: any) =>
              item?.value?.toLowerCase() === val?.label?.toLowerCase()
          );
          let discPrice = configProduct?.customAttributes?.find(
            (item: any) => item.attribute_code === "special_price"
          )?.value;
          let priceVal = configProduct?.price;
          let finalPrice = discPrice ?? priceVal;
          return (
            <Grid item xs={4} key={i} className={classes.variantContainer}>
            

              <div className={classes.colorContainer}>
                {/* <StyledCheckbox style={{ backgroundColor: shadeColor, borderRadius: '50%', marginBottom: '3px' }} checked={val?.value_index === selectedVariant?.value_index} value={val?.value_index} name="shade" onClick={() => selectShade(val, finalPrice)} /> */}
                <CustomRadio
                  style={{ backgroundColor: shadeColor }}
                  isInStock={configProduct?.isInStock}
                  checked={selectedVariant?.value_index === val?.value_index}
                  value={val?.value_index}
                  name="shade"
                  onChange={() =>
                    selectShade(val, finalPrice, priceVal, discPrice)
                  }
                />
              </div>
              <Typography className={classes.name} color="primary">
                {val?.label}
              </Typography>
              {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <div>
                  {discPrice ? (
                    <>
                      <Typography className={classes.fontLabel}>
                        ₹{Utils.CommonFunctions.decimalFlat(discPrice, 0)}
                      </Typography>
                      {
                        <Typography className={classes.mrp}>
                          ₹{Utils.CommonFunctions.decimalFlat(priceVal, 0)}
                        </Typography>
                      }
                    </>
                  ) : (
                    <>
                      <Typography className={classes.fontLabel}>
                        ₹{Utils.CommonFunctions.decimalFlat(priceVal, 0)}
                      </Typography>
                    </>
                  )}
                </div>
              </Box > */}
              {!configProduct?.isInStock ? (
                <Typography className={classes.outOfStock} color="error">
                  Out of Stock
                </Typography>
              ) : null}
              {/* <div style={{ backgroundColor: selectedVariant.label }}></div> */}
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <div className={classes.btnContainer}>
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
              {"Notify Me"}
            </Button>
          )}
        </div>
      </Box>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <div className={classes.btnContainer}>
          <div className={classes.btnDiv}>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <div className={classes.grandTotalDiv2}>
                <div className={classes.priceDiv}>
                  {discountedPrice && isInStock ? (
                    <>
                      <Typography className={classes.discView}>
                        ₹
                        {Utils.CommonFunctions.decimalFlat(
                          Number(discountedPrice),
                          0
                        )}
                      </Typography>
                      {
                        <Typography className={classes.mrp}>
                          ₹{Utils.CommonFunctions.decimalFlat(totalPrice, 0)}
                        </Typography>
                      }
                    </>
                  ) : !isInStock ? (
                    <Typography className={classes.grandHeading}>
                      {selectedVariant?.label || ""}
                    </Typography>
                  ) : (
                    <>
                      <Typography className={classes.view}>
                        ₹{Utils.CommonFunctions.decimalFlat(totalPrice, 0)}
                      </Typography>
                    </>
                  )}
                </div>
                {!isInStock ? (
                  <Typography
                    className={classes.outOfStockFooter}
                    color="error"
                  >
                    Out of Stock
                  </Typography>
                ) : (
                  <Typography className={classes.grandHeading}>
                    {selectedVariant?.label || ""}
                  </Typography>
                )}
              </div>
            </Box>

            <Box sx={{ display: { xs: "block", sm: "none" } }}>
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
                  Add to Bag
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="outlined"
                  className={classes.btn}
                  onClick={() => onNotify(item)}
                >
                  {"Notify Me"}
                </Button>
              )}
            </Box>
          </div>
        </div>
      </Box>

      {/* <div className={classes.btnDiv}>
        <Button variant="contained" color="primary" className={classes.btn}>
          Add to Bag: ₹6.50
        </Button>
      </div> */}
    </div>
  );
  return (
    <div>
      <React.Fragment>
        {visible && (
          <Drawer
            anchor={"right"}
            open={visible}
            onClose={(e) => toggleDrawer(false)(e)}
          >
            {list()}
          </Drawer>
        )}
      </React.Fragment>
    </div>
  );
}
