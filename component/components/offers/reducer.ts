


export const offerReducer = (state = {
  offers: "",
  data: ""
}, action: any) => {
  switch (action.type) {    
    case "getProductOffers":
      return { ...state, ...action.payload };

    case "getPromotions":
        return { ...state, ...action.payload };

    default:
      return state;
  }
};

