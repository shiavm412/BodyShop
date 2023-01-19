import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import clsx from 'clsx';
import GreenRadio from '../../../common/customRadio';
// import GreenRadio from "../../components/common/customRadio";

// const GreenRadio = withStyles({
//     root: {
//         color: "var(--main-opacity)",
//         "&$checked": {
//             color: "var(--main-opacity)",
//         },
//         height: "20px",
//         width: "20px",
//     },
//     checked: {},
// })((props: any) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
  dualBoxDiv: {
    display: 'flex',
    border: '1px solid #E2E2E2',
    borderRadius: 4,
    margin: theme.spacing(2, 0, 0),
    alignItems: 'center',
    padding: theme.spacing(2),
    justifyContent: 'start',
    cursor: 'pointer',
  },
  selectedDualBoxDiv: {
    display: 'flex',
    border: '1px solid #3d847e',
    borderRadius: 4,
    margin: theme.spacing(2, 0, 0),
    alignItems: 'center',
    padding: theme.spacing(2),
    justifyContent: 'start',
    cursor: 'pointer',
  },
  outerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    // [theme.breakpoints.down("md")]: {
    //     display: "block",
    // },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  deliveryTimeText: {
    font: `normal 500 ${theme.spacing(1.2)} Work Sans`,
    lineHeight: '14px',
    color: '#333333',
    letterSpacing: '0em',
    marginTop: '8px',
    width: '19rem',
    [theme.breakpoints.down('md')]: {
      width: '14rem',
      font: `normal ${theme.spacing(1.3)} Work Sans Regular`,
    },
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
    },
  },
  textOuterDiv: {
    padding: theme.spacing(0, 0, 0, 2),
    width: '100%',
    lineHeight: 1.5,
  },
  textDivText: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      // width: '90%'
      width: 'auto',
    },
  },
  deliveryHeading: {
    font: `normal 600 ${theme.spacing(1.6)} Work Sans`,
    lineHeight: '19px',
    color: 'var(--black300)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.6)} Work Sans SemiBold`,
    },
  },
  deliveryCost: {
    font: `normal 600 ${theme.spacing(1.6)} Work Sans`,
    color: 'var(--secondary-black)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.2)} Work Sans SemiBold`,
    },
    lineHeight: 1.5,
  },
  strike: {
    textDecoration: 'line-through',
  },
}));

const DeliveryCard: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const {
    deliveryHeading,
    deliveryCost,
    deliveryText,
    setDeliveryType,
    checked,
    value,
    flag,
    defaultChecked,
    deliveryType,
  } = props;
  return (
    <div
      key={flag}
      className={checked ? classes.selectedDualBoxDiv : classes.dualBoxDiv}
      onClick={() => {
        if (deliveryType !== value) setDeliveryType(value);
      }}
    >
      <GreenRadio
        checked={checked}
        value={value}
        defaultChecked={defaultChecked}
      />
      <div className={classes.textOuterDiv}>
        <div className={classes.textDivText}>
          <Typography className={classes.deliveryHeading}>
            {deliveryHeading}
          </Typography>
          <Typography
            className={clsx({
              [classes.deliveryCost]: true,
              [classes.strike]: props.free,
            })}
          >
            {deliveryCost}
          </Typography>
        </div>
        <Typography className={classes.deliveryTimeText}>
          {deliveryText}
        </Typography>
      </div>
    </div>
  );
};
export default DeliveryCard;
