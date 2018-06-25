import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import RadioButton from '../../components/Buttons/RadioButton'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import { connect } from 'react-redux'
import {getVehicleTypes} from '../../actions/VehicleForm'
import {getFromLocalStorage,saveToLocalStorage} from '../../components/localStorage'
import ArrowRightButton from '../../components/Buttons/ArrowRightButton'
import ArrowLeftButton from '../../components/Buttons/ArrowLeftButton'
import ReactNativeDrawer from '../../components/Common/ReactNativeDrawer'
class RecomendedOil extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			selectedOilType: '',
			vehicleData: {},
			loading: false,
			errors: {}
		}
	}
	async componentDidMount(){
		let data = await this.props.dispatch(getFromLocalStorage('vehicleData'))
		this.setState({vehicleData: data,loading: true})
		if (data.oilType) {
			this.setState({selectedOilType: data.oilType})
		}
		if (data) {
			this.props.dispatch(getVehicleTypes(data.make,data.model)).then(res => {
				this.setState({ loading: false})
			})
		}
	}
	onButtonPress() {
		if(this.state.selectedOilType){
			let vehicleData = this.state.vehicleData
			vehicleData.oilType = this.state.selectedOilType
			let data = JSON.stringify(vehicleData)
	  		this.props.dispatch(saveToLocalStorage('vehicleData' , data))
		  	this.props.history.push('/recomended-filter');
		}
	}
	onButtonPress2() {
	  	this.props.history.push('/vehicle-form');
	}
	onChange(event){
		this.setState({ selectedOilType: event });
	}
	render(){
		const types = this.props.VehicleForm && this.props.VehicleForm.oilTypeList;
		const {vehicleData} = this.state;
		let child = <View style={styles.container}>
						<StatusBar
					      barStyle="light-content"
					      backgroundColor="blue"
					    />
						<View style={styles.headingCon}>
							<Text style={styles.heading}>Recomended oil For {vehicleData.make} {vehicleData.model} {vehicleData.year}</Text>
							<Text style={styles.subheading}>(Select one)</Text>
						</View>
						<View style={styles.radiobttn}>
							<ScrollView style={styles.radio}>
								{this.state.loading ? <View style={styles.loading}>
									<Text style={styles.innerLoader}><Image source={require('../../img/loading.gif')} style={styles.last2} /></Text>
								</View>:<RadioButton list={types} value={this.state.selectedOilType} onSelectValue={this.onChange.bind(this)}/>
								}
								{types && types.length == 0 && <Text style={styles.last3}>No OilType to show</Text>}
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
								<ArrowRightButton onPress={this.onButtonPress.bind(this)} disabled={this.state.selectedOilType == ''} />
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
}, mapDispatch))(RecomendedOil);


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
	img: {
		width: 70,
		height: 70
	},
	radiobttn: {
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
	leftArrow: {
	  	margin: 24
	},
	enter: {
		alignItems: 'flex-end', 
		alignSelf: 'flex-end',
		marginTop: 20
	},
	oil: {
		width: 30
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
		flex: 1
	},
	img: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
	}
})