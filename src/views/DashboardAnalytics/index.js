import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid } from '@material-ui/core';
import Page from 'src/components/Page';
import { getProfit, getNews } from 'src/actions';
import * as constant from 'src/constant';
import LoadingComponent from 'src/components/Loading';
import moment from 'moment';
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
    height: 'calc(100vh - 165px)',
  },
  container: {
    paddingRight: 0,
    paddingTop: 20,
    height: '100%',
    overflow: 'auto'
  }
}));

function DashboardAnalytics(props) {
  const dispatch = useDispatch();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const dashboardData = useSelector((state) => state.dashboard);
  const session = useSelector((state) => state.session);
  const newsData = useSelector((state) => state.news);
  const [loading, setLoading] = useState(dashboardData.loading);
  const [betData, setBetData] = useState({});
  const [monthData, setMonthData] = useState({});
  const [weekData, setWeekData] = useState({});
  const [news, setNews] = useState(newsData.news);
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
    dispatch(getNews());
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

  useEffect(() => {
    if (!newsData.loading) {
      setNews(newsData.news);
    }
  }, [news, newsData]);

  const clickHandle = (event, data) => {
    if (data.length > 0) {
      const curMonth = data[0]._index;
      setSelectMonth(curMonth);
    }
  };

  const onCheckHandle = () => {
    dispatch({ type: constant.CHECKING_NEWS, payload: true });
  };

  return (
    <Page className={classes.root} title="Analytics Dashboard">
      <Container maxWidth={false} className={classes.container}>
        <NewArea
          data={news}
          isChecked={dashboardData.checkNews}
          onCheckHandle={onCheckHandle}
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
    </Page>
  );
}

export default DashboardAnalytics;
