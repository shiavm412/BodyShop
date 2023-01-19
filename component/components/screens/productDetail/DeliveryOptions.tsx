// @ts-nocheck
import { Typography, Divider, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Utils from '../../../utils';
import { checkPincode } from './action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import images from '../../../utils/images';
import { ReducersModal } from '../../../models';
import {
  showLoader,
  hideLoader,
  getConfig,
} from '../../../../store/home/action';
import {
  getAddressFromLatLng,
  getLocation,
} from '../../../../store/storeLocaton/action';

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
  input: {
    width: '100%',
    outline: 'none',
    border: 'none',
    background: 'transparent',
    lineHeight: '16px',
    // color: "rgba(4, 66, 54, 0.5)",
    color: 'var(--black)',
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )} Recoleta Alt`,
  },
  inputContainer: {
    backgroundColor: 'rgba(61, 133, 126, 0.1)',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
    margin: theme.spacing(1.5, 0),
  },
  details: {
    '& img': {
      marginRight: theme.spacing(1),
    },
    font: `normal 400 ${theme.spacing(1.4)} Work Sans`,
    lineHeight: '22px',
    letterSpacing: '0.33px',
    color: 'var(--light-gray)',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.3)} Work Sans Regular`,
    },
  },
  divider: {
    margin: theme.spacing(3, 0, 1, 0),
  },
  skeleton: {
    margin: '10px 0px',
  },
}));

const DeliveryOptions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [pincode, setPincode] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<any>();
  const deliveryOptionText: any =
    useSelector(
      (state: any) => state.configReducer.generalConfigs?.deliveryOptionText
    ) || '';

  useEffect(() => {
    if (pincode.length === 6) {
      handleChange();
    } else if (pincode.length === 0) {
      setDeliveryOption(undefined);
    }
  }, [pincode]);

  // useEffect(()=>{
  //   dispatch(getConfig({ configCode: "general" }));
  //   dispatch(getConfig({ configCode: "payment" }));
  // },[])

  const handleChange = () => {
    // dispatch(showLoader());
    checkPincode({ pincode: Number(pincode) })
      .then((resp) => {
        if (resp) {
          dispatch(hideLoader());
          setDeliveryOption(resp.data.data);
        } else {
          dispatch(hideLoader());
        }
      })
      .catch((err) => {
        dispatch(hideLoader());
        setDeliveryOption(undefined);
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: err.response.data.message,
            },
          });
      });
  };
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  return (
    <div>
      <Typography className={classes.heading}>
        {skeletonLoader ? <Skeleton /> : 'Delivery Option'}
      </Typography>
      {skeletonLoader ? (
        <Skeleton
          className={classes.skeleton}
          variant="rectangular"
          height={50}
        />
      ) : (
        <div className={classes.inputContainer}>
          <input
            type="text"
            placeholder="Enter Pin Code"
            className={classes.input}
            onChange={(e) => setPincode(e.target.value)}
            maxLength={6}
            value={pincode}
          />
          <div
            onClick={() => {
              getLocation()
                .then((resp: any) => {
                  const lat = resp.latitude;
                  const lng = resp.longitude;
                  getAddressFromLatLng(`${lat},${lng}`).then((resp: any) => {
                    if (resp) {
                      let data = resp?.data?.results?.[0];
                      let pincode = data.address_components.find((item: any) =>
                        item.types.includes('postal_code')
                      );
                      setPincode(pincode.long_name);
                    }
                  });
                })
                .catch((_err) => {});
            }}
          >
            {/* <img src={Utils.images.SEARCH_LOCATION} alt="search" /> */}
          </div>
        </div>
      )}

      {skeletonLoader ? (
        <Skeleton
          className={classes.skeleton}
          variant="rectangular"
          height={50}
        />
      ) : (
        <>
          {deliveryOption ? (
            <div>
              {deliveryOption?.expressDeliveryStatus && (
                <Typography className={classes.details}>
                  <img src={images.EXPR_DELIVERY} alt="delivery van" />
                  Express delivery - Get it by{' '}
                  {Utils.CommonFunctions.unixToDate(
                    deliveryOption.expressDate,
                    'D MMMM'
                  )}{' '}
                  for ₹{' '}
                  {Utils.CommonFunctions.addCommaToAmount(
                    deliveryOption.expressShippingCharge
                  )}
                </Typography>
              )}
              {deliveryOption?.standardDeliveryStatus && (
                <Typography className={classes.details}>
                  <img src={images.STND_DELIVERY} alt="delivery van" />
                  Standard delivery - Get it by{' '}
                  {Utils.CommonFunctions.unixToDate(
                    deliveryOption.normalDate,
                    'D MMMM'
                  )}{' '}
                  for ₹{' '}
                  {Utils.CommonFunctions.addCommaToAmount(
                    deliveryOption.normalShippingCharge
                  )}
                </Typography>
              )}
            </div>
          ) : (
            <div>
              <Typography className={classes.details}>
                {deliveryOptionText || ''}
              </Typography>
            </div>
          )}
        </>
      )}
      <Divider light className={classes.divider} />
    </div>
  );
};

export default DeliveryOptions;
