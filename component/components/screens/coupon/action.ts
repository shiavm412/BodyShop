import { format } from "date-fns";
import { getShoppingBagList } from "../../../common/addToCart/action";
import Utils from "../../../utils";
import { addCoupon } from "../../../utils/event/action";
import request from '../../../utils/request';
// import { getShoppingBagList } from "../../components/common/addToCart/action";
// import Utils from "../../utils";
// import { addCoupon } from "../../utils/event/action";
// import request from "../../utils/request";
// import { showLoader, hideLoader } from "../home/actions";
// import { addCoupon } from "../../utils/event/action";


export const getCouponList = (params: any) => {
  return (dispatch: any, _getState: any) => {
    let url = Utils.endPoints.COUPON_LISTING
    // dispatch(showLoader())
    request
      .get(url, { params: params })
      .then((resp) => {
        let detail = resp.data.data;
        dispatch({
          type: "getCouponList",
          payload: detail,
        });
        // dispatch(hideLoader())
      })
      .catch((err) => {
        // dispatch(hideLoader())
        if (err?.response?.data?.message)
          dispatch({
            type: "show-alert", payload: {
              type: "error",
              message: err.response.data.message
            }
          })
      });
  };
};

export const validateCoupon = (params: { couponCode: string, cartId: string }, callback?: Function, item?: any) => {
  return (dispatch: any, _getState: any) => {
    // dispatch(showLoader())
    let url = Utils.endPoints.VALIDATE_COUPON
    request
      .post(url, params).then((resp) => {
        if (resp) {
          if (callback) callback()
          dispatch({
            type: "show-alert", payload: {
              type: "success",
              message: resp.data.message
            }
          })
          if (resp.data?.data) {
            addCoupon({
              CouponCode: `${resp.data.data.couponCode}`,
              CouponType: `${resp.data.data.couponType}`,
              DiscountValue: `${resp.data.data.discountAmount}`,
              CouponValidity: `${format(new Date(item.dateTo), "dd MMMM yyyy")}`,
              CouponApplyStatus: `${resp.data.data.couponApplyStatus}`,
              FailureError: "",
            })
          }
          // addCoupon({
          //   CouponCode: ,
          //   CouponType: ,
          //   DiscountValue: ,
          //   UserId: `${localStorage.getItem("userId")}`,
          //   CreatedAt: `${Date.now()}`,
          //   CouponValidity: `${}`,
          // })
          // history.push(Utils.routes.SHOPPING_BAG)
        }
        // dispatch(hideLoader())
      })
      .catch((err) => {
        // dispatch(hideLoader());
        if (err?.response?.data?.message)
          dispatch({
            type: "show-alert", payload: {
              type: "error",
              message: err.response.data.message
            }
          })
      });
  }
}


export const removeCoupon = (params: { couponId: number, cartId: string }) => {
  return (dispatch: any, _getState: any) => {
    let url = Utils.endPoints.REMOVE_COUPON
    // dispatch(showLoader())
    request
      .post(url, params)
      .then((resp) => {
        if (resp) {
          dispatch({ type: "updateCart", payload: { coupons: [] } })
          dispatch(getShoppingBagList())
          dispatch({
            type: "show-alert", payload: {
              type: "success",
              message: resp.data.message
            }
          })
        }
        // dispatch(hideLoader())
      })
      .catch((err) => {
        // dispatch(hideLoader());
        if (err?.response?.data?.message)
          dispatch({
            type: "show-alert", payload: {
              type: "error",
              message: err.response.data.message
            }
          })
      });
  };
};
