const initialState = {
  userInfo: {},
  lybcInfo: '',
  dashboard: {},
  walletBalance: '',
  verifyModal: false,
  resetStore: '',
};

export const userDetailReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'getUserProfile':
      const userInfo = { ...action.payload?.userInfo };
      return {
        ...state,
        userInfo: {
          ...userInfo,
          walletId: userInfo?.walletId,
          skinType: [...userInfo.skinType],
        },
      };
    case 'updateUserProfile':
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload.userInfo },
      };
    case 'dashboard':
      return { ...state, dashboard: { ...state.dashboard, ...action.payload } };
    case 'walletBalance':
      return { ...state, walletBalance: action.payload };
    case 'verifyModal':
      return { ...state, verifyModal: action.payload };
    case 'RESET_STORE':
      return { ...state, resetStore: action };
    default:
      return state;
  }
};
