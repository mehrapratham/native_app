import React from 'react';
import {Text, View, StyleSheet} from 'react-native'
import {Icon} from 'native-base'
export default class FontAwesomeIcon extends React.Component{
	render(){
		return(
			<Icon name={this.props.nativeBaseIconName} style={this.props.disabled ? styles.iconDisabled : styles.icon}/>
		)
	}
}
const styles = StyleSheet.create({
  icon: {
    color: '#d6edf8',
    fontSize: 22,
    opacity: 1
  },
  iconDisabled: {
  	color: '#a4a4a4',
    fontSize: 22,
    opacity: 0.8
  }
})