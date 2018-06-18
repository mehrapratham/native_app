import React from 'react';
import {Text, View} from 'react-native'
export default class InputBox extends React.Component{

	onChange(event){
		this.props.onChange(event.target.value)
	}
	render(){
		return(
			<input type={this.props.type} value={this.props.value} placeholder={this.props.placeholder} style={{paddingLeft: 10, paddingRight: 10, width: '100%', height: 50, fontSize: 20, borderRadius: 5, border: 'none', marginBottom: 20, borderBottom: 'solid 4px #c5c3c4'}} onChange={this.onChange.bind(this)}/>
		)
	}
}