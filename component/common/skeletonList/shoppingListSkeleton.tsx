
import { makeStyles } from "@mui/styles";
import Skeleton from "@mui/material/Skeleton";
import { Theme } from "@mui/material";
// import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
    ({
        subHeading: {
            marginLeft: theme.spacing(1),
        },
        skeleton: {
            margin: theme.spacing(1),
        },
        skeletonContainer: {
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center"
        },
        skeletonContent: {
            display: "flex",
            justifyContent: "space-between"
        },
        leftSkeletonContent: {
            display: "flex",
            width: "90px",
            height: '120px'
        },
        rightSkeletonContainer: {
            width: "90%"
        }
    })
);
interface Props {
    sections?: Array<number>
}

const ShoppingListSkeleton = (props: Props) => {
    const classes = useStyles();
    const { sections } = props;
    const arr = sections && sections.length > 0 ? sections : Array.of(1, 2, 3);
 
    return (
        <>
            {arr.map((item: any) => (
                <div className={classes.skeletonContainer} key={item + 'shopping_list' + Math.random()}>
                    <div className={classes.leftSkeletonContent}>
                        <Skeleton height={'auto'} width={'100%'} className={classes.subHeading} />
                    </div>
                    <div className={classes.rightSkeletonContainer}>
                        <div className={classes.skeletonContent}>
                            <Skeleton height={20} width={'45%'} className={classes.subHeading} />
                            <Skeleton height={20} width={'10%'} className={classes.subHeading} />
                        </div>
                        <Skeleton height={20} width={'10%'} className={classes.subHeading} />
                        <div className={classes.skeletonContent}>
                            <Skeleton height={20} width={'40%'} className={classes.subHeading} />
                            <Skeleton height={20} width={'25%'} className={classes.subHeading} />
                        </div>
                    </div>
                </div>
            ))
            }
        </>

    )
}
export default ShoppingListSkeleton