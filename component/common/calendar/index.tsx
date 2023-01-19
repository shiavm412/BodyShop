// import {
//   KeyboardDatePicker,
//   MuiPickersUtilsProvider,
// } from "@material-ui/pickers";
import { Theme, FormLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateFnsUtils from "@date-io/date-fns";
import { useField, useFormikContext } from 'formik';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  inputformControl: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  formLabel: {
    fontSize: '14px',
    lineHeight: 1.5,
    color: 'var(--secondary-black)',
    height: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      font: `normal 13px Work Sans Medium`,
    },
  },
  required: {
    color: '#f44336',
  },
  picker: {
    marginTop: 7,
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      border: '1px solid var(--border-color)',
    },
    '& .MuiInputBase-root ': {
      font: `normal  ${theme.spacing(1.5)} Work Sans Medium`,
      backgroundColor: '#ffffff',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
  },
  error: {
    font: `normal 400 ${theme.spacing(1.1)} Work Sans Medium`,
    color: '#f44336',
    lineHeight: 1.66,
  },
}));

const CustomCalender = ({ ...props }: any) => {
  const classes = useStyles();
  const { id } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const [openCalendar, setOpenCalendar] = useState(false);

  const isToday = (date: any) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className={classes.inputformControl}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {!props?.alwaysShowLabel ? (
          <FormLabel className={classes.formLabel}>
            {field.value && props.formLabel ? props.formLabel : ''}
            <span className={classes.required}>
              {props.isRequired ? '*' : ''}
            </span>
          </FormLabel>
        ) : (
          <FormLabel className={classes.formLabel}>
            {props.formLabel}
            <span className={classes.required}>
              {props.isRequired ? '*' : ''}
            </span>
          </FormLabel>
        )}
        <DatePicker
          views={props.views ? props.views : ['year', 'month', 'date']}
          inputVariant="outlined"
          format={props.format ?? 'dd MMMM, yyyy'}
          id="date-picker-inline"
          className={classes.picker}
          keyboardIcon={props.icon ? props.icon : null}
          {...field}
          {...props}
          maxDate={props?.maxDate ?? undefined}
          onClick={() => {
            setOpenCalendar(true);
            if (document.getElementById(id))
              document.getElementById(id)?.blur();
          }}
          open={openCalendar}
          onClose={() => setOpenCalendar(false)}
          onChange={(val: any) => {
            // setFieldValue(field.name, val);
            if (props.formLabel === 'Date') {
              const d = val;
              if (d && !isToday(val))
                setFieldValue(
                  'time',
                  new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0)
                );
              else if (d) {
                const futureDate = new Date(d.getTime() + 10 * 60000);
                setFieldValue('time', futureDate);
              }
              if (props.setError) props.setError('');
            } else if (props.formLabel === 'Card Expiry Date') {
              if (val) {
                setFieldValue(field.name, val);
              }
            } else {
              setFieldValue(field.name, val ? val?.getTime() : val);
            }
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        {/* {props?.touched && !props?.value ? <Typography className={classes.error}>Please enter card expiry date
        </Typography>:null} */}
        <FormLabel error className={classes.error}>
          {meta && meta?.touched && meta?.error}
        </FormLabel>
      </LocalizationProvider>
    </div>
  );
};

export default CustomCalender;
