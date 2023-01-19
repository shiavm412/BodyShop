import React, { Fragment, useEffect } from "react";
import {
  Theme,
  FormControl,
  FormLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { 
  makeStyles } from "@mui/styles";
import { Field, ErrorMessage } from "formik";
import _ from "lodash";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import Image from "next/image";
import Utils from "../../utils";
// import { SHOW, HIDE } from "utils/constantImages";

const styles = makeStyles((theme: Theme) =>({
    inputformControl: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "6px",
    },
    inputContainer: {
      width: "100%",
      borderRadius: 2,
      border: "1px solid var(--border-color)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // "&:focus":{
      //     border: "1px solid var(--border-color)",
      //     width: "100%",
      // }
    },
    disabled: {
      backgroundColor: "var(--backgroun-color)",
      '& > input:disabled': {
        backgroundColor: "inherit"
      }

    },
    prefixContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    postfixContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      flexDirection: "row-reverse",
    },
    formLabel: {
      fontSize: "14px",
      lineHeight: 1.5,
      color: "var(--secondary-black)",
      height: theme.spacing(2),
      fontWeight: 500,
      [theme.breakpoints.down("xs")]: {
        font: "normal 13px Work Sans Medium",
        letterSpacing:"0.5px",
      }
    },
    

    showPassword: {
      cursor: "pointer",
      fontWeight: 600,
    },
    textField: {
      // marginBottom: 10,
      padding: 13,
      height: "4em",
      width: "100%",
      border: 0,
      // borderRadius: 2,
      // border: "1px solid var(--border-color)",
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )} Work Sans`,
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(
          1.5
        )} Work Sans Medium`,
      }
    },
    errorMessage: {
      color: theme.palette.error.main,
      fontSize: 11,
      fontFamily: "Work Sans Medium",
      fontWeight: 400,
      lineHeight: 1.66,
    },
    toggleContainer: {
      position: "absolute",
      cursor: "pointer",
      right: "2%",
      top: "27%",
      background: "white",
      padding: theme.spacing(0, 0.4)
    },
    errorContainer: {
      marginTop: "3px",
      height: "auto",
      alignSelf: "flex-start",
      textAlign: "left",
    },
    radioContainer: {
      display: "flex",
      alignItems: "center",
      border: "none",
      width: "100%",
    },

    radio: {
      height: "20px",
      width: "20px",
      color: "var(--main-opacity) !important ",
      background: "var(--main-opacity) !important ",
    },
    radioLabel: {
      marginLeft: "20px",
    },
    mobile: {
      [theme.breakpoints.down("xs")]: {
        background: "#f2f2f2"
      }
    }
  })
);
interface Props {
  label?: string;
  placeHolder: string;
  id: string;
  name: string;
  type: string;
  touched: object;
  errors: any;
  value?: string | boolean |number;
  maxLength?: number;
  isRequired?: boolean;
  isDisabled?: boolean;
  isTouch?: boolean;
  Verify?: React.ReactNode;
  onChange?: Function;
  inputWidth?: any;
  alwaysShowLabel?: boolean;
  prefixContent?: any;
  actAs?: string;
  setFieldTouched?: Function;
  onFocus?: Function;
  pattern?: any;
  postfixContent?: any;
  validateField?: Function;
  onBlur?: Function;
  mobile?: boolean
  validate?:Function
}

export default function InputField({
  label,
  placeHolder,
  id,
  name,
  type,
  touched = {},
  errors = {},
  value,
  maxLength,
  isRequired = false,
  isDisabled = false,
  isTouch,
  Verify,
  inputWidth,
  onChange = () => { },
  alwaysShowLabel,
  prefixContent,
  actAs,
  setFieldTouched,
  onFocus,
  pattern,
  postfixContent,
  validateField,
  onBlur,
  mobile
}: Props) {
  const classes = styles();
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (name === "pincode" && _.has(errors, "pincode") && errors?.pincode) {
      dispatch({ type: "show-alert", payload: { type: "error", message: errors?.pincode } })
    } else if (name === "pincode") {
      dispatch({ type: "hide-alert", payload: { type: "error", message: "" } })

    }
  }, [errors?.pincode, _.has(errors, "pincode"), value]);

  return (
    <FormGroup>
      {type !== "radio" && (
        <Fragment>
          {alwaysShowLabel ? (
            <FormLabel className={classes.formLabel}>
              {label ? label : ""}
              {label && isRequired ? (
                <Typography component="span" color="error">
                  *
                </Typography>
              ) : null}
            </FormLabel>
          ) : (
            <FormLabel className={classes.formLabel}>
              {value && label ? label : ""}
              {value && label && isRequired ? (
                <Typography component="span" color="error">
                  *
                </Typography>
              ) : null}
            </FormLabel>
          )}
        </Fragment>
      )}

      <FormControl className={classes.inputformControl} component="fieldset">
        {type !== "radio" ? (
          <div className={clsx({ [classes.inputContainer]: true, [classes.disabled]: isDisabled }, mobile ? classes.mobile : "")}>
            {prefixContent ?? ""}
            <Field
              required={isRequired}
              as={actAs || "input"}
              className={clsx(classes.textField, inputWidth ? inputWidth : {})}
              name={name}
              type={showPassword ? "text" : type}
              id={id}
              value={value}
              placeholder={placeHolder}
              maxLength={maxLength}
              disabled={isDisabled}
              onClick={isTouch}
              onKeyUp={(e: any) => {
                onChange(e);
                if (setFieldTouched) setFieldTouched(name, true);
              }}
              onFocus={() => {
                if (onFocus) onFocus();
              }}
              onBlur={(e: any) => {
                if (onBlur)
                  onBlur(e)
              }}
              validateField={validateField}
            />
            {postfixContent ?? ""}
            {type === "password" && value ? (
              <div className={classes.toggleContainer}>
               <Box sx={{ display: { xs: "block", sm: "none" } }}>
                  <Typography
                    className={classes.showPassword}
                    variant="subtitle2"
                    color="primary"
                    onClick={togglePassword}
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </Typography>
                </Box>
               <Box sx={{ display: { xs: "block", sm: "none" } }}>
                  {showPassword ? (
                    <Image
                      src={Utils.images.SHOW}
                      alt="hideIcon"
                      onClick={togglePassword}
                      height={30}
                      width={30}
                    />
                  ) : (
                    <Image
                      src={Utils.images.HIDE}
                      alt="hideIcon"
                      onClick={togglePassword}
                      height={30}
                      width={30}

                    />
                  )}
                </Box>
              </div>
            ) : null}
            {Verify && <div className={classes.toggleContainer}>{Verify}</div>}
          </div>
        ) : (
          <div className={classes.radioContainer}>
            {/* {prefixContent && prefixContent} */}
            <Field
              pattern={pattern}
              touched={touched}
              className={classes.radio}
              name={name}
              type={type}
              id={id}
              value={id}
              checked={value === id}
              disabled={isDisabled}
              onChange={(e: any) => {
                onChange(e);
                if (setFieldTouched) setFieldTouched(name, true);
              }}
              onFocus={() => {
                if (onFocus) onFocus();
              }}
            />
            <span className={clsx(classes.formLabel, classes.radioLabel)}>
              {label}
            </span>
          </div>
        )}
        <div className={classes.errorContainer}>
          {`${_.has(errors, "name") && _.has(touched, "name")}` && name !== "pincode" ? (
            <ErrorMessage
              name={name}
              component="div"
              className={classes.errorMessage}
            />
          ) : ""
          }
        </div>
      </FormControl>
    </FormGroup >
  );
}
