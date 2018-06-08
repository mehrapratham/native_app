import React from 'react';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import InputBox from '../../components/InputBox'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import {saveToLocalStorage,getFromLocalStorage} from '../../components/localStorage'
import { connect } from 'react-redux'
class Address extends React.Component{
	constructor(){
		super();
		this.state = {
			address: {
				street: '',
				city: '',
				zip: '',
				state: ''
			}
		}
	}
	async componentWillMount(){
		let data = await this.props.dispatch(getFromLocalStorage('addressData'))
		console.log(data,12345)
		if(data){
			this.setState({ address: data })
		}
		

	}

	onButtonPress() {
		console.log(this.props)
		let data = JSON.stringify(this.state.address)
  		this.props.dispatch(saveToLocalStorage('addressData' , data))
	  	this.props.history.push('/time-slot');
	}
	onButtonPress2() {
		console.log(this.props)
	  	this.props.history.push('/recomended-filter');
	}
	onChangeText(key,event){
		console.log(event)
	    let { address } = this.state;
	    address[key] = event;
		this.setState({ address })

	}
	render(){
		console.log(this.state.address)
		return(
			<View style={styles.container}>
				<View style={styles.leftArrow}>
					<TouchableOpacity onPress={this.onButtonPress2.bind(this)} style={styles.oil}>
						<FontAwesomeIcon iconClass="fas fa-arrow-left" nativeBaseIconName="ios-arrow-dropleft" />
					</TouchableOpacity>
				</View>
				<View style={styles.arrow}>
					<Text style={styles.heading}>Enter Service Address</Text>
				</View>
				<View style={styles.view}>
					<View style={styles.address}>
						<InputBox placeholder="Street" value={this.state.address.street} onChange={this.onChangeText.bind(this,'street')}/>
					</View>
					<View style={styles.address}>
						<InputBox placeholder="City" value={this.state.address.city} onChange={this.onChangeText.bind(this,'city')}/>
					</View>
					<View style={styles.text}>
						<View style={styles.text2}>
							<View style={styles.text3}>
								<InputBox placeholder="Zip" value={this.state.address.zip} onChange={this.onChangeText.bind(this,'zip')}/>
							</View>
						</View>
						<View style={styles.text4}>
							<View style={styles.text3}>
								<InputBox placeholder="State" value={this.state.address.state} onChange={this.onChangeText.bind(this,'state')}/>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.text5}>
					<TouchableOpacity style={styles.arrows} onPress={this.onButtonPress.bind(this)}>
						<FontAwesomeIcon iconClass="fas fa-arrow-right" nativeBaseIconName="ios-arrow-dropright" />
					</TouchableOpacity>
				</View>
			</View>
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
  	flex: 1,
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
  	width: '99%'
  },
  text4: {
  	width: '50%', 
  	alignSelf: 'flex-end', 
  	alignItems: 'flex-end'
  },
  text5: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center',
  	paddingLeft: 20,
  	paddingRight: 20
  },
  arrows: {
	alignItems: 'flex-end', 
	alignSelf: 'flex-end', 
	justifyContent: 'center',
	marginTop: 20
  },
  leftArrow: {
	margin: 24
   },
   oil: {
   	width: 30
   }
});