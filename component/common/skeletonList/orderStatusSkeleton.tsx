import { makeStyles } from "@mui/styles";
import Skeleton from "@mui/material/Skeleton";
import { Theme } from "@mui/material";
const useStyles = makeStyles((theme: Theme) =>
    ({

        skeleton: {
            margin: theme.spacing(1, 0.5),
        },
        skeletonContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width:"100%"

        },
        leftContent: {
            display: "flex",
            alignItems: "center",
            // width:"100%"
        },
        hide:{
            display:"none !important",
            // width:"0px !important"
        }
    }));
    interface Props{
        hideRightContent?:boolean
    }

const OrderStatusSkeleton = (props:Props) => {
    const classes = useStyles();
    return (
        <div>
            {Array.of(1, 2, 3, 4, 5).map((item:number) =>
                <div key={item+"order_status"} className={classes.skeletonContainer}>
                    <div className={classes.leftContent}>
                        <Skeleton width={30} height={30} variant="circular" className={classes.skeleton} />
                        <Skeleton width={140} height={15} variant="rectangular" className={classes.skeleton} />
                    </div>
                    <Skeleton width={70} height={15} variant="rectangular" className={props?.hideRightContent?classes.hide:classes.skeleton} />
                </div>
            )}
        </div>
    )
}
export default OrderStatusSkeleton