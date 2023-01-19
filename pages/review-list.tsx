import React from 'react'
import { getProductData } from '../component/components/screens/productDetail/action'
import ReviewList from '../component/components/screens/rating&review/reviews/index'
import Utils from '../component/utils'
import request from "../component/utils/request";
import { wrapper } from '../store/store'

const ReviewListSkeleton = () => {
  return (
    <div><ReviewList /></div>
  )
}

export default ReviewListSkeleton


export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res, query }: any) => {
    let resp = await request.post(Utils.endPoints.GUEST_SIGNUP);
    let authToken: any = "";
    if (resp) {
      authToken = resp?.data?.data?.authToken;
      await store.dispatch(getProductData(query,authToken));

      return { props: {} };
    }
  }
);