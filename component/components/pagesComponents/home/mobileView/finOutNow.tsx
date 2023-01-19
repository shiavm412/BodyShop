import {
 
  Theme,
  Typography,
  Button,
} from "@mui/material";
import { makeStyles , createStyles} from "@mui/styles";

import Utils from "../../../../utils";
import _ from "lodash";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerContainer: {
      padding: theme.spacing(1, 0),
      // height: theme.spacing(44.6),
      // margin: "20px 0px 0px 0px"

    },

    img: {
      width: "100%",
      height: theme.spacing(24),
      objectFit: "cover",
      position: "absolute",
    },
    innerContainer: {
      background: "var(--primary)",
      margin: theme.spacing(18,2,0, 2),
      position: "relative",
      padding: theme.spacing(2),
      borderRadius: "10px",
      display: "flex",
      placeItems: "center",
      flexDirection: "column",
    },
    title: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}  Work Sans`,
      color: "var(--light-green)",
      textTransform: "uppercase",
    },
    subTitle: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.2
      )}  Work Sans`,
      color: "var(--white)",
      margin: theme.spacing(1, 0),
      lineHeight: "20px",
      textAlign: "center"
    },
    btn: {
      borderRadius:"4px",
      background: "var(--light-green) !important",
      color: "var(--primary) !important",
      margin: theme.spacing(1, 0, 0, 0),
      width: "60%",
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )}  Roboto`,
      padding: theme.spacing(1.2),
      letterSpacing: "0.06em",
    },
    noImg: {
      width: "100%",
      height: theme.spacing(20),
      padding: "20px",
      // objectFit: "cover",
    }
  })
);

interface Props {
  data: any;
  navigateTo: Function;
  key: string
}

const FindOutNow = ({ data, navigateTo }: Props) => {
  const classes = useStyles();
  const content: any = data?.content && Array.isArray(data.content) && data?.content?.[0] ? data.content[0] : {};
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

  return (
    Object.keys(content).length > 0 ?
      <>
      
        <div className={classes.outerContainer} onClick={() => {
          if (!content?.button_text)
            navigateTo(content)
        }}>
          <img
            src={content?.mobile_img_path ? IMAGE_URL + content?.mobile_img_path : Utils.images.PRODUCT_PLACEHOLDER}
            alt="productImg"
            className={content?.mobile_img_path ? classes.img : classes.noImg}
          />
          <div className={classes.innerContainer}>
            <Typography variant="h4" align="center" className={classes.title}>
              {content?.title || ""}
            </Typography>
            <div className={classes.subTitle} dangerouslySetInnerHTML={{
              __html: content?.description ? content?.description
                : ""
            }} />
            {content?.button_text ?
              <Button
                onClick={() => navigateTo(content)}
                variant="contained" fullWidth className={classes.btn}>
                {content.button_text}
              </Button>
              : ""
            }
          </div>
        </div>
      </>
      : null
  );
};

export default FindOutNow;
