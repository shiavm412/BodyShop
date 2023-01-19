import { makeStyles } from "@mui/styles";
import Skeleton from "@mui/material/Skeleton";
import { useEffect } from "react";
import clsx from 'clsx';
import { Grid, Box } from "@mui/material";

const useStyles = makeStyles(() =>
   ({
        skeletonContainer: {
            margin: "20px 0px",
            width: "100%"
        },
        skeletonContent: {
            marginTop: "20px",
            marginLeft: "20px"
        }
    })
);
interface Props {
    sm?: any;
    md?: any;
    xs?: any;
    lg?: any;
    gridsArray?: Array<Number>;
    className?:string;
    flag:string
}
const SkeletonProductView = (props: Props) => {
    const classes = useStyles();
    const { sm, xs, md, lg, gridsArray,className,flag } = props;
    const grids = gridsArray && gridsArray?.length > 0 ? gridsArray : Array.of(1, 2, 3, 4, 5);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Grid container className={clsx(className?className:classes.skeletonContainer)}>
            {grids.map((skeletonItem: any) =>
                <Grid item xs={xs ? xs : 5} sm={sm ? sm : 5} md={md ? md : 3} lg={lg ? lg : md?md:3} 
                key={skeletonItem +'product_skeleton'+Math.random()}
                className={classes.skeletonContent}>
                    <Skeleton   key={Math.random()+flag} variant="rectangular" width={"100%"} height={250} />
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton key={Math.random()+flag} />
                        <Skeleton key={Math.random()+flag}  width="60%" />
                        <Skeleton key={Math.random()+flag} height={60} width="55%" />
                    </Box>
                </Grid>)
            }
        </Grid>
    )
};
export default SkeletonProductView;