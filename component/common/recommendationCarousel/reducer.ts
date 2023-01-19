export const recommendReducer = (
  state: any = { recomendationData: {} },
  action: any
) => {
  switch (action.type) {
    case 'recommend-data':
      const payload = Object.assign({}, action.payload);
      return {
        ...state,
        recommendedData: { ...payload },
      };
    case 'recommend.update':
      const index = state.recommendedData.data.findIndex(
        (item: any) => item._id === action.payload._id
      ); //finding index of the item
      if (index > -1) {
        const newArray = [...state.recommendedData.data]; //making a new array
        newArray[index].isWishlisted = action.payload.isWishlisted; //changing value in the new array
        newArray[index].wishlists = action.payload.wishlists; //changing value in the new array
        state.recommendedData.data = newArray;
      }

      return { ...state };
    default:
      return state;
  }
};
