import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, Divider } from '@material-ui/core';
import Chart from './Chart';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  },
  chart: {
    padding: theme.spacing(4, 2, 0, 2),
    height: 500
  }
}));

function FinancialStats({ className, betData, ...rest }) {
  const classes = useStyles();
  const { bets } = betData;
  let data = {
    pl: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    rollover: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    roi: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  };
  if (bets) {
    for (const bet of bets) {
      const date = new Date(bet.betTime);
      const month = date.getMonth();
      if (!bet.checked) continue;
      if (!bet.placedOdds || !bet.placedStake) continue;
      let profit = 0;
      const { won, totalReturns, placedStake } = bet;
      if (won === 0 || totalReturns === null) continue;
      else if (won === 1) {
        profit =  Math.round((totalReturns - placedStake) * 100) / 100;
      } else if (won === -1) {
        profit =  Math.round(-placedStake * 100) / 100;
      } else if (won === 2) {
        profit =  Math.round((totalReturns - 2 * placedStake) * 100) / 100;
      } else if (won === -2) {
        profit =  Math.round(-placedStake * 2 * 100) / 100;
      } else if (won === 3) {
        profit =  Math.round((totalReturns - 2 * placedStake) * 100) / 100;
      }
      data.pl[month] += profit;
      data.rollover[month] += placedStake;
    }
  }
  data.pl = data.pl.map(item => Math.round(item * 100) / 100);
  data.roi = data.pl.map((item, index) => {
    const rollover = data.rollover[index];
    if (rollover !== 0) return (item / rollover * 100).toFixed(2);
    else return 0;
  })
  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Profit/Loss Stats"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Chart
              className={classes.chart}
              data={data}
              labels={labels}
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
}

FinancialStats.propTypes = {
  className: PropTypes.string
};

export default FinancialStats;
