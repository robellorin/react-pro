/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './layouts/Auth';
import ErrorLayout from './layouts/Error';
import DashboardLayout from './layouts/Dashboard';

export default [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to={localStorage.getItem('user') ? "/dashboards/analytics" : "/auth/login"} />
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('src/views/Login'))
      },
      {
        path: '/auth/signup-verify-email/:token',
        exact: true,
        component: lazy(() => import('src/views/Register/SignupEmailVerify'))
      },
      {
        path: '/auth/register',
        exact: true,
        component: lazy(() => import('src/views/Register'))
      },
      {
        path: '/auth/forgot-password',
        exact: true,
        component: lazy(() => import('src/views/ResetPassword/ForgotPassword'))
      },
      {
        path: '/auth/reset-password/:token',
        exact: true,
        component: lazy(() => import('src/views/ResetPassword'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('src/views/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('src/views/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('src/views/Error500'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/ticket',
        exact: true,
        component: lazy(() => import('src/views/Ticket'))
      },
      {
        path: '/ticket/:id',
        exact: true,
        component: lazy(() => import('src/views/Ticket'))
      },
      {
        path: '/dashboards/analytics',
        exact: true,
        component: lazy(() => import('src/views/DashboardAnalytics'))
      },
      {
        path: '/credentials',
        exact: true,
        component: lazy(() => import('src/views/Credentials'))
      },
      {
        path: '/payment/invoices',
        exact: true,
        component: lazy(() => import('src/views/Payment/Invoices'))
      },
      {
        path: '/payment/checkout',
        exact: true,
        component: lazy(() => import('src/views/Payment/Checkout'))
      },
      {
        path: '/support',
        exact: true,
        component: lazy(() => import('src/views/Support'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      },
      
    ]
  }
];
