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
            letterSpacing: "2px",
            textAlign:"center"

        },
        subheading: {
            font: `normal ${theme.spacing(1.5)} Work Sans SemiBold`,
            color: "var(--white)",
            letterSpacing: "1px",
            margin: theme.spacing(1.2, 0, 1.6, 0),
            textAlign:"center"
        },
        btn: {
            "&.MuiButton-root": {
                borderRadius: 6,
                font: `normal ${theme.spacing(1.4)} Work Sans SemiBold`,
                textTransform: "capitalize",
                background: "var(--light-green)",
                color: "#363F3C",
                width: "60%",
                padding: "17px 0px",
            },
        },
        sliderRoot: {
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            cursor: "pointer",
           
        },
        imagesDiv: {
            height: "100%",
            width: "60%",
        },
        noImgDiv: {
            height: "100%",
            padding: "20px",
            width: "60%",
        },
        textDiv: {
            background: "gray",
            height: "100%",
            cursor: "pointer",
            position: "relative",
            width: "40%",
            padding: theme.spacing(3, 2, 0, 2),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
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

export default function Content1({ item, navigateTo }: Props) {
    const classes = useStyles()
    const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;
    return (
        <div key={item?.key} onClick={() => {
            if (!item?.button_text) navigateTo(item)
        }}>
            <div className={classes.sliderRoot}>
                <img
                    src={item?.web_img_path ? IMAGE_URL + item.web_img_path : Utils.images.PRODUCT_PLACEHOLDER}
                    className={item?.web_img_path ? classes.imagesDiv : classes.noImgDiv}
                    alt="bannerImg"
                />
                <div className={classes.textDiv}>
                    <Typography variant="h4" className={clsx(classes.heading, classes.multiLineEllipsis)}>
                        {item?.title || ""}
                    </Typography>
                    <div className={clsx(classes.subheading, classes.multiLineEllipsis)} dangerouslySetInnerHTML={{
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
