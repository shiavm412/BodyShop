import { WishistModal } from '../../models';
import Utils from '../../utils';

const initialState = {
  data: [],
  totalCount: 0,
};
export const wishlistReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Utils.ActionName.WISHLIST:
      let data = action.payload.data ?? state.data;
      if (action.payload.page > 1)
        data = [...state.data, ...action.payload.data];
      return {
        ...state,
        ...action.payload,
        totalCount: action.payload.totalCount ?? state.totalCount,
        data,
      };
    case Utils.ActionName.WISHLIST_UPDATE:
      const index = state.data.findIndex(
        (item: any) => item._id === action.payload
      ); //finding index of the item
      state.data.splice(index, 1);
      return { ...state, totalCount: state.data.length };
    default:
      return state;
  }
};
