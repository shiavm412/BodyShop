import { Theme, Typography, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import _ from 'lodash';
import { makeStyles } from '@mui/styles';
import CustomCheckbox from '../../../common/customCheckbox';
import Utils from '../../../utils';

const useStyles = makeStyles((theme: Theme) => ({
  filterHeader: {
    paddingBottom: '5px',
  },
  categoryHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    '& .MuiTypography-body1': {
      fontSize: '14px',
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    '& .MuiTypography-body2': {
      font: 'normal 500 12 Work Sans',
      color: 'var(--light-gray)',
    },
    cursor: 'pointer',
    letterSpacing: '1px',
    '& $h4': {
      paddingRight: '25px',
    },
  },
  categoryListing: {
    fontWeight: 100,
    color: 'var(--secondary-black)',
    margin: theme.spacing(0, 'auto'),
    fontSize: '12px',
  },
  checkbox: {
    fontSize: '12px',
    '& .MuiFormControlLabel-label': {
      textTransform: 'capitalize',
    },
    '& .MuiCheckbox-root': {
      padding: theme.spacing(1),
    },
  },

  collapseIcon: {
    width: '20px',
    height: '20px',
    // padding: "8px",
    position: 'absolute',
    top: '0',
    right: '0',
    cursor: 'pointer',
    border: '1.5px solid var(--black300)',
    borderRadius: '4px',
    '&::before': {
      content: "''",
      position: 'absolute',
      top: 'calc(50% - 5px)',
      left: 'calc(50% - 1px)',
      width: '2px',
      height: '10px',
      opacity: '0',
      transition: 'opacity 0.2s ease-out',
      background: 'var(--black300)',
    },

    '&::after': {
      content: "''",
      height: '2px',
      width: '10px',
      position: 'absolute',
      top: 'calc(50% - 1px)',
      left: 'calc(50% - 5px)',
      background: 'var(--black300)',
    },
    '&.active': {
      '&::before': {
        opacity: '1',
      },
    },
  },

  accordionBody: {
    // maxHeight: "300px",
    transition: 'all .3s ease',
    // paddingTop: "10px",
    '&.hide': {
      maxHeight: '0px',
      overflow: 'hidden',
    },
  },
  text: {
    font: 'normal 15px Work Sans',
  },
}));

interface Props {
  onCheckboxChange: Function;
  type: 'otherFilters' | 'customAttributes';
  filter: any;
  obj: any;
  appliedFilter: any;
  openToggle?: any;
}

const FilterContent = (props: Props) => {
  const {
    onCheckboxChange,
    filter,
    openToggle = true,
    obj,
    type,
    appliedFilter,
  } = props;
  const onChange = (e: any, val: any) => {
    // let option = type === "otherFilters" ? val._id : val.name

    // onCheckboxChange(e, filter.type === 'customAttributes' ? val : val._id, filter)
    onCheckboxChange(e, type, { _id: filter._id }, val);
  };

  // let defToggleVal = true;
  // if (type === "otherFilters" && index == 0) {
  //   defToggleVal = false;
  // }

  const [isToggle, toggleHandler] = useState(openToggle);
  // const [isToggle, toggleHandler] = useState(true);
  const classes = useStyles();
  let applied = appliedFilter?.filter(
    (val: any) => val?.filter?._id === filter._id
  )?.length;

  return (
    <>
      {filter?.options.length ? (
        <div className={classes.filterHeader} key={filter._id}>
          <div
            className={classes.categoryHeading}
            onClick={() => toggleHandler(!isToggle)}
          >
            <div>
              <Typography variant="body1">
                {filter.name}
                {/* <span className={`${classes.collapseIcon} ${isToggle && "active"} `}></span> */}
              </Typography>
              {applied ? (
                <Typography variant="body2">{`${applied} applied`}</Typography>
              ) : null}
            </div>
            {isToggle ? (
              <span>
                <img src={Utils.images.ADD_SQAURE} alt="square" />
              </span>
            ) : (
              <span>
                <img src={Utils.images.MINUS_SQAURE} alt="minus" />
              </span>
            )}
          </div>
          <div className={`${classes.accordionBody} ${isToggle && 'hide'}`}>
            {filter?.options.map((val: any, i: any) => {
              let checked = appliedFilter?.findIndex(
                (item: any) => item._id === val._id && item.name === val.name
              );
              let priceVal =
                filter._id === 'price' ? val?.name?.split('-') : [];
              const priceData =
                priceVal.length === 2
                  ? `₹ ${priceVal[0] || 0} - ₹ ${priceVal[1] || 0}`
                  : priceVal.length === 1
                  ? priceVal[0]?.toLowerCase().includes('above')
                    ? priceVal[0]?.split(' ')[0] +
                      ` ₹ ${priceVal[0]?.split(' ')[1]}`
                    : `₹${priceVal[0] || 0}`
                  : null;

              return (
                <Typography
                  className={classes.categoryListing}
                  variant="body1"
                  key={i}
                >
                  <FormControlLabel
                    control={
                      <CustomCheckbox
                        onChange={(e: any) => onChange(e, val)}
                        checked={checked > -1}
                        key={`${type === 'otherFilters' ? val._id : val.name}_${
                          obj.categoryId
                        }_${obj.query}`}
                      />

                      // <Checkbox
                      //   color="primary"
                      //   icon={<img src={Utils.images.CHECKBOX_BORDER} />}
                      //   checkedIcon={<img src={Utils.images.CHECKBOX_TICK_BORDER} />}
                      // />
                    }
                    label={
                      <Typography className={classes.text}>
                        {priceData || val.name}
                      </Typography>
                    }
                    className={classes.checkbox}
                  />
                </Typography>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FilterContent;
