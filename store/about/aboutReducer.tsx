const aboutInitialState = {
  data: null,
};

export default function aboutReducer(state = aboutInitialState, action: any) {
  switch (action.type) {
    case "ABOUT_SUCCESS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
