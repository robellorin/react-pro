/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import ChatIcon from '@material-ui/icons/ChatOutlined';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PaymentIcon from '@material-ui/icons/Payment';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import GroupIcon from '@material-ui/icons/Group';

export default [
  {
    subheader: '',
    items: [
      {
        title: 'Analytics Overview',
        href: '/dashboards/analytics',
        icon: EqualizerIcon
      },
      {
        title: 'Bookmaker Accounts',
        href: '/credentials',
        icon: LockOpenIcon,
      },
      {
        title: 'Payments',
        href: '/payment/invoices',
        icon: PaymentIcon,
      },
      {
        title: 'Tickets',
        href: '/ticket',
        icon: ChatIcon,
      },
      {
        title: 'Support',
        href: '/support',
        icon: SettingsIcon,
        role: 'support',
        items: [
          {
            title: 'Global News',
            href: '/support/globalNews',
            icon: ChatBubbleIcon
          },
          {
            title: 'Users WithNews',
            href: '/support/usersWithNews',
            icon: GroupIcon
          }
        ]
      }
    ]
  }
];
