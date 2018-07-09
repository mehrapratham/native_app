import React from 'react';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar, ScrollView } from 'react-native'
import InputBox from '../../components/InputBox'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import {saveToLocalStorage,getFromLocalStorage} from '../../components/localStorage'
import { connect } from 'react-redux'
import StateSelectBox from '../../components/StateSelectBox'
import { IsValidForm } from '../../components/Common/validation'
import ArrowLeftButton from '../../components/Buttons/ArrowLeftButton'
import ArrowRightButton from '../../components/Buttons/ArrowRightButton'
import ReactNativeDrawer from '../../components/Common/ReactNativeDrawer'
import ToastComponent from '../../components/ToastComponent'
import FontComponent from '../../components/FontComponent'
import state from '../../json/state.js'

class Address extends React.Component{
	constructor(){
		super();
		this.state = {
			address: {
				street: '',
				city: '',
				zip: '',
				state: '',
				phone: ''
			},
			errors:{},
			loading: true,
			showToast: false,
			toastmsg: '',
			disableKeyboardView: false
		}
	}
	async componentWillMount(){
		let data = await this.props.dispatch(getFromLocalStorage('addressData'))
		if(data){
			this.setState({ address: data })
		}
		this.onChangeText()
		
	}
	isValidUSZip() {
	   var postcode = require('postcode-validator');
	   let isValid = postcode.validate(this.state.address.zip, 'US')
	   return isValid;
	}
	

	onButtonPress() {
		this.setState({loading: true})
		let fields = ['street', 'city', 'zip', 'state', 'phone']
      	let formValidation = IsValidForm(fields, this.state.address)
      	this.setState({ errors: formValidation.errors })
      	if (formValidation.validate) {
			let data = JSON.stringify(this.state.address)
	  		let cons = this.props.dispatch(saveToLocalStorage('addressData' , data))
	  		let isvalidZip = this.isValidUSZip()
			let isValidPhn = this.validatePhoneNumber(this.state.address.phone)
			if (isvalidZip && isValidPhn) {
				this.props.history.push('/time-slot');
			}
			else{
				if(!isvalidZip){
					this.setState({ showToast: true,toastmsg: "Please enter valid zip code"})
					setTimeout(() => {
						this.setState({ showToast: false})
					}, 3000)
				}
				else{
					this.setState({ showToast: true,toastmsg: "Please enter valid phone number"})
					setTimeout(() => {
						this.setState({ showToast: false})
					}, 3000)
				}
			}
			this.setState({loading: false})
      	}
	}
	onButtonPress2() {
	  	this.props.history.push('/recomended-filter');
	}
	validatePhoneNumber(elementValue){
		var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
		return phoneNumberPattern.test(elementValue);
	}
	onChangeText(key,event){
	    let { address } = this.state;
	    address[key] = event;
		this.setState({ address })
		let fields = ['street', 'city', 'zip', 'state', 'phone']
      	let formValidation = IsValidForm(fields, this.state.address)
      	this.setState({ errors: formValidation.errors })
      	if (formValidation.validate) {
      		this.setState({loading: false})
      	}
      	else{
      		this.setState({loading: true})
      	}
	}

	onFocusTextBox(bool){
		if (bool) {
			this.setState({disableKeyboardView: true})
		}
		else{
			this.setState({disableKeyboardView: false})
		}
	}
	render(){
		let subChild = <View>	
							<View style={styles.arrow}>
								<FontComponent style={{fontSize: 26,fontFamily: 'dosis-bold'}} text="Enter Service Address"/>
							</View>					
							<View style={styles.address}>
								<FontComponent style={{marginBottom: 10,fontSize: 18,fontFamily: 'dosis-medium'}} text="Street"/>
								<InputBox value={this.state.address.street} onChange={this.onChangeText.bind(this,'street')} nextkey="next" disableAnimate={this.onFocusTextBox.bind(this)}/>
							</View>
							<View style={styles.address}>
								<FontComponent style={{marginBottom: 10,fontSize: 18,fontFamily: 'dosis-medium'}} text="City"/>
								<InputBox value={this.state.address.city} onChange={this.onChangeText.bind(this,'city')} nextkey="next"/>
							</View>
							<View style={styles.text}>
								<View style={styles.text2}>
									<View style={styles.text3}>
										<FontComponent style={{marginBottom: 10,fontSize: 18,fontFamily: 'dosis-medium'}} text="Zip"/>
										<InputBox value={this.state.address.zip} onChange={this.onChangeText.bind(this,'zip')} nextkey="done" keyboardType='numeric'/>
									</View>
								</View>
								<View style={styles.text4}>
									<View style={styles.text3}>
										<FontComponent style={{marginBottom: 10,fontSize: 18,fontFamily: 'dosis-medium'}} text="State"/>
										<StateSelectBox placeholder="State" list={state.state} selectedValue={this.state.address.state} onValueChange={this.onChangeText.bind(this,'state')}/>
									</View>
								</View>
							</View>
							<View style={styles.address}>
								<FontComponent style={{marginBottom: 10,fontSize: 18,fontFamily: 'dosis-medium'}} text="Phone"/>
								<InputBox value={this.state.address.phone} onChange={this.onChangeText.bind(this,'phone')}  keyboardType='numeric' nextkey="done"/>
							</View>
						</View>
		let child = 
					<View style={styles.container} >
						<StatusBar
					      barStyle="light-content"
					      backgroundColor="blue"
					    />
					<View style={{flex: 1}}>
							<KeyboardAvoidingView style={styles.view} behavior={this.state.disableKeyboardView ? '': 'position'} enabled>
								{subChild}
							</KeyboardAvoidingView>					
						<View style={styles.lastss}>
							<View style={styles.lasts}>
								<View style={styles.last2}>
									<ArrowLeftButton onPress={this.onButtonPress2.bind(this)} />
								</View>
								<View style={styles.last2}>
									<ArrowRightButton onPress={this.onButtonPress.bind(this)} disabled={this.state.loading} />
								</View>
							</View>
						</View>
					</View>
						{this.state.showToast && this.state.toastmsg?<ToastComponent msg={this.state.toastmsg}/>: null}
					</View>
				
		return(
			<ReactNativeDrawer child={child} history={this.props.history}/>
		)
	}
}
export default connect(state => ({
}, mapDispatch))(Address);


const mapDispatch = (dispatch) => {
   const allActionProps = Object.assign({}, dispatch);
   return allActionProps;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
  	flex: 2,
  	width: '100%',
  	paddingLeft: 20,
  	paddingRight: 20,
  	zIndex: .1
  },
  arrow: {
  	alignItems: 'center',
  	justifyContent: 'center',
	paddingTop: 10,
  },
  heading: {
  	fontSize: 26
  },
  address: {
  	marginBottom: 1,
  	width: '100%'
  },
  text: {
  	marginBottom: 1,
  	width: '100%',
  	flexDirection: 'row'
  },
  text2: {
  	width: '50%'
  },
  text3: {
  	width: '96%'
  },
  text4: {
  	width: '50%', 
  	alignSelf: 'flex-end', 
  	alignItems: 'flex-end'
  },
	lasts: {
	  	paddingRight: 20,
	  	paddingLeft: 20,
	  	flexDirection: 'row',
	  	marginBottom: 30
	},
	last2: {
		width: '50%', 
		alignSelf: 'flex-start'
	},
	lastss: {
		justifyContent: 'flex-end'
	}
});