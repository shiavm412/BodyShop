import { Theme, Typography } from '@mui/material';
import _ from 'lodash';
import { makeStyles, createStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Utils from '../../../../utils';
import { useRouter } from 'next/router';
import { getPLPCategories } from '../../../screens/productListing/action';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    skinType: {
      font: `normal 700 ${theme.spacing(1.3)}  Work Sans`,
      color: 'var(--secondary-black)',
      marginTop: '11px',
      textAlign: 'center',
      lineHeight: '15px',
    },
    innerContainer: {
      display: 'flex',
      width: '100vw',
      overflowX: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    imgDiv: {
      cursor: 'pointer',
      width: theme.spacing(11),
      height: 'auto',
    },
    img: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      objectFit: 'cover',
      borderRadius: '50%',
      boxShadow: '0px 0px 30px rgba(146, 146, 146, 0.1)',
    },
    noImg: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      objectFit: 'cover',
      borderRadius: '50%',
      padding: '20px',
      boxShadow: '0px 0px 30px rgba(146, 146, 146, 0.1)',
    },
    border: {
      border: '3px solid var(--main-opacity)',
    },
    innerDiv: {
      margin: theme.spacing(0, 0, 1, 1),
      width: theme.spacing(11),
      height: 'auto',
      cursor: 'pointer',
    },
  })
);
interface Props {}
const Category = ({}: Props) => {
  const classes = useStyles();
  const history = useRouter();
  const [menus, setMenus] = useState([]);
  const dispatch: any = useDispatch();
  useEffect(() => {
    getPLPCategories()
      .then((resp) => {
        dispatch({
          type: Utils.ActionName.MOBILE_MENUS_DATA,
          payload: { menuData: resp?.data?.data?.data },
        });
        setMenus(resp.data.data.data);
      })
      .catch((err) => {});
  }, []);

  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

  const navigateTo = (item: any) => {
    let pathname = Utils.CommonFunctions.seoUrl(item, 'plp');
    history.push({ pathname });
  };
  return menus?.length > 0 ? (
    <>
      <div className={classes.innerContainer}>
        {menus.map((item: any) => {
          const image = _.find(item?.customAttributes, {
            attribute_code: 'image',
          });
          return (
            <div className={classes.innerDiv} key={item._id}>
              <div className={classes.imgDiv}>
                <img
                  onClick={() => navigateTo(item)}
                  src={
                    image?.value
                      ? IMAGE_URL + 'catalog/category' + image.value
                      : Utils.images.PRODUCT_PLACEHOLDER
                  }
                  alt="product"
                  className={image?.value ? classes.img : classes.noImg}
                />
                <Typography
                  onClick={() => navigateTo(item)}
                  variant="body2"
                  align="center"
                  className={classes.skinType}
                >
                  {item?.name || ''}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </>
  ) : null;
};

export default Category;
