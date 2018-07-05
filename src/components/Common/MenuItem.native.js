import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import FontComponent from '../FontComponent'
export default class MenuItem extends React.Component{
	render(){
		return(
			<View style={styles.container}>
      	<TouchableOpacity style={styles.last2} onPress={this.props.goToLogin}>
          <FontComponent style={{fontSize: 20,color: '#fff',fontFamily: 'dosis-bold'}} text="Login"/>
      	</TouchableOpacity>
      	<TouchableOpacity style={styles.last2}>
          <FontComponent style={{fontSize: 20,color: '#fff',fontFamily: 'dosis-bold'}} text="Register"/>
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