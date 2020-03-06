import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Divider,
  CardHeader,
  IconButton,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  MenuItem,
  Typography,
  ListItemIcon,
  InputAdornment,
  Snackbar
} from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEuroSign, faPoundSign, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import CloseIcon from '@material-ui/icons/Close';
import Page from 'src/components/Page';
import StripeForm from './StripeForm';
import Alert from 'src/components/Alert';
import PaypalBtn from './PaypalBtn';

const currencies = [
  {
    value: 'USD',
    icon: faDollarSign
  },
  {
    value: 'EUR',
    icon: faEuroSign,
  },
  {
    value: 'GBP',
    icon: faPoundSign
  }
];

const style = {
  'label':'paypal', 
  'tagline': false, 
  'size':'large', 
  'shape':'pill', 
  'color':'blue',
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 2)
  },
  stripeForm: {
    width: '100%'
  },
  card: {
    width: theme.breakpoints.values.sm,
    maxWidth: '100%',
    overflow: 'visible',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '100%',
      width: '100%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  amountWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  text: {
    marginBottom: 20
  }
}));

const CLIENT = {
  sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION,
};
const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

function OrderPayment({ match, history, isModal, onClose }) {
  const classes = useStyles();
  const [method, setMethod] = React.useState('paypal');
  const [currency, setCurrency] = React.useState('USD');
  const [amount, setAmount] = React.useState(0);
  const paymentData = useSelector(state => state.payment);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (loading && !paymentData.loading) {
      if (paymentData.isCreated) {
        if (paymentData.status.length > 0) {
          setOpen(true);
          setMessage(paymentData.status === 'success' ? 'Successful payment!' : 'Erroneous payment!');
        }
      } else {
        setOpen(true);
        setMessage('Cannot create payment');
      }
    }
    setLoading(paymentData.loading);
  }, [loading, setLoading, paymentData]);

  const handleCurrencyChange = event => {
    setCurrency(event.target.value);
  };

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const handleChange = panel => () => {
    setMethod(panel);
  };

  const handleMethodChange = (event, value) => {
    if (event) {
      event.persist();
    }
    setMethod(value);
    
  };

  const onSuccess = (payment) =>
    console.log('Successful payment!', payment);
  const onError = (error) =>
    console.log('Erroneous payment OR failed to load script!', error);
  const onCancel = (data) =>
    console.log('Cancelled payment!', data);
  return (
    <Page
      className={classes.root}
      title="Order Payment"
    >
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert variant={paymentData.status === 'success' ? 'success' : 'error'} message={message} />
      </Snackbar>
      <Card className={classes.card}>
        {isModal &&
          <div>
            <CardHeader
              action={
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              }
            />
            <Divider />
          </div>
        }
        <CardContent className={classes.content}>
          <div className={classes.amountWrapper}>
            <TextField
              id="standard-select-currency"
              name="currency"
              label="Currency"
              select
              value={currency}
              onChange={handleCurrencyChange}
              helperText="Please select your currency"
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  <div style={{ display: 'flex' }}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={option.icon} />
                    </ListItemIcon>
                    <Typography>{option.value}</Typography>
                  </div>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="amount-textfield"
              label="Amount"
              type="number"
              value={amount}
              helperText="Please input amount"
              InputProps={{
                style: {fontSize: 18},
                inputProps: {
                  min: 0
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={currencies.find(item => item.value === currency).icon} />
                  </InputAdornment>
                )
              }}
              onChange={handleAmountChange}
            />
          </div>

          <RadioGroup
            name="methodStatus"
            onChange={(event) => handleMethodChange(
              event,
              event.target.value
            )}
            value={method}
          >
            <ExpansionPanel expanded={method === 'paypal'} onChange={handleChange('paypal')}>
              <ExpansionPanelSummary>
                <FormControlLabel
                  control={<Radio color="primary" />}
                  label="Paypal"
                  value="paypal"
                />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  <Typography className={classes.text}>Pay via PayPal</Typography>
                  {
                    parseFloat(amount) > 0 &&
                      <PaypalBtn
                        env={ENV}
                        client={CLIENT}
                        currency={currency}
                        total={parseFloat(amount)}
                        style={style}
                        onError={onError}
                        onSuccess={onSuccess}
                        onCancel={onCancel}
                      />
                  }
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={method === 'stripe'} onChange={handleChange('stripe')}>
              <ExpansionPanelSummary>
                <FormControlLabel
                  control={<Radio color="primary" />}
                  label="Credit Card"
                  value="stripe"
                />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <StripeForm className={classes.stripeForm} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </RadioGroup>
        </CardContent>
      </Card>
    </Page>
  );
}

export default OrderPayment;
