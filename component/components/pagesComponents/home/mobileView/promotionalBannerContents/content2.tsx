import {  Theme, Typography } from "@mui/material";
import { makeStyles , createStyles} from "@mui/styles";

import clsx from 'clsx'
import Utils from "../../../../../utils";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex !important",
            justifyContent: "stretch",
            alignItems: "stretch",
            flexDirection: "row-reverse",
            height: "100px"
        },
        leftContainer: {
            width: "20%",
        },
        rightContainer: {
            background: "var(--primary)",
            width: "80%",
            position: "relative",
        },
        imgContainer: {
            height: "100%",
            width: "100%"
        },
        img: {
            width: "100%",
            height: "100%",
            padding: "2px 0px"
        },
        textContainer: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            padding: theme.spacing(1.2, 1.2, 1.2, 1.5),
        },
        heading: {
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "var(--white)",
            letterSpacing: "2px",
            font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
                2
            )} Recoleta Alt`,
        },
        lineClamp: {
            display: "-webkit-box",
            "-webkit-line-clamp": 1,
            "&::-webkit-box-orient": "vertical",
        },
        // rightImg: {
        //     position: "absolute",
        //     width: "100%",
        //     height: theme.spacing(8),
        //     objectFit: "cover",
        // },
        subHeading: {
            color: "var(--white) !important",
            font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
                1.2
            )} Work Sans`,
            letterSpacing: "0.8px",
            marginTop: theme.spacing(1),
            // textDecoration: "underline",
            "& a":{
                color: "var(--white) !important",
            }
        },
        noImg: {
            display: "flex",
            alignItems: "center",
            padding: "10px",
            width: theme.spacing(8),
            background: "",
            height: "100%"
        },
        multiLineEllipsis: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": 2,
            "-webkit-box-orient": "vertical",
            color:"white"
        }
    })
);
interface Props {
    item: any;
    navigateTo: Function;
};

export default function Content2({ item, navigateTo }: Props) {
    const classes = useStyles();
    const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

    return (
        <div key={item.id} className={classes.container}
            onClick={() => navigateTo(item)}
        >
            <div className={classes.leftContainer}>
                <div className={classes.imgContainer}>
                    <img
                        src={item?.mobile_img_path ? IMAGE_URL + item.mobile_img_path : Utils.images.PRODUCT_PLACEHOLDER}
                        alt="cart"
                        className={item?.mobile_img_path ? classes.img : classes.noImg}
                    />
                </div>
            </div>
            <div className={classes.rightContainer}>
                {/* <img
                    src={item?.background_img_path ? IMAGE_URL + item.background_img_path : Utils.images.PRODUCT_PLACEHOLDER}
                    alt="cart"
                    className={classes.rightImg}
                /> */}
                <div className={clsx(classes.textContainer, classes.multiLineEllipsis)}>
                    <Typography className={classes.heading}>
                        {item?.title || ""}
                    </Typography>
                    <div className={clsx(classes.subHeading, classes.multiLineEllipsis)}
                        dangerouslySetInnerHTML={{ __html: item?.description || "" }}
                    >
                    </div>

                </div>

            </div>
        </div>
    )

}
