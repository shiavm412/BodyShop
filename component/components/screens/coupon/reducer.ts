const initialState = {
  mylist: [],
  otherList: [],
};
export const couponReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'getCouponList':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
