import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
  Typography,
  MenuItem
} from '@material-ui/core';

import * as constants from 'src/constant';

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
  content: {
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

function EditModal({
  open, onClose, className, user, onSave, ...rest
}) {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    cutOff: '',
    tags: ''
  })
  
  useEffect(() => {
    setFormState({
      cutOff: user ? user.cutOff : '',
      tags: user ? user.tags : ''
    });
  }, [user]);

  if (!open) {
    return null;
  }

  const handleChange = (event) => {
    event.persist();
    setFormState((prevState) => ({...prevState, [event.target.name]: event.target.value}))
  }

  return (
    <Modal
      onClose={onClose}
      open={open}
    >
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader title='Edit User' />
        <Divider />
        <CardContent className={classes.content}>
          <TextField
            className={classes.textField}
            id='cut-off'
            label='CutOff'
            name='cutOff'
            type='number'
            variant='outlined'
            value={formState.cutOff}
            onChange={handleChange}
          />
          <TextField
            id="standard-select-team"
            className={classes.textField}
            name="tags"
            label="Team"
            select
            value={formState.tags}
            onChange={handleChange}
            helperText="Please select team"
            variant='outlined'
            fullWidth
          >
            {constants.teamList.map(option => (
              <MenuItem key={option} value={option}>
                <Typography>{option}</Typography>
              </MenuItem>
            ))}>
          </TextField>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => onSave(formState)}
            variant="contained"
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

EditModal.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

EditModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default EditModal;
