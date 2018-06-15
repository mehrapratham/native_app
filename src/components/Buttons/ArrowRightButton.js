import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../Icon/FontAwesomeIcon'
export default class ArrowRightButton extends React.Component{
	render(){
		return(
      <View style={styles.arrowView}>
  			<TouchableOpacity  style={this.props.disabled ? styles.arrowDisabled : styles.arrow} onPress={this.props.onPress} disabled={this.props.disabled}>
          <FontAwesomeIcon iconClass="fa fa-angle-right" nativeBaseIconName="ios-arrow-dropright" disabled={this.props.disabled} styles={{fontSize: 26}} />
        </TouchableOpacity>
      </View>
		)
	}
}
const styles = StyleSheet.create({
  arrowView:{
    alignItems: 'center', 
    alignSelf: 'flex-end',
    borderRadius: 30,
    width: 55,
    height: 55,
    paddingRight: 0,
    paddingTop: 5,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  arrow: {
    alignItems: 'center', 
    width: 45,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center'
  },
  arrowIcon: {
  },
  arrowDisabled: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 100,
    width: 45,
    height: 45,
    justifyContent: 'center'
  }
});