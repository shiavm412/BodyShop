import { makeStyles } from "@mui/styles";
import Skeleton from "@mui/material/Skeleton";
import clsx from "clsx";
import { Theme } from "@mui/material";
const useStyles = makeStyles((theme: Theme) =>
  ({
    skeletonContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
    rewardsDiv: {
      [theme.breakpoints.down("xs")]: {
        background: "white",
        padding: "0px 10px",
        marginBottom: "10px"


      }
    },
    leftDiv: {
      display: "flex",
      flexDirection: "column",
      marginLeft: "10px",
    },
    leftImgDiv: {
      display: "flex",
      alignItems: "center",
    },
    rightDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

    },
    rightContent: {
      [theme.breakpoints.down("xs")]: {
        marginTop: "-10px !important"
      }
    },
    imgDiv: {},
  })
);
interface Props {
  sections?: Array<number>;
  hideCheckBox?: boolean;
  flag: string
}

const MyOrdersSkeleton = (props: Props) => {
  const classes = useStyles();
  const { sections, hideCheckBox, flag } = props;
  const arr = sections && sections.length > 0 ? sections : Array.of(1, 2, 3);
  return (
    <>
      {arr.map((i: any) => (
        <div className={clsx(classes.skeletonContainer, flag === "reward" ? classes.rewardsDiv : "")} key={i + flag}>
          <div className={classes.leftImgDiv}>
            <div className={classes.imgDiv}>
              <Skeleton key={i + flag + Math.random()} width={80} height={80} />
            </div>

            <div className={classes.leftDiv}>
              <Skeleton key={i + flag + Math.random()} width={180} height={20} />
              <Skeleton key={i + flag + Math.random()} width={120} height={10} />
            </div>
          </div>
          <div className={classes.rightDiv}>
            <Skeleton  className={ flag === "reward" ?classes.rightContent:""} key={i + flag + Math.random()} width={70} height={20} />
            {!hideCheckBox && <Skeleton key={i + flag + Math.random()} width={30} height={30} />}
          </div>
        </div>
      ))}
    </>
  );
};
export default MyOrdersSkeleton;
