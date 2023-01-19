import React from 'react';
import {
  Button,
  FormLabel,
  Typography,
  FormGroup,
  FormControl,
  Theme,
  // Input,
  // TextField,
  Box,
} from '@mui/material';
import _ from 'lodash';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { ErrorMessage } from 'formik';
import Autocomplete from 'react-google-autocomplete';
import {
  getAddressFromLatLng,
  getLocation,
} from '../../../../store/storeLocaton/action';
import Utils from '../../../utils';

const useStyles = makeStyles((theme: Theme) => ({
  searchDiv: {
    display: 'flex',
    position: 'relative',
    border: '1px solid #E2E2E2',
    width: '100%',
    height: '43px',
  },
  searchInput: {
    border: 'none',
    backgroundColor: 'var(--white)',
    padding: theme.spacing(0.5, 1),
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )} Work Sans`,
    // height: "43px",
    flexBasis: '70%',
    [theme.breakpoints.down('xs')]: {
      width: '55%',
      flexBasis: 'auto',
      // paddingLeft: '5px',
      paddingRight: '5px',
    },
  },
  sendButton: {
    font: `normal 600 Work Sans`,
    borderRadius: '4px',
    backgroundColor: '#044236',
    fontSize: '13px',
    color: 'white',
    flexBasis: '30%',
    '&:hover': {
      backgroundColor: '#044236',
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.2),
      fontSize: '12px',
      width: '45%',
      flexBasis: 'auto',
      lineHeight: '13px',
      paddingRight: '4px',
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: 'white',
      },
    },
    textTransform: 'none',
    padding: '12px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  buttonIconTextContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
    },
  },
  searchIcon: {
    marginLeft: '5px',
  },
  buttonText: {
    marginLeft: '10px',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '5px',
      color: '#A4A4A4',
    },
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left',
  },
  formLabel: {
    fontSize: '14px',
    lineHeight: 1.5,
    color: 'var(--secondary-black)',
    height: theme.spacing(2),
    fontWeight: 500,
  },
  inputformControl: {
    marginTop: '6px',
  },
  errorContainer: {
    marginTop: '3px',
    height: 10,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  errorMessage: {
    color: theme.palette.error.main,
    fontSize: 11,
    fontFamily: 'Work Sans Medium',
    fontWeight: 400,
    lineHeight: 1.66,
  },
  searchFormGroup: {
    flexWrap: 'nowrap',
  },
}));

const Search: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    label,
    isRequired,
    value,
    alwaysShowLabel,
    errors,
    touched,
    name,
    id,
    getAddressField,
    setFieldValue,
    formattedAddress,
    setFormattedAddress,
    placeholder,
  } = props;

  let apiKey = `${process.env.REACT_APP_GOOGLE_MAP_KEY}`;

  return (
    <FormGroup className={classes.searchFormGroup}>
      {alwaysShowLabel ? (
        <FormLabel className={classes.formLabel}>
          {label ? label : ''}
          {label && isRequired ? (
            <Typography component="span" color="error">
              *
            </Typography>
          ) : null}
        </FormLabel>
      ) : (
        <FormLabel className={classes.formLabel}>
          {value && label ? label : ''}
          {value && label && isRequired ? (
            <Typography component="span" color="error">
              *
            </Typography>
          ) : null}
        </FormLabel>
      )}
      <FormControl className={classes.inputformControl} component="fieldset">
        <div className={classes.searchDiv}>
          <Autocomplete
            id={id + '123'}
            name={name}
            placeholder={
              placeholder
                ? placeholder
                : 'Enter postcode, address, or shop name'
            }
            apiKey={apiKey}
            options={{
              componentRestrictions: { country: 'in' },
              types: ['geocode'],
            }}
            onPlaceSelected={(place: any) => {
              if (place) getAddressField([place], setFieldValue);
            }}
            className={classes.searchInput}
            value={formattedAddress}
            onChange={(e: any) => {
              setFormattedAddress(e.target.value);
              setFieldValue('find', '');
            }}
          />
          <Button
            color="secondary"
            variant="contained"
            disableElevation
            className={classes.sendButton}
            onClick={() => {
              // dispatch(showLoader())
              getLocation()
                .then((resp: any) => {
                  // dispatch(hideLoader())
                  const lat = resp.latitude;
                  const lng = resp.longitude;
                  getAddressFromLatLng(`${lat},${lng}`)
                    .then((resp: any) => {
                      if (resp) {
                        const results = resp?.data?.results || [];
                        getAddressField(results, setFieldValue);
                      }
                    })
                    .catch((_err) => {
                      // dispatch(hideLoader())
                    });
                })
                .catch((_err: any) => {
                  // dispatch(hideLoader())
                });
            }}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <div className={classes.buttonIconTextContainer}>
                <img
                  src={Utils.images.SEARCH_LOCATOR}
                  alt="search"
                  className={classes.searchIcon}
                />
                <div className={classes.buttonText}>Use Current Location</div>
              </div>
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <div className={classes.buttonIconTextContainer}>
                <img
                  src={Utils.images.MOBILE_SEARCH_LOCATOR}
                  alt="search"
                  className={classes.searchIcon}
                />
                <div className={classes.buttonText}>Current Location</div>
              </div>
            </Box>
          </Button>
        </div>
        <div className={classes.errorContainer}>
          {`${_.has(errors, 'name') && _.has(touched, 'name')}` ? (
            <ErrorMessage
              name={name}
              component="div"
              className={classes.errorMessage}
            />
          ) : null}
        </div>
      </FormControl>
    </FormGroup>
  );
};

export default Search;
