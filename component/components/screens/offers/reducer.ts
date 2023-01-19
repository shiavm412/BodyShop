const intialState={
  offers: "",
  data: "",
}
export const offerReducer = (state = intialState, action: any) => {
  switch (action.type) {    
    case "getProductOffers":
      return { ...state, ...action.payload };

    case "getPromotions":
        return { ...state, ...action.payload };

    default:
      return state;
  }
};

