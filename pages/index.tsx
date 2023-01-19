import { Box, Theme, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveLocationHistory } from '../component/common/breadCrumb/action';
import DoubleCard from '../component/common/doubleCard';
import { HomeSkeletonList } from '../component/common/skeletonList/homeSkeletonList';
import Banner from '../component/components/pagesComponents/home/banner';
import DiscoverMore from '../component/components/pagesComponents/home/discoverMore';
import FindOutMore from '../component/components/pagesComponents/home/findOutMore';
import HaveYouSeen from '../component/components/pagesComponents/home/haveYouSeen';
import MoreToShop from '../component/components/pagesComponents/home/moreToShop';
// import Recommended from "../component/components/pagesComponents/home/recommended";
import Testimonial from '../component/components/pagesComponents/home/testimonial';
import { ReducersModal } from '../component/models';
import Utils from '../component/utils';
import { getAuthToken, getHomeData } from '../store/home/action';
import { wrapper } from '../store/store';
import events from '../component/utils/event/constant';
import { PageMeta } from '../component/page-meta/PageMeta';
import { screenViewed } from '../component/utils/event/action';
import '../styles/Home.module.css';
import request from '../component/utils/request';
import Recommended from '../component/components/pagesComponents/home/recommended';
import HomeMobileView from '../component/components/pagesComponents/home/mobileView';
import theme from '../config/theme';
// import Cookies from "js-cookie";

const useStyles: any = makeStyles((theme: Theme) => ({
  homeRoot: {
    maxWidth: '1920px',
    margin: '0 auto',
  },
  skeleton: {
    margin: theme.spacing(2, 0),
  },
}));

const Index = () => {
  const classes = useStyles();
  const { query } = useRouter();
  const isSmall = useMediaQuery(theme.breakpoints.down(600));

  // const homeData = useSelector((state: ReducersModal) => {
  //   return state.homeReducer.homeData})

  const stateData = useSelector((state: any) => state.homeReducer?.homeData);
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
        title: 'Home',
        action: '/',
      },
    ];
    dispatch(saveLocationHistory(breadCrumbData));
    // getRateOrdersData();

    /**
     * Event logger
     */
    screenViewed({
      ScreenName: events.SCREEN_HOME,
      CTGenerated: 'WEB',
    });
    // if(isAuthenticated())
    // dispatch(
    //   getDashboardData(() => {

    //   }))
  }, []);

  useEffect(() => {
    const promotionalProduct = homeData?.find(
      (data: any) => data?.block_key === 'promotional_products'
    );
    const giftData = homeData?.find(
      (data: any) => data?.block_key === 'gift_block'
    );
    const haveYouSeenData = homeData?.find(
      (data: any) => data?.block_key === 'have_seen'
    );
    const testimonialData = homeData?.find(
      (data: any) => data?.block_key === 'testimonial_block'
    );
    const recommendedProducts = homeData?.find(
      (data: any) => data?.block_key === 'recommended_products'
    );
    const productReviews = homeData?.find(
      (data: any) => data?.block_key === 'product_reviews'
    );
    const shareLoveData = homeData?.find(
      (data: any) => data?.block_key === 'share_love'
    );
    const moreToShopData = homeData?.find(
      (data: any) => data?.block_key === 'more_shop'
    );
    const tipsAdvicesData = homeData?.find(
      (data: any) => data?.block_key === 'tips_block'
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
      if (item.entity === 'product') {
        let pathname = Utils.CommonFunctions.seoUrl(
          { ...item, id: item?.entity_id },
          'others'
        ).replace('/c/', '/p/');
        history.push(pathname);
      } else if (item.entity === 'offers') {
        history.push({
          pathname: '/offers',
          search: `?offer=${item?.entity_id}`,
          query: { pageName: 'Offers' },
        });
      } else if (item.entity === 'url') {
        window.open(item?.entity_id);
      } else if (item.entity === 'page') {
        if (item.entity_id === 'about')
          history.push({ pathname: '/about-us', query: { pageName: 'About' } });
        else if (item.entity_id === 'terms')
          history.push({
            pathname: '/terms-conditions',
            query: { pageName: 'Terms And Conditions' },
          });
        else if (item.entity_id === 'policy')
          history.push({
            pathname: '/privacy-policy',
            query: { pageName: 'Privacy Policy' },
          });
        else if (item.entity_id === 'gift-card') {
          history.push({
            pathname: '/gift-card',
            query: { pageName: 'Gift Card' },
          });
        } else if (item.entity_id === 'faq')
          history.push({ pathname: '/faq', query: { pageName: "FAQ's" } });
        else if (item.entity_id === 'stores')
          history.push({
            pathname: '/stores',
            query: { pageName: 'Find Stores' },
          });
        else history.push('/' + item?.entity_id);
        // }
        // else
        //   history.push('/' + item?.entity_id);
      } else if (item.entity === 'category') {
        // const path = `${Utils.routes.PRODUCT_LIST}`;
        // history.push({ pathname: path, search: `?categoryId=${item.entity_id}`, query: { fromPath: "home" } });
        let pathname = Utils.CommonFunctions.seoUrl(
          { ...item, id: item?.entity_id },
          'others'
        );
        history.push({ pathname, query: { fromPath: 'home' } });
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
      <PageMeta
        title={'Cruelty-Free & Beauty Products | The Body Shop'}
        description={
          'Buy Cruelty Free Beauty product from The Body Shop India.'
        }
      />
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <div className={classes.homeRoot}>
          {sortedHomedata.map((section: any) => {
            if (
              section?.status === '1' &&
              section?.block_key == 'recommended_products'
            )
              return (
                <Recommended
                  key={'recommended_products' + Math.random()}
                  data={section}
                />
              );
            if (
              section?.status === '1' &&
              section?.block_key == 'promotional_products'
            )
              return (
                <Banner
                  navigateTo={navigateTo}
                  key={'promotional_products' + Math.random()}
                  data={section}
                />
              );
            // if (
            //   section?.status === "1" &&
            //   section?.block_key == "product_reviews" &&
            //   ratingData.length > 0
            // )
            //   return (
            //     <DoYouThink
            //       getRateOrdersData={getRateOrdersData}
            //       key={"product_reviews" + Math.random()}
            //       data={ratingData}
            //     />
            //   );
            if (section?.status === '1' && section?.block_key == 'gift_block')
              return (
                <FindOutMore
                  key={'gift_block' + Math.random()}
                  navigateTo={navigateTo}
                  data={section}
                />
              );
            if (section?.status === '1' && section?.block_key == 'have_seen')
              return (
                <HaveYouSeen key={'have_seen' + Math.random()} data={section} />
              );
            if (section?.status === '1' && section?.block_key == 'share_love')
              return (
                <DiscoverMore
                  navigateTo={navigateTo}
                  key={'share_love' + Math.random()}
                  data={section}
                />
              );
            if (section?.status === '1' && section?.block_key == 'tips_block')
              return (
                <>
                  <DoubleCard
                    navigateTo={navigateTo}
                    data={section?.content?.[0] || {}}
                    key={'tips_block' + Math.random()}
                  />
                  {section?.content?.[1] && (
                    <DoubleCard
                      navigateTo={navigateTo}
                      key={'tips_block' + Math.random()}
                      data={section?.content?.[1] || {}}
                      rightImg
                    />
                  )}
                </>
              );

            if (section?.status === '1' && section?.block_key == 'more_shop')
              return (
                <MoreToShop data={section} key={'more_shop' + Math.random()} />
              );
            if (
              section?.status === '1' &&
              section?.block_key == 'testimonial_block'
            )
              return (
                <Testimonial
                  key={'testimonial_block' + Math.random()}
                  data={section}
                />
              );
          })}
        </div>
      </Box>
      {isSmall && (
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <HomeMobileView />
        </Box>
      )}
    </>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res }) => {
    let resp = await request.post(Utils.endPoints.GUEST_SIGNUP);
    let authToken: any = '';
    if (resp) {
      authToken = resp?.data?.data?.authToken;
      await store.dispatch(getHomeData(authToken));
    }

    return { props: {} };
  }
);
