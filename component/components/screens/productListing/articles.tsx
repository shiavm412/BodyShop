// @ts-nocheck
import { createStyles, Theme, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import Utils from '../../component/utils';
// import Utils from "../../utils";
// import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    productHover: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      zIndex: 1,
      backgroundColor: 'var(--medium-creame-color)',
      // transform: "translateY(-100%)",
      opacity: '0',
      visibility: 'hidden',
      transition: 'all .3s ease',
    },

    imgBox: {
      height: '250px',
    },

    prodImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center center',
    },

    footerInfo: {
      backgroundColor: 'var(--medium-creame-color)',
      padding: '16px 14px 22px',
      textAlign: 'center',
    },
    title: {
      fontSize: '15px',
      fontWeight: 'bold',
      lineHeight: '1',
      color: 'var(--green-color-100)',
      textAlign: 'center',
    },
    imgDiv: {
      borderRadius: 4,
      // backgroundColor: "var(--light-creame-color)",
      // position: "relative",
      // padding: "10%",
      '& img': {
        // width: "100%"
      },
    },
    prodDescription: {
      fontSize: '14px',
      color: 'var(--green-color-100)',
      lineHeight: '1.2',
      textAlign: 'center',
      margin: '9px 0 12px',
      height: '65px',
      overflow: 'hidden',
    },
    btn: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.5
      )} Work Sans`,
      color: 'var(--white)',
      borderRadius: 4,
      textTransform: 'capitalize',
      padding: theme.spacing(1, 2),
    },
  })
);

export default function Article() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.imgDiv}>
        {/* {Object(item && item?.image).map((key: any) => (
                    key?.media_type === 'image' ?
                        <img className={classes.prodImg} src={`${IMAGE_URL}${key.file}`} alt="product" />
                        :
                        null

                ))} */}
        {/* <img src={Utils.images.PRODUCT_ONE} alt="img one" /> */}
        <div className={classes.productHover}>
          <div className={classes.imgBox}>
            {/* {Object(item && item?.customAttributes).map((key: any) => (
                            key?.attribute_code === 'image' ?
                                <img className={classes.prodImg} src={`${IMAGE_URL}${key.value}`} alt="product" />
                                :
                                null

                        ))} */}

            <img
              className={classes.prodImg}
              src={Utils.images.PRODUCT}
              alt="product"
            />
          </div>
          <div className={classes.footerInfo}>
            {/* {Object(item && item?.customAttributes).map((key: any) => (
                            key?.attribute_code === 'meta_title' ?
                                <h5 className={classes.title}>{key.value}</h5>
                                :
                                null
                        ))} */}
            <h5 className={classes.title}>How to cleanse your skin </h5>
            {/* {Object(item && item?.customAttributes).map((key: any) => (
                            key?.attribute_code === 'meta_description' ?
                                <p className={classes.prodDescription}>{key.value}</p>
                                :
                                null
                        ))} */}
            <Link to={`product-detail/`}>
              <Button
                color="primary"
                variant="contained"
                className={classes.btn}
              >
                Discover More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
