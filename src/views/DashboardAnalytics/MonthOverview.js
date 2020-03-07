import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card, Typography, Grid, Avatar
} from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import gradients from 'src/utils/gradients';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0
  },
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    height: 48,
    width: 48
  }
}));

function Overview({ className, monthData, month, ...rest }) {
  const classes = useStyles();
  if (!monthData.pl) return null;
  const data = {
    pl: month > -1 ? monthData.pl[month] : 0,
    rollover: month > -1 ? monthData.rollover[month] : 0,
    roi: month > -1 ? monthData.roi[month] : 0
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
      >
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <div>
            <Typography
              component="h2"
              gutterBottom
              variant="overline"
            >
              Current Month
            </Typography>
            <Typography variant="h3">
              {months[month]}
            </Typography>
          </div>
          <Avatar variant="rounded" className={classes.avatar} style={{ backgroundImage: gradients.orange }}>
            <TodayIcon />
          </Avatar>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <div>
            <Typography
              component="h2"
              gutterBottom
              variant="overline"
            >
              Profit/Loss
            </Typography>
            <Typography variant="h3">
              {`${data.pl} €`}
            </Typography>
          </div>
          <Avatar variant="rounded" className={classes.avatar} style={{ backgroundImage: gradients.green }}>
            <EuroSymbolIcon />
          </Avatar>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <div>
            <Typography
              component="h2"
              gutterBottom
              variant="overline"
            >
              Rollover
            </Typography>
            <Typography variant="h3">{`${data.rollover} €`}</Typography>
          </div>
          <Avatar variant="rounded" className={classes.avatar} style={{ backgroundImage: gradients.red }}>
            <EuroSymbolIcon />
          </Avatar>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <div>
            <Typography
              component="h2"
              gutterBottom
              variant="overline"
            >
              ROI
            </Typography>
            <Typography variant="h3">{data.roi}%</Typography>
          </div>
          <Avatar variant="rounded" className={classes.avatar} style={{ backgroundImage: gradients.indigo }}>
            <GolfCourseIcon />
          </Avatar>
        </Grid>
      </Grid>
    </Card>
  );
}

Overview.propTypes = {
  className: PropTypes.string
};

export default Overview;
