import { makeStyles } from "@mui/styles";
// import Utils from "../../../utils";
import Slider from "react-slick";
import Content1 from "./bannerContent/content1";
import Content3 from "./bannerContent/content3";
import Content4 from "./bannerContent/content4";
import Content2 from "./bannerContent/content2";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  bannerRoot: {
    // background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${Utils.images.BANNER_HOME}) center center  no-repeat`,
    backgroundSize: "cover !important",
    maxWidth: "100vh",
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      height: "65vh",
    },
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      7.2
    )} Druk`,
    color: "var(--white)",
    textAlign: "center",
    letterSpacing: "1px",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.spacing(3),
    },
    textTransform: "uppercase",
  },
  subheading: {
    font: `normal 600 ${theme.spacing(1.8)} Work Sans`,
    color: "var(--white)",
    textAlign: "center",
    letterSpacing: "1px",
    position: "relative",
    padding: theme.spacing(0, 6),
    margin: theme.spacing(2.1, 0, 3.6, 0),
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.spacing(1.4),
      padding: theme.spacing(0, 1),
    },
  },
  btn: {
    "&.MuiButton-root": {
      borderRadius: 4,
      font: `normal 600 ${theme.spacing(1.6)} Work Sans`,
      textTransform: "capitalize",
      padding: theme.spacing(2, 4),
      color: "var(--white)",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.spacing(1.4),
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
  slider: {
    "& .slick-dots": {
      bottom: "10px",
    },
    "& .slick-dots li": {
      width: "10px",
      height: "10px",
    },
    "& .slick-dots li button:before": {
      fontSize: "12px",
    },
    "& .slick-dots li.slick-active button:before": {
      color: "var(--white)",
    },
  },
  maxWidthDiv1: {
    width: "100%",
    // maxWidth: "var(--max-width)",
    margin: theme.spacing(0, 0),
  },
  sliderRoot: {
    position: "relative",
    backgroundSize: "cover !important",
    maxWidth: "100%",
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      height: "65vh",
    },
  },
  imagesDiv: {
    position: "absolute",
    background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)) center center  no-repeat`,
    height: "80vh",
    objectFit: "cover",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      height: "65vh",
    },
  },
  textDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    cursor: "pointer",
  },
}));
interface Props {
  data: any;
  navigateTo: Function;
}
const Banner = (props: Props) => {
  const classes = useStyles();
  const { data, navigateTo } = props;
  // const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <>
      <div className={classes.maxWidthDiv1}>
        <Slider {...settings} className={classes.slider}>
          {data?.content &&
            Array.isArray(data?.content) &&
            data.content.map((item: any, _index: any) => {
              if (item?.content_type === "content_1")
                return (
                  <Content1 item={item} key={item.id} navigateTo={navigateTo} />
                );
              else if (item?.content_type === "content_2")
                return (
                  <Content2 item={item} key={item.id} navigateTo={navigateTo} />
                );
              else if (item?.content_type === "content_3")
                return (
                  <Content3 item={item} key={item.id} navigateTo={navigateTo} />
                );
              else if (item?.content_type === "content_4")
                return (
                  <Content4 item={item} key={item.id} navigateTo={navigateTo} />
                );
            })}
        </Slider>
      </div>
    </>
  );
};

export default Banner;
