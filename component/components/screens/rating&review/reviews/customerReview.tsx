/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import {
  Theme,
  Grid,
  Typography,
  Divider,
  // IconButton,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// import Utils from "../../../utils";
// import LinearProgressReviews from "../../../components/linearProgressReviews";
// import ContainedButton from "../../../components/containedButton";
// import {
//   submitReviewPoll,
//   submitReviewReport,
// } from "../../productDetail/action";
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
// import { ReducersModal } from "../../../models";
// import clsx from 'clsx'
// import ReviewListSkeleton from "../../../components/common/skeletonList/reviewListSkeleton";
// import images from "../../../utils/images";
// import CustomButton from "../../../components/common/button";
// import { isAuthenticated } from "../../../utils/session";
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  submitReviewPoll,
  submitReviewReport,
} from '../../productDetail/action';
import MessageDialogue from '../../../../common/product/messageDialogue';
import Utils from '../../../../utils';
import ReviewListSkeleton from '../../../../common/skeletonList/reviewListSkeleton';
import CustomButton from '../../../../common/button';
import ContainedButton from '../../../../common/containedButton';
import LinearProgressReviews from '../../../../common/linearProgressReviews';
import { isAuthenticated } from '../../../../utils/session';
// import MessageDialogue from "../../../components/common/product/messageDialogue";
// import { useNavigate } from "react-router-dom";
// import {  } from "@mui/material";
// import { PRODUCT_PLACEHOLDER, STAR_TWO } from "utils/constantImages";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Work Sans SemiBold`,
    lineHeight: '21px',
    color: 'var(--secondary-black)',
    margin: theme.spacing(1, 0, 0, 0),
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans SemiBold`,
    },
  },
  headerDiv: {},

  innerContainer: {
    margin: theme.spacing(1.5, 0),
  },
  label: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )} Work Sans SemiBold`,
    lineHeight: '16px',
    color: 'var(--secondary-black)',
    margin: theme.spacing(1, 0, 0, 0),
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )} Work Sans SemiBold`,
    },
  },
  para: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )} Work Sans SemiBold`,
    lineHeight: '16px',
    color: 'var(--secondary-black)',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )} Work Sans Medium`,
    },
  },
  starRating: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )} Work Sans Medium`,
    lineHeight: '16px',
    color: 'var(--secondary-black)',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )} Work Sans Medium`,
    },
  },
  smallDiv: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
  },
  smallInnerDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  description: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )} Work Sans Medium`,
    lineHeight: '19px',
    color: 'var(--secondary-black)',
    lineBreak: 'anywhere',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )} Work Sans Regular`,
    },
  },
  type: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '19px',
    color: 'var(--secondary-black)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans Regular`,
    },
  },
  typeValue: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )} Work Sans Regular`,
    lineHeight: '19px',
    color: 'var(--secondary-black)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans`,
    },
  },
  typeDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '16px',
    letterSpacing: '0.02em',
    color: 'var(--secondary-black)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )} Work Sans Medium`,
    },
  },

  headContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewNameContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  star1: {
    margin: theme.spacing(0, 0.5, 0, 0),
  },
  starContainer: {
    flexBasis: '30%',
  },
  progress: {
    margin: theme.spacing(0.8, 0),
    '& .MuiLinearProgress-colorPrimary': {
      borderRadius: '2px',
    },
  },
  ratingCount: {
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )} Work Sans Medium`,
    },
  },
  wasHelpful: {
    margin: theme.spacing(1, 0),
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.6
    )} Work Sans`,
    lineHeight: '19px',
    color: 'var(--secondary-black)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )} Work Sans Medium`,
    },
  },
  detail: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.3
    )} Work Sans`,
    lineHeight: '15px',
    color: 'var(--light-gray)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.2
      )} Work Sans Regular`,
    },
  },
  yesNoButtonContainer: {
    display: 'flex',
    margin: theme.spacing(1, 0, 0, 0),
    [theme.breakpoints.down('xs')]: {
      '& .MuiButton-root': {
        padding: theme.spacing(1.2, 2),
        fontSize: '13px',
      },
    },
  },

  outDiv: {
    margin: theme.spacing(0, 1, 0, 0),
  },

  divider: {
    border: '1px solid var(--text-color)',
    margin: theme.spacing(2, 0),
  },
  skeleton: {
    margin: '10px 0px',
  },
  skeletonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  skeletonContentColumn: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  columnContent: {
    width: '35%',
  },

  skeletonSpacing: {
    margin: '20px',
  },
  skeletonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftSpacing: {
    marginLeft: '20px',
  },
  cursor: {
    cursor: 'pointer',
  },
  loader: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewImages: {
    marginTop: '20px',
    display: 'flex',
    width: '100%',
    overflowX: 'auto',
    gap: '20px',
    // marginTop: theme.spacing(2.5),
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  // reviewImage: {
  //   borderRadius: "20px",
  //   height: "160px",
  //   width: "160px",
  //   objectFit: "cover",
  //   // marginRight:"10px",
  //   marginTop: "10px",
  //   [theme.breakpoints.down("xs")]: {
  //     height: "120px",
  //     width: "120px",
  //   },
  // },
  reportText: {
    borderRadius: '4px',
    font: `normal 600 ${theme.spacing(1.2)} Work Sans !important`,
    cursor: 'pointer',
    color: 'var(--primary)',
    lineHeight: '16px',
    padding: '6px 10px !important',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.2)} Work Sans Medium !important`,
    },
  },
  innerDiv: {
    margin: theme.spacing(0, 0, 1, 1),
    width: theme.spacing(14),
    height: 'auto',
    // cursor: "pointer",
  },
  reviewImg: {
    borderRadius: '12px',
    // height: "160px",
    // width: "160px",
    // objectFit: "cover",

    width: theme.spacing(13),
    height: theme.spacing(13),
    objectFit: 'cover',
    [theme.breakpoints.down('xs')]: {
      height: '120px',
      width: '120px',
    },
  },
  reviewImage: {
    // height: "160px",
    // width: "160px",
    // margin: theme.spacing(1),
    // cursor: "pointer",
    borderRadius: '12px',
    width: theme.spacing(13),
    height: theme.spacing(13),
    [theme.breakpoints.down('xs')]: {
      height: '120px',
      width: '120px',
    },
  },
  messageHeading: {
    font: `normal 700 ${theme.spacing(2.0)} Work Sans`,
    color: 'var(--black300)',
    lineHeight: '28px',
    marginBottom: '9px',

    // margin: theme.spacing(0.8, 0),
  },
  yes: {
    [theme.breakpoints.down('xs')]: {
      font: `normal 700 ${theme.spacing(1.3)} Work Sans Medium !important`,
    },
  },
}));

const CustomerReview = ({
  data,
  getReviewData,

  isFetching,
  reviewData,
}: any) => {
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const history = useRouter();
  const skeletonLoader = useSelector((state: any) => {
    return state.loadingReducer.skeletonLoader;
  });
  const profileData =
    useSelector((state: any) => state.userDetailReducer?.userInfo) || {};
  const [loginAlert, showLoginAlert] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const productData: any =
    useSelector((state: any) => state.productDetailReducer?.product) || {};
  const onClickHelpful = (value: string, reviewId: any, productId: any) => {
    const payload = {
      reviewId: reviewId,
      sku: productId, //"BS-91942001"
      pollType: value,
    };
    window.scrollTo(0, 0);
    dispatch(
      submitReviewPoll(payload, () => {
        getReviewData(false, true);
      })
    );
  };
  const sendReviewReport = (reviewId: any, productId: any) => {
    const payload = {
      reviewId: reviewId,
      sku: productId,
      //"BS-91942001"
    };
    window.scrollTo(0, 0);
    dispatch(
      submitReviewReport(payload, () => {
        getReviewData(false, true);
      })
    );
  };

  return (
    <div className={classes.root}>
      <MessageDialogue
        cancelText={'Cancel'}
        okText={'Okay'}
        open={loginAlert}
        handleClose={() => showLoginAlert(!loginAlert)}
        onOk={() => {
          const pathname = `${Utils.routes.LOGIN_OTP}`;
          const redirectTo = `?redirectTo=${location.pathname}`;
          history.push(
            { pathname: `${Utils.routes.LOGIN_OTP}` }
            //   , {
            //   state: { id: productData?.magentoId, search: redirectTo },
            // }
          );
          showLoginAlert(false);
        }}
        message={'Please login to proceed'}
        heading={'The Body Shop'}
        headingClass={classes.messageHeading}
      />
      <div className={classes.headerDiv}>
        {skeletonLoader ? (
          <Skeleton
            className={classes.skeleton}
            variant="rectangular"
            width={180}
          />
        ) : (
          <Typography variant="h5" className={classes.heading}>
            Customer Reviews
          </Typography>
        )}
      </div>
      {skeletonLoader ? (
        <ReviewListSkeleton />
      ) : (
        data &&
        Array.isArray(data) &&
        data.map((item: any, _index: any) => (
          <div>
            <div className={classes.headContainer}>
              <Typography variant={'h6'} className={classes.label}>
                {item?.review?.Title || ''}
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {!item?.review?.isReported &&
                profileData?._id !== item?.userId ? (
                  // <div
                  //   className={classes.cursor}
                  //   onClick={() => sendReviewReport(item?.review?.Id)}
                  // >
                  //   <img src={images.FLAG_ICON} alt="flag" />
                  // </div>
                  <CustomButton
                    type="button"
                    color="primary"
                    fullWidth={false}
                    variant="outlined"
                    text={'Report This'}
                    onClick={() => {
                      if (!isAuthenticated()) showLoginAlert(true);
                      else sendReviewReport(item?.review?.Id, item?.productId);
                    }}
                    className={classes.reportText}
                  />
                ) : (
                  ''
                )}
              </Box>

              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                {!item?.review?.isReported &&
                profileData?._id !== item?.userId ? (
                  <CustomButton
                    type="button"
                    color="primary"
                    fullWidth={false}
                    variant="outlined"
                    text={'Report This'}
                    onClick={() => {
                      if (!isAuthenticated()) showLoginAlert(true);
                      else sendReviewReport(item?.review?.Id, item?.productId);
                    }}
                    className={classes.reportText}
                  />
                ) : (
                  ''
                )}
              </Box>
            </div>
            <div className={classes.smallDiv}>
              <Typography variant={'body1'} className={classes.para}>
                {item?.review?.UserNickname || ''}
              </Typography>

              <div className={classes.smallInnerDiv}>
                {/* <STAR_TWO /> */}
                <Typography variant={'body2'} className={classes.starRating}>
                  {item?.review?.Rating || 0}
                </Typography>
              </div>
            </div>
            <div>
              <Typography variant={'body2'} className={classes.description}>
                {item?.review?.ReviewText || ''}
              </Typography>
            </div>
            {item?.review?.ContextDataFormatted &&
              Array.isArray(item.review.ContextDataFormatted) &&
              item.review.ContextDataFormatted.length > 0 && (
                <Divider className={classes.divider} />
              )}
            <div className={classes.innerContainer}>
              <Grid container spacing={isSmall ? 2 : 3}>
                {item?.review?.ContextDataFormatted &&
                  Array.isArray(item.review.ContextDataFormatted) &&
                  item.review.ContextDataFormatted.map(
                    (contextData: any, ind: any) => (
                      <>
                        <Grid item xs={6} md={4} key={contextData?.key || ind}>
                          <div className={classes.typeDiv}>
                            <Typography
                              variant={'body1'}
                              className={classes.type}
                            >
                              {contextData?.data?.DimensionLabel || ''}
                            </Typography>
                            :
                          </div>
                        </Grid>
                        <Grid item xs={6} md={8}>
                          <Typography
                            variant={'body1'}
                            className={classes.typeValue}
                          >
                            {contextData?.data?.ValueLabel || ''}
                          </Typography>
                        </Grid>
                      </>
                    )
                  )}
              </Grid>
            </div>
            {item?.review?.ContextDataFormatted &&
              Array.isArray(item.review.ContextDataFormatted) &&
              item.review.ContextDataFormatted.length > 0 && (
                <Divider className={classes.divider} />
              )}
            <div className={classes.headContainer}>
              {item?.review?.SecondaryRatingsFormatted &&
                Array.isArray(item.review.SecondaryRatingsFormatted) &&
                item.review.SecondaryRatingsFormatted.map(
                  (ratingData: any, ind: number) => (
                    <div
                      key={ratingData?.key || ind}
                      className={classes.starContainer}
                    >
                      <div className={classes.reviewNameContainer}>
                        <div className={classes.star1}>
                          {/* <STAR_TWO /> */}
                        </div>
                        <Typography className={classes.ratingCount}>
                          {ratingData?.data?.Value || ''}
                        </Typography>
                      </div>
                      <div className={classes.progress}>
                        <LinearProgressReviews
                          value={
                            ratingData?.data?.Value
                              ? ratingData.data.Value * 20
                              : 0
                          }
                        />
                      </div>
                      <Typography className={classes.cardName}>
                        {ratingData?.key || ''}
                      </Typography>
                    </div>
                  )
                )}
            </div>
            {
              <div className={classes.reviewImages}>
                {item?.review?.Photos &&
                  Array.isArray(item.review?.Photos) &&
                  item.review?.Photos.map((photo: any) => {
                    return (
                      <>
                        <div className={classes.innerDiv}>
                          <div className={classes.reviewImg}>
                            {photo?.Sizes?.normal?.Url ? (
                              <img
                                src={photo.Sizes.normal.Url}
                                alt="review images"
                                className={classes.reviewImage}
                              />
                            ) : (
                              <div className={classes.reviewImage}>
                                {/* <PRODUCT_PLACEHOLDER /> */}
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            }
            <Divider light className={classes.divider} />
            <>
              <div className={classes.headContainer}>
                <div>
                  <Typography className={classes.wasHelpful}>
                    Was this helpful ?
                  </Typography>
                  <Typography className={classes.detail}>
                    {item?.review?.isHelpfulCount || 0} found this helpful
                  </Typography>
                </div>
                {item?.review?.isHelpfulAllowed && (
                  <div className={classes.yesNoButtonContainer}>
                    <div className={classes.outDiv}>
                      <ContainedButton
                        isOutline={true}
                        text="No"
                        onClick={() => {
                          if (!isAuthenticated()) showLoginAlert(true);
                          else
                            onClickHelpful(
                              'No',
                              item?.review?.Id,
                              item?.productId
                            );
                        }}
                        className={classes.yes}
                      />
                    </div>
                    <ContainedButton
                      isOutline={true}
                      text="Yes"
                      onClick={() => {
                        if (!isAuthenticated()) showLoginAlert(true);
                        else
                          onClickHelpful(
                            'Yes',
                            item?.review?.Id,
                            item?.productId
                          );
                      }}
                      className={classes.yes}
                    />
                  </div>
                )}
              </div>
              <Divider light className={classes.divider} />
            </>
          </div>
        ))
      )}
      {isFetching && reviewData?.nextPage !== -1 ? (
        <div className={classes.loader}>
          <CircularProgress color="primary" />
        </div>
      ) : null}
    </div>
  );
};

export default CustomerReview;
