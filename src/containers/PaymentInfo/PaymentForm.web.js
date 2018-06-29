import React from 'react'
import {StripeProvider, Elements} from 'react-stripe-elements';
import { View } from 'react-native'
import CardForm from './checkout'
import {stripeKey} from '../../actions/remoteAPIKeys'

class PaymentForm extends React.Component{

	constructor() {
	    super();
	    this.state = {stripe: null};
	}
	componentDidMount() {
	    if (window.Stripe) {
	      this.setState({stripe: window.Stripe(stripeKey)});
	    } else {
	      document.querySelector('#stripe-js').addEventListener('load', () => {
	        this.setState({stripe: window.Stripe(stripeKey)});
	      });
	    }
	}
	render(){
		return(
			<View>
				<StripeProvider stripe={this.state.stripe}>
				    <Elements>
				        <CardForm payAmount={this.props.payAmount} history={this.props.history}/>
				    </Elements>
			    </StripeProvider>
		    </View>
		)
	}
}
export default PaymentForm;