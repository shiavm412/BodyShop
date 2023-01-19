// DRY RULE
const BASE_URL_S1 = `user-service/api/${process.env.NEXT_PUBLIC_VERSION}`;
const BASE_URL_S2 = `product-service/api/${process.env.NEXT_PUBLIC_VERSION}`;
const BASE_URL_S3 = `order-service/api/${process.env.NEXT_PUBLIC_VERSION}`;
const BASE_URL_S4 = `promotion-service/api/${process.env.NEXT_PUBLIC_VERSION}`;

export const endpoints = {
  /**
   * Module 1 user-service/api/v1/
   */
  CHECK_URL_REDIRECT: `${BASE_URL_S1}users/get-redirect-url`,
  CHECK_USER: `${BASE_URL_S1}users/check-user`,
  CHECK_EXISTING_USER: `${BASE_URL_S1}users/check-existing-user`,
  RESEND_OTP: `${BASE_URL_S1}users/resend-otp`,
  GENERATE_OTP: `${BASE_URL_S1}users/generate-otp`,
  VERIFY_OTP: `${BASE_URL_S1}users/verify-otp`,
  CONFIRM_OTP: `${BASE_URL_S1}users/confirm-otp`,
  LOGIN: `${BASE_URL_S1}users/login`,
  SIGNUP: `${BASE_URL_S1}users/signup`,
  GUEST_SIGNUP: `${BASE_URL_S1}users/guest-signup`,
  LOGOUT: `${BASE_URL_S1}users/logout`,
  SOCIAL_SIGNUP: `${BASE_URL_S1}users/social-signup`,
  RESET_PASSWORD: `${BASE_URL_S1}users/reset-password`,
  FORGET_PASSWORD: `${BASE_URL_S1}users/forgot-password`,
  STORE_LIST: `${BASE_URL_S1}users/stores`,
  STORE_NEAREST: `${BASE_URL_S1}users/page/nearest_stores`,
  STORE_DETAIL: `${BASE_URL_S1}users/stores/:storeId/:lat/:lng`,
  RECOMMEND_PRODUCT: `${BASE_URL_S1}users/recommended-data`,
  USER_SEARCH: `${BASE_URL_S1}users/search`,
  MENU_LIST: `${BASE_URL_S1}users/menu`,
  USER_PROFILE: `${BASE_URL_S1}users/profile`,
  HOME: `${BASE_URL_S1}users/page/home`,
  FOOTER: `${BASE_URL_S1}users/footer`,
  OFFERS: `${BASE_URL_S1}users/page/offers`,
  CONFIG: `${BASE_URL_S1}users/configs1`,
  GIFT_CARD_HOME: `${BASE_URL_S1}users/page`,
  PAGE: `${BASE_URL_S1}users/page`,
  RETURN_POLICY: `${BASE_URL_S1}users/page/return_policy`,
  FAQ: `${BASE_URL_S1}users/faq`,
  REVIEWS: `${BASE_URL_S1}users/reviews`,
  LATEST_REVIEWS: `${BASE_URL_S1}users/latest-reviews`,
  REVIEW_QUESTIONS: `${BASE_URL_S1}users/review-questions`,
  HELP_SUPPORT: `${BASE_URL_S1}users/help`,
  REVIEW_POLL: `${BASE_URL_S1}users/review-poll`,
  REVIEW_REPORT: `${BASE_URL_S1}users/review-report`,
  SUBMIT_REVIEW: `${BASE_URL_S1}users/submit-review`,
  UPLOAD_PHOTO: `${BASE_URL_S1}users/bv-upload-photo`,
  CHANGE_PASSWORD: `${BASE_URL_S1}users/changePassword`,
  SET_PASSWORD: `${BASE_URL_S1}users/set-password`,
  RAZORPAY_CARDS: `${BASE_URL_S1}users/rzp-cards`,
  RAZORPAY_NETBANKING_BANKS: `${BASE_URL_S1}users/banks`,
  DASHBOARD: `${BASE_URL_S1}users/er-dashboard`,
  SYNC_ER: `${BASE_URL_S1}users/sync-user-with-er`,
  GET_NOTIFICATION: `${BASE_URL_S1}users/get-notification-setting`,
  PUT_NOTIFICATION: `${BASE_URL_S1}users/update-notification-setting`,
  TOP_SEARCH: `${BASE_URL_S1}users/top-search`,


  /**
   * Module 2
   */
  PRODUCT_LIST: `${BASE_URL_S2}products/list`,
  PRODUCT_DATA: `${BASE_URL_S2}products`,
  PROMOTIONS: `${BASE_URL_S2}promotions`,
  WISHLIST: `${BASE_URL_S2}products/wishlist`,
  ADD_WISHLIST: `${BASE_URL_S2}products/wishlist`,
  REMOVE_WISHLIST: `${BASE_URL_S2}products/wishlist/:id`,
  SUGGESTION_LIST: `${BASE_URL_S2}products/recommendations`,
  NOTIFY: `${BASE_URL_S2}products/notifyme`,
  PLP_CATEGORY: `${BASE_URL_S2}category/list`,


  /***
   * Module 3
   */
  ADD_TO_BAG: `${BASE_URL_S3}cart`,
  CART_SUMMARY: `${BASE_URL_S3}cart/summary`,
  ADD_ROUTINE: `${BASE_URL_S3}complete-routine`,
  ADDRESS: `${BASE_URL_S3}address`,
  GIFT_CARD: `${BASE_URL_S3}gift-card`,
  CARD_TYPE: `${BASE_URL_S3}card-type`,
  CHECK_BALANCE: `${BASE_URL_S3}check-ecard-balance`,
  REDEEM_GIFT_CARD: `${BASE_URL_S3}redeem-gift-card`,
  CHECK_PINCODE: `${BASE_URL_S3}check-pincode`,
  FREE_SAMPLES: `${BASE_URL_S3}free-samples`,
  CORPORATE_GIFT_CARD: `${BASE_URL_S3}corporate-gifting`,
  ORDERS: `${BASE_URL_S3}orders`,
  WRITE_TO_US: `${BASE_URL_S3}write-to-us`,
  REASONS: `${BASE_URL_S3}reasons`,
  ORDERREASONS: `${BASE_URL_S3}orders/reasons`,
  ORDER_DETAIL: `${BASE_URL_S3}orders/:id`,
  GIFT_CARD_VALIDITY: `${BASE_URL_S3}check-ecard-validity`,
  GIFT_CARD_SEND_OTP: `${BASE_URL_S3}send-otp`,
  WALLET_BALANCE: `${BASE_URL_S3}wallet-balance`,
  PAYMENT_INIT: `${BASE_URL_S3}payment/initiate-transaction`,
  RAZORPAY_INIT: `${BASE_URL_S3}payment/rzp-initiate-transaction`,
  PAYTM_SEND_OTP: `${BASE_URL_S3}payment/send-paytm-otp`,
  PAYTM_VALIDATE_OTP: `${BASE_URL_S3}payment/validate-paytm-otp`,
  PAYTM_FETCH_BALANCE: `${BASE_URL_S3}payment/fetch-paytm-balance`,
  PAYTM_PROCESS_TSCN: `${BASE_URL_S3}payment/process-paytm-transaction`,
  PAYTM_ADD_MONEY: `${BASE_URL_S3}payment/add-paytm-money`,
  REVOKE_PAYTM_WALLET: `${BASE_URL_S3}payment/revoke-paytm-number`,
  ORDER_ITEM: `${BASE_URL_S3}order-items`,
  WALLET_HISTORY: `${BASE_URL_S3}wallet-history`,
  OVERALL_RATING: `${BASE_URL_S3}overall-review`,
  QUESTIONS_POLL: `${BASE_URL_S3}questions-poll`,
  OLDER_QUERIES: `${BASE_URL_S3}older-queries`,
  ORDER_RETRY: `${BASE_URL_S3}order-retry`,
  VOUCHERS: `${BASE_URL_S3}available-gvs`,
  REDEEM_GV: `${BASE_URL_S3}redeem-gv`,
  UNBLOCK_GV: `${BASE_URL_S3}unblock-gv`,
  TIER_OFFER_LIST: `${BASE_URL_S3}get-tier-offer-list`,
  RATE_ORDERS: `${BASE_URL_S3}rate-orders`,
  VERIFY_GV: `${BASE_URL_S3}verify-gv`,
  UPDATE_TIER: `${BASE_URL_S3}update-tier`,
  GATEWAY_ORDER_ID: `${BASE_URL_S3}payment/gateway-order-id`,
  REWARD_POINT_RATE: `${BASE_URL_S3}reward-point-rate`,
  ZD_UPLOAD: `${BASE_URL_S3}zd-upload-photo`,
  REWARD_BLOCK: `${BASE_URL_S3}rewards-block`,
  REWARD_UNBLOCK: `${BASE_URL_S3}rewards-unblock`,
  REWARD_HISTORY: `${BASE_URL_S3}reward-history`,


  /**
   * Module 4
   */
  PRODUCT_OFFERS: `${BASE_URL_S4}product-offers`,
  COUPON_LISTING: `${BASE_URL_S4}coupons`,
  VALIDATE_COUPON: `${BASE_URL_S4}validate-coupon`,
  REMOVE_COUPON: `${BASE_URL_S4}remove-coupon`,




}
export default endpoints;
