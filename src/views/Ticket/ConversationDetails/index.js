import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider } from '@material-ui/core';
import ConversationToolbar from './ConversationToolbar';
import ConversationMessages from './ConversationMessages';
import ConversationForm from './ConversationForm';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

function ConversationDetails({ messages, session, className, ticket, sendMessage, ...rest }) {
  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <ConversationToolbar session={session} ticket={ticket} />
      <ConversationMessages session={session} messages={messages} ticket={ticket} />
      <Divider />
      <ConversationForm sendMessage={sendMessage}/>
    </div>
  );
}

ConversationDetails.propTypes = {
  className: PropTypes.string
};

export default ConversationDetails;
