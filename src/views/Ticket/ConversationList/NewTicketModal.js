import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Divider,
  Button,
} from '@material-ui/core';
import validate from 'validate.js';

const schema = {
  title: {
    presence: { allowEmpty: false, message: 'cannot be empty or more than 20 characters.' },
    length: {
      maximum: 20
    }
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  box: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  textField: {
    margin: 10,
    '& input, .MuiOutlinedInput-input': {
      padding: 15
    }
  }
}));

function NewTicketModal({
  open, onClose, className, onSave, ...rest
}) {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState('');

  useEffect(() => {
    setTitle('');
  }, [open]);

  useEffect(() => {
    const error = validate({ title }, schema);
    setErrors(error || null);
  }, [title]);

  if (!open) {
    return null;
  }

  const handleChange = (event) => {
    event.persist();
    setTitle(event.target.value);
  };

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title="Input Ticket Title" />
        <Divider />
        <CardContent className={classes.content}>
          <TextField
            className={classes.textField}
            id="ticket-title"
            label="Ticket Title"
            name="title"
            variant="outlined"
            value={title}
            onChange={handleChange}
            fullWidth
            error={errors && errors.title.length > 0}
            helperText={
                 errors && errors.title.length > 0 ? errors.title : null
               }
          />
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button
            color="primary"
            onClick={() => onSave(title)}
            variant="contained"
            disabled={errors && errors.title}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

export default NewTicketModal;
