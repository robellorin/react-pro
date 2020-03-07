/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { colors } from '@material-ui/core';
// import BarChartIcon from '@material-ui/icons/BarChart';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import PaymentIcon from '@material-ui/icons/Payment';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Label from 'src/components/Label';

export default [
  {
    subheader: 'Pages',
    items: [
      {
        title: 'ANALYTICS OVERVIEW',
        href: '/dashboards/analytics',
        icon: DashboardIcon
      },
      {
        title: 'BOOKMAKER ACCOUNTS',
        href: '/credentials',
        icon: LockOpenIcon,
      },
      {
        title: 'PAYMENTS',
        href: '/payment/invoices',
        icon: PaymentIcon,
      },
      {
        title: 'TICKETS',
        href: '/ticket',
        icon: ChatIcon,
        label: () => (
          <Label
            color={colors.red[500]}
            shape="rounded"
          >
            4
          </Label>
        )
      }
    ]
  }
];
