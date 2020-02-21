/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './layouts/Auth';
import ErrorLayout from './layouts/Error';
import DashboardLayout from './layouts/Dashboard';
import DashboardAnalyticsView from './views/DashboardAnalytics';
import DashboardDefaultView from './views/DashboardDefault';

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
        path: '/auth/register',
        exact: true,
        component: lazy(() => import('src/views/Register'))
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
        component: DashboardAnalyticsView
      },
      {
        path: '/dashboards/default',
        exact: true,
        component: DashboardDefaultView
      },
      {
        path: '/kanban-board',
        exact: true,
        component: lazy(() => import('src/views/KanbanBoard'))
      },
      {
        path: '/management/customers',
        exact: true,
        component: lazy(() => import('src/views/CustomerManagementList'))
      },
      {
        path: '/management/customers/:id',
        exact: true,
        component: lazy(() => import('src/views/CustomerManagementDetails'))
      },
      {
        path: '/management/customers/:id/:tab',
        exact: true,
        component: lazy(() => import('src/views/CustomerManagementDetails'))
      },
      {
        path: '/management/projects',
        exact: true,
        component: lazy(() => import('src/views/ProjectManagementList'))
      },
      {
        path: '/management/orders',
        exact: true,
        component: lazy(() => import('src/views/OrderManagementList'))
      },
      {
        path: '/management/orders/:id',
        exact: true,
        component: lazy(() => import('src/views/OrderManagementDetails'))
      },
      {
        path: '/profile/:id',
        exact: true,
        component: lazy(() => import('src/views/Profile'))
      },
      {
        path: '/profile/:id/:tab',
        exact: true,
        component: lazy(() => import('src/views/Profile'))
      },
      {
        path: '/projects/create',
        exact: true,
        component: lazy(() => import('src/views/ProjectCreate'))
      },
      {
        path: '/settings',
        exact: true,
        component: lazy(() => import('src/views/Settings'))
      },
      {
        path: '/settings/:tab',
        exact: true,
        component: lazy(() => import('src/views/Settings'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];
