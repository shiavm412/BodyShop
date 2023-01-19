import {
  
  Theme,
  Typography,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomButton from "../../common/button";
import Utils from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
 ({
    productContainer: {
      // background: "var(--white)",
      // padding: theme.spacing(3, 5),
      // [theme.breakpoints.down('sm')]:{
      //   padding: theme.spacing(3, 1),
      // }
    },

    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        3.6
      )}  Work Sans`,
      fontWeight: 600,
      lineHeight: "42px",
    },

    innerContainer: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(1.5),
      },
    },
    ImgDiv: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1),
      boxShadow: "0px 5px 20px rgba(35, 30, 30, 0.06)",
    },
    img: {
      width: "100%",
    },
    cardHeading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}  Recoleta Alt`,
      lineHeight: "24px",
      color: "var(--black)",
      margin: theme.spacing(0.8, 0),
    },
    cardSubHeading: {
      font: `normal ${theme.spacing(1.4)}  Work Sans`,
      lineHeight: "24px",
      color: "var(--secondary-black)",
    },
    btn: {
      textAlign: "center",
      margin: theme.spacing(1, 0),
      width: "50%",
    },
  })
);
interface Props {
  navigateTo: Function;
  offersData:any
}
function BankOffers({ }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.productContainer}>

      <div className={classes.innerContainer}>
        <Grid container spacing={2}>
          {Array.of(1, 2, 3).map((item) => (
            <Grid item md={4} key={item}>
              <div className={classes.ImgDiv}>
                <img
                  src={Utils.images.BANKBG}
                  alt="one"
                  className={classes.img}
                />
                <div>
                  <Typography variant="h3" className={classes.cardHeading}>
                    Upto 50% OFF on HDFC credit card
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="body1"
                    className={classes.cardSubHeading}
                  >
                    Bank Offer10% Instant Discount upto ₹3000 on HDFC Bank
                    Credit Card,Credit EMI and Debit card Non-EMI Transaction
                  </Typography>
                </div>
                <div className={classes.btn}>
                  <CustomButton
                    type={"submit"}
                    color="primary"
                    fullWidth
                    text={"Shop Now"}
                  />
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default BankOffers;
