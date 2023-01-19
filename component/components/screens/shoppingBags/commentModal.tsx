import {
  Modal,
  Fade,
  Backdrop,
  Typography,
  Grid,
  TextField,
  Theme,
} from "@mui/material";
import {   makeStyles } from "@mui/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CustomButton from "../../../common/button";
import Utils from "../../../utils";
import { shoppingFeedback } from "../../../utils/event/action";
import { sendOverallRating } from "../account/profile/action";

interface Props {
  open: boolean;
  handleClose: any;
  description: any;
  title: string;
  buttonText: string;
  rating: number;
}

const useStyles = makeStyles((theme:Theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(5px)",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    // padding: theme.spacing(1.5, 1.5),
    display: "block",
    alignItems: "center",
    borderRadius: "3px",
    maxWidth: "500px",
    [theme.breakpoints.down("sm")]: {
      margin: "20px",
      padding: theme.spacing(1.5, 1.5),
    },
    width: "500px",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(3.6, 2.6, 2.4, 2.6),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 2),
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0, 0),
    },
  },
  description: {
    font: `normal 500 ${theme.spacing(1.6)} Work Sans`,
    lineHeight: "24px",
    color: "#333333",
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "36px",
    padding: theme.spacing(0, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.5, 0.5),
      font: `normal ${theme.spacing(1.4)} Work Sans Regular`,

    },
  },
  label: {
    letterSpacing: "0em",
    font: `normal 500 ${theme.spacing(1.5)} Work Sans`,
    lineHeight: "18px",
    color: "#333333",
  },
  title: {
    font: `normal 600 ${theme.spacing(2.0)} Work Sans`,
    lineHeight: "24px",
    color: "#333333",
    textAlign: "center",
    padding: theme.spacing(0, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.5, 0.5),
      font: `normal ${theme.spacing(1.8)} Work Sans Bold`,

    },
  },
  closeIcon: {
    // float: "right",
    cursor: "pointer",
    textAlign: "end"
    // margin: "20px",
  },
  divider: {
    marginBottom: "10px",
  },
  btn: {
    borderRadius: "4px",
    font: `normal 500 ${theme.spacing(1.6)} Work Sans !important`,
    lineHeight: "18.77px",
    color: "#FFFFFF",
  },
  backDrop: {
    // cursor:"not-allowed",
    pointerEvents: "none",
  },
  comment: {
    width: "100%",
    "& .MuiFilledInput-root": {
      backgroundColor: "#FAFAFA",
      border: "1px solid #F2F2F2",
    },
    "& .MuiFilledInput-multiline": {
      padding: "10px",
    },
    marginTop: "10px",
    "& .MuiInputBase-input": {
      font: `normal 500 ${theme.spacing(1.6)} Work Sans`,
      lineHeight: "24px",
      color: "#333333",
      "&::-webkit-input-placeholder": {
        font: `normal  ${theme.spacing(1.4)} Work Sans`,
        color: "#999999",
        fontWeight: 500,
        // lineHeight:'16.42'
      },
    },
    "& .MuiFilledInput-underline:: after": {
      border: "0px solid white !important",
    },

    // '& .MuiInputBase-root::before': {
    //     border: '0px',
    //     '&:focus': {
    //         border: '0px',
    //     }
    // },
    // '& .Mui-focused': {
    //     border: '0px',
    // },

    // '& .MuiInput-underline::before': {
    //     '&:focus': {
    //         border: '0px',
    //     }
    // }
  },
  required: {
    color: "#f44336",
    fontSize: "15px",
  },
}));

const CommentModal = (props: Props) => {
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const [comment, setComment] = useState("");

  // const [successModalVisibility, setSuccessModalVisibility] = useState(false)
  // const [commentModalVisibility, setCommentModalVisibility] = useState(false)

  const { buttonText, title, description, open, rating } = props;

  // const handleSuccessModalClose = () => {
  //     // setSuccessModalVisibility(false);
  //     // history.push('/');
  // };

  const onChange = (e: any) => {
    setComment(e.target.value);
  };
  const handleClose = () => {
    // setSuccessModalVisibility(true);
    const payload = {
      rating,
      review: comment.trim(),
    };

    let eventPayload: any = {
      Rating: rating,
      RatingComment: comment.trim(),
      Platform: "Web",
    };
    shoppingFeedback(eventPayload);

    dispatch(
      sendOverallRating(payload, () => {
        props.handleClose(true);
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
        onClose={() => props.handleClose(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
              <div className={classes.closeIcon} onClick={() => props.handleClose(false)}>
              <img src={Utils.images.CROSS} alt="cross" />
              </div>
           
            <div className={classes.innerContainer}>
              <Typography variant="h4" className={classes.title}>
                {title || ""}
              </Typography>
              <Typography variant="h4" className={classes.description}>
                {description || ""}
              </Typography>
              <Grid container>
                <Grid item xs={12} md={12}>
                  <Typography className={classes.label}>
                    Message<span className={classes.required}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    value={comment}
                    className={classes.comment}
                    maxRows={4}
                    id="outlined-multiline-static"
                    label=""
                    multiline
                    minRows={4}
                    placeholder="Add comment here"
                    variant="filled"
                    onChange={onChange}
                  />
                </Grid>
              </Grid>
              <CustomButton
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                text={buttonText}
                className={classes.btn}
                onClick={handleClose}
                disabled={comment.trim() ? false : true}
              />
            </div>
          </div>
        </Fade>
      </Modal>
      {/* <SuccessModal
                displayDivider={true}
                title={`Thank You!!`}
                description={"Lorem Ipsum is simply dummy text."}
                buttonText="OK"
                open={successModalVisibility}
                handleClose={handleSuccessModalClose}
            /> */}
    </>
  );
};

export default CommentModal;
