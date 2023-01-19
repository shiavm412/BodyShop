import { Modal, Fade, Backdrop, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomButton from '../../../common/button';
import Utils from '../../../utils';
// import { SUCCESS } from "utils/constantImages";
// import { useState } from "react";
// import CustomButton from "../../components/common/button";

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
    padding: theme.spacing(2, 2, 2, 2),
    display: 'block',
    alignItems: 'center',
    borderRadius: '3px',
    width: '438px',
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      borderRadius: '12px',
    },
  },
  innerContainer: {
    textAlign: 'center',
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Work Sans`,
    lineHeight: '29px',
    marginBottom: theme.spacing(0.5),
    color: 'var(--secondary-black)',
    padding: theme.spacing(0, 5),
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
}));
const SuccessModal = (props: Props) => {
  const classes = useStyles();

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
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
              <div className={classes.innerContainer}>
                <img src={Utils.images.SUCCESS} alt="success" />

                <Typography
                  variant="h4"
                  align="center"
                  className={classes.heading}
                >
                  Your review is successfully submitted with us.
                </Typography>
              </div>

              <div className={classes.buttonContainer}>
                <CustomButton
                  text={'Submit'}
                  fullWidth
                  type={'submit'}
                  variant={'contained'}
                  onClick={props.handleClose}
                />
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default SuccessModal;
