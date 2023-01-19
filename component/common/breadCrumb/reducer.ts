import { BreadcrumModal } from '../../models';

const initialState = { data: '' };
export const breadCrumReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'saveLocationHistory':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
