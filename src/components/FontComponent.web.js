import React from 'react'
import { Text} from 'react-native'
export default class FontStyle extends React.Component{
	render(){
		return(
			<Text className={this.props.className} style={this.props.style}>{this.props.text}</Text>
		)
	}
}