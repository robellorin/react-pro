import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  authUser: {
    display: 'flex',
    justifyContent: 'flex-end',
    // '& $body': {
    //   backgroundColor: theme.palette.primary.main,
    //   color: theme.palette.primary.contrastText
    // }
    '& $inner': {
      flexDirection: 'row-reverse',
      '& $avatar': {
        marginRight: 0,
        marginLeft: theme.spacing(2)
      }
    }
  },
  inner: {
    display: 'flex',
    alignItems: 'flex-end',
    maxWidth: 500
  },
  avatar: {
    marginRight: theme.spacing(2),
    height: 48,
    width: 48,
    borderRadius: 15,
    borderColor: '#ffffff',
    borderWidth: 2,
    borderStyle: 'solid',
    boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)`,
  },
  body: {
    backgroundColor: '#e2e7eb',
    color: theme.palette.text.primary,
    borderRadius: 10,
    padding: '10px 16px'
  },
  content: {
    
  },
  message: {
    fontSize: 16,
    color: '#6f889d',
    fontFamily: 'T THoves',
    fontWeight: 500
  },
  image: {
    marginTop: theme.spacing(2),
    height: 'auto',
    width: 380,
    maxWidth: '100%'
  },
}));

function ConversationMessage({ message, session, className, ticket, ...rest }) {
  const classes = useStyles();
  let match = message.contents.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm);
  return (
    <div
      {...rest}
      className={clsx(
        classes.root,
        {
          [classes.authUser]: message.role === session.user.role
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
            <div className={classes.content}>
              {match ? (
                <img
                  alt="Attachment"
                  className={classes.image}
                  src={message.contents}
                />
              ) : (
                <Typography
                  color="inherit"
                  variant="body1"
                  className={classes.message}
                >
                  {message.contents}
                </Typography>
              )}
            </div>
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
