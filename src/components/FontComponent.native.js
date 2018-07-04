import React from 'react'
import { Font } from 'expo';
import { Text, View } from 'react-native'
export default class FontStyle extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			fontLoaded: false
		}
	}
	async componentDidMount() {
	    await Font.loadAsync({
	      'dosis-bold': require('../assets/fonts/Dosis-Bold.ttf'),
	      'dosis-medium': require('../assets/fonts/Dosis-Medium.ttf'),

	    });

	    this.setState({ fontLoaded: true });
	}

	render(){
		
		return(
			<View>
			{this.state.fontLoaded ?<Text style={this.props.style}>{this.props.text}</Text>:null}
			</View>
		)
	}
}