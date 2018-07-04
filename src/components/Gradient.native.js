import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native'
import { LinearGradient } from 'expo';
export default class Gradient extends React.Component{
	render(){
		return(
			<View style={styles.container} >
				<LinearGradient
		          colors={['#fdf450', '#e13530']}
		          style={styles.container}
		          start={[1.1, -0.1]} end={[0.1, 1]}
		         >
					{this.props.child}
				</LinearGradient>
			</View>
		)
	}
}
const styles = StyleSheet.create({
  	container: {
		flex: 1
  	}
});