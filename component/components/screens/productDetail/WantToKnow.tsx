import images from '../../../utils/images';
import { makeStyles } from '@mui/styles';
import { Theme, Typography, Divider } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Recoleta Alt`,
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: 'var(--secondary-black)',
  },
  linksContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(2, 0),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  img: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0, 0, 0),
    },
  },
  divider: {
    margin: theme.spacing(3, 0, 3, 0),
  },
}));

const links = [
  {
    id: 1,
    img: `${images.WANT_TO_KNOW1}`,
  },
  {
    id: 2,
    img: `${images.WANT_TO_KNOW2}`,
  },
  {
    id: 3,
    img: `${images.WANT_TO_KNOW3}`,
  },
  {
    id: 4,
    img: `${images.WANT_TO_KNOW3}`,
  },
];

const WantToKnow = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.heading}>Want To Know More</Typography>
      <div className={classes.linksContainer}>
        {links.map((items) => (
          <img
            src={items.img}
            alt="want to know more"
            key={items.id}
            className={classes.img}
          />
        ))}
      </div>
      <Divider light className={classes.divider} />
    </div>
  );
};

export default WantToKnow;
