import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import {Link } from '../../Routing'
import FontComponent from '../FontComponent'
export default class ConfirmButton extends React.Component{
	render(){
		return(
				<TouchableOpacity style={this.props.disabled ? styles.viewDisable : styles.view} onPress={this.props.onButtonPress} disabled={this.props.disabled}>
          <FontComponent style={{color: '#fff',fontFamily: 'dosis-bold'}} text={this.props.label}/>
				</TouchableOpacity>
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
  	backgroundColor: '#f5b443',
  	height: 45,
  	borderRadius: 5,
  },
  viewDisable : {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edcc93',
    height: 45,
    borderRadius: 5
  },
  arrow: {
  	color: '#fff'
  }
});