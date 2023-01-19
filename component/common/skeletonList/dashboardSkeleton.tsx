


import { makeStyles } from "@mui/styles";
import Skeleton from "@mui/material/Skeleton";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
    ({
        rootDiv: {
            border: "2px solid var(--border-color)",
        },
        taskDiv: {
            borderBottom: "1px solid var(--border-color)",
            padding: theme.spacing(2.5, 1),
        },
        skeleton: {
            marginTop: "10px !important",
            // marginLeft: "10px",
            // marginRight: "10px",

        },
        skeletonContent: {
            padding: "10px 10px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%"
        },
        skeletonBar: {
            margin: "10px !important"
        },
        skeletonContainer: {
            padding: "10px 0px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "30%"

        },
        skeletonRoot: {
            // padding:"20px",
            width: "100%"
        },
        skeletonRewardDiv: {
            width: "80%",
            padding: "20px",
            display: "flex",
            [theme.breakpoints.down("xs")]: {
                width: "100%",
                flexWrap: "wrap !important",
                alignItems: "center",
            }
        },
        circularSkeleton: {
            borderRadius: "50% !important",
            // margin: "20px",
            height: "130px !important",
            width: "120px",
            [theme.breakpoints.down("xs")]: {
                height: "90px !important",
                width: "80px",
            }
        },
        skeletonCirlcelContainer: {
            background: "var(--white)",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            margin: theme.spacing(0, 1),
        },
        heading: {
            marginBottom: "-20px !important"

        }
    })
);

const DashboardSkeleton = () => {
    const classes = useStyles()
    return (
        <>
            <Skeleton key={Math.random() + "dashboard"} height={20} width={200} className={classes.skeleton} />
            <div className={classes.skeletonRewardDiv}>
                {[1, 2, 3].map((item: any) => (
                    <div key={item + "dashboard"} className={classes.skeletonCirlcelContainer}>
                        <Skeleton className={classes.circularSkeleton} />
                    </div>
                ))}
            </div>
            <div className={classes.rootDiv}>
                {[4, 5].map((item: any) => (
                    <div key={item + "dashboard"} className={classes.taskDiv} >
                        <Skeleton key={Math.random() + item + "dashboard"} className={classes.skeletonBar} height={10} />
                        <div className={classes.skeletonContent}>
                            <Skeleton key={Math.random() + item + "dashboard"} className={classes.skeleton} width={"30%"} height={20} />
                            <Skeleton key={Math.random() + item + "dashboard"} className={classes.skeleton} width={"30%"} height={20} />

                        </div>
                    </div>
                ))
                }
            </div>
            <Skeleton key={Math.random() + "dashboard"} height={50} className={classes.skeleton} />
            <Skeleton key={Math.random() + "dashboard"} height={20} width={200} className={classes.skeleton} />
            <div className={classes.skeletonContent}>
                {
                    [6, 7, 8].map((item: number) => {
                        return (
                            <div key={item + "dashboard"} className={classes.skeletonContainer}>
                                <Skeleton key={Math.random() + item + "dashboard"} className={classes.skeleton} height={140} width={"100%"} />
                                <Skeleton key={Math.random() + item + "dashboard"} className={classes.skeleton} height={10} width={"100%"} />
                            </div>
                        )
                    })
                }
            </div>

            {/* </div> */}
        </>
    )
}
export default DashboardSkeleton