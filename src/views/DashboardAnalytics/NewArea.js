import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Paper, Typography, IconButton, ListItem, Button
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import moment from 'moment';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 420,
    position: 'fixed',
    bottom: 82,
    margin: theme.spacing(3),
    outline: 'none',
    zIndex: 2000,
    width: 287,
    height: 412,
    boxShadow: '-8px 3px 32px rgba(67, 67, 67, 0.06)',
    backgroundColor: '#ffffff'
  },
  open: {
    right: 7,
    transition: theme.transitions.create('right', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  close: {
    right: -315,
    transition: theme.transitions.create('right', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  header: {
    backgroundColor: '#4E2CD4',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 15
  },
  headerText: {
    color: '#ffffff',
    '&:first-child': {
      fontSize: 14,
      lineHeight: 1.43,
      fontWeight: 500
    },
    '&:last-child': {
      fontSize: 12,
      lineHeight: 1.5,
      fontWeight: 'normal'
    }
  },
  backButton: {
    padding: '0 10px 0 0'
  },
  backIcon: {
    color: '#7e919a',
    fontSize: 20
  },
  categoryItem: {
    borderBottom: '1px solid #E2E7EB',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 15px 10px 15px'
  },
  categoryText: {
    '&:first-child': {
      fontSize: 14,
      lineHeight: 1.43,
      fontWeight: 500,
      color: '#333333'
    },
    '&:last-child': {
      fontSize: 12,
      lineHeight: 1.5,
      fontWeight: 'normal',
      color: '#4F4F4F'
    }
  },
  timeText: {
    textAlign: 'right',
    fontSize: 12,
    lineHeight: 1.5,
    fontWeight: 'normal',
    color: '#828282'
  },
  itemWrapper: {
    borderBottom: '1px solid #E2E7EB',
    padding: '12px 15px 10px 15px'
  },
  itemTime: {
    fontSize: 12,
    lineHeight: 1.5,
    fontWeight: 500,
    textAlign: 'center',
    color: '#333333',
    paddingBottom: 5
  },
  itemContent: {
    fontSize: 12,
    lineHeight: 1.5,
    fontWeight: 'normal',
    color: '#4f4f4f'
  },
  gotButton: {
    backgroundColor: '#4E2CD4',
    borderRadius: 8,
    color: '#ffffff',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#4E2CD4',
      opacity: 0.8
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'auto'
  },
  listWrapper: {
    overflow: 'auto',
    flex: 1
  }
}));

const title = ['Your dialogue', 'Notifications', 'News'];

function NewArea({
  isChecked, notification, removeNotifications
}) {
  const classes = useStyles();
  // const userData = JSON.parse(localStorage.getItem('user'));
  const [open, setOpen] = useState(isChecked);
  const [state, setState] = useState(0);
  const notifications = notification.data.filter((item) => item.type !== 'news');
  const news = notification.data.filter((item) => item.type === 'news');
  const lastNotification = notifications[0] ?? { notification: 'No notifications to show', createdAt: new Date() };
  const lastNews = news[0] ?? { notification: 'No notifications to show', createdAt: new Date() };

  React.useEffect(() => {
    setOpen(isChecked);
  }, [isChecked]);

  const onClickBack = () => {
    setState(0);
  };

  const onClickGotIt = () => {
    removeNotifications(title[state]);
  };

  return (
    <Paper
      className={clsx(classes.root, {
        [classes.open]: open,
        [classes.close]: !open
      })}
      elevation={3}
    >
      <div className={classes.header}>
        {state > 0 && (
          <IconButton className={classes.backButton} onClick={onClickBack}>
            <ArrowBackIcon className={classes.backIcon} />
          </IconButton>
        )}
        <div>
          <Typography className={classes.headerText}>Udevia</Typography>
          <Typography className={classes.headerText}>{title[state]}</Typography>
        </div>
      </div>
      {state === 0 && (
        <div>
          <ListItem
            className={classes.categoryItem}
            button
            onClick={() => setState(1)}
          >
            <div>
              <Typography className={classes.categoryText}>
                Notifications
              </Typography>
              <Typography className={classes.categoryText}>
                {lastNotification.notification.length < 30
                  ? lastNotification.notification
                  : `${lastNotification.notification.substr(0, 30)}...`}
              </Typography>
            </div>
            <Typography className={classes.timeText}>
              {moment(lastNotification.createdAt).date()
              === new Date().getDate()
                ? moment(lastNotification.createdAt).format('hh:mm')
                : moment(lastNotification.createdAt).format('DD/MM')}
            </Typography>
          </ListItem>
          <ListItem
            className={classes.categoryItem}
            button
            onClick={() => setState(2)}
          >
            <div>
              <Typography className={classes.categoryText}>News</Typography>
              <Typography className={classes.categoryText}>
                {lastNews.notification.length < 30
                  ? lastNews.notification
                  : `${lastNews.notification.substr(0, 30)}...`}
              </Typography>
            </div>
            <Typography className={classes.timeText}>
              {moment(lastNews.createdAt).date() === new Date().getDate()
                ? moment(lastNews.createdAt).format('hh:mm')
                : moment(lastNews.createdAt).format('DD/MM')}
            </Typography>
          </ListItem>
        </div>
      )}
      {state > 0 && (
        <div className={classes.container}>
          <div className={classes.listWrapper}>
            {state === 1
              ? notifications.map((item) => (
                <div key={item.id} className={classes.itemWrapper}>
                  <Typography className={classes.itemTime}>
                    {moment(item.createdAt).date() === new Date().getDate()
                      ? moment(item.createdAt).format('hh:mm')
                      : moment(item.createdAt).format('dddd, Do MMMM')}
                  </Typography>
                  <Typography className={classes.itemContent}>
                    {item.notification}
                  </Typography>
                </div>
              ))
              : news.map((item) => (
                <div key={item.id} className={classes.itemWrapper}>
                  <Typography className={classes.itemTime}>
                    {moment(item.createdAt).date() === new Date().getDate()
                      ? moment(item.createdAt).format('hh:mm')
                      : moment(item.createdAt).format('dddd, Do MMMM')}
                  </Typography>
                  <Typography className={classes.itemContent}>
                    {item.notification}
                  </Typography>
                </div>
              ))}
          </div>
          <div style={{ padding: 15, width: '100%' }}>
            <Button
              className={classes.gotButton}
              fullWidth
              onClick={onClickGotIt}
            >
              Got it!
            </Button>
          </div>
        </div>
      )}
    </Paper>
  );
}

export default NewArea;
