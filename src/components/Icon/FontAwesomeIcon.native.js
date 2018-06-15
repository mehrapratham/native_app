import React from 'react';
import {Text, View, StyleSheet} from 'react-native'
import {Icon} from 'native-base'
export default class FontAwesomeIcon extends React.Component{
	render(){
		return(
			<Icon name={this.props.nativeBaseIconName} style={this.props.style}/>
		)
	}
}
