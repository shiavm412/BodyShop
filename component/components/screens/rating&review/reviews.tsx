import { Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Utils from '../../../utils';
// import { RATING1, RATING10, RATING2, RATING3, RATING4, RATING5, RATING6, RATING7, RATING8, RATING9 } from "utils/constantImages";

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    fontSize: '14px',
    lineHeight: '16px',
    color: 'var(--light-gray)',
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down('xs')]: {
      font: 'normal 14px Work Sans Medium',
      color: '#666666',
    },
  },
  ratingDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    // margin: theme.spacing(1.6, 0),
    alignItems: 'center',
  },
  innerDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  selectedImg: {
    fontWeight: 700,
    color: 'var(--black)',
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down('xs')]: {
      font: 'normal 14px Work Sans SemiBold',
    },
  },
  cursor: {
    cursor: 'pointer',
  },
}));

const ratingData = [
  {
    img: `${Utils.images.RATING1}`,
    secondImg: `${Utils.images.RATING6}`,
    key: 1,
    label: 'Bad',
  },
  {
    img: `${Utils.images.RATING2}`,
    secondImg: `${Utils.images.RATING7}`,
    key: 2,
    label: 'Fair',
  },
  {
    img: `${Utils.images.RATING3}`,
    secondImg: `${Utils.images.RATING8}`,
    key: 3,
    label: 'Average',
  },
  {
    img: `${Utils.images.RATING4}`,
    secondImg: `${Utils.images.RATING9}`,
    key: 4,
    label: 'Good',
  },
  {
    img: `${Utils.images.RATING5}`,
    secondImg: `${Utils.images.RATING10}`,
    key: 5,
    label: 'Excellent',
  },
];

function Review(props: any) {
  const classes = useStyles();
  //@ts-ignore
  const [rating, setRating] = useState(ratingData);
  const [defaultRating, setDefaultRating] = useState<null | number>(null);

  const updateRating = (key: number) => {
    // const update = rating.map((item) => {
    //   if (item.key === 1) {
    //     item.img = `${Utils.images.RATING1}`;
    //   }
    //   if (item.key === 2) {
    //     item.img = `${Utils.images.RATING2}`;
    //   }
    //   if (item.key === 3) {
    //     item.img = `${Utils.images.RATING3}`;
    //   }
    //   if (item.key === 4) {
    //     item.img = `${Utils.images.RATING4}`;
    //   }
    //   if (item.key === 5) {
    //     item.img = `${Utils.images.RATING5}`;
    //   }
    //   if (key <= item.key) {
    //     switch (item.key) {
    //       case 1:
    //         item.img = `${Utils.images.RATING6}`;
    //         break;
    //       case 2:
    //         item.img = `${Utils.images.RATING7}`;
    //         break;
    //       case 3:
    //         item.img = `${Utils.images.RATING8}`;
    //         break;
    //       case 4:
    //         item.img = `${Utils.images.RATING9}`;
    //         break;
    //       case 5:
    //         item.img = `${Utils.images.RATING10}`;
    //         break;
    //     }
    //     setDefaultRating(item.key);
    //   }
    //   return item;
    // });
    // setRating(update);
    setDefaultRating(key);
    props.setRating(key);
  };
  const selectedImage = ratingData.filter(
    (item: any) => item.key === defaultRating
  );

  return (
    <div className={classes.ratingDiv}>
      {rating.map((item) => {
        return (
          <div
            className={classes.innerDiv}
            onClick={() => {
              updateRating(item.key);
            }}
            key={item.key}

            // onChange={(event: any, newValue: any) => {
            //   setNewValue(newValue);
            //   if(props.setRating)
            //   props.setRating(newValue)s

            // }}
          >
            {defaultRating && defaultRating >= item.key ? (
              <img
                className={classes.cursor}
                src={selectedImage[0].secondImg}
                alt="icon"
              />
            ) : (
              <img className={classes.cursor} src={item.img} alt="icon" />
            )}
            {defaultRating === item.key ? (
              <Typography className={classes.selectedImg}>
                {item.label}
              </Typography>
            ) : (
              <Typography className={classes.text}>{item.label}</Typography>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Review;
