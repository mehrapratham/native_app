import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
export default class ToastComponent extends React.Component{
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.OuterView}>
					<Text style={styles.text}>{this.props.msg}</Text>
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		height: 70,
		width: '100%',
		position: 'absolute',
		bottom: 70
	},
	OuterView: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
		backgroundColor: 'rgba(0,0,0,0.7)',
		marginLeft: 20,
		marginRight: 20
	},
	text: {
		color: '#fff',
		padding: 10
	}
})