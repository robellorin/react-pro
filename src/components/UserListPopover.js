import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  colors,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: 350,
    maxWidth: '100%',
    position: 'absolute',
    top: 156,
    right: 45,
    boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)`
  },
  listItem: {
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: colors.grey[300]
  }
}));

function UserListPopover({ users, anchorEl, handleSelectUser, ...rest }) {
  const classes = useStyles();
  
  return (
    <Paper
      {...rest}
      className={classes.root}
    >
      <List>
        {
          users.map((user) => (
            <ListItem
              key={user.id}
              className={classes.listItem}
              button
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
    </Paper>
  );
}

UserListPopover.propTypes = {
  className: PropTypes.string,
  // anchorEl: PropTypes.any,
  // onClose: PropTypes.func.isRequired,
  // open: PropTypes.bool.isRequired
};

export default UserListPopover;
