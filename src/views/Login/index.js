import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Hidden,
  Button
} from '@material-ui/core';
import Page from 'src/components/Page';
import LoginForm from './LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
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
  },
  hello: {
    fontSize: 48,
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
    padding: 25
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
    backgroundColor: '#ffffff'
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
  loginForm: {
    marginTop: 40,
    width: 600,
    '@media (max-width: 750px)': {
      width: 500
    }
  }
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  
  const handleChange = (value) => {
    setEmail(value);
  }

  const sendRequest = () => {
    localStorage.setItem('email', email);
  }

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <div className={classes.container}>
        <Hidden mdDown>
          <div style={{ position: 'relative', filter: 'drop-shadow(0px 5px 24.5px rgba(33,51,109,0.56))' }}>
            <img src='/images/auth/bg.png' alt='background' style={{ height: '100vh' }} />
            <div className={classes.greetingWrapper}>
              <Typography className={classes.hello}>Hello Welcome</Typography>
              <Typography className={classes.greetings}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              </Typography>
              <Button
                className={classes.signup}
                component={RouterLink}
                variant="outlined"
                to="/auth/register"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </Hidden>
        <div className={classes.formWrapper}>
          <Typography className={classes.title}>
            Sign in
          </Typography>
          <Typography className={classes.subTitle}>
            Sign in on the internal platform
          </Typography>
          <LoginForm className={classes.loginForm} onChange={handleChange} sendRequest={sendRequest} />
        </div>
      </div>
    </Page>
  );
}

export default Login;
