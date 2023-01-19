import React, { useEffect } from 'react';
import {
  Rating,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Divider,
  Skeleton,
  Box,
  Theme,
} from '@mui/material';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import Utils from '../../../utils';
import { ProductDetailModal, ReducersModal } from '../../../models';
import CustomAccordion from '../../../customAccordion';
// import CustomRadio from "../../components/common/miniCart/CustomRadio";
// import CustomAccordion from "../../components/customAccordion";
import IngredientsModal from './ingredientsModal';
import CustomRadio from '../../../common/miniCart/CustomRadio';
import Ingredients from './ingredients';
import Link from 'next/link';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) => ({
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0px',
    '& .MuiRating-root': {
      color: 'var(--main-opacity)',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '40px 0px',
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(15, 0, 0, 0),
    },
  },
  rating: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.5
    )} Work Sans`,
    lineHeight: '16px',
    margin: '0px 5px 0px 0px',
    letterSpacing: '1px',
  },
  rating1: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.5
    )} Work Sans`,
    lineHeight: '16px',
    margin: '0px 3px',
    letterSpacing: '1px',
    color: 'var(--light-gray)',
  },
  subHeading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )} Work Sans`,
    textTransform: 'capitalize',
    lineHeight: '38px',
    letterSpacing: '0.333px',
  },
  details: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '22px',
    letterSpacing: '0.333px',
    display: 'inline-block',
    width: '552px',
    // whiteSpace: "nowrap",
    // overflow: "hidden !important",
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      whiteSpace: 'normal',
    },
  },
  details1: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '22px',
    letterSpacing: '0.333px',
    display: 'inline-block',
    overflow: 'hide',
    '& ul': {
      marginLeft: theme.spacing(1.5),
    },
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans Regular`,
      lineHeight: '22.4px',
    },
  },
  detailsContainer: {
    margin: '15px 0',
  },
  innerButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonContainer: {
    '& .MuiToggleButton-root': {
      border: '1px solid var(--light-gray-text)',
      padding: '13px 22px',
      textTransform: 'none',
      borderRadius: '2px',
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.3
      )} Work Sans`,
      lineHeight: '15px',
      color: 'var(--light-gray)',
      position: 'relative',
      boxSizing: 'border-box',
      overflow: 'hidden',
    },
    '& .MuiToggleButtonGroup-groupedHorizontal': {
      marginRight: '20px',
      [theme.breakpoints.down('md')]: {
        // margin: theme.spacing(1)
      },
    },
    '& .MuiToggleButton-root.Mui-selected': {
      color: 'var(--white)',
      backgroundColor: 'var(--main-opacity)',
    },
  },
  label: {
    margin: '10px 0',
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '16px',
  },
  readMore: {
    display: 'none',
  },
  read: {
    display: 'inline',
  },
  readMoreButton: {
    display: 'block',
    border: 'none',
    color: 'var(--main-opacity)',
    backgroundColor: 'var(--white)',
    cursor: 'pointer',
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )} Work Sans`,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  toggleContainer: {
    '& .MuiToggleButtonGroup-root': {
      display: 'flex',
      flexWrap: 'wrap',
      [theme.breakpoints.down('md')]: {},
    },
  },
  fontLabel: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.6
    )} Work Sans`,
    color: 'var(--secondary-black)',
    margin: theme.spacing(1.0),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
      textAlign: 'center',
    },
  },
  fontError: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.2
    )} Work Sans`,
    color: '#FF0707',
    lineHeight: '14.08px',
    margin: theme.spacing(0),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
      textAlign: 'center',
    },
  },
  fontErrorShade: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.2
    )} Work Sans`,
    color: '#FF0707',
    lineHeight: '14.08px',
    margin: theme.spacing(0.2),
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0.2),
      textAlign: 'left',
    },
  },
  colorSubheading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.2
    )} Work Sans`,
    color: '#FF0707',
    lineHeight: '14.08px',
    margin: theme.spacing(0.2),
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0.2),
      textAlign: 'left',
    },
  },
  multiLineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    width: '80%',
  },
  name: {
    display: 'block',
  },
  headContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0px',
  },
  selectSize: {
    font: `normal ${theme.spacing(1.8)} Recoleta Alt Bold`,
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: 'var(--secondary-black)',
    margin: theme.spacing(3, 0, 1.5, 0),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(3, 0, 1, 0),
      font: `normal ${theme.spacing(1.6)} Recoleta Alt Bold`,
    },
  },
  leftCaption: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.6
    )} Recoleta Alt`,
    lineHeight: '15px',
    letterSpacing: '0.02em',
    color: 'var(--secondary-black)',
    margin: theme.spacing(2, 0, 1.5, 0),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0, 1, 0),
      font: `normal ${theme.spacing(1.6)} Recoleta Alt Bold`,
    },
  },
  rightCaption: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.3
    )} Work Sans`,
    lineHeight: '15px',
    margin: theme.spacing(2, 0, 1.5, 0),
    color: 'var(--main-opacity)',
    backgroundColor: 'var(--white)',
  },
  colorContainer: {
    display: 'flex',
  },
  shades: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      height: 64,
      [theme.breakpoints.down('xs')]: {
        height: '72px',
      },
      // width: 50,
    },
    [theme.breakpoints.down('sm')]: {
      overflowY: 'scroll',
      flexWrap: 'nowrap',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    // paddingLeft: '10px'
  },
  selectShadeBox: {
    height: '80px',
    width: '80px',
    marginLeft: '2px',
    flex: '0 0 auto',
  },
  ShadeDivider: {
    width: '2px',
    marginLeft: '10px',
    backgroundColor: '#F2F2F2',
    // [theme.breakpoints.down("xs")]:{
    //   marginLeft: "0px",
    //   backgroundColour: "none",
    //   width: "none"
    // }
  },
  selectedLabel: {
    font: `normal ${theme.typography.fontWeightLight} ${theme.spacing(
      1.3
    )} Work Sans`,
    lineHeight: '15.25px',
    letterSpacing: '1px',
    marginBottom: '5px',
    textTransform: 'uppercase',
  },
  amountDiv: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0.5, 0),
    flexDirection: 'column',
  },
  amount: {
    font: `normal ${theme.spacing(1.5)} Work Sans SemiBold`,
    color: 'var(--secondary-black)',
    marginRight: theme.spacing(0.5),
  },
  ratingSection: {
    font: `normal ${theme.spacing(1.5)} Work Sans Bold`,
    color: 'black',
    padding: '0px 3px',
    // marginRight: theme.spacing(0.5),
  },
  amount1: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Work Sans`,
    color: theme.palette.primary.main,
    lineHeight: 2,
  },
  mrp: {
    marginLeft: theme.spacing(1),
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.5
    )} Work Sans`,
    color: 'var(--light-gray)',
    textDecorationLine: 'line-through',
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
  },
  rateDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  line: {
    // height: "1px",
    // background: "var(--light-gray)",
    // transform: "rotate(-25deg)",
    // width: theme.spacing(9.3),
    // position: "relative",
    // top: "-22px",
    // left: "-2px",
    width: 'calc(1.414 * 200px)',
    transform: 'rotate(-27deg)',
    transformOrigin: 'bottom left',
    borderTop: '1px solid var(--light-gray)',
    position: 'absolute',
    bottom: '-1px',
    left: '-1px',
    boxSizing: 'border-box',
  },
  accordionHeading: {
    fontWeight: 'bold',
  },
  divider3: {
    // margin: "10px 0px 11px 0px",
  },
}));

const Rate = (_props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const productDetail: any = useSelector(
    (state: any) => state.productDetailReducer
  );

  const productData = productDetail.product;

  let configurableOptions = productData?.configurableProductOptions?.[0];
  let configurableLinks = productData?.configurableProductLinks;
  const [selectedVariant, setSelectedVariant] = React.useState<any>(
    productDetail.selectedVariant
  );
  const [state, setState] = React.useState<any>({
    sizeData: [''],
    shadeData: [''],
    shadeChanged: false,
    sizeChanged: false,
    size_shadeData: false,
    showReadMore: true,
    selectedShade: '',
    selectedLabel: '',
    selectedPrice: 0,
    selectedAmount: '0 ml',
    specialPrice: 0,
    outOfStock: false,
    selectedSizeShade: '',
    selectedVariantData: null,
  });

  const selectVariant = (product: any, i: any) => {
    if (configurableLinks[i].urlKey === router.query.subcategory) {
      return;
    } else {
      router.push(
        {
          pathname: '/[type]/[category]/[subcategory]/p/[googleKey]',
          query: {
            type: router.query.slug,
            category: router.query.category,
            subcategory: configurableLinks[i] && configurableLinks[i].urlKey,
            googleKey: router.query.googleKey,
            val: router.query.val,
          },
        }
        // `/${router.query.slug}/${router.query.category}/${configurableLinks[i].urlKey}/p/${router.query.googleKey}`
      );
    }
  };

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  const options = configurableOptions?.values?.sort(
    (a: any, b: any) =>
      a?.label?.slice(0, a?.label?.length - 2) -
      b?.label?.slice(0, b?.label?.length - 2)
  );

  return (
    <div>
      {skeletonLoader ? (
        <Skeleton variant="rectangular" />
      ) : (
        <div className={classes.ratingContainer}>
          <Link href={'#reviewsAndReviews'}>
            <Rating
              className={classes.rating}
              name="read-only"
              value={productData?.avgRating}
              readOnly
            />
          </Link>
          <Typography className={classes.ratingSection}>
            {`${Math.round(productData?.avgRating)}/5`}
          </Typography>
          <Typography className={classes.rating1}>
            ({productData?.ratingCount})
          </Typography>
        </div>
      )}
      <div className={classes.detailsContainer}>
        {/* Fab for sensitive skin */}
        {skeletonLoader ? (
          <Skeleton variant="rectangular" height={150} />
        ) : (
          <Box>
            {Utils.CommonFunctions.getAttributeValue(
              productData?.customAttributes,
              'description'
            ) ? (
              <CustomAccordion
                id={'description'}
                className={classes.accordionHeading}
                heading="What does it do for you ?"
                details={
                  <Box className={classes.details1}>
                    {ReactHtmlParser(
                      Utils.CommonFunctions.getAttributeValue(
                        productData?.customAttributes,
                        'description'
                      )
                    )}
                  </Box>
                }
                openByDefault={true}
              />
            ) : null}
          </Box>
        )}
      </div>
      {productData && state.sizeData?.length > 1 ? (
        <Divider light className={classes.divider3} />
      ) : null}

      <Ingredients />

      {skeletonLoader ? (
        <Skeleton variant="rectangular" height={150} />
      ) : (
        <>
          {productData?.type === 'configurable' ? (
            Utils.constants.productVariant.indexOf(
              configurableOptions?.attribute_key
            ) > -1 ? (
              <div className={classes.toggleContainer}>
                <div className={classes.toggleContainer}>
                  <div className={classes.headContainer}>
                    <Typography variant="h1" className={classes.leftCaption}>
                      Select {configurableOptions?.label}
                    </Typography>
                  </div>
                  <Typography variant="h1" className={classes.selectedLabel}>
                    {state.selectedLabel}
                  </Typography>
                  <div className={classes.colorContainer}>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      <div>
                        <div
                          className={classes.selectShadeBox}
                          style={{
                            backgroundColor:
                              Utils.CommonFunctions.getColor(selectedVariant),
                          }}
                        ></div>

                        {!productDetail?.selectedVariantData?.isInStock ? (
                          <Typography
                            className={classes.fontErrorShade}
                            style={{ color: '#FF0707' }}
                          >
                            {'Out of Stock'}
                          </Typography>
                        ) : selectedVariant && selectedVariant.label ? (
                          <Typography
                            className={clsx(
                              classes.colorSubheading,
                              classes.multiLineEllipsis
                            )}
                            style={{ color: '#004236' }}
                          >
                            {' '}
                            {selectedVariant && selectedVariant.label}{' '}
                          </Typography>
                        ) : null}
                      </div>

                      <div className={classes.ShadeDivider}></div>
                    </Box>

                    <div className={classes.shades}>
                      {options.map((val: any, i: any) => {
                        let configProduct = configurableLinks.find(
                          (value: any) =>
                            value?.value?.toLowerCase() ===
                            val?.label?.toLowerCase()
                        );

                        let shadeColor = Utils.CommonFunctions.getColor(val);
                        return (
                          configProduct && (
                            <React.Fragment key={i}>
                              <CustomRadio
                                style={{ backgroundColor: shadeColor }}
                                isInStock={configProduct?.isInStock}
                                checked={
                                  selectedVariant?.value_index ===
                                  val?.value_index
                                }
                                value={val?.value_index}
                                name="shade"
                                onChange={() => selectVariant(val, i)}
                              />
                              {/* {/ <StyledCheckbox style={{ backgroundColor: shadeColor, borderRadius: '50%', marginBottom: '3px' }} checked={val?.value_index === selectedVariant?.value_index} value={val?.value_index} name="shade" onClick={() => selectVariant(val)} /> /} */}
                            </React.Fragment>
                          )
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    {/* { !state.outOfStock ?                                     
                            <Typography className={classes.fontErrorShade} style={{'color': '#FF0707'}}>{'Out of Stock'}</Typography>
                        :
                            null
                        } */}
                  </div>
                </div>
              </div>
            ) : (
              <div className={classes.toggleContainer}>
                <div>
                  <Typography className={classes.selectSize}>
                    Select {configurableOptions?.label}
                  </Typography>
                  <div>
                    <ToggleButtonGroup
                      aria-label="text alignment"
                      className={classes.buttonContainer}
                    >
                      {options.map((val: any, i: any) => {
                        let product = configurableLinks?.find(
                          (item: any) => item.size === val.label
                        );
                        let discPrice = product?.customAttributes?.find(
                          (item: any) => item.attribute_code === 'special_price'
                        );
                        let price = product?.price;
                        return (
                          product && (
                            <div onClick={() => selectVariant(val, i)} key={i}>
                              <ToggleButton
                                selected={
                                  // selectedVariant?.isInstock&&
                                  val?.value_index ===
                                  selectedVariant?.value_index
                                }
                                value={val.value_index}
                                aria-label="left aligned"
                              >
                                <div>
                                  {val.label}
                                  {!product?.isInStock && (
                                    <div className={classes.line}></div>
                                  )}
                                </div>
                              </ToggleButton>
                              <div className={classes.amountDiv}>
                                {discPrice?.value ? (
                                  <>
                                    <Typography className={classes.fontLabel}>
                                      ₹
                                      {Utils.CommonFunctions.decimalFlat(
                                        discPrice?.value,
                                        0
                                      )}
                                    </Typography>
                                    {
                                      <Typography className={classes.mrp}>
                                        ₹
                                        {Utils.CommonFunctions.decimalFlat(
                                          price,
                                          0
                                        )}
                                      </Typography>
                                    }
                                  </>
                                ) : (
                                  <>
                                    <Typography className={classes.fontLabel}>
                                      ₹
                                      {Utils.CommonFunctions.decimalFlat(
                                        price,
                                        0
                                      )}
                                    </Typography>
                                  </>
                                )}
                              </div>
                              {/* {/ <Typography className={classes.fontLabel}>₹{`${Math.round(price)}`}</Typography> /} */}
                              {!product?.isInStock ? (
                                <Typography
                                  className={classes.fontError}
                                  style={{ color: '#FF0707' }}
                                >
                                  Out of Stock
                                </Typography>
                              ) : null}
                            </div>
                          )
                        );
                      })}
                    </ToggleButtonGroup>
                  </div>
                </div>
              </div>
            )
          ) : null}
        </>
      )}
    </div>
  );
};

export default Rate;
