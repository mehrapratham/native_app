import React from 'react'
import { Text, View } from 'react-native'
export default class ToastComponent extends React.Component{
	render(){
		return(
			<View style={{height: 70,width: '100%',position: 'absolute',bottom: 70}}>
				<View style={{justifyContent: 'center',alignItems: 'center',borderRadius: 3,backgroundColor: 'rgba(0,0,0,0.7)',marginLeft: 20,marginRight: 20}}>
					<Text style={{color: '#fff',padding: 10}}>{this.props.msg}</Text>
				</View>
			</View>

		)
	}
}