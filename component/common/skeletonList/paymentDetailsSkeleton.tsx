import { makeStyles } from '@mui/styles';
import Skeleton from '@mui/material/Skeleton';
import { useEffect } from 'react';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  paymentDiv: {
    padding: theme.spacing(2.5, 0),
    marginLeft: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(0),
    },
  },
  paymentDetails: {
    backgroundColor: 'var(--white)',
    border: '1px solid var(--text-color)',
    borderRadius: 4,
    padding: theme.spacing(1.5),
  },
  subHeading: {
    marginLeft: theme.spacing(1),
  },
  skeletonLeftMargin: {
    marginLeft: theme.spacing(1),
  },
  skeleton: {
    margin: theme.spacing(2, 0),
  },
  skeletonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    // alignItems: "center",
    // padding:"15px"
  },
  skeletonContent: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    margin: '5px 0px',
    alignItems: 'center',
  },
  leftSkeletonContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: '15px',
    // width: "90px",
    // height: '120px'
  },
  rightSkeletonContainer: {
    width: '90%',
  },
}));
interface Props {
  sections?: Array<number>;
  hideOtherInfo?: boolean;
}

const PaymentDetailsSkeleton = (props: Props) => {
  const classes = useStyles();
  const { hideOtherInfo } = props;
  // const arr = sections && sections.length > 0 ? sections : Array.of(1, 2, 3);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* {arr.map(() => ( */}
      <div className={classes.skeletonContainer}>
        <div className={classes.paymentDetails}>
          <Skeleton width={90} height={20} />
          {Array.of(1, 2, 3).map((value: number) => (
            <div
              className={classes.skeletonContent}
              key={value + 'payment_details'}
            >
              <Skeleton width={90} height={20} />
              <Skeleton
                width={value === 1 ? 50 : value === 3 ? 50 : 40}
                height={20}
              />
            </div>
          ))}
          <div className={classes.skeletonContent}>
            <div>
              <Skeleton width={80} height={20} />
              <Skeleton width={110} height={10} />
            </div>
            <Skeleton width={30} height={hideOtherInfo ? 20 : 40} />
          </div>
          <div className={classes.skeletonContent}>
            <Skeleton width={90} height={20} />
            <Skeleton width={50} height={20} />
          </div>
          <div className={classes.skeletonContent}>
            <Skeleton width={90} height={25} />
            <Skeleton width={50} height={25} />
          </div>
        </div>
        {!hideOtherInfo && (
          <>
            <div className={classes.leftSkeletonContent}>
              <Skeleton width={'35px'} height={50} />
              <Skeleton
                className={classes.skeletonLeftMargin}
                width={'86%'}
                height={20}
              />
            </div>
            <Skeleton width={180} height={30} />
            <Skeleton className={classes.skeleton} width={'100%'} height={15} />
            <Skeleton className={classes.skeleton} width={'100%'} height={15} />
            <div />
            <Skeleton className={classes.skeleton} width={'100%'} height={55} />
          </>
        )}
      </div>
      {/* )) */}
      {/* } */}
    </>
  );
};
export default PaymentDetailsSkeleton;
