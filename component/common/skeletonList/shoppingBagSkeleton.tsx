import { Grid, Skeleton, Theme } from "@mui/material";
import ShoppingListSkeleton from "./shoppingListSkeleton";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
   ({
        headingDiv: {
            display: "flex",
            alignItems: "center",
            margin: theme.spacing(1, 0),
        },
        subHeading: {
            marginLeft: theme.spacing(1),
        },
        skeleton1: {
            marginLeft: theme.spacing(1),
        },
        skeletonContainer1: {
            display: "flex"
        },
        yourCardRoot: {
            marginBottom: theme.spacing(2),
            border: "1px solid var(--border-color)",
        },
        yourCardDiv: {
            borderBottom: "1px solid var(--border-color)",
            padding: theme.spacing(1.5, 1),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        skeleton: {
            marginLeft: theme.spacing(1),
        },
        skeletonContainer: {
            display: "flex"
        },
        outerDiv: {
            padding: theme.spacing(0, 1),
        },

    })
);
const ShoppingBagSkeleton = () => {
    const classes = useStyles();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className={classes.headingDiv}>
                <Skeleton height={30} width={'30%'} />
                <Skeleton height={30} width={'10%'} className={classes.subHeading} />
            </div>
            <div >
                <ShoppingListSkeleton />
            </div>
            <div >
                <ShoppingListSkeleton sections={[1]} />

                <div className={classes.skeletonContainer1}>
                    <Skeleton width={20} height={30} />
                    <Skeleton className={classes.skeleton1} width={100} height={30} />
                </div>
            </div>

            <div className={classes.yourCardRoot}>
                <div className={classes.yourCardDiv}>
                    <div className={classes.skeletonContainer}>
                        <Skeleton width={20} height={30} />
                        <Skeleton className={classes.skeleton} width={100} height={30} />
                    </div>
                    <Skeleton className={classes.skeleton} width={100} height={30} />
                </div>
                <Grid container className={classes.outerDiv}>
                    {Array.of(1, 2).map((item) =>
                        <Grid item xs={12} md={6} key={item + 'shoopingBag'} >
                            <Skeleton className={classes.skeleton} height={90} />
                        </Grid>)
                    }

                </Grid>
            </div>
        </>
    );
};
export default ShoppingBagSkeleton;