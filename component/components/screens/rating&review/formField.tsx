/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
import {
  Grid,
  Theme,
  Typography,
  FormControl,
  Divider,
  FormLabel,
  FormControlLabel,
  MenuItem,
  Select,
  Rating,
  styled,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
// import Utils from "../../utils";
import { Formik, Form, Field } from 'formik';
import Reviews from './reviews';
// import CustomButton from "../../components/common/button";
import SuccessModal from './successModal';
// import GreenRadio from "../../components/common/customRadio";
// import FormControlCheckbox from "../../components/common/checkbox";
// import CustomRadioGroup from "../../components/common/radioGroup";
import clsx from 'clsx';
import { uploadPhoto } from './action';
import * as Yup from 'yup';
// import { hideLoader, showLoader } from "../home/actions";
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import GreenRadio from '../../../common/customRadio';
import CustomRadioGroup from '../../../common/radioGroup';
import Utils from '../../../utils';
import CustomButton from '../../../common/button';
import FormControlCheckbox from '../../../common/checkbox';
// import { Add_More } from "utils/constantImages";

const useStyles = makeStyles((theme: Theme) => ({
  writeDiv: {},
  formLabel: {
    display: 'flex',
    fontSize: '14px',
    lineHeight: 1.5,
    color: 'var(--secondary-black)',
    height: theme.spacing(2),
    fontWeight: 500,
    alignItems: 'baseline',
    '& .MuiTypography-subtitle2': {
      // fontSize: "14px",
      // marginLeft: 5,
      // color: "#c2c2c2",
      // fontFamily: "Druk",
      // letterSpacing: "1px",
      color: 'var(--light-gray-text)',
      fontSize: '12px',
      fontFamily: ' Work Sans Medium',
      marginLeft: '5px',
      letterSpacing: '0.02px',
      [theme.breakpoints.down('xs')]: {
        font: `normal  ${theme.spacing(1)} Work Sans Medium`,
      },
    },
    [theme.breakpoints.down('xs')]: {
      font: `normal  ${theme.spacing(1.3)} Work Sans Medium !important`,
    },
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '16px',
    marginBottom: theme.spacing(0.5),
    color: 'var(--secondary-black)',
    [theme.breakpoints.down('xs')]: {
      font: `normal  ${theme.spacing(1.4)} Work Sans SemiBold`,
    },
  },
  reviewHeading: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.5
    )} Work Sans`,
    lineHeight: '24px',
    margin: theme.spacing(1.5, 0),
    color: 'var(--secondary-black)',
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, 0),
      font: `normal ${theme.spacing(1.4)} Work Sans SemiBold`,
    },
  },

  outsideBox: {
    display: 'flex',
    marginTop: theme.spacing(1),
    flexWrap: 'wrap',
  },
  title: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.3
    )} Work Sans`,
    lineHeight: '15px',
    color: 'var(--secondary-black)',
    opacity: '0.9',
    letterSpacing: '0.02em',
    margin: theme.spacing(2, 0, 1, 0),
    [theme.breakpoints.down('xs')]: {
      color: 'black',
      font: `normal  ${theme.spacing(1.3)} Work Sans Medium !important`,
    },
  },
  inputBox: {
    background: '#E3F2F1',
    border: '1px solid #40857E',
    borderRadius: '2px',
    height: theme.spacing(8),
    width: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputWidth: {
    width: '100%',
    height: '54px',
  },
  textArea: {
    width: '100%',
    height: '160px',
    border: 'none',
  },

  img: {
    width: '25px',
    height: '25px',
  },
  radioButton: {
    transition: 'none',
    margin: 0,
    '& > * ': {
      margin: theme.spacing(0, 0.5),
    },
    '&:hover': { backgroundColor: 'white' },
    width: '14px',
    height: '14px',
  },
  optionTitle: {
    font: `normal  ${theme.spacing(1.4)} Work Sans`,
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '-0.02em',
    color: 'var(--secondary-black)',
    margin: theme.spacing(0, 1),
  },
  parentDiv: {
    // height: theme.spacing(18),
    // width: theme.spacing(17.8),
    margin: theme.spacing(0, 1),
    position: 'relative',
  },
  deleteImg: {
    position: 'absolute',
    top: '2px',
    left: '47px',
    cursor: 'pointer',
    height: '30px',
  },
  option: {
    display: 'flex',
    margin: theme.spacing(1.4, 0),
    '& .MuiFormGroup-root': {
      flexDirection: 'row',
      padding: theme.spacing(1),
    },
  },
  selectBox: {
    height: '54px',
    background: '#FAFAFA',
    border: '1px solid #F2F2F2',
    borderRadius: '2px',

    '&:before': {
      borderBottom: 'none !important',
    },
    '& .MuiSelect-select.MuiSelect-select': {
      paddingLeft: theme.spacing(1),
    },
    '& .MuiSelect-select': {
      background: '#FAFAFA !important',
    },
    [theme.breakpoints.down('xs')]: {
      font: `normal  ${theme.spacing(1.5)} Work Sans Medium`,
      color: 'grey',
    },
  },
  rating: {
    color: 'var(--main-opacity)',
    '& .MuiRating-icon': {
      margin: theme.spacing(1.5, 1, 1.5, 0),
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(0.5, 1, 0.5, 0),
      },
    },
  },
  imgBox: {
    margin: theme.spacing(1.2, 0),
  },
  uploadedImg: {
    height: theme.spacing(8),
    width: theme.spacing(8),
    objectFit: 'cover',
    // padding: theme.spacing(1),
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
  textWrapper: {
    margin: theme.spacing(1, 0, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    // marginTop: '6px',
    '& > *': {
      margin: theme.spacing(0.5, 0),
    },
  },
  firstField: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1.4, 0),
  },
  firstTitle: {
    margin: theme.spacing(1, 0, 1, 1),
  },
  error: {
    color: '#f44336',
    fontSize: '15px',
    fontFamily: 'Work Sans',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  linkTag: {
    font: `normal  ${theme.spacing(1.3)} Work Sans`,
    fontWeight: 600,
    lineHeight: '15px',
    margin: theme.spacing(0, -0.5),
    color: 'var(--primary) !important',
    textDecoration: 'underline',
    marginRight: theme.spacing(0.5),
    [theme.breakpoints.down('xs')]: {
      font: `normal  ${theme.spacing(1.4)} Work Sans SemiBold`,
    },
  },
  // formLink: {
  //   "& .MuiTypography-root": {
  //     [theme.breakpoints.down("xs")]: {
  //       font: `normal  ${theme.spacing(1.4)} Work Sans SemiBold`,
  //     }
  //   }
  // },
  formDiv: {
    display: 'flex',
    placeItems: 'center',
  },
  formCheckbox: {
    display: 'flex',
    marginBottom: 10,
    '& .MuiTypography-body1': {
      font: `normal  ${theme.spacing(1.3)} Work Sans`,
      fontWeight: 500,
      lineHeight: '15px',
      color: 'var(--secondary-black)',
      [theme.breakpoints.down('xs')]: {
        font: `normal  ${theme.spacing(1.4)} Work Sans SemiBold`,
      },
    },

    '& .MuiFormControlLabel-root': {
      margin: 0,
    },
  },
  textField: {
    // marginBottom: 10,
    padding: 13,
    height: '4em',
    width: '100%',
    borderRadius: 2,
    border: '1px solid var(--border-color)',
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )} Work Sans`,
    [theme.breakpoints.down('xs')]: {
      font: `normal  ${theme.spacing(1.5)} Work Sans Medium`,
    },
  },
  optionField: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexBasis: '50%',
    '& .MuiTypography-body1': {
      marginLeft: theme.spacing(1),
    },
  },
  heading2: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.5,
    [theme.breakpoints.down('xs')]: {
      font: `normal  ${theme.spacing(1.3)} Work Sans SemiBold`,
    },
  },
  areaTextField: {
    height: '6em !important',
  },
  cursor: {
    cursor: 'pointer',
  },
  clickArea: {
    width: ' 100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    height: '100%',
  },
  menuItem: {
    [theme.breakpoints.down('xs')]: {
      font: `normal  ${theme.spacing(1.5)} Work Sans Medium`,
    },
  },
  labelRadio: {
    '& .MuiTypography-root': {
      [theme.breakpoints.down('xs')]: {
        font: `normal  ${theme.spacing(1.5)} Work Sans Regular !important`,
      },
    },
  },
  btn: {
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans Medium !important`,
    },
  },
}));

const Input = styled('input')({
  display: 'none',
});

type RatingQuestionType = {
  section:
    | 'TextAreaInput'
    | 'BooleanInput'
    | 'TextInput'
    | 'SelectInput'
    | 'CheckboxInput';
  data: any;
  formData?: any;
};

const getFormField = ({ section, data, formData }: RatingQuestionType) => {
  switch (section) {
    // individual questions
    case 'TextAreaInput':
      return (
        <FormInputField section={section} data={data} formData={formData} />
      );
    case 'TextInput':
      return (
        <FormInputField section={section} data={data} formData={formData} />
      );
    case 'SelectInput':
      let item = data;
      return (
        <>
          {item.data.map((question: any, _key: any) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <FormSelectField
                section={section}
                data={question}
                formData={formData}
                formKey={item.key}
              />
            );
          })}
        </>
      );
    case 'BooleanInput':
      return <FormRadio data={data} formData={formData} />;
  }
};

const FormInputField = ({ section, data, formData }: any) => {
  const classes = useStyles();
  let input = data?.data?.[0]?.content;
  // const validate = (value: any) => {
  //   let error;
  //   if (input?.Required && formData?.touched?.[data?.key]) {
  //     error = data?.data?.[0]?.content?.Label ? `Please enter ${data.data?.[0]?.content?.Label}` : 'Required';
  //   } else if (input?.MaxLength < value?.length) {
  //     error = `Max ${input?.MaxLength} characters allowed`;
  //   } else if (input?.MinLength >= value?.length) {
  //     error = `Min ${input?.MinLength} characters required`;
  //   }
  //   return error;
  // };

  return (
    <Grid item xs={12} md={6}>
      <div className={classes.textWrapper}>
        <FormLabel className={classes.formLabel}>
          {input?.Label}
          {input?.Label && input?.Required ? (
            <>
              <Typography component="span" color="error">
                *
              </Typography>
            </>
          ) : null}
          {input.MinLength ? (
            <Typography variant="subtitle2">
              Minimum {input.MinLength} characters
            </Typography>
          ) : null}
        </FormLabel>
        <Field
          // validate={validate}
          inputWidth={classes.inputWidth}
          label={input?.Label}
          placeHolder={input?.Label}
          id={input?.Id}
          name={data?.key}
          className={clsx({
            [classes.textField]: true,
            [classes.areaTextField]: section === 'TextAreaInput',
          })}
          as={section === 'TextAreaInput' ? 'textarea' : ''}
          {...formData}
        />
        {formData.errors[data?.key] && (
          <Typography component="span" color="error">
            {formData.errors[data?.key]}
          </Typography>
        )}
      </div>
    </Grid>
  );
};

const FormSelectField = ({ data, formData, formKey }: any) => {
  const classes = useStyles();
  let input = data?.content;
  return (
    <Grid item xs={12} md={6} key={data.key}>
      <Typography variant="h6" className={classes.title}>
        {data?.content?.Label}
      </Typography>
      <FormControl fullWidth>
        <Select
          label={input?.Label}
          placeHolder={input?.Label}
          id={input?.Id}
          name={`${formKey}.${data?.key}`}
          className={classes.selectBox}
          as={'select'}
          labelId={input?.Id}
          value={formData?.values?.[`${formKey}`]?.[`${data?.key}`] ?? 'Select'}
          onChange={(e: any) =>
            formData?.setFieldValue(`${formKey}.${data?.key}`, e.target.value)
          }
          {...formData}
        >
          {input?.Options?.map((value: any, key: any) => (
            <MenuItem
              className={classes.menuItem}
              value={value?.Value !== '' ? value?.Value : 'Select'}
              key={key}
            >
              {value?.Label !== '' ? value?.Label : 'Select'}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

const FormRadio = ({ data, formData }: any) => {
  let input = data?.data?.[0]?.content;
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      {/* <Typography variant="h6" className={classes.heading}>
        {input?.Label}
      </Typography> */}
      <div className={classes.option}>
        <CustomRadioGroup
          data={[
            { title: 'Yes', value: 'true' },
            { title: 'No', value: 'false' },
          ].map((item: any, index: any) => {
            return (
              <div className={classes.optionField} key={index}>
                <FormControlLabel
                  value={item.value}
                  control={
                    <GreenRadio
                      checked={formData?.values?.[data?.key] === item?.value}
                    />
                  }
                  label={item.title}
                  className={classes.labelRadio}
                />
              </div>
            );
          })}
          label={input?.Label}
          value={data?.key}
          onSelect={(event: any) => {
            formData?.setFieldValue(data?.key, event.target.value);
          }}
        />
      </div>
    </Grid>
  );
};

interface Props {
  open: boolean;
  handleClose: () => void;
  ratingData: any;
  onSubmit: Function;
  schema: any;
  initialValues: any;
}

function FormField(props: Props) {
  const classes = useStyles();

  // const [recommend, setRecommend] = useState("Yes");
  // const [age, setAge] = useState("Select");
  // const [skin, setSkin] = useState("Select");
  // const [time, setTime] = useState("Select");
  // const [product, setProduct] = useState("Select");
  // const [performance, setPerformance] = useState(0);
  // const [value, setValue] = useState(4);
  // const [quality, setQuality] = useState(4);
  const [rating, setRating] = useState(0);
  const [submitBtn, setSubmitBtn] = useState(true);
  const [ratingError, setRatingError] = useState(false);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<any>([]);

  const imageHandler = (e: any, formKey: any, formData: any) => {
    if (e.target.files) {
      var formPayload: any = new FormData();
      formPayload.append('file', e.target.files[0]);
      // dispatch(showLoader());
      uploadPhoto(formPayload)
        .then((resp: any) => {
          formData.setFieldValue(
            `${formKey}.${selectedImage.length}`,
            resp?.data?.data?.photo?.normal
          );
          setSelectedImage((prevImage: any) =>
            prevImage.concat([
              {
                thumbnail: resp?.data?.data?.photo?.thumbnail,
                normal: resp?.data?.data?.photo?.normal,
                key: `${formKey}`,
              },
            ])
          );
          // dispatch(hideLoader());
        })
        .catch((_err: any) => {
          // dispatch(hideLoader());
        });
    }
  };

  const deleteImage = (photo: any, formData: any) => {
    const images = selectedImage;
    const filteredImages = images.filter(
      (image: any) => photo.thumbnail !== image.thumbnail
    );
    setSelectedImage(filteredImages);
    const arr: any = [];
    filteredImages.forEach((image: any) => {
      arr.push(image?.normal);
    });
    if (filteredImages?.length > 0)
      formData.setFieldValue(selectedImage[0].key, arr);
  };

  const renderPhotos = (source: any, formData: any) => {
    return source.map((photo: any) => {
      return (
        <div className={classes.parentDiv} key={photo?.url}>
          <img
            src={photo?.thumbnail || ''}
            className={classes.uploadedImg}
            key={photo?.thumbnail || ''}
            alt="img"
          />

          <img
            onClick={() => deleteImage(photo, formData)}
            src={Utils.images.DELETE_ICON}
            alt="deleteImg"
            className={classes.deleteImg}
          />
        </div>
      );
    });
  };
  const [state, setState] = useState({
    successModal: false,
  });

  let ratingData = props?.ratingData;

  const handleSuccessModalClose = () => {
    setState({ ...state, successModal: false });
  };

  const reviewSchema = Yup.object().shape(props.schema);

  // const formInitialValues = (resp: any) => {
  let initialValues: any = {};
  ratingData?.forEach((item: any) => {
    if (item?.data?.[0]?.content?.Type === 'TextAreaInput') {
      initialValues[item.key] = '';
    } else if (
      item?.data?.[0]?.content?.Type === 'BooleanInput' ||
      item?.data?.[0]?.content?.Type === 'CheckboxInput'
    ) {
      initialValues[item.key] = false;
    } else if (
      item?.data?.[0]?.content?.Type === 'SelectInput' ||
      item?.data?.[0]?.content?.Type === 'IntegerInput'
    ) {
      initialValues[item.key] = {};
    } else if (item?.data?.[0]?.content?.Type === 'ImageInput') {
      initialValues[item.key] = [];
    } else {
      initialValues[item.key] = '';
    }
  });
  // setInitialValues(initialValue)
  // }
  // formInitialValues(ratingData)

  return (
    <>
      <div className={classes.writeDiv}>
        <Formik
          initialValues={initialValues}
          validationSchema={reviewSchema}
          // validateOnSubmit
          validateOnChange
          onSubmit={(values: any, { setSubmitting }: any) => {
            setSubmitting(true);
            // const arr: any = []
            // selectedImage.forEach((image: any) => {
            //   arr.push(image?.normal)
            // });
            // if (selectedImage?.length > 0)
            //   setFieldValue(
            //     selectedImage[0].key,
            //     arr)
            if (!ratingError && rating)
              props.onSubmit({ ...props.initialValues, ...values });
          }}
        >
          {(formData: {
            values: any;
            errors: any;
            touched: any;
            isSubmitting: any;
            setFieldTouched: any;
            setFieldValue: any;
            validateForm: any;
            setErrors: any;
            setSubmitting: Function;
            dirty: Boolean;
          }) => {
            if (!_.isEmpty(formData.touched))
              if (_.isEmpty(formData.errors)) setSubmitBtn(false);
            return (
              <Form>
                <Grid container spacing={3}>
                  {ratingData?.map((item: any, _index: any) => {
                    return (
                      <>
                        {item.key === 'totalRating' && (
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant={'body1'}
                              className={classes.heading}
                            >
                              Overall Ratings
                              <span className={classes.error}>*</span>
                            </Typography>
                            <Reviews
                              setRating={(value: any) => {
                                setRatingError(false);
                                setRating(value);
                                formData.setFieldValue(item.key, value);
                              }}
                            />
                            {ratingError && !rating && (
                              <div className={classes.error}>
                                Please select a Rating
                              </div>
                            )}
                          </Grid>
                        )}
                        {item.key === 'isPhotoAllowed' && (
                          <Grid item xs={12} md={6}>
                            <div className={classes.imgBox}>
                              <Typography
                                variant="body2"
                                className={classes.heading2}
                              >
                                Add Image
                              </Typography>
                              <div className={classes.outsideBox}>
                                {renderPhotos(selectedImage, formData)}
                                {selectedImage?.length < 6 && (
                                  <div className={classes.inputBox}>
                                    <label
                                      htmlFor="contained-button-file"
                                      className={classes.clickArea}
                                    >
                                      <Input
                                        // className={classes.cursor}
                                        accept="image/jpg,image/jpeg,image/png, image/gif,image/heic,image/tiff"
                                        id="contained-button-file"
                                        // multiple
                                        type="file"
                                        onChange={(e: any) =>
                                          imageHandler(e, item?.key, formData)
                                        }
                                      />
                                      <img
                                        src={Utils.images.Add_More}
                                        alt="addMore"
                                        className={clsx(classes.img)}
                                      />
                                    </label>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Grid>
                        )}
                        {item.key === 'ratingQuestions' && (
                          <Grid item xs={12} md={6}>
                            {item?.data?.map((value: any, key: any) => {
                              return (
                                <Grid item xs={12} md={12} key={key}>
                                  <Grid container>
                                    <Grid item xs={12} md={6}>
                                      <Typography
                                        variant="h6"
                                        className={classes.reviewHeading}
                                      >
                                        {value?.content?.Label}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                      <Rating
                                        name={`${item.key}.${value.key}`}
                                        value={
                                          formData?.values?.[item.key]?.[
                                            value.key
                                          ]
                                        }
                                        className={classes.rating}
                                        onChange={(
                                          _event: any,
                                          newValue: any
                                        ) => {
                                          formData?.setFieldValue(
                                            `${item.key}.${value.key}`,
                                            newValue
                                          );
                                          // setPerformance(newValue);
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              );
                            })}
                          </Grid>
                        )}
                        {item.key === 'agreedToTermsAndConditions' && (
                          <Grid item xs={12} md={6}>
                            <div
                              className={clsx(
                                classes.formCheckbox,
                                classes.formDiv
                              )}
                            >
                              <FormControlCheckbox
                                checked={formData?.values?.[item?.key] === true}
                                name={item?.key}
                                id={item?.data?.[0]?.content?.Id}
                                // text={item?.data?.[0]?.content?.Label}
                                text={`I agree to`}
                                onChange={(e: any) => {
                                  formData.setFieldValue(
                                    item?.key,
                                    e.target.checked
                                  );
                                }}
                              />
                              <a
                                href={Utils.routes.TERMS_CONDITION}
                                target="_blank"
                                className={classes.linkTag}
                              >
                                Terms and Condition
                              </a>
                              <Typography color="error" variant="body2">
                                *
                              </Typography>
                            </div>
                            {formData.errors?.[item?.key] && (
                              <Typography component="span" color="error">
                                {formData.errors?.[item?.key]}
                              </Typography>
                            )}
                          </Grid>
                        )}
                        {item.key !== 'totalRating' &&
                          item.key !== 'isPhotoAllowed' &&
                          item.key !== 'ratingQuestions' &&
                          getFormField({
                            section: item?.data?.[0]?.content?.Type,
                            data: item,
                            formData,
                          })}
                      </>
                    );
                  })}
                </Grid>
                <Divider className={classes.divider} />
                <div className={classes.buttonContainer}>
                  <div className={classes.btnWidth}>
                    <CustomButton
                      text={'Cancel'}
                      fullWidth
                      type={'button'}
                      onClick={props.handleClose}
                      variant={'outlined'}
                      className={classes.btn}
                    />
                  </div>
                  <div className={classes.btnWidth}>
                    <CustomButton
                      text={'Submit'}
                      // disabled={!_.isEmpty(formData.errors)}
                      disabled={submitBtn}
                      className={classes.btn}
                      fullWidth
                      type={'submit'}
                      variant={'contained'}
                      onClick={() => {
                        if (!rating) setRatingError(true);
                        else setRatingError(false);
                      }}
                      // onClick={() => {

                      //   formData?.validateForm().then((resp: any) => {
                      //     formData?.setErrors(resp)
                      //   }).catch((err: any) => {

                      //   })
                      // }}
                    />
                    <SuccessModal
                      open={state.successModal}
                      handleClose={handleSuccessModalClose}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default FormField;
