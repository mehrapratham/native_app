import React from 'react';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import InputBox from '../../components/InputBox'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import { connect } from 'react-redux'
import {getFromLocalStorage,saveToLocalStorage,removeLocalStorage} from '../../components/localStorage'
import {StripeProvider, injectStripe, Elements, CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, PaymentRequestButtonElement} from 'react-stripe-elements';
import PaymentForm from './PaymentForm'
import {payAmount} from '../../actions/VehicleForm'

class PaymentInfo extends React.Component{
	componentWillMount()	{
		this.props.dispatch(removeLocalStorage('vehicleData'))
		this.props.dispatch(removeLocalStorage('addressData'))
	}
	onButtonPress() {
		console.log(this.props)
	  	this.props.history.push('/final-screen');
	}
	onButtonPress2() {
		console.log(this.props)
	  	this.props.history.push('/summary');
	}

	onChangeText(event){
		console.log(event)
	}


	payAmount(token){
		let amount = 4000;
		console.log(amount,22222)
		this.props.dispatch(payAmount(token, amount)).then(res=>{
           this.props.history.push('/final-screen')
        })
	}
	render(){
		return(
			<View style={styles.container}>
				
				<View style={styles.arrow}>
					<Text style={styles.heading}>Payment Info</Text>
				</View>
				<View style={styles.view}>
					<View style={{width: '100%',flex: 1}}>
					    <PaymentForm payAmount={this.payAmount.bind(this)}/>
					</View>
					{/*<View style={styles.payment}>
						<InputBox placeholder="Name" onChange={this.onChangeText.bind(this)}/>
					</View>
					<View style={styles.payment}>
						<InputBox placeholder="Card number" onChange={this.onChangeText.bind(this)}/>
					</View>
					<View style={styles.row}>
						<View style={styles.cw}>
							<View style={styles.placeholder}>
								<InputBox placeholder="Cw" onChange={this.onChangeText.bind(this)}/>
							</View>
						</View>
						<View style={styles.last}>
							<View style={styles.placeholder}>
								<InputBox placeholder="Exp" onChange={this.onChangeText.bind(this)}/>
							</View>
						</View>
					</View>*/}
				</View>
				{/*<View style={styles.view}>
					<ConfirmButton label="Confirm order" onButtonPress={this.onButtonPress.bind(this)}/>
				</View>*/}
			</View>
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
  	flex: 2,
  	justifyContent: 'center',
  	alignItems: 'center',
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
  },
  payment: {
  	marginBottom: 10,
  	width: '100%'
  },
  row: {
  	marginBottom: 10,
  	width: '100%',
  	flexDirection: 'row'
  },
  cw: {
  	width: '50%'
  },
  placeholder: {
  	width: '99%'
  },
  last: {
  	width: '50%', 
  	alignSelf: 'flex-end', 
  	alignItems: 'flex-end'
  },
  leftArrow: {
  	margin: 24
  },
  oil: {
  	width: 30
  }
});