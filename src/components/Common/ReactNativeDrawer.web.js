import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import FontAwesomeIcon from '../Icon/FontAwesomeIcon'
import MenuItem from './MenuItem'
export default class ReactNativeDrawer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpened: false
    }
  }
  closeDrawer = () => {
      this.setState({ isOpened: false })
    };
    openDrawer = () => {
      if(this.state.isOpened){
        this.closeDrawer()
      }else{
        this.setState({ isOpened: true })
      }
    };
    goToLogin(){
      this.props.history.push('/')
    }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: '#000',height: 50,justifyContent: 'center',paddingLeft: 0}}>
          <Text style={{color: '#fff', paddingLeft: 20, padingRight: 20, fontSize: 20, textAlign: 'center'}}>Schedule a service today</Text>
        </View>
        <View style={{flex: 1}}>
          {this.props.child}
        </View>
      </View>
    );
  }
}
