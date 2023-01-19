import { makeStyles } from "@mui/styles";
import Skeleton from "@mui/material/Skeleton";
import { Grid, Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
   ({
        gridRoot: {
            margin: theme.spacing(1, 0),
            [theme.breakpoints.down("xs")]: {
                margin: "-10px"
            }
        },
        skeletonContainer: {
            display: "flex",
            justifyContent: "space-between"
        },
        skeleton: {
            marginBottom: theme.spacing(1),

        },
        skeletonContent: {
            display: "flex",
            flexDirection: "column",
            width: "50%",
            marginLeft: "10px",
            marginRight: "10px"
        },
        container: {
            border: "1px solid lightgray",
            padding: "10px",
            background: "white"
        },
        padding: {
            [theme.breakpoints.down("xs")]: {
                backgroundColor: "#f8f8f8",
                padding: "10px"
                // margin:"10px"
            }
        }
    })
);


const VoucherSkeletonList = () => {
    const classes = useStyles();

    return (
        <div className={classes.padding}>
            {
                Array.of(1, 2, 3).map((item: number) => {
                    return (
                        <Grid key={item + "voucher"} container className={classes.gridRoot} spacing={2}>
                            <Grid item xs={12} md={6} key={1}  >
                                <div className={classes.container}>
                                    <div className={classes.skeletonContainer}>
                                        <Skeleton variant="rectangular" width={"20%"} height={30} />
                                        <div className={classes.skeletonContent}>
                                            <Skeleton className={classes.skeleton} variant="rectangular" width={"30%"} height={10} />
                                            <Skeleton className={classes.skeleton} variant="rectangular" width={"80%"} height={10} />
                                        </div>
                                        <Skeleton variant="rectangular" width={"20%"} height={20} />
                                    </div>
                                    <Skeleton variant="rectangular" width={"70%"} height={10} />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6} key={2} >
                                <div className={classes.container}>
                                    <div className={classes.skeletonContainer}>
                                        <Skeleton variant="rectangular" width={"20%"} height={30} />
                                        <div className={classes.skeletonContent}>
                                            <Skeleton className={classes.skeleton} variant="rectangular" width={"30%"} height={10} />
                                            <Skeleton className={classes.skeleton} variant="rectangular" width={"80%"} height={10} />
                                        </div>
                                        <Skeleton variant="rectangular" width={"20%"} height={20} />
                                    </div>
                                    <Skeleton variant="rectangular" width={"70%"} height={10} />
                                </div>
                            </Grid>
                        </Grid>
                    )
                })
            }
        </div>
    )
}
export default VoucherSkeletonList;