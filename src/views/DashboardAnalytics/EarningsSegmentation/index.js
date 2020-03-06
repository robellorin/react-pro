import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  colors
} from '@material-ui/core';
import Chart from './Chart';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  chartContainer: {
    padding: theme.spacing(3)
  },
  chart: {
    height: 381
  },
  statsContainer: {
    display: 'flex'
  },
  statsItem: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3, 2),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }
}));

function EarningsSegmentation({ className, data, ...rest }) {
  const classes = useStyles();
  const { profits } = data;
  let pendingBets = 0;
  let wonBets = 0;
  let lostBets = 0;
  if (profits) {
    for(const profit of profits) {
      pendingBets += profit.pendingBets;
      wonBets += profit.wonBets;
      lostBets += profit.lostBets;
    }
  }
  const earnings = [
    {id: "2", label: "Won Bets", value: wonBets, color: colors.indigo[500]},
    {id: "1", label: "Pending Bets", value: pendingBets, color: colors.indigo[300]},
    {id: "3", label: "Lost Bets", value: lostBets, color: colors.indigo[100]}
  ]  

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Bettings Segmentation"
      />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.chartContainer}>
          <Chart
            className={classes.chart}
            data={earnings}
          />
        </div>
        <Divider />
        <div className={classes.statsContainer}>
          {earnings.map(earning => (
            <div
              className={classes.statsItem}
              key={earning.id}
            >
              <Typography
                align="center"
                component="h6"
                gutterBottom
                variant="overline"
              >
                {earning.label}
              </Typography>
              <Typography
                align="center"
                variant="h4"
              >
                {earning.value}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

EarningsSegmentation.propTypes = {
  className: PropTypes.string
};

export default EarningsSegmentation;
