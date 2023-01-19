import {Theme, Typography } from "@mui/material";
import Utils from "../../../../utils";
import { makeStyles , createStyles} from "@mui/styles";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    skinType: {
      font: `normal 500 ${theme.spacing(1.5)}  Work Sans`,
      color: "var(--white)",
      marginTop: "11px",
      textAlign: "center",
      lineHeight: "18px",


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
      width: "100%",
      height: "100%",
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
      margin: theme.spacing(1, 0)
    },
    title: {
      font: `normal 700 ${theme.spacing(2.4)}  Work Sans`,
      color: "var(--light-green)",
      marginTop: "11px",
      textAlign: "center",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
    },
    noImg: {
      width: theme.spacing(16),
      height: theme.spacing(16),
      padding: "10px"
    }
  })
);
interface Props {
  navigateTo: Function;
  data: any;
  key:string
}
function Sensitive({ navigateTo, data }: Props) {
  const classes = useStyles();
  const content = data?.content && Array.isArray(data.content) ? data?.content : [];
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

  return (
    content.length > 0 ?
      <>
        <div className={classes.container}>
          <Typography variant="h4" className={classes.title}>
            {data?.skin_type_common_title||""}
          </Typography>
          <div className={classes.innerContainer}>
            {content.map((item: any) => (
              <div className={classes.innerDiv} key={item.id} onClick={() => navigateTo(item)}>
                <div className={classes.imgDiv}>
                  <img
                    src={item?.img_path ? IMAGE_URL + item.img_path : Utils.images.PRODUCT_PLACEHOLDER}
                    alt="product"
                    className={item?.img_path ? classes.img : classes.noImg}
                  />
                </div>
                <Typography
                  variant="body2"
                  align="center"
                  className={classes.skinType}
                >
                  {item?.title || ""}
                </Typography>

              </div>
            ))}
          </div>
        </div>
      </> : null
  );
}

export default Sensitive;
