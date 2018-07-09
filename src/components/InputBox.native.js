import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native'
export default class InputBox extends React.Component{
  constructor (props) {
        super(props);
        this.state = {hasFocus: false};
  }
  onChange(event){
    this.props.onChange(event)
  }
  setFocus (hasFocus, e) {
    console.log(222)
      this.setState({hasFocus});
      if (hasFocus && this.props.disableAnimate) {
        this.props.disableAnimate(true)
      } 
      else if(!hasFocus && this.props.disableAnimate){
        this.props.disableAnimate(false)
      }
  }

  
	render(){
		return(
			<TextInput
      	placeholder={this.props.placeholder}
      	placeholderTextColor="#646262"
      	style={styles.container}
        style={this.state.hasFocus ? styles.focusedTextInput : styles.container}
        onChangeText={this.onChange.bind(this)}
        type={this.props.type}
        maxLength={this.props.maxLength}
        value={this.props.value}
        returnKeyType = {this.props.nextkey}
        underlineColorAndroid="transparent"
        onFocus={this.setFocus.bind(this, true)}
        onBlur={this.setFocus.bind(this, false)}
        keyboardType={this.props.keyboardType}
        enablesReturnKeyAutomatically={true}
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
  focusedTextInput: {
    backgroundColor: '#fff',
    height: 45, 
    width: "100%", 
    paddingLeft: 15, 
    fontSize: 15, 
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#9df441',
  }
})