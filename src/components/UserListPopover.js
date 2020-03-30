import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Popover,
  Divider,
  colors,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';

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

function UserListPopover({ users, anchorEl, handleSelectUser, ...rest }) {
  const classes = useStyles();
  
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
        <List>
          {
            users.map((user) => (
              <ListItem
                className={classes.listItem}
                onClick={() => handleSelectUser(user)}
              >
                <ListItemText
                  primary={`${user.firstname} ${user.surname}`}
                  primaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
            ))
          }
        </List>
        <Divider />
      </div>
    </Popover>
  );
}

UserListPopover.propTypes = {
  anchorEl: PropTypes.any,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default UserListPopover;
