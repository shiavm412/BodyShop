import { Theme, Typography, FormControlLabel, Input } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateVPA } from '../../razorpay';
import clsx from 'clsx';
import { PaymentProps } from '../../../../../utils/types';
import GreenRadio from '../../../../../common/customRadio';
import Utils from '../../../../../utils';
import CustomButton from '../../../../../common/button';

const useStyles = makeStyles((theme: Theme) => ({
  bankNameDiv: {
    display: 'flex',
    alignItems: 'center',
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
  inputField: {
    height: '54px',
    width: '500px',
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
        font: `normal ${theme.spacing(1.2)} Work Sans Medium`,
      },
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
  radioButton: {
    transition: 'none',
    '&:hover': { backgroundColor: 'white' },
    width: '14px',
    height: '14px',
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
    margin: theme.spacing(2.5, 2),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 1),
    },
  },
  textDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(2.5, 2),
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      margin: theme.spacing(2.5, 1),
    },
  },

  bankColumnDiv: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(1.2),
  },
  name: {
    font: `normal ${theme.spacing(1.5)} Work Sans`,
    fontWeight: 500,
    lineHeight: '15px',
    color: 'var(--secondary-black)',
    marginLeft: theme.spacing(0.8),
  },
  innerDiv: {
    padding: theme.spacing(0, 1.5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 0),
    },
  },
  heading: {
    font: `normal ${theme.spacing(1.6)} Work Sans`,
    fontWeight: 600,
    lineHeight: '19px',
    color: 'var(--main-opacity)',
    margin: theme.spacing(0, 1.6),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 0.7),
    },
  },
  btnSubmit: {
    width: theme.spacing(16),
    marginTop: theme.spacing(-1.2),
    marginLeft: '10px',

    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: theme.spacing(0),
      marginLeft: '0px',
    },
  },
  buttonContainer: {
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
  error: {
    color: 'red',
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.2
    )} Work Sans`,
    margin: '3px 10px 20px 20px',
  },
  greyedOut: {
    '& .MuiFormControlLabel-label': {
      color: 'grey !important',
    },
  },
}));

const UPI = ({
  paymentMode,
  setPaymentMode,
  setProceedToPay,
  disablePaymentOptions,
  flag,
  setVpa,
  vpa,
  handleCartSummary,
}: PaymentProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showCTA, setShowCTA] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const cartData: any = useSelector((state: any) => state.shoppingBagReducer);

  const handleClick = () => {
    setPaymentMode('upi');
    setShowCTA(true);
    setProceedToPay(true);
    if (setVpa) setVpa('');
    if (handleCartSummary && cartData?.offerId && cartData?.offerId !== '')
      handleCartSummary();
  };

  const verify = () => {
    if (!vpa?.match(Utils.regex.vpaRegex)) {
      setErrorMessage('Please enter a valid VPA');
    } else {
      // dispatch(showLoader());
      // payload.OTP = otp
      if (vpa?.match(Utils.regex.vpaRegex)) {
        validateVPA(vpa)
          .then((_resp: any) => {
            setProceedToPay(false);
            setShowCTA(false);
            // dispatch(hideLoader());
          })
          .catch((error: any) => {
            // dispatch(hideLoader());
            if (error?.error?.description) {
              dispatch({
                type: 'show-alert',
                payload: { type: 'error', message: error.error.description },
              });
            } else {
              dispatch({
                type: 'show-alert',
                payload: { type: 'error', message: 'Invalid VPA' },
              });
            }
          });
      }
    }
  };
  useEffect(() => {
    if (flag === 'retry' && setVpa) {
      setVpa('');
      setProceedToPay(true);
      setShowCTA(true);
    }
  }, [flag, paymentMode]);
  const greyed =
    (flag === 'retry' && paymentMode !== 'upi') ||
    (flag !== 'retry' && disablePaymentOptions);
  return (
    <>
      <div className={classes.outerDiv}>
        <div className={classes.bankDiv}>
          <FormControlLabel
            className={
              greyed
                ? clsx(classes.bankNameDiv, classes.greyedOut)
                : classes.bankNameDiv
            }
            control={
              <GreenRadio
                value={'upi'}
                checked={
                  (paymentMode === 'upi' && !disablePaymentOptions) ||
                  (flag === 'retry' && paymentMode === 'upi')
                }
                name="radio-button-upi"
                onClick={() => handleClick()}
                disabled={disablePaymentOptions && paymentMode !== 'upi'}
              />
            }
            value="upi"
            label={'UPI Payment'}
          />
        </div>
        {(paymentMode === 'upi' && showCTA && !disablePaymentOptions) ||
        (paymentMode === 'upi' && flag === 'retry' && showCTA) ? (
          <>
            <div className={classes.buttonContainer}>
              <Input
                // disabled={disableOtp}
                id="standard-start-adornment"
                placeholder="Enter here"
                className={classes.inputField}
                // type="outlined"
                onChange={(e: any) => {
                  if (setVpa) setVpa(e?.target?.value);
                  setErrorMessage('');
                  if (!e?.target?.value) setProceedToPay(true);

                  // if (!e?.target?.value?.match(Utils.regex.vpaRegex)) {
                  //     setErrorMessage('Please enter a valid VPA')
                  // }else{
                  //     setErrorMessage('')

                  // }
                }}
                value={vpa}
                // renderSuffix={() => {
                //     if (resendOtpVisibility)
                //         return <Typography className={classes.link} onClick={resendOtp}>RESEND</Typography >

                // }}
              />
              <div className={classes.btnSubmit}>
                <CustomButton
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                  text={'Verify'}
                  onClick={() => {
                    if (vpa) verify();
                  }}
                  disabled={!vpa || (errorMessage ? true : false)}
                />
              </div>
            </div>
            {errorMessage && (
              <Typography className={classes.error}>{errorMessage}</Typography>
            )}
          </>
        ) : null}
      </div>
    </>
  );
};

export default UPI;
