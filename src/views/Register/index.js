import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Divider,
  Link,
  Hidden
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from 'src/components/Alert';
import Page from 'src/components/Page';
import RegisterForm from './RegisterForm';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    background: '#ffffff'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    height: '100vh'
  },
  greetingWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 45,
    '@media (max-width: 1550px)': {
      '& $hello': {
        fontSize: 40
      },
      '& $greetings': {
        fontSize: 17
      },
      '& $signup': {
        transform: 'scale(0.8)'
      }
    },
    '@media (max-height: 945px)': {
      '& $hello': {
        fontSize: 40
      },
      '& $greetings': {
        fontSize: 17
      },
      '& $signup': {
        transform: 'scale(0.8)'
      }
    },
    '@media (max-height: 820px)': {
      '& $hello': {
        fontSize: 35
      },
      '& $greetings': {
        fontSize: 15
      },
      '& $signup': {
        transform: 'scale(0.7)'
      }
    },
    '@media (max-height: 737px)': {
      '& $hello': {
        fontSize: 30
      },
      '& $greetings': {
        fontSize: 13
      },
      '& $signup': {
        transform: 'scale(0.6)'
      }
    }
  },
  hello: {
    fontSize: 45,
    color: '#ffffff',
    fontFamily: 'TT Hoves',
    fontWeight: 'bold',
    lineHeight: '48px'
  },
  greetings: {
    fontSize: 20,
    lineHeight: '27px',
    color: '#ffffff',
    fontFamily: 'TT Hoves',
    fontWeight: 500,
    textAlign: 'center',
    padding: '25px 0'
  },
  signup: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'TT Hoves',
    fontWeight: 500,
    textTransform: 'capitalize',
    width: 254,
    height: 78,
    borderRadius: 15,
    marginTop: 10,
    filter: 'drop-shadow(0 0 12.5px rgba(0,0,0,0.03))',
    backgroundColor: '#512dd9',
    border: '3px solid #37c566',
    '&:hover': {
      backgroundColor: '#4404e0c4'
    }
  },
  formWrapper: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 1550px)': {
      transform: 'scale(0.8)'
    },
    '@media (max-height: 945px)': {
      transform: 'scale(0.8)'
    },
    '@media (max-height: 670px)': {
      transform: 'scale(0.7)'
    }
  },
  title: {
    fontSize: 60,
    lineHeight: '70px',
    color: '#37c566',
    fontFamily: 'TT Hoves',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 25,
    color: '#161e33',
    fontFamily: 'TT Hoves',
    fontWeight: 500,
    textAlign: 'center',
    lineHeight: '25px',
    padding: '10px 0 5px 0'
  },
  signupForm: {
    marginTop: 40,
    width: 600,
    '@media (max-width: 750px)': {
      width: 500
    }
  },
  link: {
    fontSize: 25,
    color: '#37c566',
    fontFamily: 'TT Hoves',
    fontWeight: 500,
    marginTop: 25
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
      
      <div className={classes.container}>
        <Hidden mdDown>
          <div style={{ position: 'relative', filter: 'drop-shadow(0px 5px 24.5px rgba(33,51,109,0.56))' }}>
            <img src='/images/auth/bg.png' alt='background' style={{ height: '100vh' }} />
            <div className={classes.greetingWrapper}>
              <Typography className={classes.hello}>Welcome to Udevia</Typography>
              <Typography className={classes.greetings}>
                The land where dreams come true. Access more insights in your Dashboard and learn how you can make Big Data work for you.
              </Typography>
            </div>
          </div>
        </Hidden>
        <div className={classes.formWrapper}>
          <Typography className={classes.title}>
          Sign Up
          </Typography>
          <RegisterForm className={classes.signupForm} />
          <Divider className={classes.divider} />
          <Link
            className={classes.link}
            align="center"
            color="secondary"
            component={RouterLink}
            to="/auth/login"
            underline="always"
            variant="subtitle2"
          >
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </Page>
  );
}

export default Register;
