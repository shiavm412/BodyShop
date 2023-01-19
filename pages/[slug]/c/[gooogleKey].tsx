import React from "react";
import { wrapper } from "../../../store/store";
import Head from "next/head";
import { useSelector } from "react-redux";
import ProductListing from "../../../component/components/screens/productListing";
import { getProductList } from "../../../component/components/screens/productListing/action";
import request from "../../../component/utils/request";
import Utils from "../../../component/utils";

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
              : "The Body Shop"}
          </title>
          <meta
            name="description"
            content={
              productData?.categoryData &&
              productData?.categoryData?.metaDescription
                ? productData?.categoryData?.metaDescription
                : "The Body Shop"
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
    let resp = await request.post(Utils.endPoints.GUEST_SIGNUP);
    let authToken: any = "";
    if (resp) {
      authToken = resp?.data?.data?.authToken;
      await store.dispatch(getProductList(query, req.cookies.authToken));
      return { props: {} };
    }
  }
);
