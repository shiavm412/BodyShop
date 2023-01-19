import { Typography, Theme } from '@mui/material';
import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Skeleton from '@mui/material/Skeleton';
import { useSelector } from 'react-redux';
import RecommendationCarousel from '../../../common/recommendationCarousel';

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.4
    )} Recoleta Alt`,

    lineHeight: '33px',

    letterSpacing: '0.02em',

    color: 'var(--green-color)',
    marginTop: '25px',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(0.5),
      font: 'normal 16px Recoleta Alt Bold',
      color: 'black',
      letterSpacing: '0.05em',
    },
  },
  recommendedouterDiv: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: '12px',
    },
  },
  divider: {
    border: '0.5px solid var(--text-color)',
  },
}));

const Recommended = () => {
  const classes = useStyles();
  const skeletonLoader = useSelector((state: any) => {
    return state.loadingReducer.skeletonLoader;
  });
  const recommendedData =
    useSelector(
      (state: any) => state.recommendReducer?.recommendedData?.data
    ) || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      {skeletonLoader ? (
        <Skeleton height={30} width={150} className={classes.heading} />
      ) : recommendedData?.length > 0 ? (
        <Typography className={classes.heading}>Recommended For You</Typography>
      ) : null}
      <div className={classes.recommendedouterDiv}>
        <RecommendationCarousel type="mybag" />
      </div>
      {/* <Divider light className={classes.divider} /> */}
    </React.Fragment>
  );
};

export default Recommended;
