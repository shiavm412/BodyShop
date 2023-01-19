import Utils from '../../../../utils';
import { updateProfile } from '../../../../utils/event/action';
import request from '../../../../utils/request';
import { onUserLogin, removeSession } from '../../../../utils/session';

export function getUserProfile(callback?: Function) {
  let id = localStorage.getItem('userId');
  return (dispatch: any) => {
    let url = Utils.endPoints.USER_PROFILE;
    request
      .get(`${url}?userId=${id}`)
      .then((resp) => {
        let profileData = resp?.data?.data?.userInfo;
        onUserLogin({
          Name: profileData.fullName,
          Email: profileData.email,
          Phone: `${profileData.countryCode.indexOf('+') > -1 ? '' : '+'}${
            profileData.countryCode
          }${profileData.mobileNo}`,
          Identity: profileData.membershipNumber,
        });
        updateProfile(
          'Loyalty_Tier',
          resp?.data?.data.userInfo?.tierDetails?.currentTier
        );
        dispatch({
          type: 'getUserProfile',
          payload: { ...resp?.data?.data },
        });
        if (callback) callback();
        localStorage.setItem(
          'fullName',
          resp?.data?.data?.userInfo?.fullName || ''
        );
      })
      .catch((err) => {
        // dispatch(hideLoader());
        if (callback) callback();
        dispatch({
          type: 'show-alert',
          payload: {
            type: 'error',
            message: err?.response?.data?.message,
          },
        });
      });
  };
}

export function updateUserInfo(payload: any, callback: any) {
  let id = localStorage.getItem('userId');
  return (dispatch: any) => {
    // dispatch(showLoader());
    let url = Utils.endPoints.USER_PROFILE;
    request
      .put(`${url}?userId=${id}`, payload)
      .then((resp) => {
        if (resp) {
          if (callback) callback();
          // else dispatch(hideLoader());
        }
        // else dispatch(hideLoader());
        // dispatch({
        //     type: 'getUserProfile',
        //     payload: { ...resp.data.data }
        // });
      })
      .catch((err) => {
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: err.response.data.message,
            },
          });
        // dispatch(hideLoader());
      });
  };
}

export function sendOverallRating(payload: any, callback: any) {
  // let id = localStorage.getItem('userId')
  return (dispatch: any) => {
    // dispatch(showLoader());
    let url = Utils.endPoints.OVERALL_RATING;
    request
      .post(url, payload)
      .then((resp) => {
        if (resp) {
          if (callback) callback();
        }
        // dispatch(hideLoader());
        // dispatch({
        //     type: 'getUserProfile',
        //     payload: { ...resp.data.data }
        // });
      })
      .catch((err) => {
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: err.response.data.message,
            },
          });
        // dispatch(hideLoader());
      });
  };
}

export const changePassword = (payload: any, callback?: Function) => {
  return (dispatch: any) => {
    // dispatch(showLoader())

    let url = Utils.endPoints.CHANGE_PASSWORD;

    request
      .put(`${url}`, payload)
      .then((resp) => {
        if (resp) {
          if (callback) callback(resp);
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'success',
              message: resp?.data?.message,
            },
          });
        }
      })
      .catch((err) => {
        // dispatch(hideLoader())
        console.log('errMessage', err);

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

export function setFirstTimePassword(payload: any, callback?: Function) {
  return (dispatch: any) => {
    let url = Utils.endPoints.SET_PASSWORD;
    request
      .post(`${url}`, payload)
      .then((resp) => {
        if (resp) {
          if (callback) callback(resp);
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'success',
              message: resp?.data?.message,
            },
          });
        }
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
}

export function getNotification(callback?: Function) {
  let id = localStorage.getItem('userId');
  return (dispatch: any) => {
    let url = Utils.endPoints.GET_NOTIFICATION + '?userId=' + id;
    // dispatch(showLoader());
    request
      .get(`${url}`)
      .then((resp) => {
        if (callback) callback(resp?.data?.data || {});
        // dispatch(hideLoader())
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
}

export function updateNotification(payload: any, callback?: Function) {
  return (dispatch: any) => {
    let url = Utils.endPoints.PUT_NOTIFICATION;
    // dispatch(showLoader());
    request
      .put(`${url}`, payload)
      .then((resp) => {
        if (callback) callback(resp);
        // dispatch(hideLoader())
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
}
const header = Utils.CommonFunctions.getApiAuthHeader();

export const checkUser = (values: any, callback?: Function) => {
  let data = { type: 'email', email: values };
  return (dispatch: any) => {
    // dispatch(showLoader());
    request
      .post(Utils.endPoints.CHECK_USER, data, header)
      .then((resp) => {
        // dispatch(hideLoader());
        if (resp) {
          //   dispatch({
          //     type: "check-user",
          //     payload: { ...data, responseCode: resp.data.statusCode },
          //   });
          if (resp.data.statusCode !== Utils.statusCode.USER_NOT_EXIST) {
            dispatch({
              type: 'show-alert',
              payload: {
                type: 'error',
                message: 'Email already registered',
              },
            });
            if (callback) callback();
          } else {
            if (callback) callback('success');
          }
        }
      })
      .catch((err) => {
        // dispatch(hideLoader());
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
};

export const logout = (callback?: Function) => {
  return (dispatch: any) => {
    // dispatch(showLoader());
    request
      .patch(Utils.endPoints.LOGOUT)
      .then(() => {
        // dispatch(hideLoader());
        removeSession();
        dispatch({ type: 'RESET_STORE' });

        if (callback) callback();
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
