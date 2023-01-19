import {
   
    Theme,
    Typography,
    Button,
} from "@mui/material";
import { makeStyles , createStyles} from "@mui/styles";

import Utils from "../../../../../utils";
import _ from "lodash";
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            font: `normal 700 ${theme.spacing(
                2.4
            )}  Recoleta Alt`,
            color: "var(--white)",
            lineHeight: "33px",
            letterSpacing: "3.1px"
        },
        subheading: {
            font: `normal 600 ${theme.spacing(1.3)} Work Sans`,
            color: "var(--white)",
            letterSpacing: "1px",
            margin: theme.spacing(0.6, 0, 1.5, 0),
        },
        btn: {
            "&.MuiButton-root": {
                borderRadius: 6,
                font: `normal 600 ${theme.spacing(1.3)} Work Sans`,
                textTransform: "capitalize",
                background: "var(--light-green)",
                color: "#363F3C",
                alignSelf: "flex-end",
                padding: "17px 25px",
            },
        },
        bannerCarousel: {
            "& .carousel-slider": {
                top: "0px !important",
                "& .control-dots": {
                    marginBottom: "10px",
                    "& .dot": {
                        width: "10px",
                        height: "10px",
                    },
                },
            },
        },

        sliderRoot: {
            backgroundSize: "cover !important",
            maxWidth: "100%",
            height: "220px",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            cursor: "pointer",

        },
        imagesDiv: {
            position: "absolute",
            background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)) center center  no-repeat`,
            height: "220px",
            objectFit: "cover",
            width: "100vw",
        },
        noImgDiv: {
            height: "220px",
            width: "100%",
            display: "flex",
            justifyContent: "center"
        },
        textDiv: {
            cursor: "pointer",
            position: "relative",
            width: "100vw",
            padding: "15px 15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%"
        },
        textContent: {
            alignSelf: "flex-start",
        },
        noImgContent: {
            display: "block"
        },
        multiLineEllipsis: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": 2,
            "-webkit-box-orient": "vertical"
        }
    })
);
interface Props {
    item: any;
    navigateTo: Function;
}

export default function Content4({ item, navigateTo }: Props) {
    const classes = useStyles()
    const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

    return (
        <div key={item?.key} onClick={() => {
            if (!item?.button_text) navigateTo(item)
        }}>
            <div className={clsx(classes.sliderRoot, item?.mobile_img_path ? "" : classes.noImgContent)}>
                <img
                    src={item?.mobile_img_path ? IMAGE_URL + item.mobile_img_path : Utils.images.PRODUCT_PLACEHOLDER}
                    className={item?.mobile_img_path ? classes.imagesDiv : classes.noImgDiv}
                    alt="bannerImg"
                />
                <div className={classes.textDiv}>
                    <div className={classes.textContent}>
                        <Typography variant="h4" className={clsx(classes.heading, classes.multiLineEllipsis)}>
                            {item?.title || ""}
                        </Typography>
                        <div className={clsx(classes.subheading, classes.multiLineEllipsis)} dangerouslySetInnerHTML={{
                            __html: item?.description || ""
                        }}></div>
                    </div>
                    {
                        item?.button_text ?
                            <Button
                                color="primary"
                                variant="contained"
                                className={classes.btn}
                                onClick={() => navigateTo(item)}
                            >
                                {item.button_text}
                            </Button> : ""
                    }
                </div>
            </div>
        </div>
    );
}
