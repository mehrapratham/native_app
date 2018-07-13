import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet,PixelRatio } from 'react-native'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../Icon/FontAwesomeIcon'
var FONT_BACK_26   = 22;

if (PixelRatio.get() == 1) {
  FONT_BACK_26 = 26;
}
export default class ArrowLeftButton extends React.Component{
	render(){
		return(
      <View style={styles.arrowView} className="arrowView">
  			<TouchableOpacity  style={this.props.disabled ? styles.arrowDisabled : styles.arrow} onPress={this.props.onPress} disabled={this.props.disabled}>
          <FontAwesomeIcon iconClass="fa fa-angle-left" nativeBaseIconName="ios-arrow-dropleft" disabled={this.props.disabled} styles={{fontSize: FONT_BACK_26}}/>
        </TouchableOpacity>
      </View>
		)
	}
}
const styles = StyleSheet.create({
  arrowView:{
    borderRadius: 30,
    width: 55,
    height: 55,
    paddingLeft: 5,
    paddingTop: 5,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  arrow: {
    alignItems: 'center', 
    alignSelf: 'flex-start',
    width: 45,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center'
  },
  
  arrowDisabled: {
    alignItems: 'center', 
    alignSelf: 'flex-start',
    marginTop: 20,
    backgroundColor: '#ccc',
    borderRadius: 100,
    width: 45,
    height: 45,
    justifyContent: 'center'
  }
});