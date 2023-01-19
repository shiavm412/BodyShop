import {  Theme} from "@mui/material";
import { makeStyles , createStyles} from "@mui/styles";

import Testimonial from "./testimonial";
import Category from "./category";
import DoYouThink from "./doYouThink";
import FindNewStore from "./findNewStore";
import FindOutNow from "./finOutNow";
import HaveYouSeen from "./haveYouSeen";
import JoinClub from "./joinClub";
import PromotionalProduct from "./promotionalProduct";
import Sensitive from "./sensitive";
import StoreOffer from "./storeOffer";
import PromotionalBanner from "./PromotionalBanner";
import HotSummer from "./hotSummer";
import LatestReviews from "./latestReviews";
import Bestseller from "./bestSeller";
import Trending from "./trending";
import Recommended from "./recommended";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ReducersModal } from "../../../../models";
import events from "events";
import { getLatestReviews } from "../../../../../store/home/action";
import { saveLocationHistory } from "../../../../common/breadCrumb/action";
import Utils from "../../../../utils";
import { screenViewed } from "../../../../utils/event/action";
import { isAuthenticated } from "../../../../utils/session";


export default function HomeMobileView() {
  const homeData = useSelector((state: any) => state.homeReducer.mobileHomeData)
  const dispatch : any= useDispatch()
  const history = useRouter()
  const [sortedHomedata, setSortedHomedata] = useState<any>([])
  const userInfo: any =
    useSelector((state: ReducersModal) => state.userDetailReducer?.userInfo) ||
    {};
  // const bannerData = homeData?.find((data: any) => data?.block_key === "promotional_banner")

  const [ratingData, setRatingData] = useState([]);
  const [latestReviews, setLatestReviews] = useState([])
  // const getRateOrdersData = () => {
  //   dispatch(getRatingData('?page=1&limit=10', (resp: any) => {
  //     setRatingData(resp?.data || [])
  //   }))
  // };

  useEffect(() => {
    const promotionalBanner = homeData?.find((data: any) => data?.block_key === "promotional_banner")
    const promotionalProduct = homeData?.find((data: any) => data?.block_key === "promotional_products")
    const giftData = homeData?.find((data: any) => data?.block_key === "gift_block")
    const myOffer = homeData?.find((data: any) => data?.block_key === "my_offer")
    const skinType = homeData?.find((data: any) => data?.block_key === "skin_type")
    const storeOffer = homeData?.find((data: any) => data?.block_key === "store_offer")
    const haveYouSeenData = homeData?.find((data: any) => data?.block_key === "have_seen")
    const testimonialData = homeData?.find((data: any) => data?.block_key === "testimonial_block")
    const recommendedProducts = homeData?.find((data: any) => data?.block_key === "recommended_products");
    const storeLocator = homeData?.find((data: any) => data?.block_key === "store_locator");
    const latestHomeReview = homeData?.find((data: any) => data?.block_key === "latest_reviews")
    const bestSeller = homeData?.find((data: any) => data?.block_key === "best_seller")
    const categoryBlock = homeData?.find((data: any) => data?.block_key === "category_block");
    const lybcBlock = homeData?.find((data: any) => data?.block_key === "lybc_block")
    const productReviews = homeData?.find((data: any) => data?.block_key === "product_reviews")
    const trending = homeData?.find((data: any) => data?.block_key === "trending");
    const arr = [promotionalBanner, promotionalProduct, giftData, myOffer, skinType, storeOffer, haveYouSeenData, testimonialData, recommendedProducts,
      storeLocator, latestHomeReview, bestSeller, categoryBlock, lybcBlock, productReviews, trending]
    const sortedMobileHomeData = arr.sort((a: any, b: any) => {
      return Number(a?.position) - Number(b?.position)
    })
    setSortedHomedata(sortedMobileHomeData)
  }, [homeData])

  const getReviews = () => {
    getLatestReviews('?page=1&limit=10').then((response) => {
      setLatestReviews(response?.data?.data?.data || [])
    }).catch((error) => {
    })
  }

  useEffect(() => {
    let breadCrumbData = [
      {
        title: "Home",
        action: "/",
      },
    ];
    dispatch(saveLocationHistory(breadCrumbData));
    // getRateOrdersData()
    getReviews()
    /**
     * Event logger
     */
    // screenViewed({
    //   ScreenName: events.SCREEN_HOME,
    //   UserId: `${localStorage.getItem("userId")}`,
    //   CreatedAt: `${Date.now()}`,
    //   CTGenerated: "WEB"
    // })
  }, []);


  const navigateTo = (item: any) => {
    if (item.entity && item.entity_id) {
      if (item.entity === 'product') {
        const pathname = Utils.CommonFunctions.seoUrl({ ...item, id: item.entity_id }, "others").replace("/c/", "/p/")
        history.push(pathname)
        // const path = Utils.CommonFunctions.replaceUrlParams(
        //   Utils.routes.PRODUCT_DETAIL,
        //   { ":id": item?.entity_id }
        // );
        // history.push({
        //   pathname: path,
        //   state: { pageName: "" }
        // });
      }
      else {
        // const path = `${Utils.routes.PRODUCT_LIST}`;
        // history.push({ pathname: path, search: `?categoryId=${item.entity_id}`, state: { fromPath: "home" } })
        const pathname = Utils.CommonFunctions.seoUrl({ ...item, id: item.entity_id }, "others")
        history.push({ pathname, query: { fromPath: "home" } })

      }
    }
  }

  return (
    <>
      <div>
        {
          sortedHomedata.map((section: any) => {
            if (section?.status === '1' && section?.block_key == 'promotional_banner')
              return (
                <PromotionalBanner key={"promotional_banner"} navigateTo={navigateTo} data={section} />
              )
            if (section?.status === '1' && section?.block_key == 'promotional_products')
              return (
                <PromotionalProduct navigateTo={navigateTo} key={"promotional_products"} data={section} />
              )
            if (section?.status === '1' && section?.block_key == 'category_block')
              return (
                <Category key="category_block" />
              )
            if (section?.status === '1' && section?.block_key == 'my_offer')
              return (
                <HotSummer key="my_offer" navigateTo={navigateTo} data={section} />
              )
            if (section?.status === '1' && section?.block_key == 'best_seller')
              return (
                <Bestseller key="best_seller" />
              )
            if (section?.status === '1' && section?.block_key == 'skin_type')
              return (
                <Sensitive key="skin_type" navigateTo={navigateTo} data={section} />
              )

            if (section?.status === '1' && section?.block_key == 'latest_reviews')
              return (
                <LatestReviews key="latest_reviews" latestReviews={latestReviews} />
              )
            if (section?.status === '1' && section?.block_key == 'lybc_block' && (userInfo?.tierType === 3 || !isAuthenticated()))
              return (
                <JoinClub key="lybc_block" data={section} />
              )
            if (section?.status === '1' && section?.block_key == 'gift_block')
              return (
                <FindOutNow key="gift_block" navigateTo={navigateTo} data={section} />
              )
            if (section?.status === '1' && section?.block_key == 'store_offer')
              return (
                <StoreOffer key="store_offer" navigateTo={navigateTo} data={section} />
              )

            if (section?.status === '1' && section?.block_key == 'trending')
              return (
                <Trending key="trending" />
              )
            // if (section?.status === '1' && section?.block_key == 'product_reviews')
            //   return (
            //     <DoYouThink getRateOrdersData={getRateOrdersData} key={'product_reviews'} data={ratingData} />
            //   )
            if (section?.status === '1' && section?.block_key == 'have_seen')
              return (
                <HaveYouSeen key="have_seen" navigateTo={navigateTo} data={section} />
              )
            if (section?.status === '1' && section?.block_key == 'testimonial_block')
              return (
                <Testimonial key="testimonial_block" navigateTo={navigateTo} data={section} />
              )
            if (section?.status === '1' && section?.block_key == 'store_locator')
              return (
                <FindNewStore key="store_locator" data={section} />
              )
            if (section?.status === '1' && section?.block_key == 'recommended_products')
              return (
                <Recommended key="recommended_products" />
              )
          })
        }
        {/* {promotionalBanner?.status === '1' && <MobilePromotional key={"promotional_banner"} navigateTo={navigateTo} data={promotionalBanner} />}
        {promotionalProduct?.status === '1' && <PromotionalBanner navigateTo={navigateTo} key={"promotional_products"} data={promotionalProduct} />}
        {categoryBlock?.status === '1' && <Category key="category_block" />}
        {myOffer?.status === '1' && <HotSummer key="my_offer" navigateTo={navigateTo} data={myOffer} />}
        {bestSeller?.status === '1' && <Bestseller key="best_seller" />}
        {skinType?.status === '1' && <Sensitive key="skin_type" navigateTo={navigateTo} data={skinType} />}
        {latestHomeReview?.status === '1' && <LatestReviews latestReviews={latestReviews} />}
        {lybcBlock.status === '1' && userInfo?.tierType === 3 && <JoinClub key="lybc" data={lybcBlock} />}
        {giftData?.status === '1' && <FindOutNow key="gift_block" navigateTo={navigateTo} data={giftData} />}
        {storeOffer?.status === '1' && <StoreOffer key="store_offer" navigateTo={navigateTo} data={storeOffer} />}

        {trending?.status === '1' && <Trending />}
        {productReviews?.status === '1' && ratingData.length > 0 && <DoYouThink getRateOrdersData={getRateOrdersData} key={'static'} data={ratingData} />}
        {haveYouSeenData?.status === '1' && <HaveYouSeen key="have_seen" navigateTo={navigateTo} data={haveYouSeenData} />}
        {testimonialData?.status === '1' && <Testimonial key="testimonial_block" navigateTo={navigateTo} data={testimonialData} />}
        {storeLocator?.status === '1' && <FindNewStore key="store_locator" data={storeLocator} />}
        {recommendedProducts?.status === '1' && <Recommended />} */}
      </div>
    </>
  );
}


