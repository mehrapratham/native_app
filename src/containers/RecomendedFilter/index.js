import React from 'react';
import { View, Text, Image,StyleSheet, TouchableOpacity} from 'react-native'
import RadioButton from '../../components/Buttons/RadioButton'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
export default class RecomendedFilter extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			list: ['F323-23', 'F323-23 high milage', 'stp32-2323']
		}
	}
	onButtonPress() {
		console.log(this.props)
	  	this.props.history.push('/address');
	}
	onButtonPress2() {
		console.log(this.props)
	  	this.props.history.push('/recomended-oil');
	}
	onChange(event){
		console.log(event)
	}
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.leftArrow}>
					<TouchableOpacity onPress={this.onButtonPress2.bind(this)} style={{width: 30}}>
						<FontAwesomeIcon iconClass="fas fa-arrow-left" nativeBaseIconName="ios-arrow-dropleft" />
					</TouchableOpacity>
				</View>
				<View style={styles.view}>
					<Text style={styles.heading}>Recomended filter For Nissan Sentra 2013</Text>
				</View>
				<View style={styles.list}>
					<RadioButton list={this.state.list} onSelectValue={this.onChange.bind(this)}/>
				</View>
				<View style={styles.view}>
					<Image source={require('../../img/oil.png')} style={styles.img}/>
					<TouchableOpacity style={styles.arrow} onPress={this.onButtonPress.bind(this)}>
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
	list: {
		flex: 1,
		padding: 20,
		justifyContent: 'center'
	},
	heading: {
		fontSize: 26,
		textAlign: 'center'
	},
	img: {
		width: 70,
		height: 70
	},
	arrow: {
		alignItems: 'flex-end', 
		alignSelf: 'flex-end', 
		marginTop: 20
	},
	leftArrow: {
	  	margin: 24
	}
	
})
