import { Paper, Typography, Grid, Theme, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import CustomButton from "../../components/common/button";
// import { ReducersModal } from "./../../models";

// ** components ****

// import Utils from "../../utils";
import { useSelector } from 'react-redux';
import Recommended from './recommended';
import { useRouter } from 'next/router';
import Utils from '../../../utils';
import Image from 'next/image';
import CustomButton from '../../../common/button';
// import { EMPTY, EMPTY_BAG, LYBC_5 } from "utils/constantImages";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // backgroundColor: "var(--backgroun-color)",
    [theme.breakpoints.down('xs')]: {
      width: '112%',
      marginLeft: '-20px',
    },
  },
  outerRoot: {},
  heading: {
    font: `normal  ${theme.spacing(2.8)} Recoleta`,
    lineHeight: '38px',
    fontWeight: 600,
    color: 'var(--green-color)',
    marginTop: '20px',
  },
  heading2: {
    font: `normal  ${theme.spacing(1.6)} Work Sans Medium`,
    lineHeight: '38px',
    fontWeight: 500,
    color: 'var(--secondary-color)',
    marginTop: '20px',
  },

  btn: {
    width: '25%',
    [theme.breakpoints.down('xs')]: {
      width: '60%',
      // padding:"0px 20px"
    },
  },
  paper: {
    margin: theme.spacing(7, 0),
    padding: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2, 1),
      boxShadow: 'none',
    },
  },
  innerContainer: {
    justifyContent: 'center',
    height: '35em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      height: '20em',
    },
  },
  title: {
    font: `normal  ${theme.spacing(3.6)} Work Sans`,
    lineHeight: '42px',
    fontWeight: 600,
    color: 'var(--green-color)',
    marginBottom: theme.spacing(0.5),
  },
  subTitle: {
    font: `normal  ${theme.spacing(1.6)} Work Sans`,
    lineHeight: '19px',
    fontWeight: 500,
    color: 'var(--black)',
  },

  subHeading: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )} Work Sans`,
    color: 'var(--light-gray)',
    marginLeft: theme.spacing(1),
  },
  sideBarLogo: {
    display: 'flex',
    padding: theme.spacing(2, 1),
    backgroundColor: 'var(--primary)',
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: theme.spacing(1),

      '& .MuiTypography-body2': {
        font: `normal 20px Druk`,
        color: theme.palette.secondary.main,
        letterSpacing: '2px',
      },
      '& .MuiTypography-body1': {
        font: `normal 400  12px Work Sans`,
        color: 'var(--white)',
      },
    },
  },
  logo: {
    height: '45px',
    width: '45px',
  },
  description: {
    font: `normal ${theme.spacing(1.4)} Work Sans !important`,
  },
}));
interface Props {
  message: string;
  type: string;
}
function NotFound({ message, type }: Props) {
  const classes = useStyles();
  const history = useRouter();
  const [sideBar, setSideBar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const userInfo = useSelector(
    (state: any) => state.userDetailReducer.userInfo
  );
  const configs: any = useSelector(
    (state: any) => state.configReducer.generalConfigs
  );
  const toggleDrawer = (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setSideBar(!sideBar);
  };
  const redirect = () => {
    if (userInfo?.tierType !== 1) {
      const type = userInfo.tierType === 2 ? 1 : 2;
      history.push({ pathname: `${Utils.routes.UPGRADE_MEMBERSHIP}` });
      // , {
      // state: { type, pageName: "Love Your Body Club" },}
      // });
    }
  };
  return (
    <div className={type === 'shoppingBag' ? classes.root : classes.outerRoot}>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Typography className={classes.heading}>
          Shopping Bag
          <Typography className={classes.subHeading}>(O Items)</Typography>
        </Typography>
      </Box>
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        {type === 'shoppingBag' ? (
          <>
            {userInfo?.tierType !== 1 && userInfo?.tierType !== 2 && (
              <div
                className={classes.sideBarLogo}
                onClick={(e: any) => {
                  toggleDrawer(e);
                  redirect();
                }}
              >
                <img
                  className={classes.logo}
                  src={Utils.images.LYBC_5}
                  alt="logo"
                />
                <div>
                  <Typography variant="body2">
                    {configs?.lybc_banner_title || ''}
                  </Typography>
                  <Typography className={classes.description} variant="body1">
                    {configs?.lybc_banner_description || ''}{' '}
                  </Typography>
                </div>
              </div>
            )}
          </>
        ) : (
          <Typography className={classes.heading}>
            Shopping Bag
            <Typography className={classes.subHeading}>(O Items)</Typography>
          </Typography>
        )}
      </Box>
      <Grid container>
        <Grid item xs={12}>
          <div>
            <Paper className={classes.paper}>
              <div className={classes.innerContainer}>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Image
                    src={Utils.images.EMPTY}
                    width={40}
                    height={40}
                    alt="notfoundempty"
                  />
                  {/* <EMPTY /> */}
                  <Typography
                    variant="h3"
                    align="center"
                    className={classes.heading}
                  >
                    No Items in the Cart
                  </Typography>
                </Box>
                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                  {
                    type === 'shoppingBag' ? (
                      <Image
                        src={Utils.images.EMPTY_BAG}
                        width={40}
                        height={40}
                        alt="notfoundemptybag"
                      />
                    ) : (
                      // <EMPTY_BAG />
                      <Image
                        src={Utils.images.EMPTY_BAG}
                        width={40}
                        height={40}
                        alt="notfoundempty"
                      />
                    )

                    // <EMPTY />
                  }
                  {type === 'shoppingBag' ? (
                    <Typography
                      variant="h3"
                      align="center"
                      className={classes.heading2}
                    >
                      Your bag is empty
                    </Typography>
                  ) : (
                    <Typography
                      variant="h3"
                      align="center"
                      className={classes.heading}
                    >
                      No Items in the Cart
                    </Typography>
                  )}
                </Box>

                {!message.includes('filters') &&
                  (type === 'shoppingBag' ? (
                    <>
                      <div className={classes.btn}>
                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                          <CustomButton
                            onClick={() =>
                              history.push({
                                pathname: `${Utils.routes.WISHLIST}`,
                              })
                            }
                            fullWidth
                            type={'submit'}
                            text={'Select From Wishlist'}
                            variant={'contained'}
                          />
                        </Box>
                      </div>
                      <div className={classes.btn}>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                          <CustomButton
                            onClick={() => history.push({ pathname: `/` })}
                            fullWidth
                            type={'submit'}
                            text={'Start Shopping'}
                            variant={'contained'}
                          />
                        </Box>
                      </div>
                    </>
                  ) : (
                    <div className={classes.btn}>
                      <CustomButton
                        onClick={() => history.push({ pathname: `/` })}
                        fullWidth
                        type={'submit'}
                        text={'Start Shopping'}
                        variant={'contained'}
                      />
                    </div>
                  ))}
              </div>
              {type === 'shoppingBag' && (
                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                  <Recommended />
                </Box>
              )}
            </Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default NotFound;
