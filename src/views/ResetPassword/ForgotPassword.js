import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Link,
  TextField,
  Button,
  Snackbar
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

import Alert from 'src/components/Alert';
import Page from 'src/components/Page';
import gradients from 'src/utils/gradients';
import { forgotPassword } from 'src/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 2)
  },
  card: {
    width: theme.breakpoints.values.sm,
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
    backgroundImage: gradients.green,
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
  resendButton: {
    marginTop: theme.spacing(4),
    width: '100%'
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  person: {
    marginTop: theme.spacing(2),
    display: 'flex'
  },
  linkWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
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
      title="Login"
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
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography
            gutterBottom
            variant="h3"
            style={{marginBottom: 25}}
          >
            Account Recovery
          </Typography>
          <Typography variant="subtitle2">
            We will send link to your email for reset password.
          </Typography>
          <Typography variant="subtitle2">
            If you didn't receive email within 15 minutes, please click send button again.
          </Typography>
          <TextField
            fullWidth
            style={{marginTop: 25}}
            label="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={email}
            variant="outlined"
          />
          <Button
            className={classes.resendButton}
            color="secondary"
            onClick={sendRequest}
            size="large"
            type="button"
            variant="contained"
          >
            Resend
          </Button>
          <Divider className={classes.divider} />
          <Link
            align="center"
            color="secondary"
            component={RouterLink}
            to="/auth/login"
            underline="always"
            variant="subtitle2"
          >
            Go back
          </Link>
        </CardContent>
      </Card>
    </Page>
  );
}

export default ForgotPassword;
