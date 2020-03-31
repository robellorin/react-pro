import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Container
} from '@material-ui/core';
import Page from 'src/components/Page';
import CredentialsForm from './Credentials';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    height: '100%'
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0)
  },
  credentials: {
    marginTop: theme.spacing(3)
  },
}));

function Credentials(props) {
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState(props.selectedUser);
  useEffect(() => {
    setSelectedUser(props.selectedUser);
  }, [props.selectedUser]);

  return (
    <Page
      className={classes.root}
      title="Credentials"
    >
      <Container maxWidth={false} className={classes.container}>
        <CredentialsForm className={classes.credentials} selectedUser={selectedUser} />
      </Container>
    </Page>
  );
}

Credentials.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default Credentials;
