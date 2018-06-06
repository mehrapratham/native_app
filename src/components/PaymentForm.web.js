import React from 'react'
import {StripeProvider, injectStripe, Elements, CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, PaymentRequestButtonElement} from 'react-stripe-elements';
import { View } from 'react-native'
const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = (change) => {
  console.log('[change]', change);
};
const handleClick = () => {
  console.log('[click]');
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding,
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class PaymentForm extends React.Component{
	/*handleSubmit(e){
		e.preventDefault()
		console.log('hihih')
	}*/
	handleSubmit = (ev) => {
	    ev.preventDefault();
	    if (this.props.stripe) {
	      this.props.stripe
	        .createToken()
	        .then((payload) => console.log('[token]', payload));
	    } else {
	      console.log("Stripe.js hasn't loaded yet.");
	    }
	  };
	render(){
		return(
			<View>
			<StripeProvider apiKey="pk_test_a6Bqs1yFWSPwBYlDKiYaKcVl">
			    <Elements>
			        <form onSubmit={this.handleSubmit}>
				        <label>
					        Card details
					        <CardElement
					            onBlur={handleBlur}
					            onChange={handleChange}
					            onFocus={handleFocus}
					            onReady={handleReady}
					            {...createOptions(this.props.fontSize)}
					          />
					        {/*<PaymentRequestButtonElement />*/}
					    </label>
				        <button onClick={this.handleSubmit.bind(this)}>Confirm order</button>
				    </form>
			    </Elements>
		    </StripeProvider>
		    </View>
		)
	}
}
export default injectStripe(PaymentForm);