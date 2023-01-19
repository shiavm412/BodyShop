/* eslint-disable @next/next/no-img-element */
import { Theme, Typography, Divider, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import clsx from 'clsx';
import GreenRadio from '../../../../../common/customRadio';
import Utils from '../../../../../utils';

const useStyles = makeStyles((theme: Theme) => ({
  radioButton: {
    transition: 'none',
    '&:hover': { backgroundColor: 'white' },
    width: '14px',
    height: '14px',
  },
  text: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.6
    )} Work Sans`,
    color: 'var(--black300)',
    lineHeight: '23px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginLeft: theme.spacing(1),
  },
  option: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.6
    )} Work Sans`,
    color: 'var(--secondary-black)',
    lineHeight: '23px',
    letterSpacing: '0.08em',
    marginLeft: theme.spacing(1),
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans SemiBold`,
    },
  },
  outerDiv: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  autoComplete: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    // paddingLeft: "10px",
  },
  inputBox: {
    '& .MuiAutocomplete-inputRoot': {
      border: '1px solid #E2E2E2 !important',
      height: '54px',
      paddingLeft: '10px',
    },
  },
  outerBox: {
    // margin: theme.spacing(2),
  },
  outerBoxContainer: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  autoCompleteOuterBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '20px 0px',
    // margin: theme.spacing(2),
  },
  divider: {
    backgroundColor: 'transparent',
    borderBottom: '1px dashed rgba(178, 178, 178, 0.5)',
    width: '100%',
    padding: '9px 0px',
  },
  secondDivider: {
    backgroundColor: 'transparent',
    borderBottom: '1px dashed rgba(178, 178, 178, 0.5)',
    width: '100%',
    padding: '9px 0px',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  root: {
    display: 'flex',
    flexBasis: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  leftDiv: {
    flexBasis: '50%',
    [theme.breakpoints.down('xs')]: {
      flexBasis: '100%',
    },
  },
  rightDiv: {
    flexBasis: '50%',
    [theme.breakpoints.down('xs')]: {
      flexBasis: '100%',
    },
  },
  outerContainer: {
    padding: theme.spacing(0, 2),
    marginLeft: '27px',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0),
      marginLeft: theme.spacing(2),
    },
    marginRight: '10px',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50px',
  },
  label: {
    paddingBottom: '16px',
    font: `normal 600 ${theme.spacing(1.6)} Work Sans`,
    color: 'var(--secondary-black)',
    lineHeight: '18px',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.2)} Work Sans Medium`,
      letterSpacing: '0.06em',
    },
  },
  noImg: {
    width: '100%',
    height: '100%',
  },
  imgContainer: {
    width: '38px',
    height: '38px',
    border: '1px solid #F2F2F2',
    borderRadius: '50px',
  },
  hide: {
    display: 'block',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  show: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
}));
function Options(props: any) {
  const classes = useStyles();
  const { banks, setProceedToPay, setPaymentMode, setBank, bankId } = props;
  const [selectedBank, setSelectedBank] = useState<any>({
    bankCode: bankId || '',
  });
  const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;

  const arrayOfBanks = banks || [];
  // for (let bank in banks) {
  //   arrayOfBanks.push({
  //     bankName: banks[bank],
  //     id: bank
  //   })
  // }
  const otherBanks = arrayOfBanks?.filter(
    (_bank: any, index: number) => index > 4
  );
  const defaultProps = {
    options: otherBanks,
    getOptionLabel: (option: {
      bankName: string;
      bankCode: string;
      webImagePath: string | null;
    }) => option.bankName,
  };

  const onChange = (item: any) => {
    if (item) {
      setProceedToPay(false);
      setSelectedBank(item);
      setPaymentMode('netbanking');
      setBank(item);
    } else {
      setProceedToPay(true);
      setSelectedBank({});
      setBank({});
    }
  };

  const checkIfBankExists = () => {
    const filteredBank = otherBanks.find(
      (bank: any) => bank.bankCode === selectedBank.bankCode
    );
    return filteredBank ? filteredBank : null;
  };

  return (
    <div>
      <div className={classes.outerContainer}>
        <Grid container spacing={2} className={classes.root}>
          {arrayOfBanks.map((bankItem: any, index: number) => {
            if (index <= 4) {
              return (
                <>
                  <Grid item md={6} className={classes.outerBox}>
                    <div
                      className={classes.outerBoxContainer}
                      onClick={() => onChange(bankItem)}
                    >
                      <div className={classes.outerDiv}>
                        <GreenRadio
                          className={classes.radioButton}
                          checked={selectedBank.bankCode === bankItem.bankCode}
                          // onChange={() => onChange(bankItem)}
                          value={bankItem.bankCode}
                          name="radio-button-demo"
                          inputProps={{ 'aria-label': 'C' }}
                        />
                        <Typography
                          className={classes.option}
                          // onClick={() => onChange(bankItem)}
                        >
                          {bankItem.bankName}
                        </Typography>
                      </div>
                      {
                        <div className={classes.imgContainer}>
                          <img
                            src={
                              bankItem?.webImagePath
                                ? Utils.images.IMAGE_URL + bankItem.webImagePath
                                : Utils.images.PRODUCT_PLACEHOLDER_2
                            }
                            className={
                              bankItem?.webImagePath
                                ? classes.img
                                : classes.noImg
                            }
                            alt={bankItem.bankName}
                          />
                        </div>
                      }
                    </div>
                  </Grid>
                  {(index === 1 || index === 3) && (
                    <Grid
                      container
                      className={clsx(classes.root, classes.hide)}
                    >
                      <Divider className={classes.divider} />
                    </Grid>
                  )}
                  {index !== 4 ? (
                    <Grid
                      container
                      className={clsx(classes.root, classes.show)}
                    >
                      <Divider className={classes.secondDivider} />
                    </Grid>
                  ) : null}
                </>
              );
            }
          })}
        </Grid>
        <Divider className={classes.divider} />

        <Grid item md={6} className={classes.autoCompleteOuterBox}>
          <Typography className={classes.label}>Other Banks</Typography>
          <Autocomplete
            className={classes.autoComplete}
            {...defaultProps}
            id="combo-box-demo"
            onChange={(_event: any, newValue: any) => onChange(newValue)}
            value={checkIfBankExists()}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search Bank Here"
                className={classes.inputBox}
                label=""
                variant="standard"
              />
            )}
          />
        </Grid>
      </div>
    </div>
  );
}

export default Options;
