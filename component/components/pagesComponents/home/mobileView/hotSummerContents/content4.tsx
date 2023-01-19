import { Theme, Typography } from "@mui/material";

import _ from "lodash";
import clsx from "clsx";
import { makeStyles , createStyles} from "@mui/styles";
import CustomButton from "../../../../../common/button";
import Utils from "../../../../../utils";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            // background: "var(--light-blue)",
            position: "relative",
            height: theme.spacing(24),
        },

        mainImg: {
            //   width: "150px",
            // right: 0,
            // borderTop: 0,
            // height: "210px",
            // background: "aliceblue",
            // borderBottom: 0,
            // position: "absolute",
            // borderTopLeftRadius: "120px",
            // borderBottomLeftRadius: "103px",
            position: "absolute",
            objectFit: "cover",
            width: "100%",
            height: theme.spacing(21),
        },
        textContainer: {
            position: "absolute",
            padding: "22px 24px 0px 24px",
        },
        heading: {
            font: `normal 700 ${theme.spacing(2.4)}  Recoleta Alt`,
            color: "white",
            letterSpacing: "2.4px",
            textTransform: "capitalize",
        },
        btnDiv: {
            "&.MuiButton-root": {
                borderRadius: 6,
                font: `normal 600 ${theme.spacing(1.3)} Work Sans`,
                textTransform: "capitalize",
                background: "var(--light-green)",
                color: "white !important",
                alignSelf: "flex-end",
                padding:"19px 29px !important", 
                letterSpacing:"2px"
            },
        },
        description: {
            font: `normal 500 ${theme.spacing(1.5)}  Work Sans`,
            color: "white",
            // textTransform: "capitalize",
            padding: theme.spacing(1, 0, 0, 0),
        },
        noImg: {
            position: "absolute",
            objectFit: "cover",
            width: "100%",
            height: theme.spacing(21),
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

export const Content4= ({ item, navigateTo }: Props) => {
    const classes = useStyles();
    const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

    return (
        Object.keys(item).length > 0 ?
            <>
                <div className={classes.container}>
                    <img
                        src={item?.mobile_img_path ? IMAGE_URL + item.mobile_img_path : Utils.images.CLUB_ONE}
                        alt="sideDesign"
                        className={item?.mobile_img_path ? classes.mainImg : classes.noImg}
                    />
                    <div className={classes.textContainer}
                        onClick={() => {
                            if (!item?.button_text)
                                navigateTo(item)
                        }}
                    >
                        <Typography variant="h4" className={clsx(classes.heading,classes.multiLineEllipsis)}>
                            {item?.title || ""}
                        </Typography>
                        <div className={clsx(classes.description,classes.multiLineEllipsis)} dangerouslySetInnerHTML={{
                            __html: item?.description || ""
                        }} />

                        {item?.button_text ?
                            // <div className={classes.btnDiv}>
                                <CustomButton
                                className={classes.btnDiv}
                                    variant="contained"
                                    fullWidth={false}
                                    type="button"
                                    text={item.button_text}
                                    onClick={() => navigateTo(item)}
                                />
                            // </div> 
                            : ""
                        }
                    </div>
                </div>
            </> :
            null
    );
};

