import React from 'react';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, StatusBar, ScrollView, KeyboardAvoidingView, PixelRatio } from 'react-native'
import SelectBox from '../../components/SelectBox'
import InputBox from '../../components/InputBox'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import { connect } from 'react-redux'
import {getVehicleYears,getVehicleMakes,getVehicleModels,getYears} from '../../actions/VehicleForm'
import {saveToLocalStorage,getFromLocalStorage} from '../../components/localStorage'
import { IsValidForm } from '../../components/Common/validation'
import ReactNativeDrawer from '../../components/Common/ReactNativeDrawer'
import ArrowRightButton from '../../components/Buttons/ArrowRightButton'
import ArrowLeftButton from '../../components/Buttons/ArrowLeftButton'
import FontComponent from '../../components/FontComponent'
import {CarQuery} from 'car-query'
import axios from 'axios'

var FONT_BACK_26   = 22;
if (PixelRatio.get() == 1) {
  FONT_BACK_26 = 26;
}
class Vehicleform extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			vehicle: {
				year: '',
				make: '',
				model: '',
				mileage: ''
			},
			errors:{},
			loading: true
		}
	}
	 async componentWillMount(){
		console.log(33)
		this.props.dispatch(getVehicleYears()).then(res =>{
			console.log(res,444444)
		})
		let data = await this.props.dispatch(getFromLocalStorage('vehicleData'))

		if (data != null) {
			this.setState({vehicle: data});
			if (data.year) {
				this.props.dispatch(getVehicleMakes(data.year))
			}
			if (data.make) {
				this.props.dispatch(getVehicleModels(data.make))
			}
		}
		this.onValueChange()
		axios.get('http://209.97.142.219:3002/years').then(response => {
		    console.log(response,121)
		    // res.json(response.data);
		})
	}
	componentWillReceiveProps(nextProps){
		let {vehicle} = this.state;
		if(this.props.TogglePopup !== nextProps.TogglePopup){
			vehicle = {
				year: '',
				make: '',
				model: '',
				mileage: ''
			}
			this.setState({vehicle})
			this.setState({loading: true})
		}
	}
	onValueChange(key, event) {
		let { vehicle } = this.state;
		vehicle[key] = event;
	    this.setState({vehicle});
	    if(key == 'year'){
	    	this.props.dispatch(getVehicleMakes(event))
	    	vehicle.make = '';
	    	vehicle.model = '';
	    	this.setState({vehicle})
	    }
	    if(key == 'make'){
	    	this.props.dispatch(getVehicleModels(event))
	    	vehicle.model = '';
	    	this.setState({vehicle})
	    }

	    let fields = ['year', 'make', 'model']
      	let formValidation = IsValidForm(fields, this.state.vehicle)
      	this.setState({ errors: formValidation.errors })
      	if (formValidation.validate) {
      		this.setState({loading: false})
      	}
      	else{
      		this.setState({loading: true})
      	}

	  }
  	onButtonPress() {
  		this.setState({loading: true})
  		let fields = ['year', 'make', 'model']
      	let formValidation = IsValidForm(fields, this.state.vehicle)
      	this.setState({ errors: formValidation.errors })
      	if (formValidation.validate) {
      		let data = JSON.stringify(this.state.vehicle)
	  		this.props.dispatch(saveToLocalStorage('vehicleData' , data))
  			this.setState({loading: false})
		  	this.props.history.push('/recomended-oil');
      	}
	}
	onButtonPress2() {
	  	this.props.history.push('/');
	}
	onButtonPressWeb() {
  		this.setState({loading: true})
  		let fields = ['year', 'make', 'model']
      	let formValidation = IsValidForm(fields, this.state.vehicle)
      	this.setState({ errors: formValidation.errors })
      	if (formValidation.validate) {
      		let data = JSON.stringify(this.state.vehicle)
	  		this.props.dispatch(saveToLocalStorage('vehicleData' , data))
  			this.setState({loading: false})
		  	this.props.history.push('/address');
      	}
	}
	onButtonPress2Web() {
	  	this.props.history.push('/');
	}

	render(){
		
		const years = (this.props.VehicleForm && this.props.VehicleForm.yearList) || [];
		const makes = (this.props.VehicleForm && this.props.VehicleForm.makeList) || [];
		const models = (this.props.VehicleForm && this.props.VehicleForm.modelList) || [];
		console.log(this.props,'this.props')
		let child = <View style={styles.container}>
						<StatusBar
					      barStyle="light-content"
					      backgroundColor="#fff"
					    />
						<View style={styles.headingCon}>
							<FontComponent className="mainHeadingTop" style={{fontSize: FONT_BACK_26,textAlign: 'center', fontFamily: 'dosis-bold',paddingTop: 10,paddingBottom: 30}} text="Enter Vehicle Details"/>
						</View>
						<KeyboardAvoidingView style={styles.view} behavior="position" enabled>
							<SelectBox placeholder="Year" list={years} selectedValue={this.state.vehicle.year} onValueChange={this.onValueChange.bind(this,'year')}/>
							<SelectBox placeholder="Make" list={makes} selectedValue={this.state.vehicle.make} onValueChange={this.onValueChange.bind(this,'make')}/>
							<SelectBox placeholder="Model" list={models} selectedValue={this.state.vehicle.model} onValueChange={this.onValueChange.bind(this,'model')}/>
							<InputBox type='number' placeholder="Mileage" value={this.state.vehicle.mileage} onChange={this.onValueChange.bind(this, 'mileage')} nextkey="done" keyboardType='numeric'/>	
						</KeyboardAvoidingView>
						<View style={styles.lastss}>
							<View style={styles.lasts}>
								<View style={styles.last2}>
									<ArrowLeftButton onPress={this.onButtonPress2.bind(this)} onPressWeb={this.onButtonPress2Web.bind(this)} />
								</View>
								<View style={styles.last2}>
									<ArrowRightButton onPress={this.onButtonPress.bind(this)} onPressWeb={this.onButtonPressWeb.bind(this)} disabled={this.state.loading} />
								</View>
							</View>
						</View>
				</View>
		return(
			<ReactNativeDrawer child={child} history={this.props.history}/>
		)
	}
}

export default connect(state => ({
}, mapDispatch))(Vehicleform);


const mapDispatch = (dispatch) => {
   const allActionProps = Object.assign({}, dispatch);
   return allActionProps;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headingCon:{
  	alignItems: 'center',
  	alignSelf: 'center',
  	justifyContent: 'center'
  },
  view: {
  	flex: 2,
  	width: '100%',
  	paddingLeft: 20,
  	paddingRight: 20,
  },
  arrow: {
  	alignItems: 'flex-end', 
  	alignSelf: 'flex-end',
  	marginTop: 20
  },
  leftArrow: {
  	margin: 24,
  	flex: 1
  },
  lasts: {
  	paddingRight: 20,
  	paddingLeft: 20,
  	flexDirection: 'row',
  	marginBottom: 30,
  },
  oil: {
  	width: 30
  },
  last2: {
  	width: '50%', 
  	alignSelf: 'flex-start'
  },
  lastss: {
  	flex: 1,
  	justifyContent: 'flex-end'
  }
});