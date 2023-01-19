
import { Button,  PropTypes,  Theme } from '@mui/material';
import clsx from 'clsx';
import theme from '../../../config/theme';

const makeStyles = (theme: Theme) => {
    return {
        btnProceed: {
            "&.MuiButton-root": {
                // backgroundColor: "#B0C1B7",
                borderRadius: "4px",
                font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
                    1.6
                )} Work Sans`,
                textTransform: "capitalize",
                padding: theme.spacing(1.5, 0),
                marginTop: theme.spacing(1.5),
            },
            "&.Mui-disabled": {
                backgroundColor: "var(--disabled-color)",
                color: "var(--white)"
            },
            [theme.breakpoints.down("xs")]: {
                fontSize: 14,
            },
        },

    }}

interface Props {
    type: "button" | "reset" | "submit";
    fullWidth: boolean;
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    variant?: "text" | "contained" | "outlined";
    onClick?: Function;
    disabled?: boolean;
    text: string;
    className?: string
}

const CustomButton = ({ type, color = "primary", fullWidth, variant = "contained", disabled = false, onClick = () => { }, text, className }: Props) => {
    const classes = makeStyles(theme);

    return (
        <Button
            type={type}
            color={color}
            fullWidth={fullWidth}
            variant={variant}
            className={clsx(classes.btnProceed, (className || ''))}
            disabled={disabled}
            onClick={(_e) => { onClick() }}
        >
            {text}
        </Button>
    )
}

export default CustomButton