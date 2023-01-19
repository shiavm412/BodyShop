import {
  Modal,
  Fade,
  Backdrop,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
// import { CROSS } from "utils/constantImages";
import Utils from "../../utils";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(5px)",

    "& .MuiBackdrop-root": {
      background: "rgba(51, 51, 51, 0.3)",
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    padding: theme.spacing(2),
    display: "block",
    alignItems: "center",
    borderRadius: "3px",
    width: theme.spacing(80),
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      borderRadius: "12px",
    },
  },

  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2
    )} Recoleta Alt`,
    lineHeight: "27px",
    marginBottom: "20px",
    letterSpacing: "0.02em",
    color: "var(--black)",
    opacity: "0.9",
  },
  formContainer: {
    display: "flex",
    alignItems: "center",
  },

  divider: {
    margin: theme.spacing(2, 0),
  },

  img: {
    cursor: "pointer",
    textAlign: "end",
  },
  para: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.5
    )} Work Sans`,
    lineHeight: "25px",
    color: "var(--secondary-black)",
  },
  subHeading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.6
    )} Work Sans`,
    lineHeight: "19px",
    color: "var(--secondary-black)",
    marginLeft: theme.spacing(1),
  },
  listItem: {
    padding: theme.spacing(1, 2),
  },
  image: {
    display: "flex",
    alignItems: "center",
  },
}));
const ShopNow = (props: Props) => {
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
            <div className={classes.img} onClick={props.handleClose}>
              <Image src={Utils.images.CROSS} alt="crossIcon" width={20} height={20}/>
            </div>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <div className={classes.image}>
                    <img src={Utils.images.SHOP_NOW} alt="shopNow" />
                  </div>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography variant="h4" className={classes.heading}>
                    FREE 250ML SHOWER GEL WHEN YOU SPEND £30 Go Gab!
                  </Typography>
                  <Typography variant="body1" className={classes.para}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.
                  </Typography>
                </Grid>
              </Grid>

              <Divider light className={classes.divider} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className={classes.formContainer}>
                    <img src={Utils.images.DOCS} alt="icon" />
                    <Typography variant="h4" className={classes.subHeading}>
                      Terms and conditions
                    </Typography>{" "}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <ul className={classes.listItem}>
                    {Array.of(1, 2).map(() => (
                      <>
                        <li>
                          <Typography variant="body1" className={classes.para}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s.
                          </Typography>
                        </li>
                        <Divider light className={classes.divider} />
                      </>
                    ))}
                  </ul>
                </Grid>
              </Grid>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default ShopNow;
