import Utils from '../../../utils';
import request from '../../../utils/request';
import { getShoppingBagList } from '../../../common/addToCart/action';
import {
  hideLoader,
  hideSkeleton,
} from '../../../../store/home/action';

function multiSearchOr(text: any, searchWords: any) {
  for (var i = 0; i < searchWords.length; i++) {
    if (text.indexOf(searchWords[i]) == -1) return false;
  }
  return true;
}
export const getProductData =
  (params: any, authToken: any) => async (dispatch: any) => {
    let url = Utils.endPoints.PRODUCT_DATA;
    let { subcategory, googleKey, val } = params;

    let urlNew;
    if (googleKey != undefined) {
      urlNew = `${Utils.endPoints.PRODUCT_DATA}?subcategoryId=${Number(
        val
      )}&urlKey=${subcategory}`;
    } else {
      urlNew = `${Utils.endPoints.PRODUCT_DATA}?subcategoryId=${Number(
        val
      )}&urlKey=${subcategory}`;
    }

    let resp = await request.get(urlNew, {
      headers: { Authorization: 'Bearer ' + authToken },
    });

    if (resp) {
      var product = resp && resp.data && resp.data.data && resp.data.data;
      var selectedVariant = null;
      var selectedVariantData: any = null;

      if (
        product &&
        product.product &&
        product.product.type === 'configurable'
      ) {
        const links =
          product &&
          product.product &&
          product.product.configurableProductLinks?.sort(
            (a: any, b: any) => a?.price - b?.price
          );
        //  ==== edit this part for display data correct
        selectedVariantData = links?.filter((item: any) => {
          if (item.isInStock) {
            return item.urlKey === subcategory;
          } else {
            return (
              product &&
              product.product &&
              product.product?.configurableProductLinks
            );
          }
        });
        console.log(product.product.configurableProductOptions?.[0]?.values, "product")

        // test code
        let searchValue = subcategory
          .replaceAll('-', ' ')
          .split(' ')
          .reverse()[0];
        selectedVariant =
          product.product.configurableProductOptions?.[0]?.values &&
          product?.product?.configurableProductOptions?.[0]?.values.find(
            (val: any) => {
              return multiSearchOr(val.label.toLowerCase(), searchValue);
            }
          );
      } else {
        selectedVariantData = product.product;
      }

      dispatch({
        type: 'getProductData',
        payload: {
          ...product,
          selectedVariant: selectedVariant ? selectedVariant : {},
          selectedVariantData: selectedVariantData[0],
        },
      });
    }
  };

export const addToBag = (payload: any) => {
  return (dispatch: any, _getState: any) => {
    // dispatch(showLoader());
    let url = Utils.endPoints.ADD_TO_BAG;
    request
      .post(url, payload)
      .then((resp) => {
        if (resp) {
          // dispatch(hideLoader());
        }
        // dispatch({
        //   type: 'addToCart',
        //   payload: resp.data.data
        // });
        // dispatch({
        //   type: "show-alert", payload: {
        //     type: "success",
        //     message: "Product added to Bag successfully"
        //   }
        // })
      })
      .catch((err) => {
        dispatch(hideLoader());
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: err.response.data.message,
            },
          });
        // dispatch({
        //   type: 'addToCart',
        //   payload: "Unable to add"
        // });
      });
  };
};

export function storePriceInformation(params: any, dispatch: any) {
  let data = { priceData: params };
  dispatch({
    type: 'storePriceInformation',
    payload: data,
  });
}

export function addCompleteYourRoutine(params: any) {
  let data: any = params;
  return (dispatch: any, _getState: any) => {
    // dispatch(showLoader());
    let url = Utils.CommonFunctions.replaceUrlParams(
      Utils.endPoints.ADD_ROUTINE,
      data
    );
    request
      .post(url, data)
      .then((resp) => {
        if (resp) {
          if (resp.status === 201) {
            dispatch({
              type: 'show-alert',
              payload: {
                type: 'success',
                message: resp.data.message,
              },
            });
            dispatch(getShoppingBagList());
          }
        }
        dispatch(hideLoader());
      })
      .catch((err) => {
        dispatch(hideLoader());
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

export function checkStock(status: any, dispatch: any) {
  dispatch({
    type: 'checkStock',
    payload: status,
  });
}

export function checkPincode(value: any) {
  return request.post(Utils.endPoints.CHECK_PINCODE, value);
}

export function getReviews(params: any, callback?: Function) {
  return async (dispatch: any) => {
    let url = Utils.endPoints.REVIEWS + params;
    request
      .get(url)
      .then((resp) => {
        dispatch({
          type: 'product-reviews',
          payload: {
            ...resp.data.data,
          },
        });
        if (callback) callback(resp?.data?.data);
      })
      .catch((_err) => {
        dispatch(hideLoader());
        dispatch(hideSkeleton());
        // dispatch({
        //   type: "show-alert", payload: {
        //     type: "error",
        //     message: "Product not found"
        //   }
        // })
        // dispatch({
        //   type: 'productNotFound'
        // });
      });
  };
}

export function submitQuestionsPoll(params: any, callback?: Function) {
  return (dispatch: any, _getState: any) => {
    // dispatch(showLoader());
    let url = Utils.endPoints.QUESTIONS_POLL;
    request
      .post(url, params)
      .then((resp) => {
        if (resp) {
          if (resp?.data?.message)
            dispatch({
              type: 'show-alert',
              payload: {
                type: 'success',
                message: resp.data.message,
              },
            });
          if (callback) callback();
        }
        dispatch(hideLoader());
      })
      .catch((err) => {
        dispatch(hideLoader());
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

export function submitReviewPoll(params: any, callback?: Function) {
  return (dispatch: any, _getState: any) => {
    // dispatch(showLoader());
    let url = Utils.endPoints.REVIEW_POLL;
    request
      .post(url, params)
      .then((resp) => {
        if (resp) {
          if (resp?.data?.message)
            dispatch({
              type: 'show-alert',
              payload: {
                type: 'success',
                message: resp.data.message,
              },
            });
          if (callback) callback();
        }
        dispatch(hideLoader());
      })
      .catch((err) => {
        dispatch(hideLoader());
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

export function submitReviewReport(params: any, callback?: Function) {
  return (dispatch: any, _getState: any) => {
    // dispatch(showLoader());
    let url = Utils.endPoints.REVIEW_REPORT;
    request
      .post(url, params)
      .then((resp) => {
        if (resp) {
          if (resp?.data?.message)
            dispatch({
              type: 'show-alert',
              payload: {
                type: 'success',
                message: resp.data.message,
              },
            });
          if (callback) callback();
        }
        dispatch(hideLoader());
      })
      .catch((err) => {
        dispatch(hideLoader());
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

export function getRewardRate(callback?: Function) {
  return (dispatch: any) => {
    let url = Utils.endPoints.REWARD_POINT_RATE;
    request
      .get(url)
      .then((resp) => {
        if (callback) callback(resp?.data?.data);
      })
      .catch((err) => {
        dispatch(hideLoader());
        if (callback) callback();
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
