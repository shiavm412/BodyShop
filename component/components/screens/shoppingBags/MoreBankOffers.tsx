import {
  Modal,
  Fade,
  Backdrop,
  Typography,
  Grid,
  Theme,
} from "@mui/material";
import {   makeStyles } from "@mui/styles";
import format from "date-fns/format";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Utils from "../../../utils";
import { getProductOffers } from "../../offers/action";
// import { CROSS, TAG_ICON } from "utils/constantImages";
// import { hideLoader, showLoader } from "../home/actions";
// import { getProductOffers } from "../offers/action";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles((theme:Theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(5px)",
    // height:'500px'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    padding: theme.spacing(1),
    display: "block",
    alignItems: "center",
    borderRadius: "3px",
    width: "800px",
    // height: "85%",
    height: "auto",

    // overflowY: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      borderRadius: "12px",
    },
  },
  innerContainer: {
    display: "flex",
    width: "100%",
    // overflowY: 'auto',
    // overflow: 'hidden',
    // height: "400px",
    padding: theme.spacing(1, 0, 0, 0),
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.6
    )} Work Sans SemiBold`,
    lineHeight: "28.8px",
    marginBottom: "25px",
    padding: "10px 0px 10px 0px",
  },
  imgIcon: {
    textAlign: "end",
    cursor: "pointer",
  },
  outerDiv: {
    padding: theme.spacing(1, 2),
    height: "280px",
    overflowY: "auto",
  },
  title: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.6
    )} Recoleta Alt`,
    lineHeight: "28.8px",
    color: "var(--secondary-black)",
    margin: theme.spacing(1, 2),
  },
  boxDiv: {
    border: "1px solid var(--border-color)",
    background: "var(--white)",
    boxSizing: "border-box",
    padding: theme.spacing(1),
  },
  paraHeading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.5
    )} Work Sans`,
    lineHeight: "28.8px",
    color: "var(--secondary-black)",
  },
  para: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.5
    )} Work Sans`,
    lineHeight: "28.8px",
    color: "var(--main-opacity)",
    marginLeft: theme.spacing(1),
  },
  secondPara: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: "28.8px",
    color: "var(--black)",
  },
  outerBox: {
    display: "flex",
  },
  date: {
    font: `normal ${theme.spacing(1.3)} Work Sans`,
    lineHeight: "18px",
    color: "var(--light-gray)",
    padding: theme.spacing(0, 0, 0.5, 0),
    textTransform: "capitalize",

    [theme.breakpoints.down("xs")]: {
      fontWeight: 500,
      padding: "10px 0px",
    },
  },
}));
const MoreBankOffer = (props: Props) => {
  const classes = useStyles();
  const [page] = useState<any>(1);
  const [offerListData, setOfferListData] = useState<any>({});
  const limit = 100;
  const dispatch : any= useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    // dispatch(showLoader());
    getOfferList();
  }, []);

  const getOfferList = async () => {
    let query = `?page=${page}&limit=${limit}`;
    dispatch(
      getProductOffers(query, (error: boolean, resp: any) => {
        if (!error) {
          if (resp?.data?.data) {
            setOfferListData(resp?.data?.data || {});
          }
          // dispatch(hideLoader());
        } else {
          // dispatch(hideLoader());
        }
      })
    );
  };

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
            <div className={classes.imgIcon} onClick={props.handleClose}>
            <img src={Utils.images.CROSS} alt="cross" />
            </div>
            <Typography variant="h4" align="center" className={classes.heading}>
              Bank Offers
            </Typography>
            <Typography variant={"h5"} className={classes.title}>
              {offerListData.totalCount} Bank Offers Available
            </Typography>
            <div className={classes.outerDiv}>
              <div className={classes.innerContainer}>
                <Grid container spacing={2}>
                  {Array.isArray(offerListData?.data) &&
                    offerListData.data.map((item: any, _index: any) => (
                      // eslint-disable-next-line react/jsx-key
                      <Grid item xs={12} md={6}>
                        <div className={classes.boxDiv}>
                          <div className={classes.outerBox}>
                            <img src={Utils.images.TAG_ICON} alt="tag" />
                            <Typography
                              variant={"body1"}
                              className={classes.para}
                            >
                              {item.ruleName}
                            </Typography>
                          </div>

                          <Typography
                            variant={"body2"}
                            className={classes.secondPara}
                          >
                            {/* Lorumipsum lorum ipsum lorumipsum lorum ipsum
                          orumipsum lorum ipsum */}
                            {item.shortDesc}
                          </Typography>
                          <Typography className={classes.date}>
                            {`valid Till ${format(
                              new Date(item?.dateTo),
                              "dd MMMM, yyyy"
                            )}`}
                          </Typography>
                        </div>
                      </Grid>
                    ))}
                </Grid>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default MoreBankOffer;
