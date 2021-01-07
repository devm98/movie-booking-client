import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

const CLIENT = {
  sandbox:
    'AYvBPDPjfAzUffD3RmisGVACYoTrI8b_Wsq8qY1Pvn4eNEUUzTPJKEGGajSC-QCXWtjsyP3mhk9Ni83t',
  production:
    'AYvBPDPjfAzUffD3RmisGVACYoTrI8b_Wsq8qY1Pvn4eNEUUzTPJKEGGajSC-QCXWtjsyP3mhk9Ni83t',
};

const CLIENT_ID =
  process.env.NODE_ENV === 'production' ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = () => null;

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  UNSAFE_componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver('react', {
          React,
          ReactDOM,
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }

  createOrder = (data, actions) => {
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

  onApprove = (data, actions) => {
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

  render() {
    return (
      <PayPalButton
        createOrder={(data, actions) => this.createOrder(data, actions)}
        onApprove={(data, actions) => this.onApprove(data, actions)}
      />
    );
  }
}

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`
)(PaypalButton);
