import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
import { useDispatch } from 'react-redux';

import { executePayment } from 'src/actions';

window.React = React;
window.ReactDOM = ReactDOM;

function PaypalButton(props) {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = React.useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = React.useState(props.isScriptLoaded);
  useEffect(() => {
    if (!isScriptLoaded && props.isScriptLoaded) {
      if (props.isScriptLoadSucceed) {
        setShowButton(true);
      } else {
        console.log('Cannot load Paypal script!');
        props.onError();
      }
    }
    setIsScriptLoaded(props.isScriptLoaded);
  }, [isScriptLoaded, props]);

  const payment = (data) => props.invoice.paymentId;

  const onAuthorize = (data, actions) => {
    console.log(props.invoice);

    return dispatch(
      executePayment(
        props.invoice.id,
        data.paymentID,
        data.payerID,
        props.invoice.currency
      )
    );
  };

  let ppbtn = '';

  if (showButton) {
    // eslint-disable-next-line
      ppbtn = <paypal.Button.react
        env={props.env}
        client={props.client}
        locale={props.locale}
        style={props.style}
        payment={payment}
        commit
        onAuthorize={onAuthorize}
        onCancel={props.onCancel}
        onError={props.onError}
          // "Error: Unrecognized prop: shipping" was caused by the next line
          // shipping={this.props.shipping}
      />;
  }

  return (<div>{ppbtn}</div>);
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);
