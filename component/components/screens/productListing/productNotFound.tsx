//@ts-nocheck
import { Typography, createStyles, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../../common/button';
// import CustomButton from "../../component/common/button";
// import Utils from "../../component/utils";
// import { useHistory } from "react-router-dom";
// import CustomButton from "../../components/common/button";
// import { ReducersModal } from "../../models";
// import Utils from "../../utils";
// import { hideSkeleton } from "../home/actions";
// import { getProductList } from "./action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(8, 3),
      },
    },
    heading: {
      fontFamily: 'Recoleta',
      fontSize: 28,

      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
        font: `normal  ${theme.spacing(2.0)} Recoleta Alt Bold `,
      },
    },
    description: {
      font: `normal  ${theme.spacing(1.6)} Work Sans`,
      lineHeight: '25px',
      color: '#000000',
      textAlign: 'center',
      width: '60%',
      padding: '20px 0px',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        font: `normal  ${theme.spacing(1.6)} Work Sans Medium `,
      },
    },
    button: {
      padding: '20px 20px !important',
      [theme.breakpoints.down('xs')]: {
        font: `normal  ${theme.spacing(1.6)} Work Sans SemiBold !important`,
      },
    },
  })
);
function ProductNotFound(props: any) {
  const classes = useStyles();
  const title = props?.title ?? 'Product Not Found';
  // const history = useHistory();
  // const sortingData = Utils.constants.sortingData;
  // const dispatch = useDispatch();
  const menuDataId =
    useSelector((state: any) => state.homeReducer.menuData?.[0]) || null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={classes.root}>
      {/* <img src={Utils.images.PRODUCT_NOT_FOUND} alt="notFound" /> */}
      <Typography color="primary" variant="h3" className={classes.heading}>
        {title}
      </Typography>
      <Typography color="primary" variant="h3" className={classes.description}>
        We were unable to find the product you were looking for, but there’s a
        lot more in here.
      </Typography>
      <CustomButton
        className={classes.button}
        type="submit"
        color="primary"
        fullWidth={false}
        variant="contained"
        text={'Explore Now'}
        onClick={() => {
          let pathname = Utils.CommonFunctions.seoUrl(menuDataId, 'others');
          // if(props?.setParams){
          //     props?.setParams({
          //         query: "",
          //         categoryId: menuDataId,
          //         sortBy:  sortingData[0].id,
          //       });
          //     //   dispatch(
          //     //     getProductList({
          //     //         limit:10,
          //     //         query: "",
          //     //         categoryId: menuDataId,
          //     //         sortBy:  sortingData[0].id,
          //     //       }, true, (resp: any) => {
          //     //       dispatch(hideSkeleton())
          //     //       // dispatch({
          //     //       //   type: "product-filter",
          //     //       //   payload: resp?.data?.data?.filters?.data,
          //     //       // });
          //     //     }, null,null
          //     //     //   fromPath === "home" ? () => {
          //     //     //     let pathname = Utils.CommonFunctions.seoUrl(menuData?.[0], "others")
          //     //     //     // history.push({ pathname: `${Utils.routes.PRODUCT_LIST}`, search: `?categoryId=${menuData?.[0]?.id}` });
          //     //     //     history.push({ pathname });
          //     //     //   } : null
          //     //     ));
          // }
          // history.push('/');
        }}
      />
    </div>
  );
}

export default ProductNotFound;
