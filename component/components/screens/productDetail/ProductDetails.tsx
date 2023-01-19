import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Utils from '../../../utils';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { ReducersModal } from '../../../models';
import Skeleton from '@mui/material/Skeleton';

const useStyles = makeStyles((theme: Theme) => ({
  headContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0px 0px',
  },
  nameContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      '& :nth-child(1)': {
        flexBasis: '50%',
      },
      '& :nth-child(2)': {
        // flexBasis: "60%"
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
      },
    },
  },
  heading: {
    font: `normal ${theme.spacing(2.2)} Work Sans semiBold`,
    textTransform: 'capitalize',
    lineHeight: '38px',
    paddingRight: '28px',
    [theme.breakpoints.down('xs')]: {
      lineHeight: '25px',
      font: `normal ${theme.spacing(2)} Recoleta Alt Bold`,
      letterSpacing: '0.04em',
      paddingRight: '0px',
    },
  },
  caption: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.3
    )} Work Sans`,
    lineHeight: '15px',
    color: 'var(--light-gray)',
    margin: '8px 0',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.2)} Work Sans Regular`,
    },
  },
  taxCaption: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.3
    )} Work Sans`,
    lineHeight: '15px',
    color: 'var(--light-gray)',
  },
  amount: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.5
    )} Work Sans`,
    color: 'var(--secondary-black)',
    marginRight: theme.spacing(0.5),
  },
  price: {
    marginLeft: theme.spacing(1),
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.5
    )} Work Sans`,
    color: 'var(--light-gray)',
    textDecorationLine: 'line-through',
  },
  specialPrice: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Work Sans`,
    // color: theme.palette.primary.main,
    lineHeight: 2,
  },
  discountPrice: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      2.4
    )} Work Sans`,
    color: 'var(--grey-color)',
    lineHeight: '28px',
    textDecoration: 'line-through',
    marginRight: '12px',
  },
  originalPrice: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.4
    )} Work Sans`,
    color: 'var(--secondary-black)',
    lineHeight: '28px',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.2
      )} Work Sans Bold`,
    },
  },
  skeletonContent: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  skeleton: {
    margin: '5px 0px',
  },
}));

const ProductDetails = (props: any) => {
  const productData = props && props?.details;
  // const [state, setState] = React.useState({
  //     price: 0,
  // })
  const classes = useStyles();

  const priceData: any = useSelector(
    (state: ReducersModal) => state.productDetailReducer
  );

  let discPrice: any;
  if (priceData?.selectedVariantData) {
    discPrice = _.find(priceData?.selectedVariantData?.customAttributes, {
      attribute_code: 'special_price',
    });
    // let discPrice1 = productData?.customAttributes?.find((item: any) => item.attribute_code == 'special_price')
  }
  let configurableProduct = productData?.configurableProductLinks?.find(
    (item: any) => item?.isInStock
  );
  // || productData?.configurableProductLinks[0];
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  return (
    <div>
      {skeletonLoader ? (
        Array.of(1, 2).map((index: any) => (
          <div className={classes.skeletonContent} key={index}>
            <Skeleton
              className={classes.skeleton}
              variant="rectangular"
              height={20}
              width={'55%'}
            />
            <Skeleton
              className={classes.skeleton}
              variant="rectangular"
              height={20}
              width={'30%'}
            />
          </div>
        ))
      ) : productData ? (
        <div className={classes.headContainer}>
          <div className={classes.nameContainer}>
            <div>
              <Typography variant="h1" className={classes.heading}>
                {priceData?.selectedVariantData?.name}
              </Typography>
            </div>
            <div>
              <Typography variant="h2" className={classes.originalPrice}>
                {discPrice ? (
                  <>
                    <span className={classes.discountPrice}>
                      {' '}
                      ₹
                      {Utils.CommonFunctions.decimalFlat(
                        priceData?.selectedVariantData?.price
                      )}
                    </span>
                    ₹{Utils.CommonFunctions.decimalFlat(discPrice?.value)}
                  </>
                ) : (
                  <>
                    ₹
                    {Utils.CommonFunctions.decimalFlat(
                      priceData?.selectedVariantData?.price
                    )}
                  </>
                )}
              </Typography>
              <Typography variant="h1" className={classes.caption}>
                Inclusive of all taxes
              </Typography>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {skeletonLoader ? (
        <Skeleton
          className={classes.skeleton}
          variant="rectangular"
          height={20}
          width={'30%'}
        />
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html:
              productData?.type === 'configurable'
                ? _.find(configurableProduct?.customAttributes, {
                    attribute_code: 'short_description',
                  })?.value
                : _.find(productData?.customAttributes, {
                    attribute_code: 'short_description',
                  })?.value || '',
          }}
          className={classes.caption}
        />
      )}
    </div>
  );
};

export default ProductDetails;
