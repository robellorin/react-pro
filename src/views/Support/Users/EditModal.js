import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Modal,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Divider,
  Button,
  Typography,
  MenuItem,
  ListItemIcon
} from '@material-ui/core';
import {
  faEuroSign,
  faPoundSign,
  faDollarSign
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  },
  currency: {
    width: 300
  }
}));

const currencies = [
  {
    value: 'USD',
    icon: faDollarSign
  },
  {
    value: 'EUR',
    icon: faEuroSign
  },
  {
    value: 'GBP',
    icon: faPoundSign
  }
];

function EditModal({
  open, onClose, className, user, onSave, ...rest
}) {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    firstname: '',
    username: '',
    surname: '',
    cutOff: '',
    tags: ''
  });

  useEffect(() => {
    setFormState({
      firstname: user?.firstname ? user.firstname : '',
      surname: user?.surname ? user.surname : '',
      username: user?.username ? user.username : '',
      cutOff: user ? parseFloat(user.cutOff) : '',
      tags: user ? user.tags : '',
      currency: user ? user.currency : ''
    });
  }, [user]);

  if (!open) {
    return null;
  }

  const handleChange = (event) => {
    event.persist();
    setFormState((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title="Edit User" />
        <Divider />
        <CardContent className={classes.content}>
          <Box className={classes.box}>
            <TextField
              className={classes.textField}
              id="first-name"
              label="First Name"
              name="firstname"
              variant="outlined"
              value={formState.firstname}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              className={classes.textField}
              fullWidth
              id="last-name"
              label="Last Name"
              name="surname"
              variant="outlined"
              value={formState.surname}
              onChange={handleChange}
            />
            <TextField
              className={classes.textField}
              fullWidth
              id="email"
              label="Email"
              name="username"
              variant="outlined"
              value={formState.username}
              onChange={handleChange}
            />
          </Box>
          <Box className={classes.box}>
            <TextField
              className={classes.textField}
              id="cut-off"
              label="CutOff"
              name="cutOff"
              type="number"
              variant="outlined"
              value={formState.cutOff}
              onChange={handleChange}
            />
            <TextField
              id="standard-currency"
              className={clsx(classes.textField, classes.currency)}
              name="currency"
              label="currency"
              select
              value={formState.currency}
              onChange={handleChange}
              helperText="Please select currency"
              variant="outlined"
              fullWidth
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <div style={{ display: 'flex' }}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={option.icon} />
                    </ListItemIcon>
                    <Typography>{option.value}</Typography>
                  </div>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="standard-select-team"
              className={classes.textField}
              name="tags"
              label="Team"
              select
              value={formState.tags}
              onChange={handleChange}
              helperText="Please select team"
              variant="outlined"
              fullWidth
            >
              {constants.teamList.map((option) => (
                <MenuItem key={option} value={option}>
                  <Typography>{option}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button onClick={() => onClose()}>Cancel</Button>
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
