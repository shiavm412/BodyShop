import { Button, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface Props {
  type?: 'reset' | 'submit' | 'button';
  onClick?: () => void;
  text: string;
  isOutline?: boolean;
  isGreen?: boolean;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  className?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    '&.MuiButton-root': {
      borderRadius: '4px',
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )} Work Sans`,
      textTransform: 'capitalize',
      padding: theme.spacing(1.5, 2),
      color: 'var(--white)',
    },
  },
  btn1: {
    '&.MuiButton-root': {
      borderRadius: 4,
      backgroundColor: 'var(--white)',
      color: 'var(--secondary-black)',
      border: '1px solid var(--secondary-black)',
    },
  },
  btnGreen: {
    '&.MuiButton-root': {
      borderRadius: 4,
      color: 'var(--primary)',
      border: '1px solid var(--main-opacity)',
    },
  },
}));

const ContainedButton = (props: Props) => {
  const classes = useStyles();
  return (
    <Button
      disabled={props.isDisabled || false}
      color="primary"
      variant="contained"
      // className={props.isOutline ? `${classes.btn1}  ${props.isGreen ? classes.btnGreen : ""}` : classes.btn}
      className={`${classes.btn} ${props?.className ? props.className : ''}  ${
        props.isOutline ? classes.btn1 : ''
      }  ${props.isGreen ? classes.btnGreen : ''}`}
      onClick={props.onClick}
      fullWidth={props.isFullWidth}
      disableElevation
    >
      {props.text}
    </Button>
  );
};

export default ContainedButton;
