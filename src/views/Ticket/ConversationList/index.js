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
import AddIcon from '@material-ui/icons/Add';
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

function ConversationList({ conversations, session, onCreate, className, clickItemHandle, clickSolveHandle, ...rest }) {
  const classes = useStyles();
  const params = useParams();
  const selectedTicketId = params.id;
  
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
      {
        session.user.role !== 'admin' && session.user.role !== 'support' &&
          <Button onClick={onCreate}>
            <AddIcon color='primary' />
            Create new Ticket
          </Button>
      }
      </Toolbar>
      <Divider />
      <List disablePadding>
        {conversations.map((conversation, i) => (
          <ConversationListItem
          session={session}
            clickHandle={clickItemHandle}
            clickSolveHandle={clickSolveHandle}
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
