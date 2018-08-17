import React from 'react';
import {TextInput, View, Text, StyleSheet, TouchableOpacity} from 'react-native'
export default class Gradient extends React.Component{
	
	render(){
		return(
			<View style={{flex: 1}}>
				{this.props.child}
			</View>
	    )
	}
}
