/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
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
  Typography,
  InputAdornment,
  TextField

} from '@material-ui/core';

import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import NotificationsPopover from 'src/components/NotificationsPopover';
import UserListPopover from 'src/components/UserListPopover';
import { logout } from 'src/actions';
import * as constant from 'src/constant';
import socket from 'src/components/Socket';
import Avatar from 'src/components/Avatar';
import SmsIcon from '@material-ui/icons/Sms';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PaymentIcon from '@material-ui/icons/Payment';
import LockIcon from '@material-ui/icons/Lock';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffffff',
    padding: '20px 20px 10px 30px',
    boxShadow: 'none',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#eeeeef'
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
  logoutButton: {
    marginLeft: theme.spacing(3),
  },
  logoutIcon: {
    marginLeft: theme.spacing(1),
    color: '#60686d'
  },
  toolbar: {
    fontSize: 16,
    color: '#60686d',
    fontFamily: 'TT Hoves',
    fontWeight: 500,
    '& p, $logoutButton': {
      textTransform: 'capitalize'
    }
  },
  titleWrapper: {
    color: '#8f9da4',
    padding: '26px 30px 5px 44px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontSize: 23,
    color: '#8f9da4',
    fontFamily: 'TT Hoves',
    fontWeight: 500,
    paddingLeft: 10,
    [theme.breakpoints.down('md')]: {
      fontSize: 20
    }
  },
  userInput: {
    padding: 0,
    '& .MuiOutlinedInput-adornedEnd ': {
      padding: 0
    },
    '& .MuiInputBase-input': {
      padding: 10
    }
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
  users,
  selectUser,
  ...rest
}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const notificationsRef = useRef(null);
  const userListRef = useRef(null);
  const inputRef = React.useRef();
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openUserList, setOpenUserList] = useState(false);
  const [user, setUser] = useState('');
  const [filteredUsers, setUsers] = useState(users);
  let headerData = {};
  let showUsers = false;
  if (history.location.pathname.indexOf('analytics') >= 0) {
    headerData = {
      icon: EqualizerIcon,
      title: 'Analytics Overview' 
    }
    showUsers = true;
  }
  if (history.location.pathname.indexOf('credentials') >= 0) {
    headerData = {
      icon: LockIcon,
      title: 'Bookmaker Accounts' 
    }
    showUsers = true;
  }
  if (history.location.pathname.indexOf('payment') >= 0) {
    headerData = {
      icon: PaymentIcon,
      title: 'Payments' 
    }
    showUsers = true;
  }
  if (history.location.pathname.indexOf('ticket') >= 0) {
    headerData = {
      icon: SmsIcon,
      title: 'Support' 
    }
    showUsers = false;
  }
  if (history.location.pathname.indexOf('support') >= 0) {
    headerData = {
      icon: ChatBubbleIcon,
      title: 'News' 
    }
    showUsers = false;
  }

  useEffect(() => {
    setUsers(users);
  }, [users]);
    
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

  const handleSelectUser = (user) => {
    setUser(`${user.firstname} ${user.surname}`);
    setOpenUserList(false);
    selectUser(user);
  }

  const handleFilter = (event) => {
    event.persist();
    setUser(event.target.value);
    const keywords = event.target.value.toLowerCase();
    const tempUsers = users.filter((item) => (`${item.firstname} ${item.surname}`.toLowerCase().includes(keywords)));
    setUsers(tempUsers);
    setOpenUserList(true);
  }

  const handleClickIcon = () => {
    setOpenUserList((prev) => !prev);
  }

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar className={classes.toolbar}>
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
                <Avatar role={session.user.role} />
                </StyledBadge>
            }
            { 
              (!notification || !notification.isNotification) &&
              <Avatar role={session.user.role} />
            }              
            <Typography style={{ marginLeft: 10 }}>{`${session.user.firstname} ${session.user.surname}`}</Typography>
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
      <div className={classes.titleWrapper}>
        <div style={{ display: 'flex' }}>
          {<headerData.icon />}
          <Typography className={classes.headerTitle}>{headerData.title}</Typography>
        </div>
        <div>
          {
            (session.user.role === 'support' || session.user.role === 'admin') &&  showUsers &&
            <TextField
              ref={userListRef}
              inputRef={inputRef}
              fullWidth
              className={classes.userInput}
              value={user}
              onChange={handleFilter}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      style={{ padding: 0 }}
                      onClick={handleClickIcon}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      <ArrowDropDownIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              variant='outlined'
            />
          }
        </div>
      </div>
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notification.data}
        onClose={handleNotificationsClose}
        handleNotificationsClose={handleNotificationsClose}
        open={openNotifications}
      />
      {
        openUserList &&
          <UserListPopover
            users={filteredUsers}
            handleSelectUser={handleSelectUser}
          />
      }
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default TopBar;
