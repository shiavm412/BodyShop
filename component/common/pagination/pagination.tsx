import { createStyles, Pagination, Theme } from "@mui/material";
// import Pagination from "@material-ui/lab/Pagination";
import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  paginationBox: {
    display: "flex",
    borderTop: "1px solid var(--border-color)",
    paddingTop: "20px",
    justifyContent: "space-between",
    flexBasis: "100%",
    "& $p": {
      fontSize: "16px",
      lineHeight: "22px",
      color: "var(--black300)",
      "& span": {
        fontWeight: 600,
      },
    },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "space-between",
      padding: "20px 10px",
      fontSize: "12px",
    },
    // paddingLeft:'25px',
    // paddingRight:'25px'
  },
  pagination: {
    "& .Mui-selected": {
      backgroundColor: "transparent",
      borderColor: theme.palette.primary.main,
    },
    "& .MuiSvgIcon-root": {
      color: "black",
    },
    "& .Mui-disabled": {
      // backgroundColor: "var(--grey-color100)",
    },
    "& .MuiPagination-ul": {
      flexWrap: "nowrap",
    },
  },
  description: {
    font: `normal 400 ${theme.spacing(1.3)} Work Sans`,
  },
}));

function CustomPagination(props: any) {
  let data = props?.data;
  const count = Math.ceil(data?.totalCount / data?.limit);
  const currentPageCount = data?.page || undefined;
  const classes = useStyles();
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  console.log(
    {
      data,
      count,
      currentPageCount,
    },
    "pagination"
  );

  return (
    <div className={classes.paginationBox}>
      {skeletonLoader || Object.keys(data).length === 0 ? (
        <Skeleton height={20} width={"30%"} />
      ) : data !== undefined ? (
        <>
          <p className={classes.description}>
            <span>Showing</span>{" "}
            {`${data?.data?.length} of ${data?.totalCount} ${
              data?.totalCount > 1 ? "products" : "product"
            }`}
          </p>
          <Pagination
            size={"small"}
            defaultPage={1}
            siblingCount={0}
            boundaryCount={1}
            //  hideFirstButton={true}
            className={classes.pagination}
            // boundaryCount={1}
            count={count}
            page={+currentPageCount}
            onChange={props.handleChange}
            variant="outlined"
            shape="rounded"
            color="primary"
          />

          {/* <p className={classes.description}>
            <span>Showing</span>{" "}
            {`${data?.data?.length} of ${data?.totalCount} ${
              data?.totalCount > 1 ? "products" : "product"
            }`}
          </p> */}

          {/* <Pagination
            size={"small"}
            defaultPage={data?.page}
            siblingCount={1}
            boundaryCount={1}
            className={classes.pagination}
            count={count}
            page={currentPageCount}
            onChange={props.handleChange}
            variant="outlined"
            shape="rounded"
            color="primary"
          /> */}
        </>
      ) : null}
      {/* {pagesCount > 1 ?
                pagesCount > 3 ?
                    pagesCount === 3 ?
                        <ul className={classes.pagination}>
                            <li className={classes.pageItem}><a className={classes.pageLink} href="#"><img src={Utils.images.ARROW_PREV} alt="prev" /></a></li>
                            <li className={classes.pageItem}><a className={classes.pageLink} href="#">1</a></li>
                            <li className={classes.pageItem}><a className={classes.pageLink} href="#">2</a></li>
                            <li className={classes.pageItem}><a className={classes.pageLink} href="#">...</a></li>
                            <li className={classes.pageItem}><a className={classes.pageLink} href="#">{pagesCount}</a></li>
                            <li className={classes.pageItem}><a className={classes.pageLink} href="#"><img src={Utils.images.ARROW_NEXT} alt="next" /></a></li>
                        </ul>
                        :
                        <ul className={classes.pagination}>
                            <li className={classes.pageItem}><a className={classes.pageLink} href="#"><img src={Utils.images.ARROW_PREV} alt="prev" /></a></li>
                            <li className={classes.pageItem}><a className={classes.pageLink} href="#">1</a></li>
                            <li className={classes.pageItem}><a className={classes.pageLink} href="#">2</a></li>
                            <li className={classes.pageItem}><a className={classes.pageLink} href="#">...</a></li>
                            <li className={classes.pageItem}><a className={classes.pageLink} href="#">{pagesCount - 1}</a></li>
                            <li className={classes.pageItem}><a className={classes.pageLink} href="#">{pagesCount}</a></li>
                            <li className={classes.pageItem}><a className={classes.pageLink} href="#"><img src={Utils.images.ARROW_NEXT} alt="next" /></a></li>
                        </ul>
                    :
                    <ul className={classes.pagination}>
                        <li className={classes.pageItem}><a className={classes.pageLink} href="#"><img src={Utils.images.ARROW_PREV} alt="prev" /></a></li>
                        <li className={classes.pageItem}><a className={classes.pageLink} href="#">{pagesCount - 1}</a></li>
                        <li className={classes.pageItem}><a className={classes.pageLink} href="#">{pagesCount}</a></li>
                        <li className={classes.pageItem}><a className={classes.pageLink} href="#"><img src={Utils.images.ARROW_NEXT} alt="next" /></a></li>
                    </ul>
                :
                ''
            } */}
    </div>
  );
}

export default CustomPagination;
