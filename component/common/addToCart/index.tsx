import { Theme, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import ShoppingBagModal from '../miniCart/shoppingBag';
import Shades from '../miniCart/shades';
import SelectSize from '../miniCart/selectSize';
import { addToBag } from './action';
// import Utils from "../../../utils";
import React from 'react';
import { notifyMe } from '../product/action';
import Utils from '../../utils';
import { addToBag as eventAddToBag } from '../../utils/event/action';
import { customGa4Event } from '../../utils/gtag';
// import { addToBag as eventAddToBag } from "../../../utils/event/action";
// import { customGa4Event } from "../../../utils/gtag";
// import { getWishList } from "../../../pages/wishlist/action";
// import { letterSpacing } from "@mui/system";
declare global {
  interface Window {
    gtag?: any;
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    font: `normal ${theme.spacing(1.3)} Work Sans Medium`,
    '& .MuiButton-contained': {
      color: 'var(--white)',
    },
    borderRadius: 4,
    textTransform: 'none',
    padding: theme.spacing(1, 2),
    width: 'max-content',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
      width: '100%',
      padding: theme.spacing(1.3, 2),
    },
  },
  btnWidth: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));

interface Props {
  product: any;
  callback: Function;
  section: any;
  disabled?: boolean;
  type?: string;
  isSearchOrRecommend?: boolean;
  isInStock?: boolean;
}

const AddToCart: React.FC<any> = (props: Props) => {
  const classes = useStyles();
  const item = props?.product;
  const { section, disabled } = props;

  const [shoppingBag, toggleShoppingBag] = useState(false);
  const [selectShades, toggleSelectShades] = useState(false);
  const [selectSize, toggleSelectSize] = useState(false);
  const dispatch: any = useDispatch();

  const toggleBagDrawer = (open: any) => (_event: any) => {
    // toggleDrawer(event);
    toggleShoppingBag(open);
  };
  const toggleShadesDrawer = (open: any) => (_event: any) => {
    // toggleDrawer(event);
    toggleSelectShades(open);
  };
  const toggleSelectSizeDrawer = (open: any) => (_event: any) => {
    // toggleDrawer(event);
    // toggleSelectShades(false);

    toggleSelectSize(open);
  };

  const enableShoppingBag = (item: any) => {
    if (
      item.type === 'configurable' &&
      item?.configurableProductLinks?.length > 1
    ) {
      if (
        Utils.constants.productVariant.indexOf(
          item?.configurableProductOptions?.[0]?.attribute_key
        ) > -1
      ) {
        // if (item?.configurableProductOptions?.[0]?.attribute_key === 'color') {
        toggleSelectShades(true);

        // } else if (item?.configurableProductOptions?.[0]?.label === Utils.constants.productVariant.size) {
      } else {
        toggleSelectSize(true);
        // toggleSelectSizeDrawer(true)
      }
    } else {
      let data: any = {
        productId: item.magentoId,
        attributeData:
          item.type !== 'simple'
            ? [
                {
                  id: item.configurableProductOptions?.[0]?.attribute_id,
                  value:
                    item.configurableProductOptions?.[0]?.values?.[0]
                      ?.value_index,
                },
              ]
            : [],
        type: item.type,
        quantity: 1,
      };

      if (section === 'wishlist') {
        data.wishlistItemId = item._id;
      }
      addToCart(data);
      // dispatch(getShoppingBagList());
    }
  };

  const addToCart = (payload: {
    productId: any;
    attributeData: any[];
    type: string;
    quantity: string | number;
    wishlistItemId?: string | number;
  }) => {
    let payloadObj: any = {
      ...payload,
      isSearchOrRecommend: props?.isSearchOrRecommend ? true : false,
    };
    // if(section==="recommend"||props?.type==="mobile-home")
    // payloadObj.isSearchOrRecommend=true;
    dispatch(
      addToBag(
        payloadObj,
        () => {
          let categoryAttributesIndex = item?.customAttributes.findIndex(
            (i: any) => i.attribute_code === 'category_ids'
          );
          let categoryAttributesData =
            item?.customAttributes[categoryAttributesIndex];
          let categoryArray = categoryAttributesData?.label.reduce(
            (i: any, j: any) => {
              i.push({
                CategoryName: j.label,
                CategoryId: j.value,
              });
              return i;
            },
            []
          );
          eventAddToBag({
            ProductId: `${item.magentoId}`,
            ProductName: `${item.name}`,
            Price: `${item.price}`,
            Category: JSON.stringify(categoryArray),
            FromScreen: `${section}`,
          });
          if (typeof window && window.gtag !== 'undefined') {
            const gtagPayload = {
              currency: 'INR',
              items: [
                {
                  id: `${item.sku}`,
                  name: `${item.name}`,
                  brand: 'The Body Shop',
                  item_id: `${item.sku}`,
                  item_name: `${item.name}`,
                  item_brand: 'The Body Shop',
                  quantity: `${item?.productOrder}`,
                  price: `${item.price}`,
                },
              ],
              category: item?.category?.name,
            };
            customGa4Event('add_to_cart', gtagPayload);
            if (
              process.env.REACT_APP_ENV !== 'development' &&
              process.env.REACT_APP_ENV !== 'staging'
            ) {
              window.gtag('event', 'add_to_cart', gtagPayload);
            }
          }
          // if (props?.type !== "mybag" && props?.type !== "freeSample")
          //   toggleShoppingBag(true);
          if (section === 'wishlist') {
            dispatch({
              type: Utils.ActionName.WISHLIST_UPDATE,
              payload: payload.wishlistItemId,
            });
          }
        },
        () => {
          if (props?.type !== 'mybag' && props?.type !== 'freeSample')
            toggleShoppingBag(true);
        }
      )
    );
  };

  const onNotify = (data: any) => {
    let attributeData: any = {};
    if (data.type !== 'simple') {
      const configurableData = data.configurableProductOptions?.[0];
      attributeData.id = configurableData?.attribute_id;
      attributeData.value = configurableData?.values?.[0]?.value_index;
    }
    // const email = localStorage.getItem("email");
    // const message = `We will notify you over the mail ${email} once the product is back in stock`;
    const params: any = {
      productId: data.magentoId,
      attributeData: data.type !== 'simple' ? [attributeData] : [],
      type: data.type,
    };
    if (data.type === 'configurable')
      params.childId = data?.configurableProductLinks[0]?.magentoId || '';

    notifyMe(params)
      .then((resp) => {
        if (resp?.data?.message) {
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'success',
              message: resp?.data?.message,
            },
          });
        }
      })
      .catch((_error) => {});
  };
  return (
    <>
      {/* {item?.stockItem?.is_in_stock ? ( */}
      {/* {item?.isInStock || item?.stockItem?.is_in_stock ? ( */}
      {
        // !item?.isInStock && item.type !== "configurable" ? (
        !props?.isInStock ? (
          <div className={classes.btnWidth}>
            <Button
              color="primary"
              variant="outlined"
              className={classes.btn}
              onClick={() => onNotify(item)}
              // disabled
            >
              {/* {item.type === "configurable" ? `Select ${item?.configurableProductOptions?.[0]?.label}` : "Notify Me"} */}
              {'Notify Me'}
            </Button>
          </div>
        ) : (
          <div className={classes.btnWidth}>
            <Button
              color="primary"
              variant="contained"
              className={classes.btn}
              onClick={() => enableShoppingBag(item)}
              disabled={disabled}
            >
              {item.type === 'configurable' &&
              item?.configurableProductLinks?.length > 1
                ? `Select ${item?.configurableProductOptions?.[0]?.label}`
                : 'Add to Bag'}
              {/* {item.type === "configurable" ? `Select Color` : "Add to Bag"} */}
            </Button>
          </div>
        )
      }
      {shoppingBag && (
        <ShoppingBagModal
          section={section}
          visible={shoppingBag}
          toggleDrawer={toggleBagDrawer}
          // toggleShoppingBag={toggleShoppingBag}
        />
      )}
      {selectShades && (
        <Shades
          item={item}
          addToCart={addToCart}
          // closeShadesOpenSize={closeShadesOpenSize}
          visible={selectShades}
          toggleDrawer={toggleShadesDrawer}
          section={section}
          // callback={props.callback}
          // toggleSelectSizeDrawer={toggleSelectSizeDrawer}
        />
      )}
      {selectSize && (
        <SelectSize
          item={item}
          addToCart={addToCart}
          // closeSizeOpenBag={closeSizeOpenBag}
          visible={selectSize}
          toggleDrawer={toggleSelectSizeDrawer}
          section={section}
          // callback={props.callback}
        />
      )}
    </>
  );
};

export default AddToCart;
