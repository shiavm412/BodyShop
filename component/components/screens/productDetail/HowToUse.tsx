import { useEffect, useRef, useState } from "react";
import {  Typography, Divider, Grid } from "@mui/material";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )} Recoleta Alt`,
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: 'var(--secondary-black)',
    [theme.breakpoints.down('xs')]: {
      font: `normal ${theme.spacing(1.6)} Recoleta Alt Bold`,
    },
  },
  videoPlayer: {
    // overflow: "hidden !important",
    // backgroundColor: "black"
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  divider: {
    margin: theme.spacing(3, 0, 3, 0),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1.5, 0, 0.5, 0),
    },
  },
  content: {
    paddingLeft: '20px',
    color: '#666666',
    marginTop: '10px',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '20px',
      '& .MuiTypography-body1': {
        font: `normal ${theme.spacing(1.4)} Work Sans Regular`,
        lineHeight: '1.5',
      },
    },
  },
  video: {
    marginTop: theme.spacing(1),
    height: '315px',
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 0, 0, 0),
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },
  },
  // videoContainer:{
  //   width:"100%",
  //   height:"315px"
  // }
}));

const HowToUse = (props: any) => {
  const classes = useStyles();
  const vidRef: any = useRef();
  const [video, setVideo] = useState('');
  useEffect(() => {
    if (video == '') {
      setVideo(props?.video_url);
    }
    setTimeout(() => {
      vidRef?.current?.play && vidRef?.current?.play();
    }, 3000);
    return () => {
      vidRef && vidRef?.current?.pause();
    };
  }, [props?.video_url]);

  return (
    <div>
      <Typography className={classes.heading}>How to Use</Typography>
      <Grid container>
        {props?.video_url ? (
          <Grid item md={12} className={classes.video}>
            {/* <Player
              src={props?.video_url}
              fluid={false}
              width={240}
              height={315}
              preload="metadata"
              autoPlay={true}
              playsInline={true}
              // poster={images.VIDEO_BANNER}
              className={classes.videoPlayer}
            >
            </Player> */}
            <video
              src={video}
              width="100%"
              height={'100%'}
              loop
              autoPlay
              ref={vidRef}
              // poster={images.VIDEO_BANNER}
              className={classes.videoPlayer}
            ></video>
          </Grid>
        ) : null}
        {props?.video_url ? (
          <Grid item md={12} className={classes.content}>
            {props.textDescription}
          </Grid>
        ) : (
          <Grid item md={12} className={classes.content}>
            {props.textDescription}
          </Grid>
        )}
      </Grid>

      {/* <Grid container>
        <Grid item md={12} className={classes.content}>
          {props.textDescription}
        </Grid>
      </Grid> */}

      <Divider light className={classes.divider} />
    </div>
  );
};

export default HowToUse;
