import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native'
export default class MenuItem extends React.Component{
	
	render(){
		return(
			<View style={styles.container}>
              	<TouchableOpacity style={styles.last2} onPress={this.props.goToLogin}>
                	<Text style={styles.icon}>Login</Text>
              	</TouchableOpacity>
              	<TouchableOpacity style={styles.last2}>
                	<Text style={styles.icon}>Register</Text>
              	</TouchableOpacity>
            </View>
		)
	}
}
const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    color: '#fff'
  },
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