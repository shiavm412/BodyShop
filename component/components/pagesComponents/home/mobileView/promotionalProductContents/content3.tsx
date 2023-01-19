import {
    Theme,
} from "@mui/material";
import Utils from "../../../../../utils";
import _ from "lodash";
import { makeStyles , createStyles} from "@mui/styles";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sliderRoot: {
            backgroundSize: "cover !important",
            width: "100%",
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
            width: "100vw",
        },
        noImgDiv: {
            position: "absolute",
            height: "220px",
            width: "100%",
            padding: "10px"
        }
    })
);
interface Props {
    item: any;
    navigateTo: Function;
}

export default function Content3({ item, navigateTo }: Props) {
    const classes = useStyles()
    const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

    return (
        <div key={item?.key} onClick={() => {
             navigateTo(item)
        }}>
            <div className={classes.sliderRoot}>
                <img
                    src={item?.mobile_img_path ? IMAGE_URL + item.mobile_img_path : Utils.images.PRODUCT_PLACEHOLDER}
                    className={item?.mobile_img_path ? classes.imagesDiv : classes.noImgDiv}
                    alt="bannerImg"
                />
            </div>
        </div>
    );
}
