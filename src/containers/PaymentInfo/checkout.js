import React from 'react';
import {injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement} from 'react-stripe-elements';
import { View } from 'react-native'
import { connect } from 'react-redux'
import {payAmount} from '../../actions/VehicleForm'
import ArrowLeftButton from '../../components/Buttons/ArrowLeftButton'
import ArrowRightButton from '../../components/Buttons/ArrowRightButton'
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

    onButtonPress2() {
      this.props.history.push('/summary');
    }

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
            <button disabled={this.state.loading} style={{backgroundColor: '#f5b443', height: 50,fontFamily: 'dosis-bold'}}>Confirm Booking</button>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View>
                <ArrowLeftButton onPress={this.onButtonPress2.bind(this)} />
              </View>
            </View>
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
