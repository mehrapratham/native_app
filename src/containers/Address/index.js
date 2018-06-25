import React from 'react';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native'
import InputBox from '../../components/InputBox'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import {saveToLocalStorage,getFromLocalStorage} from '../../components/localStorage'
import { connect } from 'react-redux'
import { IsValidForm } from '../../components/Common/validation'
import ArrowLeftButton from '../../components/Buttons/ArrowLeftButton'
import ArrowRightButton from '../../components/Buttons/ArrowRightButton'
import ReactNativeDrawer from '../../components/Common/ReactNativeDrawer'
class Address extends React.Component{
	constructor(){
		super();
		this.state = {
			address: {
				street: '',
				city: '',
				zip: '',
				state: ''
			},
			errors:{},
			loading: true
		}
	}
	async componentWillMount(){
		let data = await this.props.dispatch(getFromLocalStorage('addressData'))
		if(data){
			this.setState({ address: data })
		}
		this.onChangeText()
	}

	onButtonPress() {
		this.setState({loading: true})
		let fields = ['street', 'city', 'zip', 'state']
      	let formValidation = IsValidForm(fields, this.state.address)
      	this.setState({ errors: formValidation.errors })
      	if (formValidation.validate) {
			let data = JSON.stringify(this.state.address)
	  		this.props.dispatch(saveToLocalStorage('addressData' , data))
			this.setState({loading: false})
		  	this.props.history.push('/time-slot');
      	}
	}
	onButtonPress2() {
	  	this.props.history.push('/recomended-filter');
	}
	onChangeText(key,event){
	    let { address } = this.state;
	    address[key] = event;
		this.setState({ address })
		let fields = ['street', 'city', 'zip', 'state']
      	let formValidation = IsValidForm(fields, this.state.address)
      	this.setState({ errors: formValidation.errors })
      	if (formValidation.validate) {
      		this.setState({loading: false})
      	}
      	else{
      		this.setState({loading: true})
      	}
	}
	render(){
		let child = <View style={styles.container} >
						<StatusBar
					      barStyle="light-content"
					      backgroundColor="blue"
					    />
						<View style={styles.arrow}>
							<Text style={styles.heading}>Enter Service Address</Text>
						</View>
						<KeyboardAvoidingView style={styles.view} behavior="position" enabled>
							<View style={styles.address}>
								<Text style={styles.label}>Street</Text>
								<InputBox value={this.state.address.street} onChange={this.onChangeText.bind(this,'street')} nextkey="next"/>
							</View>
							<View style={styles.address}>
								<Text style={styles.label}>City</Text>
								<InputBox value={this.state.address.city} onChange={this.onChangeText.bind(this,'city')} nextkey="next" />
							</View>
							<View style={styles.text}>
								<View style={styles.text2}>
									<View style={styles.text3}>
										<Text style={styles.label}>Zip</Text>
										<InputBox value={this.state.address.zip} onChange={this.onChangeText.bind(this,'zip')} nextkey="done" keyboardType='numeric'/>
									</View>
								</View>
								<View style={styles.text4}>
									<View style={styles.text3}>
										<Text style={styles.label}>State</Text>
										<InputBox value={this.state.address.state} onChange={this.onChangeText.bind(this,'state')} nextkey="go" />
									</View>
								</View>
							</View>
						</KeyboardAvoidingView>
						<View style={styles.lasts}>
							<View style={styles.last2}>
								<ArrowLeftButton onPress={this.onButtonPress2.bind(this)} />
							</View>
							<View style={styles.last2}>
								<ArrowRightButton onPress={this.onButtonPress.bind(this)} disabled={this.state.loading} />
							</View>
						</View>
					</View>
		return(
			
			<ReactNativeDrawer child={child} history={this.props.history}/>
		)
	}
}
export default connect(state => ({
  // vehicleForm: state.vehicleForm,
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
  	flex: 3,
  	width: '100%',
  	paddingLeft: 20,
  	paddingRight: 20
  },
  label:{
  	marginBottom: 10,
  	fontSize: 18
  },
  arrow: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center',
	paddingTop: 20
  },
  heading: {
  	fontSize: 26
  },
  address: {
  	marginBottom: 10,
  	width: '100%'
  },
  text: {
  	marginBottom: 10,
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
	}
});