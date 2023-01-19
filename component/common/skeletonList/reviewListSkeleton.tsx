import { makeStyles } from "@mui/styles";
import Skeleton from "@mui/material/Skeleton";
import clsx from 'clsx';
import { Divider, Theme } from "@mui/material";
const useStyles = makeStyles((theme: Theme) =>
    ({
        divider: {
            border: "1px solid var(--text-color)",
            margin: theme.spacing(2, 0),
        },
        skeleton: {
            margin: "10px 0px"
        },
        skeletonContent: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
        },
        skeletonContentColumn: {
            display: "flex",
            justifyContent: "space-between",
            width: "100%"
        },
        columnContent: {
            width: "35%"
        },

        skeletonSpacing: {
            margin: "20px"
        },
        skeletonSpacingLeft: {
            marginLeft: "-20px"
        },
        skeletonContainer: {
            display: "flex",
            justifyContent: "space-between"
        },
        leftSpacing: {
            marginLeft: "20px"
        }
    })
);
interface Props {
    sections?: Array<number>;
    hideOtherInfo?: boolean
}


const ReviewListSkeleton = (props: Props) => {
    const classes = useStyles();
    const { sections } = props;
    const arr = sections && sections.length > 0 ? sections : Array.of(1, 2, 3);

    return (
        <>
            {
                arr.map((index: number) => {

                    return <>
                        <div key={index}>
                            <Skeleton className={classes.skeleton} width={130} variant="rectangular" />
                            <Skeleton className={classes.skeleton} width={130} variant="rectangular" />
                            <Skeleton className={classes.skeleton} width={250} variant="rectangular" />
                            <Divider light className={classes.divider} />

                        </div>
                        {
                            Array.of(1, 2, 3).map((item:number) => (
                                <div key={item+'review_list'} className={classes.skeletonContent}>
                                    <Skeleton className={clsx(classes.skeletonSpacing)} variant="rectangular" width={"50%"} />
                                    :<Skeleton className={classes.skeletonSpacing} variant="rectangular" width={"50%"} />
                                </div>))
                        }
                        <Divider light className={classes.divider} />
                        <div className={classes.skeletonContentColumn}>
                            {Array.of(4, 5, 6).map((item:number) =>
                                <div key={item+'review_list'} className={classes.columnContent}>
                                    <Skeleton className={classes.skeleton} variant="rectangular" height={10} width={"30%"} />
                                    <Skeleton className={classes.skeleton} variant="rectangular" height={10} width={"95%"} />
                                    <Skeleton className={classes.skeleton} variant="rectangular" height={10} width={"70%"} />
                                </div>
                            )}
                        </div>
                        <Divider light className={classes.divider} />
                        {<div className={classes.skeletonContentColumn}>
                            <div className={clsx(classes.skeletonSpacing)}>

                                <Skeleton className={clsx(classes.skeleton,classes.skeletonSpacingLeft)} height={20} width={130} variant="rectangular" />
                                <Skeleton className={clsx(classes.skeleton,classes.skeletonSpacingLeft)} height={10} width={130} variant="rectangular" />
                            </div>
                            <div className={classes.skeletonContainer}>
                                <Skeleton className={classes.skeleton} height={50} width={100} variant="rectangular" />
                                <Skeleton className={clsx(classes.skeleton, classes.leftSpacing)} height={50} width={100} variant="rectangular" />
                            </div>
                        </div>
                        }
                    </>
                })
            }
            <Divider light className={classes.divider} />

        </>
    )
}
export default ReviewListSkeleton