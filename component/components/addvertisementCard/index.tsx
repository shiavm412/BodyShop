import {  Box, Theme} from "@mui/material";
import { useEffect } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory} from "react-router-dom";
import { ReducersModal } from "../../models";
import { getAuthToken } from "../../utils/session";
import { getHomeData } from "../../../store/home/action";
// import { showSkeleton, getHomeData, hideSkeleton } from "../../../store/home/action";

type AppProps = {
  heading?: string;
  data?: any
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addvertisementRoot: {
      backgroundColor: theme.palette.secondary.main,
      padding: theme.spacing(0.5),
      position: "sticky",
      top: 130,
      
      zIndex: 9,
    },
    dashedBordered: {
      // border: `1px dashed ${theme.palette.primary.light}`,
      padding: theme.spacing(0.5),
      width: "100%",
    },
    heading: {
      fontWeight: 600,
      color: theme.palette.primary.light,
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      '& p': {
        margin: theme.spacing(0, 0.2),
        [theme.breakpoints.down("sm")]: {
          fontSize: 12
        }
      }
    },
  })
);

function Addvertisement({ heading }: AppProps) {
  const classes = useStyles();
  const dispatch : any = useDispatch()
  // const history = useHistory()
  const homeData = useSelector((state: ReducersModal) => state.homeReducer.homeData)
  const advertisementData = homeData?.find((data: any) => data.block_key === "promotional_banner");


  useEffect(() => {
    // if (getAuthToken()) {

      if (!advertisementData?.title) {
        // dispatch(showSkeleton())
        dispatch(getHomeData(getAuthToken(),() => {
          // dispatch(hideSkeleton())
        }))
      }
    // }

  }, []);

  // const content = advertisementData?.content?.[0] || {}
  const content = advertisementData?.content?.map((item: any) => item.description).join("<p> | <p>")
  

  return (
    advertisementData?.status === "1" ?
      <>
        <Box sx={{ display: { xs: "none", sm: "contents" } }}>
          <div className={classes.addvertisementRoot}>
            <div className={classes.dashedBordered}>
              
              <div className={classes.heading} dangerouslySetInnerHTML={{ __html: content || '' }}>
              </div>
            </div>
          </div>
        </Box>
        {
          // pathname === "/" &&
          // <Hidden smUp>
          //   <MobilePromotional />
          // </Hidden>
        }
      </>

      : null
  );
}

export default Addvertisement;
