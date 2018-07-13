import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, PixelRatio } from 'react-native'
import FontComponent from '../FontComponent'
var FONT_BACK_20   = 18;

if (PixelRatio.get() == 1) {
  FONT_BACK_20 = 20;
}
export default class MenuItem extends React.Component{
	render(){
		return(
			<View style={styles.container}>
      	<TouchableOpacity style={styles.last2} onPress={this.props.goToLogin}>
          <FontComponent style={{fontSize: FONT_BACK_20,color: '#fff',fontFamily: 'dosis-bold'}} text="Login"/>
      	</TouchableOpacity>
      	<TouchableOpacity style={styles.last2}>
          <FontComponent style={{fontSize: FONT_BACK_20,color: '#fff',fontFamily: 'dosis-bold'}} text="Register"/>
      	</TouchableOpacity>
      </View>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#000',
    height: '100%'
  },
  last2: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
    paddingLeft: 20
  }
});