import { ShoppingBagModal, AddressModal } from '../../models';

const initialState = {
  items: [],
  _id: '',
  donation: {
    donationType: 'checkout_section',
    donationAmount: 0,
  },
  freeProductCount: 0,
  freeSampleCount: 0,
  totalItems: 0,
  isMembershipAdded: false,
  blocked: false,
  isWhatsAppConsent: false,
};
export const shoppingBagReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'getShoppingBagList':
      return { ...action.payload };
    case 'updateCart':
      return {
        ...state,
        ...action.payload,
        isPointsBlocked: action.payload?.isPointsBlocked,
        pointDetails: { ...action.payload?.pointDetails } || {},
        totalWithoutWallet: action.payload.totalWithoutWallet || 0,
        shipping: { ...action.payload.shipping },
      };
    // case "isPointsBlocked":
    //     return { ...state, blocked: action.payload };
    case 'clearCart':
      return new ShoppingBagModal();
    default:
      return state;
  }
};

const initialStateAddress = {
  address: '',
  checkoutAddressId: null,
  addressFlag: null,
};
export const addressReducer = (state = initialStateAddress, action: any) => {
  switch (action.type) {
    case 'address':
      return { ...state, address: [...action.payload] };
    case 'checkoutAddressId':
      return { ...state, checkoutAddressId: action.payload };
    case 'addressFlag':
      return { ...state, addressFlag: action.payload };
    default:
      return state;
  }
};
