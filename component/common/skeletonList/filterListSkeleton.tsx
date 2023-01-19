import { makeStyles } from "@mui/styles";
import Skeleton from "@mui/material/Skeleton";
import { useEffect } from "react";

const useStyles = makeStyles(() =>
  ({
    skeletonContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      // flexWrap: "wrap"
    },
    skeletonContent: {
      margin: "10px 0px 10px 10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    row: {
      width: "90%",
      margin: "10px 0px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);

const FilterListSkeleton = () => {
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className={classes.skeletonContainer}>
      {Array.of(1, 2, 3, 4, 5, 6).map((value: number) => (
        <div className={classes.skeletonContent} key={value} >
          <div className={classes.row}>
            <Skeleton key={Math.random() + "filter"} variant="rectangular" width={"80%"} height={20} />
            <Skeleton key={Math.random() + "filter"} variant="rectangular" width={"15%"} height={25} />
          </div>
          {value === 1 &&
            Array.of(1, 2, 3).map((item: number) => (
              <div key={Math.random() + item + "filter"} className={classes.row}>
                <Skeleton key={Math.random() + item + "filter"} variant="rectangular" width={"15%"} height={25} />
                <Skeleton key={Math.random() + item + "filter"} variant="rectangular" width={"70%"} height={15} />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};
export default FilterListSkeleton;
