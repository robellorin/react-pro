import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { Typography, Avatar, colors } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  authUser: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& $body': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  inner: {
    display: 'flex',
    maxWidth: 500
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  body: {
    backgroundColor: colors.grey[100],
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2)
  },
  content: {
    marginTop: theme.spacing(1)
  },
  image: {
    marginTop: theme.spacing(2),
    height: 'auto',
    width: 380,
    maxWidth: '100%'
  },
  footer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

function ConversationMessage({ message, className, ticket, ...rest }) {
  const classes = useStyles();
  let match = message.content.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm);

  return (
    <div
      {...rest}
      className={clsx(
        classes.root,
        {
          [classes.authUser]: message.userId !== ticket.supportId
        },
        className
      )}
    >
      <div className={classes.inner}>
        <Avatar
          className={classes.avatar}
          src={''}
        />
        <div>
          <div className={classes.body}>
            <div>
              <Typography
                color="inherit"
                variant="h6"
              >
                {message.userId !== ticket.supportId ? 'Me' : 'Support'}
              </Typography>
            </div>
            <div className={classes.content}>
              {match ? (
                <img
                  alt="Attachment"
                  className={classes.image}
                  src={message.content}
                />
              ) : (
                <Typography
                  color="inherit"
                  variant="body1"
                >
                  {message.content}
                </Typography>
              )}
            </div>
          </div>
          <div className={classes.footer}>
            <Typography
              className={classes.time}
              variant="body2"
            >
              {moment(message.created_at).fromNow()}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

ConversationMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.object.isRequired
};

export default ConversationMessage;
