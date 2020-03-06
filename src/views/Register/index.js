import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Link,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import Snackbar from '@material-ui/core/Snackbar';

import Alert from 'src/components/Alert';
import gradients from 'src/utils/gradients';
import Page from 'src/components/Page';
import AuthBackground from 'src/components/AuthBackground';

import RegisterForm from './RegisterForm';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 2)
  },
  card: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  icon: {
    backgroundImage: gradients.orange,
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32
  },
  registerForm: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  person: {
    marginTop: theme.spacing(2),
    display: 'flex'
  }
}));

function Register() {
  const classes = useStyles();
  const session = useSelector(state => state.session);
  const history = useHistory();
  const [loading, setLoading] = useState(session.loading);
  const [message, setMessage] = useState('');
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (loading && !session.loading && session.message) {
      setMessage(session.message);
      setOpen(true);
    } else if (loading && !session.loading && session.error) {
      setMessage(session.error);
      setOpen(true);
    }
    setLoading(session.loading);
  }, [message, session, loading]);

  const handleClose = () => {
    setOpen(false);
    setMessage('');
    if (session.message) history.push('/');
  }

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert variant={session.message ? 'success' : 'error'} message={message} />
      </Snackbar>
      
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <PersonAddIcon className={classes.icon} />
          <Typography
            gutterBottom
            variant="h3"
          >
            Sign up
          </Typography>
          <Typography variant="subtitle2">
            Sign up on the internal platform
          </Typography>
          <RegisterForm className={classes.registerForm} />
          <Divider className={classes.divider} />
          <Link
            align="center"
            color="secondary"
            component={RouterLink}
            to="/auth/login"
            underline="always"
            variant="subtitle2"
          >
            Have an account?
          </Link>
        </CardContent>
        <AuthBackground type="register" />
      </Card>
    </Page>
  );
}

export default Register;
