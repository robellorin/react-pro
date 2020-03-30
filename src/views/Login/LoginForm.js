/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField, Link, InputAdornment, Hidden } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
  textField: {
    backgroundColor: '#f5f9f9',
    borderRadius: 15,
    '& fieldset': {
      border: 'none'
    }
  },
  input: {
    fontSize: 25,
    fontFamily: 'TT Hoves',
    fontWeight: 500,
    // color: '#bdbdbd',
    '&::placeholder': {
      color: '#bdbdbd',
    },
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #f5f9f9 inset"
    }
  },

  icon: {
    color: '#bdbdbd'
  },
  submitButton: {
    marginTop: 20,
    width: '100%',
    borderRadius: 15,
    padding: '15px',
    filter: 'drop-shadow(0 0 12.5px rgba(0,0,0,0.03))',
    backgroundColor: '#37c566',
    fontSize: 20,
    fontFamily: 'TT Hoves',
    textTransform: 'capitalize',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#37c566ba'
    },
    '&:disabled': {
      backgroundColor: '#37c566ba',
      color: '#ffffff'
    }
  },
  linkWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 0'
  },
  link: {
    fontSize: 25,
    color: '#161e33',
    fontFamily: 'TT Hoves',
    fontWeight: 500,
  }
}));

function LoginForm(props) {
  const { className, onChange, sendRequest, ...rest } = props;
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
          classes={{ root: classes.textField}}
          error={hasError('email')}
          fullWidth
          helperText={hasError('email') ? formState.errors.email[0] : null}
          name="email"
          placeholder='Email'
          InputProps={{
            classes: {input: classes.input},
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon className={classes.icon} />
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          value={formState.values.email || ''}
          variant="outlined"
        />
        <TextField
          classes={{ root: classes.textField}}
          error={hasError('password')}
          placeholder='Password'
          fullWidth
          helperText={
            hasError('password') ? formState.errors.password[0] : null
          }
          name="password"
          InputProps={{
            classes: {input: classes.input},
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon className={classes.icon}/>
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          type="password"
          value={formState.values.password || ''}
          variant="outlined"
        />
      </div>
      <div className={classes.linkWrapper}>
        <div>
          <Hidden lgUp>
            <Link
              className={classes.link}
              align="center"
              color="secondary"
              component={RouterLink}
              to="/auth/register"
              underline="always"
              variant="subtitle2"
            >
              Don&apos;t have an account?
            </Link>
          </Hidden>
        </div>
        <Link
          className={classes.link}
          align="center"
          color="secondary"
          component={RouterLink}
          to="/auth/forgot-password"
          underline="always"
          variant="subtitle2"
          onClick={sendRequest}
        >
          Forgot your password?
        </Link>
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
