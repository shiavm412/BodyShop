


import {  Grid, Theme } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useEffect } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
  ({
    skeletonContainer: {
      display: "flex",
      flexDirection: "column"
    },
    skeltonView: {
      padding: theme.spacing(11),
      margin: theme.spacing(3, 0)
    },
    skeleton: {
      margin: "10px 0px"
    },
    skeletonMargin: {
      marginTop: "25px"
    },
    detailsContainer2: {
      margin: theme.spacing(2, 2.5),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(2, 0),
      },
    },
    outerDiv2: {
      padding: theme.spacing(11),

    },
    outerDivBanner: {
      padding: theme.spacing(12),
    },
    detailContainer: {
      margin: theme.spacing(2, 2.5),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(2, 0),
      }
    },
    descContainer: {
      margin: theme.spacing(2, 1, 2, 0),
    },

  })
);

export const GiftSkeleton = () => {
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const skeletonView = <div className={classes.skeletonContainer}>
    <Skeleton className={classes.skeleton} variant="rectangular" width={"30%"} height={20} />
    <Skeleton className={classes.skeleton} variant="rectangular" width={"85%"} height={20} />
    <Skeleton className={classes.skeleton} variant="rectangular" width={"80%"} height={20} />
    <Skeleton className={classes.skeleton} variant="rectangular" width={"20%"} height={20} />
  </div>
  return (
    <>
      <Skeleton variant="rectangular" className={classes.outerDivBanner} />
      <div >
        <Grid container>
          <Grid item xs={12} md={8} lg={8} xl={9}>
          <div className={classes.detailsContainer2}>

            {
              skeletonView
            }
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={4} xl={3}>
            <Skeleton variant="rectangular" className={classes.skeltonView} />
          </Grid>
        </Grid>
        <Skeleton variant="rectangular" className={classes.skeletonMargin} height={180} />
        <Grid container>
          <Grid item xs={12} md={4} lg={4} xl={3}>
            <Skeleton variant="rectangular" className={classes.skeltonView} />
          </Grid>
          <Grid item xs={12} md={8} lg={8} xl={9}>
            <div className={classes.detailsContainer2}>
              {
                skeletonView
              }
            </div>
          </Grid>
        </Grid>

        <div>
          <Grid container className={classes.detailsContainer2}>
            <Grid item xs={12} md={8} lg={8} xl={9}>


            

              <div className={classes.descContainer}>
                {skeletonView

                }
              </div>
            </Grid>
            <Grid item xs={12} md={4} lg={4} xl={3}>
              {
                <Skeleton variant="rectangular" className={classes.skeltonView} />
              }
            </Grid>
          </Grid>

          <Grid container className={classes.detailsContainer2}>
            <Grid item xs={12} md={4} lg={4} xl={3}>
              {
                <Skeleton variant="rectangular" className={classes.skeltonView} />
              }
            </Grid>
            <Grid item xs={12} md={8} lg={8} xl={9}>

              <div className={classes.detailContainer}>
                {
                  skeletonView
                }
              </div>
            </Grid>
          </Grid>
        </div>
      </div >
    </>
  )
}