import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'

export default class Login extends React.Component{
	onButtonPress() {
		console.log(this.props)
	  	this.props.history.push('/vehicle-form');
	}
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.logo}>
					<Text style={styles.logoText}>TRANZOIL</Text>
				</View>
				<View style={styles.form}>
					<View style={styles.formContainer}>
						<View style={styles.heading}>
							<Text style={styles.color}>USER LOGIN</Text>
						</View>
						<View style={styles.outterBox}>
							<View style={styles.formInner}>
					          <TextInput
					              style={styles.textInput}
					              placeholder="USERNAME"
					              underlineColorAndroid="#d6edf8"
					              placeholderTextColor="#d6edf8"
					          />
					          <View style={styles.ImageStyle}>
					          	<FontAwesomeIcon iconClass="fas fa-user" nativeBaseIconName="ios-contact-outline" />
					          </View>
							</View>
							<View style={styles.formInner}>
					          <TextInput
					              style={styles.textInput2}
					              placeholder="PASSWORD"
					              underlineColorAndroid="#d6edf8"
					              placeholderTextColor="#d6edf8"
					          />
					          <View style={styles.ImageStyle}>
					          <FontAwesomeIcon iconClass="fas fa-unlock-alt" nativeBaseIconName="unlock" />
					          </View>
							</View>
							<View>
								<TouchableOpacity style={styles.button}>
									<Text style={styles.colors}>SIGN IN</Text>
								</TouchableOpacity>
							</View>
							<View>
								<TouchableOpacity>
									<Text style={styles.register}>Register</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={styles.downContainer}>
						<TouchableOpacity style={styles.socialBtn}>
							<View style={styles.common}>
								<FontAwesomeIcon iconClass="fab fa-facebook-f" nativeBaseIconName="logo-facebook" />
							</View>
							<View style={styles.view}>
								<Text style={styles.color}>Login with Facebook</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={styles.socialBtnGoogle}>
							<View style={styles.common}>
								<FontAwesomeIcon iconClass="fab fa-google-plus-g" nativeBaseIconName="logo-googleplus" />
							</View>
							<View style={styles.view}>
								<Text style={styles.color}>Login with Google</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.guestCon}>
						<TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.guestBox}>
							<Text style={styles.guest}>Continue as guest</Text>
						</TouchableOpacity>
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
  	flex: 3,
  	paddingLeft: 20,
  	paddingRight: 20,

  },
  logoText: {
  	fontSize: 26,
  },
  formContainer: {
  },
  color: {
  	color: '#fff'
  },
  heading: {
  	height: 40,
  	justifyContent: 'center',
  	alignItems: 'center',
  	backgroundColor: '#3a3d46'
  },
  formInner: {
  	position: 'relative',
  	backgroundColor: '#fff',
  }, 
	ImageStyle: {
	    height: 25,
	    width: 25,
	    alignItems: 'center',
	    justifyContent: 'center',
	    position: 'absolute',
	    right: 10,
	    top: 7.5
	},
	textInput: {
		paddingLeft: 10,
		color: '#d6edf8',
		borderColor: '#d6edf8',
		borderBottomWidth: 0.6,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderTopWidth: 1,
		height: 40,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5
	},
	textInput2: {
		paddingLeft: 10,
		color: '#d6edf8',
		borderColor: '#d6edf8',
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderTopWidth: 0.5,
		height: 40,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5
	},
	outterBox:{
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		paddingBottom: 10,
		backgroundColor: '#fff'
	},
	button: {
		height: 40,
		backgroundColor: '#3696dc',
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	colors: {
		color: '#fff',
		alignSelf: 'center'
	},
	register: {
		color: '#6075b7',
		fontWeight: 'bold',
		alignSelf: 'center'
	},
	downContainer: {
		marginTop: 5,
		backgroundColor: '#e1e1e1',
		padding: 20
	},
	socialBtn: {
		flexDirection: 'row',
		height: 40,
		alignItems: 'center',
		borderRadius: 5,
		marginBottom: 20,
		backgroundColor: '#3c66c4',
	},
	socialBtnGoogle: {
		flexDirection: 'row',
		height: 40,
		alignItems: 'center',
		borderRadius: 5,
		backgroundColor: '#cf4332',
	},
	guest: {
		color: '#544675',
		fontWeight: 'bold',
		fontSize: 20
	},
	guestCon: {
		marginTop: 5
	},
	common: {
		width: 50, 
		marginRight: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	commonbutn: {
		color: '#fff',
		fontSize: 26,
		fontWeight: 'bold'
	},
	view: {
		width: '70%'
	},
	guestBox: {
		backgroundColor: '#e1e1e1',
		height: 40,
		justifyContent: 'center',
		alignItems: 'center'
	}
});