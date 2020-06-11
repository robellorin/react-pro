import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid
} from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import DisplayItem from './DisplayItem';

const months = [
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
const currencies = {
  USD: '$',
  EUR: '€',
  GBP: '£'
};
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
    justifyContent: 'space-between',
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

function Overview({
  className, monthData, month, currency = 'EUR', ...rest
}) {
  const classes = useStyles();

  if (!monthData.pl) return null;
  const data = {
    pl: month > -1 ? monthData.pl[month] : 0,
    rollover: month > -1 ? monthData.rollover[month] : 0,
    roi: month > -1 ? monthData.roi[month] : 0
  };
  const stateList = [
    {
      title: 'Period',
      value: `Month / ${months[month]}`,
      icon: TodayIcon,
      backgroundColor: 'rgba(111, 136, 157, 0.2)',
      color: '#6f889d'
    },
    {
      title: 'Profit/Loss',
      value: `${data.pl} ${currencies[currency]}`,
      symbol: currencies[currency],
      subIcon: CallMadeIcon,
      backgroundColor: 'rgba(55, 197, 102, 0.2)',
      color: '#37c566'
    },
    {
      title: 'Rollover',
      value: `${data.rollover} ${currencies[currency]}`,
      icon: AutorenewIcon,
      subIcon: CallReceivedIcon,
      subIconColor: '#ff724f',
      backgroundColor: 'rgba(59, 156, 236, 0.2)',
      color: '#3b9cec'
    },
    {
      title: 'ROI',
      value: `${data.roi} %`,
      symbol: '%',
      backgroundColor: 'rgba(91, 51, 212, 0.2)',
      color: '#5b33d4'
    }
  ];

  return (
    <Grid
      container
      spacing={3}
      className={classes.grid}
    >
      {
        stateList.map((item, index) => (
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
            key={index}
          >
            <DisplayItem data={item} />
          </Grid>
        ))
      }
    </Grid>
  );
}

Overview.propTypes = {
  className: PropTypes.string
};

export default Overview;
