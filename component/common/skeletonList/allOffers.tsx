
import { makeStyles } from "@mui/styles";

import Skeleton from "@mui/material/Skeleton";
import { useEffect } from "react";
import SkeletonProductView from './skeletonProductView';
import { Box, Theme } from "@mui/material";
const useStyles = makeStyles((theme: Theme) =>
    ({
        bannerRoot: {
            background: "var(--white)",
            position: "relative",
            top: "-10vh",
        },
        productContainer: {
            background: "var(--white)",
        },
        findContainer: {
            width: "85%",
            margin: "0 auto",
            maxWidth: "100%",

        },
        skeletonContainer: {
            padding: theme.spacing(5, 3),
            width: "100%",
            [theme.breakpoints.down("xs")]: {
                margin: theme.spacing(2, 0),
            },
        },
        skeletonTab: {
            display: "flex",
            marginLeft: '10px'

        },
        skeleton: {
            margin: "0px 5px"
        },
    })
);
export const AllOffersSkeleton = () => {
    const classes = useStyles();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className={classes.productContainer}>
            <div className={classes.findContainer}>
                <div className={classes.bannerRoot}>
                    <Box sx={{ width: "100%" }}>
                        <div className={classes.skeletonContainer}>
                            <div className={classes.skeletonTab}>
                                {
                                    Array.of(1, 2, 3).map((item: number) =>
                                        <Skeleton key={item + "all_offers"} width={80}  className={classes.skeleton} variant="rectangular" height={20} />
                                    )
                                }
                            </div>
                            <SkeletonProductView flag={"all_offers"} xs={10} sm={5} md={5} />
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}