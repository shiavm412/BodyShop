import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { PageMeta } from '../../../../../component/page-meta/PageMeta';
import ProductDetail from '../../../../../component/components/screens/productDetail/index';
import { wrapper } from '../../../../../store/store';
import { getProductData } from '../../../../../component/components/screens/productDetail/action';
import request from '../../../../../component/utils/request';
import Utils from '../../../../../component/utils';

function MainProductDetail() {
  const productData: any = useSelector(
    (state: any) => state?.productDetailReducer
  );
  const metaTitle =
    productData &&
    productData.product &&
    _.find(productData.product.customAttributes, {
      attribute_code: 'meta_title',
    });
  const metaDescription =
    productData &&
    productData.product &&
    _.find(productData.product.customAttributes, {
      attribute_code: 'meta_description',
    });
  return (
    <div>
      {productData && productData.product && (
        <PageMeta
          title={`${
            metaTitle && metaTitle.value
              ? metaTitle.value
              : productData?.product?.name
              ? `${productData?.product?.name} | The Body Shop`
              : 'The Body Shop'
          }`}
          description={
            metaDescription && metaDescription.value
              ? metaDescription.value
              : 'The Body Shop'
          }
          // canonicalUrl={URL + props.location.pathname}
        />
      )}
      <ProductDetail />
    </div>
  );
}

export default MainProductDetail;

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res, params }: any) => {
    let resp = await request.post(Utils.endPoints.GUEST_SIGNUP);
    let authToken: any = "";
    if (resp) {
      authToken = resp?.data?.data?.authToken;
    await store.dispatch(getProductData(params, authToken));

    return { props: {} };
  }
}
);
