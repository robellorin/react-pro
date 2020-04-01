import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 15,
    borderColor: '#ffffff',
    borderWidth: 2,
    borderStyle: 'solid',
    boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)`
  },
}));

const src = {
  'player': '/images/logos/user.png',
  'support': '/images/logos/support.jpeg'
}

function CustomAvatar({ role, className }) {
  const classes = useStyles();

  return (
    <Avatar className={clsx(classes.avatar, className)} alt='avatar' src={src[role]} variant="rounded" />
  )
};

export default CustomAvatar;
