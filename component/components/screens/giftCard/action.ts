import Utils from '../../../utils';
import request from '../../../utils/request';

export const getGiftCardData = (callback?: Function) => {
  return (dispatch: any, _getState: any) => {
    let url = Utils.endPoints.GIFT_CARD;
    request
      .get(url)
      .then((resp) => {
        if (callback) callback(resp?.data?.data || {});
        dispatch({
          type: 'eGiftCard',
          payload: resp.data?.data,
        });
      })
      .catch((err) => {
        // dispatch(hideSkeleton());
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
export const getGiftCardHomeData = (slug: string, callback?: Function) => {
  return (dispatch: any, _getState: any) => {
    let url = `${Utils.endPoints.GIFT_CARD_HOME}/${slug}`;
    request
      .get(url)
      .then((resp) => {
        if (callback) callback(resp?.data?.data || {});

        // dispatch({
        //   type: "eGiftCard",
        //   payload: resp.data?.data,
        // });
      })
      .catch((_err) => {
        // dispatch(hideSkeleton())
      });
  };
};

export const addGiftCard = (payload: any, callback?: Function) => {
  return (dispatch: any, _getState: any) => {
    // dispatch(showLoader())
    let url = Utils.endPoints.GIFT_CARD;
    request
      .post(url, payload)
      .then((resp) => {
        if (resp) {
          if (callback) callback();
          // dispatch(hideLoader())
          dispatch({ type: 'eCardSummary', payload: resp?.data?.data || {} });
        } else {
        }
        // dispatch(hideLoader())
      })
      .catch((err) => {
        // dispatch(hideLoader());
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

export const checkEcardBalance = (payload: any, callback?: Function) => {
  return (dispatch: any, _getState: any) => {
    // dispatch(showLoader())

    let url = Utils.endPoints.CHECK_BALANCE;
    request
      .post(url, payload)
      .then((resp) => {
        if (resp) {
          if (callback) callback(resp?.data?.data || {});
        }
        // dispatch(hideLoader())
      })
      .catch((err) => {
        if (callback && err?.response?.data?.message)
          callback({ errorMessage: err.response.data.message });
        // if (err?.response?.data?.message)
        //   dispatch({
        //     type: "show-alert",
        //     payload: {
        //       type: "info",
        //       message: err.response.data.message,
        //       position: "center"
        //     }
        //   })
        // dispatch(hideLoader())
      });
  };
};

export const redeemBalance = (payload: any, callback?: Function) => {
  return (dispatch: any, _getState: any) => {
    // dispatch(showLoader())

    let url = Utils.endPoints.REDEEM_GIFT_CARD;
    request
      .post(url, payload)
      .then((resp) => {
        if (resp) {
          if (callback) callback(resp?.data?.data || {});
        }
        // dispatch(hideLoader())
        // if(callback)
        // callback(resp?.data?.data||{})
        // dispatch({
        //   type: "eGiftCard",
        //   payload: resp.data?.data,
        // });
      })
      .catch((err) => {
        if (callback && err?.response?.data?.message)
          callback({ errorMessage: err.response.data.message });

        // if (err?.response?.data?.message)
        //   dispatch({
        //     type: "show-alert",
        //     payload: {
        //       type: "info",
        //       message: err.response.data.message,
        //       position: "center"
        //     }
        //   })

        // dispatch(hideLoader())
      });
  };
};

export const addCorporateGift = (payload: any, callback?: Function) => {
  return (dispatch: any, _getState: any) => {
    // dispatch(showLoader())

    let url = Utils.endPoints.CORPORATE_GIFT_CARD;
    request
      .post(url, payload)
      .then((resp) => {
        if (resp) {
          if (callback) callback(resp?.data?.data || {});
        }
        // dispatch(hideLoader())
        // if(callback)
        // callback(resp?.data?.data||{})
        // dispatch({
        //   type: "eGiftCard",
        //   payload: resp.data?.data,
        // });
      })
      .catch((err) => {
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'info',
              message: err.response.data.message,
              position: 'center',
            },
          });

        // dispatch(hideLoader())
      });
  };
};

export const validateCardNumber = (cardNumber: any, callback?: Function) => {
  return (dispatch: any, _getState: any) => {
    // dispatch(showLoader());
    let url = `${Utils.endPoints.GIFT_CARD_VALIDITY}?cardNumber=${cardNumber}`;
    request
      .get(url)
      .then((resp) => {
        if (callback) callback(resp?.data || {});
        if (resp?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'info',
              message: resp.data.message,
              position: 'center',
            },
          });
        // dispatch(hideLoader())
      })
      .catch((err) => {
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'info',
              message: err.response.data.message,
              position: 'center',
            },
          });
        // dispatch(hideLoader())
      });
  };
};

export const getCardType = (card: any, callback: any) => {
  return async (dispatch: any, _getState: any) => {
    // dispatch(showLoader());
    let url = `${Utils.endPoints.CARD_TYPE}?cardNumber=${card}`;
    await request
      .get(url)
      .then((resp) => {
        if (callback) callback(resp?.data || {});
        if (resp?.data?.data?.error && resp?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: resp.data.message,
              position: 'center',
            },
          });
        // dispatch(hideLoader())
      })
      .catch((err) => {
        if (callback) callback(err?.response);
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'info',
              message: err.response.data.message,
              position: 'center',
            },
          });
        // dispatch(hideLoader())
      });
  };
};
export const sendOtpForCardNumber = (payload: any) => {
  return (dispatch: any) => {
    // dispatch(showLoader());
    // let { countryCode, email, mobileNo, otpVia, type } = otpData;
    request
      .post(Utils.endPoints.GIFT_CARD_SEND_OTP, payload)
      .then((resp) => {
        // dispatch(hideLoader());
        if (resp)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'info',
              message: resp.data.message,
              position: 'center',
            },
          });
      })
      .catch((err) => {
        // dispatch(hideLoader());
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
