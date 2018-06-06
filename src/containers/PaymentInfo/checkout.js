import React from 'react';
import {StripeProvider, injectStripe, Elements, CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, PaymentRequestButtonElement} from 'react-stripe-elements';
import { View } from 'react-native'

class _CardForm extends React.Component {

    constructor(props) {
      super(props);


      // For full documentation of the available paymentRequest options, see:
      // https://stripe.com/docs/stripe.js#the-payment-request-object
      

      /*paymentRequest.on('token', ({complete, token, ...data}) => {
        console.log('Received Stripe token: ', token);
        console.log('Received customer information: ', data);
        complete('success');
      });*/


      this.state = {
        canMakePayment: false,
        paymentRequest: null,
      };

    }

    createPaymentObject(){
      const paymentRequest = this.props.stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Demo total',
          amount: 1000,
        },
      });
      this.setState({paymentRequest: paymentRequest})
      paymentRequest.canMakePayment().then((result) => {
        console.log('hihihih')
        console.log(result)
        this.setState({canMakePayment: !!result});
      });

    }



    handleSubmit = (ev) => {
      ev.preventDefault();
      if (this.props.stripe) {
        this.props.stripe
          .createToken()
          .then((payload) => {
            console.log('[token]', payload)
          });
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
    };

    payAmount(ev){
      ev.preventDefault();
      let data = {
              'country' : 'US',
              'currency' : 'inr',
              'total' : {
                'amount' : 100,
                'label' : 'test payment',
                
              }
            }
      if (this.props.stripe) {
        this.props.stripe
          .paymentRequest(data)
          .then((payload) => {
            console.log('[token]', payload)
          });
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }      
    }



  render() {
    return (
      <View>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Card details
            <CardElement />
          </label>
          <button>Get Tokken</button>
          <button type="button" onClick={this.payAmount.bind(this)}>Pay</button>
          <button type="button" onClick={this.createPaymentObject.bind(this)}>Create payment object</button>
          

        </form>
        {this.state.canMakePayment ? <PaymentRequestButtonElement
          paymentRequest={this.state.paymentRequest}
          className="PaymentRequestButton"
          style={{
            // For more details on how to style the Payment Request Button, see:
            // https://stripe.com/docs/elements/payment-request-button#styling-the-element
            paymentRequestButton: {
              theme: 'light',
              height: '64px',
            },
          }}
        />
        : null}
      </View>
    )
  }
}
export default injectStripe(_CardForm)
