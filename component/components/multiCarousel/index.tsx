import _ from "lodash";
import Carousel from "react-multi-carousel";
import Utils from "../../utils";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";

// import { useNavigate } from "react-router-dom";
// import Recommended from "../../assets/images/recommendedArrow.png";
import { useRouter } from "next/router";
import { Typography, Theme } from "@mui/material";
// import { PRODUCT_PLACEHOLDER } from "utils/constantImages";

const useStyles = makeStyles((theme: Theme) =>
 ({
    multiCarousel: {},
    itemDiv: {
      marginRight: theme.spacing(1),
      cursor: "pointer"
    },
    // carousel: {
    //   "& .react-multiple-carousel__arrow": {
    //     backgroundColor: theme.palette.secondary.main,
    //     minHeight: 35,
    //     minWidth: 35,
    //     borderRadius: "unset",
    //     "&::before": {
    //       content: `url(${Utils.images.CAROUSEL_ARROW})`,
    //       width: "100%",
    //       height: "100%",
    //     },
    //   },
    //   "& .react-multiple-carousel__arrow--left": {
    //     "&::before": {
    //       transform: "rotate(180deg)",
    //     },
    //   },
    // },
    carousel: {
      "& .react-multiple-carousel__arrow": {
        backgroundColor: "var(--green-color)",
        minHeight: 40,
        minWidth: 40,
        // borderRadius: "unset",
        borderRadius: "50%",
        "&::before": {
          content: `url(${Utils.images.RECOMMENDED_ARROW})`,
          color: "var(--white)",
          width: "100%",
          height: "100%",
          fontSize: "25px",
        },
      },

      "& .react-multiple-carousel__arrow--left": {
        "&::before": {
          transform: "rotate(180deg)",
          right: "2px",
        },
      },
    },
    imgDiv: {
      width: "100%",
      height: "277px"
    },
    noImgBackground: {
      backgroundColor: '#F8F3E9',
      padding: '25px',
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: 'cover'
    },
    contentDiv: {
      backgroundColor: "var(--white)",
      padding: theme.spacing(1),
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.7
      )} Druk`,
      color: theme.palette.primary.main,
      textAlign: "center",
      textTransform: "uppercase",
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.8),
      },
      letterSpacing: '1px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    paragraph: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )} Work Sans`,
      color: theme.palette.primary.main,
      textAlign: "center",
      marginTop: '6px',
      marginBottom: '10px',
      padding: '0 2px 0 2px',
      height: '50px'
    },
  })
);
interface Props {
  data: any;
}

const MultiCarousel: React.FC<Props> = ({ data }: Props) => {
  const classes = useStyles();
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;
  const history = useRouter();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 2000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 2000, min: 900 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 900, min: 600 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 2,
    },
  };
  const navigateTo = (item: any) => {
    if (item.entity && item.entity_id) {
      if (item.entity === 'product') {
        let pathname = Utils.CommonFunctions.seoUrl({ ...item, id: item?.entity_id }, "others").replace("/c/", "/p/");
        history.push(pathname)
      
      }
      else if (item.entity === 'offers') {
        history.push('/offers',{ query:{search: `?offer=${item?.entity_id}` }   });
      }
      else if (item.entity === "url") {
        window.open(item?.entity_id);
      }
      else if (item.entity === "page") {
        if (item.entity_id === "about")
          history.push('/about-us',{  query: { pageName: "About" } });
        else if (item.entity_id === "terms")
          history.push('/terms-conditions',{ query: { pageName: "Terms And Conditions" } });
        else if (item.entity_id === "policy")
          history.push('/privacy-policy',{ query: { pageName: "Privacy Policy" } });
        else if (item.entity_id === "gift-card") {
          history.push('/gift-card', {query: { pageName: "Gift Card" } });
        }
        else if (item.entity_id === "faq")
          history.push('/faq',{   query: { pageName: "FAQ's" } });
        else if (item.entity_id === "stores")
          history.push('/stores',{   query: { pageName: "Find Stores" } });
        else
          history.push('/' + item?.entity_id);
        // }
        // else
        //   history.push('/' + item?.entity_id);

      }
      else if (item.entity === "category") {
        let pathname = Utils.CommonFunctions.seoUrl({ ...item, id: item?.entity_id }, "others")
        // history.push(`${Utils.routes.PRODUCT_LIST}?categoryId=${item.entity_id}`)
        history.push( pathname,{ query: { categoryId: item.entity_id, fromPath: "home" } })
      }
    }
  }

  return (
    <div className={classes.multiCarousel}>
      <Carousel
        responsive={responsive}
        // removeArrowOnDeviceType="mobile"
        className={classes.carousel}
      >
        {data &&
          Array.isArray(data) &&
          data?.map((item: any) => (
            <div
              onClick={() => navigateTo(item)}
              className={classes.itemDiv}
              key={item.key + Math.random()}
            >
              <div className={classes.imgDiv}>
                {item?.web_img_path ? (
                  <img
                    src={`${IMAGE_URL}${item.web_img_path}`}
                    alt="product"
                    className={
                      item?.web_img_path
                        ? classes.img
                        : clsx(classes.img, classes.noImgBackground)
                    }
                  />
                ) : (
                  <div
                    className={
                      item?.web_img_path
                        ? classes.img
                        : clsx(classes.img, classes.noImgBackground)
                    }
                  >
                    {/* <PRODUCT_PLACEHOLDER /> */}
                    "pending"
                  </div>
                )}
              </div>
              <div className={classes.contentDiv}>
                <Typography className={classes.heading}>
                  {item?.title || ""}
                </Typography>
                <Typography className={classes.paragraph}>
                  {item?.description
                    ? _.truncate(
                        Utils.CommonFunctions.replaceHtmlTag(item.description),
                        { length: 70 }
                      )
                    : ""}
                </Typography>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default MultiCarousel;
