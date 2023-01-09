import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { getProductData } from '../../../../../component/components/productDetail/action';
import ProductDetails from '../../../../../component/components/productDetail/index';
import { wrapper } from '../../../../../store/store';
import { PageMeta } from '../../../../../component/page-meta/PageMeta';

function ProductDetail() {
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

    const metaKeyword = productData &&
    productData.product &&
    _.find(productData.product.customAttributes, {
      attribute_code: 'meta_keyword',
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
          keywords={ metaKeyword && metaKeyword.value
            ? metaKeyword.value
            : 'The Body Shop'}
            
          // canonicalUrl={URL + props.location.pathname}
        />
      )}
      <ProductDetails />
    </div>
  );
}

export default ProductDetail;

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res, params }: any) => {
    await store.dispatch(getProductData(req, params));

    return { props: {} };
  }
);
