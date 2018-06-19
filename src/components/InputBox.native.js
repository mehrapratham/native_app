import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native'
export default class InputBox extends React.Component{
  onChange(event){
    this.props.onChange(event)
  }

	render(){
		return(
			<TextInput
      	placeholder={this.props.placeholder}
      	placeholderTextColor="#646262"
      	style={styles.container}
        onChangeText={this.onChange.bind(this)}
        type={this.props.type}
        maxLength={this.props.maxLength}
        value={this.props.value}
        returnKeyType = {this.props.nextkey}
        underlineColorAndroid="transparent"
        
	    />
		)
	}
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 45, 
    width: "100%", 
    paddingLeft: 15, 
    fontSize: 15, 
    borderRadius: 5,
    borderBottomWidth: 4,
    borderColor: '#c5c3c4'
  },
})