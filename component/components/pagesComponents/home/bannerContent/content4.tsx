import {
    Theme,
    Typography,
    Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Utils from "../../../../utils";
import _ from "lodash";
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    ({
        heading: {
            font: `normal ${theme.spacing(
                2.7
            )}  Recoleta Alt Bold`,
            color: "var(--white)",
            lineHeight: "34px",
            letterSpacing: "2px"
        },
        subheading: {
            font: `normal ${theme.spacing(1.5)} Work Sans SemiBold`,
            color: "var(--white)",
            letterSpacing: "1px",
            margin: theme.spacing(1.2, 0, 1.6, 0),
        },
        btn: {
            "&.MuiButton-root": {
                borderRadius: 6,
                font: `normal ${theme.spacing(1.5)} Work Sans SemiBold`,
                textTransform: "capitalize",
                background: "var(--light-green)",
                color: "#363F3C",
                alignSelf: "flex-end",
                padding: "25px 35px",
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
            width: "100%",
            height: "80vh",
            position : "relative",
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "end",
            // cursor: "pointer",
            [theme.breakpoints.up(1920)]:{
                height: "509px",
            }
        },
        imagesDiv: {
            position: "absolute",
            background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)) center center  no-repeat`,
            height: "100%",
            objectFit: "cover",
            width: "100vw",
            [theme.breakpoints.up(1920)]:{
                width: "1920px",
                maxWidth: "100%",
                objectFit: "fill"
            }
        },
        noImgDiv: {
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center"
        },
        textDiv: {
            // cursor: "pointer",
            position: "relative",
            width: "100%",
            padding: "50px 50px",
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
        },
        cursor:{
            cursor:"pointer"
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
        <div className={!item?.button_text?classes.cursor:""} key={item?.key} onClick={() => {
            if (!item?.button_text) navigateTo(item)
        }}>
            <div className={clsx(classes.sliderRoot, item?.web_img_path ? "" : classes.noImgContent)}>
                <img
                    src={item?.web_img_path ? IMAGE_URL + item.web_img_path : Utils.images.PRODUCT_PLACEHOLDER}
                    className={item?.web_img_path ? classes.imagesDiv : classes.noImgDiv}
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
