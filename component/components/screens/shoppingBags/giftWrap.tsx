import { Theme, Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Utils from '../../../utils';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { updateLocalCart } from './action';
import { useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ShoppingListSkeleton from '../../../common/skeletonList/shoppingListSkeleton';
import CustomCheckbox from '../../../common/customCheckbox';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Recoleta Alt`,
    color: 'var(--secondary-black)',
  },

  productDiv: {},
  product: {
    display: 'flex',
    padding: theme.spacing(1.5, 0),
    borderBottom: '1px solid var(--text-color)',
    alignItems: 'stretch',
    // flexWrap: "wrap",
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      // flexWrap: "wrap",
      padding: theme.spacing(1, 0),
    },
  },
  wishlistDiv: {
    display: 'flex',
    cursor: 'pointer',
    padding: theme.spacing(2, 0),
    // borderBottom: "1px solid var(--text-color)",
    alignItems: 'stretch',
    // flexWrap: "wrap",
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1.4, 0),
      borderBottom: '1px solid var(--text-color)',
    },
  },
  leftDiv: {
    display: 'flex',
    alignItems: 'stretch',
    width: '82%',
  },
  imgDiv: {
    backgroundColor: 'var(--light-creame-color)',
    borderRadius: 4,
    padding: theme.spacing(2),
    width: '80px',
    height: '80px',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '25px',
      height: '25px',
      padding: 0,
      backgroundColor: 'transparent',
    },
  },
  img: {},
  wishDiv: {
    alignSelf: 'center',
  },
  detailsDiv: {
    marginLeft: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: "space-between",
  },
  productName: {
    font: `normal ${theme.spacing(1.5)} Work Sans SemiBold`,
    color: 'var(--secondary-black)',
    lineHeight: 1.5,
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.5)} Work Sans SemiBold`,
    },
  },
  productWeight: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.3
    )} Work Sans`,
    color: 'var(--light-gray)',
    marginTop: '6px',
    textTransform: 'capitalize',
    [theme.breakpoints.down('xs')]: {
      // fontSize: "10px",
      font: `normal ${theme.spacing(1.3)} Work Sans Regular`,
    },
  },
  rightDiv: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: "space-between",
    [theme.breakpoints.down(769)]: {
      // flexDirection: "row-reverse",
      // justifyContent: "space-between",
      // width: "100%",
      // alignItems: "center",
      // marginTop: theme.spacing(1),
    },
  },
  wishRightDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

  amount: {
    textAlign: 'right',
  },
  skeleton: {
    marginLeft: theme.spacing(1),
  },
  skeletonContainer: {
    display: 'flex',
  },
  prodImage: {
    // width: "80px",
    // height: "80px",
  },
}));

const GiftWrap: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const history = useRouter();

  const { handleCartSummary } = props;
  const shoppingBagReducer: any = useSelector(
    (state: any) => state.shoppingBagReducer
  );

  const [giftWrap, setGiftWrap] = useState(
    shoppingBagReducer.isOrderWrapped || false
  );

  useEffect(() => {
    setGiftWrap(shoppingBagReducer.isOrderWrapped);
  }, [shoppingBagReducer.isOrderWrapped]);

  const configs: any = useSelector(
    (state: any) => state.configReducer.generalConfigs
  );
  const handleChange = (e: any) => {
    setGiftWrap(e.target.checked);
    let params = {
      cartId: shoppingBagReducer._id,
      isOrderWrapped: e.target.checked,
      giftWrapAmount: giftWrapAmount,
      grandTotal: e.target.checked
        ? shoppingBagReducer.grandTotal + parseFloat(giftWrapAmount)
        : shoppingBagReducer.grandTotal - parseFloat(giftWrapAmount),
    };

    handleCartSummary({ isOrderWrapped: e.target.checked, giftWrapAmount });
    setGiftWrap(e.target.checked);
    dispatch(updateLocalCart(params));
  };

  let giftFree =
    configs?.free_on_total > shoppingBagReducer.cartTotal
      ? configs?.free_on_total - shoppingBagReducer.cartTotal
      : 0;
  let giftWrapAmount = giftFree === 0 ? '0' : configs?.giftwrap_amount;

  const skeletonLoader = useSelector((state: any) => {
    return state.loadingReducer.skeletonLoader;
  });

  return (
    <>
      <div className={classes.productDiv}>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          {skeletonLoader ? (
            <div className={classes.skeletonContainer}>
              <Skeleton width={20} height={30} />
              <Skeleton className={classes.skeleton} width={100} height={30} />
            </div>
          ) : (
            // <Link to={Utils.routes.WISHLIST}>
            <div
              onClick={() =>
                history.push({
                  pathname: `${Utils.routes.WISHLIST}`,
                  // state: { pageName: "My Wishlist" },
                })
              }
            >
              <div className={classes.wishlistDiv}>
                <div className={classes.leftDiv}>
                  <div className={classes.wishDiv}>
                    <Image
                      src={Utils.images.HEART}
                      width={40}
                      height={40}
                      alt="not found"
                    />
                    {/* <HEART /> */}
                  </div>
                  <div className={classes.detailsDiv}>
                    <Typography className={classes.productName}>
                      Add from wishlist
                    </Typography>
                  </div>
                </div>
                <div className={classes.wishRightDiv}>
                  <Image
                    src={Utils.images.ARROW_ICON}
                    width={40}
                    height={40}
                    alt="not found"
                  />

                  {/* <ARROW_ICON /> */}
                </div>
              </div>
            </div>
            // </Link>
          )}
        </Box>
        {skeletonLoader ? (
          <ShoppingListSkeleton sections={[1]} />
        ) : (
          configs?.giftWrapStatus === 1 && (
            <div className={classes.product}>
              <div className={classes.leftDiv}>
                <div className={classes.imgDiv}>
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <img
                      src={Utils.images.GIFT}
                      className={classes.prodImage}
                      alt="product"
                    />
                  </Box>

                  <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <div className={classes.prodImage}>
                      <Image
                        src={Utils.images.GIFT_ICON}
                        width={40}
                        height={40}
                        alt="not found"
                      />

                      {/* <GIFT_ICON /> */}
                    </div>
                  </Box>
                </div>
                <div className={classes.detailsDiv}>
                  <Typography className={classes.productName}>
                    Add a gift wrap for{' '}
                    {giftWrapAmount && Number(giftWrapAmount) !== 0
                      ? `₹${Utils.CommonFunctions.addCommaToAmount(
                          giftWrapAmount
                        )}`
                      : `free`}
                  </Typography>
                  {giftWrapAmount !== '0' ? (
                    <Typography className={classes.productWeight}>
                      Spend ₹{Utils.CommonFunctions.addCommaToAmount(giftFree)}{' '}
                      more to get FREE GIFT WRAP
                    </Typography>
                  ) : null}
                </div>
              </div>
              <div className={classes.rightDiv}>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography
                    className={[classes.productName, classes.amount].join(' ')}
                  >
                    {giftWrapAmount !== '0'
                      ? `₹ ${Utils.CommonFunctions.addCommaToAmount(
                          giftWrapAmount
                        )}`
                      : null}
                  </Typography>
                </Box>

                <CustomCheckbox
                  checked={giftWrap}
                  onChange={(e: any) => handleChange(e)}
                />
              </div>
            </div>
          )
        )}

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {skeletonLoader ? (
            <div className={classes.skeletonContainer}>
              <Skeleton width={20} height={30} />
              <Skeleton className={classes.skeleton} width={100} height={30} />
            </div>
          ) : (
            <Link href={Utils.routes.WISHLIST}>
              <div className={classes.wishlistDiv}>
                <div className={classes.leftDiv}>
                  <div className={classes.wishDiv}>
                    <Image
                      src={Utils.images.HEART}
                      width={40}
                      height={40}
                      alt="not found"
                    />

                    {/* <HEART /> */}
                  </div>
                  <div className={classes.detailsDiv}>
                    <Typography className={classes.productName}>
                      Add from wishlist
                    </Typography>
                  </div>
                </div>
                <div className={classes.wishRightDiv}>
                  <Image
                    src={Utils.images.ARROW_ICON}
                    width={40}
                    height={40}
                    alt="not found"
                  />

                  {/* <ARROW_ICON /> */}
                </div>
              </div>
            </Link>
          )}
        </Box>
      </div>
    </>
  );
};
export default GiftWrap;
