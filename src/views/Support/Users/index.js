import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getAllUsers, updateUser } from 'src/actions';
import * as constants from 'src/constant';
import UserList from './UserList';
import LoadingComponent from 'src/components/Loading';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    border: 'none',
    borderRadius: 20,
    boxShadow: 'none',
    paddingLeft: 30,
    paddingRight: 30,
    overflow: 'auto'
  },
  content: {
    paddingTop: 24,
    height: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 500
  },

}));

function Users({ className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const supportData = useSelector(state => state.supportData);
  const [expanded, setExpanded] = useState([true]);
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const saveUserData = (userId, data) => {
    dispatch(updateUser(userId, data));
  }

  const handleClick = (index) => {
    setExpanded((prevValue) => prevValue.map((item, i) => i === index ? !item : item));
  }
      
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        {
          constants.teamList.map((team, index) => {
            const filteredUsers = supportData.users.filter(item => item.tags === team);
            return (
              <ExpansionPanel key={team} expanded={expanded[index]} onChange={() => handleClick(index)}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${team}-panel`}
                  id={`${team}-panel`}
                >
                  <Typography className={classes.heading} style={{ color: index === 0 ? 'green' : '#000000'}}>
                    {team.toLowerCase() === 'default' ? 'New Users' : team}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <UserList users={filteredUsers} team={team} saveUserData={saveUserData} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })
        }
      </CardContent>
      {
        supportData.loading &&
          <LoadingComponent />
      }
    </Card>
  );
}

export default Users;
