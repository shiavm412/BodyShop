import {
  Modal,
  Fade,
  Backdrop,
  Typography,
  Grid,
  FormControlLabel,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Utils from '../../../../utils';
import InputField from '../../../../common/inputField';
import CustomCalender from '../../../../common/calendar';
import CustomCheckbox from '../../../../common/customCheckbox';
import CustomButton from '../../../../common/button';
// import InputField from "../../../components/common/inputField";
// import CustomButton from "../../../components/common/button";
// import Utils from "../../../utils";
// import CustomCalender from "../../../components/common/calendar";
// import CustomCheckbox from "../../../components/common/customCheckbox";
// import { CROSS, DATE_ICON } from "utils/constantImages";

// const GreenRadio = withStyles({
//   root: {
//     color: "var(--main-opacity)",
//     "&$checked": {
//       color: "var(--main-opacity)",
//     },
//   },
//   checked: {},
// })((props: any) => <Radio color="default" {...props} />);

interface Props {
  open: boolean;
  handleClose: () => void;
  setPaymentMode: Function;
  onSubmit?: Function;
  paymentMode: string;
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
    padding: theme.spacing(4, 2, 4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      height: '90%',
      overflowY: 'auto',
      alignItems: 'initial',
      padding: theme.spacing(2, 1),
    },
  },

  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.6
    )} Work Sans`,
    lineHeight: '30px',
    color: 'var(--black)',
    paddingBottom: '25px',
  },
  label: {
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.3
      )} Work Sans Bold`,
    },
  },
  // placeholer:{
  //       [theme.breakpoints.down("xs")]: {
  //       font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
  //         1.5
  //       )} Work Sans Medium`,
  //     }
  // },
  outerDiv: {
    display: 'flex',
    margin: theme.spacing(3, 0),
  },

  innerBox: {
    margin: theme.spacing(1, 0, 0, 1),
    paddingLeft: '10px !important',
  },
  errorMessage: {
    color: theme.palette.error.main,
    fontSize: 11,
    fontFamily: 'Work Sans Medium',
    fontWeight: 400,
    lineHeight: 1.66,
  },
  btnField: {
    marginTop: theme.spacing(2),
    width: '30%',
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
    },
  },
  radioButton: {
    transition: 'none',
    '&:hover': { backgroundColor: 'white' },
    width: '14px',
    height: '14px',
  },
  cardName: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.6
    )} Work Sans`,
    lineHeight: '19px',
    fontWeight: 600,
    color: 'var(--black)',
    margin: theme.spacing(0, 3, 0, 1),
  },
  innerContainer: {
    background: '#F9F6EE',
    borderRadius: '3px',
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },

  wishlistDiv: {
    width: 'calc(100% + 20px)',
    margin: theme.spacing(-1),
  },

  inputWidth: {
    width: '100%',
  },
  cvv: {
    width: '100%',
    '-webkit-text-security': 'disc',
  },

  checkboxClass: {
    marginRight: '10px',
    background: 'white',

    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )} Work Sans Medium`,
    },
    // '& .PrivateSwitchBase-input': {
    // }
  },
  innerDiv: {
    padding: theme.spacing(1, 2, 0, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
      paddingBottom: '10px',
    },
  },
  backDrop: {
    // cursor:"not-allowed",
    pointerEvents: 'none',
  },
  closeIcon: {
    float: 'right',
    cursor: 'pointer',
  },
  btn: {
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )} Work Sans Medium !important`,
    },
  },
}));

const AddCard = (props: Props) => {
  const classes = useStyles();
  const [save, setSave] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [cvv, setCvv] = useState('');
  // const [cardNumber, setCardNumber] = useState('');
  const { setPaymentMode } = props;

  const CardSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .required('Please enter card number')
      .min(12, 'Please enter valid card number')
      // .matches(/^[0-9]{15,16}$/, "Please enter valid card number"),
      .max(23, 'Please enter valid card number'),
    nameOnCard: Yup.string()
      .required('Please enter name on card')
      .matches(Utils.regex.fullName, { message: 'Please enter a valid name' }),
    // cardExpiryDate: Yup.date()
    //   .required("Please enter card expiry date")
    //   .min(8, "Please enter a valid Date"),
    cvv: Yup.string().required(''),
    // .min(3, "Please enter valid CVV")
    // .max(4, "Please enter valid CVV"),
    // cardExpiryDate: Yup.date().required("Please Select Card Expiry Date"),
    cardExpiryDate: Yup.date()
      .typeError('Please enter card expiry date')
      .required('Please enter card expiry date'),
  });

  useEffect(() => {
    setPaymentMode('card');
  }, []);

  const onSaveChange = (e: any) => {
    setSave(e.target.checked);
  };
  const onCvvChange = (e: any, setFieldValue: Function) => {
    setFieldValue(e.target.value);
    setCvv(e.target.value);
    if (e.target.value.length >= 3 && e.target.value.length <= 4) {
      setErrorMessage('');
    } else if (
      e.target.value.length &&
      (e.target.value.length < 3 || e.target.value.length > 4)
    ) {
      setErrorMessage('Please enter valid CVV');
    }
    // else{
    //   setErrorMessage("");
    // }
    else if (!e.target.value.length) {
      setErrorMessage('Please enter CVV');
    }
  };
  const onCardNumberChange = (e: any, setFieldValue: Function) => {
    let value =
      e.target.value !== '' &&
      ((typeof Number(e.target.value) === 'number' && !isNaN(e.target.value)) ||
        !isNaN(e?.target?.value?.split('-').join('')))
        ? e.target.value?.trim()
        : e?.target?.value?.trim()?.slice(0, e?.target?.value?.length - 1);
    if (
      (value.length === 5 ||
        value.length === 10 ||
        value.length === 15 ||
        value.length === 20) &&
      e.key !== 'Backspace'
    ) {
      if (value.charAt(value?.length - 1) !== '-') {
        let arr = value.split('');
        arr.splice(value.length - 1, 0, '-');
        value = arr.join('');
      }
    }
    if (
      (value.length === 5 ||
        value.length === 10 ||
        value.length === 15 ||
        value.length === 20) &&
      e?.key === 'Backspace'
    ) {
      if (value.charAt(value.length - 1) === '-') {
        let arr = value.split('');
        // arr.splice(value.length - 1, 1);
        // value = arr.join("");
        value = arr.slice(0, value.length - 1)?.join('');
      }
    }
    setFieldValue('cardNumber', value);
  };

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
        classes: {
          root: classes.backDrop,
        },
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <div className={classes.paper}>
          <div>
            <div onClick={props.handleClose} className={classes.closeIcon}>
              <img src={Utils.images.CROSS} alt="cross" />
            </div>
            <Typography className={classes.heading} align="center">
              Add New Card
            </Typography>
            {/* <div className={classes.outerDiv}>
              <div>
                <GreenRadio
                  className={classes.radioButton}
                  checked={paymentMode === "card"}
                  onChange={() => {
                    // setCard("card")
                    setPaymentMode("card");
                  }
                  }
                  value="UPI Payment"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "C" }}
                />
                <Typography component="span" className={classes.cardName}>
                  Debit Card
                </Typography>
              </div>
              <div>
                <GreenRadio
                  className={classes.radioButton}
                  checked={paymentMode === "card"}
                  onChange={() => {
                    // setCard("card")
                    setPaymentMode("card")
                  }}
                  value="UPI Payment"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "C" }}
                />
                <Typography component="span" className={classes.cardName}>
                  Credit Card
                </Typography>
              </div>
            </div> */}
            <div className={classes.innerContainer}>
              <Formik
                initialValues={{
                  cardNumber: '',
                  nameOnCard: '',
                  // cardExpiryDate: new Date(),
                  cardExpiryDate: null,
                  cvv: undefined,
                }}
                validateOnChange
                validate={(_values: any) => {
                  // setFieldValue(values.cvv || "");
                  // const cvv=values?.cvv?String(values.cvv):"";
                  if (cvv === '') setErrorMessage('Please enter CVV');
                  else {
                  }
                }}
                validationSchema={CardSchema}
                onSubmit={(values, { setSubmitting }) => {
                  // if (values.cvv == undefined) {
                  //   setErrorMessage("Please enter CVV");
                  // }
                  if (values.cardExpiryDate && errorMessage === '') {
                    // values.cardNumber?.length !== 15 &&  values.cardNumber?.length === 16
                    // if ( values.cardNumber?.length > 19) {
                    //   setFieldError("cardNumber", "Please enter valid card number");
                    //   // setFieldTouched("cardNumber",true)
                    // } else {
                    setPaymentMode('card');
                    if (props.onSubmit)
                      props.onSubmit({
                        save: save,
                        ...values,
                        cvv: cvv,
                        cardNumber:
                          Number(values?.cardNumber?.split('-')?.join('')) ||
                          '',
                      });
                    // }
                    setSubmitting(true);
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  setFieldTouched,
                  setFieldValue,
                }) => {
                  return (
                    <Form>
                      <Grid container className={classes.wishlistDiv}>
                        <Grid item xs={12} md={6} className={classes.innerDiv}>
                          <InputField
                            // onChange={(e: any) => {
                            //   setFieldValue("cardNumber", e?.target?.value)

                            //   if (e?.target?.value?.length !== 15 || e?.target?.value?.length !== 16 || e?.target?.value?.length !== 19) {
                            //     setFieldError("cardNumber", "Please enter valid card number");
                            //     setFieldTouched("cardNumber")
                            //   }
                            //   return false
                            // }
                            setFieldTouched={setFieldTouched}
                            alwaysShowLabel={true}
                            label={'Card Number'}
                            placeHolder={'Card Number'}
                            id="cardNumber"
                            name="cardNumber"
                            type="text"
                            touched={touched}
                            errors={errors}
                            value={values.cardNumber}
                            // value={cardNumber}
                            isRequired={true}
                            inputWidth={classes.inputWidth}
                            onChange={(e: any) =>
                              onCardNumberChange(e, setFieldValue)
                            }
                            maxLength={23}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.innerDiv}>
                          <InputField
                            setFieldTouched={setFieldTouched}
                            alwaysShowLabel={true}
                            label={'Name On Card'}
                            placeHolder={'Name On Card'}
                            id="nameOnCard"
                            name="nameOnCard"
                            type="nameOnCard"
                            touched={touched}
                            errors={errors}
                            value={values.nameOnCard}
                            isRequired={true}
                            inputWidth={classes.inputWidth}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.innerDiv}>
                          {/* <InputField
                          alwaysShowLabel={true}

                          label={"Card Expiry Date"}
                          placeHolder={"Card Expiry Date"}
                          id="cardExpiryDate"
                          name="cardExpiryDate"
                          type="cardExpiryDate"
                          touched={touched}
                          errors={errors}
                          value={values.cardExpiryDate}
                          isRequired={false}
                          inputWidth={classes.inputWidth}

                        /> */}
                          <CustomCalender
                            setFieldTouched={setFieldTouched}
                            touched={touched}
                            errors={errors}
                            // views={["year", "month"]}
                            inputWidth={classes.inputWidth}
                            isRequired={true}
                            alwaysShowLabel={true}
                            minDate={new Date()}
                            id={'cardExpiryDate'}
                            name={'cardExpiryDate'}
                            // value={values.cardExpiryDate || new Date().getTime()}
                            value={values.cardExpiryDate}
                            formLabel={'Card Expiry Date'}
                            placeholder={'MM / YY'}
                            icon={<img src={Utils.images.DATE_ICON} alt="dateIcon" />}
                            format={'MM / yy'}
                          />
                        </Grid>
                        <Grid item xs={12} md={3} className={classes.innerDiv}>
                          <InputField
                            setFieldTouched={setFieldTouched}
                            alwaysShowLabel={true}
                            isRequired={true}
                            label={'CVV'}
                            placeHolder={'CVV'}
                            id="cvv"
                            name="cvv"
                            type="number"
                            touched={touched}
                            errors={errors}
                            value={values.cvv}
                            inputWidth={classes.cvv}
                            onChange={(e: any) => onCvvChange(e, setFieldValue)}
                          />
                          <Typography className={classes.errorMessage}>
                            {errorMessage}
                          </Typography>
                        </Grid>
                      </Grid>
                      <div className={classes.innerBox}>
                        <FormControlLabel
                          control={
                            <CustomCheckbox
                              className={classes.checkboxClass}
                              checked={save}
                              onChange={onSaveChange}
                            />
                          }
                          label="Save this card for future payments."
                        />
                      </div>
                      <div className={classes.btnField}>
                        <CustomButton
                          className={classes.btn}
                          type="submit"
                          color="primary"
                          fullWidth
                          variant="contained"
                          text={'Pay And Place Order'}
                          onClick={() => {
                            setFieldTouched('cardNumber', true);
                            setFieldTouched('nameOnCard');
                            setFieldTouched('cardExpiryDate');
                            setFieldTouched('cvv');
                          }}
                        />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddCard;
