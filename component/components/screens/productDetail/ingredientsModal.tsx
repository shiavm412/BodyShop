// import ContainedButton from "../../../../../components/containedButton";
import { Modal, Fade, Backdrop, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import images from '../../../utils/images';
// import { CROSS } from 'utils/constantImages';
// import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  handleClose: () => void;
  ingridientsDescription: any;
  title: string;
  // reasons: any;
  // handleSubmit: Function;
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
    padding: theme.spacing(2, 2),
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    maxHeight: '600px',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      padding: theme.spacing(2),
      borderRadius: '12px',
    },
  },
  title: {
    font: `normal 700 ${theme.spacing(1.6)} Work Sans`,
    lineHeight: '26px',
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down('xs')]: {
      fontSize: '15px',
    },
  },
  heading: {
    font: `normal 500 ${theme.spacing(1.8)} Work Sans`,
    lineHeight: '26px',
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px',
      margim: 0,
    },
  },
  description: {
    margin: theme.spacing(0, 0, 4, 0),
    '& ul': {
      paddingLeft: '20px',
    },
    '& h3': {
      padding: theme.spacing(0, 0, 1.2, 0),
    },
    font: `normal 400 ${theme.spacing(1.4)} Work Sans`,
    color: 'rgba(102, 102, 102, 0.99)',
    lineHeight: '26px',
    overflowY: 'auto',
    maxHeight: '450px',
    paddingBottom: '10px',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '30px',
      font: `normal 400 ${theme.spacing(1.4)} Work Sans`,
      '& h3': {
        padding: theme.spacing(0, 0, 1.2, 0),
      },
      '& p': {
        lineHeight: '26px',
      },
    },
    // margin: theme.spacing(1, 0),
  },
  closeIcon: {
    cursor: 'pointer',
  },
  headingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const IngredientsModal = (props: Props) => {
  const classes = useStyles();
  const { ingridientsDescription, title } = props;

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
          <div className={classes.headingContainer}>
            <div className={classes.heading}>Ingredients</div>

            <div className={classes.closeIcon} onClick={props.handleClose}>
              <img src={images.CROSS} alt="cross" />
            </div>
          </div>
          <div className={classes.title}>{title}</div>

          {/* <div className={classes.description} dangerouslySetInnerHTML={{__html:ingridientsDescription||""}}/> */}
          <Typography className={classes.description}>
            {ingridientsDescription}
          </Typography>
        </div>
      </Fade>
    </Modal>
  );
};

export default IngredientsModal;
