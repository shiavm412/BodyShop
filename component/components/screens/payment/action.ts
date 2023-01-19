import { hidePaytmCallbackLoader } from '../../../../store/home/action';
import { updateProfile } from '../../../utils/event/action';
import request from '../../../utils/request';
import Utils from '../../../utils';

export const placeOrder = (payload: any, callback?: Function) => {
    return (dispatch: any, _getState: any) => {

        let url = Utils.endPoints.ORDERS
        request
            .post(url, payload)
            .then((resp:any) => {
                if (callback) {
                    callback(resp?.data?.data || {});
                    let transactionType = resp?.data?.data?.orderCount < 2 ? 'first_transaction_date':'last_transaction_date'
                    updateProfile(transactionType, Utils.CommonFunctions.unixToDate(
                        Date.now(),
                        "DD/MM/YYYY, HH:mm:ss"
                    ))
                    updateProfile('total_transactions', resp?.data?.data?.orderCount)
                    updateProfile('last_transaction_value', resp?.data?.data?.grandTotal)
                    updateProfile('last_transaction_channel', resp?.config?.headers?.platform)
                } else {
                    // dispatch(hideLoader())
                    dispatch(hidePaytmCallbackLoader())
                }
                // dispatch({
                //   type: "orderHistory",
                //   payload: resp.data?.data,
                // });
                // dispatch({
                //     type: "show-alert",
                //     payload: {
                //         type: "success",
                //         message: 'Order has been placed successfully',
                //         // position: "center"
                //     }
                // })
                // dispatch(hideLoader())

            })
            .catch((err:any) => {
                // dispatch(hideLoader());
                // dispatch(hideSkeleton());
                dispatch(hidePaytmCallbackLoader())

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

export const getWalletBalance = (callback?: Function) => {
    return (dispatch: any, _getState: any) => {
        let url = Utils.endPoints.WALLET_BALANCE
        request
            .get(url)
            .then((resp:any) => {
                if (callback)
                callback(resp?.data?.data || {})

                updateProfile('current_wallet_balance',resp?.data?.data?.totalAmount)

                dispatch({
                  type: "walletBalance",
                  payload: resp.data?.data?.totalAmount,
                });
                // dispatch({
                //     type: "show-alert",
                //     payload: {
                //         type: "success",
                //         message: 'Order has been placed successfully',
                //         // position: "center"
                //     }
                // })
                // dispatch(hideLoader())

            })
            .catch((err:any) => {
                if (callback)
                    callback({})
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

export const getWalletHistory = (payload: any, callback: Function) => {
    return (dispatch: any, _getState: any) => {
        let url = Utils.endPoints.WALLET_HISTORY
        request
            .post(url, payload)
            .then((resp:any) => {
                if (resp) {
                    if (callback)
                        callback(resp?.data?.data || {});
                } else {
                    // dispatch(hideLoader())
                }
                // dispatch({
                //   type: "orderHistory",
                //   payload: resp.data?.data,
                // });
                // dispatch({
                //     type: "show-alert",
                //     payload: {
                //         type: "success",
                //         message: 'Order has been placed successfully',
                //         // position: "center"
                //     }
                // })
                // dispatch(hideLoader())

            })
            .catch((err:any) => {
                // dispatch(hideSkeleton())

                if (callback)
                    callback({})
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

export const rewardBlock = (payload: any, callback?: Function) => {
    return (dispatch: any) => {
        let url = Utils.endPoints.REWARD_BLOCK
        request
            .post(url, payload)
            .then((resp:any) => {
                if (resp) {
                    if (callback) {
                        callback(resp?.data?.data || {});
                    } else {
                        // dispatch(hideLoader())
                    }
                }

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


export const rewardUnBlock = (payload: any, callback?: Function) => {
    return (dispatch: any) => {
        let url = Utils.endPoints.REWARD_UNBLOCK
        request
            .post(url, payload)
            .then((resp:any) => {
                if (resp) {
                    dispatch({type:"isPointsBlocked",payload:false})
                    if (callback) {
                        callback(resp?.data?.data || {});
                    } else {
                        // dispatch(hideLoader())
                    }
                }

            })
            .catch((err:any) => {
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