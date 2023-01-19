import { useEffect, useState } from "react";

import Utils from "../../utils";
import request from "../../utils/request";
import _ from "lodash";

/**Components */
import SearchBox from "../../components/searchBox";
import SearchProducts from "./searchProducts";
import TrendingProducts from "./trendingProducts";
import { Button, Chip, Divider, Fade,  Modal, Skeleton, Theme, Typography } from "@mui/material";
// import { getTopSearch } from "../../pages/home/actions";
// import { useNavigate } from "react-router-dom";
// import { userSearch } from "../../pages/home/actions";
// import { searchProducts } from "../../utils/event/action";
import { getAuthToken } from "../../utils/session";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ROUTE_CONSTANTS } from "../../constants/routeConstants";
// import { SEARCHICON } from "utils/constantImages";
import { makeStyles } from "@mui/styles";
import { getTopSearch , userSearch} from "../../../store/home/action";


const useStyles : any = makeStyles((theme: Theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #0000",
    position: "absolute",
    top: 13,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 2),
    borderRadius: "5px",
    width: "60%",
    height: "80%",
    // [theme.breakpoints.only("sm")]: {
    //     // height: "100%"
    // },
    [theme.breakpoints.down(300)]: {
      width: "85%",
    },
  },
  searchIcon: {
    width: "24px",
    placeItems: "center",
    display: "flex",
  },
  innerContainer: {
    display: "flex",
  },
  clearBtn: {
    borderRadius: "4px",
    color: theme.palette.secondary.light,
  },
  productContainer: {
    // padding: theme.spacing(0,2),
    overflowY: "auto",
    height: "inherit",
  },
  topSearch: {
    "& .MuiChip-root": {
      margin: theme.spacing(0.3),
    },
  },
  heading: {
    fontSize: 16,
    // margin: theme.spacing(1, 0)
    padding: theme.spacing(2, 0),
    color: "var(--light-gray)",
  },
  skeletonView: {
    display: "flex",
    flexDirection: "row",
    "& .MuiSkeleton-root": {
      margin: theme.spacing(1),
      borderRadius: 20,
    },
  },
  searchContent: {
    display: "flex",
    overflowX: "auto",
    // width:"100vw",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  color: {
    backgroundColor: "#EAE49E",
  },
}));

export default function SearchIndex(props: any) {
  const classes = useStyles();
  const history = useRouter();
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState(keyword);
  const [productData, setProductData] = useState<any>();
  const [suggestion, setSuggestion] = useState<any>();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [topSearch, setTopSearch] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    if (keyword !== '') {
      handleChange(keyword);
    }
    else {
      setProductData({});
      setSuggestion({});
    }
  }, [keyword]);

  useEffect(() => {
    const timer = setTimeout(() => setKeyword(searchTerm), 700);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (getAuthToken()&&props?.open) {
      getTopSearch()
        .then((resp: any) => {
          setTopSearch(resp.data.data.result);
        })
        .catch((_err: any) => { });

      request
        .get(Utils.endPoints.RECOMMEND_PRODUCT, {
          params: {
            value: "trending",
            limit: 4,
          },
        })
        .then((resp) => {
          setTrendingProducts(resp.data.data.data);
        })
        .catch((_err) => { });

    }
  }, [props?.open]);

  const handleChange = (term: any) => {
    // setKeyword(e.target.value);
    if (!_.isEmpty(term) && term.length >= 3) {
      userSearch({
        value: term,
        limit: 10,
      })
        .then((resp: any) => {
          // let eventPayload = {
          //   SearchKey: e.target.value,
          //   FromScreen: "Search",
          //   ClickBehaviour: "Search Suggestions",
          // };
          // searchProducts(eventPayload);
          // dispatch(hideLoader())
          setProductData(resp.data.data?.products);
          setSuggestion(resp.data.data.suggestions);
        })
        .catch((_err: any) => {
          // dispatch(hideLoader())
        });
    } else {
      setProductData({});
      setSuggestion({});
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        closeAfterTransition
        {...props}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <div className={classes.innerContainer}>
             
              {/* <span className={classes.searchIcon}><SEARCHICON /></span> */}
              <SearchBox
                placeholder="Type here to search"
                onChange={(e: any) => {
                  setSearchTerm(e.target.value)
                }}
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter' && searchTerm) {
                    props.handleSuggestionClick(searchTerm)
                  }
                }}
                value={searchTerm}
              />
              {searchTerm.length ? (
                <Button
                  onClick={() => {
                    setSearchTerm("");
                  }}
                  className={classes.clearBtn}
                >
                  Clear
                </Button>
              ) : null}
            </div>
            <Divider />
            <div className={classes.productContainer}>
              <div className={classes.topSearch}>
                <Typography className={classes.heading}>Top Search</Typography>
                {topSearch.length ? (
                  <div className={classes.searchContent}>
                    {topSearch.map((item: any, index) => {
                      return (
                        <Chip
                          className={classes.color}
                          label={item}
                          key={index}
                          onClick={() => {
                            props.onClose();
                            dispatch({ type: 'mobile-applied-filters', payload: null })
                            let url = `${Utils.CommonFunctions.replaceUrlParams(ROUTE_CONSTANTS.PRODUCT_SEARCH_LIST, { ":keyword": item })}?isSearched=true`
                            history.push(url);
                            // history.push({
                            //   pathname: Utils.routes.PRODUCT_LIST,
                            //   search: `?keyword=${item}`,
                            // })
                          }
                          }
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className={classes.skeletonView}>
                    {[1, 2, 3, 4, 5].map((item: any) => (
                      <Skeleton variant="rectangular" key={item} width={150} height={30} />
                    ))}
                  </div>
                )}
              </div>
              {_.isEmpty(keyword) ? (
                <TrendingProducts
                  trendingProducts={trendingProducts}
                  {...props}
                  onModalClose={() => setKeyword("")}
                />
              ) : // !_.isEmpty(productData?.product_data) && !_.isEmpty(suggestion?.result) ?
                !_.isEmpty(productData?.product_data) ? (
                  <SearchProducts
                    productData={productData}
                    suggestion={suggestion}
                    {...props}
                    onModalClose={() => setKeyword("")}
                  />
                ) : _.has(productData, "product_data") &&
                  _.has(suggestion, "result") ? (
                  "No Records Found"
                ) : (
                  "Loading..."
                )}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
