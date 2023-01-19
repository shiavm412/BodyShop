import {  Theme,  Typography } from "@mui/material";
import { makeStyles , createStyles} from "@mui/styles";

import clsx from 'clsx';
import Utils from "../../../../../utils";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: "100vw",
            height: "100px"
        },
        rightContainer: {
            width: "100vw",
            height: "100px",
            backgroundSize: "cover !important",
            background: "#f8f3e9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            // position: "relative",
        },
        img: {
            // width: "100vw",
            position: "absolute",
            height: "100px",
        },
        textContainer: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            padding: theme.spacing(2, 1.2, 1.2, 1.5),
            width: "100%"
        },
        heading: {
            color: "var(--white)",
            letterSpacing: "0.08em",
            font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
                2
            )} Recoleta Alt`,
        },
        subHeading: {
            color: "var(--white)",
            font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
                1.2
            )} Work Sans`,
            letterSpacing: "0.02em",
            marginTop: theme.spacing(1),
        },
        noImg: {
            padding: "10px",
            width: theme.spacing(8),
            height: theme.spacing(8),
            // background: ""
            // objectFit: "cover",
        },
        multiLineEllipsis: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": 1,
            "-webkit-box-orient": "vertical"
        },

    })
);
interface Props {
    item: any;
    navigateTo: Function;
};

export default function Content4({ item, navigateTo }: Props) {
    const classes = useStyles();
    const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

    return (
        <div key={item.id} className={classes.container}
            onClick={() => navigateTo(item)}
        >
            <div className={classes.rightContainer}>
                {item?.mobile_img_path ?
                    <img
                        src={item?.mobile_img_path ? IMAGE_URL + item.mobile_img_path : Utils.images.PRODUCT_PLACEHOLDER}
                        alt="cart"
                        className={classes.img}
                    /> : null
                }
                <div className={classes.textContainer}>
                    <Typography className={clsx(classes.heading, classes.multiLineEllipsis)}>
                        {item?.title || ""}
                    </Typography>
                    <div className={clsx(classes.subHeading, classes.multiLineEllipsis)} dangerouslySetInnerHTML={{ __html: item?.description || "" }}></div>

                </div>

            </div>
        </div >
    )

}
