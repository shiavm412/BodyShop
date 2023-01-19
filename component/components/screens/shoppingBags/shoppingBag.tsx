/* eslint-disable @next/next/no-img-element */
import { IconButton, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Utils from '../../../utils';
import React, { useEffect, useState } from 'react';
import {
  addToWishlist as eventAddToWishlist,
  removeFromWishlist as eventRemoveFromWishlist,
} from '../../../utils/event/action';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BankOffer from './bankOffer';
// import Utils from "../../utils";
import { useDispatch, useSelector } from 'react-redux';
// import { ReducersModal } from "../../models";
// import { deleteProduct } from "../../components/common/addToCart/action";
// import { hideLoader, showLoader } from "../home/actions";
// import { useNavigate } from "react-router-dom";
import _ from 'lodash';
// import { addToWishList } from "../../components/common/product/action";
// import { getShoppingBagList } from "../../components/common/addToCart/action";
// import DeleteProduct from "../../components/common/miniCart/DeleteProduct";
import GiftWrap from './giftWrap';
import { onCountChange } from './action';
// import ShoppingBagSkeleton from "../../components/common/skeletonList/shoppingBagSkeleton";
// import {
//   addToWishlist as eventAddToWishlist,
//   deleteFromBag,
// } from "../../utils/event/action";
import clsx from 'clsx';
// import MessageDialog from "../../components/common/messageDialog";
// import { getWishList } from "../wishlist/action";
// import { customGa4Event } from "../../utils/gtag";
import { Box } from '@mui/material';
import DeleteProduct from '../../../common/miniCart/DeleteProduct';
import MessageDialog from '../../../common/messageDialog';
import { useRouter } from 'next/router';
import {
  deleteProduct,
  getShoppingBagList,
} from '../../../common/addToCart/action';
import { deleteFromBag } from '../../../utils/event/action';
import { customGa4Event } from '../../../utils/gtag';
import { addToWishList } from '../../../common/product/action';
import { getWishList } from '../../../common/wishlist/action';
import Image from 'next/image';
// import { DELETEBTN, PRICE, PRODUCT_PLACEHOLDER_2 } from "utils/constantImages";
// import { customGa4Event } from "utils/gtag";

const useStyles = makeStyles((theme: Theme) => ({
  headingDiv: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
  },
  heading: {
    font: `normal ${theme.spacing(1.8)} Recoleta Alt Bold`,
    color: 'var(--secondary-black)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.6)} Recoleta Alt Bold`,
      letterSpacing: '0.03em',
    },
  },
  subHeading: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )} Work Sans`,
    color: 'var(--light-gray)',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.6)} Recoleta Alt Bold`,
      color: 'var(--secondary-black)',
    },
  },
  productDiv: {},
  product: {
    display: 'flex',
    padding: theme.spacing(1.5, 0),
    borderBottom: '1px solid var(--text-color)',
    alignItems: 'stretch',
    // flexWrap: "wrap",
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      // flexWrap: "wrap",
    },
  },
  leftDiv: {
    display: 'flex',
    alignItems: 'stretch',
  },
  mobileSecondDiv: {
    flexBasis: '70%',
  },
  imgDiv: {
    // backgroundColor: "var(--light-creame-color)",
    borderRadius: 4,
    width: '80px',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(1),
    },
  },
  img: {},
  detailsDiv: {
    marginLeft: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(0),
    },
  },
  productName: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.5
    )} Work Sans`,
    color: 'var(--secondary-black)',
    lineHeight: 1.5,
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.5)} Work Sans Bold`,
    },
    // marginBlockEnd: theme.spacing(5),
  },
  productWeight: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.5
    )} Work Sans`,
    color: 'var(--light-gray)',
    marginTop: '6px',
    textTransform: 'capitalize',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.5)} Work Sans Medium`,
    },
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
  rightDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down(769)]: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      marginTop: theme.spacing(1),
    },
  },
  rightDiv2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down(769)]: {
      flexDirection: 'inherit',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      marginTop: theme.spacing(1),
    },
  },
  deleteDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },
  deleteBtn: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )} Work Sans`,
    textTransform: 'capitalize',
    color: 'var(--delet-color)',
    letterSpacing: 0.5,
  },
  addRemDiv: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(1.5),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(1),
    },
  },
  iconBtn: {
    // backgroundColor: theme.palette.primary.main,
    // "&:hover": {
    //   backgroundColor: theme.palette.primary.main,
    // },
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
    '& .MuiSvgIcon-fontSizeSmall': {
      fontSize: '1rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '24px',
      height: '24px',
      background: 'var(--main-opacity)',
      '&:hover': {
        background: 'var(--main-opacity)',
      },
    },
  },
  amount: {
    textAlign: 'right',
  },
  quantity: {
    // margin: theme.spacing(0, 1),
  },
  flexDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBlockEnd: theme.spacing(1),
  },
  outerDiv: {
    alignItems: 'center',
  },
  prodImage: {
    // width: "80px",
    // height: "80px",
    // borderRadius: "12px",
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    aspectRatio: '2/3',
    borderRadius: '5px',
    [theme.breakpoints.down('xs')]: {
      height: '90px',
      width: 'auto',
      borderRadius: '8px',
    },
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
    aspectRatio: '2/3',
    borderRadius: '5px',
    [theme.breakpoints.down('xs')]: {
      height: '90px',
      width: 'auto',
      borderRadius: '8px',
    },
  },
  productWishlist: {
    font: `normal ${theme.spacing(1.4)} Work Sans`,
    lineHeight: '16px',
    fontWeight: 600,
    color: 'var(--green-color)',
    marginTop: '6px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans SemiBold`,
    },
  },

  discount: {
    // background: `url(${PRICE})  no-repeat`,
    padding: theme.spacing(0.5, 1.2),
    font: `normal ${theme.spacing(1.2)} Work Sans`,
    lineHeight: '14px',
    fontWeight: 600,
    color: 'var(--green-color)',
    textTransform: 'uppercase',
  },
  discountPrice: {
    font: `normal ${theme.spacing(1.5)} Work Sans`,
    lineHeight: '24px',
    fontWeight: 500,
    padding: theme.spacing(0, 1),
    color: 'var(--light-gray)',
    textTransform: 'uppercase',
    textDecorationLine: 'line-through',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      marginRight: theme.spacing(0.7),
    },
  },
  skeleton: {
    margin: theme.spacing(1),
  },
  skeletonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  skeletonContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftSkeletonContent: {
    display: 'flex',
    width: '10%',
    height: '120px',
  },
  rightSkeletonContainer: {
    width: '90%',
  },
  deleteButton: {
    cursor: 'pointer',
    marginLeft: '5px',
    width: '25px',
    height: '25px',
    color: 'red',
  },
  cursor: {
    cursor: 'pointer',
  },
  autoDiscount: {
    font: `normal 600 ${theme.spacing(1.4)} Work Sans`,
    color: '#32B97C',
    margin: '6px 0px 0px 0px',
    lineHeight: 1.5,
  },
  imgPlaceholderDiv: {
    objectFIt: 'fill',
  },
  priceDiv: {
    display: 'flex',
    placeItems: 'center',
  },
}));
declare global {
  interface Window {
    gtag?: any;
  }
}

const ShoppingBag: React.FC<any> = (props: any) => {
  const IMAGE_URL = Utils.constants.productImage;
  const { handleCartSummary } = props;
  const configs = useSelector(
    (state: any) => state.configReducer.generalConfigs
  );
  const items: any = useSelector(
    (state: any) => state.shoppingBagReducer?.items
  );
  // const totalCount = useSelector(
  //   (state: ReducersModal) => state.wishlistReducer.totalCount
  // );

  const shoppingBagList: any = items || [];
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [showAlert, setShowAlert] = useState(false);
  //@ts-ignore
  const [alertText, setAlertText] = useState('');

  const [product, setProduct] = React.useState();
  const history = useRouter();
  const deleteItem = (item: any) => {
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
          FromScreen: `my bag`,
          ProductSKU: `${item.sku}`,
        });

        if (typeof window && window.gtag !== 'undefined') {
          const gtagPayload = {
            currency: 'INR',
            items: [
              {
                id: `${item.sku}`,
                item_id: `${item.sku}`,
                name: `${item.name}`,
                item_name: `${item.name}`,
                brand: 'The Body Shop',
                item_brand: 'The Body Shop',
                quantity: `${item.quantity}`,
                price: `${item.price}`,
                category: `${item.category.name}`,
                item_category: `${item.category.name}`,
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
        setConfirmDelete(false);
        if (!resp?.data?.data?.items?.length) {
          sessionStorage.clear();
        }
        //     history.push('/product-listing')
      })
    );
  };

  const moveToWishlist = (item: any) => {
    // dispatch(showLoader());
    let payload: any = {
      productId: item.productId,
      cartItemId: item.cartItemId,
      attributeData: item?.attributeData,
      type: item.type,
    };
    addToWishList(payload)
      .then((resp) => {
        if (resp) {
          let categoryAttributesIndex = item?.customAttributes.findIndex(
            (item: any) => item.attribute_code === 'category_ids'
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
          let eventPayload = {
            ProductId: `${item?.magentoId}`,
            ProductName: `${item?.name}`,
            Price: `${item?.price}`,
            Category: JSON.stringify(categoryArray),
            FromScreen: `my bag`,
          };
          eventAddToWishlist(eventPayload);

          dispatch(getShoppingBagList());
          dispatch(getWishList({ limit: 10, page: 1 }));
          // dispatch({
          //   type: Utils.ActionName.WISHLIST,
          //   payload: { totalCount: totalCount + 1 },
          // });
        }
        // dispatch(hideLoader());
      })
      .catch((err) => {
        // dispatch(hideLoader());
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: err.response.data.message,
            },
          });
      });
    deleteItem(item);
  };

  const redirectToPdp = (item: any) => {
    if (item?.type !== 'virtual' && item?.type !== 'sample') {
      let pathname = Utils.CommonFunctions.seoUrl(item, 'pdp');
      history.push({ pathname: pathname });
    }
  };
  const skeletonLoader = useSelector((state: any) => {
    return state.loadingReducer.skeletonLoader;
  });

  var totalItems = 0;
  items?.map((item: any) =>
    item.visibility !== 1 ? (totalItems += item.quantity) : totalItems
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const isMembershipAdded = useSelector(
    (state: any) => state.shoppingBagReducer?.isMembershipAdded
  );
  totalItems = isMembershipAdded ? totalItems + 1 : totalItems;

  return (
    <>
      {skeletonLoader ? (
        ''
      ) : (
        // <ShoppingBagSkeleton />
        <>
          <div className={classes.headingDiv}>
            <>
              <Box sx={{ display: { xs: 'none', sm: 'contents' } }}>
                <Typography className={classes.heading}>
                  Shopping Bag
                </Typography>
                <Typography className={classes.subHeading}>
                  {`(${totalItems}${totalItems === 1 ? ' Item' : ' Items'})`}
                </Typography>
              </Box>
              <Box sx={{ display: { xs: 'contents', sm: 'none' } }}>
                <Typography className={classes.heading}>
                  Total {totalItems === 1 ? ' Item' : ' Items'}
                </Typography>
                <Typography className={classes.subHeading}>
                  {/* {totalItems} */}
                  {`(${totalItems})`}
                </Typography>
              </Box>
            </>
            {/* } */}
          </div>

          <div className={classes.productDiv}>
            {
              // skeletonLoader ?
              //   <ShoppingListSkeleton />
              //   :
              shoppingBagList &&
                shoppingBagList.map((item: any) => {
                  let selectedVariant =
                    _.find(item.customAttributes, {
                      attribute_code: 'size',
                    })?.label?.[0]?.label || [];
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

                  let discPrice = _.find(item.customAttributes, {
                    attribute_code: 'special_price',
                  });

                  return (
                    <>
                      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <div className={classes.product} key={item.cartItemId}>
                          <div className={classes.imgDiv}>
                            {item?.image?.[0]?.file ? (
                              <img
                                className={clsx(
                                  classes.prodImage,
                                  item?.type !== 'virtual' &&
                                    item?.type !== 'sample'
                                    ? classes.cursor
                                    : ''
                                )}
                                src={`${IMAGE_URL}${item?.image?.[0].file}`}
                                alt="product"
                                onClick={() => redirectToPdp(item)}
                              />
                            ) : (
                              <img
                                style={{ objectFit: 'fill' }}
                                className={clsx(
                                  classes.placeholderImage,
                                  item?.type !== 'virtual' &&
                                    item?.type !== 'sample'
                                    ? classes.cursor
                                    : ''
                                )}
                                src={Utils.images.PRODUCT_PLACEHOLDER_2}
                                alt="product"
                                onClick={() => redirectToPdp(item)}
                              />
                            )}
                          </div>
                          <div className={classes.mobileSecondDiv}>
                            <div className={classes.detailsDiv}>
                              {item.visibility !== 1 &&
                              item?.type !== 'virtual' ? (
                                <Typography
                                  className={classes.productName}
                                  onClick={() => redirectToPdp(item)}
                                >
                                  {item.name}{' '}
                                  {colorVariantLabel
                                    ? `- ${colorVariantLabel}`
                                    : ''}
                                </Typography>
                              ) : (
                                // </Link>
                                <Typography className={classes.productName}>
                                  {item.name}
                                </Typography>
                              )}
                              {item?.isInStock ? (
                                ''
                              ) : (
                                <Typography
                                  className={classes.productOutOfStock}
                                >
                                  Product is Out Of Stock
                                </Typography>
                              )}
                              {item?.isInStock ? (
                                <Typography className={classes.productWeight}>
                                  {selectedVariant ?? ''}
                                </Typography>
                              ) : (
                                <Typography
                                  className={
                                    classes.productOutOfStockDescription
                                  }
                                >
                                  Please delete this product and proceed to
                                  checkout.
                                </Typography>
                              )}
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
                              {item.visibility !== 1 &&
                                item?.type !== 'virtual' &&
                                item?.type !== 'sample' && (
                                  <Typography
                                    className={classes.productWishlist}
                                    onClick={() => moveToWishlist(item)}
                                  >
                                    Move To Wishlist
                                  </Typography>
                                )}
                            </div>

                            <div className={classes.leftDiv}>
                              <div className={classes.rightDiv2}>
                                <div className={classes.priceContainer}>
                                  {/* {item.type !== 'sample' ? */}
                                  {item?.isInStock &&
                                  (item.visibility !== 1 ||
                                    item.type !== 'sample') ? (
                                    <>
                                      {discPrice ? (
                                        <>
                                          <div className={classes.priceDiv}>
                                            <Typography
                                              className={classes.discountPrice}
                                            >
                                              ₹{' '}
                                              {Utils.CommonFunctions.decimalFlat(
                                                item.price,
                                                0
                                              )}
                                            </Typography>
                                            <Typography
                                              className={[
                                                classes.productName,
                                                classes.amount,
                                              ].join(' ')}
                                            >
                                              ₹{' '}
                                              {Utils.CommonFunctions.decimalFlat(
                                                discPrice.value,
                                                0
                                              )}
                                            </Typography>
                                          </div>

                                          <Typography
                                            className={classes.discount}
                                          >
                                            {Utils.CommonFunctions.percentageOff(
                                              discPrice.value,
                                              item.price
                                            )}
                                            % Off
                                          </Typography>
                                        </>
                                      ) : item.price !== 0 ? (
                                        <>
                                          <Typography
                                            className={[
                                              classes.productName,
                                              classes.amount,
                                            ].join(' ')}
                                          >
                                            ₹{' '}
                                            {Utils.CommonFunctions.decimalFlat(
                                              item.price,
                                              0
                                            )}
                                          </Typography>
                                        </>
                                      ) : null}
                                    </>
                                  ) : null}
                                </div>
                                <div className={classes.deleteDiv}>
                                  {item.visibility !== 1 &&
                                  item?.type !== 'virtual' &&
                                  item?.type !== 'sample' &&
                                  item?.isInStock ? (
                                    <div className={classes.addRemDiv}>
                                      <IconButton
                                        size="small"
                                        className={classes.iconBtn}
                                        onClick={() =>
                                          dispatch(
                                            onCountChange(
                                              item.quantity - 1,
                                              item,
                                              configs,
                                              () => {}
                                            )
                                          )
                                        }
                                      >
                                        <RemoveIcon fontSize="small" />
                                      </IconButton>
                                      <Typography
                                        className={[
                                          classes.productName,
                                          classes.quantity,
                                        ].join(' ')}
                                      >
                                        {item.quantity}
                                      </Typography>
                                      <IconButton
                                        size="small"
                                        className={classes.iconBtn}
                                        onClick={() => {
                                          dispatch(
                                            onCountChange(
                                              item.quantity + 1,
                                              item,
                                              configs,
                                              () => {}
                                            )
                                          );
                                          // }
                                        }}
                                      >
                                        <AddIcon fontSize="small" />
                                      </IconButton>
                                    </div>
                                  ) : null}

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
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Box>

                      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <div className={classes.product} key={item.cartItemId}>
                          <div className={classes.leftDiv}>
                            <div className={classes.imgDiv}>
                              {item?.image?.[0]?.file ? (
                                <img
                                  className={clsx(
                                    classes.prodImage,
                                    item?.type !== 'virtual' &&
                                      item?.type !== 'sample'
                                      ? classes.cursor
                                      : ''
                                  )}
                                  src={`${IMAGE_URL}${item?.image?.[0].file}`}
                                  alt="product"
                                  onClick={() => redirectToPdp(item)}
                                />
                              ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  className={clsx(
                                    classes.placeholderImage,
                                    item?.type !== 'virtual' &&
                                      item?.type !== 'sample'
                                      ? classes.cursor
                                      : ''
                                  )}
                                  src={Utils.images.PRODUCT_PLACEHOLDER_2}
                                  alt="product"
                                  onClick={() => redirectToPdp(item)}
                                />
                              )}
                            </div>
                            <div className={classes.detailsDiv}>
                              {item.visibility !== 1 &&
                              item?.type !== 'virtual' ? (
                                <Typography
                                  className={classes.productName}
                                  onClick={() => redirectToPdp(item)}
                                >
                                  {item.name}
                                  {colorVariantLabel
                                    ? `- ${colorVariantLabel}`
                                    : ''}
                                </Typography>
                              ) : (
                                <Typography className={classes.productName}>
                                  {item.name}
                                </Typography>
                              )}
                              {item?.isInStock ? (
                                ''
                              ) : (
                                <Typography
                                  className={classes.productOutOfStock}
                                >
                                  Product is Out Of Stock
                                </Typography>
                              )}
                              {item?.isInStock ? (
                                <Typography className={classes.productWeight}>
                                  {selectedVariant ?? ''}
                                </Typography>
                              ) : (
                                <Typography
                                  className={
                                    classes.productOutOfStockDescription
                                  }
                                >
                                  Please delete this product and proceed to
                                  checkout.
                                </Typography>
                              )}
                              {item.visibility !== 1 &&
                                item?.type !== 'virtual' &&
                                item?.type !== 'sample' && (
                                  <Typography
                                    className={classes.productWishlist}
                                    onClick={() => moveToWishlist(item)}
                                  >
                                    Move To Wishlist
                                  </Typography>
                                )}

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
                            </div>
                          </div>
                          <div className={classes.rightDiv}>
                            <div className={classes.priceContainer}>
                              {/* {item.type !== 'sample' ? */}
                              {item?.isInStock &&
                              (item.visibility !== 1 ||
                                item.type !== 'sample') ? (
                                <>
                                  {discPrice ? (
                                    <>
                                      <Typography
                                        className={classes.discountPrice}
                                      >
                                        ₹{' '}
                                        {Utils.CommonFunctions.decimalFlat(
                                          item.price,
                                          0
                                        )}
                                      </Typography>
                                      <Typography
                                        className={[
                                          classes.productName,
                                          classes.amount,
                                        ].join(' ')}
                                      >
                                        ₹{' '}
                                        {Utils.CommonFunctions.decimalFlat(
                                          discPrice.value,
                                          0
                                        )}
                                      </Typography>

                                      <Typography className={classes.discount}>
                                        {Utils.CommonFunctions.percentageOff(
                                          discPrice.value,
                                          item.price
                                        )}
                                        % Off
                                      </Typography>
                                    </>
                                  ) : item.price !== 0 ? (
                                    <>
                                      <Typography
                                        className={[
                                          classes.productName,
                                          classes.amount,
                                        ].join(' ')}
                                      >
                                        ₹{' '}
                                        {Utils.CommonFunctions.decimalFlat(
                                          item.price,
                                          0
                                        )}
                                      </Typography>
                                    </>
                                  ) : null}
                                </>
                              ) : null}
                            </div>
                            <div className={classes.deleteDiv}>
                              {/* <Button
                          startIcon={<img src={Utils.images.DELETEBTN} alt="deleteBtn" />}
                          className={classes.deleteBtn}
                          onClick={() => {
                            setConfirmDelete(true);
                            setProduct(item);
                            // delesteItem(item)
                          }}
                        >
                          Delete
                        </Button> */}
                              {item.visibility !== 1 &&
                              item?.type !== 'virtual' &&
                              item?.type !== 'sample' &&
                              item?.isInStock ? (
                                <div className={classes.addRemDiv}>
                                  <IconButton
                                    size="small"
                                    className={classes.iconBtn}
                                    onClick={() =>
                                      dispatch(
                                        onCountChange(
                                          item.quantity - 1,
                                          item,
                                          configs,
                                          () => {}
                                        )
                                      )
                                    }
                                  >
                                    <RemoveIcon fontSize="small" />
                                  </IconButton>
                                  <Typography
                                    className={[
                                      classes.productName,
                                      classes.quantity,
                                    ].join(' ')}
                                  >
                                    {item.quantity}
                                  </Typography>
                                  <IconButton
                                    size="small"
                                    className={classes.iconBtn}
                                    onClick={() => {
                                      // if (item.quantity == 10) {
                                      //   setAlertText(
                                      //     "Maximum you can purchase is 10"
                                      //   );
                                      //   setShowAlert(true);
                                      // }
                                      //  else {
                                      dispatch(
                                        onCountChange(
                                          item.quantity + 1,
                                          item,
                                          configs,
                                          () => {}
                                        )
                                      );
                                      // }
                                    }}
                                  >
                                    <AddIcon fontSize="small" />
                                  </IconButton>
                                </div>
                              ) : null}

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
                            </div>
                          </div>
                        </div>
                      </Box>
                    </>
                  );
                })
            }

            <DeleteProduct
              deleteItem={() => deleteItem(product)}
              handleClose={() => setConfirmDelete(false)}
              open={confirmDelete}
            />
          </div>
          <GiftWrap handleCartSummary={handleCartSummary} />

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
        </>
      )}
      {!isMembershipAdded && <BankOffer showTerms={false} />}
    </>
  );
};
export default ShoppingBag;
