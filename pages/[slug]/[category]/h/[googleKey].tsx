import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { wrapper } from '../../../../store/store';
import ProductListing from '../../../../component/components/screens/productListing';
import { getProductList } from '../../../../component/components/screens/productListing/action';

function ProductListingWrapper() {
  const productData = useSelector((state: any) => state.productReducer?.data);
  return (
    <>
      {productData && (
        <Head>
          <title>
            {productData?.categoryData && productData?.categoryData?.metaTitle
              ? productData?.categoryData?.metaTitle
              : productData?.categoryData?.name
              ? `${productData?.categoryData?.name} | The Body Shop`
              : 'The Body Shop'}
          </title>
          <meta
            name="description"
            content={
              productData?.categoryData &&
              productData?.categoryData?.metaDescription
                ? productData?.categoryData?.metaDescription
                : 'The Body Shop'
            }
          />
          {/* <link rel="canonical" href={window.location.href} /> */}
        </Head>
      )}
      <ProductListing />
    </>
  );
}

export default ProductListingWrapper;

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res, query, params }) => {

    await store.dispatch(getProductList(query,req.cookies.authToken));
    return { props: {} };
  }
);
