import { Theme, Typography, Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
// import { Link } from "react-router-dom";
import { getCouponList } from './action';
// import Utils from "../../utils";
// import { ReducersModal } from "../../models";
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
// import { useNavigate } from 'react-router-dom';
import { validateCoupon } from './action';
import Utils from '../../../utils';
import { useRouter } from 'next/router';
// import { COUPON_ICON } from "utils/constantImages";
// import { addCoupon } from "../../utils/event/action";
// import { updateLocalCart } from "../shoppingBags/action";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(3.5, 0, 2.5, 0),
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Recoleta Alt`,
    color: 'var(--secondary-black)',
    lineHeight: '24px',
    letterSpacing: '0.08em',
  },
  couponBox: {
    border: '1px solid var(--border-color)',
    boxSizing: 'border-box',
    borderRadius: '4px',
    padding: theme.spacing(1),
  },
  couponTitle: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2
    )} Work Sans`,
    color: 'var(--secondary-black)',
    lineHeight: '23px',
  },
  couponPara: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )} Work Sans`,
    color: 'var(--grey-color)',
    lineHeight: '16px',
    textTransform: 'uppercase',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.1
      )} Work Sans`,
      lineHeight: '20px',
    },
  },
  couponLink: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.6
    )} Work Sans`,
    color: 'var(--main-opacity)',
    lineHeight: '19px',
    textTransform: 'uppercase',
  },
  couponDescription: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.5
    )} Work Sans`,
    color: 'var(--light-gray)',
    lineHeight: '20px',
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(0, 0, 1.2, 0),
    [theme.breakpoints.down('xs')]: {
      alignItems: 'normal',
    },
  },
  applyBtn: {
    borderRadius: '4px',
    '&.Mui-disabled > .MuiButton-label  > .MuiTypography-body1': {
      color: 'var(--light-gray)',
    },
  },
  imagecontainer: {
    display: 'flex',
  },
  couponText: {
    margin: theme.spacing(0, 1),
  },
}));

const CodeList = () => {
  let query = Utils.CommonFunctions.useQuery();
  let couponIds = query.get('couponIds');

  const classes = useStyles();
  const { mylist, otherList } = useSelector((state: any) => {
    return state.couponReducer;
  });
  const cart: any = useSelector((state: any) => {
    return state.shoppingBagReducer;
  });

  const dispatch: any = useDispatch();
  const history = useRouter();
  useEffect(() => {
    dispatch(getCouponList({ couponIds }));
  }, []);

  return (
    <div>
      {mylist.length ? (
        <div className={classes.root}>
          <Typography variant="h2" className={classes.heading}>
            My Coupons
          </Typography>
        </div>
      ) : null}
      <Grid container spacing={2}>
        {mylist?.map((item: any, index: any) => (
          <Grid item xs={12} md={6} key={index}>
            <div className={classes.couponBox}>
              <div className={classes.innerContainer}>
                <div className={classes.imagecontainer}>
                  <img src={Utils.images.COUPON_ICON} alt="coupon_icon" />

                  <div className={classes.couponText}>
                    <Typography variant="h3" className={classes.couponTitle}>
                      {item.couponCode}
                    </Typography>
                    <Typography variant="h6" className={classes.couponPara}>
                      Expires On:{' '}
                      {item.dateTo
                        ? format(new Date(item.dateTo), 'dd MMMM yyyy')
                        : '-'}
                    </Typography>
                  </div>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      // addCoupon({
                      //   CouponCode: `${item.couponCode}`,
                      //   CouponType: `My Coupon`,
                      //   DiscountValue: `${item.discountAmount}`,
                      //   CouponValidity: `${format(new Date(item.dateTo), "dd MMMM yyyy")}`,
                      //   CouponApplyStatus: "",
                      //   FailureError: "",
                      // })

                      dispatch(
                        validateCoupon(
                          {
                            cartId: cart._id,
                            couponCode: item.couponCode,
                          },
                          () => {
                            history.push({ pathname: '/shopping-bag' });
                          },
                          item
                        )
                      );
                    }}
                    disabled={!item?.isApplicable}
                    className={classes.applyBtn}
                  >
                    <Typography variant="body1" className={classes.couponLink}>
                      Apply
                    </Typography>
                  </Button>
                </div>
              </div>
              <Typography variant="body2" className={classes.couponDescription}>
                {item.shortDesc}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>

      {otherList.length ? (
        <div className={classes.root}>
          <Typography variant="h2" className={classes.heading}>
            Other Coupons
          </Typography>
        </div>
      ) : null}

      <Grid container spacing={2}>
        {otherList?.map((item: any, index: any) => (
          <Grid item xs={12} md={6} key={index}>
            <div className={classes.couponBox}>
              <div className={classes.innerContainer}>
                <div className={classes.imagecontainer}>
                  <img src={Utils.images.COUPON_ICON} alt="coupon_icon" />

                  <div className={classes.couponText}>
                    <Typography variant="h3" className={classes.couponTitle}>
                      {/* BS20 */}
                      {item.couponCode}
                    </Typography>
                    <Typography variant="h6" className={classes.couponPara}>
                      Expires On:{' '}
                      {item.dateTo
                        ? format(new Date(item.dateTo), 'dd MMMM yyyy')
                        : '-'}
                    </Typography>
                  </div>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      // addCoupon({
                      //   CouponCode: `${item.couponCode}`,
                      //   CouponType: `Other Coupon`,
                      //   DiscountValue: `${item.discountAmount}`,
                      //   CouponValidity: `${format(new Date(item.dateTo), "dd MMMM yyyy")}`,
                      //   CouponApplyStatus: "",
                      //   FailureError: "",
                      // })
                      dispatch(
                        validateCoupon(
                          {
                            couponCode: item.couponCode,
                            cartId: cart._id,
                          },
                          () => {
                            history.push({ pathname: '/shopping-bag' });
                          },
                          item
                        )
                      );
                    }}
                    disabled={!item?.isApplicable}
                    className={classes.applyBtn}
                  >
                    <Typography variant="body1" className={classes.couponLink}>
                      Apply
                    </Typography>
                  </Button>
                </div>
              </div>
              <Typography variant="body2" className={classes.couponDescription}>
                {item.shortDesc}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CodeList;
