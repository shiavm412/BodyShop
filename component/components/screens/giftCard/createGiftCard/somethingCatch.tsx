import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Divider,
} from "@material-ui/core";
import Utils from "../../../utils";
import Slider from "react-slick";
import Rating from "@material-ui/lab/Rating";
import CustomButton from "../../../components/common/button";
import  RECOMMENDED_LEFT from "../../../assets/images/recommendedArrow.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    giftRoot: {
      padding: theme.spacing(4, 6),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(4, 1.5),
      }
    },
    heading: {
      font: `normal ${theme.spacing(
        2.4
      )} Recoleta Alt Bold`,
      lineHeight: "33px",
      color: "var(--secondary-black)",
      letterSpacing: "0.02em",
      [theme.breakpoints.down("xs")]: {
        fontSize: "16px"
      }
    },
    innerContainer: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      // [theme.breakpoints.down("sm")]: {
      //   flexDirection: "column",
      // }
    },
    externalContainer: {
      background: "var(--white)",
      border: "1px solid var(--border-color)",
      boxSizing: "border-box",
      borderRadius: "8px",
      padding: theme.spacing(2),
      margin: theme.spacing(1.2),
      [theme.breakpoints.down("xs")]:{
        margin: theme.spacing(1,0),
        padding: theme.spacing(0,0.5)
      }
    },
    imageDiv: {
      position: "relative",
    },
    productDiv: {
      padding: theme.spacing(0, 1),
      width: "180px",
      [theme.breakpoints.down("xs")]:{
        width: "90px",
        padding: theme.spacing(0,0.5)
      }
    },
    heartImg: {
      position: "absolute",
      top: "1%",
      right: "2%",
    },
    imgDiv1: {
      borderRadius: 4,
      display: "flex",
      justifyContent: "center",
      height: "200px",
      "& img": {
        width: "100%",
        objectFit: "contain",
      },
      [theme.breakpoints.down("xs")]:{
        height: "160px"
      }
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
          left: "0px",
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
          right: "0px",
          zIndex: 1,
        },
      },
      "& .slick-prev:before": {
        content: `url(${RECOMMENDED_LEFT})`,
        opacity: 1,
      },
      "& .slick-prev:hover, .slick-prev:focus, .slick-next:hover, .slick-next:focus":
      {
        color: "white",
        background: theme.palette.primary.main,
        outline: "white",
      },
    },
    contentDiv: {
      margin: theme.spacing(1, 0),
    },
    insideDiv: {},
    productName: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )} Work Sans`,
      color: "var(--secondary-black)",
      lineHeight: "24px",
      // height: '60px',
      // [theme.breakpoints.down('xs')]:{
      //   height: '80px',
      // }
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.4
        )} Work Sans Bold`,
      }
    },
    starDiv: {
      margin: theme.spacing(0.5, 0),
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      [theme.breakpoints.down("xs")]:{
        "& .MuiRating-root":{
          fontSize: "1rem"
        }
      }
    },
    rating: {
      color: theme.palette.secondary.light,
    },
    count: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )} Work Sans`,
      color: "var(--light-gray)",
      marginTop: theme.spacing(0.3),
    },
    discription: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.2
      )} Work Sans`,
      color: "var(--light-gray)",
      height: 25,
      [theme.breakpoints.down("sm")]: {
        height: 40,
      },
    },
    quantity: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )} Work Sans`,
      lineHeight: 1.6,
      height: "16px",
      margin: theme.spacing(1, 0, 0, 0),
      color: theme.palette.primary.main,
      textTransform: "lowercase",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.2
        )} Work Sans Regular`,
        margin: theme.spacing(0.5, 0, 0, 0),
      }
    },
    divider: {
      border: "1px solid #F2F2F2",
      margin: theme.spacing(2, 0, 0.5, 0),
    },
    btnDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    price: {
      font: `normal ${theme.spacing(
        2.4
      )} Work Sans Bold`,
      lineHeight: "28px",

      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]:{
        font: `normal ${theme.spacing(
          1.8
        )} Work Sans Bold`, 
      }
    },
    btn: {
      width: "30%",
      [theme.breakpoints.down("sm")]: {
        width: "50%",
        "& .MuiButton-root":{
          margin: theme.spacing(1),
          width: "90%",
          font: `normal ${theme.spacing(
            1.6
          )} Work Sans Bold`, 
        }
      }
    },
  })
);

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2,
  mobileFirst: true,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

function SomethingCatch() {
  const classes = useStyles();
  return (
    <div className={classes.giftRoot}>
      <Typography className={classes.heading}>
        Recommended Gift Set
      </Typography>
      <div className={classes.insideDiv}>
        <Slider {...settings} className={classes.slider}>
          {Array.of(1, 2, 3).map((item) => (
            <div key={item}>
              <div className={classes.externalContainer}>
                <div className={classes.innerContainer}>
                  {Array.of(1, 2, 3).map((item) => (
                    <div key={item}>
                      <div className={classes.productDiv}>
                        <div className={classes.imageDiv}>
                       
                          <div className={classes.imgDiv1}>
                            <img src={Utils.images.PRODUCT1} alt="product1" />
                          </div>
                        </div>
                        <div className={classes.contentDiv}>
                          <Typography className={classes.productName}>
                            Satsuma Shower Gel
                          </Typography>
                          <div className={classes.starDiv}>
                            <Rating
                              className={classes.rating}
                              name="read-only"
                              readOnly
                            />
                            {/* <Typography className={classes.count}>
                              (457)
                            </Typography>
                            <Typography className={classes.discription}>
                              To refresh & clean skin
                            </Typography> */}
                            <Typography className={classes.quantity}>
                              750 ml
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Divider className={classes.divider} />
                <div className={classes.btnDiv}>
                  <Typography className={classes.price}>₹4,499</Typography>
                  <div className={classes.btn}>
                    <CustomButton
                      type={"submit"}
                      color="primary"
                      fullWidth
                      text={"Add to Bag "}
                    />
                  </div>
                </div>
              </div>
            </div>


          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SomethingCatch;
