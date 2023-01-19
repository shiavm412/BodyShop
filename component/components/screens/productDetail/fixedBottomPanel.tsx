import React, { useEffect } from 'react';
import { Typography, MenuItem, Menu, Theme, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Utils from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import SuccessModal from './successModal';

// import {
//   addToBag,
//   addToWishlist as eventAddToWishlist,
//   removeFromWishlist as eventRemoveFromWishlist,
// } from "../../utils/event/action";

import clsx from 'clsx';
// import { addToBag as eventAddToBag } from "../../utils/event/action";

import { HideBetween, HideOn } from 'react-hide-on-scroll';
// import { getWishList } from "../wishlist/action";
import { customGa4Event } from '../../../utils/gtag';
import { Box, Icon } from '@mui/material';
import { hideLoader } from '../../../../store/home/action';
import ContainedButton from '../../../common/containedButton';
// import { addToWishList, removeFromWishList, notifyMe } from "../../common/product/action";
import { ReducersModal } from '../../../models';
import { addToBag } from '../../../common/addToCart/action';
import { addToBag as eventAddToBag } from '../../../utils/event/action';
import { notifyMe } from '../../../common/product/action';

const useStyles = makeStyles((theme: Theme) => ({
  staticBottomContainer: {
    background: '#f9f6ed',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 9,
    left: 0,
    [theme.breakpoints.down('xs')]: {
      // display: 'none'
      background: 'white',
      borderTop: '1px solid lightgray',
    },
  },
  //   hideHeight: {
  //     left: "65vw",
  //   },
  //   sticky: {
  //     display: "grid",
  //     alignContent: "center",
  //     justifyContent: " center",
  //     position: " fixed",
  //     bottom: "0px",
  //     width: "100%",
  //     minHeight: "10vw",
  //   },
  mainBottomContainer: {
    padding: '12px 30px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      // display: 'none'
      padding: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
      // display: 'none'
      padding: theme.spacing(1.2, 1),
      flexDirection: 'column',
    },
  },
  leftContainer: {
    flexBasis: '50%',
    [theme.breakpoints.down('md')]: {
      // display: 'none'
      flexBasis: '40%',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      paddingBottom: '10px',
      alignItems: 'center',
    },
  },
  rightContainer: {
    // width: '50%',
    flexBasis: '50%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      // display: 'none'
      flexBasis: '60%',
    },
    [theme.breakpoints.down('xs')]: {
      // display: 'none'
      width: '100%',
    },
  },
  productName: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.6
    )}  Work Sans`,
    lineHeight: '18.77px',
    color: '#004236',
    [theme.breakpoints.down('xs')]: {
      font: `normal 700 ${theme.spacing(1.8)}  Recoleta Alt`,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width: '63%',
      color: 'var(--black)',
      // overflow: "hidden",
      textOverflow: 'ellipsis',
      // display: "-webkit-box",
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
    },
  },
  productPrice: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )}  Work Sans`,
    lineHeight: '21.11px',
    color: '#004236',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0.5, 1),
      font: `normal 700 ${theme.spacing(1.8)}  Work Sans`,
    },
  },
  price: {
    marginLeft: theme.spacing(1),
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.5
    )} Work Sans`,
    color: 'var(--light-gray)',
    textDecorationLine: 'line-through',
  },
  fontError: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )}  Work Sans`,
    lineHeight: '21.11px',
  },
  dropDown: {
    // position: 'relative',
    // width: '65%',

    '& .MuiTypography-body1': {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}  Work Sans`,

      lineHeight: '16.42px',
      letterSpacing: '0.04em',
      textTransform: 'capitalize',
      color: 'var(--black300)',
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
      },
    },
    '& .MuiIconButton-root': {
      border: '1px solid #044236',
      borderRadius: '0px',
      padding: '15px 15px',
      // fontSize: '14px',
      marginRight: '15px',
      '& img': {
        marginLeft: '8px',
      },
      [theme.breakpoints.down('sm')]: {
        // display: 'none'
        padding: theme.spacing(0.5),
        // fontSize: '10px',
      },
    },
    '& .MuiIconButton-root:hover': {
      background: 'none',
    },
    [theme.breakpoints.down('md')]: {
      flexBasis: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%',
    },
  },
  dropDownItems: {
    position: 'absolute',
    background: '#fff',
    zIndex: 9,
    boxShadow: '0px 0px 4px rgb(0 0 0 / 20%)',
    bottom: '62px',
    // width: '100%',
    maxHeight: '400px',
    overflowY: 'auto',
    '& li': {
      whiteSpace: 'normal',
      wordBreak: 'break-all',
    },
  },

  discAmount: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: "space-between",
    [theme.breakpoints.down('sm')]: {
      // justifyContent: "space-between"
    },
  },
  secondContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.2, 6),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
      // display: 'none'
      // padding: theme.spacing(1),
      flexDirection: 'column',
    },
  },
  secondLeftContainer: {
    flexBasis: '50%',
    [theme.breakpoints.down('md')]: {
      // display: 'none'
      flexBasis: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      flexBasis: '100%',
      paddingBottom: '10px',
      alignItems: 'center',
    },
  },

  secondRightContainer: {
    flexBasis: '50%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    [theme.breakpoints.down('md')]: {
      // display: 'none'
      flexBasis: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      // display: 'none'
      width: '100%',
    },
  },
  addToBag: {
    display: 'flex',
    alignItems: 'center',
    // width: '35%',
    justifyContent: 'flex-end',
    '& .MuiButton-root': {
      marginRight: '15px',
      font: 'normal 500 15px Work Sans',
      padding: theme.spacing(1, 2),
      [theme.breakpoints.down('xs')]: {
        width: '32vh',
      },
    },
  },
  addtoBag: {
    marginLeft: '20px',
    [theme.breakpoints.down('xs')]: {
      // display: 'none'
      padding: theme.spacing(1),
      flexDirection: 'column',
    },
  },
  mobileContainer: {},
  wishlistMyBag: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  heartImg: {
    zIndex: 1,
    // height: "25px",
    // width: "25px"
  },
  heartIcon: {
    height: '25px',
    width: '25px',
  },
}));

declare global {
  interface Window {
    gtag?: any;
  }
}
const FixedBottomPanel = (props: any) => {
  // const product: any = props && props?.data;
  const { product, selectedVariant, selectedVariantData } = useSelector(
    (state: ReducersModal) => state.productDetailReducer
  );

  // const totalCount = useSelector(
  //   (state: ReducersModal) => state.wishlistReducer.totalCount
  // );

  const [like, setLike] = React.useState(false);

  useEffect(() => {
    setLike(product?.wishlists?._id ? true : false);
  }, [product]);

  // const [pageOffSet, setPageOffSet] = useState(0);
  let configurableOptions = product?.configurableProductOptions?.[0];
  let configurableLinks = product?.configurableProductLinks;
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const [state, setState] = React.useState({
    sizeData: [''],
    shadeData: [''],
    shadeChanged: false,
    sizeChanged: false,
    size_shadeData: false,
    showReadMore: true,
    selectedShade: '',
    selectedLabel: '',
    selectedPrice: 0,
    selectedAmount: '0 ml',
    specialPrice: 0,
    outOfStock: false,
    selectedSizeShade: '',
    selectedIndexValue: -1,
    productPrice: 0,
    open: false,
    productCount: 1,
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openBanner = Boolean(anchorEl);

  const item = product;

  const handleDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCart = () => {
    let data: any = {
      productId: item.magentoId,
      attributeData:
        item.type !== 'simple'
          ? [
              {
                id: item.configurableProductOptions?.[0]?.attribute_id,
                value: selectedVariant?.value_index,
              },
            ]
          : [],
      type: item.type,
      quantity: 1,
      isSearchOrRecommend: props?.isSearched ? true : false,
    };

    dispatch(
      addToBag(data, () => {
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
        eventAddToBag({
          ProductId: `${item.magentoId}`,
          ProductName: `${item.name}`,
          Price: `${item.price}`,
          Category: JSON.stringify(categoryArray),
          FromScreen: `pdp`,
        });
        if (typeof window && window.gtag !== 'undefined') {
          const gtagPayload = {
            currency: 'INR',
            items: [
              {
                id: `${item.sku}`,
                item_id: `${item.sku}`,
                item_name: `${item.name}`,
                name: `${item.name}`,
                brand: 'The Body Shop',
                item_brand: 'The Body Shop',
                quantity: `${item.productOrder}`,
                price: `${item.price}`,
              },
            ],
            category: item?.categoryData?.name,
          };
          customGa4Event('add_to_cart', gtagPayload);
          if (
            process.env.REACT_APP_ENV !== 'development' &&
            process.env.REACT_APP_ENV !== 'staging'
          ) {
            window.gtag('event', 'add_to_cart', gtagPayload);
          }
        }
        setState({ ...state, open: true });
      })
    );
  };

  const handleClose = () => {
    setAnchorEl(null);

    setState({ ...state, open: false });
  };

  const selectVariant = (product: any) => {
    let selectedProduct = configurableLinks?.find(
      (val: any) => val?.value?.toLowerCase() === product?.label?.toLowerCase()
    );
    dispatch({
      type: 'getProductData',
      payload: {
        selectedVariant: product,
        selectedVariantData: selectedProduct,
      },
    });
    handleClose();
  };

  const onNotify = (data: any) => {
    let attributeData: any = {};
    if (data.type !== 'simple') {
      const configurableData = data.configurableProductOptions?.[0];
      attributeData.id = configurableData?.attribute_id;
      attributeData.value = configurableData?.values?.[0]?.value_index;
    }
    // const email = localStorage.getItem("email");
    // const message = `We will notify you over the mail ${email} once the product is back in stock`;
    const params = {
      productId: data.magentoId,
      attributeData: data.type !== 'simple' ? [attributeData] : [],
      type: data.type,
      // childId:
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

  const handleGoToHeader = () => {
    window.scrollTo(0, 0);
  };

  // useEffect(() => {
  //     // getOffset(window.pageYOffset)
  //     if (window.scrollY === 0)
  //         setPageOffSet(window.scrollY);
  //     else if (window.scrollY >= pageOffSet - 60)
  //         setPageOffSet(100)
  //     return () => {
  //         return setPageOffSet(0);
  //     }
  // }, [window.scrollY]);

  // let discPrice = Utils.CommonFunctions.getAttributeValue(
  //   selectedVariantData?.customAttributes,
  //   'special_price'
  // );
  // const productName = selectedVariantData?.name ? _.truncate(Utils.CommonFunctions.htmlDecode(selectedVariantData?.name),{ 'length': 26,
  // 'omission': ''}) : ""
  // {_.truncate(
  //     `${value.location.address}, ${value.location.street}, ${value.location.city}, ${value.location.state}, ${value.location.country}, ${value.location.pincode}`,
  //     { length: 70 }
  //   )}

  const rectangleHeight = props?.rectHeight - 250;
  const rectHeight = props?.rectHeight + 550;

  return (
    <div>
      <div className={classes.staticBottomContainer}>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <HideOn height={rectHeight}>
            <div
              className={clsx(
                props?.data?.type !== 'simple'
                  ? classes.mainBottomContainer
                  : classes.secondContainer
              )}
            >
              <div
                className={clsx(
                  props?.data?.type !== 'simple'
                    ? classes.leftContainer
                    : classes.secondLeftContainer
                )}
              >
                {/* <Box sx={{ display: { xs: "none", sm: "block" } }}> */}
                <Typography className={classes.productName}>
                  {Utils.CommonFunctions.htmlDecode(
                    selectedVariantData?.name || selectedVariant?.label
                  )}
                </Typography>
                {/* </Box> */}

                {selectedVariantData?.isInStock ? (
                  // <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <>
                    {selectedVariantData && selectedVariantData?.price ? (
                      <div className={classes.discAmount}>
                        <Typography className={classes.price}>
                          ₹
                          {Utils.CommonFunctions.decimalFlat(
                            selectedVariantData?.price,
                            0
                          )}
                        </Typography>
                        <Typography className={classes.productPrice}>
                          ₹{Utils.CommonFunctions.decimalFlat(selectedVariantData?.price, 0)}
                        </Typography>
                      </div>
                    ) : (
                      <Typography className={classes.productPrice}>
                        ₹
                        {Utils.CommonFunctions.decimalFlat(
                          selectedVariantData?.price,
                          0
                        )}
                      </Typography>
                    )}
                    {/* </Box> */}
                  </>
                ) : (
                  <Typography
                    className={classes.fontError}
                    style={{ color: '#FF0707' }}
                  >
                    {'Out of Stock'}
                  </Typography>
                )}
              </div>
              <div
                className={clsx(
                  props?.data?.type !== 'simple'
                    ? classes.rightContainer
                    : classes.secondRightContainer
                )}
              >
                {/* Dropdown */}
                {/* <Box sx={{ display: { xs: "none", sm: "block" } }}> */}
                {props?.data?.type !== 'simple' ? (
                  <div className={classes.dropDown}>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleDropdown}
                      color="inherit"
                    >
                      <Typography>
                        {' '}
                        {selectedVariantData?.name}{' '}
                        {/* {state.selectedLabel} */}
                        {/* {priceData?.priceData?.details?.label} */}
                      </Typography>

                      {/* <DOWN_ARROW /> */}
                    </IconButton>
                    <div className={classes.dropDownItems}>
                      <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={openBanner}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        {configurableOptions
                          ? configurableOptions?.values.map(
                              (val: any, i: any) => {
                                return (
                                  <MenuItem
                                    key={i}
                                    value={val.value_index}
                                    onClick={() => selectVariant(val)}
                                  >
                                    {item?.name} {val.label}
                                  </MenuItem>
                                );
                              }
                            )
                          : null}
                      </Menu>
                    </div>
                  </div>
                ) : null}
                <div className={classes.addToBag}>
                  {selectedVariantData && selectedVariantData?.isInStock ? (
                    <ContainedButton
                      isFullWidth
                      className={classes.addtoBag}
                      text="Add to Bag"
                      type="button"
                      onClick={() => handleCart()}
                    />
                  ) : (
                    <ContainedButton
                      isFullWidth
                      className={classes.addtoBag}
                      isOutline
                      isGreen
                      text="Notify Me"
                      type="button"
                      onClick={() => onNotify(item)}
                    />
                  )}
                </div>
              </div>
            </div>
          </HideOn>
        </Box>

        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <HideOn height={10}>
            <div
              className={clsx(
                props?.data?.type !== 'simple'
                  ? classes.mainBottomContainer
                  : classes.secondContainer
              )}
            >
              <div
                className={clsx(
                  props?.data?.type !== 'simple'
                    ? classes.rightContainer
                    : classes.secondRightContainer
                )}
              >
                <div className={classes.wishlistMyBag}>
                  {/* <div>
                    {like ? (
                      <IconButton
                        aria-label="favorite"
                        className={classes.heartImg}
                      >
                        
                        <div  className={classes.heartIcon} onClick={() => handleLike(false, selectedVariantData)}> 
                          <FAVORITE_ICON />
                        </div>
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="favorite"
                        className={classes.heartImg}
                        onClick={() => handleLike(true, selectedVariantData)}
                      >
                        
                        <div className={classes.heartIcon}>
                          <HEART />
                        </div>
                      </IconButton>
                    )}
                  </div> */}
                  <div className={classes.addToBag}>
                    {selectedVariantData && selectedVariantData?.isInStock ? (
                      <ContainedButton
                        isFullWidth
                        className={classes.addtoBag}
                        text="Add to Bag"
                        type="button"
                        onClick={() => handleCart()}
                      />
                    ) : (
                      <ContainedButton
                        isFullWidth
                        className={classes.addtoBag}
                        isOutline
                        isGreen
                        text="Notify Me"
                        type="button"
                        onClick={() => onNotify(item)}
                      />
                    )}

                    {/* <span style={{ cursor: "pointer" }}
                      onClick={handleGoToHeader}>
                      <UP_ARROW />
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </HideOn>
          <HideBetween
            height
            inverse
            startHeight={50}
            endHeight={rectangleHeight}
          >
            <div
              className={clsx(
                props?.data?.type !== 'simple'
                  ? classes.mainBottomContainer
                  : classes.secondContainer
              )}
            >
              {
                // pageOffSet !== 0 &&
                <div
                  className={clsx(
                    props?.data?.type !== 'simple'
                      ? classes.leftContainer
                      : classes.secondLeftContainer
                  )}
                >
                  {/* <Box sx={{ display: { xs: "none", sm: "block" } }}> */}
                  <Typography className={classes.productName}>
                    {selectedVariantData?.name
                      ? Utils.CommonFunctions.htmlDecode(
                          selectedVariantData?.name
                        )
                      : ''}
                  </Typography>
                  {/* </Box> */}
                  <div className={classes.mobileContainer}>
                    {selectedVariantData?.isInStock ? (
                      // <Box sx={{ display: { xs: "none", sm: "block" } }}>
                      <>
                        {selectedVariantData && selectedVariantData?.price ? (
                          <div className={classes.discAmount}>
                            <Typography className={classes.price}>
                              ₹
                              {Utils.CommonFunctions.decimalFlat(
                                selectedVariantData?.price,
                                0
                              )}
                            </Typography>
                            <Typography className={classes.productPrice}>
                              ₹{Utils.CommonFunctions.decimalFlat(selectedVariantData?.price, 0)}
                            </Typography>
                          </div>
                        ) : (
                          <Typography className={classes.productPrice}>
                            ₹
                            {Utils.CommonFunctions.decimalFlat(
                              selectedVariantData?.price,
                              0
                            )}
                          </Typography>
                        )}
                        {/* </Box> */}
                      </>
                    ) : (
                      <Typography
                        className={classes.fontError}
                        style={{ color: '#FF0707' }}
                      >
                        {'Out of Stock'}
                      </Typography>
                    )}
                  </div>
                </div>
              }
              <div
                className={clsx(
                  props?.data?.type !== 'simple'
                    ? classes.rightContainer
                    : classes.secondRightContainer
                )}
              >
                <div className={classes.wishlistMyBag}>
                  <div>
                    {like ? (
                      <IconButton
                        aria-label="favorite"
                        className={classes.heartImg}
                      >
                        {/* <div  className={classes.heartIcon} onClick={() => handleLike(false, selectedVariantData)}>
                          <FAVORITE_ICON />
                        </div> */}
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="favorite"
                        className={classes.heartImg}
                        // onClick={() => handleLike(true, selectedVariantData)}
                      >
                        {/* <div  className={classes.heartIcon}> 
                          <HEART />
                        </div> */}
                      </IconButton>
                    )}
                  </div>
                  <div className={classes.addToBag}>
                    {selectedVariantData && selectedVariantData?.isInStock ? (
                      <ContainedButton
                        isFullWidth
                        className={classes.addtoBag}
                        text="Add to Bag"
                        type="button"
                        onClick={() => handleCart()}
                      />
                    ) : (
                      <ContainedButton
                        isFullWidth
                        className={classes.addtoBag}
                        isOutline
                        isGreen
                        text="Notify Me"
                        type="button"
                        onClick={() => onNotify(item)}
                      />
                    )}

                    {/* <span style={{ cursor: "pointer" }}
                      onClick={handleGoToHeader}>
                      <UP_ARROW />
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </HideBetween>
        </Box>

        <SuccessModal
          open={state.open}
          handleClose={handleClose}
          details={item}
          quantity={state.productCount}
        />
      </div>
    </div>
  );
};

export default FixedBottomPanel;
