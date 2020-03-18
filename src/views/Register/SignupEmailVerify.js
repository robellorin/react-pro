import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardContent,
  CircularProgress
} from '@material-ui/core';

import Page from 'src/components/Page';
import AuthBackground from 'src/components/AuthBackground';
import { sendSignupEmailVerification, resendSignupEmailVerification } from 'src/actions';

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
    padding: theme.spacing(8, 4, 3, 4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400
  },
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  errorWrapper: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
    padding: theme.spacing(3)
  },
  successWrapper: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.success.main,
    padding: theme.spacing(3)
  },
  button: {
    margin: 5
  }
}));

function SignupEmailVerify({ match, history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const { token } = match.params;
  const [loading, setLoading] = useState(session.loading);

  useEffect(() => {
    dispatch(sendSignupEmailVerification(token, history));
  }, [dispatch, history, token]);

  useEffect(() => {
    setLoading(session.loading);
  }, [loading, session, history]);

  const resendLink = () => {
    const verifyUser = localStorage.getItem('verifyUser');
    dispatch(resendSignupEmailVerification(verifyUser));
  }

  return (
    <Page
      className={classes.root}
      title="Email Verification"
    >
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          {
            loading &&
            <CircularProgress />
          }
          {
            !loading &&
            <div className={classes.wrapper}>
              <div className={clsx({
                [classes.errorWrapper]: session.message.indexOf('Success') < 0,
                [classes.successWrapper]: session.message.indexOf('Success') > -1
              })}>
                {session.message}
              </div>
              <div>
                <Button
                  color="primary"
                  component={RouterLink}
                  to="/"
                  variant="outlined"
                >
                  Back to home
                </Button>
                <Button
                  className={classes.button}
                  color="primary"
                  onClick = {resendLink}
                  variant="outlined"
                >
                  resend link
                </Button>
              </div>
            </div>
          }
        </CardContent>
        <AuthBackground type="login" />
      </Card>
    </Page>
  );
}

export default SignupEmailVerify;
