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

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    '@media all and (-ms-high-contrast:none)': {
      height: 0 // IE11 fix
    }
  },
  content: {
    paddingTop: 64,
    flexGrow: 1,
    maxWidth: '100%',
    overflowX: 'hidden',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: 56
    }
  }
}));

function Dashboard({ route }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const userData = localStorage.getItem('user');
  useEffect(() => {
    if (userData && !session.user.username) {
      dispatch({
        type: constant.SET_USER_DATA,
        data: JSON.parse(userData)
      })
    }
  }, [session, dispatch, userData]);

  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);
  return (
    userData
    ? <>
        <NavBar
          onMobileClose={() => setOpenNavBarMobile(false)}
          openMobile={openNavBarMobile}
          role={session.user.role}
        />
        <TopBar onOpenNavBarMobile={() => setOpenNavBarMobile(true)} />
        <div className={classes.container}>
          <div className={classes.content}>
            <Suspense fallback={<LinearProgress />}>
              {renderRoutes(route.routes)}
            </Suspense>
          </div>
        </div>
      </>
    : <Redirect to="/auth/login" />
  );
}

Dashboard.propTypes = {
  route: PropTypes.object
};

export default Dashboard;
