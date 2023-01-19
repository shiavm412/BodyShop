//@ts-nocheck
import {
  createStyles,
  Theme,
  Typography,
  Divider,
  List,
  ListItem,
  Drawer,
  ListItemText,
  Button,
  RadioGroup,
  FormControlLabel,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
// import Utils from "../../utils";
// import GreenRadio from "../../components/common/customRadio";
// import { hideLoader, showLoader } from "../home/actions";
// import { getProductList } from "./action";
// import CustomCheckbox from "../../components/common/customCheckbox";
// import { useSelector } from "react-redux";
// import { ReducersModal } from "../../models";
import _ from 'lodash';
// import { useHistory, useLocation, useParams } from "react-router-dom";
import { debug } from 'util';
import GreenRadio from '../../component/common/customRadio';
import CustomCheckbox from '../../component/common/customCheckbox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sortingContainer: {
      position: 'sticky',
      top: '100px',
      background: 'white',
      zIndex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '5px 0px',
    },
    sortingContainer2: {
      position: 'sticky',
      top: '109px',
      background: 'white',
      zIndex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sortingContainer3: {
      position: 'sticky',
      top: '100px',
      background: 'white',
      zIndex: 1,
    },

    sortContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: 64,
      '& h3': {
        fontSize: 14,
        marginLeft: theme.spacing(2),
        fontFamily: 'work Sans Bold',
      },
      '& div': {
        display: 'flex',
      },
      '& hr': {
        height: 35,
      },
      background: 'white',
      zIndex: 1,
    },
    sortContainer2: {
      justifyContent: 'space-between',
      marginLeft: '-10px',
    },
    modal: {
      '& .MuiDrawer-paper': {
        borderRadius: '20px 20px 0px 0px',
        height: '550px',
        overflowY: 'hidden',
        justifyContent: 'flex-end',
      },
    },
    filterModalHeading: {
      margin: theme.spacing(1.5, 1.6, 1.5, 1.6),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    close: {
      font: `normal ${theme.spacing(1.4)} Work Sans Bold`,
      color: '#018786',
    },
    heading: {
      font: `normal ${theme.spacing(1.6)} Work Sans Bold !important`,
    },
    filterModalButton: {
      margin: theme.spacing(0, 2.5, 0, 2.5),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '25px 0px 25px 0px',
    },
    border: {
      borderTop: '1px solid lightgray',
    },
    leftButton: {
      color: '#3d857e',
      padding: '13px',
      width: '47%',
      font: `normal 700 ${theme.spacing(1.5)} Work Sans`,
      textTransform: 'capitalize',
      letterSpacing: '0.8px',
    },
    button: {
      padding: '13px',
      width: '47%',
      font: `normal 700 ${theme.spacing(1.5)} Work Sans`,
      textTransform: 'capitalize',
      letterSpacing: '0.8px',
    },
    radioLabel: {
      margin: theme.spacing(1, 0),
      '& .MuiButtonBase-root': {
        marginRight: theme.spacing(1.2),
      },
      paddingLeft: '16px',
      '& .MuiTypography-body1': {
        fontSize: '14px !important',
      },
    },
    greenChecked: {
      width: '30px',
      height: '30px',
    },
    tabs: {
      flexBasis: '35%',
      borderRight: '1px solid var(--text-color)',
      '& .Mui-selected': {
        background: '#018786 !important',
        color: 'var(--white)!important',
        font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
          1.3
        )} Work Sans !important`,
      },
      '& .MuiTab-wrapper': {
        textTransform: 'capitalize',
        font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
          1.2
        )} Work Sans !important`,
        color: 'black',
      },
      '& .MuiTabs-indicator': {
        background: '#018786',
      },
      '& .MuiTab-textColorPrimary': {
        background: 'var(--backgroun-color)',
      },
      '& button': {
        borderBottom: '1px solid lightgray',
        background: '#FAFAFA',
        opacity: 1,
      },
    },
    boxContainer: {
      flexBasis: '65%',
      padding: theme.spacing(0, 0, 0, 1),
      overflowY: 'auto',
    },
    tabsDiv: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: theme.spacing(1.2, 0),
      paddingRight: theme.spacing(1.6),
      '& .MuiTypography-body2': {
        textTransform: 'capitalize',
      },
    },
    filterContainer: {
      flexGrow: 1,
      display: 'flex',
      height: '350px',
    },
    sortByGroup: {
      height: '380px',
      overflowY: 'auto',
    },
    redDot: {
      color: 'red',
      fontSize: '65px',
      position: 'absolute',
      right: '-14px',
      bottom: '-13px',
    },
    redDotFixed: {
      color: 'red',
      fontSize: '65px',
      position: 'absolute',
      right: '3px',
      bottom: '9px',
    },
    filterTextContent: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    },
    filterText: {
      font: `normal ${theme.spacing(1.4)} Work Sans`,
    },
    selectedFilterText: {
      font: `normal ${theme.spacing(1.3)} Work Sans`,
    },
    description: {
      font: `normal ${theme.spacing(1.3)} Work Sans Medium`,
      padding: '20px 0px 10px 20px',
      color: 'black',
    },
    divider: {
      height: '3px',
      opacity: '0.4',
      background: 'lightgray',
    },
    icon: {
      height: '21px',
      padding: '0px 10px',
    },
    sortingDivImage: {
      display: 'flex',
    },
  })
);
const MobileSortAndFilter = ({ obj, setParams, setPage, productData }: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // let query = Utils.CommonFunctions.useQuery();
  const params: any = useParams();
  const history = useHistory();
  let isMobileSearched = query.get("isSearched");

  const sortingData = Utils.constants.sortingData;

  // let queryFilters = query?.get("filters") ?? "{}";
  queryFilters = JSON.parse(
    decodeURIComponent(decodeURIComponent(queryFilters))
  );

  const [sortBy, setSortBy] = useState(
    queryFilters?.sortBy || sortingData[0]?.id?.toString()
  );

  const [navbar, setNavbar] = useState(false);

  let keyword = params?.keyword ?? "";
  let categoryId = params?.id ?? "";

  const [apply, setApply] = useState(
    queryFilters?.customAttributes?.length > 0 ||
      queryFilters?.otherFilters?.length > 0
      ? true
      : false
  );

  const [payloadFilters, setPayloadFilters] = useState<any>({
    customAttributes: queryFilters?.customAttributes
      ? [...queryFilters?.customAttributes]
      : [],
    otherFilters: queryFilters?.otherFilters
      ? [...queryFilters?.otherFilters]
      : [],
  });

  const [open, setOpen] = useState({
    sort: false,
    filter: false,
  });

  const toggleDrawer =
    (section: "sort" | "filter", show: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen({ ...open, [section]: show });
    };

  const handleChange = () => {
    dispatch(showLoader());
    const params = {
      ...obj,
      ...queryFilters,
      ...payloadFilters,
      page: 1,
      query: keyword,
      sortBy,
      limit: 18,
    };
    setPage(1);
    setParams(params);

    dispatch(
      getProductList(params, false, () => {
        dispatch(hideLoader());
      })
    );

    history.push({
      pathname: history.location.pathname,
      search: `?filters=${encodeURI(
        encodeURIComponent(JSON.stringify(params))
      )}`,
    });
  };
  const products = productData?.products;

  const changeBackground = () => {
    if (isMobileSearched) {
      if (window.scrollY > 40) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    } else if (window.scrollY > 270) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground, true);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  const handleOpenFilter = () => {
    let { customAttributes, otherFilters } = queryFilters;
    if (customAttributes || otherFilters) {
      setPayloadFilters({
        customAttributes,
        otherFilters,
      });
    } else {
      setPayloadFilters({
        customAttributes: [],
        otherFilters: [],
      });
    }
    setOpen({ ...open, filter: true });
  };

  const handleOpenSort = () => {
    let { sortBy } = queryFilters;
    if (sortBy) {
      setSortBy(sortBy);
    } else {
      setSortBy(sortingData[0]?.id?.toString());
    }
    setOpen({ ...open, sort: true });
  };

  return (
    <>
      <>
        {products?.data?.length > 2 ? (
          <>
            <div className={classes.sortContainer}>
              <div onClick={handleOpenSort}>
                <img src={Utils.images.SORT_ICON} />
                <Typography variant="h3">Sort</Typography>
              </div>
              <Divider orientation="vertical" />
              <div onClick={handleOpenFilter}>
                <img src={Utils.images.MOBILE_FILTER} />
                <div className={classes.filterTextContent}>
                  <Typography variant="h3">Filter</Typography>
                  {(payloadFilters?.otherFilters?.length !== 0 ||
                    payloadFilters?.customAttributes?.length !== 0) &&
                    apply && (
                      <Typography className={classes.redDot}>.</Typography>
                    )}
                </div>
              </div>
            </div>

            <Divider className={classes.divider} />

            <div
              className={
                isMobileSearched
                  ? classes.sortingContainer2
                  : classes.sortingContainer
              }
            >
              {products?.data && products?.data?.length !== 0 && (
                <>
                  <p className={classes.description}>
                    <span>Showing</span>{" "}
                    {`${products?.data?.length} of ${products?.totalCount} ${
                      products?.totalCount > 1 ? "products" : "product"
                    }`}
                  </p>
                  {navbar ? (
                    <div className={classes.sortingDivImage}>
                      <img
                        onClick={handleOpenSort}
                        className={classes.icon}
                        src={Utils.images.SORT_ICON}
                      />
                      <div onClick={handleOpenFilter}>
                        {(payloadFilters?.otherFilters?.length !== 0 ||
                          payloadFilters?.customAttributes?.length !== 0) &&
                          apply && (
                            <Typography className={classes.redDotFixed}>
                              .
                            </Typography>
                          )}
                        <img
                          className={classes.icon}
                          src={Utils.images.MOBILE_FILTER}
                        />
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </>
        ) : (
          <div className={classes.sortingContainer3}>
            <div className={classes.sortContainer}>
              <div onClick={handleOpenSort}>
                <img src={Utils.images.SORT_ICON} />
                <Typography variant="h3">Sort</Typography>
              </div>
              <Divider orientation="vertical" />
              <div onClick={handleOpenFilter}>
                <img src={Utils.images.MOBILE_FILTER} />
                <div className={classes.filterTextContent}>
                  <Typography variant="h3">Filter</Typography>
                  {(payloadFilters?.otherFilters?.length !== 0 ||
                    payloadFilters?.customAttributes?.length !== 0) &&
                    apply && (
                      <Typography className={classes.redDot}>.</Typography>
                    )}
                </div>
              </div>
            </div>
            <Divider className={classes.divider} />
            {products?.data && products?.data?.length !== 0 && (
              <p className={classes.description}>
                <span>Showing</span>{" "}
                {`${products?.data?.length} of ${products?.totalCount} ${
                  products?.totalCount > 1 ? "products" : "product"
                }`}
              </p>
            )}
          </div>
        )}
      </>

      <Sorting
        keyword={keyword}
        setPage={setPage}
        setParams={setParams}
        obj={obj}
        categoryId={categoryId}
        payloadFilters={payloadFilters}
        open={open.sort}
        toggleDrawer={toggleDrawer}
        sortBy={sortBy}
        setSortBy={setSortBy}
        handleSort={handleChange}
        queryFilters={queryFilters}
      />
      <Filter
        // setDefaultFilters={setDefaultFilters}
        // defaultFilters={defaultFilters}
        setPage={setPage}
        setApply={setApply}
        keyword={keyword}
        categoryId={categoryId}
        sortBy={sortBy}
        open={open.filter}
        setParams={setParams}
        obj={obj}
        toggleDrawer={toggleDrawer}
        params={{ ...payloadFilters }}
        setPayloadFilters={setPayloadFilters}
        handleFilter={handleChange}
        queryFilters={queryFilters}
      />
    </>
  );
};

const Sorting = ({
  open,
  toggleDrawer,
  sortBy,
  setSortBy,
  handleSort,
  keyword,
  categoryId,
  payloadFilters,
  obj,
  setParams,
  setPage,
  queryFilters,
}: any) => {
  const classes = useStyles();
  const sortingData = Utils.constants.sortingData;
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
  };

  const handleApply = (e: any) => {
    handleSort();
    toggleDrawer('sort', false)(e);
    window.scrollTo(0, 0);
  };

  const clearAllSorting = (e: any) => {
    setSortBy('');
    setPage(1);

    const data = {
      ...obj,
      page: 1,
      categoryId: categoryId,
      query: keyword,
      sortBy: '',
      customAttributes: payloadFilters?.customAttributes,
      otherFilters: payloadFilters?.otherFilters,
    };
    const param = { ...obj, page: 1 };
    setParams(param);
    // dispatch({ type: "mobile-applied-filters", payload: data });
    window.scrollTo(0, 0);

    dispatch(showLoader());
    dispatch(
      getProductList(data, false, () => {
        dispatch(hideLoader());
      })
    );
  };

  return open ? (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer('sort', false)}
      className={classes.modal}
    >
      <div className={classes.filterModalHeading}>
        <Typography variant="body1" className={classes.heading}>
          Sort By
        </Typography>
        <Typography
          className={classes.close}
          variant="body1"
          color="primary"
          onClick={(e) => toggleDrawer('sort', false)(e)}
        >
          Close
        </Typography>
      </div>

      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={sortBy}
        onChange={handleChange}
        className={classes.sortByGroup}
      >
        {sortingData.map((item: any, index: any) => (
          <FormControlLabel
            key={index}
            className={classes.radioLabel}
            value={item.id}
            control={
              <GreenRadio
                className={classes.greenChecked}
                checked={item.id == sortBy}
              />
            }
            label={item.name}
          />
        ))}
      </RadioGroup>

      <div className={clsx(classes.filterModalButton, classes.border)}>
        <Button
          className={classes.leftButton}
          variant="outlined"
          color="primary"
          type="button"
          onClick={clearAllSorting}
        >
          Clear All
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="button"
          disabled={sortBy == '' ? true : false}
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </Drawer>
  ) : null;
};

const Filter = ({
  open,
  setApply,
  toggleDrawer,
  setPage,
  params,
  setPayloadFilters,
  handleFilter,
  obj,
  setParams,
  categoryId,
  sortBy,
  keyword,
  queryFilters,
}: any) => {
  const classes = useStyles();
  const { filters } = useSelector(
    (state: any) => state.productFilterReducer
  );
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setValue(filters?.otherFilters?.[0]?._id);
  }, [filters]);

  const onCheckboxChange = (e: any, type: string, filter: any, option: any) => {
    let appliedFilter = JSON.parse(JSON.stringify(params));
    let checked = e.target.checked ?? false;
    let filterExist = appliedFilter[type].find(
      (val: any) => val._id === filter._id
    );
    setApply(false);
    if (filterExist) {
      if (checked) {
        filterExist.options.push({
          _id: type === 'otherFilters' ? option._id : option.name,
        });
      } else {
        if (filterExist.options?.length > 1) {
          let index = filterExist.options.findIndex(
            (val: any) =>
              val._id === (type === 'otherFilters' ? option._id : option.name)
          );
          filterExist.options.splice(index, 1);
        } else {
          let index = appliedFilter[type].findIndex(
            (val: any) => val._id === filterExist._id
          );
          appliedFilter[type].splice(index, 1);
        }
      }
    } else {
      appliedFilter[type].push({
        ...filter,
        options: [{ _id: type === 'otherFilters' ? option._id : option.name }],
      });
    }
    const obj = JSON.parse(JSON.stringify(appliedFilter));
    setPayloadFilters({ ...obj });
    const data = { sortBy, page: 1 };
    setParams(data);
    setPage(1);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    value: any;
    index: any;
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue);
  };

  const handleApply = (e: any) => {
    handleFilter();
    toggleDrawer('filter', false)(e);
    setApply(true);
    window.scrollTo(0, 0);
  };

  function a11yProps(index: any) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        className={classes.boxContainer}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  const clearAllFilter = (e: any) => {
    const data = {
      ...obj,
      page: 1,
      categoryId: categoryId,
      query: keyword,
      sortBy,
      customAttributes: [],
      otherFilters: [],
    };
    setPage(1);

    const param = { ...obj, page: 1 };

    setParams(param);
    // setDefaultFilters({
    //   customAttributes: [],
    //   otherFilters: [],
    // });
    setPayloadFilters({
      customAttributes: [],
      otherFilters: [],
    });
    // dispatch({ type: "mobile-applied-filters", payload: data });

    setApply(false);
    dispatch(showLoader());
    window.scrollTo(0, 0);
    dispatch(
      getProductList(data, false, () => {
        dispatch(hideLoader());
        history.push({
          pathname: history.location.pathname,
          search: `?filters=${encodeURI(
            encodeURIComponent(JSON.stringify(data))
          )}`,
        });
      })
    );
  };

  const checkOptionLength = (value: any, label: string) => {
    const obj = params[label]?.find((item: any) => {
      if (item._id === (label === 'otherFilters' ? value._id : value._id))
        return item;
    });
    return obj?.options?.length
      ? `${value?.name}(${obj?.options?.length})`
      : value.name;
  };

  const checkIfChecked = (item: any, val: any, arr: any, type: string) => {
    let result = false;
    if (arr?.length > 0) {
      arr?.forEach((attr: any) => {
        if (attr._id == item?._id)
          result = attr.options?.some(
            (option: any) =>
              option._id === (type === 'otherFilters' ? val._id : val.name)
          );
      });
      return result;
    } else {
      return result;
    }
  };
  return open ? (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={(e) => {
        // const obj = JSON.parse(JSON.stringify(defaultFilters));
        toggleDrawer('filter', false)(e);
      }}
      className={classes.modal}
    >
      <div className={classes.filterModalHeading}>
        <Typography variant="body1" className={classes.heading}>
          Apply Filter
        </Typography>
        <Typography
          className={classes.close}
          variant="body1"
          color="primary"
          onClick={(e) => {
            // const obj = JSON.parse(JSON.stringify(defaultFilters));
            // setPayloadFilters({ ...obj });
            toggleDrawer('filter', false)(e);
          }}
        >
          Close
        </Typography>
      </div>
      <div className={classes.filterContainer}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {filters?.otherFilters?.length &&
            filters?.otherFilters?.map((value: any, i: any) => {
              if (value._id)
                return (
                  <Tab
                    key={value._id}
                    label={checkOptionLength(value, 'otherFilters')}
                    value={value._id}
                    {...a11yProps(value._id)}
                  />
                );
            })}
          {filters?.customAttributes?.length &&
            filters?.customAttributes?.map((value: any, i: any) => {
              if (value._id)
                return (
                  <Tab
                    key={value._id}
                    label={checkOptionLength(value, 'customAttributes')}
                    value={value._id}
                    {...a11yProps(value._id)}
                  />
                );
            })}
        </Tabs>
        {filters?.otherFilters?.length &&
          filters?.otherFilters?.map((item: any, i: any) => {
            if (item?._id)
              return (
                <TabPanel value={value} index={item._id} key={i}>
                  {item?.options?.map((val: any, key: any) => {
                    let priceVal =
                      item._id === 'price' ? val?.name?.split('-') : [];
                    const priceData =
                      priceVal.length === 2
                        ? `₹${priceVal[0] || 0} - ₹${priceVal[1] || 0}`
                        : priceVal.length === 1
                        ? priceVal[0]?.toLowerCase().includes('above')
                          ? priceVal[0]?.split(' ')[0] +
                            ` ₹${priceVal[0]?.split(' ')[1]}`
                          : `₹${priceVal[0] || 0}`
                        : null;

                    return (
                      <div className={classes.tabsDiv} key={val.name}>
                        <Typography
                          variant="body2"
                          className={classes.filterText}
                        >
                          {item._id === 'price' ? priceData : val.name}
                        </Typography>
                        <CustomCheckbox
                          defaultChecked={checkIfChecked(
                            item,
                            val,
                            params?.otherFilters,
                            'otherFilters'
                          )}
                          onChange={(e: any) =>
                            onCheckboxChange(e, 'otherFilters', item, val)
                          }
                        />
                      </div>
                    );
                  })}
                </TabPanel>
              );
          })}
        {filters?.customAttributes?.length &&
          filters?.customAttributes?.map((item: any, i: any) => {
            if (item?._id)
              return (
                <TabPanel value={value} index={item._id} key={i}>
                  {item?.options?.map((val: any, key: any) => (
                    <div className={classes.tabsDiv} key={val.name}>
                      <Typography
                        variant="body2"
                        className={classes.filterText}
                      >
                        {val.name}
                        {/* //val.name */}
                      </Typography>
                      <CustomCheckbox
                        defaultChecked={checkIfChecked(
                          item,
                          val,
                          params?.customAttributes,
                          'customAttributes'
                        )}
                        onChange={(e: any) =>
                          onCheckboxChange(e, 'customAttributes', item, val)
                        }
                      />
                    </div>
                  ))}
                </TabPanel>
              );
          })}
      </div>

      <div className={classes.filterModalButton}>
        <Button
          className={classes.leftButton}
          variant="outlined"
          color="primary"
          type="button"
          onClick={clearAllFilter}
        >
          Clear All
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="button"
          disabled={
            filters?.customAttributes?.length === 0 &&
            filters?.otherFilters?.length === 0
              ? true
              : false
          }
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </Drawer>
  ) : null;
};

export default MobileSortAndFilter;
