


import { makeStyles } from "@mui/styles";
import Skeleton from "@mui/material/Skeleton";

const useStyles = makeStyles(() =>
    ({
        skeletonRoot: {
            // padding:"20px",
            width: "100%"
        },
        heading: {
            marginBottom: "-20px !important"

        }

    })
);

const DashboardBannerSkeleton = (props: any) => {
    const classes = useStyles();
    const { label } = props
    return (
        <>
            <div className={classes.skeletonRoot}>
                {
                    label === "banner" ?
                        <>
                            <Skeleton key={Math.random()+"dashboard_banner"} height={30} width={200} className={classes.heading} />
                            <Skeleton key={Math.random()+"dashboard_banner"}  height={200} className={classes.heading} />
                        </>
                        :
                        label === "level" ?
                            <Skeleton key={Math.random()+"dashboard_banner"}  height={80} className={classes.heading} />
                            :
                            <Skeleton key={Math.random()+"dashboard_banner"}  height={100} className={classes.heading} />
                }


            </div>
        </>
    )
}
export default DashboardBannerSkeleton