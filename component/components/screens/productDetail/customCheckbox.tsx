import { makeStyles } from '@mui/styles';
import Utils from '../../../utils';
import { Box, Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  radioContainer: {
    marginRight: 5,
    '&:hover': {
      border: `0px`,
      backgroundColor: 'transparent',
    },
  },
  shadeBox: {
    width: '38px',
    height: '38px',
    marginLeft: '1px',
    '&:hover': {
      backgroundColor: 'transparent',
      borderRadius: '0px',
      border: '0px',
    },
    '&:focus': {
      backgroundColor: 'transparent',
      borderRadius: '0px',
      border: '0px',
      outline: '0px',
      visibility: 'hidden',
    },
  },
  checkboxTick: {
    padding: '10px',
    margin: theme.spacing(0.2),
  },
}));

// Inspired by blueprintjs
export default function StyledCheckbox(props: any) {
  const classes = useStyles();

  return (
    <Box className={classes.radioContainer}>
      <Box className={classes.shadeBox} {...props}>
        {props?.checked ? (
          <img
            src={Utils.images.CHECKBOX_TICK}
            className={classes.checkboxTick}
          />
        ) : null}
      </Box>
      {/* </Button> */}
    </Box>
  );
}
