import { Theme, FormControlLabel, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { PaymentProps } from '../../../../../utils/types';
import Options from './options';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import GreenRadio from '../../../../../common/customRadio';

const useStyles = makeStyles((theme: Theme) => ({
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
  greyedOut: {
    '& .MuiFormControlLabel-label': {
      color: 'grey !important',
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
    margin: theme.spacing(2.5, 2),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 1),
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
}));

const NetBanking = ({
  paymentMode,
  setPaymentMode,
  setProceedToPay,
  disablePaymentOptions,
  paymentMethods,
  setBank,
  flag,
  handleCartSummary,
}: PaymentProps) => {
  const classes = useStyles();
  const location: any = useRouter();
  const cartData: any = useSelector((state: any) => state.shoppingBagReducer);

  const handleClick = () => {
    setPaymentMode('netbanking');
    setProceedToPay(true);
    if (handleCartSummary && cartData?.offerId && cartData.offerId !== '')
      handleCartSummary();
  };
  useEffect(() => {
    if (flag === 'retry' && paymentMode === 'netbanking' && setBank) {
      setBank({ id: location?.state?.paymentMethodId || '' });
      setProceedToPay(false);
    }
  }, [flag, paymentMode]);

  const checked =
    (paymentMode === 'netbanking' && !disablePaymentOptions) ||
    (flag === 'retry' && paymentMode === 'netbanking');
  const greyed =
    (flag === 'retry' && paymentMode !== 'netbanking') ||
    (flag !== 'retry' && disablePaymentOptions);
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
                value={'netbanking'}
                checked={checked}
                name="radio-button-netbanking"
                onClick={() => handleClick()}
                disabled={
                  flag === 'retry' && paymentMode === 'netbanking'
                    ? false
                    : disablePaymentOptions
                }
              />
            }
            value="netbanking"
            label={'Netbanking'}
          />
        </div>
        {checked && (
          <Options
            bankId={location?.state?.paymentMethodId}
            setBank={setBank}
            setPaymentMode={setPaymentMode}
            banks={paymentMethods || []}
            setProceedToPay={setProceedToPay}
          />
        )}
        {/* {
          showMode && showMode("cashondelivery") && (section !== 'egift' && section !== "membership" && !isMembershipAdded) &&
          <Divider className={classes.divider} />
        } */}
      </div>
    </>
  );
};

export default NetBanking;
