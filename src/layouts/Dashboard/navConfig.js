/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PaymentIcon from '@material-ui/icons/Payment';
import LockIcon from '@material-ui/icons/Lock';
import SettingsIcon from '@material-ui/icons/Settings';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import SmsIcon from '@material-ui/icons/Sms';
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
        icon: LockIcon,
      },
      {
        title: 'Payments',
        href: '/payment/invoices',
        icon: PaymentIcon,
      },
      {
        title: 'Tickets',
        href: '/ticket',
        icon: SmsIcon,
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
