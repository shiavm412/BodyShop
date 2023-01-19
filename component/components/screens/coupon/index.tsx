import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Utils from '../../../utils';

/**
 * Components
 */
import CodeForm from './codeForm';
import CodeList from './codeList';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4, 8),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 2),
    },
  },
}));

const CouponListing: React.FC<any> = () => {
  const classes = useStyles();
  const history = useRouter();
  const shoppingBagReducer: any = useSelector(
    (state: any) => state.shoppingBagReducer
  );

  useEffect(() => {
    // if (shoppingBagReducer?.coupons?.length) {
    if (
      shoppingBagReducer?.coupons?.findIndex(
        (item: any) =>
          Utils.constants.appliedCouponType.indexOf(item?.belongsTo) > -1
      ) > -1
    ) {
      history.push({ pathname: Utils.routes.SHOPPING_BAG });
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className={classes.root}>
        <CodeForm />
        <CodeList />
      </div>
    </div>
  );
};

export default CouponListing;
