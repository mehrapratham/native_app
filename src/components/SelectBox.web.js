import React from 'react';
import {Text, View} from 'react-native'
export default class SelectBox extends React.Component{
	onChange(event){
	    this.props.onValueChange(event.target.value)
	}
	render(){
		return(
			<select value={this.props.selectedValue} style={{padding: 10, width: '100%', height: 50, fontSize: 20, borderRadius: 0, marginBottom: 20, borderBottom: 'solid 4px #c5c3c4'}} onChange={this.onChange.bind(this)}>
				<option value="">{this.props.placeholder}</option>
				{this.props.list && this.props.list.reverse().map((item, key) =>{
              	return <option value={item} key={key}>{item}</option>
              })}
			</select>
		)
	}
} 