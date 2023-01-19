import { Theme } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { makeStyles } from "@mui/styles";
// import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
   ({
        outerDiv: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: theme.spacing(0, 0, 0, 4),
            [theme.breakpoints.down("xs")]: {
                margin: theme.spacing(0, 0, 0, 0),
            },
        },
        skeleton: {
            marginTop: "10px !important"
        }
    })
);

export const FooterContentSkeleton = () => {
    const classes = useStyles();
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);
    
    return <div className={classes.outerDiv}>
        <Skeleton  key={Math.random()+"footer"} width={200} height={30} />
        {
            [1, 2, 3].map((key: number) => <Skeleton key={key+"footer"} width={"100%"} height={20} className={classes.skeleton} />)

        }
        <Skeleton width={"80%"} height={20} className={classes.skeleton} />
        <Skeleton width={"50%"} height={20} className={classes.skeleton} />

        {
            [6,7,8,9].map((key: number) => <Skeleton key={key} width={"100%"} height={10} className={classes.skeleton} />)

        }
        <Skeleton key={Math.random()+"footer"} width={"80%"} height={10} className={classes.skeleton} />
        <Skeleton key={Math.random()+"footer"} width={"50%"} height={10} className={classes.skeleton} />
        <Skeleton key={Math.random()+"footer"} width={"20%"} height={10} className={classes.skeleton} />
        <Skeleton key={Math.random()+"footer"} width={"10%"} height={10} className={classes.skeleton} />


    </div>
}