// ************************ components *****
import Banner from "./banner";
import DiscoverMore from "./discoverMore";
// import DoYouThink from "./doYouThink";
import FindOutMore from "./findOutMore";
import HaveYouSeen from "./haveYouSeen";
import Testimonial from "./testimonial";
import MoreToShop from "./moreToShop";
import Recommended from "./recommended";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Utils from "../../../utils";
// import {  getRatingData } from "./actions";
import { screenViewed } from "../../../utils/event/action";
import events from "../../../utils/event/constant";
// import HomeMobileView from "./mobileView";
// import { getDashboardData } from "../account/lybc/action";
// import { isAuthenticated } from "../../../utils/session";
import { ReducersModal } from "../../../models";
import { useRouter } from "next/router";
import { saveLocationHistory } from "../../../common/breadCrumb/action";
import { HomeSkeletonList } from "../../../common/skeletonList/homeSkeletonList";
import DoubleCard from "../../../common/doubleCard";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles: any = makeStyles((theme: Theme) => ({
  homeRoot: {
    maxWidth: "1920px",
    margin: "0 auto",
  },
  skeleton: {
    margin: theme.spacing(2, 0),
  },
}));

const Home = () => {
  const classes = useStyles();
  const { query } = useRouter();

  // const homeData = useSelector((state: ReducersModal) => {
  //   return state.homeReducer.homeData})

  const stateData = useSelector((state: any) => state.homeReducer.homeData);
  const homeData = stateData;
  const dispatch: any = useDispatch();
  const history = useRouter();

  const [sortedHomedata, setSortedHomedata] = useState<any>([]);
  // const getRateOrdersData = () => {
  //   dispatch(getRatingData('?page=1&limit=10', (resp: any) => {
  //     setRatingData(resp?.data || [])
  //   }))
  // }

  useEffect(() => {
    let breadCrumbData = [
      {
        title: "Home",
        action: "/",
      },
    ];
    dispatch(saveLocationHistory(breadCrumbData));
    // getRateOrdersData();

    /**
     * Event logger
     */
    screenViewed({
      ScreenName: events.SCREEN_HOME,
      CTGenerated: "WEB",
    });
    // if(isAuthenticated())
    // dispatch(
    //   getDashboardData(() => {

    //   }))
  }, []);

  useEffect(() => {
    const promotionalProduct = homeData?.find(
      (data: any) => data?.block_key === "promotional_products"
    );
    const giftData = homeData?.find(
      (data: any) => data?.block_key === "gift_block"
    );
    const haveYouSeenData = homeData?.find(
      (data: any) => data?.block_key === "have_seen"
    );
    const testimonialData = homeData?.find(
      (data: any) => data?.block_key === "testimonial_block"
    );
    const recommendedProducts = homeData?.find(
      (data: any) => data?.block_key === "recommended_products"
    );
    const productReviews = homeData?.find(
      (data: any) => data?.block_key === "product_reviews"
    );
    const shareLoveData = homeData?.find(
      (data: any) => data?.block_key === "share_love"
    );
    const moreToShopData = homeData?.find(
      (data: any) => data?.block_key === "more_shop"
    );
    const tipsAdvicesData = homeData?.find(
      (data: any) => data?.block_key === "tips_block"
    );

    const arr = [
      promotionalProduct,
      giftData,
      haveYouSeenData,
      testimonialData,
      recommendedProducts,
      productReviews,
      shareLoveData,
      moreToShopData,
      tipsAdvicesData,
    ];
    const sortedMobileHomeData = arr.sort((a: any, b: any) => {
      return Number(a?.position) - Number(b?.position);
    });
    setSortedHomedata(sortedMobileHomeData);
  }, [homeData]);

  const navigateTo = (item: any) => {
    if (item.entity && item.entity_id) {
      if (item.entity === "product") {
        let pathname = Utils.CommonFunctions.seoUrl(
          { ...item, id: item?.entity_id },
          "others"
        ).replace("/c/", "/p/");
        history.push(pathname);
      } else if (item.entity === "offers") {
        history.push({
          pathname: "/offers",
          search: `?offer=${item?.entity_id}`,
          query: { pageName: "Offers" },
        });
      } else if (item.entity === "url") {
        window.open(item?.entity_id);
      } else if (item.entity === "page") {
        if (item.entity_id === "about")
          history.push({ pathname: "/about-us", query: { pageName: "About" } });
        else if (item.entity_id === "terms")
          history.push({
            pathname: "/terms-conditions",
            query: { pageName: "Terms And Conditions" },
          });
        else if (item.entity_id === "policy")
          history.push({
            pathname: "/privacy-policy",
            query: { pageName: "Privacy Policy" },
          });
        else if (item.entity_id === "gift-card") {
          history.push({
            pathname: "/gift-card",
            query: { pageName: "Gift Card" },
          });
        } else if (item.entity_id === "faq")
          history.push({ pathname: "/faq", query: { pageName: "FAQ's" } });
        else if (item.entity_id === "stores")
          history.push({
            pathname: "/stores",
            query: { pageName: "Find Stores" },
          });
        else history.push("/" + item?.entity_id);
        // }
        // else
        //   history.push('/' + item?.entity_id);
      } else if (item.entity === "category") {
        // const path = `${Utils.routes.PRODUCT_LIST}`;
        // history.push({ pathname: path, search: `?categoryId=${item.entity_id}`, query: { fromPath: "home" } });
        let pathname = Utils.CommonFunctions.seoUrl(
          { ...item, id: item?.entity_id },
          "others"
        );
        history.push({ pathname, query: { fromPath: "home" } });
      }
    }
  };
  const skeletonLoader = useSelector((query: ReducersModal) => {
    return query.loadingReducer.skeletonLoader;
  });

  return skeletonLoader ? (
    <HomeSkeletonList />
  ) : (
    <>
      <div className={classes.homeRoot}>
        {/* {bannerData?.status === '1' && <Addvertisement key='promotional_banner' data={bannerData} />} */}
        {/* {promotionalProduct?.status === '1' && <Banner navigateTo={navigateTo} key={"promotional_products"} data={promotionalProduct} />}
            {ratingData.length > 0 &&
              <DoYouThink getRateOrdersData={getRateOrdersData} key={'static'} data={ratingData} />
            }
            {giftData?.status === '1' && <FindOutMore navigateTo={navigateTo} data={giftData} />}
            {haveYouSeenData?.status === '1' && <HaveYouSeen key={"have_seen"} data={haveYouSeenData} />}
            {shareLoveData?.status === '1' && <DiscoverMore navigateTo={navigateTo} key={'share_love'} data={shareLoveData} />}
            {tipsAdvicesData?.status === '1' &&
              <>
                <DoubleCard navigateTo={navigateTo} data={tipsAdvicesData?.content?.[0] || {}} />
                {tipsAdvicesData?.content?.[1] && <DoubleCard navigateTo={navigateTo} data={tipsAdvicesData?.content?.[1] || {}} rightImg />}
              </>
            }
            {moreToShopData?.status === '1' && <MoreToShop data={moreToShopData} />}
            {testimonialData?.status === '1' && <Testimonial key={'testimonial_block'} data={testimonialData} />}
            {recommendedProducts?.status === '1' && <Recommended data={recommendedProducts} />} */}
        {/* if recommended products status is one make api  which is already done*/}

        {sortedHomedata.map((section: any) => {
          // if (section?.status === '1' && section?.block_key == 'recommended_products')
          //   return (
          //     <Recommended key="recommended_products" data={section} />
          //   )
          if (
            section?.status === "1" &&
            section?.block_key == "promotional_products"
          )
            return (
              <Banner
                navigateTo={navigateTo}
                key={"promotional_products"}
                data={section}
              />
            );
          // if (section?.status === '1' && section?.block_key == 'product_reviews' && ratingData.length > 0)
          //   return (
          //     <DoYouThink getRateOrdersData={getRateOrdersData} key={'product_reviews'} data={ratingData} />
          //   )
          if (section?.status === "1" && section?.block_key == "gift_block")
            return (
              <FindOutMore
                key="gift_block"
                navigateTo={navigateTo}
                data={section}
              />
            );
          // if (section?.status === '1' && section?.block_key == 'have_seen')
          //   return (
          //     <HaveYouSeen key="have_seen" data={section} />
          //   )
          if (section?.status === "1" && section?.block_key == "share_love")
            return (
              <DiscoverMore
                navigateTo={navigateTo}
                key="share_love"
                data={section}
              />
            );
          if (section?.status === "1" && section?.block_key == "tips_block")
            return (
              <>
                <DoubleCard
                  navigateTo={navigateTo}
                  data={section?.content?.[0] || {}}
                />
                {section?.content?.[1] && (
                  <DoubleCard
                    navigateTo={navigateTo}
                    data={section?.content?.[1] || {}}
                    rightImg
                  />
                )}
              </>
            );
          // if (section?.status === '1' && section?.block_key == 'more_shop')
          //   return (
          //     <MoreToShop data={section} />
          //   )
          // if (section?.status === '1' && section?.block_key == 'testimonial_block')
          //   return (
          //     <Testimonial key="testimonial_block" data={section} />
          //   )
        })}
      </div>

      {/* <Hidden smUp>
          <HomeMobileView />
        </Hidden> */}
    </>
  );
};

export default Home;
