import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Container
} from '@material-ui/core';
import Page from 'src/components/Page';
import CredentialsForm from './Credentials';
import LoadingComponent from 'src/components/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    height: 'calc(100vh - 165px)',
    position: 'relative'
  },
  container: {
    height: '100%',
    paddingBottom: 12
  },
  credentials: {
    paddingTop: theme.spacing(3),
    height: '100%'
  },
}));

function Credentials(props) {
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState(props.selectedUser);
  const credentials = useSelector(state => state.credentials);
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
      {
        credentials.loading &&
          <LoadingComponent />
      }
    </Page>
  );
}

Credentials.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default Credentials;
