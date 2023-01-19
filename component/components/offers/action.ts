import { hideSkeleton } from "../../../store/home/action";
import Utils from "../../utils";
import request from "../../utils/request";


export function getProductOffers(params = `?page=1&limit=2`, callback?: Function) {
  return (dispatch: any, _getState: any) => {
    request.get(Utils.endPoints.PRODUCT_OFFERS + params).then((resp) => {
      if (resp) {
        if (callback)
          callback(false, resp)
        dispatch({
          type: 'getProductOffers',
          payload: resp.data.data
        });
      }
    })
      .catch((err) => {
        if (callback)
          callback(true, {})
        dispatch({
          type: "show-alert", payload: {
            type: "error",
            message: err.response.data.message
          }
        })
      });
  };
}

export function getPromotions(id: any) {
  const obj: any = { ':id': id };
  return (dispatch: any, _getState: any) => {
    let url = Utils.CommonFunctions.replaceUrlParams(Utils.endPoints.PROMOTIONS, obj)
    request.get(`${url}?page=1&limit=10`).then((resp) => {
        dispatch({
          type: 'getPromotions',
          payload: resp.data.data
        });
    })
      .catch((err) => {
        if (err?.response?.data?.message)
          dispatch({
            type: "show-alert", payload: {
              type: "error",
              message: err.response.data.message
            }
          })
      });
  };
}

export function getOffers(callback?: Function) {
  return (dispatch: any) => {
    request.get(Utils.endPoints.OFFERS).then((resp) => {
        if (callback)
          callback(resp?.data?.data || {})
      // dispatch({
      //   type: 'getProductOffers',
      //   payload: resp.data.data
      // });
      })
      .catch((_err) => {
        dispatch(hideSkeleton())

        // dispatch({
        //   type: "show-alert", payload: {
        //     type: "error",
        //     message: err.response.data.message
        //   }
        // })
      });
  };
}
