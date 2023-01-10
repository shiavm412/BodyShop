import React from "react";
import ProductListing from "../../../../modules/productListing";
import { getProductList } from "../../../../modules/productListing/action";
import { wrapper } from "../../../../store/store";


function ProductListingWrapper() {
  return <ProductListing />;
}

export default ProductListingWrapper;

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res, query, params }) => {
    let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2M2EzZWQyYTQ2YWRlMzM4OGRlNjQ4YTkiLCJpc0xvZ2luIjp0cnVlLCJpc0d1ZXN0TG9naW4iOnRydWUsImlhdCI6MTY3MTY4NzQ2NiwiZXhwIjoxNjg3MjM5NDY2fQ.4Eg19HCDEGFUiw562m2nxA7T5WPHZb6bt0yZwfx6Xo0"

    console.log(query, params);
    const actionparams = {
      // customAttributes: [],
      // otherFilters: [],
      page: 1,
      query: "",
      // sortBy: "2",
      urlKey: query?.slug,
      authToken: authToken
      // authToken: req.cookies.authToken
    };
    // console.log(actionparams.authToken, "authentication")

    console.log("actionParams", actionparams);
    await store.dispatch(getProductList(actionparams));
    return { props: {} };
  }
);