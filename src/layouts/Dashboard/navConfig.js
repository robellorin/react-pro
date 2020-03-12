/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import ChatIcon from '@material-ui/icons/ChatOutlined';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import PaymentIcon from '@material-ui/icons/Payment';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SettingsIcon from '@material-ui/icons/Settings';

export default [
  {
    subheader: '',
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
      },
      {
        title: 'SUPPORT',
        href: '/support',
        icon: SettingsIcon,
        role: 'support',
        items: [
          {
            title: 'GLOBAL NEWS',
            href: '/support/globalNews'
          },
          {
            title: 'USERS WITH NEWS',
            href: '/support/usersWithNews'
          }
        ]
      }
    ]
  }
];
