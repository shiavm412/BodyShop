import {
  Theme,
  Typography,
  FormControlLabel,
  Input,
  Divider,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PaymentProps } from '../../../../../utils/types';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { isAuthenticated } from '../../../../../utils/session';
import { sendOtp, verifyOtp } from '../../../otp/action';
import GreenRadio from '../../../../../common/customRadio';
import CustomCheckbox from '../../../../../common/customCheckbox';
import CustomButton from '../../../../../common/button';

const useStyles = makeStyles((theme: Theme) => ({
  inputField: {
    height: '54px',
    width: '500px',
    // marginBottom: "15px",
    border: '1px solid #e2e2e2',
    padding: '0px 15px',
    lineHeight: '19px',
    [theme.breakpoints.down('xs')]: {
      font: `normal  ${theme.spacing(1.3)} Work Sans Medium`,
    },
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
    },
    '&::-webkit-input-placeholder': {
      font: `normal  ${theme.spacing(1.5)} Work Sans`,
      color: 'var(--light-gray-text)',
      fontWeight: 500,
    },
    [theme.breakpoints.down('sm')]: {
      width: '-webkit-fill-available',
    },
  },
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
    margin: theme.spacing(2, 2),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 1),
    },
  },

  codDiv: {
    display: 'flex',
    // alignItems: "center",
    justifyContent: 'space-between',
    margin: theme.spacing(2.5, 2, 1.5, 2),
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      padding: theme.spacing(0, 1.8, 1, 1.8),
      margin: '0px',
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

  btnSubmit: {
    width: theme.spacing(16),
    marginTop: theme.spacing(-1.2),
    marginLeft: theme.spacing(1.0),
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: theme.spacing(0),
      marginLeft: theme.spacing(0),
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
  },
  greyedOut: {
    '& .MuiFormControlLabel-label': {
      color: 'grey !important',
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
  checkbox: {
    '& img': {
      borderRadius: '50%',
    },
  },
}));

const COD = ({
  paymentMode,
  setPaymentMode,
  setProceedToPay,
  disablePaymentOptions,
  flag,
  handleCartSummary,
}: PaymentProps) => {
  // const location: any = useLocation();
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const [otp, setOtp] = useState<any>('');
  // const [flag, setFlag] = useState<any>(location?.state?.flag || "")
  const [showCTA, setShowCTA] = useState(true);
  const [resendOtpVisibility, setResendOtpVisibility] = useState(false);
  const giftCard = useSelector(
    (state: any) => state.giftReducer.eCardSummary?.giftCard
  );
  const cartData: any = useSelector((state: any) => state.shoppingBagReducer);

  let mobileNo = giftCard?.receiverMobile ?? localStorage.getItem('mobileNo');
  let email = giftCard?.receiverEmail ?? localStorage.getItem('email');
  const payload: any = {
    type: 'signup',
    otpVia: 'mobile',
    countryCode: '+91',
    email,
    mobileNo,
  };

  const handleClick = () => {
    if (showCTA) {
      setPaymentMode('cod');
      setProceedToPay(true);
      setShowCTA(true);
      setOtp('');
      setResendOtpVisibility(false);
      if (mobileNo && isAuthenticated()) {
        if (handleCartSummary && cartData?.offerId && cartData.offerId !== '')
          handleCartSummary(otpSend);
        else otpSend();
      }
    } else {
      setPaymentMode('cod');
    }
  };
  const otpSend = () => {
    dispatch(sendOtp(payload));
  };

  const verify = (otp: string | undefined) => {
    // dispatch(showLoader())
    payload.OTP = otp;
    dispatch(
      verifyOtp(payload, (data: any) => {
        if (data.httpCode === 201 || data.httpCode === 200) {
          setProceedToPay(false);
          window.scrollTo(0, 0);
          // setPaymentMode("")
          setShowCTA(false);
          // setDisableCod(true)
        } else {
          setResendOtpVisibility(true);
          // setDisableCod(false)
          // setProceedToPay(false)
        }
        // dispatch(hideLoader())
      })
    );
  };

  const resendOtp = () => {
    setOtp('');
    if (mobileNo && isAuthenticated()) dispatch(sendOtp(payload));
  };

  useEffect(() => {
    if (flag === 'convertToCod' && paymentMode === 'cod') {
      handleClick();
    }
  }, [flag, paymentMode]);

  const greyed =
    (flag === 'retry' && paymentMode !== 'cod') ||
    (flag !== 'retry' && flag !== 'convertToCod' && disablePaymentOptions);

  return (
    <>
      <div className={classes.outerDiv}>
        <Divider className={classes.divider} />

        <div className={classes.bankDiv}>
          <FormControlLabel
            className={
              greyed
                ? clsx(classes.bankNameDiv, classes.greyedOut)
                : classes.bankNameDiv
            }
            control={
              <GreenRadio
                value={'cod'}
                checked={
                  (paymentMode === 'cod' && !disablePaymentOptions) ||
                  (flag === 'convertToCod' && paymentMode === 'cod')
                }
                name="radio-button-cod"
                onClick={handleClick}
                disabled={
                  paymentMode === 'cod' && flag === 'convertToCod'
                    ? false
                    : disablePaymentOptions
                }
              />
            }
            value="cod"
            label={'COD (Cash on delivery)'}
          />
          {!showCTA && (
            <CustomCheckbox
              key={'cod'}
              id={'cod'}
              checked={true}
              className={classes.checkbox}
            />
          )}
        </div>

        {paymentMode === 'cod' &&
        showCTA &&
        (!disablePaymentOptions || flag === 'convertToCod') ? (
          <>
            <div className={classes.codDiv}>
              <Input
                // disabled={disableOtp}
                id="standard-start-adornment"
                placeholder="Enter here"
                className={classes.inputField}
                // type="outlined"
                onChange={(e: any) => setOtp(e?.target?.value)}
                value={otp}
                renderSuffix={() => {
                  if (resendOtpVisibility)
                    return (
                      <Typography className={classes.link} onClick={resendOtp}>
                        RESEND
                      </Typography>
                    );
                }}
              />
              <div className={classes.btnSubmit}>
                <CustomButton
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                  text={'Verify'}
                  onClick={() => {
                    if (otp) verify(otp);
                  }}
                  disabled={!otp}
                />
              </div>
            </div>
            <Typography className={classes.textHeading}>
              Enter OTP sent on your registered mobile number.
            </Typography>
          </>
        ) : null}
      </div>
    </>
  );
};

export default COD;
