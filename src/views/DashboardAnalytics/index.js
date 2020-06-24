import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid } from '@material-ui/core';
import Page from 'src/components/Page';
import { getProfit, deleteNotificationByType } from 'src/actions';
import * as constant from 'src/constant';
import LoadingComponent from 'src/components/Loading';
import moment from 'moment';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import Overview from './Overview';
import MonthOverview from './MonthOverview';
import WeekOverview from './WeekOverview';
import FinancialStats from './FinancialStats';
import NewArea from './NewArea';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 10,
    paddingBottom: 36,
    position: 'relative',
    height: 'calc(100vh - 165px)'
  },
  container: {
    paddingRight: 0,
    paddingTop: 20,
    height: '100%',
    overflow: 'auto'
  },
  newsWrapper: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    background: '#4E2CD4',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 16px rgba(78, 44, 212, 0.32)'
  },
  newsIcon: {
    color: '#ffffff',
    fontSize: 35
  },
  openIconsWrapper: {
    position: 'relative'
  },
  openIcons: {
    fontSize: 23,
    position: 'absolute',
    '&:first-child': {
      top: -9,
      right: -5
    },
    '&:last-child': {
      bottom: -9,
      left: -5
    }
  }
}));

function DashboardAnalytics(props) {
  const dispatch = useDispatch();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const dashboardData = useSelector((state) => state.dashboard);
  const session = useSelector((state) => state.session);
  const notification = useSelector((state) => state.notification);
  const [loading, setLoading] = useState(dashboardData.loading);
  const [betData, setBetData] = useState({});
  const [monthData, setMonthData] = useState({});
  const [weekData, setWeekData] = useState({});
  const [selectedMonth, setSelectMonth] = useState(month);
  const classes = useStyles();

  useEffect(() => {
    const from = Date.parse(new Date(`${year}-01-01`));
    const to = Date.now();
    dispatch(
      getProfit(
        from,
        to,
        props.selectedUser ? props.selectedUser.id : null,
        props.selectedUser ? props.selectedUser.currency : null
      )
    );
  }, [year, dispatch, props.selectedUser]);

  useEffect(() => {
    const { bets } = betData;
    const data = {
      pl: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      rollover: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      roi: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
    const tempWeekData = {
      pl: 0,
      rollover: 0
    };
    const monday = `${moment()
      .isoWeekday(1)
      .utc()
      .format('YYYY-MM-DD')}T10:00:00+00:00`;

    if (bets) {
      for (const bet of bets) {
        const betMonth = moment(bet.betTime, 'YYYY/MM/DD').format('M') - 1;
        const { pl, rollover } = bet;
        data.pl[betMonth] += pl ? parseFloat(pl) : 0;
        data.rollover[betMonth] += rollover ? parseFloat(rollover) : 0;

        if (moment(bet.betTime).utc().format() > monday) {
          tempWeekData.pl += pl ? parseFloat(pl) : 0;
          tempWeekData.rollover += rollover ? parseFloat(rollover) : 0;
        }
      }
    }
    data.pl = data.pl.map((item) => Math.round(item * 100) / 100);
    data.rollover = data.rollover.map((item) => Math.round(item * 100) / 100);
    tempWeekData.pl = Math.round(tempWeekData.pl * 100) / 100;
    tempWeekData.rollover = Math.round(tempWeekData.rollover * 100) / 100;
    data.roi = data.pl.map((item, index) => {
      const rollover = data.rollover[index];

      if (rollover !== 0) return Math.round(item / rollover * 10000) / 100;

      return 0;
    });
    setMonthData(data);
    setWeekData(tempWeekData);
  }, [betData, month]);

  useEffect(() => {
    if (loading && !dashboardData.loading) {
      setBetData(dashboardData.data);
    }
    setLoading(dashboardData.loading);
  }, [loading, dashboardData]);

  const clickHandle = (event, data) => {
    if (data.length > 0) {
      const curMonth = data[0]._index;
      setSelectMonth(curMonth);
    }
  };

  const onCheckHandle = () => {
    dispatch({
      type: constant.CHECKING_NEWS,
      payload: !dashboardData.checkNews
    });
  };

  const removeNotifications = (type) => {
    dispatch(deleteNotificationByType(type));
  };

  return (
    <Page className={classes.root} title="Analytics Dashboard">
      <Container maxWidth={false} className={classes.container}>
        <NewArea
          notification={notification}
          isChecked={dashboardData.checkNews}
          removeNotifications={removeNotifications}
        />
        <Grid
          container
          spacing={1}
          style={{ width: '100%', height: '100%', margin: '0 -12px' }}
        >
          <Grid item xs={12} style={{ paddingTop: 0 }}>
            <Overview
              data={betData}
              currency={
                props.selectedUser
                  ? props.selectedUser.currency
                  : session.user.currency
              }
            />
          </Grid>
          <Grid item xs={12}>
            <MonthOverview
              monthData={monthData}
              month={selectedMonth}
              currency={
                props.selectedUser
                  ? props.selectedUser.currency
                  : session.user.currency
              }
            />
          </Grid>
          <Grid item xs={12}>
            <WeekOverview
              weekData={weekData}
              month={selectedMonth}
              currency={
                props.selectedUser
                  ? props.selectedUser.currency
                  : session.user.currency
              }
            />
          </Grid>
          <Grid
            item
            lg={12}
            xl={12}
            xs={12}
            style={{ paddingBottom: 0, paddingTop: 20 }}
          >
            <FinancialStats data={monthData} clickHandle={clickHandle} />
          </Grid>
        </Grid>
      </Container>
      {loading && <LoadingComponent />}
      <div className={classes.newsWrapper} onClick={onCheckHandle}>
        {dashboardData.checkNews && <CloseIcon className={classes.newsIcon} />}
        {!dashboardData.checkNews && (
          <div className={classes.openIconsWrapper}>
            <LiveHelpIcon
              className={clsx(classes.newsIcon, classes.openIcons)}
            />
            <InsertCommentIcon
              className={clsx(classes.newsIcon, classes.openIcons)}
            />
          </div>
        )}
      </div>
    </Page>
  );
}

export default DashboardAnalytics;
