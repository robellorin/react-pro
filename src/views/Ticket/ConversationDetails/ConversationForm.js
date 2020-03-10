import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  IconButton,
  Input,
  Paper,
  Tooltip
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2)
  },
  paper: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5, 2)
  },
  input: {
    width: '100%'
  },
  divider: {
    width: 1,
    height: 24
  },
  fileInput: {
    display: 'none'
  }
}));

function ConversationForm({ className, ...rest }) {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const sender = {
    avatar: '/images/avatars/avatar_11.png'
  };

  const handleChange = (event) => {
    event.persist();
    setValue(event.target.value);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        src={sender.avatar}
      />
      <Paper
        className={classes.paper}
        elevation={1}
      >
        <Input
          className={classes.input}
          disableUnderline
          onChange={handleChange}
          placeholder="Leave a message"
        />
      </Paper>
      <Tooltip title="Send">
        <IconButton color={value.length > 0 ? 'primary' : 'default'}>
          <SendIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

ConversationForm.propTypes = {
  className: PropTypes.string
};

export default ConversationForm;
