import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import FontAwesomeIcon from '../Icon/FontAwesomeIcon'
import MenuItem from './MenuItem'
import {getFromLocalStorage,saveToLocalStorage,removeLocalStorage} from '../localStorage'  
import {togglePopUpStatus} from '../../actions/VehicleForm'
import { connect } from 'react-redux'
class ReactNativeDrawer extends React.Component {
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
    closeModal(){
      this.props.dispatch(removeLocalStorage('vehicleData'))
      this.props.dispatch(removeLocalStorage('addressData'))
      this.props.dispatch(removeLocalStorage('currentBookingDetail'))
      this.props.dispatch(removeLocalStorage('confirmOrder'))
      let rootElement = document.getElementById('rootElement');
      let body = document.getElementById('body');
      let html = document.getElementById('html');
      rootElement.classList.remove('opened')
      body.style.overflow = '';
      html.style.overflow = '';
      this.props.dispatch(togglePopUpStatus(true))
      this.props.history.push('/')
    }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: '#000',height: 50,justifyContent: 'center',paddingLeft: 0}}>
          <Text style={{color: '#fff', paddingLeft: 20, padingRight: 20, fontSize: 20, textAlign: 'center',fontFamily: 'dosis-bold'}}>Schedule a service today</Text>
        </View>
        <button class="close closeBtn" onClick={this.closeModal.bind(this)}>
          <i class="fa fa-times"></i>
        </button>
        <View style={{flex: 1}}>
          {this.props.child}
        </View>
      </View>
    );
  }
}
export default connect(state => ({
}, mapDispatch))(ReactNativeDrawer);

const mapDispatch = (dispatch) => {
   const allActionProps = Object.assign({}, dispatch);
   return allActionProps;
}
