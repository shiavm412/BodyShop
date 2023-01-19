import { Theme, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { validateCoupon } from './action';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { screenViewed } from '../../../utils/event/action';
import events from '../../../utils/event/constant';
import InputField from '../../../common/inputField';
import CustomButton from '../../../common/button';

const useStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    background: 'var(--medium-creame-color)',
    border: '1px solid var(--text-color)',
    boxSizing: 'border-box',
    borderRadius: '4px',
    padding: theme.spacing(0, 2, 2, 2),
  },

  title: {
    font: 'normal 600 16px Work Sans',
    color: 'var(--secondary-black)',
    marginTop: '18px',
  },
  inputWidth: {
    width: '100%',
    height: '50px',
    [theme.breakpoints.down('xs')]: {
      '& .MuiGrid-spacing-xs-2 > .MuiGrid-item': {
        padding: theme.spacing(0),
      },
    },
  },

  btn: {
    marginTop: theme.spacing(1.2),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(0),
      '& .MuiButton-root': {
        marginTop: theme.spacing(0),
      },
    },
  },

  gridContainer: {
    marginTop: '10px',
  },
}));

function CodeForm() {
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const history = useRouter();

  const cart = useSelector((state: any) => {
    return state.shoppingBagReducer;
  });

  const initialValues = {
    couponCode: '',
  };
  const codeSchema = Yup.object().shape({
    couponCode: Yup.string().required('Please enter code number'),
  });
  useEffect(() => {
    screenViewed({
      ScreenName: events.SCREEN_COUPON,
      CTGenerated: 'WEB',
    });
  }, []);

  return (
    <div className={classes.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={codeSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(
            validateCoupon(
              {
                ...values,
                cartId: cart._id,
              },
              () => {
                history.push('/shopping-bag');
              }
            )
          );
        }}
      >
        {({ values, errors, touched }) => {
          return (
            <Form autoComplete="off">
              <Grid container className={classes.gridContainer} spacing={1}>
                <Grid item xs={12} md={10}>
                  <InputField
                    alwaysShowLabel={true}
                    inputWidth={classes.inputWidth}
                    label={'Enter Coupon Code'}
                    placeHolder={'Enter Coupon Code here'}
                    id="couponCode"
                    name="couponCode"
                    type="text"
                    touched={touched}
                    errors={errors}
                    value={values.couponCode}
                    isRequired={false}
                  />
                </Grid>
                <Grid item xs={12} md={2} className={classes.btn}>
                  <CustomButton
                    fullWidth
                    text={'apply'}
                    type={'submit'}
                    variant="contained"
                    disabled={errors?.couponCode ? true : false}
                  />
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
export default CodeForm;
