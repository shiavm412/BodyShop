import {
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles , createStyles} from "@mui/styles";

import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../../../models";
import RecommendationCarousel from "../../../../common/recommendationCarousel";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      font: `normal 700 ${theme.spacing(1.6)}  Recoleta Alt Bold`,
      color: "var(--secondary-black)",
      textTransform: "capitalize",
      letterSpacing: "0.04em",
      marginTop: theme.spacing(1),

    },
    container: {
      width: "100%",
      height: "auto",
      padding: theme.spacing(1),
    },
    skeleton: {
      margin: theme.spacing(2, 0),
    },

  })
);

export default function Recommended() {
  const classes = useStyles();
  const recommendedData = useSelector(
    (state: any) => state.recommendReducer.recommendedData?.data
  ) || [];
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });
  
  return (
    <>
      <div className={classes.container}>
        {skeletonLoader ? (
          <Typography variant="body1" className={classes.heading} color="primary">
            <Skeleton variant="rectangular" className={classes.skeleton} />
          </Typography>
        ) : (
          recommendedData?.length > 0 ?
            <Typography variant="body1" className={classes.heading} color="primary">
              Recommended for you
            </Typography>
            : null
        )}
        <RecommendationCarousel type="home" />
      </div>
    </>
  );
}
