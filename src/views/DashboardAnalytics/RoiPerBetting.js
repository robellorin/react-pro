import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Avatar } from '@material-ui/core';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import gradients from 'src/utils/gradients';

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
  avatar: {
    backgroundImage: gradients.indigo,
    height: 48,
    width: 48
  }
}));

function RoiPerBetting({ className, roi, ...rest }) {
  const classes = useStyles();

  return (
    <Grid
      container
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div>
        <Typography
          color="inherit"
          component="h3"
          gutterBottom
          variant="overline"
        >
          Roi
        </Typography>
        <div className={classes.details}>
          <Typography
            color="inherit"
            variant="h3"
          >
            {`${roi} %`}
          </Typography>
        </div>
      </div>
      <Avatar
        variant="rounded"
        className={classes.avatar}
        color="inherit"
      >
        <GolfCourseIcon />
      </Avatar>
    </Grid>
  );
}

RoiPerBetting.propTypes = {
  className: PropTypes.string
};

export default RoiPerBetting;
