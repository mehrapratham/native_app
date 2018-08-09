import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo';
export default class Shadow extends React.Component{
	render(){
		return(
			<LinearGradient
			  colors={['rgba(255,255,255,255)', 'rgba(0,0,0,0.1)']}
			  style={{height: 10}}
			  >
			</LinearGradient>
		)
	}
}