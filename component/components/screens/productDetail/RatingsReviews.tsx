import { useState } from 'react';
// import LinearProgressReviews from "../../components/linearProgressReviews";
import { useSelector } from 'react-redux';
import { ReducersModal } from '../../../models';
// import RatingModal from "../rating&review/rating";
import { isAuthenticated } from '../../../utils/session';
import Utils from '../../../utils';
// import { useNavigate } from 'react-router-dom';
// import MessageDialogue from "../../components/common/product/messageDialogue";
// import { EDIT_ICON } from "utils/constantImages";
import { Theme, Rating, Typography, Divider, Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MessageDialogue from '../../../common/product/messageDialogue';
import LinearProgressReviews from '../../../common/linearProgressReviews';
import { useRouter } from 'next/router';
import Image from 'next/image';

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

  button: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )} Recoleta Alt`,
    lineHeight: '16px',
    color: 'var(--main-opacity)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans SemiBold`,
    },
  },
  headContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2),
    },
  },
  ratingContainer1: {
    flexBasis: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    '& .MuiRating-root': {
      color: 'var(--main-opacity)',
    },
  },
  ratingContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(0, 0, 0.6, 0),
    '& .MuiRating-root': {
      color: 'var(--main-opacity)',
    },
  },
  rating: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      3.2
    )} Work Sans`,
    lineHeight: '38px',
    color: 'var(--black)',
    margin: theme.spacing(0.6, 0),
  },
  precision: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2
    )} Work Sans`,
  },
  caption: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.2
    )} Work Sans`,
    lineHeight: '14px',
    color: 'var(--light-gray)',
    margin: theme.spacing(0.6, 0, 0, 0),
  },
  feedbackContainer: {
    display: 'flex',
    // justifyContent: "space-evenly"
  },
  progressBar: {
    flexBasis: '40%',
    margin: '0px 70px',
    [theme.breakpoints.down('sm')]: {
      margin: '0px 30px',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0px 0px 0px 15px',
      flexBasis: '65%',
    },
  },
  progressContainer: {
    margin: theme.spacing(1, 0, 0, 0),
    '& .MuiLinearProgress-colorPrimary': {
      borderRadius: '2px',
    },
    [theme.breakpoints.down('xs')]: {
      '& .MuiBox-root': {
        minWidth: 'auto',
      },
      '& .MuiLinearProgress-root': {
        height: '5px',
      },
    },
  },

  label: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '16px',
  },
  divider: {
    margin: theme.spacing(3, 0, 2, 0),
  },
  skeleton: {
    margin: '10px 10px',
  },
  cursor: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noReview: {
    color: 'var(--light-gray)',
    font: `normal 600 ${theme.spacing(1.4)} Work Sans`,
    marginTop: '5px',
  },
  messageHeading: {
    font: `normal 700 ${theme.spacing(2.0)} Work Sans`,
    color: 'var(--black300)',
    lineHeight: '28px',
    marginBottom: '9px',

    // margin: theme.spacing(0.8, 0),
  },
}));
const RatingsReviews = (props: any) => {
  const router = useRouter();
  const classes = useStyles();
  // const dispatch = useDispatch()
  // const [value, setValue] = React.useState(4.5);
  const [ratingModalVisibility, setRatingModalVisibility] = useState(false);
  const [loginAlert, showLoginAlert] = useState(false);
  // const history = useNavigate();
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  const product =
    useSelector((state: ReducersModal) => {
      return state.productDetailReducer.product;
    }) || null;

  const reviewData = useSelector(
    (state: ReducersModal) => state.productDetailReducer?.productReviews
  );
  console.log("reviewData",reviewData)
  // const ratingData = reviewData?.data?.[0] || {};
  return (
    <div id={'reviewsAndReviews'}>
      <MessageDialogue
        cancelText={'Cancel'}
        okText={'Okay'}
        open={loginAlert}
        handleClose={() => showLoginAlert(!loginAlert)}
        onOk={() => {
          const redirectTo = `?redirectTo=${location.pathname}`;
          // history.push({
          //   pathname: `${Utils.routes.LOGIN_OTP}`,
          //   search: redirectTo,
          // });
          router.push({
            pathname: `${Utils.routes.LOGIN_OTP}`,
            query: { search: 'redirectTo' },
          });
          showLoginAlert(false);
        }}
        message={'Please login to proceed'}
        heading={'The Body Shop'}
        headingClass={classes.messageHeading}
      />
      <div className={classes.headContainer}>
        {!reviewData?.isReviewAllowed && reviewData?.data?.length === 0 ? (
          ''
        ) : (
          <Typography className={classes.heading}>
            {skeletonLoader ? <Skeleton width={120} /> : 'Rating & Reviews'}
          </Typography>
        )}
        <div
          className={classes.cursor}
          onClick={() => {
            if (!isAuthenticated()) showLoginAlert(true);
            else setRatingModalVisibility(true);
          }}
        >
          {skeletonLoader ? (
            <Skeleton width={120} />
          ) : (
            reviewData?.isReviewAllowed && (
              <>
                {/* <EDIT_ICON /> */}
                <Image src={Utils.images.EDIT_ICON} height={40} width={40} alt="imgEdit"/>
                <Typography className={classes.button}>
                  Review product
                </Typography>
              </>
            )
          )}
        </div>
      </div>
      {
        reviewData?.data?.length > 0 || skeletonLoader ? (
          <>
            <div className={classes.feedbackContainer}>
              <div className={classes.ratingContainer1}>
                {skeletonLoader ? (
                  Array.of(1, 2, 3).map((index: any) => (
                    <Skeleton
                      className={classes.skeleton}
                      variant="rectangular"
                      width={'50%'}
                      height={10}
                      key={index}
                    />
                  ))
                ) : (
                  <div>
                    <div className={classes.ratingContainer}>
                      <Typography className={classes.rating}>
                        {reviewData?.avgRating || 0}
                        <span className={classes.precision}>/5</span>
                      </Typography>
                    </div>
                    {reviewData?.avgRating ? (
                      <div className={classes.ratingContainer}>
                        <Rating
                          name="half-rating"
                          // onChange={(event: any, newValue: any) => {
                          //     setValue(newValue);
                          // }}
                          defaultValue={
                            reviewData?.avgRating
                              ? Number(reviewData?.avgRating)
                              : 0
                          }
                          precision={0.5}
                          readOnly
                        />
                      </div>
                    ) : null}

                    <div className={classes.ratingContainer}>
                      <Typography className={classes.caption}>
                        {reviewData?.totalCount || 0} verified{' '}
                        {reviewData?.totalCount <= 1 ? 'user' : 'users'}
                      </Typography>
                    </div>
                  </div>
                )}
              </div>
              <Divider orientation="vertical" flexItem />
              <div className={classes.progressBar}>
                {skeletonLoader ? (
                  Array.of(1, 2, 3).map((index: any) => (
                    <div key={index}>
                      <Skeleton
                        className={classes.skeleton}
                        variant="rectangular"
                        width={80}
                        height={10}
                      />
                      <Skeleton
                        className={classes.skeleton}
                        variant="rectangular"
                        width={'50%'}
                        height={10}
                      />
                    </div>
                  ))
                ) : (
                  <>
                    {/* over all rating is pending from bushra,SecondaryRatingsOrder will not be used here */}

                    {reviewData?.overallPercentage &&
                      Array.isArray(reviewData.overallPercentage) &&
                      reviewData.overallPercentage.map(
                        (item: any, key: any) => {
                          return (
                            <div
                              className={classes.progressContainer}
                              key={key}
                            >
                              <label className={classes.label}>
                                {item.key}
                              </label>
                              <LinearProgressReviews
                                value={item.rating}
                                isPerc={true}
                              />
                            </div>
                          );
                        }
                      )}

                    {/* <div className={classes.progressContainer}>
                                <label className={classes.label}>Quality</label>
                                <LinearProgressReviews value={90} isPerc={true} />
                            </div>
                            <div className={classes.progressContainer}>
                                <label className={classes.label}>Value</label>
                                <LinearProgressReviews value={79} isPerc={true} />
                            </div> */}
                  </>
                )}
              </div>
            </div>
            <Divider light className={classes.divider} />
          </>
        ) : (
          ''
        )
        // <Typography className={classes.noReview}>No Reviews Yet</Typography>
      }
      {/* {ratingModalVisibility && (
        <RatingModal
          product={product}
          // sku={sku}
          open={ratingModalVisibility}
          handleClose={() => {
            props.getData();
            setRatingModalVisibility(false);
          }}
        />
      )} */}
    </div>
  );
};

export default RatingsReviews;
