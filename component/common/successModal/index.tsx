import { Modal, Fade,
    Backdrop, Typography, Divider, Theme
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Utils from '../../utils';
import CustomButton from "../button"
// import { SUCCESS } from 'utils/constantImages';

const useStyles = makeStyles((theme: Theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: "blur(5px)",
    },
    backDrop:{
        // cursor:"not-allowed",
        pointerEvents: 'none'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        outline: "none",
        // padding: theme.spacing(1.5, 1.5),
        display: "block",
        alignItems: "center",
        borderRadius: '3px',
        maxWidth: '500px',
        [theme.breakpoints.down("sm")]: {
            margin: '20px',
            padding: theme.spacing(1.5, 1.5),
           
        },
        [theme.breakpoints.down("xs")]:{
            width: '100%',
        }

    },
    innerContainer: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        padding: theme.spacing(3.6, 2.6, 2.4, 2.6),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2, 2),
        },
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(0, 0),
        }
    },
    description: {
        font: `normal 500 ${theme.spacing(1.6)} Work Sans`,
        lineHeight: "24px",
        color: '#333333',
        textAlign: 'center',
        marginTop: '11px',
        marginBottom: '40px',
        // padding: theme.spacing(0, 3),
        // [theme.breakpoints.down("xs")]: {
        //     // padding: theme.spacing(0.5, 0.5),
        // }
    },
    title: {
        font: `normal 600 ${theme.spacing(2.0)} Work Sans`,
        lineHeight: "24px",
        color: '#333333',
        textAlign: 'center',
        marginTop: '15px',
        padding: theme.spacing(0, 4),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(0.5, 0.5),
        },
        [theme.breakpoints.down("xs")]: {
            font: `normal ${theme.spacing(1.7)} Work Sans Bold`,
            letterSpacing:"0.06em"
    
          }
    },
    closeIcon: {
        float: 'right',
        cursor: "pointer"
    },
    divider: {
        marginBottom: '10px',

    },
    btn: {
        borderRadius:"4px",
        font: `normal 500 ${theme.spacing(1.6)} Work Sans !important`,
        lineHeight: "18.77px",
        color: "#FFFFFF",
        [theme.breakpoints.down("xs")]: {
            font: `normal ${theme.spacing(1.5)} Work Sans Medium`,
    
          }
    },
    imageContainer: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    img: {
        width: "80px",
        height: "80px"
    }


}))

interface Props {
    open: boolean;
    handleClose: () => void;
    description: any
    title: string;
    buttonText: string;
    displayDivider: boolean
}


const SuccessModal = (props: Props) => {
    const classes = useStyles();
    const { buttonText, title, description, open, displayDivider } = props
    return (
        <Modal
            // onBackdropClick={() => { }}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                classes: {
                    root: classes.backDrop
                }
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    {/* <img className={classes.closeIcon} src={Utils.images.CROSS} onClick={props.handleClose} /> */}
                    <div className={classes.innerContainer}>
                        <div className={classes.imageContainer}>
                            <img className={classes.img} src={Utils.images.SUCCESS} alt="success" />
                        </div>
                        <Typography variant="h4" className={classes.title}>
                            {title || ''}
                        </Typography>
                        <Typography variant="h4" className={classes.description}>
                            {description || ''}
                        </Typography>
                        {displayDivider && <Divider light className={classes.divider} />}

                        <CustomButton
                            type="submit"
                            color="primary"
                            fullWidth
                            variant="contained"
                            text={buttonText}
                            className={classes.btn}
                            onClick={props.handleClose}
                        />
                    </div>
                </div>
            </Fade >
        </Modal >
    )
}

export default SuccessModal
