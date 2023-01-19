const clevertap = typeof window !== "undefined" && require("clevertap-web-sdk");
import { isGuestUser } from "../session";
import Events from "./constant";
import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA79lQSPm1NNUGRjGTibCsjr4X3mzQrFxA",
  projectId: "bodyshop-322001",
  appId: "1:396804377443:web:e0f8b945d44647f8c2e156",
};

// Initialize Firebase
initializeApp(firebaseConfig);

let analytics: Analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics();
}

const firebaseEventLogger = (eventName: any, payload: any) => {
  logEvent(analytics, eventName, payload);
};

const createProfile = () => {
  //@ts-ignore
  if (typeof window !== "undefined") {
    var profile = {
      Site: {
        Name: localStorage.getItem("fullName"),
        Email: localStorage.getItem("email"),
        Identity: localStorage.getItem("membershipNumber"),
        // Phone: localStorage.getItem("mobileNo")
        Phone: `${
          localStorage?.getItem("countryCode")?.indexOf("+") === 0 ? "" : "+"
        }${localStorage.getItem("countryCode")}${localStorage.getItem(
          "mobileNo"
        )}`,
        push_pause_all: false,
        push_order_status: false,
        push_offers: false,
        push_payments: false,
      },
    };
    if (!isGuestUser()) {
      clevertap.profile.push(profile);
    }
  }
};

export const onUserLoginEvent = (payload: any) => {
  clevertap?.onUserLogin?.push({
    Site: payload,
  });
};

export const handleIPpermissions = () => {
  clevertap.privacy.push({ useIP: true });
};

export const updateProfile = (keyType: string, data: any) => {
  let profileData = {
    Site: {
      [keyType]: data,
    },
  };
  clevertap.profile.push(profileData);
};

export const updateProfileMultiple = (payload: any) => {
  let profileData = {
    Site: payload,
  };
  clevertap.profile.push(profileData);
};

export const updateProfileAttributes = (payload: {
  Name: string;
  Phone: string;
  DOB: any;
  Email: string;
  Gender: string;
}) => {
  const profileData = {
    Site: payload,
  };
  clevertap.profile.push(profileData);
};

export const normalSignup = (payload: {
  Identity: string;
  Userstatus: string;
  DOB: any;
  UserName: string;
  PhoneNo: string;
  EmailID: string;
  Gender: string;
  RegistrationType: string;
  RegistrationPlaform: string;
  "Wallet Id": string;
  ZendeskId: string;
  // CreatedAt: string,
  TierType: string;
  DeviceDetails: string;
  // UserId: string,
  is_social_signup: boolean;
}) => {
  createProfile();
  clevertap.event.push(Events.EVENT_NORMAL_SIGN_UP, payload);

  firebaseEventLogger(Events.EVENT_NORMAL_SIGN_UP, payload);
};

export const socialSignup = (payload: {
  Identity: string;
  socialId: string;
  Userstatus: string;
  DOB: any;
  UserName: string;
  PhoneNo: string;
  EmailID: string;
  Gender: string;
  RegistrationType: string;
  RegistrationPlaform: string;
  "Wallet Id": string;
  ZendeskId: string;
  // CreatedAt: string,
  TierType: string;
  DeviceDetails: string;
  // UserId: string,
  is_social_signup: boolean;
  socialPlatform: string;
}) => {
  createProfile();
  clevertap.event.push(Events.EVENT_SOCIAL_SIGNUP, payload);

  firebaseEventLogger(Events.EVENT_SOCIAL_SIGNUP, payload);
};

export const Logout = (payload: { Platform: string }) => {
  // if (!isGuestUser()) {
  //     createProfile()
  // }

  clevertap.clear();
  clevertap.logout();

  clevertap.event.push(Events.EVENT_LOGOUT, payload);

  firebaseEventLogger(Events.EVENT_LOGOUT, payload);
};

export const normalLogin = (payload: {
  PhoneNo: string;
  EmailID: string;
  TierType: string;
  DeviceDetails: string;
  is_social_login: boolean;
  Platform: string;
}) => {
  if (!isGuestUser()) {
    createProfile();
  }

  clevertap.event.push(Events.EVENT_NORMAL_LOGIN, payload);
};

export const socialLogin = (payload: {
  socialId: string;
  PhoneNo: string;
  EmailID: string;
  TierType: string;
  DeviceDetails: string;
  is_social_login: boolean;
  Platform: string;
  push_pause_all: boolean;
  push_order_status: boolean;
  push_offers: boolean;
  push_payments: boolean;
}) => {
  if (!isGuestUser()) {
    createProfile();
  }
  clevertap.event.push(Events.EVENT_SOCIAL_LOGIN, payload);

  firebaseEventLogger(Events.EVENT_SOCIAL_LOGIN, payload);
};

export const location = (payload: {
  Location: string;
  // CreatedAt: string
  // UserId: string
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_LOCATION, payload);
  firebaseEventLogger(Events.EVENT_LOCATION, payload);
};

export const searchProducts = (payload: {
  SearchKey: string;
  NoOfSearchResults?: string;
  NoOfOutofStock?: string;
  FromScreen: string;
  ClickBehaviour: string;
}) => {
  if (!isGuestUser()) createProfile();

  clevertap.event.push(Events.EVENT_SEARCH, payload);

  firebaseEventLogger(Events.EVENT_SEARCH, payload);
};

export const screenViewed = (payload: {
  ScreenName: string;
  CTGenerated: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_SCREEN_VIEWED, payload);

  firebaseEventLogger(Events.EVENT_SCREEN_VIEWED, payload);
};

export const categoryViewed = (payload: {
  CategoryID: string;
  // CreatedAt: string;
  CategoryName: string;
  // UserId: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_CATEGORY_VIEW, payload);

  firebaseEventLogger(Events.EVENT_CATEGORY_VIEW, payload);
};

export const productViewed = (payload: {
  ProductId: string;
  Category: any;
  ProductName: string;
  FromScreen: string;
  ProductSKU: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_PRODUCT_VIEW, payload);
  firebaseEventLogger(Events.EVENT_PRODUCT_VIEW, payload);
};

export const addToWishlist = (payload: {
  ProductId: string;
  ProductName: string;
  Category: any;
  Price: string;
  FromScreen: string;
}) => {
  if (!isGuestUser()) {
    createProfile();
  }

  clevertap.event.push(Events.EVENT_ADD_TO_WISHLIST, payload);
  firebaseEventLogger(Events.EVENT_ADD_TO_WISHLIST, payload);
};

export const removeFromWishlist = (payload: {
  ProductId: string;
  ProductName: string;
  Price: string;
  Category: any;
  FromScreen: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_REMOVE_FROM_WISHLIST, payload);

  firebaseEventLogger(Events.EVENT_REMOVE_FROM_WISHLIST, payload);
};

// add to cart
export const addToBag = (payload: {
  ProductId: string;
  ProductName: string;
  Price: string;
  Category: any;
  FromScreen: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_ADD_TO_CART, payload);
  firebaseEventLogger(Events.EVENT_ADD_TO_CART, payload);
};

// Delete_From_Cart
export const deleteFromBag = (payload: {
  ProductId: string;
  ProductName: string;
  ProductPrice: string;
  Category: any;
  FromScreen: string;
  ProductSKU: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_REMOVE_FROM_CART, payload);
  firebaseEventLogger(Events.EVENT_REMOVE_FROM_CART, payload);
};

export const addCoupon = (payload: {
  CouponCode: string;
  CouponType: string;
  DiscountValue: string;
  CouponValidity: string;
  CouponApplyStatus: string;
  FailureError: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_COUPON_APPLIED, payload);

  firebaseEventLogger(Events.EVENT_COUPON_APPLIED, payload);
};

export const addNewAddress = (payload: {
  PhoneNo: string;
  Name: string;
  // Address: string;
  City: string;
  State: string;
  // CreatedAt: string;
  // UserId: string;
  AddressType: string;
  Coordinates: string;
  Google_Address: string;
  AddressLine_1: string;
  AddressLine_2: string;
  Pincode: string;
  is_default: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_ADD_ADDRESS, payload);

  firebaseEventLogger(Events.EVENT_ADD_ADDRESS, payload);
};

export const selectAddress = (payload: {
  PhoneNo: string;
  CartID: string;
  Google_Address: string;
  AddressLine_1: string;
  AddressLine_2: string;
  Pincode: string;
  City: string;
  State: string;
  AddressType: string;
  CartType: string;
  is_default: boolean;
  Coordinates: string;
  UserName: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_SELECT_ADDRESS, payload);

  firebaseEventLogger(Events.EVENT_SELECT_ADDRESS, payload);
};

export const checkout = (payload: {
  "User Name": string;
  PhoneNo: string;
  // ProductName: string;
  CartID: string;
  Quantity: string;
  SubTotal: string;
  CouponDiscount: string;
  Donation: any;
  GrandTotal: string;
  CouponCode: any;
  CartType: string;
  Products: any;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_CHECKOUT, payload);
  firebaseEventLogger(Events.EVENT_CHECKOUT, payload);
};

export const completeCheckout = (payload: {
  "User Name": string;
  CartID: string;
  Quantity: string;
  SubTotal: string;
  CouponDiscount: string;
  Donation: string;
  GrandTotal: string;
  CouponCode: string;
  CartType: string;
  Products: any;
  PhoneNo: string;
  DeliveryType: string;
  ShippingFee: string;
  AddressType: string;
  Address: string;
  IsLoyaltyUsed: string;
  LoyaltyPointsUsed: string;
  IsWalletUsed: boolean;
  WalletBalanceUsed: string;
  PaymentMethod: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_COMPLETE_CHECKOUT, payload);
  firebaseEventLogger(Events.EVENT_COMPLETE_CHECKOUT, payload);
};

export const eventPaymentMethod = (payload: {
  IsLoyaltyUsed: boolean;
  LoyaltyPointsUsed: string;
  IsWalletUsed: boolean;
  WalletBalanceUsed: string;
  GrandTotal: string;
  PaymentMethod: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.PAYMENT_METHOD, payload);

  firebaseEventLogger(Events.PAYMENT_METHOD, payload);
};

export const purchase = (payload: {
  OrderID: string;
  // UserId: string;
  OrderStatus: string;
  Products: string;
  CartID: string;
  SubTotal: string;
  CouponDiscount: string;
  ShippingFee: string;
  Donation: string;
  GrandTotal: string;
  PaymentMethod: string;
  CouponCode: string;
  DeliveryType: string;
  AddressType: string;
  Address: string;
  // CreatedAt: string;
  Quantity: string;
  CartType: string;
  IsLoyaltyUsed: boolean;
  LoyaltyPointsUsed: string;
  IsWalletUsed: boolean;
  WalletBalanceUsed: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_PURCHASE, payload);

  firebaseEventLogger(Events.EVENT_PURCHASE, payload);
};

export const profileUpdate = (payload: {
  UserName: string;
  PhoneNo: string;
  DOB: any;
  EmailID: string;
  Gender: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_PROFILE_UPDATE, payload);

  firebaseEventLogger(Events.EVENT_PROFILE_UPDATE, payload);
};

export const productReviewed = (payload: {
  // UserId: string;
  // ProductSKU: string;
  ProductId: string; //sku
  ProductName: string;
  // CreatedAt: string;
  OverAllrating: string;
  RatingTitle: string;
  PerformanceRating: string;
  ValueRating: string;
  QualityRating: string;
  NickName: string;
  RatingComment: string;
  Platform: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_PRODUCT_REVIEW, payload);

  firebaseEventLogger(Events.EVENT_PRODUCT_REVIEW, payload);
};

export const settingsUpdate = (payload: {
  WhatsappNotification: boolean;
  EmailNotification: boolean;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_SETTINGS_UPDATE, payload);
  firebaseEventLogger(Events.EVENT_SETTINGS_UPDATE, payload);
};

export const updateTier = (payload: {
  IsPurchased: boolean;
  UpdatedTierType: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_UPDATE_TIER, payload);
  firebaseEventLogger(Events.EVENT_UPDATE_TIER, payload);
};

export const shoppingFeedback = (payload: {
  Rating: string;
  RatingComment: string;
  Platform: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_SHOPPING_FEEDBACK, payload);
  firebaseEventLogger(Events.EVENT_SHOPPING_FEEDBACK, payload);
};

export const viewCart = (payload: {
  UserName: string;
  PhoneNo: string;
  CartValue: any;
  TotalItems: any;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_VIEW_CART, payload);
  firebaseEventLogger(Events.EVENT_VIEW_CART, payload);
};

export const selectDeliveryType = (payload: {
  "User Name": string;
  PhoneNo: string;
  CartID: string;
  DeliveryType: string;
  CartType: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_SELECT_DELIVERY_TYPE, payload);
  firebaseEventLogger(Events.EVENT_SELECT_DELIVERY_TYPE, payload);
};

export const storeLocator = (payload: {
  Location: string;
  Pincode: string;
  Latitude: string;
  Longitude: string;
  Platform: string;
}) => {
  if (!isGuestUser()) createProfile();
  clevertap.event.push(Events.EVENT_STORE_LOCATOR, payload);
  firebaseEventLogger(Events.EVENT_STORE_LOCATOR, payload);
};

