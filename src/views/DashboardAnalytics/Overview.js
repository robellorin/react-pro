import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid, Card, Typography } from '@material-ui/core';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import StateItem from './StateItem';
import RoiPerBetting from './RoiPerBetting';
import gradients from 'src/utils/gradients';

const useStyles = makeStyles((theme) => ({
  root: {},
  grid: {
    // marginTop: theme.spacing(2)
  },
  item: {
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
  }
}));

function Overview({ data }) {
  const { userProfit } = data;
  let pl = userProfit && userProfit.pl ? userProfit.pl : 0;
  let rollover = userProfit && userProfit.rollover ? userProfit.rollover : 0;
  const roi = rollover === 0 ? 0 : Math.round(pl / rollover * 10000) / 100;
  const stateList = [
    {
      title: 'PROFITS/LOSS',
      value: pl,
      icon: EuroSymbolIcon,
      color: gradients.green
    },
    {
      title: 'ROLLOVER',
      value: rollover,
      currency: '€',
      icon: EuroSymbolIcon,
      color: gradients.red
    }
  ];
  const classes = useStyles();

  return (
    <Card>
      <Grid
        container
        // spacing={3}
        className={classes.grid}
      >
        <Grid
          item
          className={classes.item}
          md={3}
          sm={3}
          xs={12}
        >
          <div>
            <Typography
            component="h2"
            gutterBottom
            variant="overline"
            >
              Period
            </Typography>
            <Typography variant="h3">
              {`Year / ${new Date().getFullYear()}`}
            </Typography>
          </div>
        </Grid>
        {
          stateList.map((item, index) => (
            <Grid
              className={classes.item}
              key={index}
              item
              md={3}
              sm={3}
              xs={12}
            >
              <StateItem data={item} />
            </Grid>
          ))
        }
        <Grid
          item
          md={3}
          sm={3}
          xs={12}
        >
          <RoiPerBetting roi={roi} />
        </Grid>
      </Grid>
    </Card>
  );
}

Overview.propTypes = {
  className: PropTypes.string
};

export default Overview;
