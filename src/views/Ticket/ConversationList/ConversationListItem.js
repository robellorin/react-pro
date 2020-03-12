import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  colors
} from '@material-ui/core';

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
  active, conversation, className, clickHandle, ...rest
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
      onClick={() => clickHandle(conversation.id)}
    >
      <ListItemAvatar>
        <Avatar
          alt="Person"
          className={classes.avatar}
          src={''}
        />
      </ListItemAvatar>
      <div className={classes.details}>
        <Typography
          noWrap
          variant="body2"
        >
          {conversation.title}
        </Typography>
      </div>
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
