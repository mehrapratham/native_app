import React from 'react';
import {Text, View} from 'react-native'
export default class FontAwesomeIcon extends React.Component{
	render(){
		return(
			<i className={this.props.iconClass} style={this.props.disabled ? {fontSize: 26,color: '#a4a4a4', opacity: 0.5} : {fontSize: 26,color: '#d6edf8', opacity: 1}}></i>
		)
	}
}