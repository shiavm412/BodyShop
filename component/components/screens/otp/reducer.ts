
// import ActionName from "../../utils/actionName"

/**
 * Global Loading reducer
 */
const initialState = {
  show: false,
  email: '',
  mobileNo: '',
  countryCode: '',
  otpVia: '',
  type: '',
  OTP: '',
  currentDate: 0,
};
export const otpReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'send-otp':
      return { ...action.payload, show: true, currentDate: Date.now() };
    case 'verify-otp':
      return { ...state, ...action.payload };
    case 'hide-otp':
      return { ...state, ...action.payload, show: false, currentDate: 0 };
    case 'set-otp':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
