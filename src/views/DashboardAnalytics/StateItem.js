import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid, Typography, Avatar
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    height: 48,
    width: 48
  }
}));

function StateItem({ className, data, ...rest }) {
  const classes = useStyles();
  const style = {
    backgroundImage: data.color
  }  
  return (
    <Grid
      container
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
        >
          {data.title}
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">
            {`${data.value} €`}
          </Typography>
        </div>
      </div>
      <Avatar variant="rounded" className={classes.avatar} style={style}>
        { <data.icon /> }
      </Avatar>
    </Grid>
  );
}

StateItem.propTypes = {
  className: PropTypes.string
};

export default StateItem;
