import { Typography, Theme } from "@mui/material";
import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
// import { useNavigate } from "react-router-dom";
// import Utils from "utils";
// import { LYBC_FIVE } from "utils/constantImages";
// import { useNavigate } from "react-router-dom";
import { ReducersModal } from "../../models";
// import Utils from "../../utils";

interface Props {
  item: number;
}

const useStyles = makeStyles((theme:Theme) => ({
  headContainer: {
    display: "flex",
    alignItems: "baseline",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      3.6
    )} Work Sans`,
    lineHeight: "42px",
    color: "#004236",
  },
  totalItem: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2
    )} Druk`,
    margin: theme.spacing(0, 1),
    lineHeight: "23px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  share: {
    cursor: "pointer",
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    padding: theme.spacing(1, 1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sideBarLogo: {
    display: "flex",
    padding: theme.spacing(1),
    "& div": {
      display: "flex",
      flexDirection: "column",
      paddingLeft: theme.spacing(1),

      // '& .MuiTypography-body2': {
      //   font: `normal 700  18px Druk`,
      //   color: theme.palette.secondary.main,
      // },
      // '& .MuiTypography-body1': {
      //   font: `normal 400  12px Work Sans`,
      //   color: "var(--white)"
      // }
    },
  },
  logo: {
    height: "40px",
    width: "40px",
  },
  joinClub: {
    // backgroundColor: "#004236",
    // margin:"0px -20px !important",
    /* text-align: center; */
    width: "100%",
    padding: "20px 10px 10px 10px",
    // margin:"0px -30px"
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )} Druk`,
      color: "var(--yellow-color)",
      letterSpacing: "0.04em",
    },
  },
  description: {
    [theme.breakpoints.down("xs")]: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.3
      )} Work Sans SemiBold`,
      color: "var(--white)",
      letterSpacing: "0.04em",
    },
  },
}));

const Heading = (props: Props) => {
  const classes = useStyles();
  const history = useRouter();
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  const userInfo = useSelector(
    (state: ReducersModal) => state.userDetailReducer?.userInfo
  );
  const redirect = () => {
    const type = userInfo.tierType === 2 ? 1 : 2;
    // history.push(pathname: Utils.routes.UPGRADE_MEMBERSHIP,{
     
    //   // state: { type, pageName: "My Dashboard" },
    // });
  };
  const configs: any = useSelector(
    (state: ReducersModal) => state.configReducer.generalConfigs
  );
  return (
    <div>
      {skeletonLoader ? (
        <>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Skeleton variant="rectangular" height={30} width={"50%"} />
         </Box>
         <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <Skeleton
              className={classes.joinClub}
              variant="rectangular"
              height={50}
              width={"150%"}
            />
          </Box>
        </>
      ) : (
        <div className={classes.headContainer}>
         
            <Typography variant="h1" className={classes.heading}>
              My Wishlist here
            </Typography>
        
         <Box sx={{ display: { xs: "block", sm: "none" } }}>
            {
              // (userInfo?.tierType ===3||userInfo?.tierType === 2)
              userInfo?.tierType !== 1 &&userInfo?.tierType !== 2 && (
                <div className={classes.joinClub}>
                  <div
                    className={classes.sideBarLogo}
                    onClick={(_e: any) => {
                      redirect();
                    }}
                  >
                   
                    <div className={classes.logo}>
                    {/* <LYBC_FIVE /> */}
                    </div>
                    <div>
                      <Typography variant="body2" className={classes.title}>
                        {configs?.lybc_banner_title || ""}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.description}
                      >
                        {configs?.lybc_banner_description || ""}{" "}
                      </Typography>
                    </div>
                  </div>
                </div>
              )
            }
         </Box>
         
            {props.item !== 0 && (
              <Typography className={classes.totalItem}>
                ({`${props.item} ${props.item > 1 ? "Items" : "Item"}`})
              </Typography>
            )}
        
         
        </div>
      )}
    </div>
  );
};

export default Heading;
