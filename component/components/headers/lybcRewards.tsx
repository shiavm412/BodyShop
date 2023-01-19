import { Grid, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import format from "date-fns/format";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";
import Utils from "../../utils";

const useStyles : any = makeStyles((theme: Theme) =>
 ({
    pointBox: {
      background: "var(--white)",
      border: "2px solid #3A857E",
      boxSizing: "border-box",
      width: "148px",
      height: "148px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      [theme.breakpoints.down("xs")]: {
        width: "128px",
        height: "128px",
      }
    },
    leftPointBox: {
      marginLeft: "8px",
    },
    pointInner: {
      background: "#3A857E",
      width: "130px",
      height: "130px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      [theme.breakpoints.down("xs")]: {
        width: "110px",
        height: "110px",
      }
    },
    rewardDiv: {
      display: "flex",
      justifyContent: "center",
      padding: theme.spacing(1.5),
    },
    rewardRoot: {
      flexGrow: 1,
    },
    centerAlign: {
      padding: "5px 20px",
      [theme.breakpoints.down("xs")]: {
        padding: "0.25px 10px 0.25px 10px"
      }
    },
    point: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )} Work Sans`,
      lineHeight: "20.8px",
      // textTransform: "uppercase",
      color: "var(--white)",
      textAlign: "center",
    },
    pointName: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.2
      )} Work Sans`,
      color: "var(--white)",
      textAlign: "center",
      lineHeight: "15px",
    },
  })
);
interface Props {
  userInfo: any;
}
const LybcRewards = ({ userInfo }: Props) => {
  const classes = useStyles();
  const date = userInfo?.tierDetails?.enrollDate || null;
  const dashboardData =
    useSelector((state: ReducersModal) => state.userDetailReducer.dashboard) ||
    {};
  const memberData = [
    {
      title: `${userInfo?.tierDetails?.currentTier ?? "N/A"} Member`,
      subTitle: `Tier Start Date  ${date ? format(new Date(date), "dd/MM/yyyy") : ""
        }`,
    },
    {
      title: Utils.CommonFunctions.decimalFlat(dashboardData?.TotalEarnedPoints, 0) || 0,
      subTitle: "Total Points Earned",
    },
  ];

  return userInfo?.tierType == 2 || userInfo?.tierType === 1 ? (
    <div className={classes.rewardRoot}>
      <Grid container className={classes.rewardDiv}>
        {memberData.map((item: any, index: number) => (
          <div
            className={clsx(
              classes.pointBox,
              index === 1 ? classes.leftPointBox : ""
            )}
            key={index}
          >
            <div className={classes.pointInner}>
              <div className={classes.centerAlign}>
                <Typography className={classes.point}>{item?.title}</Typography>
              </div>
              <div className={classes.centerAlign}>
                <Typography className={classes.pointName}>
                  {item.subTitle}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </Grid>
    </div>
  ) : null;
};
export default LybcRewards;
