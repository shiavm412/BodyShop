import { productDetailReducer } from '../component/components/screens/productDetail/reducer';
import { productFilterReducer } from '../component/components/screens//productListing/reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import counter from './counter/reducer';
import users from './user/reducer';
import aboutReducer from './about/aboutReducer';
import { productReducer } from '../component/components/screens/productListing/reducer';
import { configReducer, homeReducer, loadingReducer } from './home/reducer';
import { recommendReducer } from '../component/common/recommendationCarousel/reducer';
import {
  addressReducer,
  shoppingBagReducer,
} from '../component/common/addToCart/reducer';
import { breadCrumReducer } from '../component/common/breadCrumb/reducer';
import { couponReducer } from '../component/components/screens/coupon/reducer';
import { giftReducer } from '../component/components/screens/giftCard/reducer';
import { otpReducer } from '../component/components/screens/otp/reducer';
import { offerReducer } from '../component/components/offers/reducer';
import { paymentReducer } from '../component/components/screens/payment/otherOptions/reducer';
import { ratingRecuer } from '../component/components/screens/rating&review/reducer';
import { userDetailReducer } from '../component/components/screens/account/profile/reducer';
import { wishlistReducer } from '../component/common/wishlist/reducer';

const combinedReducer = combineReducers({
  counter,
  users,
  homeReducer: homeReducer,
  configReducer: configReducer,
  loadingReducer: loadingReducer,
  aboutReducer,
  productReducer,
  productFilterReducer,
  // aboutReducer: aboutReducer,
  shoppingBagReducer: shoppingBagReducer,
  productDetailReducer,
  recommendReducer,

  // direct form react code
  about: aboutReducer,
  addressReducer: addressReducer,
  breadCrumReducer: breadCrumReducer,
  couponReducer: couponReducer,
  otpReducer: otpReducer,
  offerReducer: offerReducer,
  paymentReducer: paymentReducer,
  ratingRecuer: ratingRecuer,
  userDetailReducer: userDetailReducer,
  wishlistReducer: wishlistReducer,
});

// @ts-ignore
const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const initStore = () => {
  return createStore(
    masterReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
};

export const store = initStore();

export const wrapper = createWrapper(initStore);
