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

function ConversationList({ conversations, onCreate, className, ...rest }) {
  const classes = useStyles();
  const params = useParams();
  const selectedTicketId = params.id;
  // Chat.Client.create('6c5b0230-9cd8-4934-bb86-161ec66b52f6')
  //   .then(client => {
  //     this.client = client;
  //     this.client
  //       .getChannelByUniqueName('general')
  //       .then(channel => channel)
  //       .catch(error => {
  //         if (error.body.code === 50300) {
  //           return this.client.createChannel({ uniqueName: 'general' });
  //         } else {
  //           this.handleError(error);
  //       }
  //     })
  //       .then(channel => {
  //       this.channel = channel;
  //       return this.channel.join().catch(() => {});
  //       })
  //       .then(() => {
  //         // Success!
  //       })
  //       .catch(this.handleError);
  //   })
  //   .catch(error => {

  //   });

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
            active={conversation.id === selectedTicketId}
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
