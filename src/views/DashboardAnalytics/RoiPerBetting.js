import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Avatar } from '@material-ui/core';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
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
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    height: 48,
    width: 48
  }
}));

function RoiPerBetting({ className, roi, ...rest }) {
  const classes = useStyles();

  return (
    <Card
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
        className={classes.avatar}
        color="inherit"
      >
        <GolfCourseIcon />
      </Avatar>
    </Card>
  );
}

RoiPerBetting.propTypes = {
  className: PropTypes.string
};

export default RoiPerBetting;
