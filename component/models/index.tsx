import Utils from "../utils";
class LoadingModal {
  isLoading: boolean = true;
  mainLoading: boolean = false;
  skeletonLoader: boolean = false;
  paytmLoader: boolean = false;
}

class LoginModal {
  type: string = "";
  email: string = "";
  mobileNo: string = "";
  countryCode: string = "";
  socialType: string = "";
  socialId: string = "";
  responseCode: number = Utils.statusCode.USER_EXIST_IN_DB;
  fullName: string = "";
  imageUrl: string = "";
  gender: string = "";
  dob: any = null;
}

class OtpModal {
  show: boolean = false;
  email: string = "";
  mobileNo: string = "";
  countryCode: string = "";
  otpVia: string = "";
  type: string = "";
  OTP: string = "";
  currentDate: number = 0;
}
class AlertModal {
  show: boolean = false;
  message: string = "";
  type: "success" | "error" | "warning" | "info" = "success";
  position?: "right" | "left" | "center";
}

class UserModal {
  fullName: string = "";
  OTP: string = "";
  appleId: string = "";
  authToken: string = "";
  countryCode: string = "";
  createdAt: string = "";
  email: string = "";
  googleId: string = "";
  isEmailVerified: boolean = false;
  isMobileVerified: boolean = false;
  isPasswordGenerated: boolean = false;
  mobileNo: string = "";
  status: string = "";
  userId: string = "";
  gender: string = "";
  dob: string = "";
  tierType: string = "";
  membershipNumber: string = "";
  undermaintainance: number = 0;
}

class HomeModal {
  homeData: any;
  menuData: any = [];
  memberShipData: any = [];
  mobileHomeData: any = [];
  footerMenu: any = [];
  mobileMenusData: any = [];
  fromPath: any = "";
  authToken: string = "";
}
class ConfigModal {
  generalConfigs: any;
  paymentConfigs: any;
  metaData: any;
}
class StoreModal {
  data: Array<any> = [];
  AllData: any;
  storesNearest: Array<any> = [];
  showStoreDetail: boolean = false;
  nextPage?: number = 0;
  totalCount?: number = 0;
}
class ProductModal {
  data: any = {};
  // filters: any = {};
  // products: any = {};
  // articles: any = {};
  // categoryData: any = {};
}
class ProductFilterModal {
  filters: any = "";
  mobileAppliedFilters: any = "";
}

class RecommendModal {
  recommendedData: any = {};
}

class ProductDetailModal {
  product: any;
  linkedProducts: any;
  redirect: any;
  selectedVariant: any;
  selectedVariantData: any;
  productReviews: any;
  rewardData: any;
}
class ShoppingBagModal {
  items: any = [];
  _id: any;
  donation: any = {
    donationType: "checkout_section",
    donationAmount: 0,
  };
  freeProductCount: number = 0;
  freeSampleCount: number = 0;
  totalItems: number = 0;
  isMembershipAdded: boolean = false;
  blocked: boolean = false;
  isWhatsAppConsent: boolean = false;
}
class WishistModal {
  data: any = [];
  totalCount: any = 0;
}

class OfferModal {
  offers: any;
  data: any;
}

class UserDetailModal {
  userInfo: any;
  lybcInfo: any;
  dashboard: any;
  walletBalance?: any;
  verifyModal: boolean = false;
  resetStore: any;
}

class AddressModal {
  address: any;
  checkoutAddressId: string | null = null;
  addressFlag: string | null = null;
}
class BreadcrumModal {
  data: any;
}

class GiftModal {
  eGiftCard: any = {};
  eCardSummary: any = {};
  eGiftCardScreensData: any = {
    selectedDesign: {},
    donationAmount: {},
    enterDetails: {},
    deliveryDetails: {},
  };
}
class OrderHistoryModal {
  orderList: any = [];
  orderListData: any = {};
  selectedOrder: any = {};
  selectedOrderForReturn: any = {};
  selectedOrderDetails: any = {};
}

class CouponListModal {
  mylist: any = [];
  otherList: any = [];
}

class FaqModal {
  faqData: any = {};
}
class PaymentModal {
  paytm: any = {};
}

class HelpModal {
  helpData: any = [];
}

class OrderListModal {
  listData: any = {};
}

class RatingModal {
  data: Array<any> = [];
}

class OlderQueryModal {
  queryList: any = [];
}

class ReducersModal {
  alertReducer: AlertModal = new AlertModal();
  couponReducer: CouponListModal = new CouponListModal();
  olderQueryListReducer: OlderQueryModal = new OlderQueryModal();
  orderListReducer: OrderListModal = new OrderListModal();
  helpReducer: HelpModal = new HelpModal();
  faqReducer: FaqModal = new FaqModal();
  loadingReducer: LoadingModal = new LoadingModal();
  loginReducer: LoginModal = new LoginModal();
  otpReducer: OtpModal = new OtpModal();
  userReducer: UserModal = new UserModal();
  homeReducer: HomeModal = new HomeModal();
  storeReducer: StoreModal = new StoreModal();
  productReducer: ProductModal = new ProductModal();
  recommendReducer: RecommendModal = new RecommendModal();
  productDetailReducer: ProductDetailModal = new ProductDetailModal();
  shoppingBagReducer: ShoppingBagModal = new ShoppingBagModal();
  wishlistReducer: WishistModal = new WishistModal();
  productFilterReducer: ProductFilterModal = new ProductFilterModal();
  offerReducer: OfferModal = new OfferModal();
  userDetailReducer: UserDetailModal = new UserDetailModal();
  addressReducer: AddressModal = new AddressModal();
  breadCrumReducer: BreadcrumModal = new BreadcrumModal();
  giftReducer: GiftModal = new GiftModal();
  configReducer: ConfigModal = new ConfigModal();
  orderHistoryReducer: OrderHistoryModal = new OrderHistoryModal();
  paymentReducer: PaymentModal = new PaymentModal();
  ratingReducer: RatingModal = new RatingModal();
}

export {
  OlderQueryModal,
  OrderListModal,
  HelpModal,
  CouponListModal,
  FaqModal,
  OtpModal,
  LoginModal,
  UserModal,
  ReducersModal,
  LoadingModal,
  AlertModal,
  HomeModal,
  StoreModal,
  ProductModal,
  RecommendModal,
  ProductDetailModal,
  ShoppingBagModal,
  WishistModal,
  ProductFilterModal,
  OfferModal,
  UserDetailModal,
  AddressModal,
  BreadcrumModal,
  GiftModal,
  ConfigModal,
  OrderHistoryModal,
  PaymentModal,
  RatingModal,
};
