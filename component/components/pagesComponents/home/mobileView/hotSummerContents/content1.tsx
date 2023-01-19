import {  Theme, Typography } from "@mui/material";
import { makeStyles , createStyles} from "@mui/styles";
import _ from "lodash";
import CustomButton from "../../../../../common/button";
import Utils from "../../../../../utils";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      // background: "var(--light-blue)",
      position: "relative",
      height: theme.spacing(21),
    },

    mainImg: {
      //   width: "150px",
      // right: 0,
      // borderTop: 0,
      // height: "210px",
      // background: "aliceblue",
      // borderBottom: 0,
      // position: "absolute",
      // borderTopLeftRadius: "120px",
      // borderBottomLeftRadius: "103px",
      position: "absolute",
      objectFit: "cover",
      width: "100%",
      height: theme.spacing(21),
    },
    textContainer: {
      position: "absolute",
      padding: "40px 10px 0px 30px",
    },
    heading: {
      font: `normal 700 ${theme.spacing(2.8)}  Work Sans`,
      color: "var(--primary)",
      // letterSpacing: "0.02em",
      textTransform: "capitalize",
    },
    btnDiv: {
      "& .MuiButton-root": {
        padding: theme.spacing(1.2),
        font: `normal 500 ${theme.spacing(1.2)}  Work Sans`,
        lineHeight: "14px",
        marginTop: "20px",
        width: "50%",
      },
    },
    description: {
      font: `normal 400 ${theme.spacing(1.5)}  Work Sans`,
      color: "#333333",
      textTransform: "capitalize",
      padding: theme.spacing(1, 5, 0, 0),
    },
    noImg: {
      position: "absolute",
      objectFit: "cover",
      width: "100%",
      height: theme.spacing(21),
    }
  })
);

interface Props {
  item: any;
  navigateTo: Function;
}

export const Content1 = ({ item, navigateTo }: Props) => {
  const classes = useStyles();
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

  return (
    Object.keys(item).length > 0 ?
      <>
        <div className={classes.container}>
          <img
            src={item?.mobile_img_path ? IMAGE_URL + item.mobile_img_path : Utils.images.CLUB_ONE}
            alt="sideDesign"
            className={item?.mobile_img_path ? classes.mainImg : classes.noImg}
          />
          <div className={classes.textContainer}
            onClick={() => {
              if (!item?.button_text)
                navigateTo(item)
            }}
          >
            <Typography variant="h4" className={classes.heading}>
              {item?.title
                ? _.truncate(
                  Utils.CommonFunctions.replaceHtmlTag(item.title),
                  { length: 20 }
                )
                : ""}
            </Typography>
            <div className={classes.description} dangerouslySetInnerHTML={{
              __html: item?.description ?
                _.truncate(Utils.CommonFunctions.replaceHtmlTag(
                  item.description),
                  { length: 100 }
                ) : ""
            }} />

            {item?.button_text ?
              <div className={classes.btnDiv}>
                <CustomButton
                  variant="contained"
                  fullWidth
                  type="button"
                  text={item.button_text}
                  onClick={() => navigateTo(item)}
                />
              </div> : ""
            }
          </div>
        </div>
      </> :
      null
  );
};

