import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import CustomAccordion from "../../components/customAccordion";
import { ReducersModal } from '../../../models';
import ReactHtmlParser from 'react-html-parser';
import clsx from 'clsx';
import _ from 'lodash';
import IngredientsModal from './ingredientsModal';
import CustomAccordion from '../../../customAccordion';

const useStyles = makeStyles((theme: Theme) => ({
  minusMarginTop: {
    '& .MuiAccordionSummary-content.Mui-expanded': {
      marginTop: '-10px !important',
    },
  },
  ingredientsContent: {
    marginTop: '-10px !important',
  },
  description: {
    marginTop: '10px',
    font: `normal 400 ${theme.spacing(1.5)} Work Sans`,
    lineHeight: '27px',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.5)} Work Sans Regular`,
    },
  },
  title: {
    marginTop: '10px',
    font: `normal 700 ${theme.spacing(1.4)}  Recoleta Alt`,
    color: 'black',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.4)} Work Sans SemiBold`,
    },
  },
  ingredients: {
    marginTop: '-10px',
    cursor: 'pointer',
    // margin: theme.spacing(0, 0, 4, 0),
    font: 'normal 700 14px Work Sans',
    color: 'var(--main-opacity)',
    lineHeight: '16px',
    '& ul': {
      paddingLeft: '20px',
    },
    [theme.breakpoints.down('xs')]: {
      font: 'normal 14px Work Sans SemiBold',
    },
  },
  marginTop: {
    marginTop: '10px',
  },
}));
function Ingredients() {
  const classes = useStyles();
  const [ingredientModal, setIngredientModal] = useState(false);
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
    <>
      <CustomAccordion
        className={classes.minusMarginTop}
        heading="Ingredients"
        details={
          <div className={classes.ingredientsContent}>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  _.find(productData?.product?.customAttributes || {}, {
                    attribute_code: 'cft_title',
                  })?.value || '',
              }}
              className={classes.title}
            />
            <div
              dangerouslySetInnerHTML={{
                __html:
                  _.find(productData?.product?.customAttributes || {}, {
                    attribute_code: 'cft_description',
                  })?.value || '',
              }}
              className={classes.description}
            />
            <div
              dangerouslySetInnerHTML={{
                __html:
                  _.find(productData?.product?.customAttributes || {}, {
                    attribute_code: 'cft_title_1',
                  })?.value || '',
              }}
              className={classes.title}
            />
            <div
              dangerouslySetInnerHTML={{
                __html:
                  _.find(productData?.product?.customAttributes || {}, {
                    attribute_code: 'cft_description_1',
                  })?.value || '',
              }}
              className={classes.description}
            />
            <div
              dangerouslySetInnerHTML={{
                __html:
                  _.find(productData?.product?.customAttributes || {}, {
                    attribute_code: 'cft_title_2',
                  })?.value || '',
              }}
              className={classes.title}
            />
            <div
              dangerouslySetInnerHTML={{
                __html:
                  _.find(productData?.product?.customAttributes || {}, {
                    attribute_code: 'cft_description_2',
                  })?.value || '',
              }}
              className={classes.description}
            />

            {ReactHtmlParser(getAttributeValue('ingredients'))?.length > 0 && (
              <Typography
                className={clsx(
                  classes.ingredients,
                  _.find(productData?.product?.customAttributes || {}, {
                    attribute_code: 'cft_title',
                  })?.value
                    ? classes.marginTop
                    : ''
                )}
                onClick={() => setIngredientModal(true)}
              >
                View full list of ingredients
              </Typography>
            )}

            <IngredientsModal
              title={productData?.product?.name || ''}
              ingridientsDescription={ReactHtmlParser(
                getAttributeValue('ingredients')
              )}
              open={ingredientModal}
              handleClose={() => setIngredientModal(false)}
            />
          </div>
        }
        openByDefault={false}
      />
    </>
  );
}

export default Ingredients;
