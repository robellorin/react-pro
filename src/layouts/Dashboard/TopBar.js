/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  colors,
  Avatar,
  Typography

} from '@material-ui/core';

import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import axios from 'src/utils/axios';
import NotificationsPopover from 'src/components/NotificationsPopover';
import { logout } from 'src/actions';
import * as constant from 'src/constant';

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
  notificationsBadge: {
    backgroundColor: colors.orange[600]
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

function TopBar({
  onOpenNavBarMobile,
  className,
  session,
  ...rest
}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const notificationsRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openChatBar, setOpenChatBar] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  const handleLogout = () => {
    history.push('/auth/login');
    dispatch({type: constant.CHECKING_NEWS, payload: false});
    dispatch(logout());
  };
 

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };
  
  useEffect(() => {
    let mounted = true;

    const fetchNotifications = () => {
      axios.get('/api/account/notifications').then((response) => {
        if (mounted) {
          setNotifications(response.data.notifications);
        }
      });
    };

    fetchNotifications();

    return () => {
      mounted = false;
    };
  }, []);

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
            <Avatar alt='user' src={gravatar.url(session.user.username, {s: '200', r: 'pg', d: 'retro'}, false)} variant="rounded" ></Avatar>
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
        notifications={notifications}
        onClose={handleNotificationsClose}
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
