const initialState = {
  paytm: {},
};
export const paymentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'init-transaction':
      return { ...state, ...action.payload };
    case 'reset-transaction':
      return initialState;
    default:
      return state;
  }
};
