import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card, Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    position: 'relative',
    boxShadow: 'none'
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '5px 0',
    overflowX: 'hidden'
  },
  iconWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderBottomLeftRadius: 20
  },
  title: {
    display: 'flex',
    fontSize: 20,
    paddingBottom: 10,
    color: '#6f889d',
    fontFamily: 'TT Hoves',
    textTransform: 'unset',
    fontWeight: 500
  },
  value: {
    fontSize: 45,
    color: '#232e36',
    fontFamily: 'TT Hoves',
    fontWeight: 'bold',
    padding: '10px 0',
    whiteSpace: 'nowrap',
  },
  subIcon: {
    paddingLeft: 5,
    fontSize: 20,
    marginTop: 2
  }
}));

function DisplayItem({ className, data, ...rest }) {
  const classes = useStyles();
  const style = { backgroundColor: data.backgroundColor, color: data.color }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div style={{ width: '100%' }}>
        <div className={classes.title} >
          {data.title}
          {
            data.subIcon && 
              <data.subIcon className={classes.subIcon} style={{ color: data.subIconColor ? data.subIconColor : data.color }} />
          }
        </div>
        <div className={classes.details}>
          <Typography wrap="nowrap" className={classes.value}>
            {data.value}
          </Typography>
        </div>
      </div>
      <div className={classes.iconWrapper} style={style}>
        {
          data.icon &&
            <data.icon style={{ color: data.color }} />
        }
        {
          data.symbol &&
            <div style={{ color: data.color, fontSize: 20 }}>{data.symbol}</div>
        }
      </div>
    </Card>
  );
}

DisplayItem.propTypes = {
  className: PropTypes.string
};

export default DisplayItem;
