import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card, Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '15px 24px',
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
    fontSize: 16,
    paddingBottom: 10,
    color: '#6f889d',
    fontFamily: 'TT Hoves',
    textTransform: 'unset',
    fontWeight: 500
  },
  value: {
    fontSize: 35,
    color: '#232e36',
    fontFamily: 'TT Hoves',
    fontWeight: 'bold',
    padding: '10px 0',
    whiteSpace: 'nowrap'
  },
  subIcon: {
    paddingLeft: 5,
    fontSize: 20,
    marginTop: 2
  },
  symbol: {
    fontFamily: 'TT Hoves',
    fontSize: 25
  }
}));

function DisplayItem({ className, data, ...rest }) {
  const classes = useStyles();
  const style = { backgroundColor: data.backgroundColor, color: data.color };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div style={{ width: '100%' }}>
        <div className={classes.title}>
          {data.title}
          {
            data.subIcon
              && <data.subIcon className={classes.subIcon} style={{ color: data.subIconColor ? data.subIconColor : data.color }} />
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
          data.icon
            && <data.icon style={{ color: data.color }} />
        }
        {
          data.symbol
            && <div className={classes.symbol} style={{ color: data.color }}>{data.symbol}</div>
        }
      </div>
    </Card>
  );
}

DisplayItem.propTypes = {
  className: PropTypes.string
};

export default DisplayItem;
