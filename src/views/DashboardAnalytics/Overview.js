import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import StateItem from './StateItem';
import RoiPerBetting from './RoiPerBetting';
import gradients from 'src/utils/gradients';

const useStyles = makeStyles((theme) => ({
  root: {},
  grid: {
    // marginTop: theme.spacing(2)
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
    <div>
      <Grid
          container
          spacing={3}
          className={classes.grid}
        >
        {
          stateList.map((item, index) => (
            <Grid
              key={index}
              item
              md={4}
              sm={4}
              xs={12}
            >
              <StateItem data={item} />
            </Grid>
          ))
        }
        <Grid
          item
          md={4}
          sm={4}
          xs={12}
        >
          <RoiPerBetting roi={roi} />
        </Grid>
      </Grid>
    </div>
  );
}

Overview.propTypes = {
  className: PropTypes.string
};

export default Overview;
