import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Gift from './giftCard';
import OtherOptions from './otherOptions';
import YourCard from './cards';
import Rewards from './rewards';
import { useEffect, useState } from 'react';
import BankOffer from '../shoppingBags/bankOffer';
import Wallet from './wallet';
import { getWalletBalance, rewardBlock, rewardUnBlock } from './action';
import { useDispatch, useSelector } from 'react-redux';
import { PaymentProps } from '../../../utils/types';
// import { hideLoader, showLoader } from "../home/actions";
import { getNetbankingBanks } from './razorpay';
// import events from "../../utils/event/constant";
// import { screenViewed } from "../../utils/event/action";
// import { updateCartSummary } from "../shoppingBags/action";
// import { ReducersModal } from "../../models";
import { getRewardRate } from '../productDetail/action';
import _ from 'lodash';
// import { useLocation } from "react-router-dom";
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { screenViewed } from '../../../utils/event/action';
import events from '../../../utils/event/constant';
import { updateCartSummary } from '../shoppingBags/action';
import Loader from '../../../common/loader';

const useStyles = makeStyles((theme: Theme) => ({
  paymentBalance: {
    backgroundColor: 'var(--white)',
    boxShadow: 'var(--box-shadow-div)',
    padding: theme.spacing(1.5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0),
      boxShadow: 'none',
      margin: theme.spacing(0, -1.2, 4, -1.2),
    },
  },
  walletBalanceDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid var(--border-color)',
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.7),
    },
  },
  contentDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  walletAndAvailableBalanceDiv: {
    marginLeft: theme.spacing(1),
  },
  walletBalance: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Work Sans`,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
  },
  availableBalance: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.5
    )} Work Sans`,
    color: theme.palette.primary.main,
    lineHeight: '24px',
  },
}));

const PaymentOptions = ({
  flag,
  section,
  setProceedToPay,
  paymentMode,
  setPaymentMode,
  disablePaymentOptions,
  setBank,
  onSubmit,
  setBtnText,
  setVpa,
  vpa,
  setSelectedCard,
  selectedCard,
  setPaymentMethodId,
  onRetry,
}: PaymentProps) => {
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const location = useRouter();
  // const [invokeRewardsChecked, setInvokeRewardsChecked] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState<any>([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [rewardBalance, setRewardBalance] = useState(0);
  const [rewardChecked, setRewardChecked] = useState(false);
  const [walletChecked, setWalletChecked] = useState(false);
  const [callRewardData, setCallRewardData] = useState(false);
  const [callWalletBalance, setCallWalletBalance] = useState(false);
  const [loader, setLoader] = useState(false);
  const cartData: any = useSelector((state: any) => state.shoppingBagReducer);
  const [pointDetails, setPointDetails] = useState<any>({
    ...cartData.pointDetails,
  });
  const [data, setCartData] = useState<any>(cartData);

  const [rewardData, setRewardData] = useState<any>({});
  const isMembershipAdded = useSelector(
    (state: any) => state.shoppingBagReducer?.isMembershipAdded
  );

  const paymentOptions =
    useSelector(
      (state: any) => state.configReducer.paymentConfigs?.paymentOptions
    ) || [];
  const checkoutAddressId = useSelector(
    (state: any) => state.addressReducer.checkoutAddressId
  );
  // const configs = useSelector(
  //   (state: any) => state.configReducer.generalConfigs
  // );

  /* called when rewards is checked **/
  const onRewardsChecked = (wallet: boolean, reward: boolean) => {
    const totalPoints =
      rewardData?.AvailablePoints && Number(rewardData?.AvailablePoints) > 0
        ? Number(rewardData?.AvailablePoints)
        : 0;
    if (totalPoints > 0 && data?.isPointsBlocked === false) {
      const payload = {
        grandTotal:
          !wallet && reward ? data?.totalWithoutWallet : data.grandTotal,
        totalAvailablePoints: totalPoints,
        pointRate: rewardData?.PointRate ? Number(rewardData.PointRate) : 0,
      };
      // dispatch(showLoader());
      dispatch(
        rewardBlock(payload, () => {
          setRewardChecked(true);
          handleCartSummary(wallet, reward, null);
          // dispatch(hideLoader());
        })
      );
    } else if (totalPoints >= 0 && data?.isPointsBlocked === true) {
      setRewardChecked(true);
      setProceedToPay(false);

      // handleCartSummary(wallet, reward)
    }
  };

  /* called when rewards is unchecked **/
  const onRewardsUnChecked = (walletCheck: boolean, callBack?: Function) => {
    // dispatch(showLoader());
    // const pointDetails = data?.pointDetails || {}
    const payload = {
      billNumber: pointDetails?.billNumber ? pointDetails.billNumber : '',
      redemptionDate: pointDetails?.redemptionDate
        ? pointDetails.redemptionDate
        : '', // "30 Jan 2022"
    };
    dispatch(
      rewardUnBlock(payload, (_resp: any) => {
        // dispatch(hideLoader())
        setRewardChecked(false);
        handleCartSummary(walletCheck, false, null, false, callBack);
      })
    );
  };

  const onRewardsChange = (value: boolean) => {
    if (value) {
      // if wallet is checked but still grand total is not zero then rewards can be clicked.
      // But if rewards balance is greater than or equal to the total cart balance then deselect wallet  and keep rewards checked
      if (
        // rewardBalance >= data?.cartTotal
        rewardBalance >= data?.totalWithoutWallet
      ) {
        setWalletChecked(false); //uncomment
        onRewardsChecked(false, true); //uncomment
        setPaymentMode('reward'); //reward and wallet = wallet;
      } else if (walletChecked && rewardBalance > data?.grandTotal) {
        handleCartSummary(false, false, null, true);
        // onRewardsChecked(false,true)
      } else {
        setPaymentMode(walletChecked ? 'wallet' : 'reward');
        onRewardsChecked(walletChecked, true);
      }
    } else {
      onRewardsUnChecked(walletChecked);
      setPaymentMode(!walletChecked ? undefined : 'wallet');
    }
  };

  const onWalletChange = (value: boolean) => {
    setWalletChecked(value);
    if (section === 'mybag') {
      if (value) {
        // if reward is checked but still grand total is not zero then rewards can be clicked.
        // But if wallet balance is greater than or equal to the total cart balance then deselect rewards and keep wallet checked.
        // if (
        //    walletBalance >= data?.totalWithoutWallet
        // ) {
        //   setRewardChecked(false);
        //   if (rewardChecked) {
        //     onRewardsUnChecked(true)
        //   } else {
        //     handleCartSummary(true, false);
        //   }
        // } else {
        handleCartSummary(true, rewardChecked, null);
        // }
      } else {
        // suppose wallet is checked and rewards is checked reward balance is 500 but 100 is blocked  and wallet balance is 400 and 400 is used for payment
        // now when you uncheck wallet u need to update reward block api to consume the remaining reward points as well otherwise it will show only  100 as blocked where total rewards is 500.
        // rewardsUncheckAndCheck()
        handleCartSummary(false, rewardChecked, null);
      }
    }
    setPaymentMode(
      value ? 'wallet' : !value && rewardChecked ? 'reward' : undefined
    );
  };

  useEffect(() => {
    setCartData({ ...cartData, pointDetails: { ...cartData.pointDetails } });
    setPointDetails({ ...cartData.pointDetails });
  }, [cartData]);

  useEffect(() => {
    if (location.pathname === '/shopping-bag/payment') {
      localStorage?.setItem('prevPath', location.pathname);
    }

    // dispatch(getConfig({ configCode: "payment" }));
    window.scrollTo(0, 0);
    if (
      //@ts-ignore
      (section === 'mybag' || section === 'gift-box') &&
      flag !== 'retry' &&
      flag !== 'convertToCod'
    ) {
      if (!isMembershipAdded) {
        setCallRewardData(true);
        setCallWalletBalance(true);
        // getRewardData();
      } else {
        setRewardData({ AvailablePoints: '0' });
        // getBalance();
        setCallWalletBalance(true);
      }
    }
    // else if (section === "membership")
    //   setCallWalletBalance(true)

    // getBalance();
    getNetbankingBanks()
      .then((response: any) => {
        setPaymentMethods(response?.data?.data || []);
      })
      .catch((_error) => {});
    /**
     * Event logger
     */
    screenViewed({
      ScreenName: events.SCREEN_PAYMENT,
      CTGenerated: 'WEB',
    });
  }, []);

  useEffect(() => {
    if (callRewardData) getRewardData();
  }, [callRewardData && pointDetails?.billNumber]);

  useEffect(() => {
    if (callWalletBalance) getBalance();
  }, [callWalletBalance && data]);

  /* only when reward data changes, will be called only once after getRewardData */
  useEffect(() => {
    if (!isMembershipAdded) {
      if (
        rewardData?.AvailablePoints &&
        Number(rewardData?.AvailablePoints) > 0
      ) {
        // dispatch(showLoader());
        onRewardsChecked(false, true);
        setPaymentMode('reward');
        setWalletChecked(false);
      }
      setRewardBalance(
        rewardData?.PointValue ? Number(rewardData.PointValue) : 0
      );
    }
    // else if(data?.isPointsBlocked&&rewardData?.AvailablePoints &&
    //   Number(rewardData?.AvailablePoints) <= 0){
    //     onRewardsUnChecked(false)
    //   }
  }, [rewardData?.AvailablePoints, callRewardData === false]);

  useEffect(() => {
    if (
      (!rewardData?.AvailablePoints ||
        Number(rewardData?.AvailablePoints) <= 0) &&
      walletBalance
    ) {
      handleCartSummary(true, false, null);
      setWalletChecked(true);
      setPaymentMode('wallet');
    }
  }, [
    walletBalance &&
      (Number(rewardData?.AvailablePoints <= 0) ||
        !rewardData?.AvailablePoints),
  ]);

  useEffect(() => {
    const rewardVisibility =
      (!rewardData?.AvailablePoints ||
        rewardData?.AvailablePoints === '0' ||
        (rewardData?.AvailablePoints &&
          Number(rewardData?.AvailablePoints) <= 0)) &&
      data?.isPointsBlocked === false;
    if (rewardVisibility && (walletBalance === 0 || !walletBalance)) {
      setProceedToPay(true);
    }
  }, [rewardData?.AvailablePoints, walletBalance]);

  const getRewardData = () => {
    if (showMode('rewards')) {
      setLoader(true);
      dispatch(
        getRewardRate((resp: any) => {
          if (resp) {
            // dispatch(hideLoader())
            if (
              cartData?.isPointsBlocked &&
              resp?.AvailablePoints &&
              Number(resp?.AvailablePoints) <= 0
            ) {
              onRewardsUnChecked(false, () => {
                setCallRewardData(false);
                getRewardData();
              });
            } else {
              setCallRewardData(false);
              setRewardData(resp);
              setRewardBalance(resp?.PointValue ? Number(resp.PointValue) : 0);
            }
          }
          setLoader(false);
        })
      );
    }
  };

  const getBalance = () => {
    if (showMode('wallet')) {
      // dispatch(showLoader());
      // setLoader(true)
      setCallWalletBalance(false);

      dispatch(
        getWalletBalance((resp: any) => {
          // dispatch(hideLoader());
          if (resp) {
            setWalletBalance(resp?.totalAmount || 0);
            setCallWalletBalance(false);
          }
          // setLoader(false)
        })
      );
    }
  };

  const handleCartSummary = (
    wallet: boolean,
    reward: boolean,
    bankOffer: any,
    callRewardsChecked?: boolean,
    getPaytmWalletBalance?: Function
  ) => {
    // dispatch(showLoader());
    let payload: any = {
      cartId: data._id,
      donation: data.donation,
      productDiscount: Math.abs(data.productDiscount),
      isWhatsAppConsent: data.isWhatsAppConsent,
      addressId: checkoutAddressId ?? '',
      isOrderWrapped: data.isOrderWrapped,
      walletAmount: wallet ? walletBalance : 0,
      totalAvailablePoints:
        rewardData?.AvailablePoints &&
        reward &&
        Number(rewardData?.AvailablePoints) > 0
          ? Number(rewardData?.AvailablePoints)
          : 0,
      pointRate:
        rewardData?.PointRate && reward ? Number(rewardData.PointRate) : 0,
      isPaymentScreen: true,

      // shipping:{
      //   shippingType:data?.shipping?.shippingType,
      //   shippingFee:data?.shipping?.shippingFee||0
      // }
    };
    const shippingData =
      typeof window !== 'undefined' && sessionStorage.getItem('shipping')
        ? JSON.parse(sessionStorage.getItem('shipping') ?? '')
        : data?.shipping;

    if (shippingData?.shippingType) {
      payload.shipping = shippingData;
    }
    //   payload.shipping.shippingFee =
    //     data?.shipping?.shippingType ===
    //       Utils.constants.shippingType.STANDARD &&
    //       configs?.free_shipping_amount <= data?.grandTotal
    //       ? 0
    //       : parseInt(data?.shipping?.shippingFee ?? 0);
    // }
    //@ts-ignore
    if (
      //@ts-ignore
      (section === 'mybag' || section === 'gift-box') &&
      flag !== 'retry' &&
      bankOffer &&
      data?.grandTotal >= bankOffer?.minimumOrderAmount
    ) {
      payload.offerId = bankOffer?._id;
    }
    // if ((!wallet || !reward) && setBankOffer) {
    //   setBankOffer(null)
    // }
    if (section === 'mybag') {
      dispatch(
        updateCartSummary(payload, (resp: any) => {
          // setRewardBlock(resp?.isPointsBlocked);
          // if (resp?.walletAmount >= resp?.grandTotal) {
          setPointDetails({ ...resp.pointDetails });
          if (callRewardsChecked) {
            onRewardsChecked(false, true);
            setWalletChecked(false);
          } else {
            // dispatch(hideLoader());
          }
          if (resp?.grandTotal === 0) {
            setProceedToPay(false);
          } else {
            setProceedToPay(true);
          }
          if (getPaytmWalletBalance) getPaytmWalletBalance();
        })
      );
      //@ts-ignore
    } else if (section === 'gift-box') {
      // dispatch(hideLoader());
    }
  };
  const showMode = (code: string, options?: any) => {
    const option = options ? options : paymentOptions;
    const data =
      option?.length > 0
        ? _.find(option, {
            code,
          })
        : false;
    return data ? true : false;
  };

  //   code: "razorpay"
  // }))
  const rewardVisibility =
    (!rewardData?.AvailablePoints ||
      rewardData?.AvailablePoints === '0' ||
      (rewardData?.AvailablePoints &&
        Number(rewardData?.AvailablePoints) <= 0)) &&
    data?.isPointsBlocked === false;
  let deliveryData: any =
    typeof window !== 'undefined' && sessionStorage.getItem('deliveryData');
  deliveryData =
    deliveryData && deliveryData !== '' ? JSON.parse(deliveryData) : {};

  return (
    <>
      <Loader show={loader} />
      <div className={classes.paymentBalance}>
        {showMode('rewards') &&
          //@ts-ignore
          (section === 'mybag' || section === 'gift-box') &&
          !isMembershipAdded &&
          flag !== 'retry' &&
          flag !== 'convertToCod' && (
            <Rewards
              rewardVisibility={rewardVisibility}
              disablePaymentOptions={disablePaymentOptions}
              setPaymentMode={setPaymentMode}
              rewardData={rewardData}
              walletChecked={walletChecked}
              setRewardChecked={onRewardsChange}
              rewardChecked={rewardChecked}
              walletBalance={walletBalance}
              // setProceedToPay={setProceedToPay}
              // paymentMode={paymentMode} setPaymentMode={setPaymentMode}
            />
          )}
        {showMode('wallet') &&
          //@ts-ignore
          (section === 'mybag' || section === 'gift-box') &&
          flag !== 'retry' &&
          flag !== 'convertToCod' && (
            <Wallet
              setRewardChecked={onRewardsChange}
              disablePaymentOptions={disablePaymentOptions}
              walletChecked={walletChecked}
              rewardBalance={rewardBalance}
              rewardChecked={rewardChecked}
              setWalletChecked={onWalletChange}
              walletBalance={walletBalance}
              setProceedToPay={setProceedToPay}
              paymentMode={paymentMode}
              setPaymentMode={setPaymentMode}
            />
          )}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          {section == 'mybag' && !isMembershipAdded && (
            <BankOffer showTerms={true} />
          )}
        </Box>
        {showMode('razorpay') &&
        ((section === 'mybag' && deliveryData?.isPrepaid) ||
          section !== 'mybag' ||
          flag === 'retry' ||
          flag == 'convertToCod') ? (
          <YourCard
            section={section}
            walletChecked={walletChecked}
            rewardChecked={rewardChecked}
            handleCartSummary={(cardOffers: any) => {
              if (
                //@ts-ignore
                (section === 'mybag' || section === 'gift-box') &&
                flag !== 'retry' &&
                data?.offerId
              )
                handleCartSummary(walletChecked, rewardChecked, cardOffers);
              else if (flag === 'retry' && onRetry && data?.offerId) {
                // dispatch(showLoader());
                onRetry(cardOffers?._id);
              }
            }}
            handleCardCartSummary={(cardOffers: any) => {
              const selected =
                // selecting card for the first time and grandtotal is greater or equal to minimumorderaccount, only then call summary with offerid else do not initiate the process
                (!data?.offerId &&
                  cardOffers?.minimumOrderAmount &&
                  data?.grandTotal >= cardOffers?.minimumOrderAmount) ||
                // already selected card && next selection of card does not have offer then call summary with null
                (data?.offerId && !cardOffers?.minimumOrderAmount) ||
                // already slected && next selection of card  has offer then call summary with null or offer id based on data?.grandTotal >= cardOffers?.minimumOrderAmount)
                (data?.offerId &&
                  cardOffers?._id &&
                  data?.offerId !== cardOffers?._id);
              // &&
              //   ((data?.offerId && !cardOffers?._id) || (!data?.offerId && cardOffers?._id) || (data?.offerId && cardOffers?._id && data?.offerId !== cardOffers?._id))
              if (
                //@ts-ignore
                (section === 'mybag' || section === 'gift-box') &&
                flag !== 'retry' &&
                selected
              ) {
                handleCartSummary(walletChecked, rewardChecked, cardOffers);
              } else if (
                //@ts-ignore
                (section === 'mybag' || section === 'gift-box') &&
                flag === 'retry' &&
                onRetry &&
                selected
              ) {
                // dispatch(showLoader());
                onRetry(cardOffers?._id);
              }
            }}
            setPaymentMethodId={setPaymentMethodId}
            selectedCard={selectedCard}
            setProceedToPay={setProceedToPay}
            setSelectedCard={setSelectedCard}
            paymentMode={paymentMode}
            onSubmit={onSubmit}
            disablePaymentOptions={disablePaymentOptions}
            setPaymentMode={setPaymentMode}
            flag={flag}
          />
        ) : null}
        <OtherOptions
          showMode={showMode}
          handleCartSummary={(getPaytmWalletBalance?: Function) => {
            if (
              //@ts-ignore
              (section === 'mybag' || section === 'gift-box') &&
              flag !== 'retry'
            )
              handleCartSummary(
                walletChecked,
                rewardChecked,
                null,
                false,
                getPaytmWalletBalance
              );
          }}
          walletBalance={walletBalance}
          rewardData={rewardData}
          setVpa={setVpa}
          vpa={vpa}
          setBtnText={setBtnText}
          section={section}
          flag={flag}
          setBank={setBank}
          paymentMethods={paymentMethods}
          disablePaymentOptions={disablePaymentOptions}
          setProceedToPay={setProceedToPay}
          paymentMode={paymentMode}
          setPaymentMode={setPaymentMode}
          deliveryData={deliveryData}
        />
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {section == 'mybag' && !isMembershipAdded && (
            <BankOffer showTerms={true} />
          )}
        </Box>
        {section == 'mybag' && flag !== 'retry' && flag !== 'convertToCod' && (
          <Gift getBalance={getBalance} />
        )}
      </div>
    </>
  );
};

export default PaymentOptions;
