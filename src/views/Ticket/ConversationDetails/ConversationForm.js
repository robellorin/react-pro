import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Divider,
  IconButton,
  Input,
  Paper,
  Tooltip
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
  const fileInputRef = useRef(null);
  const [value, setValue] = useState('');
  const [filePath, setFilePath] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (event) => {
    event.persist();
    setValue(event.target.value);
  }

  const handleAttach = () => {
    fileInputRef.current.click();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.persist();
    const fileInput = fileInputRef.current;
    if ((!fileInput.files || !fileInput.files[0]) && event.target.message.value.length <= 0) {
      return;
    }
    sendMessage(value);
    setValue('');
    setShowPreview(false);
  };

  const fileChangeHandle = () => {
    const input = fileInputRef.current;
    setShowPreview(input.value.length > 0 ? true : false);
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        setFilePath(e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  return (
    <div>
      {showPreview &&
        <div className={classes.previewWrapper}>
          <img
            alt="Attachment"
            className={classes.image}
            src={filePath}
          />
          <IconButton className={classes.close} color='primary' onClick={() => setShowPreview(false)}>
            <HighlightOffIcon />
          </IconButton>
        </div>
      }
      <form
        {...rest}
        autoComplete="off"
        className={clsx(classes.root, className)}
        onSubmit={handleSubmit}
      >
        <Avatar
          alt="Person"
          src={''}
        />
        <Paper
          className={classes.paper}
          elevation={1}
        >
          <Input
            className={classes.input}
            disableUnderline
            onChange={handleChange}
            name="message"
            value={value}
            placeholder="Leave a message"
          />
        </Paper>
        <Tooltip title="Send">
          <IconButton color={value.length > 0 ? 'primary' : 'default'} type="submit">
            <SendIcon />
          </IconButton>
        </Tooltip>
        <Divider className={classes.divider} />
        <Tooltip title="Attach photo">
          <IconButton
            edge="end"
            onClick={handleAttach}
          >
            <AddPhotoIcon />
          </IconButton>
        </Tooltip>
        <input
          className={classes.fileInput}
          ref={fileInputRef}
          name="file"
          type="file"
          onChange={fileChangeHandle}
        />
      </form>
    </div>
  );
}

ConversationForm.propTypes = {
  className: PropTypes.string
};

export default ConversationForm;
