/**
 * Global Loading reducer
 */
const initialState = {
  data: [],
};
export const ratingRecuer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'set-rating-data':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
