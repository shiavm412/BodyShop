import {
  Theme,
  Typography,
  Grid,
} from "@mui/material";
import { makeStyles , createStyles} from "@mui/styles";

import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Slider from "react-slick";
import Product from "../../../../common/product";
import { getHomeRecommendations } from "../../../../common/recommendationCarousel/action";
import Utils from "../../../../utils";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      font: `normal 700 ${theme.spacing(1.6)}  Recoleta Alt Bold`,
      color: "var(--secondary-black)",
      textTransform: "capitalize",
      letterSpacing: "0.04em",
      marginTop: theme.spacing(1),
    },
    container: {
      width: "100%",
      height: "auto",
      padding: theme.spacing(1),
    },
    slider: {
      "& .slick-prev, .slick-next": {
        display: "block",
        backgroundColor: theme.palette.primary.main,
        height: 40,
        width: 40,
        color: "#fafafa",
        outline: "#fafafa",
        borderRadius: "50%",
        position: "absolute",
        "&::before": {
          //  background: `url(${Utils.images.RECOMMENDED_ARROW}) center no-repeat`,
          width: "100%",
          height: "100%",
          color: "white",
        },
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
        "& .react-multi-carousel-list": {
          position: "unset",
          width: "98%",
        },
      },
      "& .slick-prev": {
        left: "-50px",
        [theme.breakpoints.down("sm")]: {
          // left: "-25px",
          left: "-35px",
          zIndex: 1,
        },
      },
      "& .slick-next:before": {
        content: `url(${Utils.images.RECOMMENDED_ARROW})`,
        opacity: 1,
        // display: 'none',
      },
      "& .slick-next": {
        right: "-50px",
        [theme.breakpoints.down("sm")]: {
          right: "-35px",
          zIndex: 1,
        },
      },
      "& .slick-prev:before": {
        content: `url(${Utils.images.RECOMMENDED_LEFT})`,
        opacity: 1,
      },
      "& .slick-prev:hover, .slick-prev:focus, .slick-next:hover, .slick-next:focus":
      {
        color: "white",
        background: theme.palette.primary.main,
        outline: "white",
      },
    },
    productData: {
      // margin: theme.spacing(1, "0"),
      padding: theme.spacing(0, 1),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0, 0),
      },
    },
    maxWidthDiv1: {
      padding: theme.spacing(0, 7),
      // maxWidth: "var(--max-width)",
      margin: theme.spacing(1.5, "auto"),
      [theme.breakpoints.down("md")]: {
        margin: theme.spacing(1.5, "auto", 0),
        padding: theme.spacing(0, 4),
      },
      [theme.breakpoints.down(500)]: {
        margin: theme.spacing(1.5, "auto", 0),
        padding: theme.spacing(0, 0),
        marginLeft: "-10px",
      },
    },
  })
);

export default function Trending() {
  const classes = useStyles();
  const dispatch : any = useDispatch();
  const [trendingdata, setTrendingData] = useState([]);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    mobileFirst: true,
    // autoplay: true,
    // autoplaySpeed:1500,
    // rtl: true,

    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rtl: false,
          arrows: false,

          // slidesToShow: 2,
          // slidesToScroll: 2,
        },
      },
    ],
  };
  useEffect(() => {
    dispatch(
      getHomeRecommendations(
        {
          params: {
            value: "trending",
            limit: 10,
          },
        },
        (response: any) => {
          setTrendingData(response?.data || []);
        }
      )
    );
  }, []);

  // const data = [
  //   {
  //     id: 1,
  //     img: `${Utils.images.SHAMPOO}`,
  //   },
  //   {
  //     id: 2,
  //     img: `${Utils.images.SHAMPOO}`,
  //   },
  //   {
  //     id: 3,
  //     img: `${Utils.images.SHAMPOO}`,
  //   },
  // ];
  return trendingdata?.length > 0 ? (
    <>
      <div className={classes.container}>
        <Typography variant="h4" className={classes.heading}>
          Trending
        </Typography>

        {/* <Product data={data} /> */}
        <div className={classes.maxWidthDiv1}>
          {trendingdata?.length > 0 && (
            <Slider {...settings} className={classes.slider}>
              {trendingdata?.map((item: any, i: any) => {
                let image = item?.image?.[0]?.file;
                //     { _.find(productData?.customAttributes, { attribute_code: "short_description" }) ?
                //     _.truncate(Utils.CommonFunctions.replaceHtmlTag(_.find(productData?.customAttributes, { attribute_code: "short_description" }).value), { length: 50 })
                //     :
                // null
                // }
                let configurableProduct = item?.configurableProductLinks?.find((item: any) => item?.isInStock)|| item?.configurableProductLinks[0]


                let desc = item?.type === "configurable" ? _.find(configurableProduct?.customAttributes, { attribute_code: "short_description" })
                  : _.find(item.customAttributes, {
                    attribute_code: "short_description",
                  });
                
                let productName = _.truncate(
                  Utils.CommonFunctions.replaceHtmlTag(item?.name),
                  { length: 45 }
                )

                return (
                  <Product
                    type="mobile-home"
                    productName={productName}
                    key={item._id}
                    section="plp"
                    detail={_.truncate(
                      Utils.CommonFunctions.replaceHtmlTag(desc?.value),
                      { length: 80 }
                    )}
                    rate={item.price}
                    img={image}
                    attr={item}
                  />

                );
              })}
            </Slider>
          )}
        </div>
      </div>
    </>
  ) : null;
}
