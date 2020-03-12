import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Page from 'src/components/Page';
import ConversationList from './ConversationList';
import ConversationDetails from './ConversationDetails';
import ConversationPlaceholder from './ConversationPlaceholder';
import { getTickets, createTicket, updateTicket, getMessages, createMessage } from 'src/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
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
      '& $conversationList, & $conversationDetails': {
        transform: 'translateX(-100%)'
      }
    }
  },
  conversationList: {
    width: 300,
    flexBasis: 300,
    flexShrink: 0,
    '@media (min-width: 864px)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
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
  const ticketsData = useSelector(state => state.tickets);
  const session = useSelector(state => state.session);
  const [conversations, setConversations] = useState(ticketsData.tickets);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [messages, setMessages] = useState(ticketsData.messages);
  const [messagesLoading, setMessagesLoading] = useState(false);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  useEffect(() => {
    if (ticketsLoading && !ticketsData.ticketsLoading) {
      const sortTickets = ticketsData.tickets.sort((a,b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0));
      setConversations(sortTickets);
      if (ticketsData.status === 'ticket_create_success')
        history.push(`/ticket/${ticketsData.newTicketId}`);
      if (params.id && params.id !== 'new-create') dispatch(getMessages(params.id));
    }
    setTicketsLoading(ticketsData.ticketsLoading);
  }, [ticketsData, ticketsLoading, params.id, dispatch, history]);
  useEffect(() => {
    if (messagesLoading && !ticketsData.messagesLoading) {
      const sortMessages = ticketsData.messages.sort((a,b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0));
      setMessages(sortMessages);
    }
    setMessagesLoading(ticketsData.messagesLoading);
  }, [ticketsData.messagesLoading, ticketsData.messages, messagesLoading]);

  let selectedConversation;

  if (params.id) {
    if (params.id === 'new-create') {
      selectedConversation = {
        id: params.id,
        otherUser: {
          name: 'Support',
          avatar: "/images/avatars/avatar_7.png",
          active: true,
          lastActivity: new Date()
        },
        messages: []
      }
    } else {
      selectedConversation = conversations.find(
        (c) => c.id.toString() === params.id
      );
    }
  }

  const createNewTicket = () => {
    dispatch(getMessages('new-create'));
    history.push('/ticket/new-create');
  }

  const clickItemHandle = (selectedId) => {
    dispatch(getMessages(selectedId));
    history.push(`/ticket/${selectedId}`);
  }

  const sendMessage = (content) => {
    if (params.id === 'new-create') {
      dispatch(createTicket(content));
    } else {
      dispatch(createMessage(params.id, content));
    };
  }

  const clickSolveHandle = (id) => {
    dispatch(updateTicket(id));
  }
 
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
