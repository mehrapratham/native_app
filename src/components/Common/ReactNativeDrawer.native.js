import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Drawer } from 'native-base';
import FontAwesomeIcon from '../Icon/FontAwesomeIcon'
export default class ReactNativeDrawer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpened: false
    }
  }
  closeDrawer = () => {
      this.drawer._root.close()
      this.setState({ isOpened: false })
    };
    openDrawer = () => {
      console.log(22222)
      if(this.state.isOpened){
        this.closeDrawer()
      }else{
        this.drawer._root.open()
        this.setState({ isOpened: true })
      }
    };
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center',paddingTop: 20}}>
        <View style={{backgroundColor: '#000',height: 40,justifyContent: 'center',paddingLeft: 15}}>
            <TouchableOpacity onPress={this.openDrawer}>
              {this.state.isOpened ?
                <FontAwesomeIcon iconClass="fas fa-times" nativeBaseIconName="user" style={styles.icon}  styles={{fontSize: 22,color: '#fff',marginLeft: 20}}/>
                :
                <FontAwesomeIcon iconClass="fas fa-bars" nativeBaseIconName="home" style={styles.icon}  styles={{fontSize: 22,color: '#fff',marginLeft: 20}}/>
              }
            </TouchableOpacity>
        </View>
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<Text style={{backgroundColor: '#000',height: '100%'}}>gfjfsagfhsf</Text>}
          onClose={() => this.closeDrawer()}
          tapToClose={true}
          openDrawerOffset={0.5} >
          {this.props.child}
        </Drawer>
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