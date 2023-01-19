import { Button, Grid, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import Utils from "../../../utils";

const useStyles = makeStyles((theme: Theme) =>
  ({
    discoverMoreRoot: {},
    gridContainer: {
      position: "relative",
    },
    centerDiv: {
      position: "absolute",
      backgroundColor: "var(--white)",
      opacity: 0.8,
      padding: theme.spacing(1.5),
      left: "50%",
      bottom: "4%",
      transform: "translateX(-50%)",
      maxWidth: "550px",
      borderRadius: 2,
      boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down(900)]: {
        // height: '200px',
        width: "455px",
      },
      [theme.breakpoints.down("xs")]: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%,  -50%)",
        bottom: "auto",
        width: "95%",
      },

      // height: '280px',
      width: "555px",
      textAlign: "center",
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.6
      )} Work Sans`,
      color: theme.palette.primary.main,
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.spacing(1.4),
      },
      // '& p': {
      //   font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      //     1.6
      //   )} Work Sans`,
      //   color: theme.palette.primary.main,
      //   textAlign: "center",
      //   marginBottom: "21px",
      //   // margin: theme.spacing(0.5, 0),
      //   [theme.breakpoints.down("sm")]: {
      //     fontSize: theme.spacing(1.4),
      //   },
      // }
    },
    heading: {
      font: `normal ${theme.spacing(
        4
      )} Druk Bold`,
      color: theme.palette.primary.main,
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(3),
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.spacing(2.6),
      },
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "14px",
      marginTop: "10px",
    },
    // paragraph: {
    //   font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
    //     1.6
    //   )} Work Sans`,
    //   color: theme.palette.primary.main,
    //   textAlign: "center",
    //   // margin: theme.spacing(0.5, 0),
    //   [theme.breakpoints.down("sm")]: {
    //     fontSize: theme.spacing(1.4),
    //   },
    //   marginBottom: "21px !important",

    // },
    btn: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )} Work Sans`,
      borderRadius: 4,
      textTransform: "capitalize",
      padding: theme.spacing(1.5, 3),
      marginBottom: theme.spacing(2.5),
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.spacing(1.4),
      },
      marginTop: "27px",
    },
    imgContainer: {
      height: "660px",
      [theme.breakpoints.down("xs")]: {
        height: "300px",
      },
      cursor: "pointer",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    noImgBackground: {
      // backgroundColor: '#F8F3E9',
      padding: "50px",
    },
  })
);

interface Props {
  data: any;
  navigateTo: Function;
}
const DiscoverMore: React.FC<Props> = ({ data, navigateTo }: Props) => {
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

  const content = data?.content?.[0] || {};
  const classes = useStyles();


  return (
    <>
      
        <div className={classes.discoverMoreRoot}>
          <Grid container className={classes.gridContainer}>
            <div className={classes.centerDiv}>
              <Typography variant="h4" className={classes.heading}>
                {data?.title || ""}
              </Typography>
              {/* {content?.description && content.description?.includes('<') ? */}
              {content?.description && (
                <div
                  dangerouslySetInnerHTML={{ __html: content.description }}
                ></div>
              )}
              {/* :
            <Typography variant="body2" className={classes.paragraph}>
              {content?.description || ''}
            </Typography>
          } */}
              <div>
                {content?.button_text && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    onClick={() => navigateTo(content || {})}
                  >
                    {content.button_text}
                  </Button>
                )}
              </div>
            </div>
            <Grid
              item
              xs={12}
              sm={12}
              className={classes.imgContainer}
              onClick={() => navigateTo(content || {})}
            >
              {
                <img
                  src={
                    content?.web_img_path_first
                      ? `${IMAGE_URL}${content.web_img_path_first}`
                      : Utils.images.PRODUCT_PLACEHOLDER
                  }
                  alt="discover one"
                  className={
                    content?.web_img_path_first
                      ? classes.img
                      : clsx(classes.img, classes.noImgBackground)
                  }
                />
              }
            </Grid>
            {/* <Grid
              item
              xs={12}
              sm={6}
              className={classes.imgContainer}
              onClick={() => navigateTo(content || {})}
            >
              {
                <img
                  src={
                    content?.web_img_path_second
                      ? `${IMAGE_URL}${content.web_img_path_second}`
                      : Utils.images.PRODUCT_PLACEHOLDER
                  }
                  alt="discover two"
                  className={
                    content?.web_img_path_second
                      ? classes.img
                      : clsx(classes.img, classes.noImgBackground)
                  }
                />
              }
            </Grid>*/}
          </Grid> 
        </div>
    </>
  );
};

export default DiscoverMore;
