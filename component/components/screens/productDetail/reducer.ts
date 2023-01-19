const ProductDetailInitialState = {
  product: [],
  linkedProducts: '',
  redirect: '',
  selectedVariant: {},
  selectedVariantData: {},
  productReviews: '',
  rewardData: '',
};

export const productDetailReducer = (
  state = ProductDetailInitialState,
  action: any
) => {
  switch (action.type) {
    case 'getProductData':
      const product = { ...action.payload.product };
      return {
        ...state,
        ...action.payload,
        product: { ...state.product, ...product },
      };

    case 'storePriceInformation':
      return { ...state, ...action.payload };

    case 'productNotFound':
      return { ...state, redirect: 'Not Found' };

    case 'checkStock':
      return { ...state, checkStock: action.payload };

    case 'addToCart':
      return { ...state, redirect: action.payload };

    case 'ResetProductData':
      return ProductDetailInitialState;

    case 'product-reviews':
      return { ...state, productReviews: action.payload };

    default:
      return state;
  }
};
