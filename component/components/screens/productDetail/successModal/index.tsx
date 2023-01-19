import React from 'react';
import Utils from '../../../../utils';
// import ContainedButton from "../../../components/containedButton";
import {
  Modal,
  Fade,
  Backdrop,
  Typography,
  Divider,
  Theme,
} from '@mui/material';
// import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { ReducersModal } from '../../../../models';
import images from '../../../../utils/images';
import Link from 'next/link';
import { makeStyles } from '@mui/styles';
import ContainedButton from '../../../../common/containedButton';

// import { FAILURE, SUCCESS } from "utils/constantImages";
const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

interface Props {
  open: boolean;
  handleClose: () => void;
  details: any;
  quantity: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(5px)',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    padding: theme.spacing(2, 2, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '3px',
    width: '45%',
    [theme.breakpoints.down('xs')]: {
      width: '95%',
    },
  },
  innerContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2, 0, 0, 0),
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Work Sans`,
    lineHeight: '21px',
  },
  detailsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(4, 0, 0, 0),
  },

  titleContainer: {
    // padding: theme.spacing(0, 2),
    // maxWidth: 213,
  },
  title: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.6
    )} Work Sans`,
    lineHeight: '26px',
    // marginTop: theme.spacing(3),
  },
  quantity: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.2
    )} Work Sans`,
    lineHeight: '14px',
    color: 'var(--light-gray)',
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiButton-root': {
      marginLeft: '5px',
    },
    [theme.breakpoints.down('xs')]: {
      '& .MuiButton-root': {
        fontSize: '14px',
      },
    },
  },
  cartImg: {
    height: '100px',
    width: 100,
    objectFit: 'cover',
    marginRight: theme.spacing(1),
  },
  detailSecondContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexBasis: '80%',
  },
  btnText: {
    '& .MuiButton-root': {
      padding: '15px 60px',
      [theme.breakpoints.down('xs')]: {
        padding: '15px 20px',
      },
    },
  },
}));
const SuccessModal = (props: Props) => {
  const productData = props?.details;
  const classes = useStyles();
  //@ts-ignore
  const [state, setState] = React.useState({
    cartAdded: false,
    specialPrice: 0,
  });

  const priceData: any = useSelector(
    (state: ReducersModal) => state.productDetailReducer
  );

  let discPrice = Utils.CommonFunctions.getAttributeValue(
    priceData?.selectedVariantData?.customAttributes,
    'special_price'
  );

  let price = discPrice ?? priceData?.selectedVariantData?.price;
  let label = priceData && priceData?.selectedVariantData?.value;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.open}
      // open={state.openModal}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <div className={classes.paper}>
          {priceData?.redirect === 'Unable to add' ? (
            <>
              <div className={classes.innerContainer}>
                <img src={images.FAILURE} alt="success" />
              </div>
              <div className={classes.innerContainer}>
                <Typography variant="h4" className={classes.heading}>
                  {priceData?.redirect}
                </Typography>
              </div>
            </>
          ) : (
            <>
              <div className={classes.innerContainer}>
                <img src={images.SUCCESS} alt="success" />
              </div>
              <div className={classes.innerContainer}>
                <Typography variant="h4" className={classes.heading}>
                  Product added to your cart
                </Typography>
              </div>
            </>
          )}

          <div className={classes.detailsContainer}>
            <div className={classes.detailSecondContainer}>
              <img
                src={
                  IMAGE_URL + 'catalog/product' + productData?.image?.[0]?.file
                }
                alt="product"
                className={classes.cartImg}
              />
              <div className={classes.titleContainer}>
                <Typography className={classes.title}>
                  {productData?.name}
                </Typography>
                <Typography className={classes.quantity}>
                  Quantity {props.quantity} {label ? ` • ${label}` : null}
                </Typography>
              </div>
            </div>

            {state.specialPrice ? (
              <Typography className={classes.title}>
                ₹{Utils.CommonFunctions.decimalFlat(state.specialPrice, 0)}
              </Typography>
            ) : (
              <Typography className={classes.title}>
                {' '}
                ₹{Utils.CommonFunctions.decimalFlat(price)}
              </Typography>
            )}
          </div>
          <Divider light className={classes.divider} />
          <div className={classes.buttonContainer}>
            {/* <Link to='/product-listing'> */}
            <ContainedButton
              text={'Continue Shopping'}
              isOutline={true}
              isGreen={true}
              onClick={props.handleClose}
            />
            {/* </Link> */}
            <Link href="/shopping-bag">
              <div className={classes.btnText}>
                <ContainedButton text={'View Bag'} />
              </div>
            </Link>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default SuccessModal;
