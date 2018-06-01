import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native'
import { LinearGradient } from 'expo';
export default class Gradient extends React.Component{
	render(){
		return(
			<View style={{flex: 1}} >
				<LinearGradient
		          colors={['#6F3615', '#EF6337']}
		          style={styles.container}>
					{this.props.child}
				</LinearGradient>
			</View>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    // alignItems: 'center'
  },
  
});