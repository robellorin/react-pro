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
  signupWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20,
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'TT Hoves',
    color: '#60686d'
  },
  signup: {
    fontSize: 15,
    fontWeight: 500,
    color: '#60686d',
    marginLeft: 15,
    textTransform: 'none',
    borderRadius: 15,
    backgroundColor: '#ffffff',
    padding: '3px 15px',
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
              <Typography className={classes.hello}>Welcome to Udevia</Typography>
              <Typography className={classes.greetings}>
                The land where dreams come true. Access more insights in your Dashboard and learn how you can make Big Data work for you. 
              </Typography>
            </div>
          </div>
        </Hidden>
        <div className={classes.formWrapper}>
          <Typography className={classes.title}>
            Sign In
          </Typography>
          <LoginForm className={classes.loginForm} onChange={handleChange} sendRequest={sendRequest} />
        </div>
      </div>
      <div className={classes.signupWrapper}>
        <p>Dont't have an account?</p>
        <Button
          className={classes.signup}
          component={RouterLink}
          variant="outlined"
          to="/auth/register"
        >
          Get started
        </Button>
      </div>
    </Page>
  );
}

export default Login;
