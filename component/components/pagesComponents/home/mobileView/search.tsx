/* eslint-disable react/jsx-key */
import {
  Theme,
  Typography,
  Chip,
  Grid,
  Drawer,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import _ from 'lodash';
import { Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import { getTopSearch, userSearch } from '../../../../../store/home/action';
import Product from '../../../../common/product';
import { getHomeRecommendations } from '../../../../common/recommendationCarousel/action';
import Utils from '../../../../utils';
import { isGuestUser } from '../../../../utils/session';
import SearchField from '../../../headers/searchField';
import searchProducts from '../../../searchModal/searchProducts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inleneText: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItem: 'center',
    },
    clearAllButton: {
      color: '#D82020',
      fontSize: 14,
      fontWeight: 'bold',
    },
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
    rootContainer: {
      padding: theme.spacing(0, 1.6),
    },
    topSearch: {
      '& .MuiChip-root': {
        margin: theme.spacing(0.3),
      },
    },
    heading: {
      fontSize: 16,
    },
    skeletonView: {
      display: 'flex',
      flexDirection: 'row',
      '& .MuiSkeleton-root': {
        margin: theme.spacing(1),
        borderRadius: 20,
      },
    },
    searchData: {
      top: '108px !important',
      '& .MuiPaper-root': {
        boxShadow: 'none',
        // padding: theme.spacing(2, 1),
        top: 108,
      },
      '& .MuiBackdrop-root': {
        top: 108,
      },
      '& .MuiDrawer-paperAnchorTop': {
        height: '78%',
      },
    },
    productImage: {
      height: 36,
      width: 36,
      marginLeft: theme.spacing(1),
      '& img': {
        maxHeight: '100%',
      },
    },
    list: {
      display: 'flex',
      alignItems: 'center',
      height: 50,
      justifyContent: 'space-between',
      '& .MuiTypography-root': {
        font: 'normal 400 14px Work Sans',
        color: 'var(--light-gray)',
      },
      '& .suggestion': {
        display: 'flex',
        alignItems: 'center',
        '& >img': {
          marginRight: theme.spacing(1),
        },
      },
    },
    gridContainer: {
      [theme.breakpoints.down('xs')]: {
        '&.MuiGrid-container': {
          flexWrap: 'nowrap',
          overflowX: 'auto',
          columnGap: '5px',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '& .MuiGrid-grid-xs-6': {
          maxWidth: '60%',
          flexBasis: '60%',
        },
      },
    },
    productContainer: {
      width: '170px',
    },
    searchContent: {
      display: 'flex',
      overflowX: 'auto',
      //   width:"100vw",
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    color: {
      backgroundColor: '#EAE49E',
    },
  })
);

const MobileSearch = () => {
  const classes = useStyles();
  const dispatch: any = useDispatch();
  const history = useRouter();
  const [topSearch, setTopSearch] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);
  const [showSugBox, setShowSugBox] = useState(false);
  const [value, setValue] = useState('');
  const recentData: any = localStorage.getItem('recentSearch');
  const [recentSeraches, setRecentSeraches] = useState(
    JSON.parse(recentData) || []
  );
  const recommendedData = useSelector(
    (state: any) => state.recommendReducer.recommendedData
  );

  useEffect(() => {
    getTopSearch()
      .then((resp) => {
        setTopSearch(resp.data.data.result);
      })
      .catch((err) => {});

    if (!recommendedData?.data) {
      dispatch(
        getHomeRecommendations({
          params: {
            value: isGuestUser() ? 'vr' : 'cr',
            limit: 10,
          },
        })
      );
    }
  }, []);

  const handleChange = (event: any) => {
    let value = event.target.value;
    if (value) {
      userSearch({ value, limit: 10 })
        .then((resp: any) => {
          let eventPayload = {
            SearchKey: value,
            FromScreen: 'Search',
            ClickBehaviour: 'Search Suggestions',
          };
          searchProducts(eventPayload);
          setSuggestion(resp?.data?.data?.suggestions?.result);
          setSearchProduct(resp?.data?.data?.products?.product_data);
          setShowSugBox(true);
        })
        .catch((err) => {});
    }
    setValue(value);
  };

  const IMAGE_URL = `${process.env.NEXT_PUBLIC_MEDIA_URL}`;

  const navigateTo = (item: any) => {
    history.push(`${Utils.routes.PRODUCT_LIST}?categoryId=${item.magentoId}`);
  };

  return (
    <div className={classes.rootContainer}>
      <SearchField
        clearSearch={() => {
          setValue('');
          setSuggestion([]);
          setSearchProduct([]);
        }}
        value={value}
        handleClick={(e: any) => handleChange(e)}
      />

      {/* <Backdrop
              sx={{ color: '#fff'}}
              open={true}
          >
              <Paper>
                  dasdahd
              </Paper>
          </Backdrop> */}

      <Drawer
        disableAutoFocus
        disableEnforceFocus
        anchor="top"
        open={showSugBox}
        className={classes.searchData}
      >
        <List>
          {suggestion.map((item: any, index: any) => {
            return (
              <>
                <ListItem
                  key={index}
                  className={classes.list}
                  onClick={() => {
                    history.push(
                      Utils.CommonFunctions.replaceUrlParams(
                        Utils.routes.PRODUCT_SEARCH_LIST,
                        { ':keyword': item }
                      )
                    );
                    // history.push({
                    //   pathname: Utils.routes.PRODUCT_LIST,
                    //   search: `?keyword=${item}`,
                    // })
                  }}
                >
                  <div className="suggestion">
                    <img src={Utils.images.SEARCH_ICON_HEADER} alt="search" />
                    <Typography>{item}</Typography>
                  </div>
                </ListItem>
                <Divider light />
              </>
            );
          })}
          {searchProduct.map((item: any, index: any) => {
            let pathname = `/${item.url}`;
            return (
              <>
                <ListItem
                  key={index}
                  className={classes.list}
                  onClick={() =>
                    // history.push(
                    //   `${Utils.CommonFunctions.replaceUrlParams(
                    //     Utils.routes.PRODUCT_DETAIL,
                    //     { ":id": item.id }
                    //   )}?isSearched=true`
                    // )
                    history.push({ pathname, search: `?isSearched=true` })
                  }
                >
                  <Typography>{item.name}</Typography>
                  <div className={classes.productImage}>
                    {item.image ? (
                      <img src={`${item.image}`} alt="product" />
                    ) : (
                      <img
                        src={`${Utils.images.PRODUCT_PLACEHOLDER}`}
                        alt="product"
                      />
                    )}
                  </div>
                </ListItem>
                <Divider light />
              </>
            );
          })}
        </List>
      </Drawer>
      {recentSeraches.length > 0 && (
        <div className={classes.topSearch}>
          <div className={classes.inleneText}>
            <Typography variant="h3" className={classes.heading}>
              Recent Search
            </Typography>
            <Typography
              variant="h6"
              className={classes.clearAllButton}
              onClick={() => {
                localStorage.removeItem('recentSearch');
                setRecentSeraches([]);
              }}
            >
              CLEAR ALL
            </Typography>
          </div>
          <div className={classes.innerContainer}>
            {recentSeraches.map((item: any) => {
              return (
                <div className={classes.innerDiv} key={item._id}>
                  <div className={classes.imgDiv}>
                    <img
                      // onClick={() => navigateTo(item)}
                      onClick={() =>
                        history.push({
                          pathname: Utils.routes.PRODUCT_LIST,
                          search: `?keyword=${item.name}`,
                        })
                      }
                      src={
                        item?.img ? item.img : Utils.images.PRODUCT_PLACEHOLDER
                      }
                      alt={item?.name || 'product'}
                      className={item?.img ? classes.img : classes.noImg}
                    />
                    <Typography
                      onClick={() =>
                        history.push({
                          pathname: Utils.routes.PRODUCT_LIST,
                          search: `?keyword=${item.name}`,
                        })
                      }
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
          {/* {topSearch.length ?
          <div className={classes.searchContent}>
            {topSearch.map((item: any) => {
              return (
                <Chip label={item} className={classes.color}
                  //    color="secondary"
                  onClick={() => history.push({ pathname: Utils.routes.PRODUCT_LIST, search: `?keyword=${item}` })} />
              )
            })}
          </div> :
          <div className={classes.skeletonView}>
            {[1, 2, 3, 4, 5].map((item: any) =>
              <Skeleton variant="rectangular" width={150} height={30} />
            )}
          </div>
        } */}
        </div>
      )}

      <div className={classes.topSearch}>
        <Typography variant="h3" className={classes.heading}>
          Top Search
        </Typography>
        {topSearch.length ? (
          <div className={classes.searchContent}>
            {topSearch.map((item: any) => {
              return (
                <Chip
                  label={item}
                  className={classes.color}
                  onClick={() => {
                    history.push(
                      Utils.CommonFunctions.replaceUrlParams(
                        Utils.routes.PRODUCT_SEARCH_LIST,
                        { ':keyword': item }
                      )
                    );
                    // history.push({ pathname: Utils.routes.PRODUCT_LIST, search: `?keyword=${item}` })
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div className={classes.skeletonView}>
            {[1, 2, 3, 4, 5].map((item: any) => (
              <Skeleton variant="rectangular" width={150} height={30} />
            ))}
          </div>
        )}
      </div>
      <div>
        <Typography variant="h3" className={classes.heading}>
          Best Seller
        </Typography>
        <Grid container className={classes.gridContainer}>
          {recommendedData?.data?.map((item: any) => {
            let image = item?.image?.[0]?.file;
            // let image = _.find(item.customAttributes, { attribute_code: 'swatch_image' });
            let configurableProduct =
              item?.configurableProductLinks?.find(
                (item: any) => item?.isInStock
              ) || item?.configurableProductLinks[0];

            let desc =
              item?.type === 'configurable'
                ? _.find(configurableProduct?.customAttributes, {
                    attribute_code: 'short_description',
                  })
                : _.find(item.customAttributes, {
                    attribute_code: 'short_description',
                  });

            return (
              <Grid item xs={6}>
                <div className={classes.productContainer}>
                  <Product
                    key={item._id}
                    section="recommend"
                    detail={_.truncate(
                      Utils.CommonFunctions.replaceHtmlTag(desc?.value),
                      { length: 50 }
                    )}
                    rate={item.price}
                    img={image}
                    attr={item}
                  />
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default MobileSearch;
