import {
  Theme
  
} from "@mui/material";
import { makeStyles , createStyles} from "@mui/styles";

import Slider from "react-slick";
import Utils from "../../../../utils";
import _ from "lodash";
import Content1 from "./promotionalProductContents/content1";
import Content3 from "./promotionalProductContents/content3";
import Content4 from "./promotionalProductContents/content4";
import Content2 from "./promotionalProductContents/content2";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    maxWidthDiv1: {
      width: "100%",
      margin: theme.spacing(4, 0),
    },
    slider: {
      "& .slick-dots": {
        bottom: "-15px",
      },
      "& .slick-dots li": {
        width: "5px",
        height: "5px",
      },
      "& .slick-dots li button:before": {
        fontSize: "7px",
      },
      "& .slick-dots li.slick-active button:before": {
        color: "var(--main-opacity)",
      },
    },

    heading: {
      font: `normal 700 ${theme.spacing(
        2.4
      )}  Recoleta Alt`,
      color: "var(--white)",
      lineHeight: "33px",
      letterSpacing: "3.1px"
    },
    subheading: {
      font: `normal 600 ${theme.spacing(1.2)} Work Sans`,
      color: "var(--white)",
      letterSpacing: "1px",
      // position: "relative",
      margin: theme.spacing(1.5, 0, 1.5, 0),
    },
    btn: {
      "&.MuiButton-root": {
        borderRadius: 6,
        font: `normal 600 ${theme.spacing(1.2)} Work Sans`,
        textTransform: "capitalize",
        padding: theme.spacing(0.7, 1.4),
        background: "var(--light-green)",
        color: "#363F3C",
      },
    },
    bannerCarousel: {
      "& .carousel-slider": {
        top: "0px !important",
        "& .control-dots": {
          marginBottom: "10px",
          // padding:'10px',
          "& .dot": {
            width: "10px",
            height: "10px",
          },
        },
      },
    },

    sliderRoot: {
      // position: "relative",
      backgroundSize: "cover !important",
      maxWidth: "100%",
      height: "210px",
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      // flexDirection: "column",
      cursor: "pointer",
    },
    imagesDiv: {
      position: "absolute",
      background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)) center center  no-repeat`,
      height: "210px",
      objectFit: "cover",
      width: "100vw",
    },
    noImgDiv: {
      position: "absolute",
      background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)) center center  no-repeat`,
      height: "210px",
      objectFit: "cover",
      width: "100vw",
    },
    textDiv: {
      // display: "flex",
      // alignItems: "start",
      // justifyContent: "start",
      // flexDirection: "column",
      cursor: "pointer",
      position: "relative",
      flexBasis: "45%",
      padding: theme.spacing(0, 1.5),
    },
  })
);
interface Props {
  data: any;
  navigateTo: Function;
  key: string
}

export default function PromotionalProduct({ data, navigateTo }: Props) {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };
  const content = data?.content && Array.isArray(data.content) ? data.content : [];

  return (
    <>
      <div className={classes.maxWidthDiv1}>
        <Slider {...settings} className={classes.slider}>
          {content.map((item: any, index: any) => {
            if (item?.content_type === "content_1")
              return <Content1 item={item} navigateTo={navigateTo} />
            else if (item?.content_type === "content_2")
              return <Content2 item={item} navigateTo={navigateTo} />
            else if (item?.content_type === "content_3")
              return <Content3 item={item} navigateTo={navigateTo} />
            else if (item?.content_type === "content_4")
              return <Content4 item={item} navigateTo={navigateTo} />
            // if (index == 3)
            //   return <Content2 item={item} navigateTo={navigateTo} />
            // if (index == 2)
            //   return <Content4 item={item} navigateTo={navigateTo} />
            // if (index == 0)
            // return <Content3 item={item} navigateTo={navigateTo} />

            //   if (index == 1)
            // return <Content1 item={item} navigateTo={navigateTo} />
          })
          }
        </Slider>
      </div>
    </>
  );
}
