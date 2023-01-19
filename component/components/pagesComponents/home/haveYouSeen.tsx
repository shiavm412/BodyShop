import {
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Utils from "../../../utils";
import clsx from "clsx";
import _ from "lodash";
import MultiCarousel from "../../multiCarousel";


const useStyles = makeStyles((theme: Theme) =>
  ({
    haveYouSeenRoot: {
      backgroundColor: theme.palette.primary.main,
      marginTop: theme.spacing(5),
      padding: theme.spacing(0, 0, 0, 10),
      [theme.breakpoints.down("md")]: {
        padding: theme.spacing(0, 0, 0, 2),
      },

      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing(3),
      },
    },
    skelton: {
      margin: theme.spacing(2, 0),
    },
    maxWidthDiv: {
      //   maxWidth: "var(--max-width)",
      margin: theme.spacing(0, "auto"),
      position: "relative",
      "&::before": {
        position: "absolute",
        content: "''",
        right: 0,
        bottom: 0,
        width: "30%",
        height: "50%",
        // background: `url(${Utils.images.IMG_ONE}) center no-repeat`,
      },
    },
    mainDiv: {
      display: "flex",
      paddingBottom: theme.spacing(12),
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
    paddingBottom: {
      paddingBottom: theme.spacing(6),
    },
    leftDiv: {
      flexBasis: "22%",
      paddingRight: theme.spacing(2),
      alignSelf: "center",
      [theme.breakpoints.down("md")]: {
        padding: theme.spacing(2, 2, 2, 0),
        flexBasis: "100%",
        alignSelf: "auto",
      },
    },
    heading: {
      font: `normal ${theme.spacing(
        2.8
      )} Recoleta Alt Bold`,
      color: "var(--white)",
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(2.4),
      },
      // textTransform: "uppercase",
      // "&::first-letter": {
      //   textTransform: "capitalize",
      // },
    },
    paragraph: {
      font: `normal ${theme.spacing(
        1.6
      )} Work Sans Regular`,
      color: "var(--white)",
      margin: theme.spacing(1, 0),
      lineHeight: 1.5,
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(1.4),
      },
    },
    btn: {
      "&.MuiButton-root": {
        borderRadius: 4,
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
          1.6
        )} Work Sans`,
        textTransform: "capitalize",
        padding: theme.spacing(1.5, 3),
        color: "var(--white)",
        border: "1px solid var(--white)",
        [theme.breakpoints.down("xs")]: {
          fontSize: theme.spacing(1.4),
        },
        marginTop: "22px",
      },
    },
    rightDiv: {
      flexBasis: "78%",
      maxWidth: "78%",
      marginTop: "-25px",
      [theme.breakpoints.down("md")]: {
        maxWidth: "100%",
        flexBasis: "100%",
        marginTop: "0",
      },
    },
  })
);
interface Props {
  data: any;
  exploreAll?: boolean;
}

const HaveYouSeen: React.FC<Props> = ({
  exploreAll,
  data,
}: Props) => {
  const classes = useStyles();


  // const navigateTo = (item: any) => {
  //   if (item.have_seen_linked_entity && item.have_seen_linked_entity_id) {
  //     if (item.have_seen_linked_entity === 'product') {

  //       let pathname = Utils.CommonFunctions.seoUrl({ ...item, id: item?.have_seen_linked_entity_id }, "others").replace("/c/", "/p/")
  //       history.push(pathname)


  //       // history.push(Utils.CommonFunctions.replaceUrlParams(
  //       //   Utils.routes.PRODUCT_DETAIL,
  //       //   { ":id": item?.have_seen_linked_entity_id }
  //       // ))
  //     }
  //     else {
  //       // history.push({ pathname: `${Utils.routes.PRODUCT_LIST}`, search: `?categoryId=${item.have_seen_linked_entity_id}`, state: { fromPath: "home" } });

  //       let pathname = Utils.CommonFunctions.seoUrl({ ...item, id: item?.have_seen_linked_entity_id }, "others")
  //       history.push({ pathname, state: { fromPath: "home" } })


  //     }
  //   }
  // }
  return (
    <>
      {/* {skeletonLoader ? (
        <Skeleton
          variant="rectangular"
          height={450}
          className={classes.skelton}
        />
      ) : ( */}
      <div className={classes.haveYouSeenRoot}>
        <div className={classes.maxWidthDiv}>
          <div
            className={clsx(

              classes.mainDiv,
              exploreAll && classes.paddingBottom
            )}
          >
            <div className={classes.leftDiv}>
              <Typography className={classes.heading}>
                {data?.have_seen_common_title
                  ? _.truncate(
                    Utils.CommonFunctions.replaceHtmlTag(
                      data.have_seen_common_title
                    ),
                    { length: 16 }
                  )
                  : ""}
              </Typography>
              <Typography className={classes.paragraph}>
                {data?.have_seen_common_description
                  ? _.truncate(
                    Utils.CommonFunctions.replaceHtmlTag(
                      data.have_seen_common_description
                    ),
                    { length: 194 }
                  )
                  : ""}
              </Typography>
              {/* {data?.have_seen_button_text && (
                <Button
                  onClick={() => navigateTo(data)}
                  className={classes.btn}
                  variant="outlined"
                >
                  {data?.have_seen_button_text}
                </Button>
              )} */}
            </div>
            <div className={classes.rightDiv}>
              <MultiCarousel
                data={data?.content || []}
              />
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default HaveYouSeen;
