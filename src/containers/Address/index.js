import React from 'react';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar, ScrollView, PixelRatio } from 'react-native'
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
import zip from '../../json/zip.js'

var FONT_BACK_26   = 22;
var FONT_BACK_20   = 18;
var FONT_BACK_18   = 16;

if (PixelRatio.get() == 1) {
  FONT_BACK_26 = 26;
  FONT_BACK_20 = 20;
  FONT_BACK_18 = 18;
}

class Address extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			address: {
				street: '',
				city: '',
				zip: '',
				state: '',
				email: '',
				phone: '',
				first_name: '',
				last_name: '',
				street2: '',
				confirm_email: ''
			},
			errors:{},
			loading: true,
			showToast: false,
			toastmsg: '',
			disableKeyboardView: false,
			bottomToEnd: false
		}
	}
	async componentWillMount(){
		let vehicleData = await this.props.dispatch(getFromLocalStorage('vehicleData'))
		if(vehicleData == null){
			this.props.history.push('/')
		}
		
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
		let fields = ['street', 'city', 'zip', 'state', 'phone','email','first_name', 'last_name', 'confirm_email']
      	let formValidation = IsValidForm(fields, this.state.address)
      	this.setState({ errors: formValidation.errors })
      	if (formValidation.validate) {
			let data = JSON.stringify(this.state.address)
	  		let cons = this.props.dispatch(saveToLocalStorage('addressData' , data))
	  		let isvalidZip = this.isValidUSZip()
			let isValidPhn = this.validatePhoneNumber(this.state.address.phone)
			if(this.state.address.email != this.state.address.confirm_email){
				this.setState({ showToast: true,toastmsg: "Email or Confirm Email doesn't match"})
				setTimeout(() => {
					this.setState({ showToast: false})
				}, 3000)
			}
			else if (isvalidZip && isValidPhn) {
				let isZipAvailable = zip.zip.indexOf(this.state.address.zip)
				if(isZipAvailable == -1){
					this.setState({ showToast: true,toastmsg: "Service not available at your address"})
					setTimeout(() => {
						this.setState({ showToast: false})
					}, 3000)
				}else{
					this.props.history.push('/time-slot');
				}
				
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
	onButtonPress2Web() {
	  	this.props.history.push('/');
	}

	validatePhoneNumber(elementValue){
		var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
		return phoneNumberPattern.test(elementValue);
	}
	onChangeText(key,event){
	    let { address } = this.state;
	    address[key] = event;
		this.setState({ address })
		let fields = ['street', 'city', 'zip', 'state', 'phone', 'email', 'first_name', 'last_name', 'confirm_email']
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
		let subChild = <ScrollView ref={(node) => {this.scroll = node}}>
						<View>	
							<View style={styles.arrow}>
								<FontComponent style={{fontSize: FONT_BACK_26,fontFamily: 'dosis-bold'}} className="mainHeadingTop" text="Enter Service Address"/>
							</View>
							<View style={styles.text}>
								<View style={styles.text2}>
									<View style={styles.text3}>
										<InputBox value={this.state.address.first_name} onChange={this.onChangeText.bind(this,'first_name')} nextkey="next" placeholder="First Name" autofocus="true"/>
									</View>
								</View>
								<View style={styles.text4}>
									<View style={styles.text3}>
										<InputBox value={this.state.address.last_name} onChange={this.onChangeText.bind(this,'last_name')} nextkey="next" placeholder="Last Name"/>
									</View>
								</View>
							</View>					
							<View style={styles.address}>
								<InputBox value={this.state.address.street} onChange={this.onChangeText.bind(this,'street')} nextkey="next" placeholder="Street address"/>
							</View>
							<View style={styles.address}>
								<InputBox value={this.state.address.street2} onChange={this.onChangeText.bind(this,'street2')} nextkey="next" placeholder="Street address 2 (optional)"/>
							</View>
							<View style={styles.address}>
								<InputBox value={this.state.address.city} onChange={this.onChangeText.bind(this,'city')} nextkey="next" placeholder="City"/>
							</View>
							<View style={styles.text}>
								<View style={styles.text2}>
									<View style={styles.text3}>
										<InputBox value={this.state.address.zip} onChange={this.onChangeText.bind(this,'zip')} nextkey="done" keyboardType='numeric' pattern="[0-9]*" inputmode="numeric" type='number' placeholder="Zip Code"/>
									</View>
								</View>
								<View style={styles.text4}>
									<View style={styles.text3}>
										<StateSelectBox placeholder="State" list={state.state} selectedValue={this.state.address.state} onValueChange={this.onChangeText.bind(this,'state')} placeholder="State"/>
									</View>
								</View>
							</View>
							<View style={styles.address}>
								<InputBox value={this.state.address.email} onChange={this.onChangeText.bind(this,'email')}  nextkey="next" placeholder="Email"/>
							</View>
							<View style={styles.address}>
								<InputBox value={this.state.address.confirm_email} onChange={this.onChangeText.bind(this,'confirm_email')}  nextkey="next" placeholder="Confirm Email"/>
							</View>
							<View style={styles.address}>
								<InputBox value={this.state.address.phone} onChange={this.onChangeText.bind(this,'phone')}  nextkey="done" keyboardType='numeric' pattern="[0-9]*" inputmode="numeric" type='number' placeholder="Phone"/>
							</View>
							
						</View>
						</ScrollView>
		let child = 
					<View style={styles.container}>
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
									<ArrowLeftButton onPress={this.onButtonPress2.bind(this)} onPressWeb={this.onButtonPress2Web.bind(this)} />
								</View>
								<View style={styles.last2}>
									<ArrowRightButton onPress={this.onButtonPress.bind(this)} onPressWeb={this.onButtonPress.bind(this)} disabled={this.state.loading} />
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
	},
	containers: {
    backgroundColor: '#fff',
    height: 45, 
    width: "100%", 
    paddingLeft: 15, 
    borderRadius: 5,
    borderBottomWidth: 4,
    borderColor: '#c5c3c4'
  },
  focusedTextInput: {
    backgroundColor: '#fff',
    height: 45, 
    width: "100%", 
    paddingLeft: 15, 
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#9df441',
    marginBottom: 100
  },
  focusedTextInput2: {
    backgroundColor: '#fff',
    height: 45, 
    width: "100%", 
    paddingLeft: 15, 
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#9df441',
    marginBottom: 100
  }
});