import React from 'react';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import SelectBox from '../../components/SelectBox'
import InputBox from '../../components/InputBox'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'

export default class Vehicleform extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			yearlist: [2018, 2019, 2020],
			makelist: ['BMW', 'Audi', 'Bentlay', 'Farari'],
			modellist: [2018, 2019, 2020],
			selected1: 1
		}
	}
	onValueChange(value: string) {
	    this.setState({
	      selected1: value
	    });
	    console.log(value)
	  }
  	onButtonPress() {
	  	this.props.history.push('/recomended-oil');
	}
	onButtonPress2() {
	  	this.props.history.push('/');
	}
	onChangeText(event){
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
					<Text style={styles.heading}>Enter Vehicle Details</Text>
				</View>
				<View style={styles.view}>
					<SelectBox placeholder="Year" list={this.state.yearlist} selectedValue={this.state.selected1} onValueChange={this.onValueChange.bind(this)}/>
					<SelectBox placeholder="Make" list={this.state.makelist} selectedValue={this.state.selected1} onValueChange={this.onValueChange.bind(this)}/>
					<SelectBox placeholder="Model" list={this.state.modellist} selectedValue={this.state.selected1} onValueChange={this.onValueChange.bind(this)}/>
					<InputBox placeholder="Mileage" onChange={this.onChangeText.bind(this)} />
				</View>
				<View style={styles.lasts}>
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
  	width: '100%',
  	paddingLeft: 20,
  	paddingRight: 20,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  arrow: {
  	alignItems: 'flex-end', 
  	alignSelf: 'flex-end',
  	marginTop: 20
  },
  leftArrow: {
  	margin: 24
  },
  lasts: {
  	flex: 1,
  	paddingRight: 20,
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  heading: {
  	fontSize: 26,
  	textAlign: 'center'
  },
  oil: {
  	width: 30
  }
});