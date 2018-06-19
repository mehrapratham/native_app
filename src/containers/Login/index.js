import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Keyboard } from 'react-native'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
export default class Login extends React.Component{
	onButtonPress() {
	  	this.props.history.push('/vehicle-form');
	}
	onclick(){
		console.log(1111)
	}
	render(){
		return(
			<TouchableOpacity style={styles.container} onPress={Keyboard.dismiss} accessible={false} activeOpacity={ 1 }>
				<View style={styles.container}>
					<View style={styles.logo}>
						<Text style={styles.logoText}>TRANZOIL</Text>
					</View>
					<View style={styles.form}>
						<View style={styles.last2}>
							<TextInput
				              	style={styles.last3}
				              	placeholder="username"
				              	underlineColorAndroid="transparent"
				              	placeholderTextColor="#fff"
				              	returnKeyType = {"next"}
				              	autoFocus = {false}
				              	onSubmitEditing={(event) => { 
				                	this.refs.password.focus(); 
					            }}
				          	/>
				          	<View style={styles.last4}>
								<FontAwesomeIcon iconClass="fas fa-user" nativeBaseIconName="ios-contact-outline" style={styles.icon} icon={styles.icon} styles={{fontSize: 22,color: '#fff', opacity: 1}}/>
							</View>
						</View>
						<View style={styles.last2}>
							<TextInput
				              	style={styles.last3}
				              	placeholder="password"
				              	underlineColorAndroid="transparent"
					            placeholderTextColor="#fff"
					            ref="password"
					            returnKeyType = {"go"}
					            onSubmitEditing={(event) => { 
				                	this.refs.guest.focus(); 
					            }}
						    />
						    <View style={styles.last4}>
								<FontAwesomeIcon iconClass="fas fa-unlock-alt" nativeBaseIconName="unlock" style={styles.icon} styles={{fontSize: 22,color: '#fff', opacity: 1}}/>
							</View>
						</View>
						<View style={styles.last5}>
							<TouchableOpacity style={styles.last6}>
								<Text style={styles.color}>SIGN IN</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.last7}>
							<View style={styles.last8}>
								<TouchableOpacity style={styles.last9}>
									<Text style={styles.color}>Register</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.last10}>
								<TouchableOpacity style={styles.last9}>
									<Text style={styles.color}>Forgot Password</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={styles.last11}>
						<View style={styles.last12}>
						</View>
						<View style={styles.last13}>
							<Text style={styles.color}>OR</Text>
						</View>	
						<View style={styles.last14}>
							<View style={styles.last15}>
								<TouchableOpacity style={styles.last16}>
									<FontAwesomeIcon iconClass="fab fa-facebook-f" nativeBaseIconName="logo-facebook" style={styles.iconStyle2} styles={{fontSize: 40,color: '#fff', opacity: 1}}/>
								</TouchableOpacity>
								<TouchableOpacity style={styles.last17}>
									<FontAwesomeIcon iconClass="fab fa-google-plus-g" nativeBaseIconName="logo-googleplus" style={styles.iconStyle} styles={{fontSize: 40,color: '#fff', opacity: 1,alignSelf: 'flex-end'}}/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.last18}>
							<TouchableOpacity style={styles.last9} onPress={this.onButtonPress.bind(this)} ref="guest">
								<Text style={styles.color}>Continue as guest</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
  	height: 120,
  	justifyContent: 'flex-end',
  	alignItems: 'center',
  },
  form: {
  	flex: 2,
  	paddingLeft: 80,
  	paddingRight: 80,
  	justifyContent: 'center'
  },
  logoText: {
  	fontSize: 26,
  },
  color: {
  	color: '#fff'
  },
  icon: {
    color: '#d6edf8',
    fontSize: 22,
    opacity: 1
  },
  iconStyle: {
    color: '#d6edf8',
    fontSize: 36,
    opacity: 1,
    alignSelf: 'flex-end'
  },
  iconStyle2: {
    color: '#d6edf8',
    fontSize: 36,
    opacity: 1
  },
  last2: {
  	borderBottomWidth: 1,
  	borderColor: '#fff',
  	paddingBottom: 5,
  	marginBottom: 30,
  	position: 'relative'
  },
  last3: {
  	textAlign: 'center',
  	width: '100%',
  	paddingLeft: 35,
  	paddingRight: 35
  },
  last4: {
  	position: 'absolute',
  	top: -4,
  	left: 10
  },
  last5: {
  	marginBottom: 30
  },
  last6: {
  	backgroundColor: '#f5b443',
  	height: 40,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  last7: {
  	flexDirection: 'row',
  	marginBottom: 30, 
  	width: '100%'
  },
  last8: {
  	flex: 1, 
  	alignItems: 'flex-start'
  },
  last9: {
  	borderColor: '#fff',
  	borderBottomWidth: 1
  },
  last10: {
  	alignSelf: 'flex-end', 
  	flex: 2, 
  	justifyContent: 'flex-end', 
  	alignItems: 'flex-end'
  },
  last11: {
  	flex: 1,
  	position: 'relative'
  },
  last12: {
  	borderTopWidth: 1,
  	borderColor: '#fff',
  	height: 40,
  	marginBottom: 0
  },
  last13: {
  	backgroundColor: '#e87638',
  	borderRadius: 100,
  	height: 40,
  	width: 40,
  	position: 'absolute',
  	alignSelf: 'center',
  	top: -20,
  	alignItems: 'center',
  	justifyContent: 'center',
  	borderColor: '#fff',
  	borderWidth: 1
  },
  last14: {
  	flex: 1,
  	paddingLeft: 80,
  	paddingRight: 80,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  last15: {
  	flexDirection: 'row'
  },
  last16: {
  	height: 40,
  	width: 60
  },
  last17: {
  	height: 40,
  	width: 60,
  	alignSelf: 'flex-end'
  },
  last18: {
  	flex: 1,
  	alignItems: 'center'
  }
});