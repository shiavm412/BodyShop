import Utils from '../../../utils';
import request from '../../../utils/request';

// send otp with token
export const sendOtp = (payload: any, callback?: Function) => {
  return (dispatch: any) => {
    // dispatch(showLoader());
    request
      .post(Utils.endPoints.GENERATE_OTP, payload)
      .then((resp) => {
        if (resp) {
          // dispatch({
          //     type: "send-otp",
          //     payload,
          // });
          if (callback) callback();
          if (resp?.data?.message)
            dispatch({
              type: 'show-alert',
              payload: {
                type: 'success',
                message: resp?.data?.message,
              },
            });
        }
        // dispatch(hideLoader());
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

export const verifyOtp = (payload: any, callback?: Function) => {
  return (dispatch: any) => {
    request
      .post(Utils.endPoints.CONFIRM_OTP, payload)
      .then((resp) => {
        if (resp) {
          if (callback) callback(resp?.data);
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'success',
              message: 'OTP verified successfully',
            },
          });
        }
      })
      .catch((err) => {
        if (callback) callback(err?.response?.data || {});
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
