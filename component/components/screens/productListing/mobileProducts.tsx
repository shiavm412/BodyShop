//@ts-nocheck
import { createStyles, Theme, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Product from '../../../common/product';
import Utils from '../../../utils';
// import Product from "../../component/common/product";
// import Utils from "../../component/utils";
import ProductNotFound from './productNotFound';
// import Utils from "../../utils";
// import { ReducersModal } from "../../models";
// import Skeleton from "@mui/material/Skeleton";

/**
 * Components
 */
// import Pagination from "../../components/common/pagination/pagination";
// import Product from "../../components/common/product";
// import ProductNotFound from "./productNotFound";
// import SkeletonProductView from "../../components/common/skeletonList/skeletonProductView";
// import { useEffect, useState } from "react";
// import { showSkeleton } from "../home/actions";
// import { handleScrollHeight } from "../../utils/scroll";
// import { useHistory, useLocation } from "react-router";
// import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    productsBody: {
      // padding: theme.spacing(0, 2),
      height: '100%',
    },
    productData: {
      // margin: theme.spacing(1, "0"),
      padding: theme.spacing(0, 1),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0, 0),
      },
    },
    skeletonContainer: {
      display: 'flex',
      // justifyContent: "space-around",
      width: '100%',
      flexWrap: 'wrap',
    },
    skeletonContent: {
      marginTop: '20px',

      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20px',
    },
  })
);

interface Props {
  handleChange: Function;
  products: any;
}

const MobileProducts: React.FC<any> = (props: Props) => {
  const classes = useStyles();
  const products =
    useSelector((state: any) => state.productReducer?.data?.products) || {};
  // const params: any = useParams()
  // let keyword = params?.keyword ?? "";
  // const [searchTerm, setSearchTerm] = useState<any>([])
  //   const recentSearch: any = localStorage.getItem("recentSearch");
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;
  useEffect(() => {
    let parsedData: any = [];
    // let data = JSON.parse(recentSearch) || [];
    // const isExisting =data && data.length > 0 ? data.find((p: any) => { if (p.name === keyword) return true }) : false;

    // setSearchTerm(JSON.parse(recentSearch))
    // if (!isExisting) {
    //     if (keyword && products?.data?.length) {
    //         let img:string = products?.data[0]?.image[0]?.file;
    //         parsedData = [...data, { name: keyword, img: `${IMAGE_URL}catalog/product${img}` }];

    //         localStorage.setItem('recentSearch', JSON.stringify(parsedData));
    //     }
    // }
  }, [products]);

  // useEffect(() => {
  //     window.scrollTo(0, 0);
  //     // if (!orderListData?.nextPage) {
  //     dispatch(showSkeleton())
  //     props.handleChange()
  //     // } else {
  //     //   setPage(1);
  //     // }

  return (
    <>
      <div className={classes.productsBody}>
        {!props?.products?.data || props?.products?.data?.length === 0 ? (
          <Grid item xs={12} className={classes.productData}>
            <ProductNotFound />
          </Grid>
        ) : (
          <Grid container>
            {props?.products?.data?.map((item: any, i: any) => {
              let image = item?.image?.[0]?.file;
              let configurableProduct =
                item?.configurableProductLinks?.find(
                  (item: any) => item?.isInStock
                ) || item?.configurableProductLinks[0];
              let desc =
                item?.type === 'configurable'
                  ? _.find(configurableProduct?.customAttributes, {
                      attribute_code: 'short_description',
                    })
                  : _.find(item.customAttributes, {
                      attribute_code: 'short_description',
                    });
              return (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  className={classes.productData}
                  key={item.magentoId}
                >
                  <Product
                    isSearchOrRecommend={true}
                    key={item._id}
                    section="plp"
                    // detail={_.truncate(Utils.CommonFunctions.replaceHtmlTag(desc?.value), { length: 80 })}
                    detail={_.truncate(
                      Utils.CommonFunctions.replaceHtmlTag(desc?.value),
                      { length: 80 }
                    )}
                    rate={item.price}
                    img={image}
                    attr={item}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
      {/* {products?.page && <Pagination data={products} handleChange={props.handleChange} />} */}
    </>
  );
};

export default MobileProducts;
