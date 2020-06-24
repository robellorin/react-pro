import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch } from 'react-redux';

import { executePayment } from 'src/actions';

function PaypalButton(props) {
  const dispatch = useDispatch();

  const createOrder = (data, actions) => actions.order.create({
    purchase_units: [
      {
        amount: {
          value: props.invoice.amount.toString()
        }
      }
    ]
  });

  const onApprove = (data, actions) => {
    console.log(props.invoice);

    return dispatch(
      executePayment(
        props.invoice.id,
        data.orderID
      )
    );
  };

  return (
    <PayPalButton
      createOrder={createOrder}
      onApprove={onApprove}
      style={props.style}
      options={{
        clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION,
        currency: props.invoice.currency
      }}
    />
  );
}

export default PaypalButton;
