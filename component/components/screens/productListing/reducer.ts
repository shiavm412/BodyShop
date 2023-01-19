//@ts-nocheck
export const productReducer = (
  state = {
    data: {},
    categoryId: ""
    // filters: {},
    // products: {},
    // articles: {},
    // categoryData: {},
  },
  action: any
) => {
  switch (action.type) {
    case 'getProductList':
      // const payload = Object.assign({}, action.payload)
      // const products = Object.assign({}, action?.payload?.products)
      // products.data = [...action.payload?.products?.data]
      return { ...state, data: action.payload };
    case 'product.update':
      const index = state.data?.products.data.findIndex(
        (item: any) => item._id === action.payload._id
      ); //finding index of the item
      if (index > -1) {
        const newArray = [...state.data?.products.data]; //making a new array
        newArray[index] = action.payload; //changing value in the new array
        state.data.products.data = newArray;
      }

      return { ...state };
     
    default:
      return state;
  }
};

export const productFilterReducer = (
  state = {
    filters: [],
    mobileAppliedFilters: {},
  },
  action: any
) => {
  switch (action.type) {
    case 'product-filter':
      return { ...state, filters: action.payload };
    case 'mobile-applied-filters':
      return { ...state, mobileAppliedFilters: action.payload };
    default:
      return state;
  }
};
