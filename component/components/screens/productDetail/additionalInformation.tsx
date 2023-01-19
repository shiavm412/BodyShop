import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { ReducersModal } from '../../../models';
import ReactHtmlParser from 'react-html-parser';
import { Box } from '@mui/material';
import CustomAccordion from '../../../customAccordion';

const useStyles = makeStyles((theme: Theme) => ({
  outerAdditionalDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  content: {
    paddingLeft: '0px',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.3)}  Work Sans Regular`,
      flexBasis: '50%',
      margin: theme.spacing(0.5, 0),
    },
  },
  contentHeading: {
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.3)}  Work Sans SemiBold`,
      color: 'black',
      margin: theme.spacing(0.5, 0),
    },
  },
}));

export default function AdditionalInformation() {
  let productDetail: any = {};

  const productData: any = useSelector(
    (state: ReducersModal) => state?.productDetailReducer
  );
  if (productData) {
    productDetail = productData?.product;
  }

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
  const classes = useStyles();
  return (
    <>
      {(getAttributeValue('country_of_manufacture') != '' ||
        getAttributeValue('expiry_date') !== '' ||
        getAttributeValue('manufacturer_name') != '' ||
        getAttributeValue('imported_by') != '' ||
        getAttributeValue('manufacturer_address') != '') && (
        <CustomAccordion
          heading="Additional Information"
          details={
            <>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {getAttributeValue('more_information') && (
                  <Typography className={classes.content}>
                    {ReactHtmlParser(getAttributeValue('more_information'))}
                  </Typography>
                )}
                {getAttributeValue('expiry_date') !== '' && (
                  <Typography className={classes.content}>
                    <strong>Best Before :</strong>{' '}
                    {ReactHtmlParser(
                      getAttributeValue('expiry_date') != ''
                        ? getAttributeValue('expiry_date')
                        : 'N/A'
                    )}
                  </Typography>
                )}
                {getAttributeValue('manufacturer_name') != '' && (
                  <Typography className={classes.content}>
                    <strong>Manufacturer's Name :</strong>{' '}
                    {ReactHtmlParser(
                      getAttributeValue('manufacturer_name') != ''
                        ? getAttributeValue('manufacturer_name')
                        : 'N/A'
                    )}
                  </Typography>
                )}
                {getAttributeValue('imported_by') != '' && (
                  <Typography className={classes.content}>
                    <strong>Imported By :</strong>{' '}
                    {ReactHtmlParser(
                      getAttributeValue('imported_by') != ''
                        ? getAttributeValue('imported_by')
                        : 'N/A'
                    )}
                  </Typography>
                )}
                {getAttributeValue('manufacturer_address') != '' && (
                  <Typography className={classes.content}>
                    <strong>Manufacturer Address :</strong>{' '}
                    {ReactHtmlParser(
                      getAttributeValue('manufacturer_address') != ''
                        ? getAttributeValue('manufacturer_address')
                        : 'N/A'
                    )}
                  </Typography>
                )}
                {getAttributeValue('country_of_manufacture') != '' && (
                  <Typography className={classes.content}>
                    <strong>Country of Origin :</strong>{' '}
                    {ReactHtmlParser(
                      getAttributeValue('country_of_manufacture') != ''
                        ? getAttributeValue('country_of_manufacture')
                        : 'N/A'
                    )}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <div>
                  <div className={classes.outerAdditionalDiv}>
                    {getAttributeValue('more_information') && (
                      <Typography className={classes.content}>
                        {ReactHtmlParser(getAttributeValue('more_information'))}
                      </Typography>
                    )}
                  </div>
                  <div className={classes.outerAdditionalDiv}>
                    {getAttributeValue('expiry_date') !== '' && (
                      <>
                        {' '}
                        <Typography className={classes.contentHeading}>
                          Best Before :
                        </Typography>
                        <Typography className={classes.content}>
                          {ReactHtmlParser(
                            getAttributeValue('expiry_date') != ''
                              ? getAttributeValue('expiry_date')
                              : 'N/A'
                          )}
                        </Typography>
                      </>
                    )}
                  </div>
                  <div className={classes.outerAdditionalDiv}>
                    {getAttributeValue('manufacturer_name') != '' && (
                      <>
                        <Typography className={classes.contentHeading}>
                          Manufacturer's Name :
                        </Typography>
                        <Typography className={classes.content}>
                          {ReactHtmlParser(
                            getAttributeValue('manufacturer_name') != ''
                              ? getAttributeValue('manufacturer_name')
                              : 'N/A'
                          )}
                        </Typography>
                      </>
                    )}
                  </div>
                  <div className={classes.outerAdditionalDiv}>
                    {getAttributeValue('imported_by') != '' && (
                      <>
                        <Typography className={classes.contentHeading}>
                          Imported By :
                        </Typography>
                        <Typography className={classes.content}>
                          {ReactHtmlParser(
                            getAttributeValue('imported_by') != ''
                              ? getAttributeValue('imported_by')
                              : 'N/A'
                          )}
                        </Typography>
                      </>
                    )}
                  </div>
                  <div className={classes.outerAdditionalDiv}>
                    {getAttributeValue('manufacturer_address') != '' && (
                      <>
                        <Typography className={classes.contentHeading}>
                          Manufacturer Address :
                        </Typography>
                        <Typography className={classes.content}>
                          {ReactHtmlParser(
                            getAttributeValue('manufacturer_address') != ''
                              ? getAttributeValue('manufacturer_address')
                              : 'N/A'
                          )}
                        </Typography>
                      </>
                    )}
                  </div>
                  <div className={classes.outerAdditionalDiv}>
                    {getAttributeValue('country_of_manufacture') != '' && (
                      <>
                        <Typography className={classes.contentHeading}>
                          Country of Origin :
                        </Typography>
                        <Typography className={classes.content}>
                          {ReactHtmlParser(
                            getAttributeValue('country_of_manufacture') != ''
                              ? getAttributeValue('country_of_manufacture')
                              : 'N/A'
                          )}
                        </Typography>
                      </>
                    )}
                  </div>
                </div>
              </Box>
            </>
          }
          openByDefault={false}
        />
      )}
    </>
  );
}
