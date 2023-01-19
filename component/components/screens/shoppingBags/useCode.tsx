import { Theme, Typography, Input, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  useCodeRoot: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.5),
    borderRadius: 4,
    backdropFilter: 'blur(5px)',
    marginBottom: theme.spacing(2.5),
  },
  flexDiv: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  leftDiv: {
    flexBasis: '50%',
    [theme.breakpoints.down('xs')]: {
      flexBasis: '100%',
    },
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
  rightDiv: {
    flexBasis: '50%',
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      flexBasis: '100%',
      alignItems: 'normal',
      marginTop: theme.spacing(1),
    },
  },
  inputDiv: {
    display: 'flex',
    width: '100%',
  },
  searchInput: {
    backgroundColor: 'var(--white)',
    padding: theme.spacing(0.5, 1),
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )} Work Sans`,
    height: '54px',
    flexBasis: '70%',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      textOverflow: 'ellipse',
      padding: theme.spacing(0.5, 4, 0.5, 1),
    },
  },
  sendButton: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )} Work Sans`,
    borderRadius: '4px',
    color: theme.palette.primary.main,
    padding: theme.spacing(1, 3.5),
    flexBasis: '30%',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.2),
    },
  },
}));

function UseCode() {
  const classes = useStyles();
  return (
    <div className={classes.useCodeRoot}>
      <div className={classes.flexDiv}>
        <div className={classes.leftDiv}>
          <Typography className={classes.heading}>
            ₹500 off when you spend ₹5,000
          </Typography>
          <Typography className={classes.paragraph}>
            Please Note, Only One Promotion Can Be Redeemed Per Transaction. To
            Try Different Promotions, First Remove One Already Applied By
            Clicking On The X Below, Then Apply Your Alternative Code Into The
            Promotion Box.
          </Typography>
        </div>
        <div className={classes.rightDiv}>
          <Typography className={classes.heading}>
            USE Code : THEBODYSHOP500
          </Typography>
          <div className={classes.inputDiv}>
            <Input
              disableUnderline
              placeholder="Promotional Code"
              className={classes.searchInput}
            />
            <Button
              color="secondary"
              variant="contained"
              disableElevation
              className={classes.sendButton}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UseCode;
