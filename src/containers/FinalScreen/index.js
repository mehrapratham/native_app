import React from 'react';
import { View, Text, StyleSheet} from 'react-native'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import { connect } from 'react-redux'
import {getFromLocalStorage,saveToLocalStorage,removeLocalStorage} from '../../components/localStorage'
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
  }

	render(){
    console.log(this.state.orderData)
    let {orderData} = this.state;
		return(
			<View style={styles.container}>
				<View style={styles.view}>
					<Text style={styles.heading}>Congratulations Your Oil service Has been scheduled</Text>
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
				<View style={styles.view}>
					<View style={styles.address}>
						<Text style={styles.text2}>Sign up and create Profile and recieve 50% off next oil change</Text>
					</View>
					<View style={styles.text}> 
						<ConfirmButton label="Sign Up" />
					</View>
				</View>
			</View>
		)
	}
}

export default connect(state => ({
  // vehicleForm: state.vehicleForm,
}, mapDispatch))(FinalStep);


const mapDispatch = (dispatch) => {
   const allActionProps = Object.assign({}, dispatch);
   return allActionProps;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
  	flex: 1,
  	justifyContent: 'center',
  	alignItems: 'center',
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
  heading: {
  	fontSize: 26,
  	textAlign: 'center'
  },
  address: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center'
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