import { makeStyles, createStyles, Theme } from "@material-ui/core";
import GiftBanner from "./createGiftCard/giftBanner";
import SendMeEGift from "./sendMeEGift";
import RedeemCard from "./redeemCard";
import HaveYouSeen from "./haveYouSeen";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGiftCardHomeData } from "./action";
import { hideSkeleton, showSkeleton } from "../home/actions";
import { screenViewed } from "../../utils/event/action";
import events from "../../utils/event/constant";
import { GiftSkeleton } from "../../components/common/skeletonList/giftSkeleton";
import { ReducersModal } from "../../models";
import { PageMeta } from "components";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    giftRoot: {
      maxWidth: "1450px",
      margin: "0 auto",
      padding: theme.spacing(4, 6),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(3, 2),
      },
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1, 2),
      },
    },
    root:{
      [theme.breakpoints.down("xs")]:{
        marginTop: theme.spacing(6.5)
      }
    },
    haveYouSeen: {
      backgroundColor: "#044236",
      color: "var(--white)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      position: "relative",
    },
  })
);

const GiftCard: React.FC<any> = () => {
  const classes = useStyles();
  const dispatch : any= useDispatch();
  const [giftHomeData, setGiftHomeData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    // dispatch(showSkeleton());
    dispatch(
      getGiftCardHomeData("giftcard", (data: any) => {
        setGiftHomeData(data || []);
        dispatch(hideSkeleton());
      })
    );

    /**
     * Event logger
     */
    screenViewed({
      ScreenName: events.SCREEN_GIFT_HOME,
      CTGenerated: "WEB",
    });
  }, []);
  
  const giftCardHeaderData: any = giftHomeData?.find(
    (data: any) => data?.block_id === "gift-card-header-block"
  );
  const redeemGiftData: any = giftHomeData?.find(
    (data: any) => data?.block_id === "want-to-redeem-gift-card"
  );
  const corporateGiftData: any = giftHomeData?.find(
    (data: any) => data?.block_id === "coorporate-gifting"
  );
  const balanceCheckData: any = giftHomeData?.find(
    (data: any) => data?.block_id === "gift-card-balance-checker"
  );
  const buyfGiftCardData: any = giftHomeData?.find(
    (data: any) => data?.block_id === "buy-a-gift-card-in-store"
  );
  const senEgiftCardData: any = giftHomeData?.find(
    (data: any) => data?.block_id === "send-an-e-gift-card"
  );

  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  return (
    <div>
     
      <PageMeta title={"Gift Cards | The Body Shop"}  description={"The Body Shop E-Gift Cards - Buy or Send Digital E-Gift Cards and gift vouchers to your friends and family for any occasion."} />
      {skeletonLoader ? (
        <GiftSkeleton />
      ) : (
        <div className={classes.root}>
          <GiftBanner data={giftCardHeaderData} />
          <div className={classes.giftRoot}>
            <SendMeEGift
              balanceCheckData={balanceCheckData}
              buyfGiftCardData={buyfGiftCardData}
              data={senEgiftCardData}
            />
            <RedeemCard
              corporateGiftData={corporateGiftData}
              redeemGiftData={redeemGiftData}
            />
          </div>
        </div>
      )}
      <HaveYouSeen />
    </div>
  );
};

export default GiftCard;
