import { Modal, Fade, Backdrop, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import { useState } from 'react';
// import { Link } from "react-router-dom";
import OtpInput from 'react-otp-input';
import CustomButton from '../../../../common/button';
// import CustomButton from "../../../components/common/button";

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
    padding: theme.spacing(4, 8, 4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      2.6
    )} Work Sans`,
    lineHeight: '30px',
    color: 'var(--black)',
  },
  subheading: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '16px',
    color: 'var(--black)',
    width: theme.spacing(30),
    margin: theme.spacing(1, 0),
  },

  title: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.6
    )} Work Sans`,
    lineHeight: '26px',
    margin: theme.spacing(1, 0),
  },

  otpField: {
    height: 50,
    fontSize: 20,
    width: '50px !important',
    border: '1px solid var(--border-color)',
    fontFamily: 'Druk',
    borderRadius: theme.spacing(0.2),
  },
  otpFieldContainer: {
    justifyContent: 'space-between',
    marginTop: theme.spacing(3),
  },
  link: {
    color: 'var(--black)',
    textDecoration: 'underline',
    marginLeft: theme.spacing(0.5),
  },
  btnField: {
    marginTop: theme.spacing(2),
  },
}));
const VerifyOtp = (props: Props) => {
  const classes = useStyles();

  // state = { otp: '' };

  // handleChange = (otp) => this.setState({ otp });

  const [state, setState] = useState({
    open: false,
    otp: '',
  });
  const handleChange = (otp: any) => {
    // setChecked(event.target.checked);
    setState(otp);
  };
  const handleOpen = () => {
    setState({ ...state, open: true });
  };

  // const handleClose = () => {
  //   setState({ ...state, open: false });
  // };

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
          <div>
            <Typography className={classes.heading} align="center">
              Apply Voucher
            </Typography>
            <Typography className={classes.subheading} align="center">
              Kindly enter the 4digit verification code sent to +91 7345678926
              <Link href="" className={classes.link}>
                Edit
              </Link>
            </Typography>
            <OtpInput
              value={state.otp}
              onChange={handleChange}
              numInputs={4}
              separator={<span></span>}
              inputStyle={classes.otpField}
              isInputNum={true}
              containerStyle={classes.otpFieldContainer}
            />
            <div className={classes.btnField}>
              <CustomButton
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                text={'Verify'}
                onClick={handleOpen}
              />
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default VerifyOtp;
