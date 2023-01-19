import { CircularProgress, Backdrop, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { ReducersModal } from '../../models';

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: '#fff',
  },
}));

export default function Loader(props: any) {
  const classes = useStyles();

  const { isLoading, paytmLoader } = useSelector((state: ReducersModal) => {
    return state.loadingReducer;
  });

  return (
    <>
      <Backdrop className={classes.backdrop} open={paytmLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Backdrop className={classes.backdrop} open={isLoading || props.show}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
