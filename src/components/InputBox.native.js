import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native'
export default class InputBox extends React.Component{
  onChange(event){
    console.log(event)
    this.props.onChange(event)
  }

	render(){
		return(
			<TextInput
      	placeholder={this.props.placeholder}
      	underlineColorAndroid="#d6edf8"
      	placeholderTextColor="#646262"
      	style={styles.container}
        onChangeText={this.onChange.bind(this)}
        type={this.props.type}
        maxLength={this.props.maxLength}
	    />
		)
	}
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 50, 
    width: "100%", 
    paddingLeft: 15, 
    fontSize: 15, 
    borderRadius: 5
  },
})