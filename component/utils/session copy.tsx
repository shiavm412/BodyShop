import { onUserLoginEvent } from "./event/action";
/**
 * get current language from locale
 */
export const getCurrentLanguage = () => {
  if (typeof window !== 'undefined') {
  return localStorage.getItem("i18nextLng");
  }
};

export const isGuestUser = () => {
  if (typeof window !== 'undefined') {
  return localStorage.getItem("guestUser")
  }
}

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
  localStorage.removeItem("guestUser");
  localStorage.removeItem("authToken");
   }
  for (var k in payload) {
    var isCurrentValObject = typeof payload[k] === "object";
    if (isCurrentValObject && payload[k] !== null) {
      //if property is object then save it as string
      if (typeof window !== 'undefined') {
      localStorage.setItem(k, JSON.stringify((payload as any)[k]));
      }
    } else {
      if (typeof window !== 'undefined') {
      localStorage.setItem(k, (payload as any)[k]);
      }
    }
  }
  // setAuthorizationToken(payload.authToken);
};

export const onUserLogin = (payload: any) => {
  onUserLoginEvent(payload)
};

export const removeSession = () => {
  if (typeof window !== 'undefined') {
  localStorage.clear();
  sessionStorage.clear()
  }
  // window.location.href = '/'
};
/**
 * get user access token form loclastorage
 */
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
  return localStorage.getItem("authToken");
  }
};



export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
  if (localStorage.getItem("authToken") != null && localStorage.getItem("guestUser") === null) {
    return true
  } else {
    return false;
  }
}
};
