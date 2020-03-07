import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Overview from './Overview';
import MonthOverview from './MonthOverview';
import FinancialStats from './FinancialStats';
import { getProfit } from 'src/actions';

import mokData from './mokup';
import LoadingComponent from 'src/components/Loading';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    height: '100%'
  },
  loadingWrapper: {
    width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'
  }
}));

function DashboardAnalytics() {
  const mokup = mokData;
  const dispatch = useDispatch();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const dashboardData = useSelector(state => state.dashboard);
  const [loading, setLoading] = useState(dashboardData.loading);
  const [betData, setBetData] = useState(mokup);
  const [monthData, setMonthData] = useState({});
  const [selectedMonth, setSelectMonth] = useState(month);
  const classes = useStyles();

  useEffect(() => {
    const from = Date.parse(new Date(`${year}-01-01`));
    const to = Date.now();
    console.log(from, to);
    // dispatch(getProfit(from, to));
    // setData();
  }, [dispatch]);
  useEffect(() => {
    const { bets } = mokData;
    let data = {
      pl: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      rollover: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      roi: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
    if (bets) {
      for (const bet of bets) {
        const date = new Date(bet.betTime);
        const month = date.getMonth();
        if (!bet.checked) continue;
        if (!bet.placedOdds || !bet.placedStake) continue;
        let profit = 0;
        const { won, totalReturns, placedStake } = bet;
        if (won === 0 || totalReturns === null) continue;
        else if (won === 1) {
          profit =  Math.round((totalReturns - placedStake) * 100) / 100;
        } else if (won === -1) {
          profit =  Math.round(-placedStake * 100) / 100;
        } else if (won === 2) {
          profit =  Math.round((totalReturns - 2 * placedStake) * 100) / 100;
        } else if (won === -2) {
          profit =  Math.round(-placedStake * 2 * 100) / 100;
        } else if (won === 3) {
          profit =  Math.round((totalReturns - 2 * placedStake) * 100) / 100;
        }
        data.pl[month] += profit;
        data.rollover[month] += placedStake;
      }
    }
    data.pl = data.pl.map(item => Math.round(item * 100) / 100);
    data.roi = data.pl.map((item, index) => {
      const rollover = data.rollover[index];
      if (rollover !== 0) return (item / rollover * 100).toFixed(2);
      else return 0;
    });
    setMonthData(data);
  }, [betData]);

  useEffect(() => {
    if (loading && !dashboardData.loading) {
      setBetData(dashboardData.data);
    }
    setLoading(dashboardData.loading);
  }, [loading, dashboardData]);

  const clickHandle = (event, data) => {
    let curMonth = -1;
    if (data.length > 0) {
      curMonth = data[0]._index;
    }
    setSelectMonth(curMonth);
  }
  
  return (
    <Page
      className={classes.root}
      title="Analytics Dashboard"
    >
    {
      loading &&
      <LoadingComponent />
    }
    {
      !loading &&
      <Container maxWidth={false}>
        <Header />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <Overview data={betData} />
          </Grid>
          <Grid
            item
            lg={12}
            xl={12}
            xs={12}
          >
            <FinancialStats data={monthData} clickHandle={clickHandle} />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <MonthOverview monthData={monthData} month={selectedMonth} />
          </Grid>
        </Grid>
      </Container>
    }
    </Page>
  );
}

export default DashboardAnalytics;
