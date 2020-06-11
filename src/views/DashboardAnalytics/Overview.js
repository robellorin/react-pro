import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';

import DisplayItem from './DisplayItem';

const currencies = {
  USD: '$',
  EUR: '€',
  GBP: '£'
};

const useStyles = makeStyles((theme) => ({
  root: {},
  grid: {
    // marginTop: theme.spacing(2)
  },
}));

function Overview({ data, currency = 'EUR' }) {
  const { userProfit } = data;
  const profitData = userProfit ? userProfit[0] : {};
  const pl = profitData && profitData.pl ? profitData.pl : 0;
  const rollover = profitData && profitData.rollover ? profitData.rollover : 0;
  const roi = rollover === 0 ? 0 : Math.round((pl / rollover) * 10000) / 100;
  const stateList = [
    {
      title: 'Period',
      value: `Year / ${new Date().getFullYear()}`,
      icon: TodayIcon,
      backgroundColor: 'rgba(111, 136, 157, 0.2)',
      color: '#6f889d'
    },
    {
      title: 'Profit/Loss',
      value: `${Math.round(pl * 100) / 100} ${currencies[currency]}`,
      symbol: currencies[currency],
      subIcon: CallMadeIcon,
      backgroundColor: 'rgba(55, 197, 102, 0.2)',
      color: '#37c566'
    },
    {
      title: 'Rollover',
      value: `${Math.round(rollover * 100) / 100} ${currencies[currency]}`,
      icon: AutorenewIcon,
      subIcon: CallReceivedIcon,
      subIconColor: '#ff724f',
      backgroundColor: 'rgba(59, 156, 236, 0.2)',
      color: '#3b9cec'
    },
    {
      title: 'ROI',
      value: `${roi} %`,
      symbol: '%',
      backgroundColor: 'rgba(91, 51, 212, 0.2)',
      color: '#5b33d4'
    }
  ];
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.grid}>
      {stateList.map((item, index) => (
        <Grid item lg={3} sm={6} xs={12} key={index}>
          <DisplayItem data={item} />
        </Grid>
      ))}
    </Grid>
  );
}

Overview.propTypes = {
  className: PropTypes.string
};

export default Overview;
