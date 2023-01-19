import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Drawer,
  Button,
  List,
  Grid,
  Divider,
  ListItem,
  Theme,
  Typography,
  IconButton,
} from '@mui/material';
// import Utils from "../../../utils";
import { useDispatch, useSelector } from 'react-redux';
// import { customGa4Event } from "../../../utils/gtag";
import { deleteProduct } from '../addToCart/action';
// import { ReducersModal } from "../../../models";
// import { Link, useNavigate } from "react-router-dom";
import _ from 'lodash';
// import DeleteProduct from "./DeleteProduct";
// import {
//   onCountChange,
//   updateCartSummary,
// } from "../../../pages/shoppingBags/action";
// import { isAuthenticated } from "../../utils/session";
// import { deleteFromBag } from "../../utils/event/action";
// import RemoveIcon from "@material-ui/icons/Remove";
import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from "@material-ui/icons/Add";
import MessageDialog from '../messageDialog';
import AddIcon from '@mui/icons-material/Add';
// import { getWishList } from "../../../pages/wishlist/action";
// import MessageDialogue from "../product/messageDialogue";
// import { showLoader } from "../../../pages/home/actions";
// import { customGa4Event } from "../../../utils/gtag";
import { Box } from '@mui/material';
import Utils from '../../utils';
import { getWishList } from '../wishlist/action';
import { isAuthenticated } from '../../utils/session';
import { useRouter } from 'next/router';
import { deleteFromBag } from '../../utils/event/action';
import { customGa4Event } from '../../utils/gtag';
import Link from 'next/link';
import DeleteProduct from './DeleteProduct';
import MessageDialogue from '../product/messageDialogue';
import Image from 'next/image';
import { onCountChange } from '../../components/screens/shoppingBags/action';
// import { CROSS, DELETEBTN, HAND, LYBC_5,  OFFER_IMAGE, PRODUCT_PLACEHOLDER } from "utils/constantImages";
// import { onCountChange } from "pages/shoppingBags/action";
// import { customGa4Event } from "utils/gtag";

declare global {
  interface Window {
    gtag?: any;
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  fullList: {
    // maxWidth: "440px",
    width: '440px',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '320px',
      height: '100%',
    },
  },
  imageContainer: {
    // padding: theme.spacing(2),
    justifyContent: 'space-between',
  },
  headerDiv: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1.2),
      // height:"8%"
    },
  },
  header: {
    font: `normal ${theme.spacing(2.4)} Recoleta`,
    color: theme.palette.primary.main,
    fontWeight: 600,
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px',
    },
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
  mrp: {
    // margin: theme.spacing(0, 1),
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.5
    )} Work Sans`,
    color: 'var(--light-gray)',
    textDecorationLine: 'line-through',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },
  textDiv: {
    display: 'flex',
    flexDirection: 'column',
    // padding: theme.spacing(0, 1),
    // width: "100%"
  },
  textBrand: {
    font: `normal ${theme.spacing(1.6)} Work Sans`,
    fontWeight: 600,
    color: 'var(--secondary-black)',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
      marginRight: theme.spacing(0.7),
    },
  },
  textQty: {
    font: `normal ${theme.spacing(1.4)} Work Sans`,
    // color: "#044236",
    marginBottom: theme.spacing(0.5),
    textTransform: 'capitalize',
    [theme.breakpoints.down('xs')]: {
      fontSize: '13px',
    },
  },
  textPrice: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Work Sans`,
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },
  button: {
    font: `normal ${theme.spacing(1.4)} Work Sans`,
    fontWeight: 500,
    color: ' #F44336',
    '&:hover': {
      background: 'transparent',
    },
  },
  btnDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // padding: theme.spacing(0, 0, 0, 5),
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
    },
  },
  incBtn: {
    background: theme.palette.primary.main,
    color: 'var(--white)',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    padding: theme.spacing(0.8),
    margin: theme.spacing(1.2, 1),
    '&:hover': {
      background: theme.palette.primary.main,
    },
    [theme.breakpoints.down('xs')]: {
      background: 'var(--main-opacity)',
      margin: theme.spacing(1, 1, 1, 0),
    },
  },
  decBtn: {
    background: theme.palette.primary.main,
    color: 'var(--white)',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    padding: theme.spacing(0.8),
    margin: theme.spacing(1.2, 1),
    '&:hover': {
      background: theme.palette.primary.main,
    },
    [theme.breakpoints.down('xs')]: {
      background: 'var(--main-opacity)',
      margin: theme.spacing(1, 0, 1, 1),
    },
  },

  textNo: {
    display: 'flex',
    alignItems: 'center',
  },
  miniBoxGrantTotal: {
    // [theme.breakpoints.down("xs")]: {
    height: '220px',
    position: 'fixed',
    bottom: '0px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    background: 'white',
    [theme.breakpoints.down('xs')]: {
      height: '195px',
    },
  },
  miniBox: {
    background: 'var(--light-green)',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.2),
    // margin: theme.spacing(3, 0),
    // position: "fixed",
    // bottom: "180px",
    width: '37%',

    [theme.breakpoints.down('xs')]: {
      // bottom: "117px",
      margin: theme.spacing(0),
      width: '100%',
    },
  },
  shopText: {
    marginLeft: '10px',
    fontSize: 14,
  },
  btn: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 1.3),
    },
  },
  bgbtn: {
    borderRadius: '4px',
    width: theme.spacing(19),
    height: theme.spacing(5.8),
    [theme.breakpoints.down('xs')]: {
      width: '140px',
      height: theme.spacing(4),
      textTransform: 'capitalize',
      '&.MuiButton-outlinedPrimary': {
        color: 'var(--main-opacity)',
        border: '1px solid var(--main-opacity)',
      },
    },
  },
  crossBtn: {
    cursor: 'pointer',
  },
  offerBanner: {
    background: 'var(--main-opacity)',
    color: 'var(--white)',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.2),
    margin: theme.spacing(2, 0),
    '& .MuiTypography-body1': {
      fontSize: 16,
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        fontSize: '12px',
      },
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, 0, 2, 0),
      // height:"8%"
    },
  },
  grandTotalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    [theme.breakpoints.down('xs')]: {
      padding: '10px 15px',
    },
  },
  rewardPointContainer: {
    padding: '0px 0px 30px 21px',
    font: `normal 500 ${theme.spacing(1.3)} Work Sans`,
    [theme.breakpoints.down('xs')]: {
      padding: '0px 0px 20px 15px',
    },
  },
  points: {
    color: '#3D857E',
  },
  productOutOfStock: {
    font: `normal 600 ${theme.spacing(1.4)} Work Sans`,
    color: 'var(--delet-color)',
    margin: '6px 0px 0px 0px',
    lineHeight: 1.5,
  },
  productOutOfStockDescription: {
    font: `normal 600 ${theme.spacing(1.4)} Work Sans`,
    color: 'var(--light-gray)',
    margin: '0px 0px 4px 0px',
    lineHeight: 1.5,
  },
  deleteButton: {
    cursor: 'pointer',
    marginLeft: '5px',
    width: '25px',
    height: '25px',
    [theme.breakpoints.down('xs')]: {
      width: '22px',
      height: '22px',
    },
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
      },
      '& .MuiTypography-body1': {
        font: `normal 400  12px Work Sans`,
        color: 'var(--white)',
      },
    },
  },
  logo: {
    '& svg': {
      height: '40px',
      width: '40px',
    },
  },
  mobileDivRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  grandTotalOuterContainer: {
    // position: "fixed",
    // bottom: 0,
    height: '147px',
    width: '440px',
    background: 'white',
    // paddingBottom: "70px",
    [theme.breakpoints.down('xs')]: {
      maxWidth: '320px',
      paddingBottom: '10px',
      height: '147px',
    },
  },
  messageHeading: {
    font: `normal 700 ${theme.spacing(2.0)} Work Sans`,
    color: 'var(--black300)',
    lineHeight: '28px',
    marginBottom: '9px',

    // margin: theme.spacing(0.8, 0),
  },
  listOuterDiv: {
    '&.MuiList-padding': {
      height: '54%',
      overflowY: 'scroll',
      marginBlockEnd: theme.spacing(24.5),

      [theme.breakpoints.down('xs')]: {
        marginBlockEnd: theme.spacing(13),
        overflowY: 'scroll',
        // maxHeight: "80%",
        height: '45%',
      },

      [theme.breakpoints.up(390)]: {
        height: '54%',
      },
      ['@media only screen and (min-height: 600px) and (max-height: 615px) and (width: 1280px)']:
        {
          height: '30%',
          overflowY: 'scroll',
        },
      // [theme.breakpoints.up('lg')]: {
      //   // 1848*980
      //   marginBlockEnd: theme.spacing(13),
      //   overflowY: "scroll",
      //   // maxHeight: "80%",
      //   background:"blue"
      // },

      // [theme.breakpoints.up(1849)]: {
      //   // 1848*980
      //   marginBlockEnd: theme.spacing(13),
      //   overflowY: "scroll",
      //   // maxHeight: "80%",
      //   height: "54%"
      // },
    },
  },
  autoDiscount: {
    font: `normal 600 ${theme.spacing(1.4)} Work Sans`,
    color: '#32B97C',
    margin: '6px 0px 0px 0px',
    lineHeight: 1.5,
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  drawer: {
    // '&.MuiDrawer-root': {
    '& .MuiPaper-root': {
      overflowY: 'hidden !important',
    },
    // }
  },
}));
interface Props {
  visible: boolean;
  toggleDrawer: Function;
  section?: string;
}

const ShoppingBagModal = (props: Props) => {
  const IMAGE_URL = Utils.constants.productImage;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [product, setProduct] = React.useState();
  const [itemNotInStock, setItemNotInStock] = React.useState();
  const [buttonDisable, setButtonDisable] = useState(false);

  const history = useRouter();
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const data: any = useSelector((state: any) => state.shoppingBagReducer);
  const userData: any = useSelector(
    (state: any) => state.userDetailReducer?.userInfo
  );

  const userInfo = useSelector(
    (state: any) => state.userDetailReducer?.userInfo
  );

  const configs = useSelector(
    (state: any) => state.configReducer.generalConfigs
  );

  // let configs = configReducer?.generalConfigs
  const shoppingBagList: any = data?.items || [];
  const { toggleDrawer, visible, section } = props;

  const [showModal, setShowModal] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [loginAlert, showLoginAlert] = useState(false);

  useEffect(() => {
    var timer: any;
    const itemIsNotInStock = data?.items?.some((item: any) => !item?.isInStock);
    setItemNotInStock(itemIsNotInStock);
    if (showModal) {
      timer = setTimeout(() => {
        toggleDrawer(false)('');
        if (section === 'wishlist') {
          dispatch(getWishList({ limit: 10, page: 1 }));
        }
        clearTimeout(timer);
      }, 6000);
    } else {
      if (timer) clearTimeout(timer);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showModal]);

  const handleCartSummary = () => {
    if (isAuthenticated()) {
      if (data.grandTotal < Number(configs?.min_order_value)) {
        setAlertText(
          `Minimum Order value should be Rs. ${configs?.min_order_value}`
        );
        setShowAlert(true);
      } else if (data.grandTotal > Number(configs?.max_order_value)) {
        setAlertText(
          `Maximum order value should be Rs. ${configs?.max_order_value}`
        );
        setShowAlert(true);
      } else {
        history.push({
          pathname: '/shopping-bag/address',
        });
      }
    } else showLoginAlert(true);
  };

  const deleteItem = (item: any, e?: any) => {
    // dispatch(showLoader());
    dispatch(
      deleteProduct(item.cartItemId, (resp: any) => {
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
        deleteFromBag({
          ProductId: `${item.magentoId}`,
          ProductName: `${item.name}`,
          ProductPrice: `${item.price}`,
          Category: JSON.stringify(categoryArray),
          FromScreen: `mini cart`,
          ProductSKU: `${item.sku}`,
        });
        if (typeof window && window.gtag !== 'undefined') {
          const gtagPayload = {
            currency: 'INR',
            items: [
              {
                id: `${item.sku}`,
                name: `${item.name}`,
                brand: 'The Body Shop',
                item_id: `${item.sku}`,
                item_name: `${item.name}`,
                item_brand: 'The Body Shop',
                quantity: `${item.quantity}`,
                price: `${item.price}`,
                category: `${item.category?.name}`,
              },
            ],
          };
          customGa4Event('remove_from_cart', gtagPayload);
          if (
            process.env.REACT_APP_ENV !== 'development' &&
            process.env.REACT_APP_ENV !== 'staging'
          ) {
            window.gtag('event', 'remove_from_cart', gtagPayload);
          }
        }

        if (!resp?.data?.data?.items?.length) {
          toggleDrawer(false)(e);
          if (section === 'wishlist') {
            dispatch(getWishList({ limit: 10, page: 1 }));
          }
        }
        setConfirmDelete(!confirmDelete);
      })
    );
  };

  const redirect = () => {
    const type = userInfo?.tierType === 2 ? 1 : 2;

    // history.push({pathname:`${Utils.routes.UPGRADE_MEMBERSHIP}`,
    //   state: { type, pageName: "My Dashboard" },
    // });
  };

  const getCurrentTierPoints = () => {
    const tierInfo =
      data?.rewardData && Array.isArray(data.rewardData)
        ? data?.rewardData?.find(
            (item: any) => item.tier === userData?.tierType
          )
        : {};
    const point = tierInfo && tierInfo?.points ? tierInfo.points : 0;
    return point;
  };

  const close = (e: any) => {
    toggleDrawer(false)(e);
    if (section === 'wishlist') {
      dispatch(getWishList({ limit: 10, page: 1 }));
    }
  };

  const list = () => (
    <div
      className={classes.fullList}
      role="presentation"
      onMouseOver={() => {
        setShowModal(false);
      }}
    >
      {
        // (userInfo?.tierType ===3||userInfo?.tierType === 2)
        userInfo?.tierType !== 1 && userInfo?.tierType !== 2 && (
          <div
            className={classes.sideBarLogo}
            onClick={(e: any) => {
              toggleDrawer(false)(e);
              if (section === 'wishlist') {
                dispatch(getWishList({ limit: 10, page: 1 }));
              }
              redirect();
            }}
          >
            <div className={classes.logo}>
              <Image
                src={Utils.images.LYBC_FIVE}
                alt="cross"
                width={40}
                height={40}
              />

              {/* <img src={LYBC_5} alt="logo" style={{width: "40px", height: "40px"}} /> */}
            </div>
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
      <div className={classes.headerDiv}>
        <Typography className={classes.header}>Shopping Bag</Typography>
        <div className={classes.crossBtn} onClick={(e: any) => close(e)}>
          {/* <img src={CROSS} alt="cross" /> */}
          <Image src={Utils.images.CROSS} alt="cross" width={15} height={15} />
        </div>
      </div>
      <Divider />

      {configs?.promotional_banner ? (
        <div className={classes.offerBanner}>
          {/* <OFFER_IMAGE /> */}
          <Image
            src={Utils.images.OFFER_IMAGE}
            alt="cross"
            width={25}
            height={25}
          />

          <Typography>{configs?.promotional_banner || ''}</Typography>
        </div>
      ) : null}
      <List className={classes.listOuterDiv}>
        {shoppingBagList.length
          ? shoppingBagList.map((item: any, _i: any) => {
              let selectedVariant =
                _.find(item.customAttributes, {
                  attribute_code: 'size',
                })?.label?.[0]?.label || [];
              // let selectedVariant = [];
              // if (item.type === "simple") {
              //   selectedVariant = _.find(item.customAttributes, {
              //     attribute_code: "size",
              //   })?.label?.[0]?.label || []

              // } else {
              //   selectedVariant = item?.customAttributes?.[0]?.label?.[0]?.label
              // }

              // const weight = _.find(item?.customAttributes, {
              //   attribute_code: "size",
              // })?.label || []
              // const selectedVariant = item?.customAttributes?.[0]?.label?.[0]?.label
              let colorVariantExists =
                item.type === 'configurable'
                  ? item?.configurableProductOptions?.some(
                      (option: any) => option.attribute_key === 'color'
                    )
                  : false;
              let colorVariantLabel = colorVariantExists
                ? item?.customAttributes?.find(
                    (option: any) => option?.attribute_code === 'color'
                  )?.label?.[0]?.label
                : '';

              let discPrice = item?.customAttributes?.find(
                (value: any) => value?.attribute_code === 'special_price'
              );

              let pathname = Utils.CommonFunctions.seoUrl(item, 'pdp');

              return (
                <div key={item.cartItemId}>
                  <ListItem>
                    <Grid container className={classes.imageContainer}>
                      <Grid item xs={3}>
                        <div className={classes.imgDiv}>
                          <Link
                            // to={Utils.CommonFunctions.replaceUrlParams(
                            //   Utils.routes.PRODUCT_DETAIL,
                            //   { ":id": item?.productId }
                            // )}
                            href={pathname}
                          >
                            {item?.image?.[0]?.file ? (
                              <img
                                src={`${IMAGE_URL}${item?.image?.[0].file}`}
                                alt="product"
                              />
                            ) : (
                              ''
                              // <PRODUCT_PLACEHOLDER />
                            )}
                          </Link>
                        </div>
                      </Grid>

                      <Grid item xs={8}>
                        <div className={classes.textDiv}>
                          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Typography className={classes.textBrand}>
                              {item.name}{' '}
                              {colorVariantLabel
                                ? `- ${colorVariantLabel}`
                                : ''}
                            </Typography>
                          </Box>
                          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <div className={classes.mobileDivRoot}>
                              <Typography className={classes.textBrand}>
                                {item.name}{' '}
                                {colorVariantLabel
                                  ? `- ${colorVariantLabel}`
                                  : ''}
                              </Typography>

                              <div
                                onClick={() => {
                                  setConfirmDelete(true);
                                  setProduct(item);
                                  // delesteItem(item)
                                }}
                                className={classes.deleteButton}
                              >
                                {/* <DELETEBTN /> */}
                              </div>
                            </div>
                          </Box>

                          {item?.isInStock ? (
                            ''
                          ) : (
                            <Typography className={classes.productOutOfStock}>
                              Product is Out Of Stock
                            </Typography>
                          )}
                          {item?.isInStock ? (
                            <Typography
                              className={classes.textQty}
                              color="primary"
                            >
                              {/* {weight && weight[0] ? weight[0]?.label : ''} */}
                              {selectedVariant}
                            </Typography>
                          ) : (
                            <Typography
                              className={classes.productOutOfStockDescription}
                            >
                              Please delete this product and proceed to
                              checkout.
                            </Typography>
                          )}
                          {item.visibility !== 1 && item?.isInStock ? (
                            discPrice?.value ? (
                              <Typography>
                                <span className={classes.mrp}>
                                  {' '}
                                  ₹{' '}
                                  {Utils.CommonFunctions.decimalFlat(
                                    item?.productUnitPrice,
                                    0
                                  )}
                                </span>
                                <span className={classes.textPrice}>
                                  {'  '}₹
                                  {Utils.CommonFunctions.decimalFlat(
                                    discPrice?.value
                                  )}
                                </span>
                              </Typography>
                            ) : (
                              item.price !== 0 && (
                                <Typography
                                  className={classes.textPrice}
                                  color="primary"
                                >
                                  ₹{' '}
                                  {Utils.CommonFunctions.decimalFlat(
                                    item.price
                                  )}
                                </Typography>
                              )
                            )
                          ) : null}
                          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {item.visibility !== 1 &&
                              item?.isInStock &&
                              item?.autoDiscount !== 0 && (
                                <Typography className={classes.autoDiscount}>
                                  Discount : ₹
                                  {Utils.CommonFunctions.addCommaToAmount(
                                    item?.autoDiscount
                                  )}
                                </Typography>
                              )}
                          </Box>

                          {/* {item.visibility !== 1 && item?.isInStock ? (
                          <Typography
                            className={classes.textPrice}
                            color="primary"
                          >
                            ₹
                            {Utils.CommonFunctions.decimalFlat(
                              discPrice?.value ?? item.price
                            )}
                          </Typography>
                        ) : null} */}
                          <div className={classes.btnDiv}>
                            {/* <IconButton
                            className={classes.button}
                            onClick={(e) => {
                              setConfirmDelete(true)
                              setProduct(item)
                              //  deleteItem(item, e)
                            }
                            }

                          >
                            <img
                              src={Utils.images.DELETEBTN}
                              alt="delete"
                            />
                            Delete
                          </IconButton> */}

                            {/* {item.type !== 'sample' ? */}

                            {/* {item.visibility !== 1 && item?.isInStock ? ( */}
                            {item.visibility !== 1 &&
                            item?.type !== 'virtual' &&
                            item?.type !== 'sample' &&
                            item?.isInStock ? (
                              <>
                                <IconButton
                                  size="small"
                                  className={classes.incBtn}
                                  onClick={() => {
                                    setButtonDisable(true);
                                    dispatch(
                                      onCountChange(
                                        item.quantity - 1,
                                        item,
                                        null,
                                        () => {
                                          setButtonDisable(false);
                                        }
                                      )
                                    );
                                  }}
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography className={classes.textNo}>
                                  {item.quantity}
                                </Typography>
                                <IconButton
                                  size="small"
                                  className={classes.decBtn}
                                  onClick={() => {
                                    if (item.quantity == 10) {
                                      setAlertText(
                                        'Maximum you can purchase is 10'
                                      );
                                      setShowAlert(true);
                                    } else {
                                      setButtonDisable(true);
                                      dispatch(
                                        onCountChange(
                                          item.quantity + 1,
                                          item,
                                          null,
                                          () => {
                                            setButtonDisable(false);
                                          }
                                        )
                                      );
                                    }
                                  }}
                                >
                                  {/* <Image src={Utils.images.INCREASING_ICON} alt="cross" width={25} height={25} /> */}

                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </>
                            ) : null}

                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                              <div
                                onClick={() => {
                                  setConfirmDelete(true);
                                  setProduct(item);
                                  // delesteItem(item)
                                }}
                                className={classes.deleteButton}
                              >
                                <Image
                                  src={Utils.images.DELETE_BTN}
                                  alt="cross"
                                  width={25}
                                  height={25}
                                />

                                {/* <DELETEBTN /> */}
                              </div>
                            </Box>
                          </div>
                          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            {item?.isInStock && item?.autoDiscount !== 0 && (
                              <Typography className={classes.autoDiscount}>
                                Discount : ₹
                                {Utils.CommonFunctions.addCommaToAmount(
                                  item?.autoDiscount
                                )}
                              </Typography>
                            )}
                          </Box>
                        </div>
                      </Grid>
                    </Grid>
                  </ListItem>

                  <Divider />
                  <MessageDialog
                    open={showAlert}
                    handleClose={() => setShowAlert(false)}
                    onOk={() => {
                      setShowAlert(false);
                    }}
                    okText="Ok"
                    message={alertText}
                    cancelText={''}
                  />
                </div>
              );
            })
          : null}
      </List>
      <div className={classes.miniBoxGrantTotal}>
        {configs?.free_shipping_amount > data?.cartTotal &&
          userData?.tierType !== 2 &&
          userData?.tierType !== 1 && (
            <div className={classes.miniBox}>
              {/* <img src={HAND} alt="arrow" /> */}
              <Image src={Utils.images.HAND} alt="cross" width={8} height={8} />

              <Typography className={classes.shopText}>
                Shop for ₹
                {Utils.CommonFunctions.addCommaToAmount(
                  configs?.free_shipping_amount - data?.cartTotal
                )}{' '}
                more for free delivery
              </Typography>
            </div>
          )}
        <div className={classes.grandTotalOuterContainer}>
          <div className={classes.grandTotalContainer}>
            <Typography className={classes.textPrice}>Grand Total</Typography>

            <Typography className={classes.textPrice}>
              ₹{data?.grandTotal || 0}
            </Typography>
          </div>

          {isAuthenticated() ? (
            <Typography className={classes.rewardPointContainer}>
              {`You will receive `}
              <span className={classes.points}>
                {getCurrentTierPoints()} reward
              </span>
              {` points after
        the delivery.`}
            </Typography>
          ) : (
            ''
          )}

          <div className={classes.btn}>
            <Link href={Utils.routes.SHOPPING_BAG}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.bgbtn}
              >
                View Bag
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              disabled={itemNotInStock || !data?.grandTotal || buttonDisable}
              className={classes.bgbtn}
              onClick={handleCartSummary}
            >
              Checkout
            </Button>
          </div>
          <DeleteProduct
            deleteItem={() => deleteItem(product)}
            handleClose={() => setConfirmDelete(!confirmDelete)}
            open={confirmDelete}
          />
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <React.Fragment>
        {/* <MessageDialogue
          cancelText={"Cancel"}
          okText={"Okay"}
          open={loginAlert}
          handleClose={() => showLoginAlert(!loginAlert)}
          // onOk={() => {
          //   history(
          //     `${Utils.routes.LOGIN_OTP}?redirectTo=${Utils.routes.SHOPPING_BAG}`
          //   );
          // }}
          message={"Please login to proceed"}
          heading={"The Body Shop"}
          headingClass={classes.messageHeading}
        /> */}

        <Drawer
          className={classes.drawer}
          onClick={() => {
            setShowModal(false);
          }}
          ModalProps={{
            BackdropProps: {
              onMouseLeave: () => {
                setShowModal(false);
              },
            },
          }}
          anchor={'right'}
          open={visible}
          onClose={(e: any) => {
            toggleDrawer(false)(e);
            if (section === 'wishlist') {
              dispatch(getWishList({ limit: 10, page: 1 }));
            }
          }}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
export default ShoppingBagModal;
