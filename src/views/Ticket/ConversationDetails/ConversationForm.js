import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  IconButton,
  Input,
  Paper,
  Tooltip
} from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    padding: '3px 8px',
    borderRadius: 20,
    marginTop: 15
  },
  paper: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    padding: '5px 8px',
    border: 'none',
    boxShadow: 'none'
  },
  input: {
    width: '100%',
    fontSize: 23,
    color: '#6f889d',
    fontFamily: 'TT Hoves',
    fontWeight: 500
  },
  sendButton: {
    marginRight: 40,
    padding: 0
  },
  fileInput: {
    display: 'none'
  },
  previewWrapper: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
    width: 'fit-content',
    position: 'relative'
  },
  image: {
    height: 'auto',
    width: 200,
    maxWidth: 200
  },
  close: {
    position: 'absolute',
    padding: 0,
    top: 5,
    right: 5,
    backgroundColor: '#ffffff'
  }
}));

function ConversationForm({ sendMessage, className, ...rest }) {
  const classes = useStyles();
  const [value, setValue] = useState('');
  
  const handleChange = (event) => {
    event.persist();
    setValue(event.target.value);
  }
   const handleSubmit = async (event) => {
    event.preventDefault();
    event.persist();
    sendMessage(value);
    setValue('');
  };

  return (
    <div>
      <form
        {...rest}
        autoComplete="off"
        className={classes.root}
        onSubmit={handleSubmit}
      >
        <Paper
          className={classes.paper}
        >
          <Input
            className={classes.input}
            disableUnderline
            onChange={handleChange}
            name="message"
            value={value}
            placeholder="Enter your message"
          />
        </Paper>
        <Tooltip title="Send">
          <IconButton className={classes.sendButton}  type="submit">
            <TelegramIcon style={{ fontSize: 35 }}  />
          </IconButton>
        </Tooltip>
      </form>
    </div>
  );
}

ConversationForm.propTypes = {
  className: PropTypes.string
};

export default ConversationForm;
