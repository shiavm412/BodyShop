import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
// import { useEffect } from "react";
import { useSelector } from 'react-redux';
import CustomCheckbox from '../../../../common/customCheckbox';
import Utils from '../../../../utils';
// import Utils from "../../../utils";
// import CustomCheckbox from "../../../components/common/customCheckbox";
// import { hideLoader, showLoader } from "../../home/actions";
// import { ReducersModal } from "../../../models";
// import { WALLET_IMG } from "utils/constantImages";
// import { updateCartSummary } from "../../shoppingBags/action";

const useStyles = makeStyles((theme: Theme) => ({
  walletBalanceDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid var(--border-color)',
    padding: theme.spacing(1.5),
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
  },
  contentDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  walletAndAvailableBalanceDiv: {
    marginLeft: theme.spacing(1),
  },
  walletBalance: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Work Sans`,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.2)} Work Sans SemiBold`,
      letterSpacing: '0.06em',
    },
  },
  availableBalance: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.5
    )} Work Sans`,
    color: theme.palette.primary.main,
    lineHeight: '24px',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.1)} Work Sans Medium`,
      letterSpacing: '0.02em',
    },
  },
}));
interface Props {
  // getBalance: Function;
  walletBalance: number;
  rewardBalance: number;
  paymentMode?:
    | 'cod'
    | 'netbanking'
    | 'paytm'
    | 'upi'
    | 'wallet'
    | 'reward'
    | 'membership'
    | undefined;
  setPaymentMode: Function;
  setProceedToPay: Function;
  setWalletChecked: Function;
  rewardChecked: boolean;
  walletChecked: boolean;
  disablePaymentOptions: boolean;
  setRewardChecked: Function;
}

const Wallet = (props: Props) => {
  const classes = useStyles();
  const {
    walletBalance,
    // setPaymentMode,
    // setProceedToPay,
    // setRewardChecked,
    setWalletChecked,
    walletChecked,
    rewardChecked,
    rewardBalance,
    disablePaymentOptions,
  } = props;
  // const dispatch = useDispatch();
  const data: any = useSelector((state: any) => state.shoppingBagReducer);

  // useEffect(() => {
  //     if (walletBalance) {
  //         handleCartSummary(true)
  //     }
  // }, [walletBalance]);

  // const handleCartSummary = (checked: boolean) => {
  //     if (checked) {
  //         setPaymentMode("wallet")
  //     } else {
  //         setPaymentMode(undefined)
  //     }
  //     dispatch(showLoader())
  //     let payload: any = {
  //         cartId: data._id,
  //         donation: data.donation,
  //         productDiscount: Math.abs(data.productDiscount),
  //         isWhatsAppConsent: data.isWhatsAppConsent,
  //         addressId: checkoutAddressId ?? "",
  //         isOrderWrapped: data.isOrderWrapped,
  //         walletAmount: checked ? walletBalance : 0,
  //         isPaymentScreen: true

  //     };
  //     if (data?.shipping?.shippingType) {
  //         payload.shipping = data.shipping;
  //     }
  //     dispatch(
  //         updateCartSummary(payload, (resp: any) => {
  //             if (resp?.walletAmount>=resp?.grandTotal ) {
  //                 setProceedToPay(false)
  //             } else {
  //                 setProceedToPay(true)
  //             }
  //             // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //             dispatch(hideLoader())
  //         })
  //     );
  // };
  // useEffect(() => {
  //   if (((!rewardData?.AvailablePoints || Number(rewardData?.AvailablePoints) <= 0) && walletBalance) || ((Number(rewardData?.AvailablePoints) >= 0 && isMembershipAdded && walletBalance))) {
  //     handleCartSummary(true, false, null);
  //     setWalletChecked(true)
  //     // setPaymentMode("wallet")
  //     // setProceedToPay(false)

  //   }
  // }, [walletBalance,rewardData?.AvailablePoints])
  const onCheckboxChange = (e: any) => {
    if (
      (e?.target?.checked &&
        // rewardBalance < data?.grandTotal
        data?.grandTotal &&
        rewardChecked) ||
      (e?.target?.checked && !rewardChecked)
    ) {
      // setPaymentMode("wallet");
      setWalletChecked(true);
    } else {
      setWalletChecked(false);
      // setPaymentMode(!rewardChecked ? undefined : "reward")
    }

    // if (e?.target?.checked) {
    //     setPaymentMode("wallet")

    // } else {
    //     setPaymentMode(undefined);
    //     setProceedToPay(true)

    // }
    // handleCartSummary(e?.target?.checked || false)
  };
  return walletBalance !== 0 ? (
    <div className={classes.walletBalanceDiv}>
      <div className={classes.contentDiv}>
        <img src={Utils.images.WALLET_IMG} alt="wallet" />
        <div className={classes.walletAndAvailableBalanceDiv}>
          <Typography className={classes.walletBalance}>
            Wallet Balance
          </Typography>
          <Typography className={classes.availableBalance}>
            Available Balance: ₹
            {Utils.CommonFunctions.addCommaToAmount(walletBalance)}
          </Typography>
        </div>
      </div>
      <div>
        <CustomCheckbox
          disabled={disablePaymentOptions && !walletChecked}
          onChange={onCheckboxChange}
          checked={walletChecked}
          defaultChecked={
            (rewardChecked &&
              rewardBalance < data?.grandTotal &&
              walletBalance) ||
            (!rewardBalance && walletBalance > 0)
              ? true
              : false
          }
          color="primary"
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Wallet;
