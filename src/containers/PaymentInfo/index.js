import React from 'react';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import InputBox from '../../components/InputBox'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import { connect } from 'react-redux'
import {getFromLocalStorage,saveToLocalStorage,removeLocalStorage} from '../../components/localStorage'
import {StripeProvider, injectStripe, Elements, CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, PaymentRequestButtonElement} from 'react-stripe-elements';
import PaymentForm from './PaymentForm'
import {payAmount} from '../../actions/VehicleForm'
import ReactNativeDrawer from '../../components/Common/ReactNativeDrawer'
var timekit = require('timekit-sdk');

class PaymentInfo extends React.Component{
	componentWillMount()	{
		timekit.configure({
		  appKey: 'test_api_key_qNYEtidaxMtFyopx2ofjqwJriNsi9TBI',
		})
		this.props.dispatch(removeLocalStorage('vehicleData'))
		this.props.dispatch(removeLocalStorage('addressData'))
	}
	onButtonPress() {
	  	this.props.history.push('/final-screen');
	}
	onButtonPress2() {
	  	this.props.history.push('/summary');
	}

	async payAmount(token){
		let amount = 5000;
		let bookingData = await this.props.dispatch(getFromLocalStorage('currentBookingDetail'))
		this.props.dispatch(payAmount(token, amount)).then(res=>{
			timekit.updateBooking({id: bookingData.id, action: 'confirm'}).then(res=>{
				this.props.dispatch(removeLocalStorage('currentBookingDetail'))
			})
           this.props.history.push('/final-screen')
        })
	}
	render(){
		let child = <View style={styles.container}>
						<View style={styles.arrow}>
							<Text style={styles.heading}>Payment Info</Text>
						</View>
						<View style={styles.view}>
							<PaymentForm payAmount={this.payAmount.bind(this)}/>
						</View>
					</View>
		return(
			<ReactNativeDrawer child={child} history={this.props.history}/>
		)
	}
}

export default connect(state => ({
  // vehicleForm: state.vehicleForm,
}, mapDispatch))(PaymentInfo);


const mapDispatch = (dispatch) => {
   const allActionProps = Object.assign({}, dispatch);
   return allActionProps;
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  view: {
  	flex: 3,
  	width: '100%',
  	paddingLeft: 20,
  	paddingRight: 20
  },
  arrow: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  heading: {
  	fontSize: 26
  }
});