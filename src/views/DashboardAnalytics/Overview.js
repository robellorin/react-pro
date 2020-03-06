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
    marginTop: theme.spacing(2)
  }
}));

function Overview({ data }) {
  const { profits } = data;
  let pl = 0;
  let rollover = 0;
  if (profits) {
    for(const profit of profits) {
      pl += profit.pl;
      rollover += profit.rollover;
    }
  }
  const roi = rollover === 0 ? 0 : (pl / rollover * 100).toFixed(2);
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
