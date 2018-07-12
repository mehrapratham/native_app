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
import FontComponent from '../../components/FontComponent'
class RecomendedOil extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			selectedOilType: '',
			selectedOilGrade: '',
			selectedOilPrice: '',
			vehicleData: {},
			loading: false,
			errors: {},
			oilGrade: ['Conventional', 'Synthetic Blend', 'Full Synthetic']
		}
	}
	async componentDidMount(){
		let data = await this.props.dispatch(getFromLocalStorage('vehicleData'))
		this.setState({vehicleData: data,loading: true})
		if (data.oilType) {
			this.setState({selectedOilType: data.oilType, selectedOilGrade: data.oilGrade, selectedOilPrice: data.oilPrice})
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
			vehicleData.oilType = this.state.selectedOilType;
			vehicleData.oilGrade = this.state.selectedOilGrade;
			vehicleData.oilPrice = this.state.selectedOilPrice

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
	onChangeGrade(event){
		let {selectedOilPrice} = this.state;
		if (event == 'Conventional') {
			selectedOilPrice = '29.99';
		}
		else if (event == 'Synthetic Blend') {
			selectedOilPrice = '49.99';
		}
		else if (event == 'Full Synthetic') {
			selectedOilPrice = '79.99';
		}
		this.setState({ selectedOilGrade: event, selectedOilPrice });
	}
	render(){
		const types = this.props.VehicleForm && this.props.VehicleForm.oilTypeList;
		const {vehicleData} = this.state;
		const text = "Recomended oil For "+vehicleData.make+" "+vehicleData.model+" "+vehicleData.year
		const total = 'Total $'+this.state.selectedOilPrice
		let child = <View style={styles.container}>
			<StatusBar
		      barStyle="light-content"
		      backgroundColor="blue"
		    />
			<View style={styles.headingCon}>
				<FontComponent className="mainHeadingTop" style={{fontSize: 26,textAlign: 'center',fontFamily: 'dosis-bold'}} text={text}/>
				<FontComponent className="mainSubHeading" style={{fontSize: 20,textAlign: 'center',fontFamily: 'dosis-medium'}} text="( Select one )"/>
			</View>
			<View style={styles.radiobttn}>
				<ScrollView style={styles.radio}>
					<View style={{flexDirection: 'row'}}>
						<View style={{flex: 1}} className="radioCon" >
							<FontComponent className="mainHeading" style={{fontSize: 20, marginLeft: 15, marginBottom: 10,fontFamily: 'dosis-medium'}} text="Select Oil Type"/>
							{this.state.loading ? <View style={styles.loading}>
								<Text style={styles.innerLoader}><Image source={require('../../img/loading.gif')} style={styles.last2} /></Text>
							</View>:<RadioButton list={types} name="oilType" value={this.state.selectedOilType} onSelectValue={this.onChange.bind(this)} className="radioBtn"/>
							}
							{types && types.length == 0 && <FontComponent style={{textAlign: 'center',color: '#fff',fontSize: 22,fontFamily: 'dosis-bold'}} text="No OilType to show"/>}
						</View>
						<View style={{flex: 1}}>
							<FontComponent style={{fontSize: 20, marginLeft: 15, marginBottom: 10,fontFamily: 'dosis-medium'}} text="Select Oil Grade"/>
							<RadioButton list={this.state.oilGrade} name="oilGrade" value={this.state.selectedOilGrade} onSelectValue={this.onChangeGrade.bind(this)}/>
						</View>
					</View>
				</ScrollView>
				<View style={styles.img}>
					{this.state.selectedOilPrice.length != 0 &&<FontComponent style={{textAlign: 'center', fontSize: 20, marginBottom: 10,fontFamily: 'dosis-bold'}} text={total}/>}
					<View style={styles.innerOil}>
						<Image source={require('../../img/oiltype.jpeg')} style={styles.imgSize}/>
					</View>
				</View>
			</View>
			<View style={styles.lastss}>
				<View style={styles.lasts}>
					<View style={styles.last4}>
						<ArrowLeftButton onPress={this.onButtonPress2.bind(this)} />
					</View>
					<View style={styles.last4}>
						<ArrowRightButton onPress={this.onButtonPress.bind(this)} disabled={(this.state.selectedOilType == '') || (this.state.selectedOilGrade == '')} />
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
	  	alignItems: 'center',
	  	alignSelf: 'center',
	  	justifyContent: 'center',
	  	paddingTop: 20,
	  	paddingLeft: 20,
	  	paddingRight: 20,
	  	paddingTop: 10,
	  	paddingBottom: 10
	  },
	view: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20
	},
	radiobttn: {
		flex: 3,
		padding: 20,
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
		justifyContent: 'flex-end'
	},
	labelText: {
		fontSize: 20, marginLeft: 15, marginBottom: 10	
	},
	innerOil: {
		width: 50,
		height: 70,
		overflow: 'hidden'
	},
	imgSize: {
		width: '100%',
		height: '100%'
	},
	lastss: {
		flex: 1,
		justifyContent: 'flex-end'
	}
})