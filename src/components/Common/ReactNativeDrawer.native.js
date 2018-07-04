import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Drawer } from 'native-base';
import FontAwesomeIcon from '../Icon/FontAwesomeIcon'
import MenuItem from './MenuItem'
export default class ReactNativeDrawer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpened: false,
    }
  }
  closeDrawer = () => {
      this.drawer._root.close()
      this.setState({ isOpened: false })
    };
    openDrawer = () => {
      if(this.state.isOpened){
        this.closeDrawer()
      }else{
        this.drawer._root.open()
        this.setState({ isOpened: true })
      }
    };
    goToLogin(){
      this.props.history.push('/')
    }
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={Keyboard.dismiss} accessible={false} activeOpacity={ 1 }>
        <View style={styles.last2}>
            <TouchableOpacity onPress={this.openDrawer}>
              {this.state.isOpened ?
                <FontAwesomeIcon iconClass="fas fa-times" nativeBaseIconName="md-close" style={styles.icon}  styles={{fontSize: 22,color: '#fff',marginLeft: 20}}/>
                :
                <FontAwesomeIcon iconClass="fas fa-bars" nativeBaseIconName="md-menu" style={styles.icon}  styles={{fontSize: 22,color: '#fff',marginLeft: 20}}/>
              }
            </TouchableOpacity>
        </View>
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<View style={{backgroundColor: '#000',height: '100%'}}>
                    <MenuItem goToLogin={this.goToLogin.bind(this)}/>
                  </View>}
          onClose={() => this.closeDrawer()}
          tapToClose={true}
          openDrawerOffset={0.5} >

          {this.props.child}
        </Drawer>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    color: '#d6edf8',
    fontSize: 26,
    opacity: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',

  },
  last2: {
    backgroundColor: '#000',
    height: 64,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingTop: 24
  }
});