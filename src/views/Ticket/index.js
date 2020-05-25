import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Page from 'src/components/Page';
import {
  getTickets, createTicket, updateTicket, getMessages, createMessage
} from 'src/actions';
import socket from 'src/components/Socket';
import ConversationList from './ConversationList';
import ConversationDetails from './ConversationDetails';
import ConversationPlaceholder from './ConversationPlaceholder';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 165px)',
    padding: '32px 24px 36px 24px',
    cursor: 'pointer',
    display: 'flex',
    overflow: 'hidden',
    '@media (max-width: 863px)': {
      '& $conversationList, & $conversationDetails': {
        flexBasis: '100%',
        width: '100%',
        maxWidth: 'none',
        flexShrink: '0',
        transform: 'translateX(0)'
      }
    }
  },
  openConversion: {
    '@media (max-width: 863px)': {
      '& $conversationList': {
        marginLeft: -32,
        transform: 'translateX(-100%)'
      },
      '& $conversationDetails': {
        marginLeft: 15,
        transform: 'translateX(-100%)'
      }
    }
  },
  conversationList: {
    width: 280,
    flexBasis: 280,
    marginRight: 39,
    flexShrink: 0,
    // '@media (min-width: 864px)': {
    //   borderRight: `1px solid ${theme.palette.divider}`
    // }
  },
  conversationDetails: {
    flexGrow: 1
  },
  conversationPlaceholder: {
    flexGrow: 1
  }
}));

function Ticket() {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const ticketsData = useSelector((state) => state.tickets);
  const session = useSelector((state) => state.session);
  const [conversations, setConversations] = useState(ticketsData.tickets);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [messages, setMessages] = useState(ticketsData.messages);

  let selectedConversation;

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch, params, session]);

  useEffect(() => {
    if (params.id && params.id !== 'new-create') { window.$client.joinRoom(params.id, session.user.id); }

    return () => {
      if (params.id && params.id !== 'new-create') { window.$client.leaveRoom(params.id, session.user.id); }
    };
  }, [params.id, session.user.id]);

  useEffect(() => {
    if (ticketsLoading && !ticketsData.ticketsLoading) {
      const sortTickets = ticketsData.tickets.sort((a, b) => ((a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0)));
      setConversations(sortTickets);

      if (ticketsData.status === 'ticket_create_success') {
        history.push(`/ticket/${ticketsData.newTicket.id}`);
        window.$client.ticket(ticketsData.newTicket);
      }

      if (params.id && params.id !== 'new-create') dispatch(getMessages(params.id));

      if (!params.id && sortTickets && sortTickets.length > 0) {
        for (const ticket of sortTickets) {
          if (ticket.status) continue;
          history.push(`/ticket/${ticket.id}`);
          break;
        }
      }
    }
    setTicketsLoading(ticketsData.ticketsLoading);
  }, [ticketsData, ticketsLoading, params.id, dispatch, history]);
  useEffect(() => {
    // if (messagesLoading && !ticketsData.messagesLoading) {
    const sortMessages = ticketsData.messages.sort((a, b) => ((a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0)));
    setMessages(sortMessages);
    // }
  }, [ticketsData.messages]);

  if (params.id) {
    if (params.id === 'new-create') {
      selectedConversation = {
        id: params.id
      };
    } else {
      selectedConversation = conversations.find(
        (c) => c.id.toString() === params.id
      );
    }
  }

  const createNewTicket = () => {
    dispatch(getMessages('new-create'));
    history.push('/ticket/new-create');
  };

  const clickItemHandle = (selectedId) => {
    dispatch(getMessages(selectedId));
    history.push(`/ticket/${selectedId}`);
  };

  const sendMessage = (content) => {
    if (params.id === 'new-create') {
      dispatch(createTicket(content));
    } else {
      if (!window.$client) window.$client = socket(session.user);
      window.$client.message(selectedConversation, session.user.role);
      dispatch(createMessage(params.id, content));
    }
  };

  const clickSolveHandle = (id) => {
    dispatch(updateTicket(id));
    const closedConversation = conversations.find(
      (c) => c.id.toString() === params.id
    );

    if (!window.$client) window.$client = socket(session.user);
    window.$client.closeTicket(closedConversation);
  };

  return (
    <Page
      id="ticketPane"
      className={clsx({
        [classes.root]: true,
        [classes.openConversion]: selectedConversation
      })}
      title="Ticket"
    >
      <ConversationList
        className={classes.conversationList}
        session={session}
        conversations={conversations}
        onCreate={createNewTicket}
        clickItemHandle={clickItemHandle}
        clickSolveHandle={clickSolveHandle}
      />
      {selectedConversation ? (
        <ConversationDetails
          className={classes.conversationDetails}
          ticket={selectedConversation}
          session={session}
          messages={messages}
          sendMessage={sendMessage}
        />
      ) : (
        <ConversationPlaceholder className={classes.conversationPlaceholder} />
      )}
    </Page>
  );
}

export default Ticket;
