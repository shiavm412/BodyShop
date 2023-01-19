import {
  Theme,
  Grid,
  Typography,
  Divider,
  Rating,
  Box,
  Skeleton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// import  from "@material-ui/lab/Rating";
// import Utils from "../../../utils";
// import LinearProgressReviews from "../../../components/linearProgressReviews";
import CustomerReview from './customerReview';
import { useEffect, useState } from 'react';
// import RatingModal from "../../rating&review/rating";

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getProductData, getReviews } from '../../productDetail/action';
import Utils from '../../../../utils';
import { handleScrollHeight } from '../../../../utils/scroll';
import MessageDialogue from '../../../../common/product/messageDialogue';
import { isAuthenticated } from '../../../../utils/session';
import LinearProgressReviews from '../../../../common/linearProgressReviews';
import RatingModal from '../rating';
import Image from 'next/image';
// import { ReducersModal } from "../../../models";
// import { getProductData, getReviews } from "../../productDetail/action";
// import { hideSkeleton, showSkeleton } from "../../home/actions";
// import { useNavigate, useLocation } from "react-router-dom";
// import { handleScrollHeight } from "../../../utils/scroll";
// import MessageDialogue from "../../../components/common/product/messageDialogue";
// import { isAuthenticated } from "../../../utils/session";
// import { EDIT_ICON } from "utils/constantImages";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderLeft: '1px solid var(--text-color)',
    [theme.breakpoints.down('xs')]: {
      borderLeft: 'none',
    },
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.8
    )} Recoleta Alt`,
    lineHeight: '38px',
    color: 'var(--secondary-black)',
    margin: theme.spacing(1.5, 2.5),
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.5
      )} Work Sans`,
      margin: theme.spacing(1.5, 0),
    },
  },
  headerDiv: {
    borderBottom: '1px solid var(--text-color)',
  },
  innerContainer: {
    margin: theme.spacing(2.5),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, 0),
    },
  },
  title: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Recoleta Alt`,
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: 'var(--secondary-black)',
  },
  titleDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
  review: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )} Work Sans SemiBold`,
    lineHeight: '16px',
    color: 'var(--main-opacity)',
    margin: theme.spacing(0, 0.5),
  },
  ratingDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '160px',
  },
  ratingContainer: {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: "center",
  },
  ratingNumber: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      3.2
    )} Work Sans SemiBold`,
    lineHeight: '38px',
    color: 'var(--black)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.8
      )} Work Sans Bold`,
      // 16 SemiBold
    },
  },
  ratingHeading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      3.2
    )} Work Sans SemiBold`,
    lineHeight: '38px',
    color: 'var(--black)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.6)} Work Sans SemiBold`,
      lineHeight: '38px',
    },
  },
  rating: {
    color: 'var(--main-opacity) !important ',
  },
  ratingLabel: {
    margin: theme.spacing(1, 0),
    font: `normal ${theme.spacing(1.2)} Work Sans`,
    color: 'var(--light-gray)',
    lineHeight: '14px',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.1)} Work Sans Regular`,
    },
  },
  progressBar: {
    flexBasis: '40%',
    borderLeft: '1px solid var(--border-color)',
    padding: theme.spacing(0.5, 1, 1, 3),
  },
  progressContainer: {
    margin: theme.spacing(1, 0, 0, 0),
    '& .MuiLinearProgress-colorPrimary': {
      borderRadius: '2px',
    },
  },
  label: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '16px',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans SemiBold`,
    },
  },
  outerContainer: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 1, 1.5, 1),
    },
  },
  divider: {
    border: '1px solid var(--text-color)',
  },
  outerDiv: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiRating-root': {
      color: 'var(--main-opacity)',
    },
  },
  skeleton: {
    margin: '10px 10px',
  },
  skeletonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
  setReviewData: Function;
  match?: any;
  setBreadcrumb: Function;
}
const Detail: React.FC<Props> = (props: any) => {
  const classes = useStyles();
  const [ratingModalVisibility, setRatingModalVisibility] =
    useState<boolean>(false);
  const dispatch: any = useDispatch();
  // const location: any = useLocation();
  const history = useRouter();
  let location = {
    id:"", subcategoryId:"", urlKey:""
  }
  // const { id, subcategoryId, urlKey } = location && location?.state || null;
  const { id, subcategoryId, urlKey } = location && location || null;
  const [data, setData] = useState<any>([]);
  const [reviewData, setReviewData] = useState<any>({});
  // const [productSku, setProductSku] = useState<any>("");
  const [page, setPage] = useState<any>(0);
  const [loginAlert, showLoginAlert] = useState(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const limit = 10;
  const productData: any =
    useSelector((state: any) => state.productDetailReducer?.product) || {};

  useEffect(() => {
    window.scrollTo(0, 0);

    let params: any = {
      id,
      subcategoryId,
      urlKey,
    };

    if (!reviewData.nextPage) {
      // dispatch(showSkeleton());
      dispatch(getProductData(params,history.query));
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getReviewData = (
    hasMore?: boolean,
    callWithCurrentPage?: boolean,
    sku?: string,
    callback?: Function
  ) => {
    if (hasMore || callWithCurrentPage) {
      const pageNum = hasMore ? page + 1 : callWithCurrentPage ? 1 : page;
      setPage(pageNum);
      const productSku = sku ? sku : productData?.sku; //" BS-91942001"
      dispatch(
        getReviews(
          `?sku=${productSku}&page=${pageNum}&limit=${limit}`,
          (resp: any) => {
            props.setReviewData(resp || {});
            setReviewData(resp || {});
            const arr = callWithCurrentPage
              ? [...resp?.data]
              : [...data, ...resp?.data];
            setData(arr);
            if (callback) callback();
            // dispatch(hideSkeleton());
          }
        )
      );
    } else {
      // dispatch(hideSkeleton());
    }
  };

  useEffect(() => {
    if (!isFetching) return;
    if (reviewData.nextPage !== -1) {
      // dispatch(showSkeleton())
      getReviewData(true);
    }
  }, [isFetching]);

  const handleScroll = (e: any) => {
    handleScrollHeight(e, (value: boolean) => {
      setIsFetching(value);
    });
  };

  const skeletonLoader = useSelector((state: any) => {
    return state.loadingReducer.skeletonLoader;
  });

  return (
    <div className={classes.root}>
      <MessageDialogue
        cancelText={'Cancel'}
        okText={'Okay'}
        open={loginAlert}
        handleClose={() => showLoginAlert(!loginAlert)}
        onOk={() => {
          history.push({
            // pathname: `${Utils.routes.LOGIN_OTP}?redirectTo=${location.pathname}`,
            pathname: `${Utils.routes.LOGIN_OTP}`,
          });
          showLoginAlert(false);
        }}
        message={'Please login to proceed'}
        heading={'The Body Shop'}
        headingClass={classes.messageHeading}
      />
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <div className={classes.headerDiv}>
          <Typography variant={'h4'} className={classes.heading}>
            {skeletonLoader ? (
              <Skeleton width={300} />
            ) : (
              (productData?.name || '') + ' - Reviews'
            )}
          </Typography>
        </div>
      </Box>

      <div className={classes.innerContainer}>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <div className={classes.titleDiv}>
            <Typography variant={'h3'} className={classes.title}>
              {skeletonLoader ? <Skeleton width={120} /> : 'Rating & Reviews'}
            </Typography>
            <div
              className={classes.titleDiv}
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
                  <Image src={Utils.images.EDIT_ICON} height={40} width={40} alt="imgEdit"/>
                    {/* <EDIT_ICON /> */}
                    <Typography variant={'body1'} className={classes.review}>
                      Review product
                    </Typography>
                  </>
                )
              )}
            </div>
          </div>
        </Box>

        <div className={classes.outerContainer}>
          <Grid container>
            <Grid
              item
              xs={5}
              md={5}
              className={skeletonLoader ? classes.skeletonContainer : ''}
            >
              {skeletonLoader ? (
                Array.of(1, 2, 3).map(() => (
                  // eslint-disable-next-line react/jsx-key
                  <Skeleton
                    className={classes.skeleton}
                    variant="rectangular"
                    width={'50%'}
                    height={10}
                  />
                ))
              ) : (
                <div className={classes.ratingDiv}>
                  {reviewData?.avgRating && (
                    <div className={classes.ratingContainer}>
                      <Typography className={classes.ratingNumber}>
                        {reviewData?.avgRating || 0}
                      </Typography>
                      <Typography className={classes.ratingHeading}>
                        /5
                      </Typography>
                    </div>
                  )}
                  {reviewData?.avgRating && (
                    <div className={classes.outerDiv}>
                      <Rating
                        name="half-rating"
                        // className={classes.rating}
                        defaultValue={reviewData?.avgRating || 0}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  )}
                  {reviewData?.totalCount > 0 && (
                    <Typography
                      variant={'body2'}
                      className={classes.ratingLabel}
                    >
                      {reviewData?.totalCount || 0} verified{' '}
                      {reviewData?.totalCount <= 1 ? 'user' : 'users'}
                    </Typography>
                  )}
                </div>
              )}
            </Grid>
            <Grid item xs={7} md={7}>
              {skeletonLoader ? (
                Array.of(1, 2, 3).map(() => (
                  <>
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
                  </>
                ))
              ) : (
                <div className={classes.progressBar}>
                  {reviewData?.overallPercentage &&
                    Array.isArray(reviewData.overallPercentage) &&
                    reviewData.overallPercentage.map((item: any) => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <div className={classes.progressContainer}>
                          <label className={classes.label}>{item.key}</label>
                          <LinearProgressReviews
                            value={item.rating}
                            isPerc={true}
                          />
                        </div>
                      );
                    })}
                </div>
              )}
              {/* <div className={classes.progressBar}>
                <div className={classes.progressContainer}>
                  <label className={classes.label}>Performance</label>
                  <LinearProgressReviews value={82} isPerc={true} />
                </div>
                <div className={classes.progressContainer}>
                  <label className={classes.label}>Quality</label>
                  <LinearProgressReviews value={90} isPerc={true} />
                </div>
                <div className={classes.progressContainer}>
                  <label className={classes.label}>Value</label>
                  <LinearProgressReviews value={79} isPerc={true} />
                </div>
              </div> */}
            </Grid>
          </Grid>
        </div>
        <Divider className={classes.divider} />
        <CustomerReview
          data={data}
          reviewData={reviewData}
          sku={productData?.sku}
          getReviewData={getReviewData}
          isFetching={isFetching}
        />
        {ratingModalVisibility && (
          <RatingModal
            product={productData}
            // sku={productSku ? productSku : productData?.sku}
            open={ratingModalVisibility}
            handleClose={() => {
              getReviewData(false, true);
              setRatingModalVisibility(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Detail;
