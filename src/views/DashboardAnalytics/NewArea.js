import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Paper, Typography, Button, Avatar
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 420,
    position: 'fixed',
    bottom: -3,
    right: 15,
    margin: theme.spacing(3),
    outline: 'none',
    zIndex: 2000
  },
  media: {
    padding: theme.spacing(2, 3),
    height: 180,
    textAlign: 'center',
    '& > img': {
      height: '100%',
      width: 'auto'
    }
  },
  content: {
    padding: theme.spacing(1, 2),
    backgroundColor: 'rgb(75, 108, 183)',
    width: 400,
    // height: 150,
    position: 'relative'
  },
  personal: {
    padding: '10px 0'
  },
  avatar: {
    position: 'absolute',
    top: -30,
    left: 20,
    width: 60,
    height: 60
  },
  actions: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end'
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    padding: '5px 0'
  },
  customer: {
    textAlign: 'center',
    padding: '5px 0'
  },
  agreeButton: {
    backgroundColor: 'rgb(75, 108, 183)',
    padding: '10px 6px',
    minWidth: 50
  }
}));

function NewArea({isChecked, onCheckHandle, data}) {
  const classes = useStyles();
  const userData = JSON.parse(localStorage.getItem('user'));
  const [open, setOpen] = useState(!isChecked);
  
  const handleClose = () => {
    setOpen(false);
    onCheckHandle();
  };
  
  if (!open) {
    return null;
  }

  const globalNews = data ? data.filter(item => item.userId === 0) : [];
  const personalNews = data ? data.filter(item => item.userId !== 0) : [];

  return (
    <Paper
      className={classes.root}
      elevation={3}
    >
      <div className={classes.content}>
        <Avatar src='/images/logos/news.jpeg' className={classes.avatar} />
        <Typography className={classes.title} variant="h4" gutterBottom>
          {userData.username}
        </Typography>
        <div>
        {
          globalNews.map((item, index) => (
            <Typography key={index} variant="body1" style={{ color: '#fff' }}>
              {item.news}
          </Typography>
          ))
        }
        </div>
        <div className={classes.personal}>
        {
          personalNews.map((item, index) => (
            <Typography key={index} variant="body1" style={{ color: '#fff' }}>
              {item.news}
          </Typography>
          ))
        }
        </div>
      </div>
      <div className={classes.customer}>
        <Typography className={classes.customer} variant="h4">
          Support
        </Typography>
      </div>
      <div className={classes.actions}>
        <Button
          className={classes.agreeButton}
          color="primary"
          onClick={handleClose}
          variant="contained"
        >
          <CloseIcon style={{ fontSize: 30 }} />
        </Button>
      </div>
    </Paper>
  );
}

export default NewArea;
