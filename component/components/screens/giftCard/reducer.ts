
import { GiftModal } from "../../../models"

export const giftReducer = (state = new GiftModal(), action: any) => {
  switch (action.type) {
    case "eGiftCard":
      return { ...state, eGiftCard: action.payload };
    case "eCardSummary":
      return { ...state, eCardSummary: action.payload };
    case "eGiftCardScreensData":
      return { ...state, eGiftCardScreensData:{...state.eGiftCardScreensData, ...action.payload }};
    default:
      return state;
  }
};

