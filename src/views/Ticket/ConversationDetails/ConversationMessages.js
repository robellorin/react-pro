import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import ConversationMessage from './ConversationMessage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'auto',
    borderRadius: 20,
    backgroundColor: '#ffffff'
  },
  inner: {
    padding: '16px 30px'
  }
}));

function ConversationMessages({ messages, session, className, ticket, ...rest }) {
  const classes = useStyles();
  const messagesEnd = useRef(null);
  useEffect(() => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div>
        <div className={classes.inner}>
          {messages.map(message => {
            return (
              <ConversationMessage
                key={message.id}
                session={session}
                message={message}
                ticket={ticket}
              />
            );
          })}
        </div>
      </div>
      <div style={{ float:"left", clear: "both" }} ref={messagesEnd} />
    </div>
  );
}

ConversationMessages.propTypes = {
  className: PropTypes.string,
  messages: PropTypes.array.isRequired
};

export default ConversationMessages;
