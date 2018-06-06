import React from 'react'
import {StripeProvider, injectStripe, Elements, CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, PaymentRequestButtonElement} from 'react-stripe-elements';
import { View, Text } from 'react-native'
import CardForm from './checkout'


class PaymentForm extends React.Component{
	render(){
		return(
			<View>
				<Text>test</Text>
		    </View>
		)
	}
}
export default PaymentForm;