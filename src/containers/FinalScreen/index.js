import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, PixelRatio } from 'react-native'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import { connect } from 'react-redux'
import {getFromLocalStorage,saveToLocalStorage,removeLocalStorage} from '../../components/localStorage'
import FontComponent from '../../components/FontComponent'
import ReactNativeDrawer from '../../components/Common/ReactNativeDrawer'
import moment from 'moment'
var FONT_BACK_26   = 22;
var FONT_BACK_20   = 18;
var FONT_BACK_18   = 16;

if (PixelRatio.get() == 1) {
  FONT_BACK_26 = 26;
  FONT_BACK_20 = 20;
  FONT_BACK_18 = 18;
}
class FinalStep extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      orderData: {}
    }
  }
  async componentWillMount(){
    let orderData = await this.props.dispatch(getFromLocalStorage('confirmOrder'))
    if(orderData == null){
      this.props.history.push('/')
    }
    console.log(orderData, 1234)
    this.setState({ orderData: orderData })
    this.props.dispatch(removeLocalStorage('vehicleData'))
    this.props.dispatch(removeLocalStorage('addressData'))
  }
  onButtonPress(){
    this.props.history.push('/')
  }

	render(){
    let {orderData} = this.state;
    console.log(orderData.time,555)
    let child = <View style={styles.container}>
                  <StatusBar
                    barStyle="light-content"
                    backgroundColor="blue"
                  />
                  <View style={styles.headingview}>
                    <FontComponent className="mainHeadingTop" style={{fontSize: FONT_BACK_26,textAlign: 'center',fontFamily: 'dosis-bold', paddingTop: 10}} text="Congratulations Your Oil service Has been scheduled"/>
                  </View>
                  <View style={styles.view}>
                    <ScrollView style={{height: 100}}>
                      {orderData && orderData.oilType != 'undefined' && orderData.oilType != 'null' ? <TouchableOpacity style={styles.lastCon} activeOpacity={1}>
                        <View style={styles.innerCon}><FontComponent style={{fontSize: FONT_BACK_18,fontWeight: 'bold',fontFamily: 'dosis-bold'}} text="Oil type"/></View>
                        <View style={styles.innerCon3}><FontComponent style={{alignSelf: 'flex-end',fontFamily: 'dosis-medium'}} text={orderData.oilType}/></View>
                      </TouchableOpacity>:null}
                      {orderData && orderData.filterType != 'undefined' && orderData.filterType != 'null' ? <TouchableOpacity style={styles.lastCon} activeOpacity={1}>
                        <View style={styles.innerCon}><FontComponent style={{fontSize: FONT_BACK_18,fontWeight: 'bold',fontFamily: 'dosis-bold'}} text="filter type"/></View>
                        <View style={styles.innerCon3}><FontComponent style={{alignSelf: 'flex-end',fontFamily: 'dosis-medium'}} text={orderData.filterType}/></View>
                      </TouchableOpacity>:null}
                      <TouchableOpacity style={styles.lastCon} activeOpacity={1}>
                        <View style={styles.innerCon}><FontComponent style={{fontSize: FONT_BACK_18,fontWeight: 'bold',fontFamily: 'dosis-bold'}} text="Car / Model"/></View>
                        <View style={styles.innerCon3}><FontComponent style={{alignSelf: 'flex-end',fontFamily: 'dosis-medium'}} text={orderData.make + ' ' +orderData.model + ' ' +orderData.year + ' ' +orderData.trim}/></View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.lastCon} activeOpacity={1}>
                        <View style={styles.innerCon}><FontComponent style={{fontSize: FONT_BACK_18,fontWeight: 'bold',fontFamily: 'dosis-bold'}} text="Time"/></View>
                        <View style={styles.innerCon3}><FontComponent style={{alignSelf: 'flex-end',fontFamily: 'dosis-medium'}} text={(orderData && orderData.date && (moment(orderData.date).format('LL') + ' ' + orderData.time))}/></View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.lastCon} activeOpacity={1}>
                        <View style={styles.innerCon}><FontComponent style={{fontSize: FONT_BACK_18,fontWeight: 'bold',fontFamily: 'dosis-bold'}} text="Address"/></View>
                        <View style={styles.innerCon3}><FontComponent style={{alignSelf: 'flex-end',fontFamily: 'dosis-medium'}} text={orderData.first_name + ', '+orderData.last_name+ ', '+orderData.street + ', ' +orderData.street2+ ', '+orderData.city + ', ' +orderData.state + ', ' +orderData.zip}/></View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.lastCon} activeOpacity={1}>
                        <View style={styles.innerCon}><FontComponent style={{fontSize: FONT_BACK_18,fontWeight: 'bold',fontFamily: 'dosis-bold'}} text="Email"/></View>
                        <View style={styles.innerCon3}><FontComponent style={{alignSelf: 'flex-end',fontFamily: 'dosis-medium'}} text={orderData.email}/></View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.lastCon} activeOpacity={1}>
                        <View style={styles.innerCon}><FontComponent style={{fontSize: FONT_BACK_18,fontWeight: 'bold',fontFamily: 'dosis-bold'}} text="Phone"/></View>
                        <View style={styles.innerCon3}><FontComponent style={{alignSelf: 'flex-end',fontFamily: 'dosis-medium'}} text={orderData.phone}/></View>
                      </TouchableOpacity>
                    </ScrollView>
                  </View>
                  <View style={styles.btnview}>
                    {/*<View style={styles.address}>
                      <FontComponent style={{textAlign: 'center',fontSize: FONT_BACK_20,fontFamily: 'dosis-medium'}} text="Sign up and create Profile and recieve 50% off next oil change"/>
                    </View>*/}
                    <View style={styles.text}> 
                      <ConfirmButton label="Book another appointment" onButtonPress={this.onButtonPress.bind(this)} onButtonPressWeb={this.onButtonPress.bind(this)}/>
                    </View>
                  </View>
                </View>
		return(
      <ReactNativeDrawer child={child} history={this.props.history}/>
		)
	}
}

export default connect(state => ({
}, mapDispatch))(FinalStep);

const mapDispatch = (dispatch) => {
   const allActionProps = Object.assign({}, dispatch);
   return allActionProps;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingview:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  view: {
  	flex: 3,
  	paddingLeft: 20,
  	paddingRight: 20
  },
  btnview:{
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1
  },
  address: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center',
    paddingBottom: 40,
    marginTop: 50
  },
  text: {
  	flex: 1,
  	width: '100%',
    justifyContent: 'flex-end'
  },
  lastCon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5
  },
  innerCon: {
    width: '30%',
    paddingLeft: 15
  },
  innerCon3: {
    width: '70%',
    paddingRight: 15
  },
});