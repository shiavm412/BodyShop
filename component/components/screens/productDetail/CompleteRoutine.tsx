import React from 'react';
import { Divider, Theme, Typography, Rating } from '@mui/material';
import { makeStyles } from '@mui/styles';
// import images from "../../utils/images";
// import ContainedButton from "../../components/containedButton";
// import { addCompleteYourRoutine } from "./action";
import { useDispatch, useSelector } from 'react-redux';
import Utils from '../../../utils';
// import { Link } from "react-router-dom";
import { ReducersModal } from '../../../models';
import _ from 'lodash';
import clsx from 'clsx';
import { addCompleteYourRoutine } from './action';
import images from '../../../utils/images';
import Link from 'next/link';
import ContainedButton from '../../../common/containedButton';

const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    margin: theme.spacing(2.5, 0, 2, 0),
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Recoleta Alt`,
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: 'var(--secondary-black)',
  },
  image: {
    // width: "104px",

    height: '100%',
    aspectRatio: '2/3',
    objectFit: 'cover',
    width: '100%',
  },
  productImage: {
    width: '150px',

    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      height: '140px',
    },
  },
  proName: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.3
    )} Recoleta Alt`,
    lineHeight: '21px',
    width: '100px',
    whiteSpace: 'normal',
    height: '40px',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
    color: '#333333 !important',
    // [theme.breakpoints.down("xs")]: {
    //   fontSize: "10px",
    //   height: "22px",
    //   lineHeight: "auto"
    // }
  },
  productContainer: {
    display: 'flex',
    alignItems: 'start',
    // justifyContent: "space-between",
    flexWrap: 'wrap',
    [theme.breakpoints.up('xs')]: {
      flexWrap: 'nowrap',
      // columnGap: "23px",
      overflowX: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
  plusImage: {
    marginTop: '100px',
  },
  rating: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.3
    )} Work Sans`,
    lineHeight: '15.25px',
    margin: theme.spacing(0, 0, 0, 0),
    color: 'var(--primary)',
  },
  rating1: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.3
    )} Work Sans`,
    lineHeight: '15px',
    color: 'var(--light-gray)',
  },
  total: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.2
    )} Work Sans`,
    lineHeight: '14px',
    margin: theme.spacing(0, 0.5),
    color: 'var(--light-gray)',
  },
  ratingContainer: {
    display: 'flex',
    margin: theme.spacing(0.5, 0, 0, 0),
    alignItems: 'center',
  },
  quantity: {
    margin: theme.spacing(0.5, 0),
    color: '#004236 !important',
    [theme.breakpoints.down('xs')]: {
      fontSize: '11px',
    },
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  rate: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.3
    )} Work Sans`,
    lineHeight: '15px',
    color: 'var(----secondary-black)',
  },
  totalRate: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2
    )} Work Sans`,
    lineHeight: '23px',
    color: 'var(----secondary-black)',
  },
  rateDetail: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.3
    )} Work Sans`,
    lineHeight: '15px',
    margin: theme.spacing(1, 0),
    color: '#666666 !important',
  },
  rateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountPrice: {
    // font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
    //     2.4
    // )} Work Sans`,
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.3
    )} Work Sans`,

    color: 'var(--grey-color)',
    lineHeight: '28px',
    textDecoration: 'line-through',
    marginRight: '12px',
  },
  addToBag: {
    padding: '10px 20px !important',
  },
  imgDivPlus: {
    margin: theme.spacing(9, 1.5),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(6, 0),
    },
  },
  multiLineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },
}));

const CompleteRoutine = (props: any) => {
  const linkedProducts = props && props?.details;
  const productData = props && props?.product;
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const [state, setState] = React.useState({
    productCount: 0,
    totalPrice: 0,
    calculation: false,
  });
  const selectedVariantData: any = useSelector(
    (state: ReducersModal) => state.productDetailReducer.selectedVariantData
  );

  let discPrice: any;
  if (selectedVariantData) {
    discPrice = _.find(selectedVariantData?.customAttributes, {
      attribute_code: 'special_price',
    });
    // let discPrice1 = productData?.customAttributes?.find((item: any) => item.attribute_code == 'special_price')
  }
  if (linkedProducts && !state.calculation) {
    let price = 0;
    linkedProducts?.map((item: any, index: number) => {
      if (index < 2) price += item.price;
    });
    price += productData?.price;
    setState({
      ...state,
      productCount: linkedProducts.length < 2 ? linkedProducts.length + 1 : 3,
      totalPrice: price,
      calculation: true,
    });
  }

  const handleAddRoutine = () => {
    let params: any = { items: [] };
    let data: any = {};
    if (productData.type === 'simple') {
      data = {
        productId: productData.magentoId,
        attributeData: [],
        type: productData.type,
        quantity: 1,
      };
    } else {
      data = {
        productId: productData.magentoId,
        attributeData: [
          {
            value:
              productData?.configurableProductOptions &&
              productData?.configurableProductOptions?.[0]?.values?.[0]
                ?.value_index,
            id:
              productData?.configurableProductOptions &&
              productData?.configurableProductOptions[0]?.attribute_id,
          },
        ],
        type: productData.type,
        quantity: 1,
      };
    }
    params['items'].push(data);

    linkedProducts?.forEach((item: any) => {
      data = {
        productId: item.magentoId,
        attributeData: [],
        type: item.type,
        quantity: 1,
      };
      if (item?.configurableProductOptions?.length) {
        data.attributeData = [
          {
            value:
              item?.configurableProductOptions &&
              item?.configurableProductOptions?.[0]?.values?.[0]?.value_index,
            id:
              item?.configurableProductOptions &&
              item?.configurableProductOptions[0]?.attribute_id,
          },
        ];
      }
      params['items'].push(data);
    });
    dispatch(addCompleteYourRoutine(params));
  };

  let configurableProduct =
    productData?.configurableProductLinks?.find(
      (item: any) => item?.isInStock
    ) || productData?.configurableProductLinks?.[0];
  const configWeight = _.find(configurableProduct?.customAttributes, {
    attribute_code: 'size',
  })?.[0]?.label?.[0]?.label;
  const customWeight =
    _.find(productData.customAttributes, {
      attribute_code: 'size',
    })?.[0]?.label?.[0]?.label || null;

  let weight =
    productData?.type === 'configurable' ? configWeight : customWeight;

  if (!weight)
    weight = productData?.stockItem.qty
      ? productData?.stockItem?.qty + 'ml'
      : null;

  return (
    <div>
      <Typography className={classes.heading}>Complete your Routine</Typography>
      <div className={classes.productContainer}>
        {/* Current Product */}
        <React.Fragment>
          <div>
            {/* <img src={images.CART_PRODUCT} alt="product" /> */}
            <div className={classes.productImage}>
              <img
                src={`${IMAGE_URL}catalog/product${productData?.image[0]?.file}`}
                className={classes.image}
                alt="product"
              />
            </div>
            <Typography
              className={clsx(classes.proName, classes.multiLineEllipsis)}
              title={productData?.name}
            >
              {productData?.name}
            </Typography>
            <div className={classes.ratingContainer}>
              {/* <img src={images.STAR_TWO} alt="star" /> */}
              <Rating
                className={classes.rating}
                name="read-only"
                value={productData?.avgRating}
                readOnly
              />
              {/* <img src={`${Utils.images.STAR_TWO}`} alt="rating" /> */}
              <Typography className={classes.rating}>
                {/* {productData?.avgRating} */}
                <span className={classes.total}>
                  {' '}
                  ({productData?.ratingCount})
                </span>
              </Typography>
            </div>
            <Typography color="primary" className={classes.quantity}>
              {weight}
            </Typography>
            {/* <Typography className={classes.rate}>₹ {productData?.price}</Typography> */}
            <Typography className={classes.rate}>
              {discPrice ? (
                <>
                  <span className={classes.discountPrice}>
                    {' '}
                    ₹{' '}
                    {Utils.CommonFunctions.decimalFlat(
                      selectedVariantData?.price
                    )}
                  </span>
                  ₹ {Utils.CommonFunctions.decimalFlat(discPrice?.value)}
                </>
              ) : (
                <>
                  ₹{' '}
                  {Utils.CommonFunctions.decimalFlat(
                    selectedVariantData?.price
                  )}
                </>
              )}
            </Typography>
          </div>
          <div className={classes.imgDivPlus}>
            <img src={images.PLUS_PRODUCT} alt="plus" />
          </div>
        </React.Fragment>

        {/* Linked Products */}
        {linkedProducts &&
          linkedProducts?.map((item: any, index: any) => {
            let configurableProduct = item?.configurableProductLinks?.find(
              (item: any) => item?.isInStock
            );

            const configWeight = _.find(configurableProduct?.customAttributes, {
              attribute_code: 'size',
            })?.[0]?.label?.[0]?.label;
            const customWeight =
              _.find(item.customAttributes, {
                attribute_code: 'size',
              })?.[0]?.label?.[0]?.label || null;

            let weight =
              item?.type === 'configurable'
                ? configWeight
                  ? configWeight
                  : customWeight
                  ? customWeight
                  : 0
                : customWeight
                ? customWeight
                : 0;

            if (!weight)
              weight = item?.stockItem?.qty
                ? item?.stockItem?.qty + 'ml'
                : null;
            let pathname = Utils.CommonFunctions.seoUrl(item, 'pdp');

            if (index < 2)
              return (
                <React.Fragment key={index}>
                  <div key={item.id}>
                    <Link href={pathname}>
                      <div className={classes.productImage}>
                        <img
                          src={`${IMAGE_URL}catalog/product${item.image[0]?.file}`}
                          className={classes.image}
                          alt="product"
                        />
                      </div>

                      <Typography
                        className={clsx(
                          classes.proName,
                          classes.multiLineEllipsis
                        )}
                        title={item?.name}
                      >
                        {item.name}
                      </Typography>
                    </Link>
                    <div className={classes.ratingContainer}>
                      <Rating
                        className={classes.rating}
                        name="read-only"
                        value={item?.avgRating}
                        readOnly
                      />
                      {/* <img src={`${Utils.images.STAR_TWO}`} alt="rating" /> */}
                      <Typography className={classes.rating}>
                        {/* {item.avgRating} */}
                        <span className={classes.total}>
                          {' '}
                          ({item.ratingCount})
                        </span>
                      </Typography>
                    </div>
                    <Typography color="primary" className={classes.quantity}>
                      {weight}
                    </Typography>
                    <Typography className={classes.rate}>
                      ₹ {Utils.CommonFunctions.addCommaToAmount(item.price)}
                    </Typography>
                  </div>
                  {/* {
                            product.length - 1 !== index && <img src={images.PLUS_PRODUCT} alt="plus" />
                        } */}
                  {index < 1 && linkedProducts.length >= 2 && (
                    <div className={classes.imgDivPlus}>
                      <img src={images.PLUS_PRODUCT} alt="plus" />
                    </div>
                  )}
                </React.Fragment>
              );
          })}
      </div>
      <Divider light className={classes.divider} />
      <div className={classes.rateContainer}>
        <div>
          <Typography className={classes.totalRate}>
            ₹ {Utils.CommonFunctions.addCommaToAmount(state.totalPrice)}
          </Typography>
          <Typography className={classes.rateDetail}>
            Price for all {state?.productCount}
          </Typography>
        </div>
        <ContainedButton
          className={classes.addToBag}
          text="Add to bag"
          onClick={() => handleAddRoutine()}
        />
      </div>
    </div>
  );
};

export default CompleteRoutine;
