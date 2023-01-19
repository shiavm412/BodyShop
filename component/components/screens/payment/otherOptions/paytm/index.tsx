import {
  Theme,
  FormControlLabel,
  Divider,
  Input,
  Typography,
  InputAdornment,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  sendOtp,
  verifyOtp,
  getWalletBalance,
  revokePaytmWallet,
} from './action';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { PaymentProps } from '../../../../../utils/types';
import Utils from '../../../../../utils';
import GreenRadio from '../../../../../common/customRadio';
import CustomButton from '../../../../../common/button';
import MessageDialog from '../../../../../common/messageDialog';

const useStyles = makeStyles((theme: Theme) => ({
  outerDiv: {
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 0),
    },
  },
  bankDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(2.5, 2),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 1),
    },
  },

  bankNameDiv: {
    margin: 0,
    '& .MuiFormControlLabel-label': {
      marginLeft: theme.spacing(1),
      font: `normal 600 ${theme.spacing(1.6)} Work Sans`,
      color: 'var(--secondary-black)',
      lineHeight: '18px',
      [theme.breakpoints.down('xs')]: {
        font: `normal ${theme.spacing(1.4)} Work Sans SemiBold`,
        letterSpacing: '0.02em',
      },
    },
  },
  divider: {
    backgroundColor: 'transparent',
    border: '1px dashed rgba(178, 178, 178, 0.5)',
    [theme.breakpoints.down('xs')]: {
      border: '1px solid #F8F8F8',
      margin: '0px -6px',
    },
  },

  inputField: {
    height: '54px',
    width: '500px',
    // marginBottom: "15px",
    border: '1px solid #e2e2e2',
    padding: '0px 15px',
    lineHeight: '19px',
    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    '&::before': {
      display: 'none',
    },
    '&::after': {
      display: 'none',
    },
    '& .MuiOutlinedInput-root': {
      border: '1px solid var(--border-color)',
      borderRadius: '2px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '15px 14px',
      [theme.breakpoints.down('xs')]: {
        font: `normal  ${theme.spacing(1.2)} Work Sans Medium`,
      },
    },
    '&::-webkit-input-placeholder': {
      font: `normal  ${theme.spacing(1.5)} Work Sans`,
      color: 'var(--light-gray-text)',
      fontWeight: 500,
      [theme.breakpoints.down('xs')]: {
        font: `normal ${theme.spacing(1.6)} Work Sans Medium !important`,
      },
    },
    [theme.breakpoints.down('sm')]: {
      width: '-webkit-fill-available',
    },
  },
  codDiv: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: "center",
    justifyContent: 'space-between',
    margin: theme.spacing(2.5, 2, 1.5, 2),
    '& .MuiTypography-body1': {
      font: `normal 600 ${theme.spacing(1.6)} Work Sans`,
      padding: theme.spacing(1, 0),
    },
    '& .MuiTypography-body2': {
      font: `normal 500 ${theme.spacing(1.4)} Work Sans Medium`,
      padding: theme.spacing(2, 0, 1, 0),
      opacity: 0.9,
      color: 'var(--secondary-black)',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      padding: theme.spacing(0, 1.8, 1, 1.8),
      margin: '0px',
    },
  },
  btnSubmit: {
    borderRadius: '4px',
    width: 'auto',
    padding: '15px 50px !important',
    // marginTop: theme.spacing(-1.2),
    marginRight: theme.spacing(1.0),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: theme.spacing(0),
      marginLeft: theme.spacing(0),
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: theme.spacing(0),
      marginLeft: theme.spacing(0),
      padding: '15px 50px !important',
      font: `normal ${theme.spacing(1.4)} Work Sans Medium !important`,
    },
  },
  btnSubmitContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '45%',
    },
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
  },
  delinkBtn: {
    width: theme.spacing(15),
    // marginTop: theme.spacing(-1.2),
    // marginRight: theme.spacing(1.0),
    '& .MuiButton-outlinedPrimary': {
      color: 'var(--delet-color)',
      borderColor: 'var(--delet-color)',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: theme.spacing(0),
      marginLeft: theme.spacing(0),
    },
  },
  delink: {
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans Medium !important`,
    },
  },
  codInnerDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'baseline',
    },
  },

  textHeading: {
    font: `normal ${theme.spacing(1.3)} Work Sans`,
    fontWeight: 500,
    lineHeight: '15px',
    color: 'var(--light-gray)',
    margin: theme.spacing(0, 0, 1.5, 2.5),
  },
  link: {
    color: '#044236',
    font: `normal 600 ${theme.spacing(1.4)} Work Sans`,
    lineHeight: '16px',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.2)} Work Sans SemiBold !important`,
    },
  },
  paytmInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    '&  .MuiTypography-body1': {
      font: 'normal  600 18px  Work Sans SemiBold',
      lineHeight: '21px',
      color: 'var(--secondary-black)',
    },
    '&  .MuiTypography-body2': {
      font: 'normal  500 14px  Work Sans',
      lineHeight: '16px',
      color: 'var(--secondary-black)',
      padding: 0,
    },
    '&  .MuiTypography-caption': {
      font: 'normal  500 14px  Work Sans Medium',
      lineHeight: '20px',
      color: '#59A85C',
    },
  },
  greyedOut: {
    '& .MuiFormControlLabel-label': {
      color: 'grey !important',
    },
  },
  linkPaytm: {
    [theme.breakpoints.down('xs')]: {
      font: 'normal 17px  Work Sans Bold !important',
      letterSpacing: '0.02em',
    },
  },
  mobileLabel: {
    [theme.breakpoints.down('xs')]: {
      font: 'normal 13px  Work Sans Medium !important',
      letterSpacing: '0.02em',
    },
  },
  walletBalance: {
    [theme.breakpoints.down('xs')]: {
      font: 'normal 12px  Work Sans Regular !important',
      letterSpacing: '0.02em',
    },
  },
  walletAmount: {
    [theme.breakpoints.down('xs')]: {
      font: 'normal 13px  Work Sans SemiBold !important',
      letterSpacing: '0.02em',
    },
  },
  mobile: {
    [theme.breakpoints.down('xs')]: {
      font: 'normal 13px  Work Sans SemiBold !important',
      letterSpacing: '0.02em',
    },
  },
}));

const PayTm = ({
  paymentMode,
  setPaymentMode,
  section,
  setProceedToPay,
  disablePaymentOptions,
  flag,
  setBtnText,

  handleCartSummary,
}: PaymentProps) => {
  const classes = useStyles();
  const [otp, setOtp] = useState<any>('');
  const [mobileNo, setMobileNo] = useState('');
  const [mobileErr, setMobileErr] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [delinkPopUp, setDelinkPopUp] = useState(false);
  const [paytmMoney, setPaytmMoney] = useState(0);
  const deviceId = Utils.CommonFunctions.getCookie('deviceId');

  const dispatch = useDispatch();
  // const configs = useSelector(
  //   (state: ReducersModal) => state.configReducer.generalConfigs
  // );
  // const checkoutAddressId = useSelector(
  //   (state: ReducersModal) => state.addressReducer.checkoutAddressId
  // )
  const cart: any = useSelector((state: any) => state.shoppingBagReducer);
  const eCardSummary: any = useSelector(
    (state: any) => state.giftReducer.eCardSummary
  );
  const user: any = useSelector(
    (state: any) => state.userDetailReducer?.userInfo
  );

  const [showCTA, setShowCTA] = useState(user?.paytm?.mobileNo ? true : false);
  let amount =
    section === 'egift' ? eCardSummary?.grandTotal : cart?.grandTotal;
  const greyed =
    (flag === 'retry' && paymentMode !== 'paytm') ||
    (flag !== 'retry' && disablePaymentOptions);

  const getSetWalletBalance = (total?: any) => {
    if (paymentMode !== 'paytm') {
      dispatch({ type: 'reset-transaction' });
      setBtnText && setBtnText('Proceed To Pay');
    }

    if (user?.paytm?.mobileNo && paymentMode === 'paytm') {
      // dispatch(showLoader());
      getWalletBalance({
        amount: `${total ? total : cart?.grandTotal}`,
      })
        .then((resp: any) => {
          if (resp) {
            let data = resp?.data?.data;
            let walletAmount = (
              Math.round(data?.body?.payOptions?.[0]?.amount * 100) / 100
            ).toFixed(2);
            // Utils.CommonFunctions.decimalFlat(
            //   data?.body?.payOptions?.[0]?.amount,
            //   2
            // );
            if (!data?.body?.payOptions?.[0]?.fundSufficient && setBtnText) {
              const value = Number(amount) - Number(walletAmount);
              // setBtnText('Add Money and Pay')
              setBtnText(
                `Add ₹${Utils.CommonFunctions.decimalFlat(
                  value,
                  // amount-walletAmount,
                  2
                )} and Pay`
              );
            }

            if (
              !data?.body?.payOptions?.[0]?.fundSufficient &&
              !data?.body?.payOptions?.[0]?.addMoneyAllowed
            ) {
              setProceedToPay(true);
            } else {
              setProceedToPay(false);
            }

            dispatch({
              type: 'init-transaction',
              payload: { paytm: data?.body?.payOptions?.[0] },
            });
            let wAmt = Utils.CommonFunctions.decimalFlat(
              data?.body?.payOptions?.[0]?.amount,
              2
            );
            setPaytmMoney(wAmt);
            setShowCTA(true);
            // dispatch(hideLoader());
          }
        })
        .catch((err: any) => {
          // dispatch(hideLoader());
          setShowCTA(false);
          setPaytmMoney(0);
          setProceedToPay(true);
          setOtpSent(false);
          setOtp('');
          setMobileNo('');
          setMobileErr(false);
          dispatch({
            type: 'updateUserProfile',
            payload: {
              userInfo: {
                paytm: {
                  mobileNo: 0,
                },
              },
            },
          });
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message:
                err?.response?.data?.message?.msg ??
                err?.response?.data?.message,
            },
          });
        });
    } else if (!user?.paytm?.mobileNo && paymentMode === 'paytm') {
      setProceedToPay(true);
    }
    setOtp('');
    setMobileNo('');
    setMobileErr(false);
    setOtpSent(false);
    setPaytmMoney(0);
  };

  useEffect(() => {
    if (paymentMode !== 'paytm') {
      dispatch({ type: 'reset-transaction' });
      setBtnText && setBtnText('Proceed To Pay');
    }
    if (paymentMode === 'paytm') {
      // const totalAvailablePoints = rewardData?.AvailablePoints &&
      //   Number(rewardData?.AvailablePoints) > 0
      //   ? Number(rewardData?.AvailablePoints)
      //   : 0;
      // const pointRate = rewardData?.PointRate ? Number(rewardData.PointRate) : 0;
      // handleUpdateCartSummary(cart, checkoutAddressId, configs, 2, null,
      //    walletBalance, totalAvailablePoints, pointRate, "paytm", getSetWalletBalance);
      if (handleCartSummary && cart?.offerId && cart.offerId !== '')
        handleCartSummary(getSetWalletBalance);
      else getSetWalletBalance();
    }
    setOtp('');
    setMobileNo('');
    setMobileErr(false);
    setOtpSent(false);
    setPaytmMoney(0);
  }, [paymentMode]);

  const handleClick = () => {
    setPaymentMode('paytm');
    // setProceedToPay(true)
  };

  const sendPaytmOtp = () => {
    // dispatch(showLoader());
    sendOtp({
      mobileNo,
      deviceId,
    })
      .then((_resp) => {
        // dispatch(hideLoader());
        setOtp('');
        setOtpSent(true);
        dispatch({
          type: 'show-alert',
          payload: {
            type: 'success',
            message: 'OTP sent successfully',
          },
        });
      })
      .catch((err) => {
        // dispatch(hideLoader());
        dispatch({
          type: 'show-alert',
          payload: {
            type: 'error',
            message:
              err?.response?.data?.message?.resultMsg ||
              err?.response?.data?.message,
          },
        });
      });
  };

  const verifyPaytmOtp = () => {
    // dispatch(showLoader());
    verifyOtp({
      amount: `${amount}`,
      otp,
      deviceId,
    })
      .then((resp) => {
        let data = resp?.data?.data;
        let walletAmount = (
          Math.round(data?.body?.payOptions?.[0]?.amount * 100) / 100
        ).toFixed(2);
        //  let walletAmount =    Utils.CommonFunctions.decimalFlat(
        //   Number(data?.body?.payOptions?.[0]?.amount || 0),
        //   2
        // );
        if (!data?.body?.payOptions?.[0]?.fundSufficient && setBtnText) {
          const value = Number(amount) - Number(walletAmount);
          setBtnText(
            `Add ₹${Utils.CommonFunctions.decimalFlat(
              value,
              // Number(amount) - Number(walletAmount),
              2
            )} and Pay`
          );
        } else {
          setBtnText && setBtnText('Proceed To Pay');
        }
        if (
          !data?.body?.payOptions?.[0]?.fundSufficient &&
          !data?.body?.payOptions?.[0]?.addMoneyAllowed
        ) {
          setProceedToPay(true);
        } else {
          setProceedToPay(false);
        }
        dispatch({
          type: 'updateUserProfile',
          payload: {
            userInfo: {
              paytm: {
                mobileNo,
              },
            },
          },
        });
        dispatch({
          type: 'init-transaction',
          payload: { paytm: data?.body?.payOptions?.[0] },
        });
        let wAmt = Utils.CommonFunctions.decimalFlat(
          data?.body?.payOptions?.[0]?.amount,
          2
        );
        setPaytmMoney(wAmt);
        setShowCTA(true);
        // dispatch(hideLoader());
      })
      .catch((err) => {
        // dispatch(hideLoader());

        dispatch({
          type: 'show-alert',
          payload: {
            type: 'error',
            message: err?.response?.data?.message,
          },
        });
      });
  };

  const revokePaytm = () => {
    // dispatch(showLoader());

    revokePaytmWallet()
      .then((_resp: any) => {
        // dispatch(hideLoader());
        setShowCTA(false);
        setPaytmMoney(0);
        setProceedToPay(true);
        setOtpSent(false);
        setOtp('');
        setMobileNo('');
        setMobileErr(false);
        setDelinkPopUp(false);
        setBtnText && setBtnText('Proceed To Pay');
        dispatch({
          type: 'updateUserProfile',
          payload: {
            userInfo: {
              paytm: {
                mobileNo: 0,
              },
            },
          },
        });
      })
      .catch((err: any) => {
        // dispatch(hideLoader());
        setShowCTA(false);
        setDelinkPopUp(false);
        setPaytmMoney(0);
        setProceedToPay(true);
        setOtpSent(false);
        setOtp('');
        setMobileNo('');
        setMobileErr(false);
        setBtnText && setBtnText('Proceed To Pay');
        dispatch({
          type: 'updateUserProfile',
          payload: {
            userInfo: {
              paytm: {
                mobileNo: 0,
              },
            },
          },
        });
        dispatch({
          type: 'show-alert',
          payload: {
            type: 'error',
            message: err?.response?.data?.message,
          },
        });
      });
  };

  return (
    <>
      <div className={classes.outerDiv}>
        <Divider className={classes.divider} />
        <div id="paytm_wallet"></div>
        <div className={classes.bankDiv}>
          <FormControlLabel
            className={
              greyed
                ? clsx(classes.bankNameDiv, classes.greyedOut)
                : classes.bankNameDiv
            }
            control={
              <GreenRadio
                value={'paytm'}
                checked={
                  (paymentMode === 'paytm' && !disablePaymentOptions) ||
                  (flag === 'retry' && paymentMode === 'paytm')
                }
                name="radio-button-paytm"
                onClick={() => handleClick()}
                disabled={disablePaymentOptions && paymentMode !== 'paytm'}
              />
            }
            value="paytm"
            label={'Paytm'}
          />
        </div>
        {/* {paymentMode === "paytm" && !disablePaymentOptions ?  */}
        {(paymentMode === 'paytm' && !disablePaymentOptions) ||
        (paymentMode === 'paytm' && flag === 'retry') ? (
          <>
            {showCTA ? (
              <div className={classes.codDiv}>
                <div className={classes.codInnerDiv}>
                  <div className={classes.paytmInfo}>
                    <Typography variant="body2">Mobile Number</Typography>
                    <Typography variant="body1" className={classes.mobile}>
                      {user?.paytm?.mobileNo && user?.paytm?.mobileNo !== 0
                        ? user?.paytm?.mobileNo
                        : mobileNo}
                    </Typography>
                  </div>
                  <div className={classes.paytmInfo}>
                    <Typography
                      variant="caption"
                      className={classes.walletBalance}
                    >
                      Available Wallet Balance
                    </Typography>
                    <Typography
                      variant="body1"
                      className={classes.walletAmount}
                    >
                      ₹{paytmMoney}
                    </Typography>
                  </div>
                </div>

                <div className={classes.delinkBtn}>
                  <CustomButton
                    type="button"
                    fullWidth
                    variant="outlined"
                    text={'Delink Paytm'}
                    onClick={() => setDelinkPopUp(true)}
                    className={classes.delink}
                  />
                  <MessageDialog
                    heading={'Delink Paytm'}
                    cancelText={'Cancel'}
                    okText={'Delink'}
                    open={delinkPopUp}
                    onOk={revokePaytm}
                    handleClose={() => setDelinkPopUp(false)}
                    message={'Are you sure you want to delink paytm wallet?'}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className={classes.codDiv}>
                  <Typography variant="body1" className={classes.linkPaytm}>
                    Link Paytm Wallet
                  </Typography>
                  <Typography variant="body2" className={classes.mobileLabel}>
                    Enter Mobile Number
                  </Typography>
                  <Input
                    id="standard-start-adornment"
                    placeholder="Enter mobile no. here"
                    type="number"
                    className={classes.inputField}
                    startAdornment={
                      mobileNo !== '' && (
                        <InputAdornment position="start">+91 | </InputAdornment>
                      )
                    }
                    onChange={(e: any) => {
                      Utils.regex.onlyNumberRegex.test(e?.target?.value)
                        ? setMobileErr(false)
                        : setMobileErr(true);
                      setMobileNo(e?.target?.value);
                      setOtpSent(false);
                    }}
                    value={mobileNo}
                    renderSuffix={() => {
                      return (
                        !mobileErr &&
                        mobileNo && (
                          <Typography
                            className={classes.link}
                            onClick={sendPaytmOtp}
                          >
                            {otpSent ? `RESEND` : `VERIFY`}
                          </Typography>
                        )
                      );
                    }}
                    onInput={(e: any) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
                    }}
                  />

                  {otpSent && (
                    <>
                      <Typography
                        variant="body2"
                        className={classes.mobileLabel}
                      >
                        6 Digit OTP
                      </Typography>
                      <Input
                        id="standard-start-adornment"
                        placeholder="Enter OTP here"
                        className={classes.inputField}
                        onChange={(e: any) => {
                          setOtp(e?.target?.value);
                        }}
                        value={otp}
                      />
                    </>
                  )}
                  {mobileErr && (
                    <Typography color="error">
                      Please enter the valid Phone Number
                    </Typography>
                  )}

                  <div className={classes.btnContainer}>
                    <div className={classes.btnSubmitContainer}>
                      <CustomButton
                        type="submit"
                        color="primary"
                        fullWidth={false}
                        variant="outlined"
                        text={'Cancel'}
                        onClick={() => setPaymentMode('')}
                        className={classes.btnSubmit}
                      />
                    </div>
                    <div className={classes.btnSubmitContainer}>
                      <CustomButton
                        type="submit"
                        color="primary"
                        fullWidth={false}
                        variant="contained"
                        text={'Continue'}
                        onClick={verifyPaytmOtp}
                        disabled={!otp}
                        className={classes.btnSubmit}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : null}
      </div>
    </>
  );
};

export default PayTm;
