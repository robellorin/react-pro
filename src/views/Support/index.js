import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Tabs,
  Tab,
  colors
} from '@material-ui/core';
import Page from 'src/components/Page';
import UsersWithNews from './UsersWithNews';
import GlobalNews from './GlobalNews';
import Users from './Users/index';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    height: 'calc(100vh - 165px)',
    position: 'relative'
  },
  tabs: {
    marginBottom: 10
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  container: {
    height: '100%',
    paddingBottom: 12,
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: 1,
    overflow: 'auto'
  }
}));

function Support({ match, history }) {
  const classes = useStyles();
  const { tab: currentTab } = match.params;
  const tabs = [
    { value: 'users', label: 'Users' },
    { value: 'globalNews', label: 'Global News' },
    { value: 'usersWithNews', label: 'News of Users' }
  ];

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  if (!currentTab) {
    return <Redirect to="/support/users" />;
  }

  if (!tabs.find((tab) => tab.value === currentTab)) {
    return <Redirect to="/errors/error-404" />;
  }

  return (
    <Page
      className={classes.root}
      title="Support"
    >
      <Container maxWidth={false} className={classes.container}>
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
        <div className={classes.content}>
          {currentTab === 'usersWithNews' && <UsersWithNews />}
          {currentTab === 'globalNews' && <GlobalNews />}
          {currentTab === 'users' && <Users />}
        </div>
        
      </Container>

    </Page>
  );
}

Support.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default Support;
