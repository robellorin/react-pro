/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Avatar,
  Typography

} from '@material-ui/core';

import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import NotificationsPopover from 'src/components/NotificationsPopover';
import { logout } from 'src/actions';
import * as constant from 'src/constant';
import socket from 'src/components/Socket';

const gravatar = require('gravatar');

const useStyles = makeStyles((theme) => ({
  root: {
    // boxShadow: 'none',
    backgroundColor: '#ffffff',
    padding: '10px 0'
  },
  flexGrow: {
    flexGrow: 1
  },
    
  menuButton: {
    marginRight: theme.spacing(1)
  },
  chatButton: {
    marginLeft: theme.spacing(1)
  },
  notificationsButton: {
    marginLeft: theme.spacing(1)
  },
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  avatar: {
    boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)`,
  },
  logoutButton: {
    textTransform: 'capitalize',
    marginLeft: theme.spacing(2),
    color: '#6f889d'
  },
  logoutIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    height: 10,
    width: 10,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

function TopBar({
  onOpenNavBarMobile,
  className,
  session,
  notification,
  ...rest
}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const notificationsRef = useRef(null);
  const [openNotifications, setOpenNotifications] = useState(false);
    
  const handleLogout = () => {
    const client = socket(session.user);
    history.push('/auth/login');
    client.leave(session.user.id);
    dispatch({type: constant.CHECKING_NEWS, payload: false});
    dispatch(logout());
  };
 

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    dispatch({
      type: constant.SET_NOTIFICATION, value: false
    });
    setOpenNotifications(false);
  };

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <Hidden smUp>
          <IconButton
            className={classes.menuButton}
            color="primary"
            onClick={onOpenNavBarMobile}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <RouterLink to="/">
        <div style={{ padding: '8px 20px' }}>
          <img
            alt="Logo"
            src="/images/logos/logo.png"
          />
        </div>
      </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <Button onClick={handleNotificationsOpen} ref={notificationsRef}>
            { 
              notification && notification.isNotification &&
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  variant="dot"
                >
                  <Avatar className={classes.avatar} alt='user' src={gravatar.url(session.user.username, {s: '200', r: 'pg', d: 'retro'}, false)} variant="rounded" />
                </StyledBadge>
            }
            { 
              (!notification || !notification.isNotification) &&
              <Avatar className={classes.avatar} alt='user' src={gravatar.url(session.user.username, {s: '200', r: 'pg', d: 'retro'}, false)} variant="rounded" />
            }              
            <Typography style={{ padding: '0 5px', color: 'darkslategray', textTransform: 'capitalize' }}>{session.user.surname}</Typography>
            <ArrowDropDownIcon />
          </Button>
        </Hidden>
        <Button
          className={classes.logoutButton}
          color="inherit"
          onClick={handleLogout}
        >
          Log out
          <InputIcon className={classes.logoutIcon} />
        </Button>
      </Toolbar>
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notification.data}
        onClose={handleNotificationsClose}
        handleNotificationsClose={handleNotificationsClose}
        open={openNotifications}
      />
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default TopBar;
