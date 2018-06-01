import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
var timekit = require('timekit-sdk');
console.log(timekit);
export default class TimeSlot extends React.Component{
	componentWillMount(){
		timekit.configure({
		  appKey: 'test_api_key_qNYEtidaxMtFyopx2ofjqwJriNsi9TBI',
		 
		})
	}
	onButtonPress() {
		console.log(this.props)
	  	this.props.history.push('/summary');
	}
	onButtonPress2() {
		console.log(this.props)
	  	this.props.history.push('/address');
	}
	// onClick(){
	// 	timekit.getApp().then(res => {
	// 		console.log(res,44444)
	// 	})	
	// }
	render(){
		return(
			<View style={styles.container}>
				
				<View style={styles.leftArrow}>
					<TouchableOpacity onPress={this.onButtonPress2.bind(this)} style={styles.oil}>
						<FontAwesomeIcon iconClass="fas fa-arrow-left" nativeBaseIconName="ios-arrow-dropleft" />
					</TouchableOpacity>
				</View>
				
				<View style={styles.view}>
					<Text style={styles.heading}>Select Time slot</Text>
				</View>
				<View style={styles.oilss}>
					
					<View style={styles.left}>
						<TouchableOpacity style={styles.row}>
							<FontAwesomeIcon iconClass="fas fa-arrow-left" nativeBaseIconName="ios-arrow-dropleft" />
						</TouchableOpacity>
						<View style={styles.row}>
							<Text>Sun 4/24</Text>
						</View>
						<TouchableOpacity style={styles.row}>
							<FontAwesomeIcon iconClass="fas fa-arrow-right" nativeBaseIconName="ios-arrow-dropright" />
						</TouchableOpacity>
					</View>
					<View style={styles.full}>
						<Text>7:00-8:00 am</Text>
					</View>
					<View style={styles.full}>
						<Text>8:00-9:00 am</Text>
					</View>
					<View style={styles.full}>
						<Text>9:00-10:00 am</Text>
					</View>
					<View style={styles.full}>
						<Text>10:00-11:00 am</Text>
					</View>
					<View style={styles.full}>
						<Text>11:00-12:00 am</Text>
					</View>
					<View style={styles.full}>
						<Text>12:00-1:00 pm</Text>
					</View>
					<View style={styles.full}>
						<Text>9:00-10:00 am</Text>
					</View>
					
				</View>
				<View style={styles.row2}>
					<View style={styles.bottom}>
						<TouchableOpacity onPress={this.onButtonPress2.bind(this)} style={styles.oil}>
							<FontAwesomeIcon iconClass="fas fa-arrow-left" nativeBaseIconName="ios-arrow-dropleft" />
						</TouchableOpacity>
					</View>
					<View style={styles.bottom2}>
						<TouchableOpacity onPress={this.onButtonPress.bind(this)} >
							<FontAwesomeIcon iconClass="fas fa-arrow-right" nativeBaseIconName="ios-arrow-dropright" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	view: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20
	},
	heading: {
		fontSize: 26,
		textAlign: 'center'
	},
	left: {
		width: '100%',
		height: 40,
		backgroundColor: '#fff',
		borderRadius: 5,
		marginBottom: 5,
		flexDirection: 'row'
	},
	row: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	full: {
		width: '100%',
		height: 40,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginBottom: 5
	},
	row2: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
		flexDirection: 'row',
		
	},
	bottom: {
		flex: 1,
		justifyContent: 'center',
	},
	bottom2: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center'
	},
	leftArrow: {
		margin: 24
	},
	oilss: {
		flex: 3,
		paddingRight: 20,
		paddingLeft: 20
	},
	oil: {
		width: 30
	}
})