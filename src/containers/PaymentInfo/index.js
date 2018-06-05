import React from 'react';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import InputBox from '../../components/InputBox'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import { connect } from 'react-redux'
import {getFromLocalStorage,saveToLocalStorage,removeLocalStorage} from '../../components/localStorage'
class PaymentInfo extends React.Component{
	componentWillMount()	{
		this.props.dispatch(removeLocalStorage('vehicleData'))
		this.props.dispatch(removeLocalStorage('addressData'))
	}
	onButtonPress() {
		console.log(this.props)
	  	this.props.history.push('/final-screen');
	}
	onButtonPress2() {
		console.log(this.props)
	  	this.props.history.push('/summary');
	}

	onChangeText(event){
		console.log(event)
	}
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.leftArrow}>
					<TouchableOpacity onPress={this.onButtonPress2.bind(this)} style={styles.oil}>
						<FontAwesomeIcon iconClass="fas fa-arrow-left" nativeBaseIconName="ios-arrow-dropleft" />
					</TouchableOpacity>
				</View>
				<View style={styles.arrow}>
					<Text style={styles.heading}>Payment Info</Text>
				</View>
				<View style={styles.view}>
					<View style={styles.payment}>
						<InputBox placeholder="Name" onChange={this.onChangeText.bind(this)}/>
					</View>
					<View style={styles.payment}>
						<InputBox placeholder="Card number" onChange={this.onChangeText.bind(this)}/>
					</View>
					<View style={styles.row}>
						<View style={styles.cw}>
							<View style={styles.placeholder}>
								<InputBox placeholder="Cw" onChange={this.onChangeText.bind(this)}/>
							</View>
						</View>
						<View style={styles.last}>
							<View style={styles.placeholder}>
								<InputBox placeholder="Exp" onChange={this.onChangeText.bind(this)}/>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.view}>
					<ConfirmButton label="Confirm order" onButtonPress={this.onButtonPress.bind(this)}/>
				</View>
			</View>
		)
	}
}

export default connect(state => ({
  // vehicleForm: state.vehicleForm,
}, mapDispatch))(PaymentInfo);


const mapDispatch = (dispatch) => {
   const allActionProps = Object.assign({}, dispatch);
   return allActionProps;
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  view: {
  	flex: 1,
  	justifyContent: 'center',
  	alignItems: 'center',
  	width: '100%',
  	paddingLeft: 20,
  	paddingRight: 20
  },
  arrow: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  heading: {
  	fontSize: 26
  },
  payment: {
  	marginBottom: 10,
  	width: '100%'
  },
  row: {
  	marginBottom: 10,
  	width: '100%',
  	flexDirection: 'row'
  },
  cw: {
  	width: '50%'
  },
  placeholder: {
  	width: '99%'
  },
  last: {
  	width: '50%', 
  	alignSelf: 'flex-end', 
  	alignItems: 'flex-end'
  },
  leftArrow: {
  	margin: 24
  },
  oil: {
  	width: 30
  }
});