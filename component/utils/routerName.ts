const routes = {
  LOGIN_OTP: `/login-via-otp`,
  LOGIN_EMAIL: `/login-via-email`,

  SIGNUP: `/sign-up`,
  SOCIAL_MOBILE: `/login-via-mobile`,

  STORE: `/stores`,
  STORE_DETAIL: `/store/:id`,

  MY_PROFILE: `/my-profile`,
  MOBILE_SEARCH: `/mobile-search`,

  // PRODUCT_LIST: `/product-listing`,
  // PRODUCT_DETAIL: `/product-detail/:id`,
  // CATEGORY_LIST: `/*/h/:id`,
  PRODUCT_LIST: `/*/:type(c|h)/:googleKey/`,
  PRODUCT_SEARCH_LIST: `/search/:keyword`,
  PRODUCT_LISTING: `/`,
  PRODUCT_DETAIL: `/*/p/:googleKey/`,
  PRODUCT_NOT_FOUND: `/product-not-found`,

  SHOPPING_BAG: `/shopping-bag`,
  ADDRESS: `/address`,
  DELIVERY: `/delivery`,
  WISHLIST: `/wishlist`,

  //My orders
  ORDER_HISTORY: `/order/list`,
  ORDER_DETAIL: `/order/detail/:id/:item_id?`,

  // Order Cancel
  // ORDER_CANCEL: '/order/cancellation/:id',
  // ORDER_NOT_FOUND: '/order-notFound',

  // Return Order
  RETURN_POLICY: "/return-policy",
  WRITE_TO_US: "/write-to-us",
  MY_ORDER: "/my-order",
  ADD_PHOTO: "/add-photo",
  RETURN_REASONS: "/return-reasons",
  MY_ADDRESS: "/my-address",
  SLOT: "/slot",

  TIPS_ADVICE: "/tips-advice",
  PAYMENT: "/payment",
  BANKOFFER: "/offers",

  GIFT_CARD: "/gift-card",
  CORPORATE_FORM: "/corporate-form",
  SENT_GIFT_CARD: "/send-gift-card",
  CREATE_GIFT: "/create-gift",
  GIFT_SELECT_BOX: "/gift-select-box",
  HELP_SUPPORT: "/help-support",
  COUPON_LISTING: "/coupon-listing",
  NEED_HELP: "/need-help",
  SUBMIT_REQUEST: "/submit-request",
  SHOW_QUERY: "/more-queries",
  OLDER_QUERIES: "/older-queries",
  FAQ: "/faq",
  REVIEW_LIST: "/review-list",
  WALLET: "/wallet",
  // ORDER_GIFT_DETAIL: "/order-gift-details",
  DONATION: "/donation",
  DONATION_FORM: "/donation-form",
  LYBC: "/lybc/:slug",
  UPGRADE_MEMBERSHIP: "/upgrade-membership",
  PURCHASE_MEMBERSHIP: "/purchase-membership",
SKIN_PREFERENCE: "/skin-preference",
  CHANGE_PASSWORD: "/change-password",
  NOTIFICATION: "/notification",
  MOBILE_SIDE_LIST: "/sideList",
  PAYMENT_METHOD: "/payment-method",
  ABOUT_US: "/about-us",
  TERMS_CONDITION: "/terms-conditions",
  PRIVACY_POLICY: "/privacy-policy",
  COOKIES: "/cookies",
  // FOOTER: "/footer",
  CHOOSE_PLAN: "/choose-plan",
  MOBILE_MY_ACCOUNT: "/my-account",
  MOBILE_EDIT_PROFILE: "/edit-profile",
  ADDRESS_FORM: "/address-form",

  //genric page
  GENRIC_PAGE: `/:slug`,
  SELECTED_CATEGORY: "/selected-category",
};
export default routes;
