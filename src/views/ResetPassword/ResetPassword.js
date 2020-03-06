/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

import Alert from 'src/components/Alert';
import { resetPassword } from 'src/actions';

const schema = {
  password: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  confirmPassword: {
    presence: { allowEmpty: false, message: 'is required' }
  }
};

const useStyles = makeStyles((theme) => ({
  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));

function ResetForm(props) {
  const { token, className, ...rest } = props;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const session = useSelector(state => state.session);
  const [loading, setLoading] = useState(session.loading);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    event.persist();

    setFormState((prevFormState) => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...prevFormState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.persist();
    if (event.target.password.value !== event.target.confirmPassword.value) {
      setFormState((prevFormState) => ({
        ...prevFormState,
        errors: {confirmPassword: ['Confirm password is not matched with password.']},
      }));
      return;
    } 
    dispatch(resetPassword(event.target.password.value, token, history));
  };

  const hasError = (field) => (!!(formState.touched[field] && formState.errors[field]));

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((prevFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (session.loading) {
      setFormState((prevFormState) => ({
        ...prevFormState,
        isValid: false
      }));
    } else if (loading && !session.loading && session.error) {
      setOpen(true);      
    }
    setLoading(session.loading);
  }, [loading, session, history]);

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
    >
      <Alert variant='error' message='Something went wrong!' />
    </Snackbar>
      <div className={classes.fields}>
        <TextField
          error={hasError('password')}
          fullWidth
          helperText={hasError('password') ? formState.errors.password[0] : null}
          label='Password'
          name='password'
          type='password'
          onChange={handleChange}
          value={formState.values.password || ''}
          variant='outlined'
        />
        <TextField
          error={hasError('confirmPassword')}
          fullWidth
          helperText={
            hasError('confirmPassword') ? formState.errors.confirmPassword[0] : null
          }
          label='Confirm Password'
          name='confirmPassword'
          onChange={handleChange}
          type='password'
          value={formState.values.confirmPassword || ''}
          variant='outlined'
        />
      </div>
      <Button
        className={classes.submitButton}
        color='secondary'
        disabled={!formState.isValid}
        size='large'
        type='submit'
        variant='contained'
      >
        Set Password
      </Button>
    </form>
  );
}

ResetForm.propTypes = {
  className: PropTypes.string
};

export default ResetForm;
