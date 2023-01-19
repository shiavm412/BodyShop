import { makeStyles } from "@mui/styles";
import Skeleton from "@mui/material/Skeleton";
import clsx from 'clsx';
import { Divider, Theme } from "@mui/material";
const useStyles = makeStyles((theme: Theme) =>
    ({
        maxWidthDiv: {
            margin: theme.spacing(0, "auto"),
            maxWidth: "var(--max-width)",
            padding: theme.spacing(1, 0),
        },
        headingDiv: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginBottom: theme.spacing(1),
        },
        subHeading: {
            marginLeft: theme.spacing(1),
        },
        skeleton: {
            margin: theme.spacing(1),
        },
        skeletonContainer: {
            display: "flex",
            // justifyContent: "center",
            width: "100%",
            alignItems: "center"
        },
        skeletonContent: {
            display: "flex",
            justifyContent: "space-between",

        },
        topContent: {
            alignItems: "center",
            marginBottom: "-30px",
            // [theme.breakpoints.down('xs')]: {
            //     width: '100% !important'
            // }
        },
        leftSkeletonContent: {
            display: "flex",
            width: "90px",
            // height: '120px'
        },
        rightSkeletonContainer: {
            width: "95%"
        },
        skeletonDiv: {
            width: "100%",
            border: '2px solid var(--border-color)',
            display: "flex",
            flexDirection: "column",
            padding: '10px 15px',
            borderRadius: '4px',
            marginBottom: '15px'
        },
        topContentHeading: {
            marginTop: "15px !important",
            marginBottom: "-20px !important",
            [theme.breakpoints.down('xs')]: {
                width: '45% !important'
            }
        },
        subContent: {
            [theme.breakpoints.down('xs')]: {
                width: '20% !important'
            }
        },
        IdContent: {
            [theme.breakpoints.down('xs')]: {
                width: '70% !important'
            }
        },
        tag: {
            [theme.breakpoints.down('xs')]: {
                width: '20% !important'
            }
        }
    })
);
interface Props {
    sections?: Array<number>
}

const OrderListSkeleton = (props: Props) => {
    const classes = useStyles();
    const { sections } = props;
    const arr = sections && sections.length > 0 ? sections : Array.of(1, 2, 3);
    return (
        <>
            <div >
                <div className={classes.maxWidthDiv}>
                    <div className={classes.headingDiv}>
                        <Skeleton height={30} width={90} />
                        <div >
                            <Skeleton variant="rectangular" height={20} width={70} />
                        </div>
                    </div>
                    <div>

                        {arr.map((item:number) => (
                            <div key ={item+"order"} className={classes.skeletonDiv}>
                                <Skeleton height={50} width={'15%'} className={clsx(classes.subHeading, classes.IdContent)} />
                                <Divider />
                                <Skeleton height={20} width={'10%'} className={clsx(classes.subHeading, classes.topContentHeading)} />
                                <div className={clsx(classes.skeletonContent, classes.topContent)}>
                                    <Skeleton height={10} width={'6%'} className={clsx(classes.subHeading, classes.subContent)} />
                                    <Skeleton height={50} width={'7%'} className={clsx(classes.subHeading, classes.tag)} />
                                </div>
                                <div className={classes.skeletonContainer}>
                                    <div className={classes.leftSkeletonContent}>
                                        <Skeleton height={120} width={'100%'} className={classes.subHeading} />
                                    </div>
                                    <div className={classes.rightSkeletonContainer}>
                                        <Skeleton height={20} width={'30%'} className={classes.subHeading} />
                                        <div className={classes.skeletonContent}>
                                            <Skeleton height={10} width={'40%'} className={classes.subHeading} />
                                            <Skeleton height={20} width={'10%'} className={classes.subHeading} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>

        </>

    )
}
export default OrderListSkeleton