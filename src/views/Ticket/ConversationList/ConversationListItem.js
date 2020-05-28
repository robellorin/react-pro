import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  colors
} from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Avatar from 'src/components/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16
  },
  active: {
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    backgroundColor: '#512dd9',
    '&:hover': {
      backgroundColor: '#4404e0c4'
    },
    '& $primary, $secondary': {
      color: '#ffffff'
    }
  },
  listItemText: {
    marginLeft: 5,
    fontWeight: 500,
    fontFamily: 'TT Hoves'
  },
  primary: {
    fontSize: 20,
    color: '#161e33'

  },
  secondary: {
    fontSize: 15,
    color: '#6f889d',
  },
  details: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  avatar: {
    borderRadius: 24
  },
}));

function ConversationListItem({
  active, session, conversation, className, clickHandle, clickSolveHandle, ...rest
}) {
  const classes = useStyles();
  const playerName = `${
    conversation.playerSurname ? conversation.playerSurname : ''
  } ${conversation.playerFirstname ? conversation.playerFirstname : ''}`;
  const supportName = conversation.supportId === 0
    ? 'Support'
    : `${conversation.supportSurname ? conversation.supportSurname : ''} ${
      conversation.supportFirstname ? conversation.supportFirstname : ''
    }`;

  return (
    <ListItem
      {...rest}
      button
      className={clsx(
        {
          [classes.active]: active,
          [classes.root]: true
        },
        className
      )}
      disabled={session.user.role !== 'admin' && session.user.role !== 'support' && conversation.status}
      onClick={() => clickHandle(conversation.id)}
    >
      <ListItemAvatar>
        <Avatar className={classes.avatar} role={session.user.role === 'player' ? 'support' : 'player'} />
      </ListItemAvatar>
      <ListItemText
        classes={{ root: classes.listItemText, primary: classes.primary, secondary: classes.secondary }}
        primary={session.user.role === 'player' ? supportName : playerName}
        secondary={(
          <>
            <span
              component="span"
              variant="body2"
              color="textPrimary"
            >
              {conversation.title}
            </span>
          </>
        )}
      />
      {
        conversation.status
          && (
          <ListItemSecondaryAction>
            <DoneOutlineIcon style={{ color: colors.green[500] }} />
          </ListItemSecondaryAction>
          )
      }
      {
        (session.user.role === 'admin' || session.user.role === 'support') && !conversation.status
          && (
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="toSolve" onClick={() => clickSolveHandle(conversation.id)}>
              <CheckCircleOutlineIcon />
            </IconButton>
          </ListItemSecondaryAction>
          )
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
