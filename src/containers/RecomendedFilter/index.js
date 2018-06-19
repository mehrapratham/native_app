import React from 'react';
import { View, Text, Image,StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import RadioButton from '../../components/Buttons/RadioButton'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import {getVehicleFilters} from '../../actions/VehicleForm'
import {getFromLocalStorage,saveToLocalStorage} from '../../components/localStorage'
import { connect } from 'react-redux'
import ArrowLeftButton from '../../components/Buttons/ArrowLeftButton'
import ArrowRightButton from '../../components/Buttons/ArrowRightButton'
import ReactNativeDrawer from '../../components/Common/ReactNativeDrawer'
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
		let child = <View style={styles.container}>
						<View style={styles.headingCon}>
							<Text style={styles.heading}>Recomended filter For {vehicleData.make} {vehicleData.model} {vehicleData.year}</Text>
							<Text style={styles.subheading}>(Select one)</Text>
						</View>
						<View style={styles.list}>
							<ScrollView style={styles.radio}>
							{this.state.loading ? <View style={styles.loading}>
									<Text style={styles.innerLoader}><Image source={require('../../img/loading.gif')} style={styles.last2} /></Text>
								</View>:
							<RadioButton list={filters && filters} value={this.state.selectedFilterType} onSelectValue={this.onChange.bind(this)}/>
							}
							{filters && filters.length == 0 && <Text style={styles.last3}>No FilterType to show</Text>}
							</ScrollView>
							<View style={styles.img}>
								<View style={{width: 100,height: 150,overflow: 'hidden'}}>
									<Image source={require('../../img/oiltype.jpeg')} style={{width: '100%',height: '100%'}}/>
								</View>
							</View>
						</View>
						<View style={styles.lasts}>
							<View style={styles.last4}>
								<ArrowLeftButton onPress={this.onButtonPress2.bind(this)} />
							</View>
							<View style={styles.last4}>
								<ArrowRightButton onPress={this.onButtonPress.bind(this)} disabled={this.state.selectedFilterType == ''} />
							</View>
						</View>
					</View>
		return(
			<ReactNativeDrawer child={child} history={this.props.history}/>
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
	headingCon:{
	  	flex: 1,
	  	alignItems: 'center',
	  	alignSelf: 'center',
	  	justifyContent: 'center',
	  	paddingTop: 20,
	  	paddingLeft: 20,
	  	paddingRight: 20
	  },
	view: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20
	},
	list: {
		flex: 3,
		padding: 20
	},
	heading: {
		fontSize: 26,
		textAlign: 'center'
	},
	subheading:{
		fontSize: 20,
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
	},
	lasts: {
	  	paddingRight: 20,
	  	paddingLeft: 20,
	  	flexDirection: 'row',
	  	marginBottom: 30
	},
	last2: {
		width: 60, 
		height: 60
	},
	last3: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 22
	},
	last4: {
		width: '50%', 
		alignSelf: 'flex-start'
	},
	radio: {
		flex: 1,
	},
	img: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
	}
	
})
