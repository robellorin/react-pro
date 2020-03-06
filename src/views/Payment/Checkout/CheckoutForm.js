import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import CardSection from './CardSection';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  submitButton: {
    marginTop: theme.spacing(3),
    width: '100%'
  }
}));

export default function CheckoutForm(props) {
  const { userData } = props;
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(process.env.REACT_APP__STRIPE_CLIENT_SECRET, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: userData.surname,
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <CardSection />
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!stripe}
        size="large"
        type="submit"
        variant="contained"
      >
        Place order
      </Button>
    </form>
  );
}
