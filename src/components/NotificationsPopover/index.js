import React from 'react';
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

function NotificationsPopover({
  notifications, anchorEl, handleNotificationsClose, ...rest
}) {
  const classes = useStyles();
  const notificationList = notifications.length > 0 ? notifications.slice(0, 10) : [{ id: 0, notification: 'No notifications to show' }];

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
          {
            notificationList.map((notification) => (
              <ListItem
                key={notification.id}
                className={classes.listItem}
                button
                onClick={() => handleNotificationsClose(notification)}
              >
                <ListItemText
                  primary={notification.notification}
                  primaryTypographyProps={{ variant: 'body1' }}
                />
                <ArrowForwardIcon className={classes.arrowForwardIcon} />
              </ListItem>
            ))
          }
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
