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
            font: `normal ${theme.spacing(
                2.1
            )}  Recoleta Alt Bold`,
            color: "var(--white)",
            lineHeight: "32px",
            letterSpacing: "1px"
        },
        subheading: {
            font: `normal 600 ${theme.spacing(1.3)} Work Sans`,
            color: "var(--white)",
            letterSpacing: "1px",
            margin: theme.spacing(1.2, 0, 1.6, 0),
        },
        btn: {
            "&.MuiButton-root": {
                borderRadius: 6,
                font: `normal 600 ${theme.spacing(1.2)} Work Sans`,
                textTransform: "capitalize",
                background: "var(--light-green)",
                color: "#363F3C",
                width: "100%",
                padding: "17px 0px",
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
            maxWidth: "100%",
            width: "100%",
            height: "220px",
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
            cursor: "pointer",
        },
        imagesDiv: {
            height: "220px",
            width: "60%",
        },
        noImgDiv: {
            height: "220px",
            width: "60%",
            padding: "20px"
        },
        textDiv: {
            background: "gray",
            height: "100%",
            cursor: "pointer",
            position: "relative",
            width: "40%",
            padding: theme.spacing(3, 1, 0, 1),
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

export default function Content2({ item, navigateTo }: Props) {
    const classes = useStyles()
    const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

    return (
        <div key={item?.key} onClick={() => {
            if (!item?.button_text) navigateTo(item)
        }}>
            <div className={classes.sliderRoot}>
                <img
                    src={item?.mobile_img_path ? IMAGE_URL + item.mobile_img_path : Utils.images.PRODUCT_PLACEHOLDER}
                    className={item?.mobile_img_path ? classes.imagesDiv : classes.noImgDiv}
                    alt="bannerImg"
                />
                <div className={classes.textDiv}>
                    <Typography variant="h4" className={clsx(classes.heading,classes.multiLineEllipsis)}>
                        {item?.title || ""}
                    </Typography>
                    <div className={clsx(classes.subheading,classes.multiLineEllipsis)} dangerouslySetInnerHTML={{
                        __html: item?.description || ""
                    }}></div>
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
