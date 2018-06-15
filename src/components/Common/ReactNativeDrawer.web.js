import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
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
            <TouchableOpacity onPress={this.openDrawer} style={{width:40}}>
              {this.state.isOpened ?
                <FontAwesomeIcon iconClass="fas fa-times" nativeBaseIconName="user" style={styles.icon}  styles={{fontSize: 22,color: '#fff',marginLeft: 20}}/>
                :
                <FontAwesomeIcon iconClass="fas fa-bars" nativeBaseIconName="home" style={styles.icon}  styles={{fontSize: 22,color: '#fff',marginLeft: 20}}/>
              }
            </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <div className={this.state.isOpened ? "menuOverlay opened" : 'menuOverlay'} onClick={this.closeDrawer}></div>
          <div className={this.state.isOpened ? 'sideMenu opened' : 'sideMenu'}>
            <MenuItem goToLogin={this.goToLogin.bind(this)}/>
          </div>
          {this.props.child}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    color: '#d6edf8',
    fontSize: 22,
    opacity: 1
  }
  
});