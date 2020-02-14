import React, { memo } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  CardMedia,
  Avatar
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  media: {
    position: 'relative',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    backgroundSize: 'contain',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  avatar: {
    marginRight: theme.spacing(2),
    position: 'absolute',
    height: 80
  },
  img: {
    objectFit: 'contain'
  }
}));

function AuthBackground({ type }) {
  const classes = useStyles();
  const offest = type === 'login' ? 0 : 65;
  return (
    <CardMedia
      className={classes.media}
      image="/images/auth/island.png"
      title="Cover"
    >
      <Avatar classes = {{img: classes.img, root: classes.avatar}} style={{width: 43, top: offest, left: 90}} alt="tree" src="/images/auth/tree-1.png"></Avatar>
      <Avatar classes = {{img: classes.img, root: classes.avatar}} style={{width: 71, top: offest +30, left: -10}} alt="tree" src="/images/auth/tree-2.png"></Avatar>
      <Avatar classes = {{img: classes.img, root: classes.avatar}} style={{width: 71, top: offest + 25, left: 390}} alt="tree" src="/images/auth/tree-3.png"></Avatar>
      <Avatar classes = {{img: classes.img, root: classes.avatar}} style={{width: 52, top: offest + 20, left: 300}} alt="tree" src="/images/auth/tree-4.png"></Avatar>
      <Avatar classes = {{img: classes.img, root: classes.avatar}} style={{width: 90, top: offest - 20, left: 180}} alt="tree" src="/images/auth/tree-5.png"></Avatar>
    </CardMedia>
  );
}
export default memo(AuthBackground);
