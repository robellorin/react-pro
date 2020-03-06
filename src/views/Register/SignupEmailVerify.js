import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardContent,
  CircularProgress
} from '@material-ui/core';

import Page from 'src/components/Page';
import AuthBackground from 'src/components/AuthBackground';
import { sendSignupEmailVerification } from 'src/actions';

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

  return (
    <Page
      className={classes.root}
      title="Email Verify"
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
              <div className={classes.errorWrapper}>
                Email Verification is failed.
              </div>
              <Button
                color="primary"
                component={RouterLink}
                to="/"
                variant="outlined"
              >
                Back to home
              </Button>
            </div>
          }
        </CardContent>
        <AuthBackground type="login" />
      </Card>
    </Page>
  );
}

export default SignupEmailVerify;
