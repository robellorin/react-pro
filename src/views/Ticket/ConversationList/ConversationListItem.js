import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  colors
} from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  active: {
    boxShadow: `inset 4px 0px 0px ${theme.palette.primary.main}`,
    backgroundColor: colors.grey[50]
  },
  avatar: {
    height: 40,
    width: 40
  },
  details: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  unread: {
    marginTop: 2,
    padding: 2,
    height: 18,
    minWidth: 18
  }
}));

function ConversationListItem({
  active, session, conversation, className, clickHandle, clickSolveHandle, ...rest
}) {
  const classes = useStyles();
  

  return (
    <ListItem
      {...rest}
      button
      className={clsx(
        {
          [classes.active]: active
        },
        className
      )}
      disabled={session.user.role !== 'admin' && session.user.role !== 'support' && conversation.status === 'solved'}
      onClick={() => clickHandle(conversation.id)}
    >
      <ListItemAvatar>
        <Avatar
          alt="Person"
          className={classes.avatar}
          src={''}
        />
      </ListItemAvatar>
      <ListItemText
        primary={conversation.title}
        primaryTypographyProps={{
          noWrap: true,
          variant: 'h6'
        }}
        // secondary={conversation.title}
        // secondaryTypographyProps={{
        //   noWrap: true,
        //   variant: 'body1'
        // }}
      />
      {
        conversation.status === 'solved' &&
          <ListItemSecondaryAction>
            <DoneOutlineIcon style={{ color: colors.green[500] }} />
          </ListItemSecondaryAction>
      }
      {
        (session.user.role === 'admin' || session.user.role === 'support') && conversation.status !== 'solved' &&
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="toSolve" onClick={clickSolveHandle}>
              <CheckCircleOutlineIcon />
            </IconButton>
          </ListItemSecondaryAction>
      }
    </ListItem>
  );
}

ConversationListItem.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  conversation: PropTypes.object.isRequired,
  clickHandle: PropTypes.func
};

export default ConversationListItem;
