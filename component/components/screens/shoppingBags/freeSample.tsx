import {
  Typography,
  Theme,
  Skeleton,
} from '@mui/material';
import _ from "lodash";
import { makeStyles } from '@mui/styles';
import Utils from '../../../utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import Product from '../../../common/product';
import SkeletonProductView from '../../../common/skeletonList/skeletonProductView';
// import RECOMMENDED_LEFT from '../../assets/images/recommendedArrow.png';
import { getFreeSamples } from './action';

const useStyles = makeStyles((theme: Theme) => ({
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
      content: `url(${Utils.images.RECOMMENDED_LEFT})`,
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

  mainContainer: {
    // margin: theme.spacing(2.5, 0),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1.5, 0),
    },
  },
  root: {
    display: 'flex',

    alignItems: 'center',
  },
  btnContainer: {
    float: 'right',
  },
  button: {
    color: 'var(--main-opacity)',
    border: '1px solid var(--main-opacity) ',
    margin: theme.spacing(1, 1.5, 0, 0),
    padding: theme.spacing(0.8, 2),
  },
  heading: {
    font: `normal  ${theme.spacing(2.4)} Recoleta Alt Bold`,
    lineHeight: '33px',
    letterSpacing: '0.02em',
    color: 'var(--green-color)',
    [theme.breakpoints.down('xs')]: {
      color: 'var(--black)',
      font: `normal  ${theme.spacing(1.6)} Recoleta Alt Bold`,
      letterSpacing: '0.05em',
    },
  },
  externalContainer: {
    margin: theme.spacing(0, 0),
  },

  productDiv: {
    padding: theme.spacing(0, 1),
    margin: theme.spacing(2, 0),
  },

  imgDiv1: {
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    height: '200px',
    background: 'var(--medium-creame-color)',
    '& img': {
      width: '100%',
      objectFit: 'contain',
    },
  },
  contentDiv: {
    margin: theme.spacing(1, 0),
  },
  insideDiv: {},
  productName: {
    font: `normal  ${theme.spacing(2)} Work Sans`,
    fontWeight: 600,
    color: 'var(--secondary-black)',
    lineHeight: '24px',
  },
  starDiv: {
    margin: theme.spacing(0.5, 0),
    display: 'flex',
    alignItems: 'center',
  },
  rating: {
    color: theme.palette.secondary.light,
  },
  count: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )} Work Sans`,
    color: 'var(--light-gray)',
    marginTop: theme.spacing(0.3),
  },
  discription: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.2
    )} Work Sans`,
    color: 'var(--light-gray)',
    height: 10,
    [theme.breakpoints.down('sm')]: {
      height: 40,
    },
  },
  quantity: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: 1.6,
    height: '16px',
    margin: theme.spacing(0.5, 0, 0, 0),
    color: theme.palette.primary.main,
    textTransform: 'lowercase',
  },
  imageDiv: {
    position: 'relative',
  },
  price: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Work Sans`,
    lineHeight: 1.6,
    height: '16px',
    margin: theme.spacing(0.5, 0, 0, 0),
    color: theme.palette.primary.main,
    textTransform: 'lowercase',
  },
  btn: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  icon: {
    marginLeft: theme.spacing(1),
    width: theme.spacing(2),
    height: theme.spacing(2.2),
  },
  heartImg: {
    position: 'absolute',
    top: '1%',
    right: '2%',
  },
  skeleton: {
    marginLeft: '10px',
  },
  maxWidthDiv1: {
    padding: theme.spacing(0, 7),
    // maxWidth: "var(--max-width)",
    margin: theme.spacing(0.5, 'auto'),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0.5, 'auto', 0),
      padding: theme.spacing(0, 4),
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0.2, 'auto', 0),
      padding: theme.spacing(0, 0),
    },
  },
}));
const FreeSample: React.FC<any> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [samples, setSamples] = useState<any>([]);
  const sampleProductLimit =
    useSelector(
      (state: any) => state.configReducer.generalConfigs?.sample_product_limit
    ) || 0;

  const skeletonLoader = useSelector((state: any) => {
    return state.loadingReducer.skeletonLoader;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    // dispatch(showSkeleton());
    getFreeSamples()
      .then((resp) => {
        setSamples(resp.data);
        // dispatch(hideSkeleton());
      })
      .catch((err) => {
        // dispatch(hideSkeleton());
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: err.response.data.message,
            },
          });
      });
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    mobileFirst: true,
    // rtl: true,

    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          // slidesToShow: 6,
          // slidesToScroll: 6,
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          // slidesToShow: 3,
          // slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,

          // slidesToShow: 2,
          // slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <>
      {(samples?.data?.length || skeletonLoader) && (
        <div className={classes.mainContainer}>
          <div className={classes.root}>
            {skeletonLoader ? (
              <>
                <Skeleton height={30} width={40} />
                <Skeleton
                  className={classes.skeleton}
                  height={30}
                  width={140}
                />
              </>
            ) : samples?.data?.length > 0 &&
              sampleProductLimit &&
              sampleProductLimit > 0 ? (
              <>
                <Typography variant="h1" className={classes.heading}>
                  Free Samples
                </Typography>
                <img
                  src={Utils.images.GIFT}
                  alt="GIFT"
                  className={classes.icon}
                />
              </>
            ) : (
              ''
            )}
          </div>
          <div className={classes.externalContainer}>
            {skeletonLoader ? (
              <SkeletonProductView
                flag={'free_sample'}
                sm={3}
                md={2}
                gridsArray={Array.of(1, 2, 3, 4)}
              />
            ) : (
              <div className={classes.maxWidthDiv1}>
                {/* <Grid container> */}
                {samples?.data?.length > 0 && (
                  <Slider {...settings} className={classes.slider}>
                    {samples?.data?.map((item: any, index: any) => {
                      let image = item?.image?.[0]?.file;
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
                      if (index <= sampleProductLimit - 1)
                        return (
                          // <Grid item xs={6} md={3} key={index}>
                          <div key={index}>
                            <Product
                              type="freeSample"
                              section="cart"
                              key={item?._id}
                              detail={_.truncate(
                                Utils.CommonFunctions.replaceHtmlTag(
                                  desc?.value
                                ),
                                { length: 50 }
                              )}
                              rate={'0'}
                              img={image}
                              attr={item}
                            />
                            {/* </Grid> */}
                          </div>
                        );
                    })}
                  </Slider>
                )}
                {/* </Grid> */}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FreeSample;
