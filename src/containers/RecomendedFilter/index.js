import React from 'react';
import { View, Text, Image,StyleSheet, TouchableOpacity} from 'react-native'
import RadioButton from '../../components/Buttons/RadioButton'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import {getVehicleFilters} from '../../actions/VehicleForm'
import {getFromLocalStorage,saveToLocalStorage} from '../../components/localStorage'
import { connect } from 'react-redux'
import ArrowButton from '../../components/Buttons/ArrowButton'
class RecomendedFilter extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			selectedFilterType: '',
			vehicleData: {},
			loading: false
		}
	}
	async componentDidMount(){
		let data = await this.props.dispatch(getFromLocalStorage('vehicleData'))
		this.setState({vehicleData: data,loading: true})
		if (data.filterType) {
			this.setState({selectedFilterType: data.filterType})
		}
		if (data) {
			this.props.dispatch(getVehicleFilters(data.make,data.model)).then(res => {
				this.setState({ loading: false})
			})
		}
		
	}
	onButtonPress() {
		if(this.state.selectedFilterType){
			let vehicleData = this.state.vehicleData
			vehicleData.filterType = this.state.selectedFilterType
			let data = JSON.stringify(vehicleData)
	  		this.props.dispatch(saveToLocalStorage('vehicleData' , data))
		  	this.props.history.push('/address');
	  	}
	}
	onButtonPress2() {
	  	this.props.history.push('/recomended-oil');
	}
	onChange(event){
		this.setState({ selectedFilterType: event });
	}
	
	render(){
		const filters = this.props.VehicleForm && this.props.VehicleForm.filterTypeList;
		const {vehicleData} = this.state;
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
				{this.state.loading && <View style={styles.loading}>
					<Text style={styles.innerLoader}><Image source={require('../../img/loading.gif')} style={{width: 60, height: 60}} /></Text>
				</View>
				}
				<View style={styles.list}>
					{filters && filters.length == 0 && <Text style={{textAlign: 'center',color: '#fff',fontSize: 22}}>No FilterType to show</Text>}
					<RadioButton list={filters && filters} value={this.state.selectedFilterType} onSelectValue={this.onChange.bind(this)}/>
				</View>
				<View style={styles.view}>
					<Image source={require('../../img/oil.png')} style={styles.img}/>
					<ArrowButton onPress={this.onButtonPress.bind(this)} disabled={this.state.selectedFilterType == ''} />
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
	},
	loading :{
		justifyContent: 'center',
		padding: 10,
		alignItems: 'center'
	},
	innerLoader :{
		width: 80
	}
	
})
