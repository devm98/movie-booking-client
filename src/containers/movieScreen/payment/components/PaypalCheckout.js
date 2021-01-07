import React, { ReactDOM, useEffect } from 'react';

import scriptLoader from 'react-async-script-loader';

const CLIENT = {
  sandbox:
    'AYvBPDPjfAzUffD3RmisGVACYoTrI8b_Wsq8qY1Pvn4eNEUUzTPJKEGGajSC-QCXWtjsyP3mhk9Ni83t',
  production:
    'AYvBPDPjfAzUffD3RmisGVACYoTrI8b_Wsq8qY1Pvn4eNEUUzTPJKEGGajSC-QCXWtjsyP3mhk9Ni83t',
};

const CLIENT_ID =
  process.env.NODE_ENV === 'production' ? CLIENT.production : CLIENT.sandbox;

function PaypalCheckout(props) {
  const { isScriptLoaded, isScriptLoadSucceed } = props;

  const paypalRef = React.useRef();

  const createOrder = (data, actions) => {
    console.log('createOrder', { data, actions });
    return actions.order.create({
      purchase_units: [
        {
          description: +'Mercedes G-Wagon',
          amount: {
            currency_code: 'USD',
            value: 200,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    console.log('onApprove', { data, actions });
    actions.order.capture().then((details) => {
      console.log(details);
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID,
      };
      console.log('Payment Approved: ', paymentData);
      this.setState({ showButtons: false, paid: true });
    });
  };

  useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed) {
      paypalRef.current = window.paypal.Buttons.driver('react', {
        React,
        ReactDOM,
      });
    }
  });

  return (
    <div
      ref={paypalRef}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`
)(PaypalCheckout);
