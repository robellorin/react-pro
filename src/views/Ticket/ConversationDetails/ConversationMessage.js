import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import Avatar from 'src/components/Avatar';
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
    borderRadius: 24
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
    fontFamily: 'TT Hoves',
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
      <Avatar className={classes.avatar} role={message.role} />
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
