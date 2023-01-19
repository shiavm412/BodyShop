import React, { useEffect } from 'react';
import { Dialog, Link, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import OtpInput from 'react-otp-input';
import { useSelector, useDispatch } from 'react-redux';
//@ts-ignore
import request from '../../../utils/request';
import Countdown, { zeroPad } from 'react-countdown';
import { Box } from '@mui/material';
import Utils from '../../../utils';
import { OtpModal } from '../../../models';
import CustomButton from '../../../common/button';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&:first-child': {
      paddingTop: 0,
    },
    [theme.breakpoints.down('xs')]: {
      '& .MuiDialog-paper': {
        width: '100vw',
        height: '100vh',
        margin: 0,
        maxHeight: 'initial',
        backgroundColor: 'var(--medium-creame-color)',
        paddingTop: '20px',
      },
    },
  },
  otpDialog: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: theme.spacing(5, 13.7),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 10),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 2.5),
    },
  },
  otpField: {
    height: 50,
    fontSize: 20,
    width: '50px !important',
    border: '1px solid var(--border-color)',
    fontFamily: 'Druk',
    borderRadius: theme.spacing(0.2),
    [theme.breakpoints.down('xs')]: {
      border: 'none',
      borderBottom: '1px solid var(--stepper-color)',
      background: 'var(--medium-creame-color)',
      marginBottom: theme.spacing(2.5),
    },
  },
  timer: {
    color: '#4CB162',
    position: 'relative',
    marginTop: 10,
    fontSize: 15,
    cursor: 'pointer',
    '& img': {
      position: 'absolute',
      top: '20%',
      left: '39%',
    },
    [theme.breakpoints.down('xs')]: {
      '& img': {
        left: '38%',
        top: '12%',
      },
      font: `normal ${theme.spacing(1.4)} Work Sans Bold`,
      marginBottom: theme.spacing(10),
    },
  },
  otpFieldContainer: {
    justifyContent: 'space-between',
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 3),
    },
  },
  para: {
    lineHeight: '18.77px',
    '& span': {
      fontWeight: 600,
    },
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.8)} Work Sans Regular`,
      '& span': {
        font: `normal ${theme.spacing(1.8)} Work Sans Bold`,
      },
    },
  },
  heading: {
    fontFamily: 'Work Sans',
    fontSize: '26px',
    lineHeight: '30px',
    color: 'var(--black)',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '20px',

      font: `normal ${theme.spacing(2.2)} Recoleta Alt Bold`,
    },
  },
  link: {
    textDecoration: 'underline',
    color: 'var(--black)',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'Work Sans Bold',
    },
  },
  resendBtn: {
    font: `normal ${theme.spacing(1.6)} Work Sans SemiBold`,
    lineHeight: '19px',
    textTransform: 'uppercase',
  },
  timerIcon: {
    width: '12px',
    height: '12px',
  },
  mobileHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    // height: "35px",
    padding: theme.spacing(1.6, 1.6),
    backgroundColor: 'var(--medium-creame-color)',
    // position: "sticky",
    // top: 0,
    zIndex: 9999,
  },
  heading2: {
    textAlign: 'center',
    width: '90%',
    diplay: 'flex',
    font: `normal 700 ${theme.spacing(2)} Work Sans`,
    lineHeight: '23.4px',
    letterSpacing: '0.8px',
    [theme.breakpoints.down('xs')]: {
      letterSpacing: '0.02em',
      width: '70%',
      color: 'var(--primary)',
    },
  },

  backArrow: {
    width: theme.spacing(2.5),
    height: 'auto',
  },
  verifyBtn: {
    [theme.breakpoints.down('xs')]: {
      '& .MuiButton-root': {
        font: `normal ${theme.spacing(1.4)} Work Sans Medium`,
      },
    },
  },
}));

interface Props {
  verifyOpt: Function;
  onClose?: Function;
  headingText?: string;
}

const Otp = ({ verifyOpt, onClose }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const header = Utils.CommonFunctions.getApiAuthHeader();

  const renderer = ({ minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return (
        <div onClick={() => resendOtp()}>
          <Typography color="primary" className={classes.resendBtn}>
            Resend Otp
          </Typography>
        </div>
      );
    } else {
      // Render a countdown
      return (
        <div>
          <img
            className={classes.timerIcon}
            src={Utils.images.TIMER}
            alt="timer"
          />
          <span>
            {zeroPad(minutes)}:{zeroPad(seconds)}
          </span>
        </div>
      );
    }
  };

  const otpData = useSelector((state: any) => state.otpReducer);
  const resendOtpTime = useSelector(
    (state: any) => state.configReducer.generalConfigs?.resend_otp_time
  );
  const { show, mobileNo, currentDate, email } = otpData;

  const [otp, setOtp] = React.useState('');

  useEffect(() => {
    setOtp('');
  }, [otpData.show]);

  // const [timer, setTimer] = React.useState(Date.now());
  const handleClose = () => {
    setOtp('');
    dispatch({ type: 'hide-otp', payload: new OtpModal() });
    if (onClose) {
      onClose();
    }
  };
  const handleChange = (otp: any) => {
    setOtp(otp);
    if (otp.length === 4) {
      dispatch({ type: 'set-otp', payload: { OTP: otp } });
    }
  };

  const resendOtp = () => {
    // dispatch(showLoader());
    setOtp('');

    let { countryCode, email, mobileNo, otpVia, type } = otpData;
    request
      .post(
        Utils.endPoints.RESEND_OTP,
        {
          countryCode,
          email,
          mobileNo,
          otpVia,
          type,
        },
        header
      )
      .then((resp) => {
        if (resp) {
          if (resp?.data?.message)
            dispatch({
              type: 'show-alert',
              payload: {
                type: 'success',
                message: resp.data.message,
              },
            });
          dispatch({
            type: 'send-otp',
            payload: { countryCode, email, mobileNo, otpVia, type },
          });
        }
        // dispatch(hideLoader());

        // setOtpData(OtpSendData)
      })
      .catch((err) => {
        // dispatch(hideLoader());
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

  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <React.Fragment>
      <Dialog
        // fullScreen={fullScreen}
        open={show}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        className={classes.root}
      >
        <>
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <div className={classes.mobileHeaderContainer}>
              <span onClick={handleClose} className={classes.backArrow}>
                <img src={Utils.images.BACK_ARROW} alt="backArrow" />
              </span>

              <Typography className={classes.heading2}>
                THE BODY SHOP
              </Typography>
            </div>
          </Box>
          <div className={classes.otpDialog}>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="h3" className={classes.heading}>
                OTP Sent
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <Typography variant="h3" className={classes.heading}>
                OTP Verification
              </Typography>
            </Box>

            <Typography variant="h5" className={classes.para}>
              Kindly enter the 4 digit verification code sent to{' '}
              <span>
                {mobileNo
                  ? Utils.constants.countryCode + ' ' + mobileNo
                  : email}
              </span>
              &nbsp;
              <Link
                onClick={() => {
                  handleClose();
                }}
                className={classes.link}
              >
                Edit
              </Link>
            </Typography>
            <OtpInput
              value={otp}
              onChange={(e: any) => handleChange(e)}
              numInputs={4}
              separator={<span></span>}
              inputStyle={classes.otpField}
              isInputNum={true}
              containerStyle={classes.otpFieldContainer}
            />
            {/* <FormHelperText error>{error}</FormHelperText> */}
            {/* <Hidden smUp>
              <div className={classes.timer}>
                <Countdown
                  key={currentDate}
                  date={currentDate + resendOtpTime * 1000}
                  // date={currentDate}
                  renderer={renderer}
                />
                {/* <Countdown date={currentDate + 45000} /> 
              </div>
            </Hidden> */}
            <div className={classes.verifyBtn}>
              <CustomButton
                type="button"
                color="primary"
                fullWidth
                variant="contained"
                text="Sign in"
                disabled={otp.length !== 4}
                onClick={() => verifyOpt()}
              />
            </div>

            {/* <Hidden xsDown> */}
            <div className={classes.timer}>
              <Countdown
                key={currentDate}
                date={currentDate + resendOtpTime * 1000}
                // date={currentDate}
                renderer={renderer}
              />
              {/* <Countdown date={currentDate + 45000} /> */}
            </div>
            {/* </Hidden> */}
          </div>
        </>
      </Dialog>
    </React.Fragment>
  );
};

export default Otp;
