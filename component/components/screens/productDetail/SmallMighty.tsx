// import ContainedButton from "../../components/containedButton";
import { Theme, Typography } from '@mui/material';
import { useRouter } from 'next/router';
// import ReactHtmlParser from "react-html-parser";
// import CustomAccordion from "../../components/customAccordion";
import { useSelector } from 'react-redux';
import ContainedButton from '../../../common/containedButton';
import CustomAccordion from '../../../customAccordion';
import { ReducersModal } from '../../../models';
import { makeStyles } from '@mui/styles';

const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

const useStyles = makeStyles((theme: Theme) => ({
  smallButMighty: {
    '& .MuiButton-root': {
      padding: '16px 16px',
      marginTop: '24px',
    },
    '& ol': {
      marginLeft: '18px',
    },
    '& ul': {
      marginLeft: '18px',
    },
    '& li': {
      [theme.breakpoints.down('xs')]: {
        // "& .MuiTypography-body1": {
        font: `normal ${theme.spacing(1.4)} Work Sans Regular`,
        lineHeight: '22.4px',
        // },
      },
    },
  },
  smallButMightyImage: {
    // height: '289px',
    maxHeight: '289px',
    width: '80%',
    justifyContent: 'center',
    objectFit: 'cover',
  },
}));
const SmallMighty = () => {
  const classes = useStyles();
  const router = useRouter();
  const productData: any = useSelector(
    (state: ReducersModal) => state.productDetailReducer
  );
  let productDetail: any = productData?.product;

  const getAttributeValue = (attributeCode: any) => {
    if (productDetail && productDetail?.customAttributes?.length > 0) {
      const attributeObj = productDetail?.customAttributes?.find((el: any) => {
        return el.attribute_code === attributeCode;
      });

      if (attributeObj && attributeObj?.value) {
        if (attributeObj.value?.includes('&lt')) {
          let new_value = attributeObj?.value?.replaceAll('&lt;', '<');
          new_value = new_value?.replaceAll('&gt;', '>');
          return new_value;
        }
        return attributeObj.value;
      }
    }
    return '';
  };

  return (
    <div>
      {/* {ReactHtmlParser(getAttributeValue("small_but_mighty"))?.length > 0 ? ( */}
      <>
        <CustomAccordion
          // heading={
          //   ReactHtmlParser(getAttributeValue("small_but_mighty_title"))
          //     ?.length > 0
          //     ? ReactHtmlParser(getAttributeValue("small_but_mighty_title"))
          //     : "Small but Mighty"
          // }
          details={
            <Typography className={classes.smallButMighty}>
              {getAttributeValue('small_but_mighty_image') ? (
                <img
                  src={`${IMAGE_URL}catalog/product${getAttributeValue(
                    'small_but_mighty_image'
                  )}`}
                  alt="img"
                  className={classes.smallButMightyImage}
                />
              ) : null}

              {/* {ReactHtmlParser(getAttributeValue("small_but_mighty"))} */}

              {/* {ReactHtmlParser(getAttributeValue("small_but_mighty_link"))
                  ?.length > 0 ? ( */}
              {/* <ContainedButton
                // text={ReactHtmlParser(
                //   getAttributeValue("small_but_mighty_link")
                // ).toString()}
                text="Himanshu Rai"
                type="button"
              /> */}
              {/* ) : null} */}
            </Typography>
          }
          openByDefault={true}
        />
      </>
      {/* ) : null} */}
    </div>
  );
};

export default SmallMighty;
