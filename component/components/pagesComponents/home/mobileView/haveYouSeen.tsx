import { Theme, Typography } from "@mui/material";
import _ from "lodash";
import { makeStyles , createStyles} from "@mui/styles";

import Utils from "../../../../utils";
import clsx from 'clsx';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    skinType: {
      font: `normal 700 ${theme.spacing(1.5)}  Work Sans`,
      color: "var(--white)",
      marginTop: "11px",
      lineHeight: "18px",
      height: "36px"
    },
    innerContainer: {
      display: "flex",
      width: "100%",
      overflowX: "auto",
      marginTop: theme.spacing(2.5),
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    imgDiv: {
      cursor: "pointer",
      width: theme.spacing(16),
      height: theme.spacing(16),
      boxShadow: "0px 0px 30px rgba(146, 146, 146, 0.1)",
      background: "white",
      borderRadius: "6px",
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: "cover",
      boxShadow: "0px 0px 30px rgba(146, 146, 146, 0.1)",
      background: "white",
      borderRadius: "6px",
    },

    innerDiv: {
      margin: theme.spacing(0, 1, 1, 0.2),
      width: theme.spacing(16),
      height: "auto",
    },
    container: {
      background: "var(--primary)",
      padding: theme.spacing(1),
      margin: theme.spacing(1, 0),
    },
    title: {
      font: `normal 700 ${theme.spacing(2.4)}  Work Sans`,
      color: "var(--light-green)",
      marginTop: "11px",
      textAlign: "center",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
    },
    subHeading: {
      font: `normal 500 ${theme.spacing(1.2)}  Work Sans`,
      color: "var(--white)",
      marginTop: "11px",
      lineHeight: "18px",
    },
    noImg: {
      width: theme.spacing(16),
      height: theme.spacing(16),
      padding: "20px",
      // objectFit: "cover",
    },
    twoLineEllipsis: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
    },
    threeLineEllipsis:{
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 3,
      "-webkit-box-orient": "vertical",
    }
  })
);
interface Props {
  data: any;
  navigateTo: Function;
  key: string

}

const HaveYouSeen = ({ data, navigateTo }: Props) => {
  const classes = useStyles();
  const content: any = data?.content && Array.isArray(data.content) ? data.content : [];
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

  return (
    <>
      <div className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          {data?.have_seen_common_title || ""}
        </Typography>
        <div className={classes.innerContainer}>
          {content.map((item: any) => (
            <div className={classes.innerDiv} key={item.id} onClick={() => navigateTo(item)}>
              <div className={classes.imgDiv}>
                <img
                  src={item?.mobile_img_path ? IMAGE_URL + item.mobile_img_path : Utils.images.PRODUCT_PLACEHOLDER}
                  alt="product"
                  className={item?.mobile_img_path ? classes.img : classes.noImg}
                />
              </div>
              <Typography variant="body2" className={clsx(classes.skinType, classes.twoLineEllipsis)}>
                {item?.title || ""}
              </Typography>
              <div className={clsx(classes.subHeading,classes.threeLineEllipsis)} dangerouslySetInnerHTML={{
                __html: item?.description ? item.description: ""
              }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HaveYouSeen;
