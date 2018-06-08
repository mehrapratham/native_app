import React from 'react';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import SelectBox from '../../components/SelectBox'
import InputBox from '../../components/InputBox'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import { connect } from 'react-redux'
import {getVehicleYears,getVehicleMakes,getVehicleModels} from '../../actions/VehicleForm'
import {saveToLocalStorage,getFromLocalStorage} from '../../components/localStorage'
import { IsValidForm } from '../../components/Common/validation'
class Vehicleform extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			yearlist: [2018, 2019, 2020],
			makelist: ['BMW', 'Audi', 'Bentlay', 'Farari'],
			modellist: [2018, 2019, 2020],

			vehicle: {
				year: '',
				make: '',
				model: '',
				mileage: ''
			},
			errors:{}
		}
	}
	 async componentWillMount(){
		
		this.props.dispatch(getVehicleYears())
		let data = await this.props.dispatch(getFromLocalStorage('vehicleData'))

		console.log(data, 12345);
		if (data != null) {
			console.log(data, 9876)
			this.setState({vehicle: data});
			if (data.year) {
				this.props.dispatch(getVehicleMakes(data.year))
			}
			if (data.make) {
				this.props.dispatch(getVehicleModels(data.make))
			}
		}
	}
	onValueChange(key, event) {
		console.log(key, event, 567)
		const { vehicle } = this.state;
		vehicle[key] = event;
	    this.setState({vehicle});
	    if(key == 'year'){
	    	this.props.dispatch(getVehicleMakes(event))
	    }
	    if(key == 'make'){
	    	this.props.dispatch(getVehicleModels(event))
	    }

	  }
  	onButtonPress() {
  		let fields = ['year', 'make', 'model', 'mileage']
      	let formValidation = IsValidForm(fields, this.state.vehicle)
      	this.setState({ errors: formValidation.errors })
      	if (formValidation.validate) {
      		let data = JSON.stringify(this.state.vehicle)
	  		this.props.dispatch(saveToLocalStorage('vehicleData' , data))
		  	this.props.history.push('/recomended-oil');
      	}
	}
	onButtonPress2() {
	  	this.props.history.push('/');
	}

	render(){
		const years = (this.props.VehicleForm && this.props.VehicleForm.yearList) || [];
		const makes = (this.props.VehicleForm && this.props.VehicleForm.makeList) || [];
		const models = (this.props.VehicleForm && this.props.VehicleForm.modelList) || [];
		console.log(this.state.vehicle,987)
		return(
			<View style={styles.container}>
				<View style={styles.leftArrow}>
					<TouchableOpacity onPress={this.onButtonPress2.bind(this)} style={styles.oil}>
						<FontAwesomeIcon iconClass="fas fa-arrow-left" nativeBaseIconName="ios-arrow-dropleft" />
					</TouchableOpacity>
				</View>
				<View style={styles.view}>
					<Text style={styles.heading}>Enter Vehicle Details</Text>
				</View>
				<View style={styles.view}>
					<SelectBox placeholder="Year" list={years} selectedValue={this.state.vehicle.year} onValueChange={this.onValueChange.bind(this,'year')}/>
					<SelectBox placeholder="Make" list={makes} selectedValue={this.state.vehicle.make} onValueChange={this.onValueChange.bind(this,'make')}/>
					<SelectBox placeholder="Model" list={models} selectedValue={this.state.vehicle.model} onValueChange={this.onValueChange.bind(this,'model')}/>
					<InputBox type='number' placeholder="Mileage" value={this.state.vehicle.mileage} onChange={this.onValueChange.bind(this, 'mileage')} />
				</View>
				<View style={styles.lasts}>
					<TouchableOpacity style={styles.arrow} onPress={this.onButtonPress.bind(this)}>
						<FontAwesomeIcon iconClass="fas fa-arrow-right" nativeBaseIconName="ios-arrow-dropright" />
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

export default connect(state => ({
  // vehicleForm: state.vehicleForm,
}, mapDispatch))(Vehicleform);


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
  	width: '100%',
  	paddingLeft: 20,
  	paddingRight: 20,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  arrow: {
  	alignItems: 'flex-end', 
  	alignSelf: 'flex-end',
  	marginTop: 20
  },
  leftArrow: {
  	margin: 24
  },
  lasts: {
  	flex: 1,
  	paddingRight: 20,
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  heading: {
  	fontSize: 26,
  	textAlign: 'center'
  },
  oil: {
  	width: 30
  }
});