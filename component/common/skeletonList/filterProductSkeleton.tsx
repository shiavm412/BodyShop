
import Skeleton from "@mui/material/Skeleton";
import { useEffect } from "react";
import FilterListSkeleton from "./filterListSkeleton";
import SkeletonProductView from "./skeletonProductView";
import { makeStyles } from "@mui/styles";
import { Divider, Grid, Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
    ({
        select: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
                1.5
            )} Wrok Sans`,
            "& .MuiInput-underline:after": {
                border: "none",
            },
            "& .MuiInput-underline:before": {
                display: "none",
            },

            "& .MuiInput-input": {
                font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
                    2
                )} Druk`,
                marginLeft: theme.spacing(2),
                lineHeight: "23px",
            },
        },
        filterHead: {
            padding: "60px 20px 15px",
        },
        filterContainer: {
            padding: theme.spacing(0, 2),

        }
    })
);
export const FilterProductSkeleton = () => {
    const classes = useStyles();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            < div className={classes.filterHead} >
                <Grid container>
                    <Grid item xs={12} sm={3}>
                        <Skeleton height={20} width={"40%"} />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Skeleton height={20} width={"30%"} />
                    </Grid>
                    <Grid item xs={6} sm={3} className={classes.select}>
                        <Skeleton height={20} width={"40%"} />
                    </Grid>
                </Grid>
            </div >
            <div >
                <Grid container>
                    <Grid item xs={11} md={3}>
                        <div className={classes.filterContainer}>
                            <FilterListSkeleton />
                        </div>            
                              </Grid>
                    <Grid item xs={12} md={9}>
                        <Divider />
                        <SkeletonProductView flag={"product_listing"} />
                    </Grid>
                </Grid>
            </div>
        </>
        
    )

}