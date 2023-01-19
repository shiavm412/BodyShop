import { Field } from 'formik';
import { FormControlLabel, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import CustomCheckbox from '../customCheckbox';

const styles = makeStyles((_theme: Theme) => ({
  errorMessage: {
    // height: 10,
    // bottom: 76
    position: 'absolute',
    top: 25,
    left: -11,
    width: '100%',
  },
  checkbox: {
    '& .Mui-checked': {
      color: 'var(--main-opacity)',
    },
    '& > *': {
      marginRight: 10,
    },
  },
}));

interface Props {
  name: string;
  id: string;
  text: string;
  checked?: boolean;
  error?: string;
  className?: string;
  onChange?: Function;
}

const FormControlCheckbox = ({
  name,
  id,
  checked = false,
  text,
  error,
}: Props) => {
  const classes = styles();

  return (
    <React.Fragment>
      <div>
        <Field
          as={(props: any) => {
            return (
              <FormControlLabel
                control={
                  <CustomCheckbox
                    checked={checked}
                    // color="primary"
                    {...props}
                  />
                }
                label={text}
                className={classes.checkbox}
              />
            );
          }}
          name={name}
          id={id}
          // onClick={handleClick}
          // checked={checked}
        />
        {error && (
          <Typography
            className={classes.errorMessage}
            component="span"
            variant="body2"
            color="error"
          >
            {error}
          </Typography>
        )}
        {/* <FormHelperText id="component-Whatsapp-text" error>{error}</FormHelperText> */}
      </div>
    </React.Fragment>
  );
};

export default FormControlCheckbox;
