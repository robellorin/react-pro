/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PaymentIcon from '@material-ui/icons/Payment';
import LockIcon from '@material-ui/icons/Lock';
import SettingsIcon from '@material-ui/icons/Settings';
import SmsIcon from '@material-ui/icons/Sms';

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
        role: 'support'
      }
    ]
  }
];
