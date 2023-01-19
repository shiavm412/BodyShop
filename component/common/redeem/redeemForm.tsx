import { Theme, Typography, Input, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import CustomButton from '../button';
import events from '../../utils/event/constant';
// import {
//   getCardType,
//   sendOtpForCardNumber,
//   validateCardNumber,
// } from "../../../pages/giftCard/action";
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import Utils from '../../utils';
import {
  getCardType,
  sendOtpForCardNumber,
  validateCardNumber,
} from '../../components/screens/giftCard/action';
// import Utils from "../../../utils";
// import { hideLoader, showLoader } from "../../../pages/home/actions";
// import Skeleton from "@mui/material/Skeleton";

const useStyles = makeStyles((theme: Theme) => ({
  textHeading: {
    font: `normal ${theme.spacing(1.3)} Work Sans`,
    fontWeight: 500,
    lineHeight: '15px',
    color: '#69BE5B',
    marginTop: '3px',

    // margin: theme.spacing(-2.0, 0, 0, 0),
  },
  InputTag: {
    height: '54px',
    width: '100%',
    // marginBottom: "15px",
    border: '1px solid #e2e2e2',
    padding: '0px 15px',
    background: 'white',
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
    // "& .MuiInput-input": {
    //   textTransform: "uppercase"
    // }
  },
  InputTag2: {
    height: '54px',
    width: '100%',
    // marginBottom: "15px",
    marginBottom: '3px',

    border: '1px solid #e2e2e2',
    padding: '0px 15px',
    lineHeight: '19px',
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.5
    )} Work Sans`,
    letterSpacing: '0.02em',
    color: '#0D0D0D',
    '&::-webkit-input-placeholder': {
      font: `normal  ${theme.spacing(1.5)} Work Sans`,
      color: 'var(--light-gray-text)',
      fontWeight: 500,
    },
  },

  error: {
    color: 'red',
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.2
    )} Work Sans`,
    marginTop: '3px',
  },
  noMargin: {
    marginBottom: '0px',
  },
  link: {
    color: '#044236',
    font: `normal 600 ${theme.spacing(1.4)} Work Sans`,
    lineHeight: '16px',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.2
      )} Work Sans SemiBold`,
    },
  },

  emptyDiv: {
    height: '15px',
  },
  btn: {
    width: '46%',
  },
  formContainer: {
    // width: '100%',
    // marginBottom: '10px',
    '& .MuiFormGroup-root': {
      '& .formLabel': {
        height: '0px',
      },
    },
    margin: theme.spacing(2.5, 2, 2, 2),
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0px',
      margin: theme.spacing(2.5, 2, 2, 0),
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: '0px',
      margin: theme.spacing(1, 2, 0, 0),
    },
  },
  formContainer2: {
    width: '100%',
    // marginBottom: '10px',
    // "& .MuiFormGroup-root": {
    //   "& .formLabel": {
    //     height: '0px',
    //   }
    // },
    // margin: theme.spacing(0, 0, 2, 0),
  },
  inputLabel: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '16.42px',
    color: '#333333',
    marginBottom: '8px',
    [theme.breakpoints.down('xs')]: {
      font: 'normal 13px  Work Sans Medium !important',
      letterSpacing: '0.02em',
    },
  },
  inputValue: {},
  gridContainer: {
    width: '100%',
  },
  buttonGrid: {
    padding: '0px !important',
    paddingRight: '10px !important',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0px !important',
    },
  },
  btnSubmit: {
    width: '100%',
    // marginBottom: theme.spacing(2.0),
    // marginLeft: theme.spacing(2.0),
    '& .MuiButton-root': {
      marginTop: '13px !important',
      padding: '19px 0px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '10px',
      marginTop: '-20px',
    },
    [theme.breakpoints.down('xs')]: {
      '& .MuiButton-root': {
        font: `normal ${theme.spacing(1.4)} Work Sans Medium !important`,
      },
    },
    marginTop: '21px',
  },
  btnText: {
    font: `normal ${theme.spacing(1.3)} Work Sans SemiBold !important`,
  },
  para: {
    // width: '100%',
    marginLeft: '10px',
    // textAlign:"left",
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.3
    )} Work Sans`,
    color: 'var(--light-gray)',

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginLeft: '0px',
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, 0),
      letterSpacing: '0.5px',

      font: `normal ${theme.spacing(1.3)} Work Sans Regular`,
    },
  },
}));
interface Props {
  onRedeemBalance: Function;
  getBalance: Function;
  textInfo: string;
  getWalletData?: Function;
  setGiftCard?: Function;
}
const RedeemForm: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const { onRedeemBalance, getBalance, textInfo } = props;
  const [cardNumber, setCardNumber] = useState('');
  const [cardCode, setCardCode] = useState('');
  const [cardValid, setCardValid] = useState(false);
  const [amount, setAmount] = useState(0);
  const [redeemError, setRedeemError] = useState('');
  //@ts-ignore
  const [openRedeemBalanceModal, setOpenRedeemBalanceModal] = useState(false);
  const [cardNumberMissing, setCardNumberMissing] = useState(false);
  const [cardType, setCardType] = useState(0);

  const redeem = () => {
    if (cardCode && cardNumber) {
      const number: any = cardNumber;
      const payload = {
        cardNumber: number.toUpperCase(),
        cardCode: Number(cardCode),
      };
      onRedeemBalance(payload, (response: any) => {
        if (response?.amount) {
          setAmount(response?.amount || 0);
          getBalance();
          setCardNumber('');

          setRedeemError('');
          // onClose()
          setOpenRedeemBalanceModal(false);
          // dispatch({
          //     type: "show-alert",
          //     payload: {
          //         message: `₹${response?.amount || 0} added to your Wallet`,
          //         type: "success",

          //     }

          // })
          // dispatch(hideLoader());
          if (props?.getWalletData) props.getWalletData(false, true);
        } else if (response?.errorMessage) {
          // dispatch(hideLoader())
          setRedeemError(response.errorMessage);
        } else {
          // onClose()
        }
      });
    }
  };

  const onChangeGiftCardNumber = (e: any) => {
    clearAll();
    setCardNumber(e?.target?.value?.toUpperCase());

    if (
      (e?.target?.value?.length === 5 && !cardType) ||
      (e.target.value?.length >= 5 && !cardType) ||
      (e.target.value &&
        e.target.value.length === 5 &&
        cardNumber &&
        !e.target.value?.includes(cardNumber))
    ) {
      getCardTypeInfo(e.target.value);
    }
    if (!e?.target?.value || e?.target?.value?.length < 5) {
      setCardValid(false);
      if (props.setGiftCard) props.setGiftCard(false);
      setCardType(0);
    }
    if (!e?.target?.value) {
      setCardNumberMissing(true);
    }
  };

  const onChangeCardCode = (e: any) => {
    setCardCode(e.target.value);
    setRedeemError('');
  };

  // const handleGetRedeemBalanceClose = () => {
  //     setOpenRedeemBalanceModal(false)
  // };

  const validate = () => {
    const card: any = cardNumber;
    if (cardNumber)
      dispatch(
        validateCardNumber(card.toUpperCase(), (response: any) => {
          if (
            response?.data?.cardType &&
            response?.data?.statusValue?.toLowerCase() !== 'consumed' &&
            response?.data?.statusValue?.toLowerCase() !== 'invalid'
          ) {
            setCardValid(true);
            if (props.setGiftCard) props.setGiftCard(true);
            setCardType(response.data.cardType);
          } else {
            setCardValid(false);
            if (props.setGiftCard) props.setGiftCard(false);
            setCardType(0);
          }
        })
      );
    else setCardNumberMissing(true);
  };

  const getCardTypeInfo = (card: any) => {
    if (card) {
      dispatch(
        getCardType(card.toUpperCase(), (response: any) => {
          if (response?.data?.cardType) {
            setCardValid(response.data.cardType === 1 ? true : false);
            if (props.setGiftCard)
              props.setGiftCard(response.data.cardType === 1 ? true : false);
            setCardType(response.data.cardType);
          } else {
            setCardValid(false);
            if (props.setGiftCard) props.setGiftCard(false);
            setCardType(0);
          }
        })
      );
    }
    // else setCardNumberMissing(true)
  };
  const clearAll = () => {
    setCardCode('');
    setRedeemError('');
    setCardNumberMissing(false);
    setAmount(0);
  };
  // const onClose = () => {
  //   setCardNumber("");

  //   setCardValid(false);
  //   if (props.setGiftCard) props.setGiftCard(false);
  //   setCardType(0);
  //   clearAll();
  // };

  const onSendOtp = () => {
    setRedeemError('');
    setAmount(0);
    setCardCode('');
    const payload = {
      cardNumber: cardNumber,
      otpType: 'giftcard',
    };
    dispatch(sendOtpForCardNumber(payload));
  };

  return (
    <div className={classes.formContainer}>
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4" className={classes.inputValue}>
            <Input
              disabled={
                cardType === 2 && cardValid && cardNumber ? true : false
              }
              value={cardNumber || ''}
              className={classes.InputTag}
              placeholder="Gift card number here"
              onChange={onChangeGiftCardNumber}
              renderSuffix={() => {
                if (cardType === 2 && cardValid && cardNumber)
                  return (
                    <Typography className={classes.link} onClick={onSendOtp}>
                      RESEND
                    </Typography>
                  );
                if (cardType && cardType === 2 && cardNumber && !cardValid)
                  return (
                    <Typography className={classes.link} onClick={validate}>
                      VALIDATE
                    </Typography>
                  );
              }}
            />
          </Typography>
          {cardNumberMissing && (
            <Typography className={classes.error}>
              Please enter Card Number
            </Typography>
          )}
          {amount && redeemError === '' ? (
            <Typography className={classes.textHeading}>
              ₹{Utils.CommonFunctions.addCommaToAmount(amount)} added to your
              Wallet
            </Typography>
          ) : (
            ''
          )}
        </Grid>
        {cardValid && cardNumber ? (
          <>
            <Grid item xs={12} md={8}>
              <div className={clsx(classes.formContainer2, classes.noMargin)}>
                <Typography variant="h4" className={classes.inputLabel}>
                  {cardType === 2 ? '6 Digit OTP' : '6 Digit PIN'}
                </Typography>
                <Typography variant="h4" className={classes.inputValue}>
                  <input
                    value={cardCode}
                    className={classes.InputTag2}
                    placeholder="Enter 6 Digit Number"
                    onChange={onChangeCardCode}
                    type={cardType === 2 ? 'text' : 'password'}
                    // type="text"
                    pattern="\d*"
                    maxLength={6}
                  />
                </Typography>
              </div>
              {cardCode && cardCode?.length !== 6 && (
                <Typography className={classes.error}>
                  {cardType === 2
                    ? 'Please enter a 6 digit OTP'
                    : 'Please enter a 6 digit PIN'}
                </Typography>
              )}
              {redeemError !== '' && (
                <Typography className={classes.error}>{redeemError}</Typography>
              )}
            </Grid>
            <Grid item xs={12} md={4} className={classes.buttonGrid}>
              <Typography
                variant="h4"
                className={classes.inputLabel}
              ></Typography>
              <div className={classes.btnSubmit}>
                <CustomButton
                  className={classes.btnText}
                  type="submit"
                  text={'Add to Wallet'}
                  fullWidth
                  onClick={redeem}
                  variant="contained"
                  disabled={
                    cardNumber === '' ||
                    cardCode === '' ||
                    (cardCode !== '' && cardCode?.length !== 6)
                  }
                />
              </div>
            </Grid>
          </>
        ) : (
          <div className={classes.emptyDiv} />
        )}
        {textInfo && (
          <Typography variant="body1" align="center" className={classes.para}>
            {textInfo}
          </Typography>
        )}
      </Grid>
    </div>
  );
};
export default RedeemForm;
