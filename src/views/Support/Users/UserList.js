import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import EditModal from './EditModal';
const copy = require('clipboard-copy');

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  keyWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

function UserList({ users, team, saveUserData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedUser, setUser] = useState(null);

  const handleCopyKey = (value) => {
    copy(value);
  }

  const handleEdit = (user) => {
    setUser(user);
    setOpen(true);
  }

  const onClose = () => {
    setOpen(false);
  }

  const onSave = (data) => {
    setOpen(false);
    saveUserData(selectedUser.id, data);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a user table">
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>{team.toLowerCase() === 'default' ? 'Referred By' : 'Team'}</TableCell>
            <TableCell>Key</TableCell>
            <TableCell align="right">Cut Off</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {`${user.firstname} ${user.surname}`}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{team.toLowerCase() === 'default' ? user.referredBy : user.tags}</TableCell>
              <TableCell>
                <div className={classes.keyWrapper}>
                  <span>{user.key}</span>
                  <IconButton onClick={() => handleCopyKey(user.key)}>
                    <FileCopyIcon />
                  </IconButton>
                </div>
              </TableCell>
              <TableCell align="right">{user.cutOff}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleEdit(user)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditModal
        onClose={onClose}
        onSave={onSave}
        open={open}
        user={selectedUser}
      />
    </TableContainer>
  );
}

export default UserList;
