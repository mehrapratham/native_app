import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import RadioButton from '../../components/Buttons/RadioButton'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
export default class RecomendedOil extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			list: ['5W-30 stnthetic blend', '0W-20']
		}
	}
	onButtonPress() {
		console.log(this.props)
	  	this.props.history.push('/recomended-filter');
	}
	onButtonPress2() {
		console.log(this.props)
	  	this.props.history.push('/vehicle-form');
	}
	onChange(event){
		console.log(event)
	}
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.leftArrow}>
					<TouchableOpacity onPress={this.onButtonPress2.bind(this)} style={styles.oil}>
						<FontAwesomeIcon iconClass="fas fa-arrow-left" nativeBaseIconName="ios-arrow-dropleft" />
					</TouchableOpacity>
				</View>
				<View style={styles.view}>
					<Text style={styles.heading}>Recomended oil For Nissan Sentra 2013</Text>
				</View>
				<View style={styles.radiobttn}>
					<RadioButton list={this.state.list} onSelectValue={this.onChange.bind(this)}/>
				</View>
				<View style={styles.view}>
					<Image source={require('../../img/oil.png')} style={styles.img}/>
					<TouchableOpacity  style={styles.enter} onPress={this.onButtonPress.bind(this)}>
						<FontAwesomeIcon iconClass="fas fa-arrow-right" nativeBaseIconName="ios-arrow-dropright" />
					</TouchableOpacity>
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
	img: {
		width: 70,
		height: 70
	},
	radiobttn: {
		flex: 1,
		padding: 20,
		justifyContent: 'center'
	},
	heading: {
		fontSize: 26,
		textAlign: 'center'
	},
	leftArrow: {
	  	margin: 24
	},
	enter: {
		alignItems: 'flex-end', 
		alignSelf: 'flex-end',
		marginTop: 20
	},
	oil: {
		width: 30
	}
})