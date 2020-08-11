import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';
import {
  Container
} from '@material-ui/core';
import Page from 'src/components/Page';
import LoadingComponent from 'src/components/Loading';
import CredentialsForm from './Credentials';

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
  const session = useSelector((state) => state.session);
  const [selectedUser, setSelectedUser] = useState(props.selectedUser);
  const credentials = useSelector((state) => state.credentials);
  const history = useHistory();

  useEffect(() => {
    if (session.user.disabled) history.push('/payment/invoices');
  }, [session, history]);

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
        credentials.loading
          && <LoadingComponent />
      }
    </Page>
  );
}

Credentials.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default Credentials;
