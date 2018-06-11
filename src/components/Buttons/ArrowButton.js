import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../Icon/FontAwesomeIcon'
export default class ArrowButton extends React.Component{
	render(){
		return(
			<TouchableOpacity  style={this.props.disabled ? styles.arrowDisabled : styles.arrow} style={styles.arrow} onPress={this.props.onPress} disabled={this.props.disabled}>
        <FontAwesomeIcon iconClass="fas fa-arrow-right" nativeBaseIconName="ios-arrow-dropright" disabled={this.props.disabled} />
      </TouchableOpacity>
		)
	}
}
const styles = StyleSheet.create({
  arrow: {
    alignItems: 'flex-end', 
    alignSelf: 'flex-end',
    marginTop: 20
  },
  arrowDisabled: {
    alignItems: 'flex-end', 
    alignSelf: 'flex-end',
    marginTop: 20,
    opacity: 0.3,
    backgroundColor: 'red'
  }
});