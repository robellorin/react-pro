import React, { Suspense, useState, useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import TopBar from './TopBar';
import * as constant from 'src/constant';
import socket from 'src/components/Socket';
import { getNotifications, getAllUsers } from 'src/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundImage: 'url("/images/navbar-bg.png")',
  },
  rightWrapper: {
    zIndex: theme.zIndex.drawer + 1,
    flexGrow: 1
  },
  topBar: {
    [theme.breakpoints.up('sm')]: {
      borderTopLeftRadius: 30
    }
  },
  container: {
    minHeight: 'calc(100vh - 165px)',
    display: 'flex',
    backgroundColor: '#f4f6f8',
    borderBottomLeftRadius: 30,
    padding: '0 15px',
    '@media all and (-ms-high-contrast:none)': {
      height: 0 // IE11 fix
    }
  },
  content: {
    flexGrow: 1,
    maxWidth: '100%',
    overflowX: 'hidden',
  }
}));

function Dashboard({ route }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const supportData = useSelector(state => state.supportData);
  const notification = useSelector(state => state.notification);
  const userData = localStorage.getItem('user');
  const [user, setUser] = useState('');
  
  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);
  useEffect(() => {
    const receivedMessage = () => {
      dispatch(getNotifications());
    };
    
    if (session.user.id) {
      window.$client = socket(session.user);
      window.$client.registerHandler(receivedMessage);
    }
  }, [session, dispatch]);
  useEffect(() => {
    if (userData && !session.user.username) {
      dispatch({
        type: constant.SET_USER_DATA,
        data: JSON.parse(userData)
      })
    }
  }, [session, dispatch, userData]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const selectUser = (selectedUser) => {
    setUser(selectedUser);
  }

  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);
   
  return (
    userData
    ? <div className={classes.root}>
        <NavBar
          onMobileClose={() => setOpenNavBarMobile(false)}
          openMobile={openNavBarMobile}
          role={session.user.role}
        />
        <div className={classes.rightWrapper}>
          <TopBar
            className={classes.topBar}
            position="sticky"
            session={session}
            notification={notification}
            users={supportData.users}
            selectUser={selectUser}
            onOpenNavBarMobile={() => setOpenNavBarMobile(true)}
          />
          <div className={classes.container}>
            <div className={classes.content}>
              <Suspense fallback={<LinearProgress />}>
                {renderRoutes(route.routes, { selectedUser: user })}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    : <Redirect to="/auth/login" />
  );
}

Dashboard.propTypes = {
  route: PropTypes.object
};

export default Dashboard;
