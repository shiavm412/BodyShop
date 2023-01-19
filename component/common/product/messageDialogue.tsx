import { Box, Dialog, Divider, Grid, Theme, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import CustomButton from '../button';

// import { CROSS } from "utils/constantImages";
// import CustomButton from "../button";

const useStyles: any = makeStyles((theme: Theme) => ({
  root: {
    '&:first-child': {
      paddingTop: 0,
    },
    '& .MuiDialog-paperWidthSm': {
      width: 438,
    },
  },
  mainContainer: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: theme.spacing(3.5, 2, 2, 2),
  },
  heading: {
    fontFamily: 'Work Sans',
    fontSize: '26px',
    lineHeight: '30px',
    color: 'var(--black)',
  },
  textContent: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '85%',
  },
  description: {
    marginTop: '13px',
    font: 'normal 500 18px Work Sans',
    color: '#333333',
    lineHeight: '26px',
  },
  divider: {
    margin: '35px 0px 8px 0px',
    color: '#F2F2F2',
  },
  image: {
    marginBottom: '21px',
    width: '71px',
    height: '71px',
    display: 'flex',
    justifySelf: 'center',
    alignSelf: 'center',
  },
  closeIcon: {
    float: 'right',
    cursor: 'pointer',
    padding: '20px',
  },
  closeIconContainer: {
    width: '100%',
  },
  mobileHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '35px',
    padding: theme.spacing(3, 1.6),
    backgroundColor: 'var(--medium-creame-color)',
    position: 'sticky',
    top: 0,
    zIndex: 9999,
  },

  backArrow: {
    width: theme.spacing(2.5),
    height: 'auto',
  },
}));

interface Props {
  open: boolean;
  handleClose: Function;
  onOk: Function;
  message: any;
  cancelText: string;
  okText: string;
  okButtonProps?: any;
  cancelButtonProps?: any;
  heading?: any;
  icon?: any;
  headingClass?: string;
  closePopUp?: boolean;
  onClosePopUp?: Function;
  // alignOkButton?: boolean
}

const MessageDialogue = ({
  open = true,
  handleClose,
  onOk,
  heading = '',
  message,
  cancelText,
  okText,

  icon,
  headingClass,
  onClosePopUp,
  closePopUp,
}: // alignOkButton
Props) => {
  const classes = useStyles();

  const onSubmit = (_e: any) => {
    onOk();
  };

  return (
    <React.Fragment>
      <Dialog open={open} className={classes.root}>
        {closePopUp && (
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <div
              className={classes.closeIconContainer}
              onClick={() => {
                if (onClosePopUp) onClosePopUp();
              }}
            >
              {/* <div className={classes.closeIcon}>
              <img src={CROSS} alt="cross" />
              </div> */}
            </div>
          </Box>
        )}

        <div className={classes.mainContainer}>
          {icon ? <img className={classes.image} src={icon} alt="icons" /> : ''}
          <div className={classes.textContent}>
            {heading ? (
              <Typography
                variant="h3"
                className={headingClass ? headingClass : classes.heading}
              >
                {heading}
              </Typography>
            ) : null}
            {typeof message == 'string' ? (
              <Typography variant="h6" className={classes.description}>
                {message}
              </Typography>
            ) : (
              message
            )}
          </div>
          <Divider className={classes.divider} />
          <Grid container spacing={2} style={{ justifyContent: 'center' }}>
            {cancelText && (
              <Grid item xs={6}>
                <CustomButton
                  type="button"
                  color="primary"
                  fullWidth
                  variant="outlined"
                  text={cancelText}
                  onClick={() => handleClose()}
                />
              </Grid>
            )}
            <Grid item xs={6}>
              <CustomButton
                fullWidth
                type="button"
                color="primary"
                variant="contained"
                text={okText}
                onClick={onSubmit}
              />
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default MessageDialogue;
