import React, { useState } from 'react';
import {
  Theme,
  Grid,
  Button,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Box,
} from '@mui/material';
import _ from 'lodash';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { makeStyles, withStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import Utils from '../../../utils';
import {
  getAddressFromLatLng,
  getAddressFromPin,
} from '../../../../store/storeLocaton/action';
import InputField from '../../../common/inputField';
import { addNewAddress } from '../../../utils/event/action';
import CommonFunctions from '../../../utils/commonFunctions';
import { addAddress, editAddress } from '../../../common/addToCart/action';

interface Props {
  setAddressVisibility: Function;
  flag: string;
  data?: any;
  setCheckoutAddressId?: Function;
  checkoutAddressId?: any;
  setAddress: Function;
  section?: string;
  setAddressFormVisibility?: Function;
  getAddressData?: any;
}

const GreenCheckbox = withStyles({
  root: {
    color: '#3d857e',
    '&$checked': {
      color: '#3d857e',
    },
  },
  checked: {},
})((props: any) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
  addressFormContainer: {
    background: '#FAFAFA',
    border: '1px solid #E2E2E2',
    boxSizing: 'border-box',
    borderRadius: '4px',
    width: '100%',
    padding: '20px',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
      marginTop: '10px',
      border: 'none',
      background: 'white',
    },
  },
  heading: {
    font: 'normal 700 18px Recoleta Alt',
    color: '#333333',
  },
  title: {
    font: 'normal 600 14px Work Sans',
    color: '#333333',
    marginTop: '18px',
    [theme.breakpoints.down('xs')]: {
      font: 'normal  14px Recoleta Alt Bold',
    },
  },
  inputWidth: {
    width: '100%',
    height: '43px',
  },
  radioContainer: {
    marginTop: theme.spacing(2),
    '& .Mui-checked': {
      color: 'var(--main-opacity)',
    },
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  radioLabel: {
    color: 'var(--black)',
    [theme.breakpoints.down('xs')]: {
      font: 'normal 700 18px Work Sans',
    },
  },
  button: {
    width: '100%',
    borderRadius: '4px',
    // height: "43px",
    marginLeft: '10px',
    marginRight: '10px',
    float: 'right',
    padding: '14px',
    textTransform: 'none',
    font: `normal 600 14px Work Sans`,
  },
  rightButton: {
    marginRight: '0px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
  },
  buttonContainer: { textAlign: 'right' },
  divider: {
    marginTop: '12px',
    [theme.breakpoints.down('xs')]: {
      padding: '5px',
      width: '120%',
      marginLeft: '-20px',
      opacity: 0.4,
      // boxShadow: "0px 5px 20px rgba(35, 30, 30, 0.06)",

      // marginRight:"-40px"
    },
  },
  gridContainer: { marginTop: '10px' },
  prefixContent: {
    width: '20%',
    textAlign: 'center',
    border: 'none',
    borderRight: '1px solid #E2E2E2',
    backgroundColor: 'white',
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )} Work Sans`,
  },
  marginTop: {
    marginTop: '-12px',
    paddingBottom: '6px',
  },
  '&$checked': {
    color: '#3d857e',
  },
}));

const AddressForm: React.FC<Props> = (props: Props) => {
  // const location=useLocation();
  // const locationData:any=location.state||{}
  const {
    setAddressVisibility,
    setAddressFormVisibility,
    flag,
    data,
    setCheckoutAddressId,
  } = props;
  const [addressType, setAddressType] = useState(
    data?.addressType ? data.addressType : 'home'
  );
  const profileData =
    useSelector((state: any) => state.userDetailReducer.userInfo) || {};
  const [markAsDefault, setMarkAsDefault] = useState(data?.isDefault);
  //@ts-ignore
  const [formattedAddress, setFormattedAddress] = useState('');
  const [coordinates, setCordinates] = useState('[0, 0]');
  const classes = useStyles();
  const [pincode, setPincode] = useState();
  const dispatch: any = useDispatch();
  const initialValues = {
    fullName: data?.name || profileData?.fullName || '',
    mobile: data?.mobileNo || profileData?.mobileNo || '',
    addressLine1: data?.address1 || '',
    addressLine2: data?.address2 || '',
    city: data?.city || '',
    state: data?.state || '',
    pincode: data?.pincode || '',
    find: data?.address || '',
    otherAddress: data?.otherAddressType || '',
  };
  const AddressSchema = Yup.object().shape({
    fullName: Yup.string().trim().required('Please enter name'),
    mobile: Yup.string(),
      // .required('Please enter mobile number')
      // .matches(Utils.regex.onlyNumberRegex, {
      //   message: 'Please enter valid mobile number',
      // }
      // ),
    addressLine1: Yup.string().trim().required('Please enter address line 1'),
    // addressLine2: Yup.string().trim().required("Please enter address line 2"),
    city: Yup.string().trim().required('Please enter city'),
    state: Yup.string().trim().required('Please enter state'),
    // find: Yup.string().trim().required("Please enter address"),
    pincode: Yup.string()
      .required('Please enter pincode')
      .matches(/^[1-9][0-9]*$/, 'Please enter valid pincode')
      .test('len', 'Pincode must be 6 digit number', (val) => {
        if (val === undefined) {
          return true;
        }
        return val.length === 6;
      }),
    otherAddress:
      addressType === 'other'
        ? Yup.string().trim().required('Please enter address')
        : Yup.string(),
  });
  const onAddressType = (_e: any, value: any) => {
    setAddressType(value);
  };
  // const onPincodeChange = (e: any, setFieldValue: Function) => {
  //   if (e.target.value.length === 6)
  //     getAddressFromPin(e.target.value).then((response: any) => {
  //       if (response) {
  //         const results = response?.data?.results || [];
  //         getAddressField(results, setFieldValue)
  //       }
  //     }).catch((err: any) => {
  //     })
  // }
  const onPincodeChange = (e: any, setFieldValue: Function) => {
    if (e.target.value.length === 6 && pincode !== e.target.value) {
      setFieldValue('city', '');
      setFieldValue('state', '');
      setPincode(e.target.value);
      getAddressFromPin(e.target.value)
        .then((response: any) => {
          if (response) {
            let results = response?.data?.results || [];
            if (results.length) {
              setCordinates(
                JSON.stringify(Object.values(results?.[0]?.geometry?.location))
              );
              let city = _.find(
                results?.[0]?.address_components,
                (item: any) =>
                  item.types.includes('locality') ||
                  item.types.includes('administrative_area_level_2')
              );
              let state = _.find(
                results?.[0]?.address_components,
                (item: any) =>
                  item.types.includes('administrative_area_level_1')
              );
              if (city) {
                setFieldValue('city', city.long_name);
              }
              if (state) {
                setFieldValue('state', state.long_name);
              }
              if (!city || !state) {
                getAddressFromLatLng(
                  `${results?.[0]?.geometry?.location?.lat},${results?.[0]?.geometry?.location?.lng}`
                )
                  .then((resp: any) => {
                    if (resp) {
                      let results = resp?.data?.results || [];
                      if (!state) {
                        let state = _.find(
                          results?.[0]?.address_components,
                          (item: any) =>
                            item.types.includes('administrative_area_level_1')
                        );
                        if (state) {
                          setFieldValue('state', state.long_name);
                        } else {
                          setFieldValue('state', '');
                        }
                      }
                      if (!city) {
                        let city = _.find(
                          results?.[0]?.address_components,
                          (item: any) =>
                            item.types.includes('locality') ||
                            item.types.includes('administrative_area_level_2')
                        );
                        if (city) {
                          setFieldValue('city', city.long_name);
                        } else {
                          setFieldValue('city', '');
                        }
                      }
                    }
                  })
                  .catch((_err) => {
                    // dispatch(hideLoader())
                  });
              }
            } else {
              setFieldValue('city', '');
              setFieldValue('state', '');
            }
          }
        })
        .catch((_err: any) => {});
    }
  };

  // const getAddressField = (results: any, setFieldValue: Function
  // ) => {
  //   // const addressComponents = results?.[0]?.address_components || [];
  //   const addressSection = results?.[0] ?? {}
  //   const addressComponents = addressSection?.address_components ?? []

  //   const arr = [
  //     { value: 'find', fieldName: 'find' },
  //     // { value: 'locality', fieldName: 'addressLine2' },
  //     // { value: 'administrative_area_level_2', fieldName: 'city' },
  //     { value: 'locality', fieldName: 'city' },
  //     { value: 'administrative_area_level_1', fieldName: 'state' },
  //     // { value: 'sublocality', fieldName: 'addressLine1' },
  //     { value: 'postal_code', fieldName: 'pincode' },
  //   ]

  //   arr.map((data: any) => {
  //     const { value, fieldName } = data;
  //     const result = addressComponents.filter((address: any) => address?.types?.includes(value));

  //     if (value === 'find') {
  //       setFieldValue('find', addressSection?.formatted_address);
  //       setFormattedAddress(addressSection?.formatted_address);

  //     } else if (value === 'postal_code') {
  //       let pincode: any = [];
  //       let index = 0;
  //       while (index <= results.length - 1 && pincode.length === 0) {
  //         pincode = results[index]?.address_components?.filter((address: any) => address?.types?.includes('postal_code'));
  //         index += 1;
  //         if (pincode.length > 0)
  //           setFieldValue(fieldName, pincode?.[0]?.long_name || '')
  //       }
  //       if (pincode.length > 0) {
  //         setFieldValue(fieldName, pincode?.[0]?.long_name || '')
  //       }
  //     }
  //     else
  //       setFieldValue(fieldName, result.length > 0 ? result?.[0]?.long_name : '');
  //   })
  // }

  return (
    <div className={classes.addressFormContainer}>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <div className={classes.heading}>
          {flag === 'add' ? 'Add Address' : 'Update Address'}
        </div>
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={AddressSchema}
        onSubmit={(values) => {
          // dispatch(showLoader())
          const payload: any = {
            name: values.fullName,
            countryCode: '+91',
            mobileNo: values.mobile,
            address: values.find || formattedAddress,
            address1: values.addressLine1,
            address2: values.addressLine2,
            city: values.city,
            state: values.state,
            pincode: values.pincode ? String(values.pincode) : '',
            // "coordinates": "[0,0]",
            coordinates: coordinates,
            addressType: addressType,
            isDefault: markAsDefault,
            country: 'IN',
          };
          if (addressType === 'other') {
            payload.otherAddressType = values.otherAddress;
          }
          if (flag === 'edit') {
            payload.addressId = data._id;
            dispatch(
              editAddress(payload, (response: any) => {
                if (response) {
                  props.setAddress(response?.data?.data || []);
                  setAddressVisibility(null);
                  if (setAddressFormVisibility) setAddressFormVisibility(null);
                  if (setCheckoutAddressId)
                    setCheckoutAddressId(payload.addressId);
                  // dispatch(hideLoader())
                  window.scrollTo(0, 0);
                }
              })
            );
          } else
            dispatch(
              addAddress(payload, (response: any) => {
                /**
                 * Event logger
                 */
                addNewAddress({
                  PhoneNo: payload.mobileNo,
                  Name: payload.name,
                  City: payload.city,
                  State: payload.state,
                  AddressType: payload.addressType,
                  Coordinates: payload.coordinates,
                  Google_Address: payload.address
                    ? payload.address
                    : `${payload.address1}${
                        payload.address2 ? `, ${payload.address2}` : ''
                      }${payload.city ? `, ${payload.city}` : ''}${
                        payload.state ? `, ${payload.state}` : ''
                      }${payload.pincode ? `, ${payload.pincode}` : ''}${
                        payload.country ? `, ${payload.country}` : ''
                      }`,
                  AddressLine_1: payload.address1,
                  AddressLine_2: payload.address2,
                  Pincode: payload.pincode,
                  is_default: payload.isDefault || false,
                });

                props.setAddress(response?.data?.data || []);
                if (response?.data?.data?.length > 0) {
                  props.getAddressData();
                  const data = response?.data?.data || [];
                  const defaultData = data.find((item: any) => item.isDefault);
                  setAddressVisibility(null);
                  if (setCheckoutAddressId)
                    setCheckoutAddressId(
                      props.checkoutAddressId ||
                        defaultData?._id ||
                        data?.[0]?._id ||
                        null
                    );
                } else {
                  setAddressVisibility(null);
                  if (setCheckoutAddressId) setCheckoutAddressId(null);
                }
                if (setAddressFormVisibility) setAddressFormVisibility(null);
                // dispatch(hideLoader())
                window.scrollTo(0, 0);
              })
            );
        }}
      >
        {({ values, errors, touched, setFieldValue }) => {
          return (
            <Form autoComplete="off">
              <div className={classes.title}>Contact Details</div>
              <Grid container className={classes.gridContainer} spacing={2}>
                <Grid item xs={12} md={6}>
                  <InputField
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={'Name'}
                    placeHolder={'Name'}
                    id="fullName"
                    name="fullName"
                    type="text"
                    touched={touched}
                    errors={errors}
                    value={values.fullName}
                    isRequired={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={'Mobile Number'}
                    placeHolder={'Mobile Number'}
                    id="mobile"
                    name="mobile"
                    // type="number"
                    type="text"
                    pattern="\d*"
                    onFocus={() =>
                      CommonFunctions.removeScroll(['mobileNumber'])
                    }
                    touched={touched}
                    errors={errors}
                    value={values.mobile}
                    maxLength={10}
                    isRequired={true}
                    prefixContent={
                      values.mobile && (
                        <input
                          className={classes.prefixContent}
                          disabled
                          defaultValue={'+91'}
                        />
                      )
                    }
                  />
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
              {/* <div className={classes.title}>Address</div>
              <Grid container className={classes.gridContainer} spacing={2}>
                <Grid item xs={12} md={12}>
                  <Search
                    errors={errors}
                    touched={touched}
                    label="Find Address"
                    value={values.find}
                    isRequired={true}
                    alwaysShowLabel={true}
                    id="find"
                    name="find"
                    getAddressField={getAddressField}
                    setFieldValue={setFieldValue}
                    formattedAddress={formattedAddress || values.find}
                    setFormattedAddress={setFormattedAddress}
                  />
                </Grid>
              </Grid> */}

              <Grid container className={classes.gridContainer} spacing={2}>
                <Grid item xs={12} md={6}>
                  <InputField
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={'Address Line 1'}
                    placeHolder={'Address Line 1'}
                    id="addressLine1"
                    name="addressLine1"
                    type="text"
                    touched={touched}
                    errors={errors}
                    value={values.addressLine1}
                    isRequired={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={'Address Line 2'}
                    placeHolder={'Address Line 2'}
                    id="addressLine2"
                    name="addressLine2"
                    type="text"
                    touched={touched}
                    errors={errors}
                    value={values.addressLine2}
                    isRequired={false}
                  />
                </Grid>
              </Grid>

              <Grid container className={classes.gridContainer} spacing={2}>
                <Grid item xs={12} md={6}>
                  <InputField
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={'Pincode'}
                    placeHolder={'Pincode'}
                    id="pincode"
                    name="pincode"
                    // type="number"
                    onFocus={() => CommonFunctions.removeScroll(['pincode'])}
                    touched={touched}
                    errors={errors}
                    value={values.pincode}
                    isRequired={true}
                    onChange={(e: any) => onPincodeChange(e, setFieldValue)}
                    type="text"
                    pattern="\d*"
                    maxLength={6}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={'City/District'}
                    placeHolder={'City/District'}
                    id="city"
                    name="city"
                    type="text"
                    touched={touched}
                    errors={errors}
                    value={values.city}
                    isRequired={true}
                  />
                </Grid>
              </Grid>
              <Grid container className={classes.gridContainer} spacing={2}>
                <Grid item xs={12} md={6}>
                  <InputField
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={'State'}
                    placeHolder={'State'}
                    id="state"
                    name="state"
                    type="text"
                    touched={touched}
                    errors={errors}
                    value={values.state}
                    isRequired={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={'Country'}
                    placeHolder={'India'}
                    value={'India'}
                    id="country"
                    name="country"
                    type="text"
                    touched={touched}
                    errors={errors}
                    isRequired={true}
                    isDisabled={true}
                  />
                </Grid>
              </Grid>

              <Divider className={classes.divider} />
              <FormControl
                component="fieldset"
                className={classes.radioContainer}
              >
                <FormLabel
                  component="legend"
                  className={classes.radioLabel}
                >{`Address Type`}</FormLabel>
                <RadioGroup
                  className={classes.radioGroup}
                  row
                  aria-label="address"
                  name="addressType"
                  // value={values.addressType}
                  defaultValue={
                    data?.addressType ? data.addressType : addressType
                  }
                  id="addressType"
                  onChange={onAddressType}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        // value={values.addressType}
                        color="primary"
                      />
                    }
                    value="home"
                    label="Home Address"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        // value={values.addressType}
                        color="primary"
                      />
                    }
                    value="office"
                    label="Office Address"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        // value={values.addressType}
                        color="primary"
                      />
                    }
                    value="other"
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
              {addressType === 'other' && (
                <Grid item xs={12} md={6} className={classes.marginTop}>
                  <InputField
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={''}
                    placeHolder={'Type Here'}
                    value={values.otherAddress}
                    // defaultValue={data?.otherAddressType ? data.otherAddressType : otherAddress}

                    id="otherAddress"
                    name="otherAddress"
                    type="text"
                    touched={touched}
                    errors={errors}
                    isRequired={addressType === 'other' ? true : false}
                  />
                </Grid>
              )}
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Divider className={classes.divider} />
              </Box>
              <Grid container className={classes.gridContainer} spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <GreenCheckbox
                        defaultChecked={
                          markAsDefault ? markAsDefault : data?.isDefault
                        }
                        // checked={markAsDefault?markAsDefault:data?.isDefault}
                        onChange={() => setMarkAsDefault(!markAsDefault)}
                        name="markAsDefault"
                        id="markAsDefault"
                      />
                    }
                    label="Mark as default"
                  />
                </Grid>

                {
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      <Button
                        className={clsx(classes.button, classes.rightButton)}
                        color="primary"
                        variant="outlined"
                        fullWidth={false}
                        onClick={() => {
                          setAddressVisibility(null);
                          if (setAddressFormVisibility)
                            setAddressFormVisibility(null);
                        }}
                        // disabled={(!_.isEmpty(errors) || !mobileVerified) || btnDisabled}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Grid>
                }
                <Grid item xs={12} md={4}>
                  <Button
                    className={clsx(classes.button, classes.rightButton)}
                    type="submit"
                    color="primary"
                    fullWidth={false}
                    variant="contained"
                    // disabled={(!_.isEmpty(errors) || !mobileVerified) || btnDisabled}
                  >
                    {flag === 'add' ? 'Add Address' : 'Update Address'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default AddressForm;
