import { Input, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles: any = makeStyles((theme: Theme) =>
    ({
        searchDiv: {
            display: "flex",
            flexBasis: "100%",
            // position: "relative",
        },
        searchInput: {
            backgroundColor: "var(--white)",
            padding: theme.spacing(0.5, 1),
            font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
                1.4
            )} Work Sans`,
            height: "54px",
            // flexBasis: "70%",
            width: "100%",
            '& .MuiInputBase-input': {
                height: "100%"
            },
            [theme.breakpoints.down("sm")]: {
                width: "auto",
                textOverflow: "ellipse",
                padding: theme.spacing(0.5, 4, 0.5, 1)
            }
        },
        sendButton: {
            font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
                1.5
            )} Work Sans`,
            borderRadius: "0",
            color: theme.palette.primary.main,
            padding: theme.spacing(1, 3.5),
            flexBasis: "30%",
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(0.2)
            }
        },
        searchIcon: {
            top: '15px',
            right: '32%',
            position: 'absolute',
            zIndex: 1,
        },
    })
);

const SearchBox = (props: any) => {
    const classes = useStyles();
    return (
        <div className={classes.searchDiv}>
            <Input
                disableUnderline
                placeholder={props.placeholder}
                className={classes.searchInput}
                onChange={props.onChange}
                autoFocus={true}
                value={props.value}
                onKeyDown={props.onKeyDown}
            />

            {/* {
                props.isLocation ? <img
                    src={images.SEARCH_LOCATION}
                    alt="search" className={classes.searchIcon}/>
                    : ""
            }

            {props.isButton ? <Button
                color="secondary"
                variant="contained"
                disableElevation
                className={classes.sendButton}
            >
                {props.buttonText}
            </Button> : ""} */}

        </div>
    )
}

export default SearchBox;

