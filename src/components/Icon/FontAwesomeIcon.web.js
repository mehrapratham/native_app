import React from 'react';
import {Text, View} from 'react-native'
export default class FontAwesomeIcon extends React.Component{
	render(){
		return(
			<i className={this.props.iconClass} style={this.props.styles}></i>
		)
	}
}