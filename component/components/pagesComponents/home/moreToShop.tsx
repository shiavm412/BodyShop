import {
 
  Theme,
  Typography,
} from "@mui/material";
import Utils from "../../../utils";
import clsx from "clsx";
import _ from "lodash";
import { makeStyles } from "@mui/styles";
import CardCarousel from "../../../common/cardCarousel";

const useStyles = makeStyles((theme: Theme) =>
  ({
    haveYouSeenRoot: {
      backgroundColor: theme.palette.primary.main,
      marginTop: theme.spacing(5),
      padding: theme.spacing(0, 0, 0, 11),
      position: "relative",
      "&::before": {
        position: "absolute",
        content: "''",
        left: "-30px",
        top: "-70px",
        width: "30%",
        height: "75%",
        // background: `url(${Utils.images.DESIGN7}) center no-repeat`,
      },
      [theme.breakpoints.down("md")]: {
        padding: theme.spacing(0, 0, 0, 2),
      },

      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(0, 0, 0, 1),
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(0, 0, 0, 1),
      },
    },
    maxWidthDiv: {
      //   maxWidth: "var(--max-width)",
      margin: theme.spacing(0, "auto"),
    },
    mainDiv: {
      display: "flex",
      paddingBottom: theme.spacing(7),
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
    paddingBottom: {
      paddingBottom: theme.spacing(6),
    },
    leftDiv: {
      flexBasis: "22%",
      padding: theme.spacing(2, 2, 2, 0),
      alignSelf: "center",
      // [theme.breakpoints.down("md")]: {
      //   padding: theme.spacing(2, 2, 2, 0),
      //   flexBasis: "100%",
      //   alignSelf: "auto",
      // },
      [theme.breakpoints.down("md")]: {
        padding: theme.spacing(2, 2, 2, 0),
        flexBasis: "100%",
        alignSelf: "auto",
      },
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.8
      )} Recoleta `,
      letterSpacing: "1px",
      textTransform: "uppercase",
      // "&::first-letter": {
      //   textTransform: "uppercase",
      // },
      color: "var(--white)",
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.spacing(2.4),
      },
    },
    paragraph: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.6
      )} Work Sans`,
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
        marginTop: "22px",
        padding: theme.spacing(1.5, 3),
        color: "var(--white)",
        border: "1px solid var(--white)",
        [theme.breakpoints.down("xs")]: {
          fontSize: theme.spacing(1.4),
        },
      },
    },
    rightDiv: {
      flexBasis: "78%",
      maxWidth: "78%",
      marginTop: "-25px",
      // [theme.breakpoints.down("md")]: {
      //   maxWidth: "100%",
      //   flexBasis: "100%",
      //   marginTop: "0",
      // },
      [theme.breakpoints.down("md")]: {
        maxWidth: "100%",
        flexBasis: "100%",
        marginTop: "0",
      },
    },
    skelton: {
      margin: theme.spacing(2, 0),
    },
  })
);
type AppProps = {
  exploreAll?: boolean;
  data: any;
};
function MoreToShop({ exploreAll, data }: AppProps) {
  const classes = useStyles();
  // const history = useHistory();
  // const navigateTo = (item: any) => {
  //   if (item.more_shop_linked_entity && item.more_shop_linked_entity_id) {
  //     if (item.more_shop_linked_entity === 'product') {
  //       let pathname = Utils.CommonFunctions.seoUrl({ ...item, id: item?.more_shop_linked_entity_id }, "others").replace("/c/", "/p/")
  //       history.push(pathname)
  //       // history.push(Utils.CommonFunctions.replaceUrlParams(
  //       //   Utils.routes.PRODUCT_DETAIL,
  //       //   { ":id": item?.more_shop_linked_entity_id }
  //       // ))
  //     }
  //     else {
  //       // history.push(`${Utils.routes.PRODUCT_LIST}?categoryId=${item.more_shop_linked_entity_id}`)
  //       let pathname = Utils.CommonFunctions.seoUrl({ ...item, id: item?.more_shop_linked_entity_id }, "others")
  //       history.push(pathname)
  //     }
  //   }
  // }
  return (
    <>
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
                {data?.more_shop_common_title
                  ? _.truncate(
                    Utils.CommonFunctions.replaceHtmlTag(
                      data.more_shop_common_title
                    ),
                    { length: 15 }
                  )
                  : ""}
              </Typography>
              <Typography className={classes.paragraph}>
                {data?.more_shop_common_description
                  ? _.truncate(
                    Utils.CommonFunctions.replaceHtmlTag(
                      data.more_shop_common_description
                    ),
                    { length: 194 }
                  )
                  : ""}
              </Typography>
              {/* {data?.more_shop_button_text && (
                <Button
                  className={classes.btn}
                  variant="outlined"
                  onClick={() => navigateTo(data)}
                >
                  {data.more_shop_button_text}
                </Button>
              )} */}
            </div>
            <div className={classes.rightDiv}>
              <CardCarousel
                data={data?.content || []}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoreToShop;
