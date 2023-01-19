import { onUserLoginEvent } from './event/action';
import Cookies from 'js-cookie';
/**
 * get current language from locale
 */
export const getCurrentLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('i18nextLng');
  }
};

export const isGuestUser = () => {
  return Cookies.get('guestUser');
  // if (typeof window !== "undefined") {
  //   return localStorage.getItem("guestUser");
  // }
};

/**
 * set access token in axios instance header
 */
export const setAuthorizationToken = (token: string) => {
  if (token) {
    // request.defaults.headers.common[
    //   "accesstoken"
    // ] = `bearer ${token}`;
    // request.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    // delete request.defaults.headers.common["accesstoken"];
  }
};

/**
 * set user session in browser
 */
export const setSession = (payload: any) => {
  /**
   * remove guest user token
   */
  if (typeof window !== 'undefined') {
    localStorage.removeItem('guestUser');
    localStorage.removeItem('authToken');
  }
  for (var k in payload) {
    var isCurrentValObject = typeof payload[k] === 'object';
    if (isCurrentValObject && payload[k] !== null) {
      //if property is object then save it as string
      Cookies.set(k, JSON.stringify((payload as any)[k]));

      if (typeof window !== 'undefined') {
        localStorage.setItem(k, JSON.stringify((payload as any)[k]));
      }
    } else {
      Cookies.set(k, (payload as any)[k]);
      if (typeof window !== 'undefined') {
        localStorage.setItem(k, (payload as any)[k]);
      }
    }
  }
  // setAuthorizationToken(payload.authToken);
};

export const onUserLogin = (payload: any) => {
  onUserLoginEvent(payload);
};

export const removeSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
    sessionStorage.clear();
  }
  // window.location.href = '/'
};
/**
 * get user access token form loclastorage
 */

export const getAuthToken = () => {
  return Cookies.get('authToken');
  // if (typeof window !== "undefined") {
  //   // return localStorage.getItem("authToken");
  //   return Cookies.get("authToken");
  // } else {
  //   return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2M2EzZWQyYTQ2YWRlMzM4OGRlNjQ4YTkiLCJpc0xvZ2luIjp0cnVlLCJpc0d1ZXN0TG9naW4iOnRydWUsImlhdCI6MTY3MTY4NzQ2NiwiZXhwIjoxNjg3MjM5NDY2fQ.4Eg19HCDEGFUiw562m2nxA7T5WPHZb6bt0yZwfx6Xo0";
  // }
};

export const isAuthenticated = () => {
  if (Cookies.get('authToken') != null && Cookies.get('guestUser') === null) {
    return true;
  } else {
    return false;
  }
};
