import { useState } from 'react';
import {
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& .MuiPaper-elevation1': {
      boxShadow: 'none',
    },
    '& .MuiAccordionSummary-root': {
      padding: '0px',
    },
    '& .MuiAccordionDetails-root': {
      padding: '0px',
    },
    '& .MuiPaper-root': {
      backgroundColor: 'transparent',
    },
  },
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
  details: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )} Work Sans`,
    lineHeight: '22px',
    letterSpacing: '0.33px',
    color: 'rgba(102, 102, 102, 0.99)',
  },
  divider: {
    margin: theme.spacing(3, 0, 1.5, 0),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1, 0, 1, 0),
    },
  },
}));

export default function CustomAccordion(props: any) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(props.openByDefault ?? false);

  // const [expanded, setExpanded] = useState(false);

  const handleChange = (panel: any) => (_event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel === props.id : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded} onChange={handleChange(props.id)}>
        <AccordionSummary
          expandIcon={
            expanded ? (
              <RemoveIcon color="primary" />
            ) : (
              <AddIcon color="primary" />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{props.heading}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div>{props.details}</div>
        </AccordionDetails>
      </Accordion>
      <Divider light className={classes.divider} />
    </div>
  );
}
