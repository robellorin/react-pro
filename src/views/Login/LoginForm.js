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
import { login } from 'src/actions';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  password: {
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

function LoginForm(props) {
  const { className, onChange, ...rest } = props;
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
  const [loggedIn, setLoggedIn] = useState(session.loggedIn);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    event.persist();
    if (event.target.name === 'email') {
      onChange(event.target.value);
    }
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
    dispatch(login(
      {
        username: event.target.email.value,
        password: event.target.password.value
      }
    ));
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
        values: {
          ...prevFormState.values,
          email: localStorage.getItem('email') ? localStorage.getItem('email') : formState.values.email
        },
        isValid: false
      }));
    }
    else if (session.loggedIn) {
      history.push('/dashboards/analytics');
    }
    else if (loading && (!session.loggedIn || session.error)) {
      setOpen(true);
      setFormState((prevFormState) => ({
        ...prevFormState,
        errors: {password: [session.error ? session.error : 'Oops! password is incorrect.']},
      }));
    }
    setLoading(session.loading);
    setLoggedIn(session.loggedIn);
  }, [loading, loggedIn, session, formState.values.email, history]);

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
        <Alert variant="error" message={session.error} />
      </Snackbar>
      <div className={classes.fields}>
        <TextField
          error={hasError('email')}
          fullWidth
          helperText={hasError('email') ? formState.errors.email[0] : null}
          label="Email"
          name="email"
          onChange={handleChange}
          value={formState.values.email || ''}
          variant="outlined"
        />
        <TextField
          error={hasError('password')}
          fullWidth
          helperText={
            hasError('password') ? formState.errors.password[0] : null
          }
          label="password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ''}
          variant="outlined"
        />
      </div>
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        Sign in
      </Button>
    </form>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string
};

export default LoginForm;
