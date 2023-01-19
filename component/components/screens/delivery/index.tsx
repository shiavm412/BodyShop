/* eslint-disable @next/next/no-img-element */
import {
  Divider,
  Grid,
  List,
  ListItem,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState, useEffect } from 'react';
// import Utils from "../../utils";
import clsx from 'clsx';
import DeliveryCard from './deliveryCard';
import { useSelector } from 'react-redux';
// import { ReducersModal } from "../../models";
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { updateLocalCart } from '../shoppingBags/action';
// import { screenViewed } from "../../utils/event/action";
// import events from "../../utils/event/constant";
import { Box } from '@mui/material';
import Utils from '../../../utils';
import { screenViewed } from '../../../utils/event/action';
import events from '../../../utils/event/constant';
// import {
//   DELIVERY_VAN,
//   HAND,
//   PRODUCT_PLACEHOLDER_2,
// } from "utils/constantImages";
// import format from "date-fns/format";

const useStyles = makeStyles((theme: Theme) => ({
  imgDiv: {
    borderRadius: 4,
    // backgroundColor: "var(--light-creame-color)",
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: theme.spacing(1.6, 1.6),
    width: 80,
    // height: 80,
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: '2/3',
    objectFit: 'cover',
  },
  textDiv: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      flexBasis: '85%',
    },
    // width: '100%'
  },
  textBrand: {
    font: `normal 700 ${theme.spacing(1.6)} Work Sans`,
    color: 'var(--secondary-black)',
    lineHeight: '18px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
      lineHeight: '16px',
    },
    // provide ellipses or not
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  listItem: {
    padding: '0px',
    margin: '20px 5px 20px 0px',
    display: 'flex',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '5px 5px 5px 0px',
    },
  },
  itemContent: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
  },
  heading: {
    font: `normal 600 ${theme.spacing(1.5)} Work Sans`,
    color: '#333333',
    padding: '20px 0px 0px 0px',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.5)} Work Sans SemiBold`,
    },
  },
  freeDelivery: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    justifyContent: 'center',
    padding: '20px',
    textAlign: 'center',
    color: 'var(--white)',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
      margin: theme.spacing(-0.8, -2),
      maxWidth: '120%',
      borderRadius: 0,
    },
  },
  paymentDelivery: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    justifyContent: 'center',
    padding: '20px',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1.5),
    },
  },
  freeDeliveryText: {
    font: `normal ${theme.spacing(2.4)} Recoleta Alt Medium`,
    lineHeight: '28px',
    letterSpacing: '1.5px',
    color: '#FFFFFF',
    marginLeft: '20px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
      marginLeft: 0,
      textAlign: 'center',
    },
  },
  paymentDeliveryText: {
    color: '#004236',
    font: `normal 700 ${theme.spacing(2.4)} Druk`,
    lineHeight: '28px',
    letterSpacing: '0.08em',
    marginLeft: '20px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
      marginLeft: 0,
      textAlign: 'center',
      letterSpacing: '0.04em',
    },
  },
  deliveryCost: {
    font: `normal 600 ${theme.spacing(1.6)} Work Sans`,
    color: 'var(--secondary-black)',
    [theme.breakpoints.down('xs')]: {
      font: `normal 600 ${theme.spacing(1.5)} Work Sans Bold`,
    },
    lineHeight: 1.5,
  },
  radio: {
    width: '10%',
  },
  reuseDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  reuseHeading: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.5
    )} Work Sans`,
    color: 'var(--secondary-black)',
    display: 'flex',
    alignItems: 'center',
  },
  view: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )} Work Sans`,
    color: 'var(--main-opacity)',
  },
  outerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  deliveryTimeText: {
    font: `normal 500 ${theme.spacing(1.2)} Work Sans`,
    lineHeight: '14px',
    color: '#333333',
    letterSpacing: '0em',
    marginTop: '8px',
    width: '19rem',
    [theme.breakpoints.down('md')]: {
      width: '14rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
    },
  },
  textOuterDiv: {
    padding: theme.spacing(0, 0, 0, 2),
    width: '100%',
    lineHeight: 1.5,
  },
  textDivText: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  deliveryHeading: {
    font: `normal 600 ${theme.spacing(1.6)} Work Sans`,
    lineHeight: '19px',
    color: 'var(--black300)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.6)} Work Sans SemiBold`,
    },
  },
  popoverContainer: {
    pointerEvents: 'none',
    width: '60%',
    [theme.breakpoints.down('md')]: {
      width: '70%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  popOverContent: {
    padding: theme.spacing(1),
    // width:'inherit'
  },
  childWrapper: {
    width: '80%',
  },
}));
interface Props {
  deliveryData: any;
  setGrandTotal: Function;
  handleCartSummary: Function;
  grandTotal: any;
}
const Delivery: React.FC<any> = (props: Props) => {
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const { deliveryData, setGrandTotal } = props;
  const [deliveryType, setDeliveryType] = useState('standard');
  // const [total, setTotal] = useState(0);
  const IMAGE_URL = Utils.constants.productImage;

  window.onload = function () {
    window.location = Utils.routes.SHOPPING_BAG;
  };

  const shoppingBagReducer: any = useSelector(
    (state: any) => state.shoppingBagReducer
  );
  // const [shoppingBagData, setData] = useState<any>({});
  const freeShippingAmount: any = useSelector(
    (state: any) => state.configReducer?.generalConfigs?.free_shipping_amount
  );
  const userData: any = useSelector(
    (state: any) => state.userDetailReducer.userInfo
  );
  // useEffect(() => {
  //   setData(shoppingBagReducer);
  // }, [shoppingBagReducer?.shipping?.shippingType, shoppingBagReducer?.grandTotal]);

  let prevPath =
    typeof window !== 'undefined' && localStorage.getItem('prevPath'); //coming from payment screen

  useEffect(() => {
    window.scrollTo(0, 0);
    // let shippingType = Utils.constants.shippingType.EXPRESS === shoppingBagData?.shipping?.shippingType
    let shippingType =
      Utils.constants.shippingType.EXPRESS ===
      shoppingBagReducer?.shipping?.shippingType
        ? 'express'
        : 'standard';
    const deliveryData =
      typeof window !== 'undefined' && sessionStorage.getItem('deliveryData')
        ? JSON.parse(sessionStorage.getItem('deliveryData') || '')
        : {};
    setDeliveryType(shippingType);
    let shippingFee =
      shippingType === 'standard'
        ? userData?.tierType === 2 ||
          userData?.tierType === 1 ||
          freeShippingAmount <= shoppingBagReducer.grandTotal
          ? 0
          : deliveryData?.normalShippingCharge
        : deliveryData?.expressShippingCharge;
    if (prevPath) {
      var total = shoppingBagReducer?.shipping?.shippingFee
        ? shoppingBagReducer.grandTotal -
          shoppingBagReducer?.shipping?.shippingFee
        : shoppingBagReducer.grandTotal;
    } else {
      var total = shoppingBagReducer.grandTotal;
    }
    // const finalFee = shoppingBagReducer?.shipping?.shippingFee - shippingFee === 0 ? shoppingBagReducer.grandTotal + shippingFee : shoppingBagReducer.grandTotal - shoppingBagReducer?.shipping?.shippingFee + shippingFee;
    // const finalFee = shoppingBagReducer?.shipping?.shippingFee == shippingFee ? shoppingBagReducer.grandTotal + shippingFee : shoppingBagReducer.grandTotal - shoppingBagReducer?.shipping?.shippingFee + shippingFee;

    // setTotal(finalFee);
    setGrandTotal(total + shippingFee);

    // let CartShippingFee = deliveryType === "standard" ? deliveryData?.normalShippingCharge : deliveryData?.expressShippingCharge
    const shippingData = {
      shippingType: shoppingBagReducer?.shipping?.shippingType
        ? shoppingBagReducer?.shipping?.shippingType
        : shippingType === 'standard'
        ? Utils.constants.shippingType.STANDARD
        : Utils.constants.shippingType.EXPRESS,
      shippingFee: shoppingBagReducer?.shipping?.shippingFee
        ? shoppingBagReducer.shipping.shippingFee
        : shippingFee,
    };
    let params: any = { shipping: shippingData };
    sessionStorage.setItem('shipping', JSON.stringify(shippingData));
    dispatch(updateLocalCart(params));
    /**
     * Event logger
     */
    screenViewed({
      ScreenName: events.SCREEN_DELIVERY,
      CTGenerated: 'WEB',
    });
  }, []);

  const handleChange = (type: any) => {
    let shippingFee =
      type === 'standard'
        ? userData?.tierType === 2 ||
          userData?.tierType === 1 ||
          freeShippingAmount <= shoppingBagReducer.grandTotal
          ? 0
          : deliveryData?.normalShippingCharge
        : deliveryData?.expressShippingCharge;

    if (prevPath) {
      var total = shoppingBagReducer?.shippingFee
        ? shoppingBagReducer.grandTotal - shoppingBagReducer?.shippingFee
        : shoppingBagReducer.grandTotal;
    } else {
      var total = shoppingBagReducer.grandTotal;
    }
    // const total = shoppingBagReducer?.shippingFee ? shoppingBagReducer.grandTotal - shoppingBagReducer?.shippingFee : shoppingBagReducer.grandTotal

    setGrandTotal(total + shippingFee);
    // setTotal(total + shippingFee);

    // let CartShippingFee =
    //   type === "standard"
    //     ? deliveryData?.normalShippingCharge
    //     : deliveryData?.expressShippingCharge;

    let params: any = {
      shipping: {
        shippingType:
          type === 'standard'
            ? Utils.constants.shippingType.STANDARD
            : Utils.constants.shippingType.EXPRESS,
        shippingFee: shippingFee,
      },
    };
    sessionStorage.setItem(
      'shipping',
      JSON.stringify({
        shippingType:
          type === 'standard'
            ? Utils.constants.shippingType.STANDARD
            : Utils.constants.shippingType.EXPRESS,
        shippingFee: shippingFee,
      })
    );
    dispatch(updateLocalCart(params));
    setDeliveryType(type);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        {userData?.tierType !== 2 && userData?.tierType !== 1 && (
          <Grid
            className={clsx({
              [classes.freeDelivery]:
                freeShippingAmount <= shoppingBagReducer.grandTotal,
              [classes.paymentDelivery]:
                freeShippingAmount > shoppingBagReducer.grandTotal,
            })}
            item
            xs={12}
            sm={12}
            md={12}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <img
                alt="icon"
                src={
                  freeShippingAmount <= shoppingBagReducer.grandTotal
                    ? Utils.images.DELIVERY_VAN
                    : Utils.images.HAND
                }
              />
            </Box>

            <Typography
              className={clsx({
                [classes.freeDeliveryText]:
                  freeShippingAmount <= shoppingBagReducer.grandTotal,
                [classes.paymentDeliveryText]:
                  freeShippingAmount > shoppingBagReducer.grandTotal,
              })}
            >
              {freeShippingAmount <=
              (shoppingBagReducer?.shippingFee
                ? shoppingBagReducer.grandTotal -
                  shoppingBagReducer?.shippingFee
                : shoppingBagReducer.grandTotal)
                ? `Your order qualifies for FREE Delivery! `
                : `Add product worth ₹${Utils.CommonFunctions.addCommaToAmount(
                    freeShippingAmount -
                      (shoppingBagReducer?.shippingFee
                        ? shoppingBagReducer.grandTotal -
                          shoppingBagReducer?.shippingFee
                        : shoppingBagReducer.grandTotal)
                  )} to get free delivery`}
            </Typography>
          </Grid>
        )}

        <div className={classes.outerBox}>
          {deliveryData?.standardDeliveryStatus && (
            <DeliveryCard
              deliveryType={deliveryType}
              key="Standard Delivery"
              deliveryHeading="Standard Delivery"
              deliveryCost={`₹ ${Utils.CommonFunctions.addCommaToAmount(
                deliveryData?.normalShippingCharge
              )}`}
              setDeliveryType={handleChange}
              deliveryText={`Estimated delivery by ${Utils.CommonFunctions.formatDate(
                new Date(deliveryData?.normalDate),
                'D MMM, yyyy'
              )}.`}
              checked={deliveryType === 'standard'}
              flag="Standard Delivery"
              value="standard"
              free={
                freeShippingAmount <= shoppingBagReducer.cartTotal ||
                userData?.tierType === 2 ||
                userData?.tierType === 1
              }
            />
          )}
          {deliveryData?.expressDeliveryStatus && (
            <DeliveryCard
              deliveryType={deliveryType}
              key="Express Delivery"
              deliveryHeading="Express Delivery"
              deliveryCost={`₹ ${Utils.CommonFunctions.addCommaToAmount(
                deliveryData?.expressShippingCharge
              )}`}
              setDeliveryType={handleChange}
              // deliveryText="Next working day if ordered before 11am."
              deliveryText={`Estimated delivery by ${Utils.CommonFunctions.formatDate(
                new Date(deliveryData?.expressDate),
                'D MMM, yyyy'
              )}.`}
              checked={deliveryType === 'express'}
              flag="Express Delivery"
              value="express"
            />
          )}
        </div>

        <Typography className={classes.heading}>
          Item(s) in this shipment includes
        </Typography>

        <Grid item xs={12} md={12}>
          <List>
            {shoppingBagReducer.items.map((item: any, index: any) => {
              let discPrice = _.find(item.customAttributes, {
                attribute_code: 'special_price',
              });

              return (
                <div key={index}>
                  <ListItem className={classes.listItem} button>
                    {/* <WithPopOverHOC
                      title={item.name}
                      popoverContainer={classes.popoverContainer}
                      popOverContent={classes.popOverContent}
                      childWrapper={classes.childWrapper}
                    > */}
                    <>
                      <div className={classes.itemContent}>
                        <div className={classes.imgDiv}>
                          {item?.image?.[0]?.file ? (
                            <img
                              src={`${Utils.images.IMAGE_URL}${item?.image?.[0].file}`}
                              alt="product"
                              className={classes.image}
                            />
                          ) : (
                            <img
                              src={`${Utils.images.PRODUCT_PLACEHOLDER_2}`}
                              alt="product"
                            />
                          )}
                        </div>
                        <div className={classes.textDiv}>
                          <Typography className={classes.textBrand}>
                            {item.name}
                          </Typography>
                        </div>
                      </div>
                    </>
                    {/* </WithPopOverHOC> */}

                    <Typography className={classes.deliveryCost}>
                      {discPrice ? (
                        <>
                          ₹{' '}
                          {Utils.CommonFunctions.decimalFlat(
                            discPrice.value,
                            0
                          )}
                        </>
                      ) : (
                        <>
                          ₹ {Utils.CommonFunctions.decimalFlat(item.price, 0)}
                        </>
                      )}
                    </Typography>
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Delivery;
