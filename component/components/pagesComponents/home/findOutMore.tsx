import {
 
  Theme,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import Utils from "../../../utils";

const useStyles = makeStyles((theme: Theme) =>
  ({
    rootFindOutMore: {
      padding: theme.spacing(0, 2),
      margin: theme.spacing(5, 0, 2),
      backgroundColor: theme.palette.primary.main,
    },
    maxWidthDiv: {
      margin: theme.spacing(0, 8),
      // maxWidth: "var(--max-width)",
      padding: theme.spacing(1.5, 0),
      [theme.breakpoints.down("md")]: {
        margin: theme.spacing(0, 0),
      },
    },
    leftDiv: {
      backgroundColor: "var(--light-creame-color)",
      padding: theme.spacing(3, 1.5, 1.5, 1.5),
      marginRight: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-between",
      height: "calc(100% + 40px)",
      marginTop: "-40px",
      position: "relative",
      "&::after": {
        position: "absolute",
        content: "''",
        top: 0,
        right: "-25px",
        width: 0,
        height: 0,
        borderBottom: `${theme.spacing(2.5)} solid var(--dark-creame-color)`,
        borderRight: `${theme.spacing(2.5)} solid transparent `,
      },

      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.6
      )} Work Sans`,
      color: theme.palette.primary.main,
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.4),
      },
      // '& p': {
      //   font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      //     1.6
      //   )} Work Sans`,
      //   color: theme.palette.primary.main,
      //   lineHeight: '19px',
      //   [theme.breakpoints.down("xs")]: {
      //     fontSize: theme.spacing(1.4),
      //     margin: theme.spacing(0.5, 0),
      //   },
      //   marginBottom: '30px'
      // },
    },

    heading: {
      font: `normal ${theme.spacing(
        2.8
      )} Druk Bold`,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      marginBottom: theme.spacing(1.9),
      color: theme.palette.primary.main,
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(2.2),
        marginBottom: theme.spacing(1),
      },
    },
    // paragraph: {
    //   font: `normal ${theme.spacing(
    //     1.6
    //   )} Work Sans Regular`,
    //   color: theme.palette.primary.main,
    //   lineHeight: '19px',
    //   [theme.breakpoints.down("xs")]: {
    //     fontSize: theme.spacing(1.4),
    //     margin: theme.spacing(0.5, 0),
    //   },
    //   marginBottom: '30px'
    // },

    btn: {
      "&.MuiButton-root": {
        borderRadius: 4,
        font: `normal 600 ${theme.spacing(1.6)} Work Sans`,
        textTransform: "capitalize",
        padding: theme.spacing(1.5, 3),
        border: `1px solid ${theme.palette.primary.main}`,
        marginTop: "27px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.4),
        marginTop: theme.spacing(1),
      },
    },
    rightDiv: {
      cursor: "pointer",
      // width: "100%",
      // height: "100%",
      width: "674px",
      height: "442px",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        height: "370px",
      },
      [theme.breakpoints.down("xs")]: {
        width: "calc(100% - 10px)",
        height: "370px",
      },
    },
    img: {
      maxWidth: "100%",
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
    noImgBackground: {
      backgroundColor: "#F8F3E9",
      padding: "25px",
    },
  })
);
interface Props {
  data: any;
  navigateTo: Function;
}

const FindOutMore: React.FC<Props> = ({ data, navigateTo }: Props) => {
  const classes = useStyles();
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;
  const content = data?.content?.[0] || {};
 


  return (
    <>
        <div className={classes.rootFindOutMore}>
          <div className={classes.maxWidthDiv}>
            <Grid container>
              <Grid item xs={12} sm={5}>
                <div className={classes.leftDiv}>
                  <Typography variant="h4" className={classes.heading}>
                    {data?.title || ""}
                  </Typography>
                  {
                    content?.description && (
                      <div 
                        dangerouslySetInnerHTML={{
                          __html: content.description,
                        }}
                      ></div>
                    )
                    // content?.description && content.description?.includes('<')
                    // :
                    // <Typography variant="body2" className={classes.paragraph}>
                    //   {content.description || ''}
                    // </Typography>
                  }
                  <div>
                    {content?.button_text && (
                      <Button
                        onClick={() => navigateTo(content || {})}
                        variant="outlined"
                        className={classes.btn}
                        color="primary"
                      >
                        {content.button_text || ""}
                      </Button>
                    )}
                  </div>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={7}
                onClick={() => navigateTo(content || {})}
              >
                <div className={classes.rightDiv}>
                  {
                    <img
                      src={
                        content?.web_img_path
                          ? `${IMAGE_URL}${content.web_img_path}`
                          : Utils.images.PRODUCT_PLACEHOLDER
                      }
                      alt="product two"
                      className={
                        content?.web_img_path
                          ? classes.img
                          : clsx(classes.img, classes.noImgBackground)
                      }
                    />
                  }
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      
    </>
  );
};

export default FindOutMore;
