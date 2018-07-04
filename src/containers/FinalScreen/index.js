import React from 'react';
import { View, Text, StyleSheet, StatusBar} from 'react-native'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import { connect } from 'react-redux'
import {getFromLocalStorage,saveToLocalStorage,removeLocalStorage} from '../../components/localStorage'
import FontComponent from '../../components/FontComponent'
import ReactNativeDrawer from '../../components/Common/ReactNativeDrawer'
class FinalStep extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      orderData: {}
    }
  }
  async componentWillMount(){
    let orderData = await this.props.dispatch(getFromLocalStorage('confirmOrder'))
    this.setState({ orderData : orderData })
    this.props.dispatch(removeLocalStorage('vehicleData'))
    this.props.dispatch(removeLocalStorage('addressData'))
  }
  onButtonPress(){
    this.props.history.push('/')
  }

	render(){
    let {orderData} = this.state;
    let child = <View style={styles.container}>
                  <StatusBar
                    barStyle="light-content"
                    backgroundColor="blue"
                  />
                  <View style={styles.headingview}>
                    <FontComponent style={{fontSize: 26,textAlign: 'center',fontFamily: 'dosis-bold'}} text="Congratulations Your Oil service Has been scheduled"/>
                  </View>
                  <View style={styles.view}>
                    <View style={styles.arrow}>
                      <Text>Oil type: {orderData.oilType}</Text>
                    </View>
                    <View style={styles.arrow}>
                      <Text>filter type: {orderData.filterType}</Text>
                    </View>
                    <View style={styles.arrow}>
                      <Text>{orderData.make + ' ' +orderData.model + ' ' +orderData.year}</Text>
                    </View>
                    <View style={styles.arrow}>
                      <Text>Time: {orderData.date + ' ' + orderData.time}</Text>
                    </View>
                    <View style={styles.arrow}>
                      <Text>Address: {orderData.street + ', ' +orderData.city + ', ' +orderData.state + ', ' +orderData.zip}</Text>
                    </View>
                  </View>
                  <View style={styles.btnview}>
                    <View style={styles.address}>
                      <Text style={styles.text2}>Sign up and create Profile and recieve 50% off next oil change</Text>
                    </View>
                    <View style={styles.text}> 
                      <ConfirmButton label="Sign Up" onButtonPress={this.onButtonPress.bind(this)}/>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  view: {
  	flex: 1,
  	paddingLeft: 20,
  	paddingRight: 20
  },
  arrow: {
  	width: '100%',
  	height: 40,
  	backgroundColor: '#fff',
  	justifyContent: 'center',
  	alignItems: 'center',
  	borderRadius: 5,
  	marginBottom: 5
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
    paddingBottom: 10,
    marginTop: 50
  },
  text: {
  	flex: 1,
  	width: '100%'
  },
  text2: {
  	textAlign: 'center',
  	fontSize: 20
  }
});