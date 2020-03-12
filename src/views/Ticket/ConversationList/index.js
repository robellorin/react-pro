import React from 'react';
import { useParams } from 'react-router';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Toolbar,
  Button,
  Divider,
  List
} from '@material-ui/core';
// import Chat from 'twilio-chat';
import ConversationListItem from './ConversationListItem';

// const Chat = require('twilio-chat');
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white
  },
  searchInput: {
    flexGrow: 1
  }
}));

function ConversationList({ conversations, onCreate, className, clickItemHandle, ...rest }) {
  const classes = useStyles();
  const params = useParams();
  const selectedTicketId = params.id;
  
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <Button onClick={onCreate}>Create new Ticket</Button>
      </Toolbar>
      <Divider />
      <List disablePadding>
        {conversations.map((conversation, i) => (
          <ConversationListItem
            clickHandle={clickItemHandle}
            active={conversation.id.toString() === selectedTicketId}
            conversation={conversation}
            divider={i < conversations.length - 1}
            key={conversation.id}
          />
        ))}
      </List>
    </div>
  );
}

ConversationList.propTypes = {
  className: PropTypes.string,
  conversations: PropTypes.array.isRequired
};

export default ConversationList;
