import React, { useEffect, useState } from 'react';
import {
  Theme,
  Grid,
  Button,
  Divider,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAddress, getAddress } from '../../../common/addToCart/action';
import { screenViewed } from '../../../utils/event/action';
import MessageDialog from '../../../common/messageDialog';
import GreenRadio from '../../../common/customRadio';
import MobileAddressForm from './mobileAddressForm';
import events from '../../../utils/event/constant';
import Utils from '../../../utils';

const useStyles = makeStyles((theme: Theme) => ({
  shoppingDiv: {
    padding: theme.spacing(2.5, 0),
    [theme.breakpoints.down('xs')]: {
      // overflowX: "clip",
      padding: '0px 0px  30px 0px',
    },
    // backgroundColor: "var( --backgroun-color)",
  },
  content: {
    [theme.breakpoints.down('xs')]: {
      // margin: "10px 20px"
      padding: '0px 0px  30px 0px',
    },
  },
  outerContent: {
    [theme.breakpoints.down('xs')]: {
      margin: '30px 0px',
      padding: '0px 10px',
    },
  },

  reuseDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  reuseHeading: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.5
    )} Work Sans`,
    color: 'var(--secondary-black)',
    display: 'flex',
    alignItems: 'center',
  },
  divider: { marginTop: '20px', marginBottom: '18px' },
  addressContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: 'var(--white)',
      padding: '20px',
      // boxShadow: "var(--box-shadow-div)",
      margin: '0px 0px 20px 0px',
      // boxShadow: "0px 5px #F8F8F8"
    },
  },
  addButton: {
    width: '100%',
    padding: '12px',
    textTransform: 'none',
    marginTop: '10px',
    borderRadius: '4px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      font: `normal ${theme.spacing(1.4)} Work Sans Medium`,
    },
  },
  addressCount: {
    font: `normal ${theme.spacing(1.6)} Recoleta Alt Bold`,
    color: '#333333',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 0px 20px 0px',
    lineHeight: '21.76px',
    letterSpacing: '1px',
    marginTop: '20px',
  },
  addressContent: { display: 'flex', alignItems: 'flex-start' },
  imgContainer: { width: '25px', height: '25px' },
  labelContainer: { marginLeft: '10px' },
  buttonContainer: { marginTop: '15px' },
  addressButton: {
    width: '90px',
    height: '28px',
    background: '#FFFFFF',
    border: ' 1px solid #044236',
    boxSizing: 'border-box',
    borderRadius: '4px',
    fontSize: '14px',
    textTransform: 'none',
    padding: '18px',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.3)} Work Sans Medium`,
    },
  },
  radioButton: {
    transition: 'none',
    '&:hover': { backgroundColor: 'white' },
    width: '14px',
    height: '14px',
  },
  rightButton: {
    borderRadius: '4px',
    marginLeft: '13px',
  },
  label: {
    fontFamily: 'Work Sans',
    fontSize: '16px',
    fontWeight: 500,
    color: '#333333',
    textTransform: 'capitalize',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.6)} Work Sans Medium`,
    },
  },
  description: {
    fontSize: '13px',
    fontFamily: 'Work Sans',
    fontWeight: 400,
    color: '#666666',
    marginTop: '3px',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.3)} Work Sans Regular`,
    },
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.4
    )} Recoleta Alt`,
    lineHeight: '33px',
    color: 'var(--secondary-black)',
    letterSpacing: '0.02em',
  },
  icon: {
    // height: "100%",
    width: '23px',
    maxWidth: '23px',
  },
}));
interface Props {
  radioButton?: boolean;
  checkoutAddressId: string | null;
  setCheckoutAddressId: Function;
  addressTitle?: string;
  section?: string;
  addButtonBottom?: boolean;
}

const MobileAddress: React.FC<Props> = (props: Props) => {
  const [addressVisibility, setAddressVisibility] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirm, setConfirmPopUp] = useState(false);
  const [selectedEditAddressId, setSelectedEditAddressId] = useState<
    string | null
  >(null);
  const [addressToBeDeleted, setAddressToBeDeleted] = useState<any>(null);
  const dispatch: any = useDispatch();
  const classes = useStyles();
  const {
    setCheckoutAddressId,
    checkoutAddressId,
    radioButton,
    addressTitle,
    section,
    addButtonBottom,
  } = props;
  const addressFlag: any = useSelector(
    (state: any) => state.addressReducer.addressFlag
  );
  const data: any = useSelector((state: any) => state.shoppingBagReducer);
  useEffect(() => {
    window.scrollTo(0, 0);
    getAddressData();

    /**
     * Event logger
     */
    screenViewed({
      ScreenName: events.SCREEN_ADDRESS,
      CTGenerated: 'WEB',
    });
  }, []);
  useEffect(() => {
    if (!addressFlag) {
      setSelectedEditAddressId(null);
    }
  }, [addressFlag]);

  useEffect(() => {
    setCheckoutAddressId(data?.address?._id);
  }, [address.length, data?.address?._id]);

  const getAddressData = () => {
    dispatch(
      getAddress((response: any) => {
        if (response) {
          if (response?.data?.data?.length > 0) {
            const data = response?.data?.data || [];
            setAddress(data);
            const defaultData = data.find((item: any) => item.isDefault);
            setCheckoutAddressId(
              data?.address?._id ||
                checkoutAddressId ||
                defaultData?._id ||
                data?.[0]?._id ||
                null
            );
          } else setCheckoutAddressId(null);
        }
      })
    );
  };

  const addAddress = () => {
    // history.push({
    //   pathname: "/address-form",
    //   state: {
    //     setAddress: setAddress,
    //     checkoutAddressId: checkoutAddressId,
    //     setCheckoutAddressId: setCheckoutAddressId,
    //     flag: 'add',
    //     setAddressVisibility: setAddressVisibility
    //   }
    // })
    setAddressVisibility(!addressVisibility);
    dispatch({ type: 'addressFlag', payload: 'Add Address' });
    setSelectedEditAddressId(null);
  };

  const onHomeEditChange = (editId: string) => {
    setSelectedEditAddressId(editId);
    setAddressVisibility(false);
    dispatch({ type: 'addressFlag', payload: editId ? 'Edit Address' : null });
  };

  const onSelectionChange = (data: any) => {
    // setAddressType(data.addressType);
    setCheckoutAddressId(data._id);
  };

  const removeAddress = () => {
    if (addressToBeDeleted?._id)
      dispatch(
        deleteAddress(addressToBeDeleted._id, (response: any) => {
          setAddress(response?.data?.data || []);

          if (checkoutAddressId === addressToBeDeleted?._id) {
            if (response?.data?.data?.length === 0) setCheckoutAddressId(null);
            if (response?.data?.data?.length > 0) {
              const data = response?.data?.data || [];
              const defaultData = data.find((item: any) => item.isDefault);
              setCheckoutAddressId(defaultData?._id || data?.[0]?._id || null);
            }
          }
        })
      );
    setConfirmPopUp(!confirm);
  };
  const showSection = addressFlag;
  return (
    <Grid container className={section !== 'mybag' ? classes.outerContent : ''}>
      {confirm && (
        <MessageDialog
          cancelText={'Cancel'}
          okText={'Confirm'}
          open={confirm}
          handleClose={() => setConfirmPopUp(!confirm)}
          onOk={removeAddress}
          message={'Are you sure you want to remove the address ?'}
          heading={'Remove Address'}
        />
      )}
      <Grid item xs={12} md={12}>
        {!showSection && addressTitle && (
          <Typography className={classes.heading}>{addressTitle}</Typography>
        )}
        {addressFlag === 'Add Address' ? (
          <MobileAddressForm
            setAddress={setAddress}
            checkoutAddressId={checkoutAddressId}
            setCheckoutAddressId={setCheckoutAddressId}
            flag={'add'}
            setAddressVisibility={setAddressVisibility}
            getAddressData={getAddressData}
          />
        ) : selectedEditAddressId || addButtonBottom ? null : (
          <Button
            onClick={addAddress}
            className={clsx(classes.addButton)}
            variant="outlined"
            color="primary"
          >
            Add New Address
          </Button>
        )}
        <div
          className={clsx(
            classes.shoppingDiv,
            section !== 'mybag' ? classes.content : ''
          )}
        >
          {!addressFlag && !addButtonBottom && (
            <Typography className={classes.addressCount}>
              {address?.length +
                (address?.length > 1 ? ' Saved Addresses' : ' Saved Address')}
            </Typography>
          )}
          {/* address-starts */}
          {address?.length > 0 &&
            address?.map((addressData: any) => {
              return (
                <Paper key={addressData._id}>
                  {selectedEditAddressId === addressData._id &&
                  addressFlag === 'Edit Address' ? (
                    <MobileAddressForm
                      section={section}
                      setAddress={setAddress}
                      checkoutAddressId={checkoutAddressId}
                      setCheckoutAddressId={setCheckoutAddressId}
                      key={addressData._id}
                      flag={'edit'}
                      data={addressData}
                      setAddressVisibility={onHomeEditChange}
                      getAddressData={getAddressData}
                    />
                  ) : !addressFlag ? (
                    <div
                      className={classes.addressContainer}
                      onClick={() => onSelectionChange(addressData)}
                    >
                      <div className={classes.addressContent}>
                        <div className={classes.imgContainer}>
                          <img
                            className={classes.icon}
                            src={
                              addressData.addressType === 'home'
                                ? Utils.images.HOME_ICON
                                : addressData.addressType === 'office'
                                ? Utils.images.OFFICE_ICON
                                : Utils.images.OTHER_ADDRESS
                            }
                            alt="icon"
                          />
                        </div>
                        <div className={classes.labelContainer}>
                          <div className={classes.label}>
                            {addressData.addressType === 'home'
                              ? 'Home'
                              : addressData.addressType === 'office'
                              ? 'Office'
                              : addressData?.otherAddressType || ''}
                          </div>
                          <div className={classes.description}>
                            {addressData.address1}
                            {addressData.address2
                              ? `, ${addressData.address2}`
                              : ''}
                            {addressData.city ? `, ${addressData.city}` : ''}
                            {addressData.state ? `, ${addressData.state}` : ''}
                            {addressData.pincode
                              ? `, ${addressData.pincode}`
                              : ''}
                            {addressData.country
                              ? `, ${addressData.country}`
                              : ''}
                          </div>
                          <div className={classes.description}>
                            Phone: {addressData?.mobileNo || ''}
                          </div>
                          {
                            // checkoutAddressId === addressData._id &&
                            <div className={classes.buttonContainer}>
                              <Button
                                className={classes.addressButton}
                                variant="outlined"
                                color="primary"
                                onClick={(evt) => {
                                  evt.stopPropagation();
                                  setConfirmPopUp(!confirm);
                                  setAddressToBeDeleted(addressData);
                                }}
                              >
                                Remove
                              </Button>
                              <Button
                                className={clsx(
                                  classes.addressButton,
                                  classes.rightButton
                                )}
                                variant="outlined"
                                color="primary"
                                onClick={(evt) => {
                                  evt.stopPropagation();
                                  onHomeEditChange(addressData._id);
                                }}
                              >
                                Edit
                              </Button>
                            </div>
                          }
                        </div>
                      </div>
                      {radioButton && (
                        <GreenRadio
                          className={classes.radioButton}
                          defaultChecked={
                            data?.address?._id
                              ? data?.address?._id === addressData._id
                              : checkoutAddressId === addressData._id
                          }
                          checked={checkoutAddressId === addressData._id}
                          onChange={() => onSelectionChange(addressData)}
                          value={addressData.addressType}
                          name="radio-button-demo"
                          inputProps={{ 'aria-label': 'C' }}
                        />
                      )}
                    </div>
                  ) : null}
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Divider className={classes.divider} />
                  </Box>
                </Paper>
              );
            })}
          {addButtonBottom && !addressFlag ? (
            <Button
              onClick={addAddress}
              className={clsx(classes.addButton)}
              variant="outlined"
              color="primary"
            >
              Add New Address
            </Button>
          ) : null}
        </div>
      </Grid>
    </Grid>
  );
};

export default MobileAddress;
