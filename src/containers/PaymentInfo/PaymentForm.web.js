import React from 'react'
import {StripeProvider, Elements} from 'react-stripe-elements';
import { View } from 'react-native'
import CardForm from './checkout'


class PaymentForm extends React.Component{

	constructor() {
	    super();
	    this.state = {stripe: null};
	}

	componentDidMount() {
	    if (window.Stripe) {
	      this.setState({stripe: window.Stripe('pk_test_a6Bqs1yFWSPwBYlDKiYaKcVl')});
	    } else {
	      document.querySelector('#stripe-js').addEventListener('load', () => {
	        this.setState({stripe: window.Stripe('pk_test_a6Bqs1yFWSPwBYlDKiYaKcVl')});
	      });
	    }
	}

	render(){
		return(
			<View>
				<StripeProvider stripe={this.state.stripe}>
				    <Elements>
				        <CardForm payAmount={this.props.payAmount}/>
				    </Elements>
			    </StripeProvider>
		    </View>
		)
	}
}
export default PaymentForm;