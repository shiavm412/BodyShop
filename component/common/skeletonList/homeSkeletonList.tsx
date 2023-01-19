import Skeleton from "@mui/material/Skeleton";
import SkeletonProductView from "./skeletonProductView";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
    ({
        skeleton: {
            margin: theme.spacing(2, 0)
        },
        className: {
            display: "flex",
            justifyContent: "center",
            width: "100%",
            [theme.breakpoints.down("xs")]: {
                justifyContent: "flex-start",

            }
        }
    })
);

export const HomeSkeletonList = () => {
    const classes = useStyles();
    return (
        <>
       
            <Skeleton key={Math.random() + "home"} variant="rectangular" height={450} className={classes.skeleton} />
            <Skeleton
                variant="rectangular"
                height={200}
                className={classes.skeleton}
                key={Math.random() + "home"}
            />
            <Skeleton key={Math.random() + "home"} variant="rectangular" height={400} className={classes.skeleton} />
            <Skeleton key={Math.random() + "home"} variant="rectangular" height={450} className={classes.skeleton} />
            <Skeleton key={Math.random() + "home"} variant="rectangular" height={300} className={classes.skeleton} />
            <Skeleton key={Math.random() + "home"} variant="rectangular" height={300} className={classes.skeleton} />
            <Skeleton
                key={Math.random() + "home"}
                variant="rectangular"
                height={250}
                className={classes.skeleton}
            />
            <Skeleton
                key={Math.random() + "home"}
                variant="rectangular"
                height={250}
                className={classes.skeleton}
            />
            <SkeletonProductView flag={"home"} className={classes.className} gridsArray={[1, 2, 3, 4]} lg={2} />
        </>
    )
}