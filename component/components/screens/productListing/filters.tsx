// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Theme, Typography, Divider, Chip, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from './action';
import { ReducersModal } from '../../component/models';
import FilterContent from './filterContent';
import { getAuthToken } from '../../../utils/session';
// import Utils from "../../component/utils";
// import { hideLoader, showLoader } from "../../store/home/action";
import { useRouter } from 'next/router';
// import { getAuthToken } from "../../component/utils/session";
// import { useHistory } from "react-router-dom";
import _, { filter } from 'lodash';
import { isTypeNode } from 'typescript';
import { debug } from 'util';
import Utils from '../../../utils';

const useStyles = makeStyles((theme: Theme) => ({
  filterContainer: {
    // position: "relative",
    // marginTop: "16px",
    // '& p': {
    //   font: "normal 600 16px Work Sans",
    //   textTransform: "uppercase",
    // },
    // "& $h4": {
    //   paddingRight: "25px",
    // },
    padding: theme.spacing(0, 0.7),
  },
  filterBody: {
    margin: theme.spacing(0, 'auto'),
  },

  checkbox: {
    '& .Mui-checked': {
      color: 'var(--main-opacity)',
    },
    fontSize: '12px',
    textTransform: 'capitalize',
  },
  appliedFilterContainer: {
    border: '1px solid var(--border-color)',
    marginBottom: theme.spacing(1.5),
  },
  selectedFilter: {
    padding: theme.spacing(1),
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    '& .MuiTypography-body1': {
      fontWeight: 600,
    },
    '& .MuiTypography-body2': {
      fontWeight: 600,
      fontSize: 14,
      cursor: 'pointer',
      '& a': {
        textDecoration: 'none',
      },
    },
  },
  text: {
    font: 'normal 14px Work Sans SemiBold',
    letterSpacing: '1px',
    lineHeight: 1.5,
  },
}));

const chipStyles = makeStyles((theme: Theme) => ({
  chip: {
    margin: theme.spacing(0, 1, 1, 0),
    overflow: 'none',
    borderRadius: 2,
    backgroundColor: 'var(--white)',
    border: '1px solid var(--border-color)',
    '& .MuiChip-label': {
      font: 'normal 10px Work Sans',
      color: 'var(--secondary-black)',
      lineHeight: '12px',
      textTransform: 'capitalize',
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    '& .MuiChip-deleteIcon': {
      height: 14,
      width: 14,
    },
  },
}));

const StyledChip = (props: any) => {
  const classes = useStyles();
  return (
    <Chip
      deleteIcon={
        <span>
          <img src={Utils.images.FILTER_CROSS} alt="cross" />
        </span>
      }
      className={classes.chip}
      {...props}
    />
  );
};
interface Props {
  obj: any;
  setParams: Function;
}

const Filters: React.FC<any> = (props: Props) => {
  // const history = useHistory();
  // const filters = useSelector(
  //   (state: any) => state.productFilterReducer?.filters
  // );

  const { filters } = useSelector((state: any) => state.productFilterReducer);

  const [selectedFilters, setSelectedFilters] = useState<any>([]);
  const query = Utils.CommonFunctions.useQuery();
  let queryFilter = query?.get('filters') ?? '{}';
  const router = useRouter();
  const location = useRouter();

  const { menuData } = useSelector((state: any) => state.homeReducer);

  // const urlKey = history?.location.pathname.includes("/c/")
  //   ? history?.location.pathname.split("/c/")?.[0]?.split("/")?.pop()
  //   : history?.location.pathname.includes("/h/")
  //   ? history?.location.pathname.split("/h/")?.[0]?.split("/")?.pop()
  //   : "";
  const mainCat = location.asPath.split('/')?.[1];
  const category = menuData.find((item: any) => {
    // return item.id == (location?.state?.categoryId ? location?.state?.categoryId : localStorage.getItem("categoryId"))
    return item.url == mainCat;
  });

  const categoryId = category?.id;
  useEffect(() => {
    if (queryFilter) {
      let appliedFilter = JSON.parse(
        decodeURIComponent(decodeURIComponent(queryFilter))
      );
      let selectedFilter: any = [];

      filters?.otherFilters?.map((item: any) => {
        return appliedFilter?.otherFilters?.some((value: any) => {
          if (item._id === value._id) {
            item.options.map((a: any) => {
              if (value.options.some((b: any) => a._id === b._id))
                selectedFilter.push({
                  ...a,
                  type: 'otherFilters',
                  filter: { _id: value._id },
                });
            });
          }
        });
      });
      filters?.customAttributes?.map((item: any) => {
        return appliedFilter?.customAttributes?.some((value: any) => {
          item.options.map((a: any) => {
            if (value.options.some((b: any) => a.name == b._id))
              selectedFilter.push({
                ...a,
                type: 'customAttributes',
                filter: { _id: value._id },
              });
          });
        });
      });

      setSelectedFilters(selectedFilter);

      let newAppliedFilter = appliedFilter;
      let newPage =
        appliedFilter?.otherFilters?.length !== 0 ? 1 : appliedFilter?.page;
      newAppliedFilter = { ...appliedFilter, page: newPage };

      const data = {
        ...props.obj,
        ...newAppliedFilter,
        query: '',
        categoryId: categoryId,
      };

      props.setParams(data);
      // dispatch(getProductList(data, false, () => {
      //   dispatch(hideLoader())
      // }));
    }
  }, [props.obj.query]);

  const dispatch = useDispatch();

  const classes = useStyles();

  const clearAllFilter = () => {
    setSelectedFilters([]);
    router.push({
      pathname: '/[slug]/h/[googleKey]',
      query: {
        slug: `${router.query.slug}`,
        googleKey: `${router.query.googleKey}`,
        categoryId: `${router.query.categoryId}`
      },
    });

    // queryFilter = JSON.parse(decodeURIComponent(queryFilter));
    // delete queryFilter?.otherFilters;
    // delete queryFilter?.customAttributes;

    // const data = {
    //   ...props.obj,
    //   page: 1,
    //   authToken: getAuthToken(),
    //   query: '',
    //   categoryId: categoryId,
    // };

    // props.setParams(data);
    // // dispatch(showLoader());
    // delete data.selectedFilters;
    // dispatch(
    //   getProductList(data, false, () => {
    //     dispatch(hideLoader());
    //   })
    // );

    // if (_.isEmpty(queryFilter)) {
    //   console.log('line 222');
    //   router.push({
    //     pathname: '/[slug]/h/[googleKey]',
    //     query: {
    //       slug: `${router.query.slug}`,

    //       googleKey: `${router.query.googleKey}`,
    //     },
    //   });
    // } else {
    //   console.log('line 233');
    //   router.push({
    //     pathname: '/[slug]/h/[googleKey]?',
    //     query: {
    //       slug: `${router.query.slug}`,
    //       search: `?filters=${encodeURI(
    //         encodeURIComponent(JSON.stringify(data))
    //       )}`,
    //       googleKey: `${router.query.googleKey}`,
    //     },
    //   });
    
    // }
  };

  const onCheckboxChange = (e: any, type: string, filter: any, option: any) => {
    // dispatch(showLoader());
    let appliedFilter = JSON.parse(
      decodeURIComponent(decodeURIComponent(queryFilter))
    );
    let checked = e.target.checked ?? false;
    let filterExist = appliedFilter?.[type]?.find(
      (val: any) => val._id === filter._id
    );
    if (filterExist) {
      if (checked) {
        filterExist.options.push({
          _id: type === 'otherFilters' ? option._id : option.name,
        });
        setSelectedFilters((prev: any) => [
          ...prev,
          { ...option, type, filter },
        ]);
      } else {
        let selectedFilterIndex = selectedFilters.findIndex(
          (val: any) => val.name === option.name
        );
        selectedFilters.splice(selectedFilterIndex, 1);
        if (filterExist.options.length > 1) {
          let index = filterExist.options.findIndex(
            (val: any) =>
              val._id === (type === 'otherFilters' ? option._id : option.name)
          );
          filterExist.options.splice(index, 1);
        } else {
          let index = appliedFilter?.[type]?.findIndex(
            (val: any) => val._id === filterExist._id
          );
          appliedFilter?.[type]?.splice(index, 1);
        }
      }
    } else {
      if (!_.has(appliedFilter, type)) {
        appliedFilter[type] = [];
      }

      appliedFilter[type].push({
        ...filter,
        options: [{ _id: type === 'otherFilters' ? option._id : option.name }],
      });

      setSelectedFilters((prev: any) => [...prev, { ...option, type, filter }]);
    }

    if (!appliedFilter?.otherFilters?.length) {
      delete appliedFilter?.otherFilters;
    }

    if (!appliedFilter?.customAttributes?.length) {
      delete appliedFilter?.customAttributes;
    }
    const data = {
      ...props.obj,
      ...appliedFilter,
      page: 1,
      query: '',
      categoryId: categoryId,
    };


    if (!_.isEmpty(appliedFilter)) {
      router.push({
        pathname: '/[slug]/h/[googleKey]',
        query: {
          slug: `${router.query.slug}`,
          googleKey: `${router.query.googleKey}`,
          search: `${encodeURI(encodeURIComponent(JSON.stringify(data)))}`,
          categoryId: `${router.query.categoryId}`
          // search: data,
        },
      });
    } else {
      router.push({
        pathname: `/[slug]/h/[googleKey]`,
        query: {
          slug: `${router.query.slug}`,
          googleKey: `${router.query.googleKey}`,
          search: `${encodeURI(encodeURIComponent(JSON.stringify(data)))}`,
          categoryId: `${router.query.categoryId}`

        },
      });
    }

    props.setParams(data);

    delete data.selectedFilters;
    // dispatch(getProductList(data));
  };

  return (
    <div className={classes.filterContainer}>
      <div className={classes.filterContainer}>
        {selectedFilters.length ? (
          <div className={classes.appliedFilterContainer}>
            <div className={classes.titleContainer}>
              <Typography variant="body1" className={classes.text}>
                FILTERS APPLIED
              </Typography>
              <Typography align="right" variant="body2" color="primary">
                <Link onClick={() => clearAllFilter()}>Clear All</Link>
              </Typography>
            </div>
            <Divider />
            <div className={classes.selectedFilter}>
              {selectedFilters.map((val: any, i: any) => (
                <StyledChip
                  key={i}
                  variant="outlined"
                  label={val.name}
                  onDelete={(e: any) =>
                    onCheckboxChange(e, val.type, val.filter, val)
                  }
                />
              ))}
            </div>
          </div>
        ) : filters ? (
          <Divider style={{ marginBottom: 20 }} />
        ) : null}
        {filters?.otherFilters &&
          filters?.otherFilters?.map((value: any, i: any) => {
            // let check = false
            // if (value.type && params[value.type]?.length > 0 && value.type !== "customAttributes") {
            //   check = true

            // } else {
            //  const result= params[value.type].filter((item: any) =>
            //     value._id === item._id && item.options.length > 0
            //   )
            //   check=result.length>0

            // }
            return (
              <div
                className={classes.filterBody}
                // key={value._id + value.name}
                key={i}
              >
                <FilterContent
                  onCheckboxChange={onCheckboxChange}
                  filter={value}
                  obj={props.obj}
                  openToggle={
                    i === 0 && !Utils.CommonFunctions.mobileCheck()
                      ? false
                      : true
                  }
                  type="otherFilters"
                  appliedFilter={selectedFilters}
                />
              </div>
            );
          })}
        {filters?.customAttributes &&
          filters?.customAttributes?.map((value: any, i: any) => {
            // let check = false
            // if (value.type && params[value.type]?.length > 0 && value.type !== "customAttributes") {
            //   check = true

            // } else {
            //  const result= params[value.type].filter((item: any) =>
            //     value._id === item._id && item.options.length > 0
            //   )
            //   check=result.length>0

            // }
            return (
              <div key={i}>
                {value.name && (
                  <div
                    className={classes.filterBody}
                    // key={value._id + value.name}
                  >
                    <FilterContent
                      onCheckboxChange={onCheckboxChange}
                      filter={value}
                      obj={props.obj}
                      // index={i}
                      type="customAttributes"
                      // appliedFilter={params}
                      appliedFilter={selectedFilters}
                    />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Filters;
