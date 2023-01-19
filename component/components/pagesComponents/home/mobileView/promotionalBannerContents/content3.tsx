import {  Theme,  Typography } from "@mui/material";
import Utils from "../../../../../utils";
import Slider from "react-slick";
import { makeStyles , createStyles} from "@mui/styles";


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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "#f8f3e9"
        },
        img: {
            height: "100px",
        }
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

            </div>
        </div>
    )

}
