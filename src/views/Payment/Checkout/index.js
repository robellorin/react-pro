import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  Button,
  CardContent,
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
import Alert from 'src/components/Alert';
import clsx from 'clsx';
// import StripeForm from './StripeForm';
import PaypalBtn from './PaypalBtn';

const copy = require('clipboard-copy');

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
  label: 'paypal',
  tagline: false,
  size: 'medium',
  shape: 'pill',
  color: 'blue',
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
    width: 780,
    maxWidth: '100%',
    overflow: 'visible',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '100%',
      width: '100%'
    }
  },
  cardHeader: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 700
  },
  cardAction: {
    '& .MuiIconButton-label': {
      color: '#5b33d4'
    }
  },
  content: {
    padding: theme.spacing(3, 4, 3, 4)
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 500,
    paddingBottom: 20
  },
  amountWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 25
  },
  textFieldWrapper: {
    flex: 1,
    '& p:first-child': {
      fontSize: 12,
      paddingBottom: 5
    },
    '&:first-child': {
      marginRight: 10
    },
    '&:last-child': {
      marginLeft: 10
    }
  },
  textField: {
    width: '100%',
    '& p': {
      fontSize: 12,
      lineHeight: 1.2
    },
    '& .MuiInputBase-input': {
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 12
    }
  },
  text: {
    whiteSpace: 'pre-line',
    fontSize: 12,
    lineHeight: 1.5
  },
  generalBorder: {
    boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)'
  },
  activeBorder: {
    boxShadow: '0 0 0 1.5px #5b33d4, 0 1px 2px 0 #5b33d4'
  },
  radio: {
    color: '#5b33d4 !important'
  },
  label: {
    fontSize: 14,
    lineHeight: 1.42,
    fontWeight: 500
  },
  currencyIcon: {
    fontSize: 12
  },
  expansionPanelSummary: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& .MuiExpansionPanelSummary-content': {
      margin: '10px 0px'
    }
  },
  logoWrapper: {
    flex: 1,
    paddingTop: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    height: 'fit-content'
  },
  paypalLogoContainer: {
    backgroundColor: '#f6f6f6',
    padding: '10px 5px',
    borderRadius: 3,
    '& span': {
      fontStyle: 'italic',
      fontWeight: 'bold',
      fontSize: 20,
      fontFamily: 'sans-serif'
    }
  },
  payText: {
    color: '#265697'
  },
  palText: {
    color: '#306FC5'
  },
  btcIcon: {
    width: 40,
    height: 40
  },
  btcButton: {
    color: '#ffffff',
    backgroundColor: '#5b33d4',
    '&:hover': {
      backgroundColor: '#5b33d4',
      opacity: 0.8
    }
  },
  btcDetail: {
    flexDirection: 'column'
  },
  btcWrapper: {
    display: 'flex'
  },
  paidButton: {
    width: 150
  },
  btcDescription: {
    fontSize: 12,
    padding: '20px 0 10px'
  }
}));

const CLIENT = {
  sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION,
};
const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

const paypalTitle = [
  'Pay your order using the most know and secure platform for online\nmoney transfers. You will redirected to PayPal to finish complete your purchase.',
  'Click "PAY" to pay via PayPal\nYou\'ll be redirected to PayPal to complete the payment, and then return to this page.'
];
const btcTitle = [
  'Pay your order using Bitcoin',
  'To pay, please send exact amount of BTC to the given address'
];

function OrderPayment({ isModal, onClose, invoice }) {
  const classes = useStyles();
  const [method, setMethod] = React.useState('paypal');
  const [currency, setCurrency] = React.useState((invoice && invoice.currency) ?? 'EUR');
  const [amount, setAmount] = React.useState((invoice && invoice.amount) ?? 0);
  const paymentData = useSelector((state) => state.payment);
  const [loading, setLoading] = useState(paymentData.payLoading);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('error');
  const [btcAddress, setBtcAddress] = React.useState('3BjcdQQXTP9JdhqCdW8WivnPcr4pFyepmK');
  const [btcAmount, setBtcAmount] = React.useState('0.0013447');

  useEffect(() => {
    if (loading && !paymentData.payLoading) {
      setOpen(true);
      setPaymentStatus(paymentData.message === 'failed' ? 'error' : 'success');
      setMessage(paymentData.message);
    }
    setLoading(paymentData.payLoading);
  }, [loading, setLoading, paymentData]);

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleChange = (panel) => () => {
    setMethod(panel);
  };

  const handleMethodChange = (event, value) => {
    if (event) {
      event.persist();
    }
    setMethod(value);
  };

  const handleCopyClick = (event, value) => {
    if (event) {
      event.persist();
      copy(value);
    }
  };

  const handlePaidClick = () => {
    console.log('click paid');
  };

  const onSuccess = (payment) => console.log('Successful payment!', payment);

  const onError = (error) => {
    setOpen(true);
    setPaymentStatus('error');
    setMessage('Erroneous payment OR failed to load script!');
  };
  const onCancel = (data) => console.log('Cancelled payment!', data);

  const closeHandle = () => {
    onClose(paymentStatus);
  };

  const onCloseAlert = () => {
    setOpen(false);

    if (paymentStatus === 'success') onClose(paymentStatus);
  };

  return (
    <Page className={classes.root} title="Order Payment">
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        autoHideDuration={3000}
        onClose={onCloseAlert}
      >
        <Alert variant={paymentStatus} message={message} />
      </Snackbar>
      <Card className={classes.card}>
        {isModal && (
          <div>
            <CardHeader
              classes={{
                title: classes.cardHeader,
                action: classes.cardAction
              }}
              action={(
                <IconButton onClick={closeHandle}>
                  <CloseIcon />
                </IconButton>
              )}
              title="Payment"
            />
          </div>
        )}
        <CardContent className={classes.content}>
          <div className={classes.amountWrapper}>
            <div className={classes.textFieldWrapper}>
              <Typography>Currency</Typography>
              <TextField
                id="standard-select-currency"
                name="currency"
                className={classes.textField}
                select
                value={currency}
                onChange={handleCurrencyChange}
                variant="outlined"
                disabled
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <div style={{ display: 'flex' }}>
                      <ListItemIcon>
                        <FontAwesomeIcon
                          icon={option.icon}
                          className={classes.currencyIcon}
                        />
                      </ListItemIcon>
                      <Typography>{option.value}</Typography>
                    </div>
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={classes.textFieldWrapper}>
              <Typography>Amount</Typography>
              <TextField
                id="amount-textfield"
                type="number"
                className={classes.textField}
                value={amount}
                variant="outlined"
                disabled
                InputProps={{
                  style: { fontSize: 18 },
                  inputProps: {
                    min: 0
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon
                        className={classes.currencyIcon}
                        icon={
                          currencies.find((item) => item.value === currency).icon
                        }
                      />
                    </InputAdornment>
                  )
                }}
                onChange={handleAmountChange}
              />
            </div>
          </div>
          <Typography classes={{ root: classes.contentTitle }}>
            Choose your payment method
          </Typography>
          <RadioGroup
            name="methodStatus"
            onChange={(event) => handleMethodChange(event, event.target.value)}
            value={method}
          >
            <ExpansionPanel
              className={
                method === 'paypal'
                  ? classes.activeBorder
                  : classes.generalBorder
              }
              expanded={method === 'paypal'}
              onChange={handleChange('paypal')}
            >
              <ExpansionPanelSummary className={classes.expansionPanelSummary}>
                <div>
                  <FormControlLabel
                    classes={{ label: classes.label }}
                    control={<Radio className={classes.radio} />}
                    label="Paypal"
                    value="paypal"
                  />
                  <Typography className={classes.text}>
                    {method === 'paypal' ? paypalTitle[1] : paypalTitle[0]}
                  </Typography>
                </div>
                <div className={classes.logoWrapper}>
                  <div className={classes.paypalLogoContainer}>
                    <span className={classes.payText}>Pay</span>
                    <span className={classes.palText}>Pal</span>
                  </div>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  {parseFloat(amount) > 0 && (
                    <PaypalBtn
                      env={ENV}
                      client={CLIENT}
                      currency={currency}
                      total={parseFloat(amount)}
                      style={style}
                      onError={onError}
                      onSuccess={onSuccess}
                      onCancel={onCancel}
                      invoice={invoice}
                    />
                  )}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              className={
                method === 'btc' ? classes.activeBorder : classes.generalBorder
              }
              expanded={method === 'btc'}
              onChange={handleChange('btc')}
            >
              <ExpansionPanelSummary className={classes.expansionPanelSummary}>
                <div>
                  <FormControlLabel
                    classes={{ label: classes.label }}
                    control={<Radio className={classes.radio} />}
                    label="BTC"
                    value="btc"
                  />
                  <Typography className={classes.text}>
                    {method === 'btc' ? btcTitle[1] : btcTitle[0]}
                  </Typography>
                </div>
                <div className={classes.logoWrapper}>
                  <img
                    className={classes.btcIcon}
                    alt="Cookies"
                    src="/images/logos/btc.png"
                  />
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.btcDetail}>
                {/* <StripeForm className={classes.stripeForm} /> */}
                <div className={classes.btcWrapper}>
                  <div className={classes.textFieldWrapper} style={{ flex: 2 }}>
                    <Typography>BTC address:</Typography>
                    <TextField
                      id="address-textfield"
                      className={classes.textField}
                      value={btcAddress}
                      variant="outlined"
                      disabled
                      InputProps={{
                        style: { fontSize: 18, padding: 0 },
                        inputProps: {
                          min: 0
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              className={classes.btcButton}
                              onClick={(event) => handleCopyClick(event, btcAddress)}
                            >
                              Copy
                            </Button>
                          </InputAdornment>
                        )
                      }}
                    />
                  </div>
                  <div className={classes.textFieldWrapper}>
                    <Typography>BTC amount:</Typography>
                    <TextField
                      id="btc-amount-textfield"
                      className={classes.textField}
                      value={btcAmount}
                      variant="outlined"
                      disabled
                      InputProps={{
                        style: { fontSize: 18, padding: 0 },
                        inputProps: {
                          min: 0
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              className={classes.btcButton}
                              onClick={(event) => handleCopyClick(event, btcAmount)}
                            >
                              Copy
                            </Button>
                          </InputAdornment>
                        )
                      }}
                    />
                  </div>
                </div>
                <Typography className={classes.btcDescription}>
                  Please click "Paid" as soon as you send your BTC
                </Typography>
                <Button
                  className={clsx(classes.paidButton, classes.btcButton)}
                  fullWidth={false}
                  onClick={handlePaidClick}
                >
                  Paid
                </Button>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </RadioGroup>
        </CardContent>
      </Card>
    </Page>
  );
}

export default OrderPayment;
