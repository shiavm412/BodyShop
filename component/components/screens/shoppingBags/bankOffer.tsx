import {
  Theme,
  Typography,
  Grid,
  // Hidden,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import MoreBankOffer from './MoreBankOffers';
import Skeleton from '@mui/material/Skeleton';
import _ from 'lodash';
import format from 'date-fns/format';
import clsx from 'clsx';
import { Box } from '@mui/material';
import { getProductOffers } from '../../offers/action';
import Utils from '../../../utils';
import MessageDialog from '../../../common/messageDialog';

let ua = global.navigator?.userAgent.toLowerCase();
//@ts-ignore
let isSafari = false;
if (ua?.indexOf('safari') != -1) {
  if (ua?.indexOf('chrome') > -1) {
    isSafari = false; // Chrome
  } else {
    isSafari = true; // Safari
  }
}
const useStyles = makeStyles((theme: Theme) => ({
  yourCardRoot: {
    marginBottom: theme.spacing(2),
    border: '1px solid var(--border-color)',
    [theme.breakpoints.down('xs')]: {
      borderBottom: '5px solid #F8F8F8',
      border: 'none',
      margin: theme.spacing(0, -0.8),
      height: '100%',
      // display: "flex",
      // width: "100%",
      // overflowX: "scroll",
    },
  },
  yourCardDiv: {
    borderBottom: '1px solid var(--border-color)',
    padding: theme.spacing(1.5, 1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      border: 'none',
    },
  },
  yourCard: {
    font: `normal  ${theme.spacing(1.8)} Work Sans Bold`,
    lineHeight: '21px',
    textTransform: 'uppercase',
    color: 'var(--green-color)',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      fontSize: '15px',
      color: 'black',
      textTransform: 'capitalize',
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
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.2)} Work Sans SemiBold`,
    },
  },
  divider: {
    border: '1px dashed rgba(178, 178, 178, 0.5)',
  },

  radioButton: {
    transition: 'none',
    '&:hover': { backgroundColor: 'white' },
    width: '14px',
    height: '14px',
  },
  outerDiv: {
    padding: '0px 10px !important',
    [theme.breakpoints.down('xs')]: {
      '& .MuiGrid-grid-xs-6': {
        flexBasis: '47%',
        maxWidth: '47%',
        margin: '0px 4.4px',
        height: '100%',
      },
      padding: 0,
    },
  },
  bankDiv: {
    background: 'linear-gradient(90deg, #00AAFF 0%, #0047A5 100%)',
    borderRadius: '3px',
    margin: theme.spacing(2, 0.5, 2, 0.5),
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1, 0, 1, 0),
      padding: theme.spacing(1),
    },
  },

  bankNameDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  offerName: {
    font: `normal ${theme.spacing(1.4)} Work Sans`,
    fontWeight: 600,
    lineHeight: '16px',
    textTransform: 'uppercase',
    color: 'var(--white)',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'Work Sans SemiBold',
      color: 'var(--main-opacity)',
      letterSpacing: '0.02em',
      textTransform: 'capitalize !important',
    },
  },
  paymentOffer: {
    font: `normal ${theme.spacing(1.4)} Work Sans`,
    fontWeight: 600,
    lineHeight: '16px',
    textTransform: 'uppercase',
    color: 'var(--white)',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.3)} Work Sans SemiBold !important`,
    },
  },
  tca: {
    font: `normal ${theme.spacing(1.3)} Work Sans`,
    lineHeight: '18px',
    color: 'var(--white)',
    textTransform: 'capitalize',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.2)} Work Sans Regular`,
      lineHeight: '19px',
      color: 'var(--light-gray)',
    },
  },
  underline: {
    textTransform: 'uppercase',
    textDecoration: 'underline',
    cursor: 'pointer',
    font: `normal ${theme.spacing(1.4)} Work Sans SemiBold`,
    lineHeight: '18px',
    color: 'var(--white)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.3
      )} Work Sans`,
      lineHeight: '19px',
    },
  },

  offerDesc: {
    font: `normal ${theme.spacing(1.3)} Work Sans`,
    color: 'var(--white)',
    lineHeight: '18px',
    padding: theme.spacing(1, 0, 0.5, 0),
    [theme.breakpoints.down('xs')]: {
      color: 'var(--black)',
      padding: '10px 0px',
      textTransform: 'capitalize',
      font: `normal ${theme.spacing(1.0)} Work Sans Regular`,
    },
  },
  date: {
    font: `normal ${theme.spacing(1.2)} Work Sans`,
    color: 'var(--white)',
    lineHeight: '18px',
    padding: theme.spacing(1, 0, 0.5, 0),
    [theme.breakpoints.down('xs')]: {
      // color: "var(--light-gray)",
      padding: '10px 0px',
      textTransform: 'capitalize',
      font: `normal ${theme.spacing(1.0)} Work Sans Regular`,
    },
  },
  bankSecondDiv: {
    background: 'linear-gradient(90deg,  #497891  0%, #0B2648  100%)',
    borderRadius: '3px',
    margin: theme.spacing(2, 0.5, 2, 0.5),
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1, 0, 1, 0),
      padding: theme.spacing(1),
    },
  },
  mobileContainer: {
    display: 'flex',
    width: '100%',
    overflowX: 'scroll',
    overflowY: 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    gap: '20px',
    // flexWrap: "nowrap",
  },
  mobileContent: {
    width: theme.spacing(24),
    height: theme.spacing(11.5),
  },
  mobileDiv: {
    // height: "160px",
    // width: "160px",
    // objectFit: "cover",

    // width: theme.spacing(24),
    // height: theme.spacing(24),
    width: theme.spacing(24),
    height: theme.spacing(11.5),
    background: 'linear-gradient(90deg, #00AAFF 0%, #0047A5 100%)',
    borderRadius: '3px',
    margin: theme.spacing(2, 0.5, 2, 0.5),
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0.2, 0, 1, 0),
      padding: theme.spacing(1),
      border: '2px solid var(--border-color)',
      background: 'var(--white)',
      height: 'auto',
    },
  },
  mobilePaymentDiv: {
    width: theme.spacing(24),
    height: theme.spacing(11.5),
    background: 'linear-gradient(90deg,  #497891  0%, #0B2648  100%)',
    borderRadius: '3px',
    margin: theme.spacing(2, 0.5, 2, 0.5),
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0.2, 0, 1, 0),
      padding: theme.spacing(1),

      height: 'auto',
    },
  },
  bankPaymentDiv: {
    width: theme.spacing(24),
    height: theme.spacing(11.5),
    background: 'linear-gradient(90deg, #00AAFF 0%, #0047A5 100%)',
    borderRadius: '3px',
    margin: theme.spacing(2, 0.5, 2, 0.5),
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0.2, 0, 1, 0),
      padding: theme.spacing(1),

      height: 'auto',
    },
  },

  skeleton: {
    marginLeft: theme.spacing(1),
  },
  skeletonContainer: {
    display: 'flex',
  },
}));

function BankOffer(props: any) {
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const { offerReducer }: any = useSelector((state: any) => state);
  const [tcModalVisibility, setTcModalVisibility] = useState(false);
  const [state, setState] = React.useState({
    openBankModal: false,
  });

  const handleBankOfferOpen = () => {
    setState({ ...state, openBankModal: true });
  };

  const handleBankOfferClose = () => {
    setState({ ...state, openBankModal: false });
  };

  React.useEffect(() => {
    //@ts-ignore
    if (offerReducer !== {}) {
      // dispatch(showSkeleton())
      dispatch(
        getProductOffers(`?page=1&limit=10`, () => {
          // dispatch(hideSkeleton())
        })
      );
    }
  }, []);

  const skeletonLoader = useSelector((state: any) => {
    return state.loadingReducer.skeletonLoader;
  });
  return (
    <>
      {offerReducer?.data?.length ? (
        <div className={classes.yourCardRoot}>
          <div className={classes.yourCardDiv}>
            {skeletonLoader ? (
              <div className={classes.skeletonContainer}>
                <Skeleton width={20} height={30} />
                <Skeleton
                  className={classes.skeleton}
                  width={100}
                  height={30}
                />
              </div>
            ) : (
              <div className={classes.bankNameDiv}>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <img src={Utils.images.BankIcon} alt="icon" />
                </Box>
                <Typography className={classes.yourCard}>
                  Bank Offers
                </Typography>
              </div>
            )}
            {/* {offerReducer?.totalCount > 2 && ( */}
            <>
              {offerReducer?.data?.length > 2 && (
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {skeletonLoader ? (
                    <Skeleton
                      className={classes.skeleton}
                      width={100}
                      height={30}
                    />
                  ) : (
                    <Typography
                      className={classes.addNewCard}
                      onClick={handleBankOfferOpen}
                    >
                      VIEW ALL
                    </Typography>
                  )}
                </Box>
              )}
              {/* </Link> */}
              {state.openBankModal && (
                <MoreBankOffer
                  open={state.openBankModal}
                  handleClose={handleBankOfferClose}
                />
              )}
            </>
            {/* )} */}
          </div>
          <Grid container alignItems="stretch" className={classes.outerDiv}>
            {skeletonLoader ? (
              Array.of(1, 2).map(() => (
                // eslint-disable-next-line react/jsx-key
                <Grid item xs={12} md={6}>
                  <Skeleton className={classes.skeleton} height={90} />
                </Grid>
              ))
            ) : (
              <>
                {offerReducer?.data?.map((item: any, index: any) => {
                  if (index <= 1)
                    return (
                      <Grid item xs={6} md={6} key={index}>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                          <div
                            className={
                              index % 2 === 0
                                ? classes.bankDiv
                                : classes.bankSecondDiv
                            }
                          >
                            {/* <div className={classes.bankDiv}> */}
                            <div className={classes.bankNameDiv}>
                              <img src={Utils.images.OFFER_ICON} alt="icon" />

                              {/* <Typography className={classes.offerName}>
                           {item.maxDiscountAmt}% OFF | {item.ruleName}
                           </Typography> */}
                              <Typography className={classes.offerName}>
                                {_.truncate(
                                  Utils.CommonFunctions.replaceHtmlTag(
                                    item?.ruleName
                                  ),
                                  { length: 70, omission: '...' }
                                )}
                              </Typography>
                            </div>
                            {props?.showTerms ? (
                              <Typography className={classes.date}>
                                {`valid Till ${format(
                                  new Date(item?.dateTo),
                                  'dd MMMM, yyyy'
                                )}`}
                              </Typography>
                            ) : (
                              <Typography className={classes.offerDesc}>
                                {/* {item.shortDesc} */}
                                {_.truncate(
                                  Utils.CommonFunctions.replaceHtmlTag(
                                    item?.shortDesc
                                  ),
                                  { length: 60, omission: '...' }
                                )}
                              </Typography>
                            )}
                            {props?.showTerms ? (
                              <Typography
                                className={clsx(classes.tca, classes.underline)}
                                onClick={() => setTcModalVisibility(true)}
                              >
                                {'T&C'}
                              </Typography>
                            ) : (
                              <Typography className={classes.tca}>
                                {`valid Till ${format(
                                  new Date(item?.dateTo),
                                  'dd MMMM, yyyy'
                                )}`}
                              </Typography>
                            )}
                          </div>
                          <MessageDialog
                            open={tcModalVisibility}
                            handleClose={() => setTcModalVisibility(false)}
                            onOk={() => setTcModalVisibility(false)}
                            okText="Close"
                            message={item?.terms || ''}
                            cancelText={''}
                            // alignOkButton={true}
                          />
                        </Box>
                      </Grid>
                    );
                })}

                <div className={classes.mobileContainer}>
                  {offerReducer?.data?.map((item: any, index: any) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <div className={classes.mobileContent} key={index}>
                          <div
                            className={clsx(
                              !props?.showTerms
                                ? classes.mobileDiv
                                : index % 2 === 0
                                ? classes.mobilePaymentDiv
                                : classes.bankPaymentDiv
                            )}
                          >
                            {/* <div className={classes.bankDiv}> */}
                            <div className={classes.bankNameDiv}>
                              {!props?.showTerms ? (
                                <img src={Utils.images.TAG_ICON} alt="tag" />
                              ) : (
                                <img src={Utils.images.OFFER_ICON} alt="icon" />
                              )}
                              {/* <img src={Utils.images.OFFER_ICON} alt="icon" /> */}
                              {/* <Typography className={classes.offerName}>
                             {item.maxDiscountAmt}% OFF | {item.ruleName}
                              </Typography> */}
                              <Typography
                                className={
                                  !props?.showTerms
                                    ? classes.offerName
                                    : classes.paymentOffer
                                }
                              >
                                {_.truncate(
                                  Utils.CommonFunctions.replaceHtmlTag(
                                    item.ruleName
                                  ),
                                  { length: 52, omission: '...' }
                                )}
                              </Typography>
                            </div>
                            {props?.showTerms ? (
                              <Typography className={classes.date}>
                                {`valid Till ${format(
                                  new Date(item?.dateTo),
                                  'dd MMMM, yyyy'
                                )}`}
                              </Typography>
                            ) : (
                              <Typography className={classes.offerDesc}>
                                {_.truncate(
                                  Utils.CommonFunctions.replaceHtmlTag(
                                    item?.shortDesc
                                  ),
                                  { length: 40, omission: '...' }
                                )}
                              </Typography>
                            )}
                            {props?.showTerms ? (
                              <Typography
                                className={clsx(
                                  !props?.showTerms
                                    ? classes.tca
                                    : classes.underline
                                )}
                                onClick={() => setTcModalVisibility(true)}
                              >
                                {'T&C'}
                              </Typography>
                            ) : (
                              <Typography className={classes.tca}>
                                {`valid Till ${format(
                                  new Date(item?.dateTo),
                                  'dd MMMM, yyyy'
                                )}`}
                              </Typography>
                            )}
                          </div>

                          <MessageDialog
                            open={tcModalVisibility}
                            handleClose={() => setTcModalVisibility(false)}
                            onOk={() => setTcModalVisibility(false)}
                            okText="Close"
                            message={item?.terms || ''}
                            cancelText={''}
                            // alignOkButton={true}
                          />
                        </div>
                      </Box>
                    );
                  })}
                </div>
              </>
            )}
          </Grid>
        </div>
      ) : null}
      {/* <BankOfferModal open={tcModalVisibility} handleClose={()=>setTcModalVisibility(false)} data={''}/> */}
    </>
  );
}

export default BankOffer;
