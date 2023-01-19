import {
 
  Theme,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles , createStyles} from "@mui/styles";

import Utils from "../../../../utils";
import _ from "lodash";
import Slider from "react-slick";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    testimonial: {
      padding: theme.spacing(2, 2),
      margin: theme.spacing(3, 0),
      position: "relative",
      backgroundColor: theme.palette.primary.main,

    },
    slider: {
      "& .slick-dots": {
        bottom: "-25px",
      },
      "& .slick-dots li": {
        width: "5px",
        height: "5px",
      },
      "& .slick-dots li button:before": {
        fontSize: "8px",
      },
      "& .slick-dots li.slick-active button:before": {
        color: "var(--white)",
      },
    },
    maxWidthDiv: {
      margin: theme.spacing(0, "auto"),
      maxWidth: "var(--max-width)",
      padding: theme.spacing(4),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0),
        marginBottom: theme.spacing(3),
      },
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
      },
    },
    imgSize: {
      width: "70px !important",
      height: theme.spacing(7),
      borderRadius: "50%",
      objectFit: "cover",
    },
    noImg: {
      width: "70px !important",
      height: theme.spacing(7),
      padding: "10px",
      borderRadius: "50%",
      background:"white"
    },
    sliderBox: {
      margin: theme.spacing(0, 4, 0, 4),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(0, 0, 0, 0),
      },
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, 0, 0, 0),
      },
    },
    sliderText: {
      font: `italic 400 ${theme.spacing(1.4)}  Work Sans`,
      textAlign: "start",
      lineHeight: "22px",
      letterSpacing: "-0.333333px",
      color: "var(--text-color)",
    },
    sliderSubText: {
      font: `normal 700 ${theme.spacing(1.3)}  Work Sans`,
      textAlign: "start",
      lineHeight: "50px",
      letterSpacing: "0.1px",
      color: "var(--text-color)",
    },

    borderBoxDiv: {
      border: "1px solid #FFFFFF",
      borderRadius: "4px",
      padding: theme.spacing(1, 1),
      "&:before": {
        background: "red",
      },
      "&:after": {
        background: "red",
      },
    },
    gridItem: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",

      alignItems: "flex-start",
      marginBottom: theme.spacing(2.5),
    },
    leftDiv: {
      marginRight: "10%",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0),
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )} Recoleta Alt      `,
      color: "var(--white)",
      letterSpacing: "1px",
      textTransform: "capitalize",

    },

    paragraph: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.6
      )}  Work Sans`,
      color: "var(--text-color)",
      lineHeight: 1.9,
      letterSpacing: "-0.333333px",
      [theme.breakpoints.down("xs")]: {
        // display: "none",
      },
      textTransform: "lowercase",
      "&::first-letter": {
        textTransform: "capitalize",
      },
    },
    imgContainer: {
      display: "flex",
      // justifyContent: 'center'
    },
    content:{
      height: "120px"

    }
  })
);

interface Props {
  data: any;
  navigateTo: Function;
  key:string
}

const Testimonial = ({ data, navigateTo }: Props) => {
  const content: any = data?.content && Array.isArray(data.content) ? data.content : [];
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

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
  return (
    <>
      <div className={classes.testimonial}>
        <Grid container className={classes.maxWidthDiv}>
          <Grid item xs={12} sm={5} className={classes.gridItem}>
            <div className={classes.leftDiv}>
              <Typography variant="h4" className={classes.heading}>
                {data?.common_title || ""}
              </Typography>
              <Typography variant="body2" className={classes.paragraph}>
                {/* {data.common_description} */}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Slider {...settings} className={classes.slider}>
                {content.map((item: any) => (
                  <div key={item?.key} className={classes.sliderBox}>
                    <div className={classes.borderBoxDiv}>
                      <Grid container spacing={2} className={classes.content}>
                        <Grid item xs={3} className={classes.imgContainer}>
                          <img
                            src={item?.mobile_img_path ? IMAGE_URL + item.mobile_img_path : Utils.images.PRODUCT_PLACEHOLDER}
                            alt="user"
                            className={item?.mobile_img_path ? classes.imgSize : classes.noImg}
                          />
                        </Grid>
                        <Grid item xs={9}>
                          <div className={classes.sliderText} dangerouslySetInnerHTML={{
                            __html: item?.description ?
                              _.truncate(Utils.CommonFunctions.replaceHtmlTag(
                                item?.description
                              ),
                                { length: 100 }
                              ) : ""
                          }}></div>
                          <Typography className={classes.sliderSubText}>
                            {item?.testimonial_user_name || ""}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Testimonial;
