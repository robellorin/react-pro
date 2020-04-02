import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Popover,
  CardHeader,
  Divider,
  colors,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(() => ({
  root: {
    width: 350,
    maxWidth: '100%'
  },
  actions: {
    backgroundColor: colors.grey[50],
    justifyContent: 'center'
  }
}));

function NotificationsPopover({ notifications, anchorEl, handleNotificationsClose, ...rest }) {
  const classes = useStyles();
  console.log(notifications)
  const notification = notifications && notifications.message ? notifications.message : 'You have not notifications';
  let link = '#';
  if (notifications) {
    if (notifications.type === 'credentials') link = '/credentials';
    else if ((notifications.type === 'ticket' || notifications.type === 'message') && notifications.ticketId)
      link = `/ticket/${notifications.ticketId}`;
  }

  return (
    <Popover
      {...rest}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
    >
      <div className={classes.root}>
        <CardHeader title="Notification" />
        <Divider />
        <List>
          <ListItem
            className={classes.listItem}
            component={RouterLink}
            to={link}
            onClick={handleNotificationsClose}
          >
            <ListItemText
              primary={notification}
              primaryTypographyProps={{ variant: 'body1' }}
            />
            <ArrowForwardIcon className={classes.arrowForwardIcon} />
          </ListItem>
        </List>
        <Divider />
      </div>
    </Popover>
  );
}

NotificationsPopover.propTypes = {
  anchorEl: PropTypes.any,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default NotificationsPopover;
