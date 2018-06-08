import React from 'react';
import { View, Text, Image,StyleSheet, TouchableOpacity} from 'react-native'
import RadioButton from '../../components/Buttons/RadioButton'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import {getVehicleFilters} from '../../actions/VehicleForm'
import {getFromLocalStorage,saveToLocalStorage} from '../../components/localStorage'
import { connect } from 'react-redux'
class RecomendedFilter extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			selectedFilterType: '',
			vehicleData: {},
			loader: false
		}
	}
	async componentDidMount(){
		let data = await this.props.dispatch(getFromLocalStorage('vehicleData'))
		console.log(data, 12345);
		this.setState({vehicleData: data,loader: true})
		if (data) {
			this.props.dispatch(getVehicleFilters(data.make,data.model)).then(res => {
				this.setState({ loader: false})
			})
		}
		
	}
	onButtonPress() {
		console.log(this.props)
		let vehicleData = this.state.vehicleData
		vehicleData.filterType = this.state.selectedFilterType
		console.log(vehicleData,222)
		let data = JSON.stringify(vehicleData)
  		this.props.dispatch(saveToLocalStorage('vehicleData' , data))
	  	this.props.history.push('/address');
	}
	onButtonPress2() {
		console.log(this.props)
	  	this.props.history.push('/recomended-oil');
	}
	onChange(event){
		console.log(event)
		this.setState({ selectedFilterType: event });
	}
	
	render(){
		const filters = this.props.VehicleForm && this.props.VehicleForm.filterTypeList;
		console.log(this.props)
		const {vehicleData} = this.state;
		console.log(this.state.selectedFilterType)
		return(
			<View style={styles.container}>
				<View style={styles.leftArrow}>
					<TouchableOpacity onPress={this.onButtonPress2.bind(this)} style={{width: 30}}>
						<FontAwesomeIcon iconClass="fas fa-arrow-left" nativeBaseIconName="ios-arrow-dropleft" />
					</TouchableOpacity>
				</View>
				<View style={styles.view}>
					<Text style={styles.heading}>Recomended filter For {vehicleData.make} {vehicleData.model} {vehicleData.year}</Text>
				</View>
				<View style={styles.list}>
					{filters && filters.length == 0 && !this.state.loader && <Text style={{textAlign: 'center',color: '#fff',fontSize: 22}}>No FilterType to show</Text>}
					<RadioButton list={filters && filters} onSelectValue={this.onChange.bind(this)}/>
				</View>
				<View style={styles.view}>
					<Image source={require('../../img/oil.png')} style={styles.img}/>
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
}, mapDispatch))(RecomendedFilter);


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
		paddingLeft: 20,
		paddingRight: 20
	},
	list: {
		flex: 1,
		padding: 20,
		justifyContent: 'center'
	},
	heading: {
		fontSize: 26,
		textAlign: 'center'
	},
	img: {
		width: 70,
		height: 70
	},
	arrow: {
		alignItems: 'flex-end', 
		alignSelf: 'flex-end', 
		marginTop: 20
	},
	leftArrow: {
	  	margin: 24
	}
	
})
