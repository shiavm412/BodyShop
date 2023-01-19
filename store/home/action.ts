import Utils from '../../component/utils';
import request from '../../component/utils/request';
import ActionName from '../../component/utils/actionName';
import Cookies from 'js-cookie';

export function showSkeleton() {
  return {
    type: ActionName.SKELETON_LOADING,
    payload: { skeletonLoader: true },
  };
}
export function hideSkeleton() {
  return {
    type: ActionName.SKELETON_LOADING,
    payload: { skeletonLoader: false },
  };
}

export function showLoader() {
  return { type: ActionName.LOADING, payload: { isLoading: true } };
}
export function hideLoader() {
  return { type: ActionName.LOADING, payload: { isLoading: false } };
}

export function showPaytmCallbackLoader() {
  return { type: ActionName.LOADING, payload: { paytmLoader: true } };
}
export function hidePaytmCallbackLoader() {
  return { type: ActionName.LOADING, payload: { paytmLoader: false } };
}

export const getLatestReviews = (query: string) => {
  return request.get(Utils.endPoints.LATEST_REVIEWS + query);
};

const filterDataForWeb = (data: any) => {
  const webData = data.filter(
    (obj: any) => obj.ui_type === 'web' || obj.ui_type === 'both'
  );
  return webData;
};
const filterDataForMobile = (data: any) => {
  const mobileData = data.filter(
    (obj: any) => obj.ui_type === 'mobile' || obj.ui_type === 'both'
  );
  return mobileData;
};

export const getHomeData =
  (token: any, callback?: Function) => async (dispatch: any) => {
    let resp = await request.get(Utils.endPoints.HOME, {
      headers: { Authorization: 'Bearer ' + token },
    });
    if (resp) {
      const data = [...resp?.data?.data];

      const webData = filterDataForWeb(data);
      const sortedData = webData.sort((a: any, b: any) => {
        return Number(a.position) - Number(b.position);
      });
      dispatch({
        type: 'getHomeData',
        payload: sortedData,
      });

      const mobileData = filterDataForMobile(data);
      const sortedMobileData = mobileData.sort((a: any, b: any) => {
        return Number(a?.position) - Number(b?.position);
      });

      dispatch({
        type: 'getMobileHomeData',
        payload: sortedMobileData,
      });
      if (callback) {
        callback(resp?.data?.data);
      }
    }
  };

export const getAuthToken = () => async (dispatch: any) => {
  let resp = await request.post(Utils.endPoints.GUEST_SIGNUP);

  if (resp) {
    dispatch({
      type: 'auth-token',
      payload: resp?.data?.data?.authToken,
    });
    Cookies.set('authToken', resp.data.data?.authToken);
    Cookies.set('guestUser', 'true');
  }
};

export const getConfig = (payload: any) => {
  return (dispatch: any, _setState: any) => {
    request.get(Utils.endPoints.CONFIG, { params: payload }).then((resp) => {
      if (payload.configCode === 'general') {
        // localStorage.setItem("underMaintenance", resp.data.data.underMaintenance)
        dispatch({
          type: 'setConfig',
          payload: { generalConfigs: resp.data.data },
        });
      } else {
        dispatch({
          type: 'setConfig',
          payload: { paymentConfigs: resp.data.data },
        });
      }
    });
  };
};

export const getRatingData = (query: string, callback: Function) => {
  return (dispatch: any, _getState: any) => {
    let url = Utils.endPoints.RATE_ORDERS;
    request
      .get(url + query)
      .then((resp) => {
        if (callback) {
          callback(resp?.data?.data);
        }
      })
      .catch((_err) => {
        dispatch(hideLoader());
        dispatch(hideSkeleton());
      });
  };
};

export const getTopSearch = () => {
  let url = Utils.endPoints.TOP_SEARCH;
  return request.get(url);
};
export const userSearch = (params: any) => {
  let url = Utils.endPoints.USER_SEARCH;
  return request.get(url, { params });
};
