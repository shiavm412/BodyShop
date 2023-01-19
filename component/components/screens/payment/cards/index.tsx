import {
  Theme,
  Typography,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import _ from 'lodash';
// import Utils from "../../../utils";
import AddToCard from './addCard';
import Skeleton from '@mui/material/Skeleton';
import { useSelector } from 'react-redux';
// import { ReducersModal } from "../../../models";
// import GreenRadio from "../../../components/common/customRadio";
// import { getCards } from "../razorpay";
// import { useLocation } from "react-router-dom";
import clsx from 'clsx';
import { Box } from '@mui/material';
import { getCards } from '../razorpay';
import GreenRadio from '../../../../common/customRadio';
import Utils from '../../../../utils';
// const GreenRadio = withStyles({
//   root: {
//     color: "var(--main-opacity)",
//     "&$checked": {
//       color: "var(--main-opacity)",
//     },
//   },
//   checked: {},
// })((props: any) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
  yourCardRoot: {
    marginBottom: theme.spacing(1.5),
    border: '1px solid var(--border-color)',
    [theme.breakpoints.down('xs')]: {
      border: 'none',
      borderBottom: '5px solid #F8F8F8',
      margin: theme.spacing(0, 0),
    },
  },

  yourCardDiv: {
    borderBottom: '1px solid var(--border-color)',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1.5, 1),
      borderBottom: 'none',
    },
  },
  yourCard: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Work Sans`,
    lineHeight: '21px',
    textTransform: 'uppercase',
    color: 'var(--green-color)',
    [theme.breakpoints.down('xs')]: {
      textTransform: 'none',
      fontSize: '13.5px',
      color: 'black',
      font: `normal ${theme.spacing(1.4)} Recoleta Alt Bold`,
      letterSpacing: '0.06em',
    },
  },
  addNewCard: {
    font: `normal ${theme.spacing(1.4)} Work Sans`,
    fontWeight: 600,
    lineHeight: '16px',
    textTransform: 'uppercase',
    color: 'var(--black)',
    [theme.breakpoints.down('xs')]: {
      textTransform: 'none',
      font: `normal ${theme.spacing(1.2)} Work Sans SemiBold`,
      color: 'var(--main-opacity)',
    },
    cursor: 'pointer',
  },
  divider: {
    backgroundColor: 'transparent',
    border: '1px dashed rgba(178, 178, 178, 0.5)',
  },

  radioButton: {
    transition: 'none',
    '&:hover': { backgroundColor: 'white' },
    width: '14px',
    height: '14px',
  },
  outerDiv: {
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 1),
    },
  },
  bankDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(2.5, 0, 1.2, 2),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2.5, 0, 1.2, 0),
    },
  },
  bankNameDiv: {
    display: 'flex',
    // alignItems: "center",
  },
  bankColumn: {
    marginLeft: theme.spacing(1.2),
  },
  inputField: {
    width: '140px',
    '& .MuiInputBase-root': {
      height: '44px',
      borderRadius: '3px',
    },
    marginBottom: '20px',
  },
  boxDiv: {
    marginBottom: '24px',
    paddingLeft: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginBottom: theme.spacing(1.5),
      paddingLeft: theme.spacing(0.5),
    },
  },
  textDiv: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.3
    )} Work Sans`,
    lineHeight: '15px',
    color: '#69BE5B',
  },
  discount: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.3
    )} Work Sans`,
    lineHeight: '15px',
    color: '#69BE5B',
    margin: theme.spacing(0.5, 0),
  },
  btn: {
    width: theme.spacing(16),
    [theme.breakpoints.down('xs')]: {
      width: '200px',
      marginTop: '19px',
    },
    marginTop: '-19px',
  },
  skeltonView: {
    padding: theme.spacing(14),
  },
  bankTitle: {
    font: `normal 600 ${theme.spacing(1.6)} Work Sans`,
    color: 'var(--secondary-black)',
    lineHeight: '18px',
    textTransform: 'capitalize',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans SemiBold`,
    },
  },
  bankCard: {
    color: '#004236',
    marginTop: '8px',
    [theme.breakpoints.down('xs')]: {
      color: '#666666 !important',
      font: `normal ${theme.spacing(1.2)} Work Sans Regular`,
    },
  },
  error: {
    color: '#f44336',
    fontSize: '12px',
    fontFamily: 'Work Sans',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  cvv: {
    width: '140px',
    '& .MuiInputBase-root': {
      height: '44px',
      borderRadius: '3px',
    },
    '& .MuiInputBase-input': {
      '-webkit-text-security': 'disc',
    },
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.0)} Work Sans Regular`,
    },
    // marginBottom: "20px",
  },
  greyedOut: {
    color: 'grey !important',
    pointerEvents: 'none',
    '& .MuiFormControlLabel-label': {
      color: 'grey !important',
    },
  },
  cursor: {
    cursor: 'pointer',
  },
}));

function YourCard({
  disablePaymentOptions,
  setPaymentMode,
  onSubmit,
  paymentMode,
  flag,
  setSelectedCard,
  setProceedToPay,
  selectedCard,
  setPaymentMethodId,
  handleCartSummary,
  handleCardCartSummary,

  section,
}: any) {
  // const location: any = useLocation();
  const [bankName, setBankName] = useState('');
  const [cards, setCards] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [state, setState] = useState({
    open: false,
  });
  const razorpayBanks = useSelector(
    (state: any) => state.configReducer.paymentConfigs?.razorpayBanks
  );
  const cartData: any = useSelector((state: any) => state.shoppingBagReducer);

  const banks =
    razorpayBanks && Array.isArray(razorpayBanks) ? razorpayBanks : [];
  const reset = () => {
    setBankName('');
    setSelectedCard({
      token: '',
      card: {
        cvv: '',
      },
    });
    if (setPaymentMethodId) setPaymentMethodId('');
    setErrorMessage('');
    setProceedToPay(true);
  };

  const handleOpen = () => {
    handleCartSummary(null);
    setState({ ...state, open: true });
    reset();
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const skeletonLoader = useSelector((state: any) => {
    return state.loadingReducer.skeletonLoader;
  });

  useEffect(() => {
    if (
      (flag === 'retry' || flag === 'convertToCod') &&
      paymentMode === 'card'
      // !location?.state?.itemId
    ) {
      handleClose();
      // setSelectedCard({ ...selectedCard, card: { cvv: "" } })
      reset();
    }
  }, [flag, paymentMode]);

  useEffect(() => {
    getCards()
      .then((response: any) => {
        if (response) setCards(response?.data?.data || []);
      })
      .catch((_error: any) => {});
  }, []);

  const classes = useStyles();
  const greyed =
    (flag === 'retry' && paymentMode !== 'card') ||
    (flag !== 'retry' && disablePaymentOptions);
  return (
    <>
      {skeletonLoader ? (
        <Skeleton variant={'rectangular'} className={classes.skeltonView} />
      ) : (
        <div className={classes.yourCardRoot}>
          <div className={classes.yourCardDiv}>
            {cards?.length > 0 ? (
              <Typography className={classes.yourCard}>
                {skeletonLoader ? (
                  <Skeleton variant={'rectangular'} />
                ) : (
                  'Your Cards'
                )}
              </Typography>
            ) : (
              <Typography
                className={
                  greyed
                    ? clsx(classes.yourCard, classes.greyedOut)
                    : clsx(classes.yourCard, classes.cursor)
                }
                onClick={handleOpen}
              >
                {skeletonLoader ? (
                  <Skeleton variant={'rectangular'} />
                ) : (
                  '+ ADD NEW CARD AND PAY'
                )}
              </Typography>
            )}
            {cards?.length > 0 ? (
              // (!disablePaymentOptions || ((paymentMode === "card") && disablePaymentOptions)) &&
              <Typography
                className={
                  greyed
                    ? clsx(classes.addNewCard, classes.greyedOut)
                    : classes.addNewCard
                }
                onClick={handleOpen}
              >
                {skeletonLoader ? (
                  <Skeleton variant={'rectangular'} />
                ) : (
                  '+ Add New Card'
                )}
              </Typography>
            ) : (
              ''
            )}
            {state.open && (
              <AddToCard
                paymentMode={paymentMode}
                onSubmit={onSubmit}
                setPaymentMode={setPaymentMode}
                open={state.open}
                handleClose={handleClose}
              />
            )}
          </div>
          <div className={classes.outerDiv}>
            {cards.map((item: any, index: any) => {
              // const bankName=item?.card?.issuer
              const bankDisplayName = banks.find(
                (bank: any) => bank?.bankCode === item?.card?.issuer
              );
              return (
                <div key={item.id}>
                  <div className={classes.bankDiv}>
                    <div className={classes.bankNameDiv}>
                      <GreenRadio
                        className={classes.radioButton}
                        // checked={bankName === item?.token && !disablePaymentOptions}
                        checked={
                          paymentMode === 'card' &&
                          bankName === item?.token &&
                          (!disablePaymentOptions || flag === 'retry')
                        }
                        onChange={() => {
                          setPaymentMode('card');
                          setProceedToPay(true);
                          if (
                            section === 'mybag'
                            // && !(Object.keys(item?.cardOffers).length === 0 &&
                            //   (!cartData?.offerId || cartData?.offerId == ''))
                          ) {
                            handleCardCartSummary(
                              item?.cardOffers?._id ? item.cardOffers : null
                            );
                          }
                          setSelectedCard({
                            token: item?.token || '',
                            card: {
                              cvv: '',
                            },
                          });
                          setBankName(item?.token || '');
                          // if (setSavedCardToken)
                          //   setSavedCardToken(item?.token || "")
                          if (setPaymentMethodId)
                            setPaymentMethodId(item?.token || '');
                          setErrorMessage('');
                        }}
                        value={item?.last4 || ''}
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'C' }}
                        disabled={
                          disablePaymentOptions && paymentMode !== 'card'
                        }
                      />
                      <div className={classes.bankColumn}>
                        <Typography
                          className={
                            greyed
                              ? clsx(classes.bankTitle, classes.greyedOut)
                              : classes.bankTitle
                          }
                        >
                          {(bankDisplayName?.bankName || '') +
                            ' ' +
                            (item?.card?.type || '') +
                            ' Card' || ''}
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                          <Typography
                            className={
                              greyed
                                ? clsx(classes.bankCard, classes.greyedOut)
                                : classes.bankCard
                            }
                          >
                            **** {item?.card?.last4 || ''}
                          </Typography>
                        </Box>
                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                          <Typography
                            className={
                              greyed
                                ? clsx(classes.bankCard, classes.greyedOut)
                                : classes.bankCard
                            }
                          >
                            XXXX XXXX XXXX {item?.card?.last4 || ''}
                          </Typography>
                        </Box>
                      </div>
                    </div>
                    {/* <div>
                    <img src={Utils.images.ICICI} alt="icici" />
                  </div> */}
                  </div>
                  {((paymentMode === 'card' &&
                    bankName === item.token &&
                    !disablePaymentOptions) ||
                    (paymentMode === 'card' &&
                      bankName === item.token &&
                      flag === 'retry')) && (
                    <div className={classes.boxDiv}>
                      <div>
                        <TextField
                          id="standard-start-adornment"
                          placeholder="CVV"
                          className={classes.cvv}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end" variant="outlined">
                                <img src={Utils.images.CVV} alt="cvv" />
                              </InputAdornment>
                            ),
                          }}
                          type="number"
                          variant="outlined"
                          onChange={(e) => {
                            if (
                              e?.target?.value.length >= 3 &&
                              e?.target?.value.length <= 4
                            ) {
                              setProceedToPay(false);
                              setErrorMessage('');
                            } else {
                              setProceedToPay(true);
                              setErrorMessage('Enter a valid cvv');
                            }
                            setSelectedCard({
                              token: item?.token || '',
                              card: {
                                cvv: e?.target?.value || '',
                              },
                            });
                          }}
                          value={selectedCard?.card?.cvv || ''}
                        />
                        {errorMessage && (
                          <Typography className={classes.error}>
                            {errorMessage}
                          </Typography>
                        )}
                        {item?.cardOffers?.displayText &&
                          section === 'mybag' &&
                          cartData?.grandTotal >=
                            item?.cardOffers?.minimumOrderAmount && (
                            <Typography className={classes.discount}>
                              {Utils.CommonFunctions.getCamelCaseString(
                                item?.cardOffers?.displayText
                              )}
                            </Typography>
                          )}
                      </div>
                      {/* <div className={classes.btn}>
                      <CustomButton
                        type="submit"
                        color="primary"
                        fullWidth
                        variant="contained"
                        text={"Proceed to Pay"}
                      />
                    </div> */}
                    </div>
                  )}
                  {cards.length - 1 !== index && (
                    <Divider className={classes.divider} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default YourCard;
