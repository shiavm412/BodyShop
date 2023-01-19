import { Theme,  Typography } from "@mui/material";
import { makeStyles , createStyles} from "@mui/styles";

import Utils from "../../../../utils";
import Slider from "react-slick";
import Content1 from "./promotionalBannerContents/content1";
import Content2 from "./promotionalBannerContents/content2";
import Content3 from "./promotionalBannerContents/content3";
import Content4 from "./promotionalBannerContents/content4";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    maxWidthDiv1: {
      width: "100%",
      // maxWidth: "var(--max-width)",
      margin: theme.spacing(0, 0),
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
    container: {
      display: "flex !important",
      justifyContent: "stretch",
      alignItems: "stretch",
    },
    leftContainer: {},
    rightContainer: {
      // background: "var(--primary)",
      flexBasis: "81%",
      position: "relative",
    },
    imgContainer: {
      height: "100%",
    },
    img: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      objectFit: "cover",
    },
    textContainer: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      padding: theme.spacing(1.2, 1.2, 1.2, 1.5),
    },
    heading: {
      color: "var(--white)",
      letterSpacing: "0.07em",
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2
      )} Druk`,
    },
    rightImg: {
      position: "absolute",
      width: "100%",
      height: theme.spacing(8),
      objectFit: "cover",
    },
    subHeading: {
      color: "var(--white)",
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.2
      )} Work Sans`,
      letterSpacing: "0.01em",
      marginTop: theme.spacing(1),
    },
    noImg: {
      padding: "10px",
      width: theme.spacing(8),
      height: theme.spacing(8),
      background: ""
      // objectFit: "cover",
    }
  })
);
interface Props {
  data: any;
  navigateTo: Function;
  key: string
};

export default function PromotionalBanner({ data, navigateTo }: Props) {
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
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

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



            // // if (index ==3)
            // //   return <Content4 item={item} navigateTo={navigateTo} />

            // if (index == 2)
            //   return <Content3 item={item} navigateTo={navigateTo} />

            // if (index == 0)
            //   return <Content2 item={item} navigateTo={navigateTo} />

            //   if (index == 1)
            // return <Content1 item={item} navigateTo={navigateTo} />
          })
          }
        </Slider>
      </div>
    </>
  );
}
