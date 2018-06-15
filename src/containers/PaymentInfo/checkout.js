import React from 'react';
import {StripeProvider, injectStripe, IbanElement, IdealBankElement, Elements, CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, PaymentRequestButtonElement} from 'react-stripe-elements';
import { View } from 'react-native'
import { connect } from 'react-redux'
import {payAmount} from '../../actions/VehicleForm'

class _CardForm extends React.Component {

    constructor(props) {
    super(props);
      this.state={
        loading: false
      }
    }

    handleSubmit (ev) {
      ev.preventDefault();
      this.setState({loading: true})
      if (this.props.stripe) {
        this.props.stripe
          .createToken()
          .then(async(payload) => {
             if (payload.token) {
              let response = await this.props.payAmount(payload.token.id)
              if (response) {
                this.setState({loading: false})
              }
            }
          });
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
    };


  render() {
    return (
      <View style={{flex: 1}}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <View style={{flex: 1}}>
            <label>
              <CardNumberElement style={{base: {fontSize: '18px', height: 50}}} />
              <CardExpiryElement style={{base: {fontSize: '18px'}}} />
              <CardCVCElement style={{base: {fontSize: '18px'}}} />
            </label>
          </View>
          <View>
            <button disabled={this.state.loading} style={{backgroundColor: '#f5b443', height: 50}}>Pay Now</button>
          </View>
        </form>
      </View>
    )
  }
}

export default injectStripe(connect(state => ({
}, mapDispatch))(_CardForm));


const mapDispatch = (dispatch) => {
   const allActionProps = Object.assign({}, dispatch);
   return allActionProps;
}
