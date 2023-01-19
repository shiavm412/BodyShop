import { createStyles, Theme, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import CustomPagination from '../../../common/pagination/pagination';
import Product from '../../../common/product';
import Utils from '../../../utils';
import ProductNotFound from './productNotFound';
// import Utils from "../../component/utils";
// import { ReducersModal } from "../../component/models";
// import Skeleton from "@mui/material/Skeleton";

/**
 * Components
 */
// import Pagination from "../../component/common/pagination/pagination";
// import Product from "../../component/common/product";
// import ProductNotFound from "./productNotFound";
// import SkeletonProductView from "../../component/common/skeletonList/skeletonProductView";
// import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
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
}));

interface Props {
  handleChange: Function;
  setParams?: Function;
}

const Products: React.FC<any> = (props: Props) => {
  const classes = useStyles();
  const products =
    useSelector(
      (state: any) => state.productReducer?.data?.products
    ) || {};
  // const filters = useSelector(
  //   (state: any) => state.productFilterReducer?.filters
  // );

  const { filters } = useSelector(
    (state: any) => state.productFilterReducer
  );

  // const params: any = useParams();
  // let keyword = params?.keyword ?? "";
  let keyword = "";

  return (
    <>
      <div className={classes.productsBody}>
        {filters && (!products?.data || products?.data?.length === 0) ? (
          <Grid item xs={12} className={classes.productData}>
            <ProductNotFound setParams={props?.setParams} />
          </Grid>
        ) : (
          <Grid container>
            {products?.data?.map((item: any, i: any) => {
              let image = item?.image?.[0]?.file;
              let configurableProduct =
                item?.configurableProductLinks?.find(
                  (item: any) => item?.isInStock
                ) || item?.configurableProductLinks[0];
              let desc =
                item?.type === "configurable"
                  ? _.find(configurableProduct?.customAttributes, {
                      attribute_code: "short_description",
                    })
                  : _.find(item.customAttributes, {
                      attribute_code: "short_description",
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
                    isSearchOrRecommend={keyword ? true : false}
                    key={item._id}
                    section="plp"
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
      {products?.page && (
        <CustomPagination data={products} handleChange={props.handleChange} />
      )}
    </>
  );
};

export default Products;
