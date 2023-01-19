import {
  Modal,
  Fade,
  Backdrop,
  Typography,
  CircularProgress,
  Theme,
} from '@mui/material';
import * as Yup from 'yup';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { productReviewed } from '../../../utils/event/action';
import { getReviewQuestions, submitReview } from './action';
import FormField from './formField';

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(5px)',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    padding: theme.spacing(2, 2, 2, 2),
    display: 'block',
    alignItems: 'center',
    borderRadius: '3px',
    width: '80%',
    height: '95%',
    overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      borderRadius: '12px',
    },
  },
  innerContainer: {
    display: 'flex',
    width: '100%',
    padding: theme.spacing(1, 0, 0, 0),
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Work Sans`,
    lineHeight: '29px',
    marginBottom: theme.spacing(0.5),
    color: 'var(--secondary-black)',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  divider: {
    border: '1px solid var(--text-color)',
    margin: theme.spacing(1, 0),
  },
  btnWidth: {
    width: theme.spacing(19),
    marginRight: theme.spacing(1),
  },
  loader: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

interface Props {
  open: boolean;
  handleClose: () => void;
  product: any;
  callback?: Function;
}
declare global {
  interface Window {
    IGLOO?: any;
  }
}

const RatingModal = (props: Props) => {
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const [ratingData, setRatingData] = useState<any>();
  const [schema, setSchema] = useState<any>({});
  const [initialValues] = useState<any>({});
  const [blackBoxString, setBlackBoxString] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    let timeoutId: any;
    let blackBoxString: any = '';

    function useBlackboxString(_intervalCount: any) {
      if (typeof window.IGLOO?.getBlackbox !== 'function') {
        return;
      }
      var bbData = window.IGLOO?.getBlackbox();
      if (bbData.finished) {
        clearTimeout(timeoutId);
        blackBoxString = bbData.blackbox;
        setBlackBoxString(bbData.blackbox);
        //  blackBoxString = encodeURIComponent(blackBoxString);
        dispatch(
          getReviewQuestions({ fp: blackBoxString, sku: sku }, (resp: any) => {
            setRatingData(resp);
            formValidationSchema(resp);
            // setLoader(false);
          })
        );
      }
    }
    // setLoader(true);
    timeoutId = setInterval(useBlackboxString, 500);
  }, []);

  let { sku, name } = props.product;

  const formValidationSchema = (resp: any) => {
    let obj: any = {};
    resp?.forEach((data: any) => {
      const content = data.data?.[0]?.content;
      if (content.Required && content.MinLength && content.MaxLength)
        obj[data.key] = Yup.string()
          .required('Please enter ' + content.Label)
          .min(
            content.MinLength,
            'Please enter minimum of ' + content.MinLength
          )
          .max(
            content.MaxLength,
            'Please enter maximum of ' + content.MaxLength
          );
      else if (content.Required && content.MinLength)
        obj[data.key] = Yup.string()
          .required('Please enter ' + content.Label)
          .min(
            content.MinLength,
            'Please enter minimum of ' + content.MinLength
          );
      else if (content.Required && content.MaxLength)
        obj[data.key] = Yup.string()
          .required('Please enter ' + content.Label)
          .max(
            content.MaxLength,
            'Please enter maximum of ' + content.MaxLength
          );
      else if (content.Required && content.Type == 'CheckboxInput')
        obj[data.key] = Yup.boolean().oneOf(
          [true],
          'Please select ' + content.Label
        );
    });
    setSchema(obj);
  };

  const onSubmit = (values: any) => {
    for (let key in values?.contextQuestions) {
      if (values?.contextQuestions[key] === 'Select') {
        delete values?.contextQuestions[key];
      }
    }
    // dispatch(showLoader());
    submitReview({ ...values, sku: sku, fp: blackBoxString })
      .then((resp) => {
        if (resp) {
          let data = JSON.parse(resp?.config?.data);

          let eventData = {
            UserId: `${localStorage.getItem('userId')}`,
            ProductId: `${sku}`,
            ProductName: `${name}`,
            CreatedAt: `${Date()}`,
            OverAllrating: `${data?.totalRating}`,
            RatingTitle: `${data?.title}`,
            ...data?.ratingQuestions,
            NickName: `${data?.userNickName}`,
            RatingComment: `${data?.reviewText}`,
            Platform: `WEB`,
            PerformanceRating: `${data?.ratingQuestions?.rating_Performance}`,
            ValueRating: `${data?.ratingQuestions?.rating_Value}`,
            QualityRating: `${data?.ratingQuestions?.rating_Quality}`,
          };

          productReviewed(eventData);

          dispatch({
            type: 'show-alert',
            payload: {
              type: 'success',
              message: resp?.data?.message,
            },
          });
          if (props?.callback) props.callback();
        }
        // dispatch(hideLoader())

        props.handleClose();
      })
      .catch((err) => {
        // dispatch(hideLoader())

        dispatch({
          type: 'show-alert',
          payload: {
            type: 'error',
            message: err?.response?.data?.message,
          },
        });
      });
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            {loader ? (
              <div className={classes.loader}>
                <CircularProgress color="inherit" />
              </div>
            ) : ratingData &&
              Array.isArray(ratingData) &&
              ratingData?.length > 0 ? (
              <div>
                <div className={classes.innerContainer}>
                  <Typography variant="h4" className={classes.heading}>
                    Ratings and Review
                  </Typography>
                </div>
                <div>
                  <FormField
                    initialValues={initialValues}
                    schema={schema}
                    open={props.open}
                    handleClose={props.handleClose}
                    ratingData={ratingData}
                    onSubmit={onSubmit}
                  />
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default RatingModal;
