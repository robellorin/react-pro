import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Hidden,
  Typography,
  Divider,
  Link,
  TextField,
  Button,
  Snackbar,
  InputAdornment
} from '@material-ui/core';

import Alert from 'src/components/Alert';
import Page from 'src/components/Page';
import { forgotPassword } from 'src/actions';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

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
    '@media (max-height: 670px)': {
      '& $hello': {
        fontSize: 35
      },
      '& $greetings': {
        fontSize: 15
      },
      '& $signup': {
        transform: 'scale(0.6)'
      }
    }
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
    marginTop: 40,
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
  }
}));

function ForgotPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState(localStorage.getItem('email'));
  const [open, setOpen] = React.useState(false);
  
  const sendRequest = () => {
    dispatch(forgotPassword(email));
    setOpen(true);
  }

  const handleChange = (event) => {
    event.persist();
    setEmail(event.target.value);
  }
  return (
    <Page
      className={classes.root}
      title="Forgot Password"
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
        <Alert variant="success" message="sent email" />
      </Snackbar>
      <div className={classes.container}>
        <Hidden mdDown>
          <div style={{ position: 'relative', filter: 'drop-shadow(0px 5px 24.5px rgba(33,51,109,0.56))' }}>
            <img src='/images/auth/bg.png' alt='background' style={{ height: '100vh' }} />
            <div className={classes.greetingWrapper}>
              <Typography className={classes.hello}>Hello Welcome</Typography>
              <Typography className={classes.greetings}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              </Typography>
            </div>
          </div>
        </Hidden>
        <div className={classes.formWrapper}>
          <Typography className={classes.title}>
            Forgot Password
          </Typography>
          <Typography className={classes.subTitle}>
            <div>Please enter your email and we will send you a</div>
            <div>link to reset your password.</div>
          </Typography>
          <div>
            <TextField
            classes={{ root: classes.textField}}
              fullWidth
              style={{marginTop: 25}}
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleChange}
              value={email}
              autoComplete='off'
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
            <Button
              className={classes.submitButton}
              color="secondary"
              onClick={sendRequest}
              size="large"
              type="button"
              variant="contained"
            >
              Resend
            </Button>
          </div>
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
            Go back
          </Link>
        </div>
      </div>
    </Page>
  );
}

export default ForgotPassword;
