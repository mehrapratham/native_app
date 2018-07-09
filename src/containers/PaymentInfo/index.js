import React from 'react';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView } from 'react-native'
import InputBox from '../../components/InputBox'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import { connect } from 'react-redux'
import {getFromLocalStorage,saveToLocalStorage,removeLocalStorage} from '../../components/localStorage'
import {StripeProvider, injectStripe, Elements, CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, PaymentRequestButtonElement} from 'react-stripe-elements';
import PaymentForm from './PaymentForm'
import {payAmount,confirmBookingOrder} from '../../actions/VehicleForm'
import ReactNativeDrawer from '../../components/Common/ReactNativeDrawer'
import FontComponent from '../../components/FontComponent'
class PaymentInfo extends React.Component{
	async componentWillMount()	{
		let vehicleData = await this.props.dispatch(getFromLocalStorage('confirmOrder'))
	}
	onButtonPress() {
	  	this.props.history.push('/final-screen');
	}
	onButtonPress2() {
	  	this.props.history.push('/summary');
	}
	async payAmount(token){
		let vehicleData = await this.props.dispatch(getFromLocalStorage('confirmOrder'))
		this.props.dispatch(confirmBookingOrder(token,vehicleData._id)).then(res => {
			if(res.msz == 'success'){
				this.props.history.push('/final-screen')
			}
		})
	}
	render(){
		let vehicleData = this.props.dispatch(getFromLocalStorage('confirmOrder'))
		let child = <View style={styles.container} >
						<StatusBar
					      barStyle="light-content"
					      backgroundColor="blue"
					    />
					    	<View style={{flex: 1}}>
								<View style={styles.arrow}>
									<FontComponent style={{fontSize: 20,paddingLeft: 15,paddingRight: 15,textAlign: 'center',fontFamily: 'dosis-bold'}} text="Enter card info to confirm booking, ( you won't be charged until after service completion )"/>
								</View>
								<View style={styles.view}>
									<PaymentForm payAmount={this.payAmount.bind(this)} history={this.props.history} />
								</View>
							</View>
					</View>
		return(
			<ReactNativeDrawer child={child} history={this.props.history}/>
		)
	}
}
export default connect(state => ({
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
  	alignItems: 'center',
  	justifyContent: 'center',
  	paddingTop: 10,
  	paddingBottom: 10
  }
});