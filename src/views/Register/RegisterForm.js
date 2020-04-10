import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  InputAdornment,
  Checkbox,
  Typography,
  FormHelperText
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import { register } from 'src/actions';

const schema = {
  userName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  referredBy: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  confirmPassword: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  policy: {
    presence: { allowEmpty: false, message: 'is required' },
    checked: true
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
    paddingLeft: 10,
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
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#37c566ba'
    },
    '&:disabled': {
      backgroundColor: '#37c566ba',
      color: '#ffffff'
    }
  },
  policy: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
}));

function RegisterForm({ className, showTerms, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    event.persist();
    if (event.target.password.value !== event.target.confirmPassword.value) {
      setFormState((prevFormState) => ({
        ...prevFormState,
        errors: {confirmPassword: ['Confirm password is not matched with password.']},
      }));
      return;
    };
    localStorage.setItem('verifyUser', event.target.userName.value);
    dispatch(register(
      {
        username: event.target.userName.value,
        firstname: event.target.firstName.value,
        surname: event.target.lastName.value,
        referredBy: event.target.referredBy.value,
        password: event.target.password.value
      }
    ));
  };

  const hasError = (field) => !!(formState.touched[field] && formState.errors[field]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((prevFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {}
    }));
  }, [formState.values]);
  
  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      <div className={classes.fields}>
        <TextField
          classes={{ root: classes.textField}}
          autoComplete='off'
          error={hasError('userName')}
          helperText={
            hasError('userName') ? formState.errors.userName[0] : null
          }
          placeholder="Email"
          name="userName"
          type='email'
          onChange={handleChange}
          value={formState.values.userName || ''}
          fullWidth
          InputProps={{
            classes: {input: classes.input},
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon className={classes.icon} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          classes={{ root: classes.textField}}
          autoComplete='off'
          error={hasError('firstName')}
          helperText={
            hasError('firstName') ? formState.errors.lastName[0] : null
          }
          placeholder="FirstName"
          name="firstName"
          onChange={handleChange}
          value={formState.values.firstName || ''}
          fullWidth
          InputProps={{
            classes: {input: classes.input},
            startAdornment: (
              <InputAdornment position="start">
                <PermContactCalendarOutlinedIcon className={classes.icon} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          classes={{ root: classes.textField}}
          autoComplete='off'
          error={hasError('lastName')}
          helperText={
            hasError('lastName') ? formState.errors.lastName[0] : null
          }
          placeholder="Surname"
          name="lastName"
          onChange={handleChange}
          value={formState.values.lastName || ''}
          fullWidth
          InputProps={{
            classes: {input: classes.input},
            startAdornment: (
              <InputAdornment position="start">
                <PermContactCalendarOutlinedIcon className={classes.icon} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          classes={{ root: classes.textField}}
          autoComplete='off'
          error={hasError('referredBy')}
          fullWidth
          helperText={hasError('referredBy') ? formState.errors.referredBy[0] : null}
          placeholder="ReferredBy"
          name="referredBy"
          onChange={handleChange}
          value={formState.values.referredBy || ''}
          InputProps={{
            classes: {input: classes.input},
            startAdornment: (
              <InputAdornment position="start">
                <GroupOutlinedIcon className={classes.icon} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          classes={{ root: classes.textField}}
          autoComplete="off"
          error={hasError('password')}
          fullWidth
          helperText={
            hasError('password') ? formState.errors.password[0] : null
          }
          placeholder="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ''}
          InputProps={{
            classes: {input: classes.input},
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon className={classes.icon} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          classes={{ root: classes.textField}}
          autoComplete='off'
          error={hasError('confirmPassword')}
          fullWidth
          helperText={
            hasError('confirmPassword') ? formState.errors.confirmPassword[0] : null
          }
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          type="password"
          value={formState.values.confirmPassword || ''}
          InputProps={{
            classes: {input: classes.input},
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon className={classes.icon} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </div>
      <div>
        <div className={classes.policy}>
          <Checkbox
            checked={formState.values.policy || false}
            className={classes.policyCheckbox}
            color="primary"
            name="policy"
            onChange={handleChange}
          />
          <Typography
            color="textSecondary"
            variant="h4"
          >
            I have read and agree the
            {' '}
            <Button
              color="secondary"
              style={{ fontSize: 16 }}
              onClick={() => showTerms(true)}
            >
              Terms and Conditions
            </Button>
          </Typography>
        </div>
        {hasError('policy') && (
          <FormHelperText error>{formState.errors.policy[0]}</FormHelperText>
        )}
      </div>
      <Button
        className={classes.submitButton}
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        Sign Up
      </Button>
    </form>
  );
}

RegisterForm.propTypes = {
  className: PropTypes.string
};

export default RegisterForm;
