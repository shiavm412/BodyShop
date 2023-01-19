import React from "react";
import { makeStyles } from "@mui/styles";
import Utils from "../../utils";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ROUTE_CONSTANTS } from "../../constants/routeConstants";
import { InputBase, Theme } from "@mui/material";
// import { FILTER_CROSS_2, SEARCHICON } from "utils/constantImages";

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: "#ebf2f1",
    backgroundColor: "#c6d9d647",
    "&:hover": {
      backgroundColor: "#ebf2f1",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    [theme.breakpoints.down("xs")]: {
      color: "var(--primary)",
      font: "600 14px Work Sans",
      lineHeight: "16px",
    },
  },
  searchFieldDiv: {
    margin: theme.spacing(1, 0),
  },
}));

export default function SearchField({ handleClick, value, placeHolder }: any) {
  const classes = useStyles();
  const history = useRouter();
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <div className={classes.searchFieldDiv}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            {/* <SEARCHICON /> */}
          </div>
          <InputBase
            // autoFocus={true}
            autoFocus={false}
            placeholder={placeHolder?placeHolder:"Search for products, brands etc"}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={value ?? ""}
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => handleClick(e)}
            onClick={(e) => handleClick(e)}
            onKeyDown={(e: any) => {
              if (e.key === 'Enter' && e.target.value) {
                dispatch({
                  type: 'getProductList',
                  payload: {}
                })
                let url = `${Utils.CommonFunctions.replaceUrlParams(ROUTE_CONSTANTS.PRODUCT_SEARCH_LIST, { ":keyword": e.target.value })}?isSearched=true`
                history.push(url);
              }
            }}
            endAdornment={
              <>
                {/* {value && (
                  <img
                    style={{ margin: 10 }}
                    src={FILTER_CROSS_2}
                    alt="clear"
                    onClick={clearSearch}
                  />
                 
                )} */}
              </>
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
}
