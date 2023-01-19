/* eslint-disable @next/next/no-img-element */
import { Theme, Grid, Typography, Rating, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../../../common/breadCrumb';
import Utils from '../../../../utils';
// import { PRODUCT_PLACEHOLDER_2 } from 'utils/constantImages';
// import BreadCrumb from "../../../components/breadCrumb";
// import { saveLocationHistory } from "../../../components/breadCrumb/action";
// import { ReducersModal } from "../../../models";
// import Utils from "../../../utils";
// import { getReviews } from "../../productDetail/action";
import Detail from './detail';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(19, 6),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, 1),
    },
  },
  imageContainer: {
    width: '95%',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    marginBottom: theme.spacing(2),
  },
  noImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '20px',
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.8
    )} Recoleta Alt`,
    lineHeight: '38px',
    color: 'var(--secondary-black)',
  },
  rating: {
    color: 'var(--main-opacity) !important ',
  },
  text: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )} Work Sans SemiBold`,
    lineHeight: '23px',
    color: 'var(--secondary-black)',
    margin: theme.spacing(0, 0.7),
  },
  bodyText: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '16px',
    color: 'var(--light-gray)',
  },
  outerDiv: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiRating-root': {
      color: 'var(--main-opacity)',
    },
  },
  price: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.4
    )} Work Sans`,
    lineHeight: '28px',
    color: 'var(--secondary-black)',
  },
  discountPrice: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      2.4
    )} Work Sans`,
    lineHeight: '28px',
    color: 'var(--light-gray)',
    textDecorationLine: 'line-through',
    margin: theme.spacing(0, 1),
  },
  secndDiv: {
    margin: theme.spacing(1, 0),
  },
  outerContainer: {
    position: 'sticky',
    top: '20%',
  },
  mainContainer: {
    marginTop: '20px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '15px',
    },
  },
}));

const ReviewList = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;

  // const [data, setData] = useState<any>([]);
  const [reviewData, setReviewData] = useState<any>({});
  const [breadcrumb, setBreadcrumb] = useState<any>([]);
  const productData =
    useSelector((state: any) => state.productDetailReducer?.product) || {};
  const img = productData?.image?.[0]?.file
    ? IMAGE_URL + 'catalog/product' + productData.image[0].file
    : ""
    // PRODUCT_PLACEHOLDER_2;
  const discountPrice = productData.customAttributes
    ? _.find(productData.customAttributes, { attribute_code: 'special_price' })
        ?.value
    : 0;

  return (
    <div className={classes.root}>
      {breadcrumb.length > 0 && <BreadCrumb breadcrumb={breadcrumb} />}
      <Grid container className={classes.mainContainer}>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <div className={classes.outerContainer}>
              <div className={classes.imageContainer}>
                <img
                  className={
                    productData?.image?.[0]?.file
                      ? classes.image
                      : classes.noImage
                  }
                  src={img}
                  alt="product"
                />
              </div>
              <div>
                <Typography variant={'body1'} className={classes.heading}>
                  {productData?.name || ''}
                </Typography>
              </div>
              <div className={classes.outerDiv}>
                {reviewData?.avgRating && (
                  <Rating
                    name="half-rating"
                    // onChange={(event: any, newValue: any) => {
                    //     setValue(newValue);
                    // }}
                    defaultValue={
                      reviewData?.avgRating ? Number(reviewData?.avgRating) : 0
                    }
                    precision={0.5}
                    readOnly
                  />
                )}
                <div className={classes.outerDiv}>
                  {reviewData?.avgRating && (
                    <Typography variant={'body1'} className={classes.text}>
                      {reviewData?.avgRating || 0}/5
                    </Typography>
                  )}
                  <Typography variant={'body2'} className={classes.bodyText}>
                    ({reviewData?.totalCount || 0})
                  </Typography>
                </div>
              </div>
              <div className={[classes.outerDiv, classes.secndDiv].join(' ')}>
                <Typography
                  variant={'body2'}
                  className={
                    discountPrice ? classes.discountPrice : classes.price
                  }
                >
                  ₹
                  {Utils.CommonFunctions.addCommaToAmount(
                    productData?.price || 0
                  )}
                </Typography>
                {discountPrice && (
                  <Typography variant={'body1'} className={classes.price}>
                    ₹
                    {discountPrice
                      ? Utils.CommonFunctions.decimalFlat(discountPrice, 0)
                      : 0}
                  </Typography>
                )}
              </div>
            </div>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Detail setBreadcrumb={setBreadcrumb} setReviewData={setReviewData} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ReviewList;
