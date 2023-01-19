import request from '../../utils/request';
import Utils from '../../utils';
import {
  hideLoader,
  hideSkeleton,
  showLoader,
} from '../../../store/home/action';

export const getShoppingBagList = (params?: any, callback?: Function) => {
  return (dispatch: any, _getState: any) => {
    let url = Utils.endPoints.ADD_TO_BAG;
    request
      .get(url, { params })
      .then((resp) => {
        if (resp) {
          if (callback) {
            callback(resp);
          }
          dispatch({
            type: 'getShoppingBagList',
            payload: { ...resp.data.data },
          });
        }
        dispatch(hideLoader());
      })
      .catch((_err) => {
        dispatch(hideLoader());
        dispatch(hideSkeleton());
      });
  };
};

export const addToBag = (
  payload: any,
  callback?: Function,
  shoppingListCallback?: Function
) => {
  return (dispatch: any, _getState: any) => {
    dispatch(showLoader());
    let url = Utils.endPoints.ADD_TO_BAG;
    // delete payload.isSearchOrRecommend
    request
      .post(url, payload)
      .then((resp) => {
        if (resp) {
          dispatch(getShoppingBagList(null, shoppingListCallback));
          if (!shoppingListCallback) dispatch(hideLoader());
          if (callback) {
            callback();
          }
        } else {
          dispatch(hideLoader());
        }
      })
      .catch((err) => {
        dispatch(hideLoader());

        dispatch({
          type: 'show-alert',
          payload: {
            type: 'error',
            message: err?.response?.data?.message,
          },
        });
      });
  };
};

export const deleteProduct = (
  cartId: any,
  callback?: Function,
  _flag?: string
) => {
  return (dispatch: any, _getState: any) => {
    let url = Utils.endPoints.ADD_TO_BAG + '/' + cartId;

    request
      .delete(url)
      .then((_resp) => {
        dispatch({
          type: 'show-alert',
          payload: {
            type: 'success',
            message: 'Product removed from Bag successfully',
          },
        });
        dispatch(getShoppingBagList({}, callback));
      })
      .catch((_err) => {
        dispatch(hideLoader());

        //   dispatch({
        //     type: "show-alert", payload: {
        //       type: "failure",
        //       message: "Failed to add product to the Bag"
        //     }
        //   })
      });
  };
};

export const changeProductQuantity =
  (payload: any, callback?: Function) =>
  async (dispatch: any, _getState: any) => {
    dispatch(showLoader());

    let url = Utils.endPoints.ADD_TO_BAG;

    request
      .put(url, payload)
      .then((resp) => {
        if (!callback) dispatch(hideLoader());
        // dispatch({
        //   type: "show-alert", payload: {
        //     type: "success",
        //     message: "Product removed from Bag successfully"
        //   }
        // })
        if (resp) {
          dispatch(getShoppingBagList(null, callback));
        }
      })
      .catch((err) => {
        dispatch(hideLoader());

        dispatch({
          type: 'show-alert',
          payload: {
            type: 'error',
            // message: "Failed to add product to the Bag"
            message: err?.response?.data?.message,
          },
        });
      });
  };

// --------ADDRESS APIS----------------
export const addAddress = (payload: any, callback?: Function) => {
  return (dispatch: any, _getState: any) => {
    let url = Utils.endPoints.ADDRESS;
    request
      .post(url, payload)
      .then((resp) => {
        if (resp) {
          if (callback) dispatch(getAddress(callback));
          else dispatch(getAddress());
        } else {
          dispatch(hideLoader());
        }
      })
      .catch((_err) => {
        dispatch(hideLoader());
      });
  };
};
export const editAddress = (payload: any, callback?: Function) => {
  return (dispatch: any, _getState: any) => {
    let url = Utils.endPoints.ADDRESS;
    request
      .put(url, payload)
      .then((resp) => {
        if (resp) {
          if (callback) dispatch(getAddress(callback));
          else dispatch(getAddress());
        } else {
          dispatch(hideLoader());
        }
      })
      .catch((_err) => {
        dispatch(hideLoader());
      });
  };
};
// export const getAddress = () => {
//     return (dispatch: any, getState: any) => {
//         let url = Utils.endPoints.ADDRESS
//         request.get(url)
//             .then((resp) => {
//                 dispatch(hideLoader())

//             })
//             .catch((err) => {
//                 dispatch(hideLoader())

//             });
//     };
// };

export const getAddress = (callback?: Function) => {
  return (dispatch: any, _getState: any) => {
    dispatch(showLoader());
    let url = Utils.endPoints.ADDRESS;
    request
      .get(url)
      .then((resp) => {
        if (callback) {
          callback(resp);
        }
        dispatch({
          type: 'address',
          payload: [...resp.data.data],
        });
        dispatch(hideLoader());
      })
      .catch((_err) => {
        dispatch(hideLoader());
      });
  };
};

export const deleteAddress = (id: any, callback?: Function) => {
  return (dispatch: any, _getState: any) => {
    let url = Utils.endPoints.ADDRESS + '/' + id;
    request
      .delete(url)
      .then((resp) => {
        if (resp) {
          dispatch(getAddress(callback));
        } else {
          dispatch(hideLoader());
        }
      })
      .catch((_err) => {
        dispatch(hideLoader());
      });
  };
};
