import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
import { useDispatch } from 'react-redux';

import { createPayment, executePayment } from 'src/actions';

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

  let payment = (data) => {
    return dispatch(createPayment());
    // eslint-disable-next-line no-undef
      // return paypal.rest.payment.create(props.env, props.client, {
      //     transactions: [
      //         { amount: { total: props.total, currency: props.currency } }
      //     ]
      // }, {
      //     input_fields: {
      //         // any values other than null, and the address is not returned after payment execution.
      //         no_shipping: props.shipping
      //     }
      // });
  }

  const onAuthorize = (data, actions) => {
    console.log(data, actions);
    const requestData = {
      paymentID: data.paymentID,
      payerID:   data.payerID
    };
    return dispatch(executePayment(requestData));
  }

  let ppbtn = '';
  if (showButton) {
    // eslint-disable-next-line
      ppbtn = <paypal.Button.react
          env={props.env}
          client={props.client}
          locale={props.locale}
          style={props.style}
          payment={payment}
          commit={true}
          onAuthorize={onAuthorize}
          onCancel={props.onCancel}
          // "Error: Unrecognized prop: shipping" was caused by the next line
          // shipping={this.props.shipping}
      />
  }
  return (<div>{ppbtn}</div>);
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js') (PaypalButton);
