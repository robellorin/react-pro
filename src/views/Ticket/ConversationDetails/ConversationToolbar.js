import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 15,
    paddingTop: 10
  },
  backButton: {
    marginRight: theme.spacing(2),
    '@media (min-width: 864px)': {
      display: 'none'
    }
  },
  user: {
    flexShrink: 0,
    flexGrow: 1
  },
  activity: {
    display: 'flex',
    alignItems: 'center'
  },
  statusBullet: {
    marginRight: theme.spacing(1)
  },
  search: {
    height: 42,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
    flexBasis: 300,
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      flex: '1 1 auto'
    }
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.icon
  },
  searchInput: {
    flexGrow: 1
  }
}));

function ConversationToolbar({ conversation, className, session, ticket, ...rest }) {
  const classes = useStyles();
  let otherUserName = '';
  if (session.user.role === 'player') {
    otherUserName = ticket.supportName ?? 'Support';
  } else if (session.user.role === 'admin' || session.user.role === 'support') {
    otherUserName = ticket.playerSurname;
  }

  return (
    <Toolbar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Tooltip title="Back">
        <IconButton
          className={classes.backButton}
          component={RouterLink}
          edge="start"
          to="/ticket"
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
      <div className={classes.user}>
        <Typography variant="h5">{otherUserName}</Typography>
        <div className={classes.activity}>
          {/*<Typography variant="body2">
            {moment().fromNow()}
  </Typography> */}
        </div>
      </div>
    </Toolbar>
  );
}

ConversationToolbar.propTypes = {
  className: PropTypes.string
};

export default ConversationToolbar;
