/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_0UHXDheFMo1HUV0Mg93GS8Ko00ZC52e9U1');


const useStyles = makeStyles((theme) => ({
  root: {},
  
}));

function StripeForm(props) {
  const { className, ...rest } = props;
  const classes = useStyles();
  const history = useHistory();
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm userData={session.user} />
    </Elements>
  );
}

StripeForm.propTypes = {
  className: PropTypes.string
};

export default StripeForm;
