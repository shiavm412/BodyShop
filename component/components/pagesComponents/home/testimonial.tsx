import {
  
  Theme,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Utils from "../../../utils";
import _ from "lodash";


const useStyles = makeStyles((theme: Theme) =>
 ({
    testimonial: {
      padding: theme.spacing(4, 2),
      margin: theme.spacing(3, 0),
      position: "relative",
      backgroundColor: theme.palette.primary.main,
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
      font: `normal ${theme.spacing(1.3)}  Work Sans SemiBold`,
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
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        alignItems: "flex-start",
        marginBottom: theme.spacing(2),
      },
    },
    leftDiv: {
      marginRight: "10%",
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0),
      },
    },
    heading: {
      font: `normal ${theme.spacing(
        2.4
      )} Recoleta Alt Bold     `,
      color: "var(--white)",
      lineHeight: "40px",
      letterSpacing: "1px",
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(2.4),
      },
      // textTransform: "capitalize",
    },
    design1: {
      position: "absolute",
      top: "0",
      left: "0",
      [theme.breakpoints.down(300)]: {
        display: "none",
      },
    },
    design2: {
      position: "absolute",
      left: "0",
      bottom: "0",
      [theme.breakpoints.down(300)]: {
        display: "none",
      },
    },
    design3: {
      position: "absolute",
      right: "0",
      top: "0",
      [theme.breakpoints.down(300)]: {
        display: "none",
      },
    },
    design4: {
      position: "absolute",
      right: "0",
      bottom: "0",
      [theme.breakpoints.down(300)]: {
        display: "none",
      },
    },
    design5: {
      position: "absolute",
      left: "574px",
      top: "16%",
      height: 50,
      width: 50,

      [theme.breakpoints.down("md")]: {
        left: "465px",
        top: "15%",
      },
      [theme.breakpoints.down("sm")]: {
        left: "312px",
        top: "3%",
      },
      [theme.breakpoints.down("xs")]: {
        left: "8px",
        top: "22%",
      },
      [theme.breakpoints.down(300)]: {
        display: "none",
      },
    },
    design6: {
      position: "absolute",
      right: "295px",
      bottom: "25%",

      [theme.breakpoints.down("md")]: {
        right: "240px",
        bottom: "23%",
      },
      [theme.breakpoints.down("sm")]: {
        right: "130px",
        bottom: "13%",
      },
      [theme.breakpoints.down("xs")]: {
        right: "8px",
        bottom: "20%",
      },
      [theme.breakpoints.down(300)]: {
        display: "none",
      },
    },
    paragraph: {
      font: `normal ${theme.spacing(
        1.6
      )}  Work Sans Regular`,
      color: "var(--text-color)",
      lineHeight: 1.9,
      letterSpacing: "0.04em",
      [theme.breakpoints.down("xs")]: {
        // display: "none",
      },
      // textTransform: "lowercase",
      // "&::first-letter": {
      //   textTransform: "capitalize",
      // },
    },
    imgContainer: {
      display: "flex",
      // justifyContent: 'center'
    },
    imgTextDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "25px",
      width: "70px",
      height: "70px",
      textAlign: "center",
      borderRadius: "50%",
      background: "white",
      color: "#3d857e",
      // marginLeft: '20px',
      // alignSelf: 'center'
    },
    skelton: {
      margin: theme.spacing(2, 0),
    },
  })
);
interface Props {
  data: any;
}

const Testimonial: React.FC<Props> = ({ data }: Props) => {
  const classes = useStyles();
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

  return (
    <>

      <div className={classes.testimonial}>
        {/* <img
            src={Utils.images.SIDEDESIGN1}
            alt="design"
            className={classes.design1}
          />
          <img
            src={Utils.images.SIDEDESIGN2}
            alt="design"
            className={classes.design2}
          />
          <img
            src={Utils.images.SIDEDESIGN3}
            alt="design"
            className={classes.design3}
          />
          <img
            src={Utils.images.SIDEDESIGN4}
            alt="design"
            className={classes.design4}
          /> */}
        <img
          src={Utils.images.ARROW1}
          alt="design"
          className={classes.design5}
        />
        <img
          src={Utils.images.ARROW2}
          alt="design"
          className={classes.design6}
        />
        <Grid container className={classes.maxWidthDiv}>
          <Grid item xs={12} sm={5} className={classes.gridItem}>
            <div className={classes.leftDiv}>
              <Typography variant="h4" className={classes.heading}>
                {data?.common_title}
              </Typography>
              <Typography variant="body2" className={classes.paragraph}>
                {data.common_description}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={5}>
            <div>
              <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
              >
                {data?.content &&
                  Array.isArray(data.content) &&
                  data.content.map((item: any, index: any) => {
                    const nameArray = item?.testimonial_user_name
                      ? item.testimonial_user_name.split(" ")
                      : [];
                    const letters =
                      (nameArray.length > 0 && nameArray[0] && nameArray[0][0]
                        ? nameArray[0][0]
                        : "") +
                      (nameArray.length > 1 && nameArray[nameArray.length - 1]
                        ? nameArray[nameArray.length - 1][0]
                        : "");
                    return (
                      <div className={classes.sliderBox} key={index}>
                        <div className={classes.borderBoxDiv}>
                          <Grid container spacing={2}>
                            <Grid
                              item
                              xs={3}
                              md={3}
                              xl={3}
                              className={classes.imgContainer}
                            >
                              {item?.web_img_path ? (
                                <img
                                  src={`${IMAGE_URL}${item.web_img_path}`}
                                  alt="user"
                                  className={classes.imgSize}
                                />
                              ) : (
                                <p className={classes.imgTextDiv}>
                                  {letters}
                                </p>
                              )}
                            </Grid>
                            <Grid item xs={9} md={9} xl={9}>
                              <Typography className={classes.sliderText}>
                                {item?.description
                                  ? _.truncate(
                                    Utils.CommonFunctions.replaceHtmlTag(
                                      item.description
                                    ),
                                    { length: 100 }
                                  )
                                  : ""}
                              </Typography>
                              <Typography className={classes.sliderSubText}>
                                {item?.testimonial_user_name || ""}
                              </Typography>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    );
                  })}
              </Carousel>
            </div>
          </Grid>
        </Grid>
      </div>

    </>
  );
};

export default Testimonial;
