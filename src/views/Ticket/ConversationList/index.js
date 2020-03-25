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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  toolbar: {
    padding: '10px 5px 25px 5px',
    minHeight: 83
  },
  createBtn: {
    backgroundColor: '#19d285',
    color: '#ffffff',
    padding: '12px 8px',
    borderRadius: 15,
    '&:hover': {
      backgroundColor: '#19d285a3'
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

function ConversationList({ conversations, session, onCreate, className, clickItemHandle, clickSolveHandle, ...rest }) {
  const classes = useStyles();
  const [curPage, setCurPage] = useState(1);
  const params = useParams();
  const selectedTicketId = params.id;
  const count = 9;
  const totalPages = Math.floor(conversations.length / count) + 1;
  const onBack = () => {
    setCurPage(curPage - 1);
  };
  const onNext = () => {
    setCurPage(curPage + 1);
  }
  const begin = (curPage - 1) * count;
  const end = curPage * count;
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar className={classes.toolbar}>
      {
        session.user.role !== 'admin' && session.user.role !== 'support' &&
          <Button onClick={onCreate} className={classes.createBtn} fullWidth>
            new Ticket
          </Button>
      }
      </Toolbar>
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
      <ListItem classes={{container: classes.navigation}}>
          <IconButton edge="start" aria-label="back" onClick={onBack} disabled={curPage < 2}>
            <ArrowBackIosIcon />
          </IconButton>
          <ListItemText classes={{ primary: classes.navigationText }} primary={`${curPage} / ${totalPages}`} style={{ textAlign: 'center' }} />
          <ListItemSecondaryAction>
            <IconButton edge="start" aria-label="next"  onClick={onNext} disabled={curPage >= totalPages }>
              <ArrowForwardIosIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
    </div>
  );
}

ConversationList.propTypes = {
  className: PropTypes.string,
  conversations: PropTypes.array.isRequired
};

export default ConversationList;
