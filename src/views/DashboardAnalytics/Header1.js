import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Button, ButtonGroup } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import CalendarTodayIcon from '@material-ui/icons/CalendarTodayOutlined';

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
  const year = new Date().getFullYear();
  const [startDate, setStartDate] = useState(moment(new Date(`${year}-01-01`)));
  const [endDate, setEndDate] = useState(moment());
  const [selectEdge, setSelectEdge] = useState(null);
  const [open, setOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(null);
  
  const handleCalendarOpen = (edge) => {
    setSelectEdge(edge);
  }

  useEffect(() => {
    console.log(startDate, endDate)
  }, [startDate, endDate])
  useEffect(() => {
    if (selectEdge === 'start') {
      setCalendarDate(startDate);
    } else if (selectEdge === 'end') {
      setCalendarDate(endDate);
    }
  }, [selectEdge, endDate, startDate]);

  useEffect(() => {
    setOpen(Boolean(calendarDate) && Boolean(selectEdge));
  }, [calendarDate, selectEdge]);

  const handleCalendarChange = (date) => {
    // setCalendarDate(null);
    // setSelectEdge(null);
  }

  const handleCalendarClose = () => {
    setSelectEdge(null);
    setCalendarDate(null);
  }

  const handleCalendarAccept = (date) => {
    
    // setCalendarDate(date);
    if (selectEdge === 'start') {
      setStartDate(date);
      if (moment(date).isAfter(endDate)) {
        setEndDate(date);
      }
    } else {
      setEndDate(date);
      if (moment(date).isBefore(startDate)) {
        setStartDate(date);
      }
    }
    setSelectEdge(null)
  }

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
        <Grid
          className={classes.calendar}
          item
          lg={6}
          xs={12}
        >
          <ButtonGroup
            variant="contained"
          >
            <Button
              className={classes.calendarButton}
              onClick={() => handleCalendarOpen('start')}
            >
              <CalendarTodayIcon className={classes.calendarTodayIcon} />
              {startDate.format('DD MM YYYY')}
            </Button>
            <Button
              className={classes.calendarButton}
              onClick={() => handleCalendarOpen('end')}
            >
              <CalendarTodayIcon className={classes.calendarTodayIcon} />
              {endDate.format('DD MM YYYY')}
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <DatePicker
        maxDate={moment()}
        onAccept={handleCalendarAccept}
        onChange={handleCalendarChange}
        onClose={handleCalendarClose}
        open={open}
        style={{ display: 'none' }} // Temporal fix to hide the input element
        value={calendarDate}
        variant="dialog"
      />
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

Header.defaultProps = {};

export default Header;
