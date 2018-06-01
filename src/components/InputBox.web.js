import React from 'react';
import {Text, View} from 'react-native'
export default class InputBox extends React.Component{

	onChange(event){
		console.log(event.target.value)
		this.props.onChange(event.target.value)
	}
	render(){
		return(
			<input placeholder={this.props.placeholder} style={{paddingLeft: 10, paddingRight: 10, width: '100%', height: 50, fontSize: 20, borderRadius: 5, border: 'none'}} onChange={this.onChange.bind(this)}/>
		)
	}
}