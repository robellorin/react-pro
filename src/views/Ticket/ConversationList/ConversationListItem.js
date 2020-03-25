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
  root: {
    padding: 16,
  },
  active: {
    // boxShadow: `inset 4px 0px 0px ${theme.palette.primary.main}`,
    backgroundColor: '#4404e0e6',
    '&:hover': {
      backgroundColor: '#4404e0c4'
    },
    '& $listItemText span' : {
      color: '#ffffff'
    }
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 10
  },
  listItemText: {

  },
  details: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
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
          [classes.active]: active,
          [classes.root]: true
        },
        className
      )}
      disabled={session.user.role !== 'admin' && session.user.role !== 'support' && conversation.status}
      onClick={() => clickHandle(conversation.id)}
    >
      <ListItemAvatar>
        <Avatar
          alt="Person"
          variant="rounded"
          className={classes.avatar}
          src={''}
        />
      </ListItemAvatar>
      <ListItemText
        className={classes.listItemText}
        primary={conversation.title}
        primaryTypographyProps={{
          noWrap: false,
          variant: 'h6'
        }}
      />
      {
        conversation.status &&
          <ListItemSecondaryAction>
            <DoneOutlineIcon style={{ color: colors.green[500] }} />
          </ListItemSecondaryAction>
      }
      {
        (session.user.role === 'admin' || session.user.role === 'support') && !conversation.status &&
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="toSolve" onClick={() =>clickSolveHandle(conversation.id)}>
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
