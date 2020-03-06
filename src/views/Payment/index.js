import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Tabs,
  Tab,
  Divider,
  colors
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Checkout from './Checkout';
import Invoices from './Invoices';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

function Payment({ match, history }) {
  const classes = useStyles();
  const { tab: currentTab } = match.params;
  const tabs = [
    { value: 'checkout', label: 'checkout' },
    { value: 'invoices', label: 'invoices' }
  ];

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  if (!currentTab) {
    return <Redirect to={`/payment/checkout`} />;
  }

  if (!tabs.find((tab) => tab.value === currentTab)) {
    return <Redirect to="/errors/error-404" />;
  }

  return (
    <Page
      className={classes.root}
      title="Payment"
    >
      <Container maxWidth="lg">
        <Header />
        <Tabs
          className={classes.tabs}
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={currentTab}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>
        <Divider className={classes.divider} />
        <div className={classes.content}>
          {currentTab === 'checkout' && <Checkout />}
          {currentTab === 'invoices' && <Invoices />}
        </div>
      </Container>
    </Page>
  );
}

Payment.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default Payment;
