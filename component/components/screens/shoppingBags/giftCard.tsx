import { Theme, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Utils from '../../../utils';

const useStyles = makeStyles((theme: Theme) => ({
  giftCardRoot: {
    margin: theme.spacing(2.5, 0),
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.5),
    borderRadius: 4,
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  imgDiv: { flexBasis: '25%', maxWidth: '25%' },
  img: {
    width: '100%',
    height: 'auto',
  },
  contentDiv: {
    flexBasis: '75%',
    paddingLeft: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      flexBasis: '100%',
      flexDirection: 'column',
    },
  },
  headingDiv: {
    flexBasis: '65%',
  },
  heading: {
    letterSpacing: 0.8,
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.4
    )} Druk`,
    color: 'var(--light-green)',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(2),
    },
  },
  paragraph: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )} Roboto`,
    color: 'var(--white)',
    flexBasis: '50%',
    lineHeight: 1.5,
  },
  btnDiv: {
    flexBasis: '35%',
    alignSelf: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'center',
      marginTop: theme.spacing(0.5),
    },
  },
  sendButton: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )} Work Sans`,
    borderRadius: 4,
    color: theme.palette.primary.main,
    padding: theme.spacing(2, 2),
    float: 'right',
    flexBasis: '30%',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1.5, 1),
    },
  },
}));

function GiftCard() {
  const classes = useStyles();
  return (
    <div className={classes.giftCardRoot}>
      <div className={classes.imgDiv}>
        <img src={Utils.images.GIFT_BOX} alt="gift" className={classes.img} />
      </div>
      <div className={classes.contentDiv}>
        <div className={classes.headingDiv}>
          <Typography className={classes.heading}>IS THIS A GIFT?</Typography>
          <Typography className={classes.paragraph}>
            Give the perfect gift with a gift pouch made from 100% natural jute,
            your pouch is handcrafted by our Community Fair Trade partner Teddy
            Exports in India. Please note, the design can vary.
          </Typography>
        </div>
        <div className={classes.btnDiv}>
          <Button
            color="secondary"
            variant="contained"
            disableElevation
            className={classes.sendButton}
          >
            Add Gift Wrap
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GiftCard;
