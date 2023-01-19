import Utils from '../../utils';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getHomeRecommendations, getOthersRecommendations } from './action';
import _ from 'lodash';
import SkeletonProductView from '../skeletonList/skeletonProductView';
// import RECOMMENDED_RIGHT from "../../../assets/images/recommendedRight.png";
// import  RECOMMENDED_LEFT from "../../../assets/images/recommendedArrow.png";
import { isGuestUser } from '../../utils/session';
import { ReducersModal } from '../../models';
import Product from '../product';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
// import { showSkeleton, hideSkeleton } from '../../../store/home/action';

const useStyles = makeStyles((theme: Theme) => ({
  recommendedRoot: {
    // padding: theme.spacing(0, 2),
    [theme.breakpoints.down('xs')]: {
      // marginLeft: "10px"
    },
  },
  homeRoot: {
    // padding: theme.spacing(0, 2),
    [theme.breakpoints.down('xs')]: {
      marginLeft: '-10px',
    },
  },
  maxWidthDiv1: {
    padding: theme.spacing(0, 7),
    // maxWidth: "var(--max-width)",
    margin: theme.spacing(1.5, 'auto'),
   
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1.5, 'auto', 0),
      padding: theme.spacing(0, 0),
    },
    [theme.breakpoints.down(500)]: {
      margin: theme.spacing(1.5, 'auto', 0),
      padding: theme.spacing(0, 0),
    },
   
  },
  maxWidthDiv3: {
    padding: theme.spacing(0, 4.5),
    // maxWidth: "var(--max-width)",
    margin: theme.spacing(1.5, 'auto'),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1.5, 'auto', 0),
      padding: theme.spacing(0, 4),
    },
    [theme.breakpoints.down(500)]: {
      margin: theme.spacing(1.5, 'auto', 0),
      padding: theme.spacing(0, 0),
    },
  },
  maxWidthDiv2: {
    maxWidth: 'var(--max-width)',
    margin: theme.spacing(1.5, 3),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1.5, 'auto', 0),
    },
    [theme.breakpoints.down(500)]: {
      margin: theme.spacing(1.5, 'auto', 0),
      padding: theme.spacing(0, 0),
    },
  },
  slider: {
    '& .slick-prev, .slick-next': {
      display: 'block',
      backgroundColor: theme.palette.primary.main,
      height: 40,
      width: 40,
      color: '#fafafa',
      outline: '#fafafa',
      borderRadius: '50%',
      position: 'absolute',
      '&::before': {
        //  background: `url(${Utils.images.RECOMMENDED_ARROW}) center no-repeat`,
        width: '100%',
        height: '100%',
        color: 'white',
      },
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
      '& .react-multi-carousel-list': {
        position: 'unset',
        width: '98%',
      },
    },
    '& .slick-prev': {
      left: '-50px',
      [theme.breakpoints.down('sm')]: {
        // left: "-25px",
        left: '-35px',
        zIndex: 1,
      },
    },
    '& .slick-next:before': {
      content: `url(${Utils.images.RECOMMENDED_ARROW})`,
      opacity: 1,
      // display: 'none',
    },
    '& .slick-next': {
      right: '-50px',
      [theme.breakpoints.down('sm')]: {
        right: '-35px',
        zIndex: 1,
      },
    },
    '& .slick-prev:before': {
      content: `url(${Utils.images.RECOMMENDED_LEFT})`,
            opacity: 1,
    },
    '& .slick-prev:hover, .slick-prev:focus, .slick-next:hover, .slick-next:focus':
      {
        color: 'white',
        background: theme.palette.primary.main,
        outline: 'white',
      },
  },
}));

interface Props {
  type: 'plp' | 'home' | 'pdp' | 'mybag' | 'myOrder';
}

function RecommendationCarousel(props: Props) {
  const { type } = props;
  const [data, setData] = useState([]);
  const [skeleton, setSkeleton] = useState(false);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:
      props.type === 'plp' || props.type === 'pdp'
        ? 5
        : props.type === 'mybag'
        ? 5
        : props.type === 'home'
        ? 5
        : props.type === 'myOrder'
        ? 3
        : 4,
    slidesToScroll:
      props.type === 'plp' || props.type === 'pdp'
        ? 5
        : props.type === 'mybag'
        ? 3
        : props.type === 'home'
        ? 5
        : props.type === 'myOrder'
        ? 3
        : 4,
    mobileFirst: true,
    // autoplay: true,
    // autoplaySpeed:1500,
    // rtl: true,

    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          // slidesToShow: 6,
          // slidesToScroll: 6,
          slidesToShow:
            props.type === 'plp' || props.type === 'pdp'
              ? 4
              : props.type === 'mybag'
              ? 4
              : 4,
          slidesToScroll:
            props.type === 'plp' || props.type === 'pdp'
              ? 4
              : props.type === 'mybag'
              ? 2
              : 4,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: props.type === 'plp' || props.type === 'mybag' ? 3 : 3,
          slidesToScroll:
            props.type === 'plp' || props.type === 'mybag' ? 3 : 3,
          // slidesToShow: 3,
          // slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: props.type === 'plp' || props.type === 'mybag' ? 2 : 2,
          slidesToScroll:
            props.type === 'plp' || props.type === 'mybag' ? 1 : 1,
          rtl: false,
          arrows: false,

          // slidesToShow: 2,
          // slidesToScroll: 2,
        },
      },
    ],
  };
  const dispatch: any = useDispatch();

  useEffect(() => {
    let section = 'home';
    // let section = type;
    if (section === 'home') {
      setSkeleton(true);
      dispatch(
        getHomeRecommendations(
          {
            params: {
              value: isGuestUser() ? 'vr' : 'cr',
              limit: 10,
            },
          },
          (data: any) => {
            setSkeleton(false);

            if (data) setData(data?.data);
          }
        )
      );
    } else {
      if (section !== 'plp') {
        let params: any = { page: 1, limit: 10 };

        // dispatch(showSkeleton());
        dispatch(
          getOthersRecommendations(params, (data: any) => {
            // dispatch(hideSkeleton());
            setData(data?.data);
          })
        );
      }
    }
  }, []);

  const recommendedData = useSelector(
    (state: ReducersModal) => state.recommendReducer?.recommendedData
  );
  const classes = useStyles();
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });

  const arrData =
    type === 'home' || type !== 'plp' ? data : recommendedData?.data;

  return (
    <>
      {recommendedData && (
        <div
          className={
            type === 'home' || type === 'mybag'
              ? classes.homeRoot
              : classes.recommendedRoot
          }
        >
          {skeletonLoader ||
          skeleton ||
          Object.keys(recommendedData)?.length === 0 ? (
            <SkeletonProductView
              flag={'recommend'}
              gridsArray={
                type === 'plp' || type === 'pdp' || type === 'home'
                  ? [1, 2, 3, 4]
                  : [1, 2, 3, 4]
              }
              lg={3}
            />
          ) : (
            <div
              className={
                props.type === 'plp'
                  ? classes.maxWidthDiv2
                  : props.type === 'myOrder'
                  ? classes.maxWidthDiv3
                  : classes.maxWidthDiv1
              }
            >
              {arrData?.length > 0 && (
                <Slider {...settings} className={classes.slider}>
                  {arrData?.map((item: any) => {
                    let image = item?.image?.[0]?.file;
                    // let image = _.find(item.customAttributes, { attribute_code: 'swatch_image' });
                    let configurableProduct =
                      item?.configurableProductLinks?.find(
                        (item: any) => item?.isInStock
                      ) || item?.configurableProductLinks[0];
                    let desc =
                      item?.type === 'configurable'
                        ? _.find(configurableProduct?.customAttributes, {
                            attribute_code: 'short_description',
                          })
                        : _.find(item.customAttributes, {
                            attribute_code: 'short_description',
                          });

                    let productName = _.truncate(
                      Utils.CommonFunctions.replaceHtmlTag(item?.name),
                      { length: 45 }
                    );
                    return (
                      <Product
                        type={type}
                        productName={productName}
                        key={item._id}
                        section="recommend"
                        detail={_.truncate(
                          Utils.CommonFunctions.replaceHtmlTag(desc?.value),
                          { length: props.type === 'plp' ? 50 : 50 }
                        )}
                        rate={item.price}
                        img={image}
                        attr={item}
                        flag="recommended"
                      />
                    );
                  })}
                </Slider>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default RecommendationCarousel;
