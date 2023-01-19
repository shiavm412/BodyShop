import {  Typography, Divider, Theme } from '@mui/material';
import _ from 'lodash';
import { makeStyles } from "@mui/styles";

// import { PRODUCT_PLACEHOLDER } from 'utils/constantImages';


const useStyles : any= makeStyles((theme: Theme) => (
    {
        innerContainer: {
            display: "flex",
            cursor: "pointer"

        },
        imgContainer: {
            display: "flex",
            justifyContent: "center",
            background: "#F8F3E9",
            borderRadius: 4,
            // padding: theme.spacing(0, 1.5),
            height: 80,
            width: 80,
            "& img": {
                height: "100%"
            }
        },
        trending: {
            padding: theme.spacing(2, 0),
            color: "var(--light-gray)"
        },
        productName: {
            display: "flex",
            color: "var(--secondary-black)",
            padding: theme.spacing(0, 0, 0, 1),
            flexDirection: "column",
            justifyContent: "center",
            "& .MuiTypography-root": {
                font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(1.5)}  Work Sans`,
            },
        },
        divider: {
            margin: theme.spacing(2, 0)
        },
    })
);

export default function TrendingProducts(props: any) {

    const classes = useStyles();

    return (
        <>
            {!_.isEmpty(props.trendingProducts) ? (
                <>
                    <Typography className={classes.trending}>Trending</Typography>
                    {
                        props.trendingProducts.map((item: any, i: any) => (
                            <div key={i}>
                                {/* <Link to={`${Utils.CommonFunctions.replaceUrlParams(Utils.routes.PRODUCT_DETAIL, { ":id": item.magentoId, })}?isSearched=true`}> */}

                                {/* <Link to={Utils.CommonFunctions.replaceUrlParams(Utils.routes.PRODUCT_DETAIL,{ ":id": item.magentoId })}> */}

                                <div className={classes.innerContainer} onClick={() => {
                                    props.handleProductClick(item,"trending")
                                    props.onModalClose()
                                }}>

                                    <div className={classes.imgContainer}>
                                        {
                                            item.image?.length ?
                                                <img src={`${process.env.NEXT_PUBLIC_MEDIA_URL}catalog/product${item.image[0].file}`} alt="product" /> :
                                    //   <PRODUCT_PLACEHOLDER />
                                    "check later"
                                      }
                                    </div>
                                    <div className={classes.productName}>
                                        <Typography >{item.name}</Typography>
                                        <Typography >{item.sku}</Typography>
                                    </div>
                                </div>
                                {/* </Link> */}
                                <Divider className={classes.divider} />
                            </div>

                        ))}
                </>

            ) : null}
        </>
    )
}