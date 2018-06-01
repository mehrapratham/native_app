import React from 'react';
import {Text, View} from 'react-native'
export default class SelectBox extends React.Component{
	onChange(event){
	    // console.log(event.target.value)
	    this.props.onValueChange(event.target.value)
	}
	render(){
		return(
			<select style={{padding: 10, width: '100%', height: 50, fontSize: 20, marginBottom: 10, borderRadius: 0}} onChange={this.onChange.bind(this)}>
				<option>Select</option>
				{this.props.list && this.props.list.map((item, key) =>{
              	return <option value={item}>{item}</option>
              })}
			</select>
		)
	}
}