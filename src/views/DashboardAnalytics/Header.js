import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  calendar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  calendarButton: {
    backgroundColor: theme.palette.common.white
  },
  calendarTodayIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header({ className, ...rest }) {
  const classes = useStyles();
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        container
        justify="space-between"
        spacing={3}
      >
        <Grid
          item
          lg={6}
          xs={12}
        >
          <Typography
            component="h1"
            gutterBottom
            variant="h3"
          >
            Analytics Overview
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

Header.defaultProps = {};

export default Header;
