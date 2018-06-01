import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import {Link } from '../../Routing'
export default class ConfirmButton extends React.Component{
	render(){
		return(
			<View style={styles.container}>
				<TouchableOpacity style={styles.view} onPress={this.props.onButtonPress}>
					<Text style={styles.arrow}>{this.props.label}</Text>
				</TouchableOpacity>
			</View>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  view: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	backgroundColor: '#21409a',
  	height: 40,
  	borderRadius: 5
  },
  arrow: {
  	color: '#fff'
  }
});