import {  Theme, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import RecommendationCarousel from "../../../common/recommendationCarousel";
import { ReducersModal } from "../../../models";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme: Theme) =>
  ({
    recommendedRoot: {
      marginTop: "45px",
    },
    skeleton: {
      margin: theme.spacing(2, 0),
    },
    heading: {
      font: `normal ${theme.spacing(
        2.4
      )} Recoleta Alt Bold`,
      letterSpacing: "0.02em",
      lineHeight: "33px",
      margin: theme.spacing(0, 8),
      color: theme.palette.primary.main,
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(2.2),
        margin: theme.spacing(0, 2),
        marginBottom: theme.spacing(1),
      },
    },
  })
);
interface Props {
  data: any;
}

const Recommended: React.FC<Props> = ({ }: Props) => {
  const classes = useStyles();
 const  skeletonLoader  = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });
  const recommendedData = useSelector(
    (state: ReducersModal) => state?.recommendReducer?.recommendedData?.data
  )||[];


  return (
    <div className={classes.recommendedRoot}>
      {skeletonLoader ? (
        <Typography variant="body1" className={classes.heading} color="primary">
          <Skeleton variant="rectangular" className={classes.skeleton} />
        </Typography>
      ) : (
        recommendedData?.length > 0 ?
          <Typography variant="body1" className={classes.heading} color="primary">
            Recommended For You
          </Typography>
          : null
      )}
      <RecommendationCarousel type="home" />
    </div>
  );
};

export default Recommended;
