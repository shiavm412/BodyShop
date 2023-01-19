import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
// import { redeemBalance } from "../../giftCard/action";
import { useDispatch } from 'react-redux';
import RedeemForm from '../../../../common/redeem/redeemForm';
import Utils from '../../../../utils';
import { redeemBalance } from '../../giftCard/action';
// import RedeemForm from "../../../components/common/redeem/redeemForm";
// import { Add_More, GIFT_ICON } from "utils/constantImages";

const useStyles = makeStyles((theme: Theme) => ({
  yourCardRoot: {
    marginBottom: theme.spacing(1.5),
    border: '1px solid var(--border-color)',
    [theme.breakpoints.down('xs')]: {
      border: 'none',
    },
  },
  yourCardDiv: {
    borderBottom: '1px solid var(--border-color)',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1.5, 1.5, 4, 1.5),
      margin: theme.spacing(2, -0.8, 0, -0.8),
    },
  },
  yourCard: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Work Sans`,
    lineHeight: '21px',
    textTransform: 'uppercase',
    color: 'var(--green-color)',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans Bold !important`,
    },
  },
  addNewCard: {
    font: `normal ${theme.spacing(1.4)} Work Sans`,
    fontWeight: 600,
    lineHeight: '16px',
    textTransform: 'uppercase',
    color: 'var(--black)',
  },

  bankNameDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  codDiv: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2.5, 2, 1, 2),
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  textDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(2.5, 0),
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      margin: theme.spacing(2.5, 1),
    },
  },
  addbtn: {
    cursor: 'pointer',
  },
}));
interface Props {
  getBalance: Function;
}

function Gift(props: Props) {
  const [giftVoucher, setGiftVoucher] = useState(false);

  const classes = useStyles();

  const dispatch: any = useDispatch();
  // const [state, setState] = useState({
  //   open: false,
  // });

  // const handleOpen = () => {
  //   setState({ ...state, open: true });
  // };

  // const handleClose = () => {
  //   setState({ ...state, open: false });
  // };
  const onChange = () => {
    if (giftVoucher) {
      // onClose()
    }
    setGiftVoucher(!giftVoucher);
  };
  const onRedeemBalance = (payload: any, callback: Function) => {
    dispatch(redeemBalance(payload, callback));
  };

  return (
    <div className={classes.yourCardRoot}>
      <div className={classes.yourCardDiv} onClick={onChange}>
        <div className={classes.bankNameDiv}>
          {/* <GIFT_ICON /> */}
          <Typography className={classes.yourCard}>Gift Card</Typography>
        </div>
        <div className={classes.addbtn}>
          <img src={Utils.images.Add_More} alt="icon" />
        </div>
      </div>
      {giftVoucher && (
        <>
          {/* <div className={classes.codDiv}>
            <TextField
              id="standard-start-adornment"
              placeholder="Enter here"
              className={classes.inputField}
              variant="outlined"
            />
            <div className={classes.btnSubmit}>
              <CustomButton
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                text={"Verify"}
                onClick={handleOpen}
              />
            </div>
          </div> */}
          <RedeemForm
            textInfo={''}
            onRedeemBalance={onRedeemBalance}
            getBalance={props.getBalance}
          />
        </>
      )}
    </div>
  );
}

export default Gift;
