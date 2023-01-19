

import Skeleton from "@mui/material/Skeleton";
import { useEffect } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
   ({
        skeleton: {
            marginTop: "5px !important"
        },
        skeletonContainer: {
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: "20px"
        },
        skeletonContent: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px"

        },
        skeletonTitle: {
            // float: "left",
            marginLeft: "5%"
        }
    })
);
export const FooterbannerSkeleton = () => {
    const classes = useStyles();

    return (<div className={classes.skeletonContainer}>
        <Skeleton key={Math.random() + "aboutToUs"} height={100} width={100} className={classes.skeleton} />
        <Skeleton key={Math.random() + "aboutToUs"} height={20} width={250} />
        <Skeleton key={Math.random() + "aboutToUs"} height={10} width={100} className={classes.skeleton} />
    </div>)
}

export const AboutToUsSkeleton = () => {
    const classes = useStyles();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div >
            {/* <Skeleton key={Math.random() + "aboutToUs"} variant="rectangular" height={250} width="100%" /> */}
            <FooterbannerSkeleton/>
            <Skeleton key={Math.random() + "aboutToUs"} height={20} width={100} className={classes.skeletonTitle} />
            <div className={classes.skeletonContent}>
                {[1, 2, 3, 4].map((key: number) =>
                    <Skeleton key={key + "aboutToUs"} height={10} width={'90%'} className={classes.skeleton} />
                )}
            </div>
        </div>
    )
}