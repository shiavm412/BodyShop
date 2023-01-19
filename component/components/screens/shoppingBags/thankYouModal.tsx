import {
  Modal,
  Fade,
  Backdrop,
  Typography,
  Divider,
  Grid,
  Box,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Utils from '../../../utils';
import { Form, Formik } from 'formik';
// import CustomButton from "../../components/common/button";
// import CustomCalender from "../../components/common/calendar";
import clsx from 'clsx';
import { useState } from 'react';
import { sendOverallRating, updateUserInfo } from '../account/profile/action';
import { useDispatch } from 'react-redux';
// import Review from "../rating&review/reviews";
import CommentModal from './commentModal';
import { shoppingFeedback } from '../../../utils/event/action';
import Review from '../rating&review/reviews';
import CustomCalender from '../../../common/calendar';
import GreenRadio from '../../../common/customRadio';
import CustomButton from '../../../common/button';
// import GreenRadio from "../../components/common/customRadio";
// import { shoppingFeedback } from "../../utils/event/action";
// import { hideLoader } from "../home/actions";
// import { CROSS, DATE_ICON, SUCCESS } from "utils/constantImages";

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
    // padding: theme.spacing(1.5, 1.5),
    display: 'block',
    alignItems: 'center',
    borderRadius: '3px',
    // maxWidth: '500px',
    width: '886px',
    // height: "90%",
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
      // margin: '20px',
      padding: theme.spacing(1.5, 1.5),
      maxWidth: '90%',
    },
    [theme.breakpoints.down('xs')]: {
      // height: "80%",
      overflowY: 'auto',
      maxWidth: '100%',
      padding: 0,
      height: '100%',
    },
  },
  innerContainer: {
    // display: 'flex',
    // flexDirection: "column",
    // justifyContent: "center",
    textAlign: 'center',
    padding: theme.spacing(3.6, 2.6, 2.4, 2.6),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 0),
    },
  },
  description: {
    font: `normal 500 ${theme.spacing(1.4)} Work Sans`,
    lineHeight: '24px',
    color: '#333333',
    textAlign: 'center',
    marginTop: '4px',
    marginBottom: '15px',
    padding: theme.spacing(0, 4),
    [theme.breakpoints.down('sm')]: {
      font: `normal ${theme.spacing(1.2)} Work Sans Medium`,
    },
  },
  title: {
    font: `normal 600 ${theme.spacing(1.8)} Work Sans`,
    lineHeight: '24px',
    color: '#333333',
    textAlign: 'center',
    marginTop: '15px',
    padding: theme.spacing(0, 4),
    [theme.breakpoints.down('sm')]: {
      font: `normal 600 ${theme.spacing(1.6)} Work Sans Bold`,
    },
  },
  closeIcon: {
    float: 'right',
    cursor: 'pointer',
    margin: '20px',
  },
  divider: {
    marginBottom: '19px',
    marginTop: '10px',
    backgroundColor: '#F2F2F2',
    [theme.breakpoints.down('xs')]: {
      height: '7px',
    },
  },
  divider2: {
    marginBottom: '19px',
    marginTop: '10px',
    backgroundColor: '#F2F2F2',
    [theme.breakpoints.down('xs')]: {
      height: '7px',
      margin: '0px -20px 10px -20px',
    },
  },
  btn: {
    borderRadius: '4px',
    font: `normal 500 ${theme.spacing(1.6)} Work Sans !important`,
    lineHeight: '18.77px',
    color: '#FFFFFF',
    width: '70%',
    marginTop: '-3px !important',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      margin: '20px 0px',
    },
  },
  writeDiv: {
    margin: theme.spacing(2.5, 0, 0, 0),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 3),
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1, 0),
    },
  },
  headerDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.4
    )} Recoleta Alt`,
    lineHeight: '33px',
    color: 'var(--secondary-black)',
    letterSpacing: '0.02em',
  },
  outerDiv: {
    padding: theme.spacing(2, 2, 0, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 2, 0, 2),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1, 2, 0, 2),
      textAlign: 'left',
    },
  },
  single: {
    // width: "80%"
    textAlign: 'center',
    margin: '0px 120px 0px 120px',
    [theme.breakpoints.down('sm')]: {
      margin: '0px 70px 0px 70px',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0px 10px 0px 10px',
      textAlign: 'left',
    },
  },
  bottomRow: {
    marginBottom: '20px',
  },
  formContainer: {
    marginTop: theme.spacing(-2),
  },
  radioButton: {
    transition: 'none',
    '&:hover': { backgroundColor: 'white' },
    width: '14px',
    height: '14px',
  },
  formLabel: {
    font: `normal 700 ${theme.spacing(1.8)} Recoleta Alt`,
    lineHeight: '24px',
    color: 'var(--secondary-black)',
    letterSpacing: '0.02em',
    paddingBottom: '4px',
  },
  customCalendar: {
    marginTop: '-10px',
    marginBottom: '20px',
  },
  textInfo: {
    font: `normal 500 ${theme.spacing(1.6)} Work Sans`,
    lineHeight: '21px',
    color: '#666666',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.2)} Work Sans Medium`,
    },
  },
  outBox: {
    display: 'flex',
    justifyContent: 'center',

    margin: theme.spacing(3.5, 0, 2.0, 0),
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
    },
  },
  topSpacing: {
    marginTop: '20px',
  },
  leftSpacing: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
    },
  },
  optionsName: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.6
    )} Work Sans`,
    lineHeight: '19px',
    color: 'var(--black300)',
    margin: theme.spacing(0, 1),
  },
  // dateTime: {
  //     font: "normal 400 15px Work Sans",
  // },
  root: {
    margin: theme.spacing(2.5, 0),
  },
  dateTimeContainer: {
    display: 'flex',
    // justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      display: 'flex',
    },
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 1.2),
    },
  },
  reviewSection: {
    width: '60%',
    margin: '5px 0px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: theme.spacing(0),
      marginTop: theme.spacing(2),
      padding: '10px',
    },
  },
  ratingsHeading: {
    paddingBottom: '8px',
    font: `normal 700 ${theme.spacing(2.0)} Recoleta Alt Bold`,
    lineHeight: '27.2px',
    color: '#333333',
    letterSpacing: '0.02em',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.6)} Recoleta Alt Bold`,
    },
  },
  imageContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  img: {
    width: '80px',
    height: '80px',
  },
  backDrop: {
    // cursor:"not-allowed",
    pointerEvents: 'none',
  },
}));

interface Props {
  open: boolean;
  handleClose: any;
  description: any;
  title: string;
  buttonText: string;
  dobMissing: boolean;
  genderMissing: boolean;
  orderFeedbackMissing: boolean;
  formSectionVisibility: boolean;
  ratingSectionVisibility: boolean;
}

const ThankYouModal = (props: Props) => {
  const classes = useStyles();
  const {
    buttonText,
    title,
    description,
    open,
    dobMissing,
    genderMissing,
    formSectionVisibility,
    ratingSectionVisibility,
    orderFeedbackMissing,
  } = props;
  const [orderFeedback, setOrderFeedback] = useState('');
  const [rating, setRating] = useState<any>(null);
  const [commentModalVisibility, setCommentModalVisibility] = useState(false);

  const [gender, setGender] = useState('');
  const dispatch: any = useDispatch();
  const handleCommentModalClose = (value: boolean) => {
    props.handleClose(value);
    setCommentModalVisibility(false);
    // history.push('/');
  };

  const setRatings = (value: any) => {
    setRating(value);
    if (value < 4) {
      setCommentModalVisibility(true);
      props.handleClose(true);
    }
  };

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let yearMax = new Date(year - 13, month, day);

  return (
    <>
      <Modal
        // onBackdropClick={() => { }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div
              className={classes.closeIcon}
              onClick={() => props.handleClose(false)}
            >
              <img src={Utils.images.CROSS} alt="cross" />
            </div>
            <div className={classes.innerContainer}>
              <div className={classes.imageContainer}>
                <img
                  className={classes.img}
                  src={Utils.images.SUCCESS}
                  alt="success"
                />
              </div>
              <Typography variant="h4" className={classes.title}>
                {title || ''}
              </Typography>
              <Typography variant="h4" className={classes.description}>
                {description || ''}
              </Typography>
              <Divider className={classes.divider} />
              {ratingSectionVisibility && (
                <>
                  <div className={classes.reviewContainer}>
                    <Typography className={classes.ratingsHeading}>
                      Rate Your Experience ?
                    </Typography>
                    <Typography className={clsx(classes.textInfo)}>
                      {/* Lorem Ipsum is simply dummy text. */}
                      We love to improve your experience and each rating helps
                      us achieve that
                    </Typography>
                    <div className={classes.reviewSection}>
                      <Review setRating={setRatings} />
                    </div>
                  </div>
                  <Divider light className={classes.divider} />
                </>
              )}
              <>
                <div className={classes.writeDiv}>
                  <Formik
                    initialValues={{
                      date: null,
                      gender: null,
                      orderFeedback: null,
                    }}
                    // validationSchema={DeliverySchema}
                    onSubmit={(values) => {
                      let eventPayload: any = {
                        Rating: rating,
                        RatingComment: '',
                        Platform: 'Web',
                      };
                      shoppingFeedback(eventPayload);

                      let payload: any = {};
                      if (values.date || orderFeedback || gender) {
                        if (orderFeedback)
                          payload.orderFeedback = orderFeedback;
                        if (gender) payload.gender = gender;
                        if (values.date) payload.dob = values.date;
                        dispatch(
                          updateUserInfo(payload, () => {
                            // dispatch(hideLoader());
                            props.handleClose(false);
                          })
                        );
                      } else {
                        payload = {
                          rating,
                        };
                        dispatch(
                          sendOverallRating(payload, () => {
                            props.handleClose(true);
                          })
                        );
                        // props.handleClose()
                      }
                    }}
                  >
                    {({
                      values,
                      // errors,
                      // touched,
                      // isSubmitting,
                      // setFieldTouched,
                      // setFieldValue,
                    }) => {
                      let disableButton = false;
                      // if (formSectionVisibility) {
                      //     if (dobMissing && genderMissing)
                      //         disableButton = values.date || values.gender ? false : true;
                      //     else if (dobMissing)
                      //         disableButton = values.date ? false : true;
                      //     else if (genderMissing)
                      //         disableButton = values.gender ? false : true
                      // } else if (ratingSectionVisibility) {
                      //     disableButton = rating ? false : true;
                      // }
                      disableButton =
                        (formSectionVisibility && !values.date && !gender) ||
                        (ratingSectionVisibility && (rating ? false : true)) ||
                        (orderFeedbackMissing && orderFeedback == '');
                      const singleField =
                        (dobMissing && !genderMissing) ||
                        (!dobMissing && genderMissing)
                          ? true
                          : false;
                      return (
                        <Form>
                          {formSectionVisibility && (
                            <Grid container className={classes.formContainer}>
                              {dobMissing && (
                                <Grid
                                  item
                                  xs={12}
                                  md={singleField ? 12 : 6}
                                  className={
                                    singleField
                                      ? clsx(classes.outerDiv, classes.single)
                                      : classes.outerDiv
                                  }
                                >
                                  <Grid item xs={12} md={12}>
                                    <Typography className={classes.formLabel}>
                                      What is your DOB ?
                                    </Typography>
                                    {/* <Typography className={classes.textInfo}>
                                      It will help us to recommend relevant
                                      products
                                    </Typography> */}
                                  </Grid>
                                  <div className={classes.customCalendar}>
                                    <CustomCalender
                                      isRequired={false}
                                      maxDate={yearMax}
                                      id={'date'}
                                      name={'date'}
                                      value={values.date}
                                      formLabel={''}
                                      placeholder={'Date of Birth'}
                                      icon={
                                        <img src={Utils.images.DATE_ICON} alt="date_icon" />
                                      }
                                    />
                                  </div>
                                </Grid>
                              )}

                              {genderMissing && (
                                <>
                                  <Grid
                                    item
                                    xs={12}
                                    md={singleField ? 12 : 6}
                                    className={
                                      singleField
                                        ? clsx(classes.outerDiv, classes.single)
                                        : classes.outerDiv
                                    }
                                  >
                                    <Box
                                      sx={{
                                        display: { xs: 'block', sm: 'none' },
                                      }}
                                    >
                                      <Divider
                                        light
                                        className={classes.divider2}
                                      />
                                    </Box>
                                    <Grid item xs={12} md={12}>
                                      <Typography className={classes.formLabel}>
                                        What is your gender ?
                                      </Typography>
                                      {/* <Typography className={classes.textInfo}>
                                        It will help us to recommend relevant
                                        products
                                      </Typography> */}
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      md={12}
                                      className={clsx(
                                        classes.dateTimeContainer
                                      )}
                                    >
                                      <Grid
                                        item
                                        xs={4}
                                        md={4}
                                        className={classes.outBox}
                                      >
                                        <GreenRadio
                                          className={classes.radioButton}
                                          checked={gender === 'female'}
                                          onChange={() => setGender('female')}
                                          value="female"
                                          name="radio-button-demo"
                                          inputProps={{ 'aria-label': 'C' }}
                                        />
                                        <Typography
                                          className={classes.optionsName}
                                        >
                                          Female
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        md={4}
                                        className={classes.outBox}
                                      >
                                        <GreenRadio
                                          className={classes.radioButton}
                                          checked={gender === 'male'}
                                          onChange={() => setGender('male')}
                                          value="male"
                                          name="radio-button-demo"
                                          inputProps={{ 'aria-label': 'C' }}
                                        />
                                        <Typography
                                          className={classes.optionsName}
                                        >
                                          Male
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        md={4}
                                        className={classes.outBox}
                                      >
                                        <GreenRadio
                                          className={classes.radioButton}
                                          checked={gender === 'other'}
                                          onChange={() => setGender('other')}
                                          value="other"
                                          name="radio-button-demo"
                                          inputProps={{ 'aria-label': 'C' }}
                                        />
                                        <Typography
                                          className={classes.optionsName}
                                        >
                                          Other
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </>
                              )}
                            </Grid>
                          )}
                          {orderFeedbackMissing && (
                            <Grid container className={classes.formContainer}>
                              <Grid
                                item
                                xs={12}
                                md={12}
                                className={clsx(
                                  classes.outerDiv,
                                  classes.bottomRow,
                                  classes.single
                                )}
                              >
                                <Grid item xs={12} md={12}>
                                  <Typography className={classes.formLabel}>
                                    Have you purchased this for someone else ?
                                  </Typography>
                                  <Typography className={classes.textInfo}>
                                    It will help us to recommend relevant
                                    products
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  md={12}
                                  className={clsx(classes.dateTimeContainer)}
                                >
                                  <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    className={classes.outBox}
                                    //  className={clsx(classes.outBox
                                    // classes.topSpacing )}
                                  >
                                    <GreenRadio
                                      className={classes.radioButton}
                                      checked={orderFeedback === 'yes'}
                                      onChange={() => {
                                        setOrderFeedback('yes');
                                      }}
                                      value="yes"
                                      name="orderFeedback"
                                      inputProps={{ 'aria-label': 'C' }}
                                    />
                                    <Typography className={classes.optionsName}>
                                      Yes
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    className={classes.outBox}
                                    // className={clsx(classes.outBox
                                    // , classes.leftSpacing, classes.topSpacing
                                    // )}
                                  >
                                    <GreenRadio
                                      className={classes.radioButton}
                                      checked={orderFeedback === 'no'}
                                      onChange={() => setOrderFeedback('no')}
                                      value="no"
                                      name="orderFeedback"
                                      inputProps={{ 'aria-label': 'C' }}
                                    />
                                    <Typography className={classes.optionsName}>
                                      No
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          )}
                          <>
                            {(formSectionVisibility ||
                              orderFeedbackMissing) && (
                              <Divider light className={classes.divider} />
                            )}
                            <div className={classes.btnContainer}>
                              <CustomButton
                                type="submit"
                                color="primary"
                                fullWidth
                                variant="contained"
                                text={buttonText}
                                className={classes.btn}
                                disabled={disableButton}
                              />
                            </div>
                          </>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </>
            </div>
          </div>
        </Fade>
      </Modal>
      {rating && rating < 4 && (
        <CommentModal
          rating={rating}
          title={`What went wrong?`}
          description={
            'Sorry to know that your experience was less than expected. Share your feedback below'
          }
          buttonText="Submit"
          open={commentModalVisibility}
          handleClose={(val: boolean) => handleCommentModalClose(val)}
        />
      )}
    </>
  );
};

export default ThankYouModal;
