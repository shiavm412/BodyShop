import { changeProductQuantity } from '../../../common/addToCart/action';
import Utils from '../../../utils';
import request from '../../../utils/request';

export const onCountChange = (
  quantity: number,
  item: any,
  configs?: any,
  callback?: Function
) =>   async (dispatch: any, _setState: any) => {
    let errorMessage = '';
    const payload = {
      cartItemId: item.cartItemId,
      productId: item.productId,
      quantity,
    };
    if (quantity > 0) {
      // if (count < item.stockItem.min_sale_qty) {
      //   errorMessage = `We're sorry! Only ${item?.stockItem?.min_sale_qty || 0} unit(s) allowed in each order`
      // }
      if (
        configs?.max_item_cart_qty &&
        quantity > Number(configs.max_item_cart_qty)
      ) {
        errorMessage = `We're sorry! Only ${
          configs?.max_item_cart_qty || 0
        } unit(s) allowed in each order`;
      } else if (quantity > item?.stockItem?.max_sale_qty) {
        errorMessage = `We're sorry! Only ${
          item?.stockItem?.max_sale_qty || 0
        } unit(s) allowed in each order`;
      } else {
        dispatch(changeProductQuantity(payload, callback));
      }
    } else {
      errorMessage = `Minimum quantity must be 1`;
      if (callback) callback();
    }
    if (errorMessage) {
      dispatch({
        type: 'show-alert',
        payload: {
          type: 'error',
          message: errorMessage,
        },
      });
    }
  };


export const getFreeSamples = () => {
  return request.get(Utils.endPoints.FREE_SAMPLES);
};

export const updateLocalCart = (params: {
  cartId: any;
  productDiscount?: any;
  couponArray?: Array<any>;
  donation?: Object;
  isWhatsAppConsent?: boolean;
  addressId?: any;
  isOrderWrapped?: boolean;
  shipping?: Object;
}) => {
  return (dispatch: any, _setState: any) => {
    dispatch({ type: 'updateCart', payload: params });
  };
};

export const updateCartSummary = (
  params: {
    cartId: string;
    productDiscount?: number;
    couponArray?: Array<{
      id: number;
      couponCode: string;
      discount: number;
      type: number;
    }>;
    donation: Array<{
      donationType: string;
      donationAmount: number;
      campaignId: number;
    }>;
    shipping: Array<{
      shippingType: string;
      shippingFee: number;
    }>;
    isWhatsAppConsent: boolean;
    addressId: string;
    isOrderWrapped: boolean;
  },
  callback?: Function
) => {
  return (dispatch: any, _setState: any) => {
    request
      .put(Utils.endPoints.CART_SUMMARY, {
        ...params,
      })
      .then((resp) => {
        // dispatch({ type: "updateCart", payload: params })
        if (resp) {
          dispatch({ type: 'updateCart', payload: { ...resp.data.data } });
          if (callback) {
            callback(resp.data.data || {});
          }
        } else {
          // dispatch(hideLoader())
        }
        // dispatch(hideLoader())
      })
      .catch((err) => {
        // dispatch(hideLoader())
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: err.response.data.message,
            },
          });
      });
  };
};

export function getOrderRetryDetails(query: string, callback?: Function) {
  return (dispatch: any, _getState: any) => {
    let url = Utils.endPoints.ORDER_RETRY + query;
    request
      .get(url)
      .then((resp) => {
        if (callback) {
          callback(resp);
        }
      })
      .catch((err) => {
        // dispatch(hideLoader())
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: err.response.data.message,
            },
          });
      });
  };
}

export const postOrderRetry = (payload: any, callback?: Function) => {
  return (dispatch: any, _getState: any) => {
    // dispatch(showLoader())
    let url = Utils.endPoints.ORDER_RETRY;
    request
      .post(url, payload)
      .then((resp) => {
        if (callback) {
          callback(resp);
        }
        // dispatch(hideLoader())
      })
      .catch((err) => {
        // dispatch(hideLoader())
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: err.response.data.message,
            },
          });
      });
  };
};
