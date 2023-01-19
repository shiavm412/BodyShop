import {
  Theme,
  Typography,
  Divider
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import COD from "./cod";
import UPI from "./upi";
import PayTm from "./paytm";
import NetBanking from "./netbanking";
// import { PaymentOptionsProps } from "../../../utils/types";
// import { ReducersModal } from "../../../models";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { PaymentOptionsProps } from "../../../../utils/types";

const useStyles = makeStyles((theme: Theme) =>({
    yourCardRoot: {
      marginBottom: theme.spacing(1.5),
      border: "1px solid var(--border-color)",
      [theme.breakpoints.down("xs")]: {
        border: "none",
        // borderBottom: "5px solid var(--border-color)",
      }
    },
    yourCardDiv: {
      borderBottom: "1px solid var(--border-color)",
      padding: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1.5, 1),
        borderBottom: "none"
      },
    },
    yourCard: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )} Work Sans`,
      lineHeight: "21px",
      textTransform: "uppercase",
      color: "var(--green-color)",
      [theme.breakpoints.down("xs")]: {

        textTransform: "none",
        color: "var(--black)",
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.4
        )} Recoleta Alt Bold`,
        letterSpacing: "0.06em"
      },
    },
    addNewCard: {
      font: `normal ${theme.spacing(1.4)} Work Sans`,
      fontWeight: 600,
      lineHeight: "16px",
      textTransform: "uppercase",
      color: "var(--black)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "12.5px",
      },
    },
    divider: {
      border: "1px dashed rgba(178, 178, 178, 0.5)",
      [theme.breakpoints.down("xs")]: {
        border: "1px solid rgba(178, 178, 178, 0.5)"
      }
    },
    inputField: {
      width: "430px",
      "& .MuiOutlinedInput-adornedEnd": {
        paddingRight: theme.spacing(4),
        [theme.breakpoints.down("sm")]: {
          paddingRight: theme.spacing(3),
        },
      },
      "& .MuiOutlinedInput-root": {
        border: "1px solid var(--border-color)",
        borderRadius: "2px",
      },
      "& .MuiOutlinedInput-input": {
        padding: "15px 14px",
      },
      [theme.breakpoints.down("sm")]: {
        // width: "auto",
        width: "-webkit-fill-available",
      },
    },

    radioButton: {
      transition: "none",
      "&:hover": { backgroundColor: "white" },
      width: "14px",
      height: "14px",
    },
    outerDiv: {
      padding: theme.spacing(0, 2),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0, 0),
      },
    },
    bankDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: theme.spacing(2.5, 2),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(2, 1),
      },
    },

    codDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: theme.spacing(2.5, 2),
      [theme.breakpoints.down("sm")]: {
        display: "block",
        padding: theme.spacing(0, 1.8, 1, 1.8),
        margin: "0px",
      },
    },
    textDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: theme.spacing(2.5, 2),
      [theme.breakpoints.down("sm")]: {
        display: "block",
        margin: theme.spacing(2.5, 1),
      },
    },
    bankNameDiv: {
      display: "flex",
      alignItems: "center",
    },
    bankColumnDiv: {
      display: "flex",
      alignItems: "center",
      marginLeft: theme.spacing(1.2),
    },
    bankColumn: {
      marginLeft: theme.spacing(1.2),
    },
    btn: {
      width: theme.spacing(16),
      float: "right",
      marginTop: theme.spacing(-8),
      [theme.breakpoints.down("sm")]: {
        width: "auto",
      },
    },
    btn2: {
      width: theme.spacing(16),
      float: "right",
      marginTop: theme.spacing(-8),
      [theme.breakpoints.down("sm")]: {
        width: "auto",
        margin: theme.spacing(-2, 1.5, 2, 1.5),
        float: "none",
      },
    },
    name: {
      font: `normal ${theme.spacing(1.5)} Work Sans`,
      fontWeight: 500,
      lineHeight: "15px",
      color: "var(--secondary-black)",
      marginLeft: theme.spacing(0.8),
    },
    innerDiv: {
      padding: theme.spacing(0, 1.5),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0, 0),
      },
    },
    heading: {
      font: `normal ${theme.spacing(1.6)} Work Sans`,
      fontWeight: 600,
      lineHeight: "19px",
      color: "var(--main-opacity)",
      margin: theme.spacing(0, 1.6),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(0, 0.7),
      },
    },
    btnSubmit: {
      width: theme.spacing(16),
      marginTop: theme.spacing(-1.5),
      [theme.breakpoints.down("sm")]: {
        width: "auto",
        marginTop: theme.spacing(0),
      },
    },
    textHeading: {
      font: `normal ${theme.spacing(1.3)} Work Sans`,
      fontWeight: 500,
      lineHeight: "15px",
      color: "var(--light-gray)",
      margin: theme.spacing(0, 0, 1.5, 2.5),
    },
    skeltonView: {
      padding: theme.spacing(14),
    },
    divider2: {
      background: "#F8F8F8",
      margin: "25px -6px",
      height: "5px"

    }
  })
);

const OtherOptions: React.FC<any> = ({
  section,
  setProceedToPay,
  paymentMode,
  setPaymentMode,
  disablePaymentOptions,
  paymentMethods,
  setBank,
  setBtnText,
  flag,
  setVpa,
  vpa,
  rewardData,
  walletBalance,
  handleCartSummary,
  showMode,
  deliveryData
}: PaymentOptionsProps) => {
  const classes = useStyles();


  const isMembershipAdded = useSelector((state: any) => state.shoppingBagReducer?.isMembershipAdded)

  // const paymentOptions = useSelector(
  //   (state: ReducersModal) => state.configReducer.paymentConfigs?.paymentOptions
  // ) || [];

  // const [otp, setOtp] = useState("");
  // const [state, setState] = useState({
  //   open: false,
  // });

  // const onModeChange = (id: number) => {
  //   setPaymentOption(id)
  //   if (id === 3) {
  //     const mobileNo = eCardSummary?.giftCard?.receiverMobile || null;
  //     const payload = {
  //       mobileNo: mobileNo ? String(mobileNo) : '',
  //       countryCode: '+91',
  //       otpVia: 'mobile',
  //       email: eCardSummary?.giftCard?.receiverEmail || '',
  //       type: "signup"
  //     }
  //     if (mobileNo && isAuthenticated())
  //       dispatch(sendOtp(payload))
  //   }
  // }

  // const verify = (otp: string) => {
  //   const mobileNo = eCardSummary?.giftCard?.receiverMobile || null;
  //   const payload = {
  //     mobileNo: mobileNo ? String(mobileNo) : '',
  //     countryCode: '+91',
  //     otpVia: 'mobile',
  //     email: eCardSummary?.giftCard?.receiverEmail || '',
  //     type: "signup",
  //     "OTP": otp,
  //   }
  //   dispatch(verifyOtp(payload, (data: any) => {
  //     if (data.httpCode === 201 || data.httpCode === 200) {
  //       setProceedToPay(true);
  //       window.scrollTo(0, 0)
  //     }
  //     else {
  //       setProceedToPay(false)
  //     }
  //   }))
  // }
  // let deliveryData: any = sessionStorage.getItem('deliveryData');
  // deliveryData = deliveryData && deliveryData !== "" ? JSON.parse(deliveryData) : {}
  return (
    <>
      <div className={classes.yourCardRoot}>
        <div className={classes.yourCardDiv}>
          <Typography className={classes.yourCard}>Other Options</Typography>
        </div>
        {
          
          ((section === "mybag" && deliveryData?.isPrepaid) || section !== "mybag" ||  flag === "retry" || flag == "convertToCod") && showMode && showMode("razorpay") ?
            <UPI handleCartSummary={handleCartSummary}
              setVpa={setVpa} vpa={vpa} flag={flag} disablePaymentOptions={disablePaymentOptions} section={section} paymentMode={paymentMode} setPaymentMode={setPaymentMode} setProceedToPay={setProceedToPay} />
            : null
        }
        {
          ((section === "mybag" && deliveryData?.isPrepaid) || section !== "mybag" || flag === "retry" || flag == "convertToCod") && showMode && showMode("razorpay") ?
            <NetBanking showMode={showMode} isMembershipAdded={isMembershipAdded} handleCartSummary={handleCartSummary}
              flag={flag} setBank={setBank} paymentMethods={paymentMethods} disablePaymentOptions={disablePaymentOptions} section={section} paymentMode={paymentMode} setPaymentMode={setPaymentMode} setProceedToPay={setProceedToPay} /> :
            null
        }
        {
          ((section === "mybag" && deliveryData?.isPrepaid) || section !== "mybag" || flag === "retry" || flag == "convertToCod") && showMode && showMode("paytm") ?
            <PayTm handleCartSummary={handleCartSummary} walletBalance={walletBalance} rewardData={rewardData} flag={flag} disablePaymentOptions={disablePaymentOptions} section={section} paymentMode={paymentMode} setPaymentMode={setPaymentMode} setProceedToPay={setProceedToPay} setBtnText={setBtnText} />
            : null
        }
        {
          (
            (deliveryData?.isCOD &&  showMode && showMode("cashondelivery") && (section !== 'egift' && section !== "membership" && !isMembershipAdded && flag !== "convertToCod" && flag !== "retry"))
            || ((flag == "convertToCod" || flag == "retry") && section !== 'egift' && section !== "membership" && !isMembershipAdded&&showMode && showMode("cashondelivery"))
          )
          &&
          <COD handleCartSummary={handleCartSummary}
            flag={flag} disablePaymentOptions={disablePaymentOptions} section={section} paymentMode={paymentMode} setPaymentMode={setPaymentMode} setProceedToPay={setProceedToPay} />
        }
      </div>
     <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Divider className={classes.divider2} />

      </Box>
    </>
  );
};

export default OtherOptions;
