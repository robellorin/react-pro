import React, { useState } from 'react';
import { useParams } from 'react-router';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Toolbar,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ConversationListItem from './ConversationListItem';
import NewTicketModal from './NewTicketModal';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  toolbar: {
    padding: '0 0 32px 0',
    minHeight: 83
  },
  createBtn: {
    backgroundColor: '#37c566',
    color: '#ffffff',
    padding: '10px 8px',
    borderRadius: 15,
    fontSize: 23,
    fontFamily: 'TT Hoves',
    fontWeight: 500,
    textTransform: 'capitalize',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    '&:hover': {
      backgroundColor: '#19d285'
    }
  },
  list: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'auto'
  },
  navigation: {
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  navigationText: {
    fontSize: 16,
    fontWeight: 700
  }
}));

function ConversationList({
  conversations, session, onCreate, className, clickItemHandle, clickSolveHandle, ...rest
}) {
  const classes = useStyles();
  const [curPage, setCurPage] = useState(1);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const selectedTicketId = params.id;
  const count = session.user.role === 'player' ? 9 : 7;
  const totalPages = Math.floor(conversations.length / count) + 1;

  const onBack = () => {
    setCurPage(curPage - 1);
  };

  const onNext = () => {
    setCurPage(curPage + 1);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSave = (title) => {
    setOpen(false);
    onCreate(title);
  };
  const begin = (curPage - 1) * count;
  const end = curPage * count;

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {session.user.role !== 'admin' && session.user.role !== 'support' && (
        <Toolbar className={classes.toolbar}>
          <Button onClick={() => setOpen(true)} className={classes.createBtn} fullWidth>
            New Ticket
          </Button>
        </Toolbar>
      )}
      <List className={classes.list} disablePadding>
        {conversations.slice(begin, end).map((conversation, i) => (
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
      <ListItem classes={{ container: classes.navigation }}>
        <IconButton
          edge="start"
          aria-label="back"
          onClick={onBack}
          disabled={curPage < 2}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <ListItemText
          classes={{ primary: classes.navigationText }}
          primary={`${curPage} / ${totalPages}`}
          style={{ textAlign: 'center' }}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="start"
            aria-label="next"
            onClick={onNext}
            disabled={curPage >= totalPages}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <NewTicketModal
        onClose={onClose}
        onSave={onSave}
        open={open}
      />
    </div>
  );
}

ConversationList.propTypes = {
  className: PropTypes.string,
  conversations: PropTypes.array.isRequired
};

export default ConversationList;
