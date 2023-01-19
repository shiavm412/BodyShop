import React, { useState } from 'react';
import { Typography, Divider, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
// import LinearProgressReviews from "../../components/linearProgressReviews";
// import ContainedButton from "../../components/containedButton";
import Skeleton from '@mui/material/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { submitReviewPoll, submitReviewReport } from './action';
import MessageDialogue from '../../../common/product/messageDialogue';
import Utils from '../../../utils';
import CustomButton from '../../../common/button';
import { isAuthenticated } from '../../../utils/session';
import images from '../../../utils/images';
import LinearProgressReviews from '../../../common/linearProgressReviews';
import ContainedButton from '../../../common/containedButton';
// import { ReducersModal } from "../../models";
// import { useNavigate, useLocation } from "react-router-dom";
// import { submitReviewPoll, submitReviewReport } from "./action";
// import CustomButton from "../../components/common/button";
// import Utils from "../../utils";
// import { isAuthenticated } from "../../utils/session";
// import MessageDialogue from "../../components/common/product/messageDialogue";
// import { PRODUCT_PLACEHOLDER, STAR_TWO } from "../../utils/images";

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Recoleta Alt`,
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: 'var(--secondary-black)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.6)} Recoleta Alt Bold`,
    },
  },
  subHeading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '16px',
    letterSpacing: '0.02em',
    color: 'var(--secondary-black)',
    margin: '10px 0px',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans SemiBold`,
    },
  },
  cardName: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '16px',
    letterSpacing: '0.02em',
    color: 'var(--secondary-black)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans Medium`,
    },
  },
  reviews: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '19px',
    color: 'var(--secondary-black)',
    margin: theme.spacing(1, 0),
    inlineSize: '100%',
    overflowWrap: 'break-word',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans Regular`,
    },
  },
  headContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '16px',
    color: 'var(--main-opacity)',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans SemiBold`,
    },
  },
  reviewNameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  star: {
    margin: theme.spacing(0, 0.5, 0.3, 1.5),
  },
  star1: {
    margin: theme.spacing(0, 0.5, 0.3, 0),
  },
  divider: {
    margin: theme.spacing(2, 0, 1, 0),
  },
  listContainer: {
    width: '100%',
    maxWidth: 380,
    display: 'flex',
  },
  list: {
    margin: theme.spacing(1, 0, 0, 0),
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '16px',
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1.5, 0, 0, 0),
      font: `normal ${theme.spacing(1.4)} Work Sans Regular`,
    },
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
  wasHelpful: {
    margin: theme.spacing(1, 0),
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.6
    )} Work Sans`,
    lineHeight: '19px',
    color: 'var(--secondary-black)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans Medium`,
    },
  },
  detail: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.3
    )} Work Sans`,
    lineHeight: '15px',
    color: 'var(--light-gray)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.2)} Work Sans Regular`,
    },
  },
  yesNoButtonContainer: {
    display: 'flex',
    margin: theme.spacing(1, 0, 0, 0),
  },
  outDiv: {
    margin: theme.spacing(0, 1, 0, 0),
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
  flagIcon: {
    // padding: theme.spacing(1.2),
  },
  reportText: {
    borderRadius: '4px',
    font: `normal 600 ${theme.spacing(1.2)} Work Sans !important`,
    cursor: 'pointer',
    color: 'var(--main-opacity)',
    lineHeight: '16px',
    padding: '6px 10px !important',
  },
  // reviewImagesContainer:{
  //   width: "100",

  // },
  reviewImages: {
    marginTop: '20px',
    // display: "flex",
    // width: "100vw",
    // overflowX: "auto",
    // marginTop: "10px",

    // // gap: "20px",
    // // marginTop: theme.spacing(2.5),
    // "&::-webkit-scrollbar": {
    //   display: "none",
    // },
    display: 'flex',
    width: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    '&::-webkit-scrollbar': {
      // display: "none",
      width: '0 !important',
      background: 'rgba(0,66,54,.3)',
      height: '7px',
      borderRadius: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--primary)!important',
      borderRadius: '7px',
    },
    [theme.breakpoints.down('xs')]: {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
  reviewImage: {
    // height: "160px",
    // width: "160px",
    // margin: theme.spacing(1),
    // cursor: "pointer",
    width: theme.spacing(13),
    height: theme.spacing(13),
    [theme.breakpoints.down('xs')]: {
      height: '120px',
      width: '120px',
    },
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
  flexInnerDiv: {
    flexBasis: '45%',
  },
  innerDiv: {
    margin: theme.spacing(0, 0, 1, 1),
    width: theme.spacing(14),
    height: 'auto',
    // cursor: "pointer",
  },
  messageHeading: {
    font: `normal 700 ${theme.spacing(2.0)} Work Sans`,
    color: 'var(--black300)',
    lineHeight: '28px',
    marginBottom: '9px',

    // margin: theme.spacing(0.8, 0),
  },
}));

interface Props {
  getData: Function;
}
const CustomerReviews: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const router = useRouter();
  // const history = useNavigate();
  const dispatch: any = useDispatch();
  // const location: any = useLocation();
  const skeletonLoader = useSelector((state: any) => {
    return state.loadingReducer.skeletonLoader;
  });
  const data = useSelector(
    (state: any) => state.productDetailReducer?.productReviews
  );
  const [loginAlert, showLoginAlert] = useState(false);
  const [skeleton, showSkeleton] = useState(false);

  const productData = useSelector(
    (state: any) => state.productDetailReducer?.product
  );
  // const reviewData = review?.review || {};
  const profileData =
    useSelector((state: any) => state.userDetailReducer?.userInfo) || {};
  const urlkey = router.pathname.split('/p/')?.[0]?.split('/').pop();

  const onClickHelpful = (value: string, reviewData: any) => {
    const payload = {
      reviewId: reviewData?.review?.Id,
      sku: reviewData?.productId, //BS-91942001
      pollType: value,
    };

    dispatch(
      submitReviewPoll(payload, () => {
        // showSkeleton(true);
        props.getData(() => {
          // showSkeleton(false);
        });
      })
    );
  };
  const sendReviewReport = (reviewData: any) => {
    const payload = {
      reviewId: reviewData?.review?.Id,
      sku: reviewData?.productId, //BS-91942001
    };
    dispatch(
      submitReviewReport(payload, () => {
        props.getData();
      })
    );
  };

  return (
    <>
      <div className={classes.headContainer}>
        <MessageDialogue
          cancelText={'Cancel'}
          okText={'Okay'}
          open={loginAlert}
          handleClose={() => showLoginAlert(!loginAlert)}
          onOk={() => {
            router.push(
              `${Utils.routes.LOGIN_OTP}?redirectTo=${router.pathname}`
            );
            showLoginAlert(false);
          }}
          message={'Please login to proceed'}
          heading={'The Body Shop'}
          headingClass={classes.messageHeading}
        />
        {skeletonLoader ? (
          <Skeleton
            className={classes.skeleton}
            variant="rectangular"
            width={100}
          />
        ) : (
          <>
            {data?.data?.length > 0 && (
              <Typography className={classes.heading}>
                Customer Reviews
              </Typography>
            )}
          </>
        )}
        {/* Utils.CommonFunctions.replaceUrlParams(
               Utils.routes.PRODUCT_DETAIL,
               { ":id": productData?.magentoId }
             ) */}
        {skeletonLoader ? (
          <Skeleton variant="rectangular" width={100} />
        ) : data?.totalCount > 1 ? (
          <div
            onClick={() =>
              router.push({
                pathname: '/review-list',
                query: {
                  slug: `${router.query.slug}`,
                  googleKey: `${router.query.googleKey}`,
                  categoryId: `${router.query.categoryId}`,
                  pageName: 'All Reviews',
                },
              })
            }
          >
            <Typography className={classes.button}>View More</Typography>
          </div>
        ) : (
          ''
        )}
      </div>
      {/* {data?.data?.length > 0 || skeletonLoader
        ? data?.data.map((reviewDat: any) => {
            const reviewData = reviewDat?.review;
            return (
              <div>
                <div className={classes.headContainer}>
                  {skeletonLoader ? (
                    <Skeleton
                      className={classes.skeleton}
                      width={100}
                      variant="rectangular"
                    />
                  ) : (
                    <Typography className={classes.subHeading}>
                      {reviewData?.Title || ''}
                    </Typography>
                  )}
                  {skeletonLoader ? (
                    <Skeleton
                      className={classes.skeleton}
                      width={100}
                      variant="rectangular"
                    />
                  ) : (
                    !reviewData?.isReported &&
                    profileData?._id !== reviewDat?.userId && (
                      // <div className={classes.flagIcon} >
                      <CustomButton
                        type="button"
                        color="primary"
                        fullWidth={false}
                        variant="outlined"
                        text={'Report This'}
                        onClick={() => {
                          if (!isAuthenticated()) showLoginAlert(true);
                          else sendReviewReport(reviewDat);
                        }}
                        className={classes.reportText}
                      />
                    )
                  )}
                </div>
                <div className={classes.reviewNameContainer}>
                  {skeletonLoader ? (
                    <>
                      <Skeleton
                        className={classes.skeleton}
                        width={100}
                        variant="rectangular"
                      />
                      <Skeleton
                        className={classes.skeleton}
                        width={50}
                        variant="rectangular"
                      />
                    </>
                  ) : (
                    <>
                      <Typography className={classes.cardName}>
                        {reviewData?.UserNickname || ''}
                      </Typography>

                      <div className={classes.star}>
                        <img src={images.STAR_TWO} alt="notFound" />
                      </div>
                      <Typography>{reviewData?.Rating || 0}</Typography>
                    </>
                  )}
                </div>
                {skeletonLoader ? (
                  <Skeleton variant="rectangular" height={60} />
                ) : (
                  <Typography className={classes.reviews}>
                    {reviewData?.ReviewText || ''}
                  </Typography>
                )}
                {skeletonLoader
                  ? Array.of(4, 5, 6).map((index: any) => (
                      <div
                        className={classes.skeletonContent}
                        key={index + 'customer_review'}
                      >
                        <Skeleton
                          className={classes.skeletonSpacing}
                          variant="rectangular"
                          width={'50%'}
                        />
                        :
                        <Skeleton
                          className={classes.skeletonSpacing}
                          variant="rectangular"
                          width={'50%'}
                        />
                      </div>
                    ))
                  : reviewData?.ContextDataFormatted &&
                    Array.isArray(reviewData?.ContextDataFormatted) && (
                      <>
                        {reviewData?.ContextDataFormatted?.length > 0 && (
                          <Divider light className={classes.divider} />
                        )}
                        {reviewData?.ContextDataFormatted.map(
                          (item: any, index: number) => (
                            <div className={classes.listContainer} key={index}>
                              <div className={classes.flexInnerDiv}>
                                <Typography
                                  key={item?.key || index}
                                  className={classes.list}
                                >
                                  {item?.data?.DimensionLabel || ''}
                                </Typography>
                              </div>
                              <div style={{ margin: '0 20px' }}>
                                <Typography key={item} className={classes.list}>
                                  :
                                </Typography>
                              </div>
                              <div>
                                <Typography
                                  key={item?.data?.Value || index}
                                  className={classes.list}
                                >
                                  {item?.data?.ValueLabel || ''}
                                </Typography>
                              </div>
                            </div>
                          )
                        )}
                        {reviewData?.ContextDataFormatted?.length > 0 && (
                          <Divider light className={classes.divider} />
                        )}
                      </>
                    )}
                {skeletonLoader ? (
                  <div className={classes.skeletonContentColumn}>
                    {Array.of(1, 2, 3).map((index: any) => (
                      <div
                        className={classes.columnContent}
                        key={index + 'customer_review'}
                      >
                        <Skeleton
                          className={classes.skeleton}
                          variant="rectangular"
                          height={10}
                          width={'30%'}
                        />
                        <Skeleton
                          className={classes.skeleton}
                          variant="rectangular"
                          height={10}
                          width={'95%'}
                        />
                        <Skeleton
                          className={classes.skeleton}
                          variant="rectangular"
                          height={10}
                          width={'70%'}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={classes.headContainer}>
                    {reviewData?.SecondaryRatingsFormatted &&
                      Array.isArray(reviewData?.SecondaryRatingsFormatted) &&
                      reviewData?.SecondaryRatingsFormatted.map((item: any) => {
                        return (
                          <div key={item.key} className={classes.starContainer}>
                            <div className={classes.reviewNameContainer}>
                              <div className={classes.star1}>
                                <img src={images.STAR_TWO} alt="notFound" />
                              </div>
                              <Typography>{item?.data?.Value || 0}</Typography>
                            </div>
                            <div className={classes.progress}>
                              <LinearProgressReviews
                                value={
                                  item?.data?.Value ? item?.data?.Value * 20 : 0
                                }
                              />
                            </div>
                            <Typography className={classes.cardName}>
                              {item.key}
                            </Typography>
                          </div>
                        );
                      })}
                  </div>
                )}
                {
                  <div className={classes.reviewImages}>
                    {reviewData?.Photos &&
                      Array.isArray(reviewData?.Photos) &&
                      reviewData?.Photos.map((photo: any) => {
                        return (
                          <>
                            <div className={classes.innerDiv}>
                              <div className={classes.reviewImage}>
                                {photo?.Sizes?.normal?.Url ? (
                                  <img
                                    src={photo.Sizes.normal.Url}
                                    alt="review images"
                                    className={classes.reviewImg}
                                  />
                                ) : (
                                  <div className={classes.reviewImg}>
                                    <img
                                      src={images.PRODUCT_PLACEHOLDER}
                                      alt="notFound"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                }
                {skeletonLoader || skeleton ? (
                  <>
                    <Skeleton
                      className={classes.skeleton}
                      variant="rectangular"
                      height={20}
                      width={'50%'}
                    />
                    <Skeleton
                      className={classes.skeleton}
                      variant="rectangular"
                      height={20}
                      width={'50%'}
                    />
                  </>
                ) : (
                  <>
                    <Divider light className={classes.divider} />

                    <div className={classes.headContainer}>
                      <div>
                        <Typography className={classes.wasHelpful}>
                          Was this helpful ?
                        </Typography>
                        <Typography className={classes.detail}>
                          {reviewData?.isHelpfulCount || 0} found this helpful
                        </Typography>
                      </div>
                      {reviewData?.isHelpfulAllowed && (
                        <div className={classes.yesNoButtonContainer}>
                          <div className={classes.outDiv}>
                            <ContainedButton
                              isOutline={true}
                              text="No"
                              onClick={() => {
                                if (!isAuthenticated()) showLoginAlert(true);
                                else onClickHelpful('No', reviewDat);
                              }}
                            />
                          </div>
                          <ContainedButton
                            isOutline={true}
                            text="Yes"
                            onClick={() => {
                              if (!isAuthenticated()) showLoginAlert(true);
                              else onClickHelpful('Yes', reviewDat);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
                <Divider light className={classes.divider} />
              </div>
            );
          })
        : null} */}
    </>
  );
};

export default CustomerReviews;
