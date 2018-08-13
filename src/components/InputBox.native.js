import React from 'react';
import {TextInput, View, StyleSheet, PixelRatio } from 'react-native'
var FONT_BACK_15   = 13;

if (PixelRatio.get() == 1) {
  FONT_BACK_15 = 15;
}
export default class InputBox extends React.Component{
  constructor (props) {
        super(props);
        this.state = {hasFocus: false};
  }
  onChange(event){
    this.props.onChange(event)
  }
  setFocus (hasFocus, e) {
    console.log(this.props.hitOnFocus,222)
      this.setState({hasFocus});

      if (hasFocus && this.props.disableAnimate) {
        this.props.disableAnimate(true)
      } 
      else if(!hasFocus && this.props.disableAnimate){
        this.props.disableAnimate(false)
      }

      if (hasFocus && this.props.hitOnFocus) {
        console.log(this.props.hitOnFocus,33333)
        this.props.hitOnFocus(true);
      }
      else if(!hasFocus && this.props.hitOnFocus){
        this.props.hitOnFocus(false)
      }

  }

  
	render(){
		return(
			<TextInput
      	placeholder={this.props.placeholder}
      	placeholderTextColor="#646262"
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
    fontSize: FONT_BACK_15, 
    borderRadius: 5,
    borderBottomWidth: 4,
    borderColor: '#c5c3c4'
  },
  focusedTextInput: {
    backgroundColor: '#fff',
    height: 45, 
    width: "100%", 
    paddingLeft: 15, 
    fontSize: FONT_BACK_15, 
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#9df441',
  }
})