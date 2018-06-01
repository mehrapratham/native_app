import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
export default class RecomendedOil extends React.Component{
	onButtonPress() {
		console.log(this.props)
	  	this.props.history.push('/payment-info');
	}
	onButtonPress2() {
		console.log(this.props)
	  	this.props.history.push('/time-slot');
	}
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.leftArrow}>
					<TouchableOpacity onPress={this.onButtonPress2.bind(this)} style={styles.row}>
						<FontAwesomeIcon iconClass="fas fa-arrow-left" nativeBaseIconName="ios-arrow-dropleft" />
					</TouchableOpacity>
				</View>
				<View style={styles.view}>
					<Text style={styles.heading}>Order summary</Text>
				</View>
				<View style={styles.view}>
					<View style={styles.left}>
						<Text>Oil type: 5w30</Text>
					</View>
					<View style={styles.left}>
						<Text>filter type: stp32323</Text>
					</View>
					<View style={styles.left}>
						<Text>Nissan sentra 2013</Text>
					</View>
					<View style={styles.left}>
						<Text>Time: 4/23 8:00-9:00 am</Text>
					</View>
					<View style={styles.left}>
						<Text>Address: 2323 23st, Mill Creek WA, 99233</Text>
					</View>
				</View>
				<View style={styles.view}>
					<ConfirmButton label="Confirm order" onButtonPress={this.onButtonPress.bind(this)}/>
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
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginBottom: 5
	},
	row: {
		width: 30
	},
	leftArrow: {
		margin: 24
	}
	
})