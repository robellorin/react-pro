import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Overview from './Overview';
import FinancialStats from './FinancialStats';
import { getProfit } from 'src/actions';
import EarningsSegmentation from './EarningsSegmentation';
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
  const dashboardData = useSelector(state => state.dashboard);
  const [loading, setLoading] = useState(dashboardData.loading);
  const [data, setData] = useState(mokup);
  const classes = useStyles();

  useEffect(() => {
    // dispatch(getProfit());
  }, [dispatch]);
  useEffect(() => {
    if (loading && !dashboardData.loading) {
      setData(dashboardData.data);
    }
    setLoading(dashboardData.loading);
  }, [loading, dashboardData]);
  
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
            <Overview data={data} />
          </Grid>
          <Grid
            item
            lg={8}
            xl={9}
            xs={12}
          >
            <FinancialStats betData={data} />
          </Grid>
          <Grid
            item
            lg={4}
            xl={3}
            xs={12}
          >
            <EarningsSegmentation data={data} />
          </Grid>
        </Grid>
      </Container>
    }
    </Page>
  );
}

export default DashboardAnalytics;
