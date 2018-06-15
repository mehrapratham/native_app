import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
export default class Login extends React.Component{
	onButtonPress() {
	  	this.props.history.push('/vehicle-form');
	}
	render(){
		return(
			<View style={styles.container}>
				<View style={{flex: 1}}>
					<View style={styles.logo}>
						<Text style={styles.logoText}>TRANZOIL</Text>
					</View>
					<View style={styles.form}>
						<View style={{borderBottomWidth: 1,borderColor: '#fff',paddingBottom: 5,marginBottom: 30,position: 'relative'}}>
							<TextInput
				              	style={{textAlign: 'center',width: '100%',paddingLeft: 35,paddingRight: 35}}
				              	placeholder="username"
				              	underlineColorAndroid="#d6edf8"
				              	placeholderTextColor="#fff"
				          	/>
				          	<View style={{position: 'absolute',top: -4,left: 10}}>
								<FontAwesomeIcon iconClass="fas fa-user" nativeBaseIconName="ios-contact-outline" style={styles.icon} icon={styles.icon} styles={{fontSize: 22,color: '#fff', opacity: 1}}/>
							</View>
						</View>
						
						<View style={{borderBottomWidth: 1,borderColor: '#fff',paddingBottom: 5,marginBottom: 30,position: 'relative'}}>
							<TextInput
				              	style={{textAlign: 'center',width: '100%',paddingLeft: 35,paddingRight: 35}}
				              	placeholder="password"
				              	underlineColorAndroid="#d6edf8"
					            placeholderTextColor="#fff"
						    />
						    <View style={{position: 'absolute',top: -4,left: 10}}>
								<FontAwesomeIcon iconClass="fas fa-unlock-alt" nativeBaseIconName="unlock" style={styles.icon} styles={{fontSize: 22,color: '#fff', opacity: 1}}/>
							</View>
						</View>
						<View style={{marginBottom: 30}}>
							<TouchableOpacity style={{backgroundColor: '#f5b443',height: 40,alignItems: 'center',justifyContent: 'center'}}>
								<Text style={{color: '#fff'}}>SIGN IN</Text>
							</TouchableOpacity>
						</View>
						<View style={{flexDirection: 'row',marginBottom: 30, width: '100%'}}>
							<View style={{flex: 1, alignItems: 'flex-start'}}>
								<TouchableOpacity style={{borderColor: '#fff',borderBottomWidth: 1}}>
									<Text style={{color: '#fff'}}>Register</Text>
								</TouchableOpacity>
							</View>
							<View style={{alignSelf: 'flex-end', flex: 2, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
								<TouchableOpacity style={{borderColor: '#fff',borderBottomWidth: 1}}>
									<Text style={{color: '#fff'}}>Forgot Password</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={{flex: 1,position: 'relative'}}>
						<View style={{borderTopWidth: 1,borderColor: '#fff',flex: 1,marginBottom: 30}}>
						</View>
						<View style={{backgroundColor: '#e87638',borderRadius: 100,height: 40,width: 40,position: 'absolute',alignSelf: 'center',top: -20,alignItems: 'center',justifyContent: 'center',borderColor: '#fff',borderWidth: 1}}>
							<Text style={{color: '#fff'}}>OR</Text>
						</View>	
						<View style={{flex: 1,paddingLeft: 80,paddingRight: 80}}>
							<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
								<TouchableOpacity style={{height: 40,width: 60}}>
									<FontAwesomeIcon iconClass="fab fa-facebook-f" nativeBaseIconName="logo-facebook" style={styles.iconStyle2} styles={{fontSize: 40,color: '#fff', opacity: 1}}/>
								</TouchableOpacity>
								<TouchableOpacity style={{height: 40,width: 60,alignSelf: 'flex-end'}}>
									<FontAwesomeIcon iconClass="fab fa-google-plus-g" nativeBaseIconName="logo-googleplus" style={styles.iconStyle} styles={{fontSize: 40,color: '#fff', opacity: 1,alignSelf: 'flex-end'}}/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={{flex: 1,alignItems: 'center'}}>
							<TouchableOpacity style={{borderBottomWidth: 1,borderColor: '#fff'}} onPress={this.onButtonPress.bind(this)}>
								<Text style={{color: '#fff'}}>Continue as guest</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
  	flex: 1,
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  form: {
  	flex: 2,
  	paddingLeft: 80,
  	paddingRight: 80,
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
  
});