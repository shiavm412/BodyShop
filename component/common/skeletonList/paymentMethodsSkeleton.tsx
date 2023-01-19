
import { makeStyles } from "@mui/styles";
import Skeleton from "@mui/material/Skeleton";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
   ({
        skeletonContainer: {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            // flexDirection:"column",
            // alignItems:"space-between",
            marginTop: "20px",
            [theme.breakpoints.down("xs")]:{
                flexDirection:"column",

            }
          },
          skeletonContent: {
            margin: "20px 0px",
            

          },
          skeleton:{
            [theme.breakpoints.down("xs")]:{
                width:"100% !important",
                marginBottom:"20px"
            }
          },
          space:{
              marginTop:"20px"
          },
          div:{
              padding:"20px"
          }

    })
);



const PaymentMethodSkeleton = () => {
    const classes = useStyles();
    return (
        < div className={classes.div}>
            <Skeleton variant="rectangular" width="40%" height={30} />
            <Skeleton className={classes.space} variant="rectangular" width="30%" height={20} />

            <div className={classes.skeletonContainer}>
                <Skeleton className={classes.skeleton} variant="rectangular" width="47%" height={200} />
                <Skeleton  className={classes.skeleton} variant="rectangular" width="47%" height={200} />
            </div>
            <Skeleton className={classes.skeletonContent} variant="rectangular" width="40%" height={30} />
            <Skeleton variant="rectangular" width="47%" height={90} />

        </div>

    )
}
export default PaymentMethodSkeleton;