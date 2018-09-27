import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,ScrollView, StatusBar, PixelRatio,Dimensions } from 'react-native'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import { connect } from 'react-redux'
import {getAvailability, getBookings} from '../../actions/VehicleForm'
import moment from 'moment'
import {getFromLocalStorage,saveToLocalStorage} from '../../components/localStorage'
import ArrowLeftButton from '../../components/Buttons/ArrowLeftButton'
import ArrowRightButton from '../../components/Buttons/ArrowRightButton'
import ReactNativeDrawer from '../../components/Common/ReactNativeDrawer'
import {timekitAPI, defaultResourceId} from '../../actions/remoteAPIKeys'
import Shadow from '../../components/Shadow'
import FontComponent from '../../components/FontComponent'
var timekit = require('timekit-sdk');
var FONT_BACK_26   = 22;
var FONT_BACK_20   = 18;

if (PixelRatio.get() == 1) {
  FONT_BACK_26 = 26;
  FONT_BACK_20 = 20;
}

class TimeSlot extends React.Component{

	constructor(){
		super();
		this.state = {
			filterTime: moment().format(),
			loading: false,
			selectedTime: {},
			vehicleData: {},
		}
	}
	
	async componentWillMount(){
		let addressData = await this.props.dispatch(getFromLocalStorage('addressData'))
		if(addressData == null){
			this.props.history.push('/')
		}
		timekit.configure({
		  appKey: timekitAPI,
		 
		})
		this.setState({loading: true})
		let data = {
					resource_ids: [defaultResourceId], 
					future: '1 month' , 
					length : '1 hour',
					"filters": {
					  "or":[
					    { "specific_day_and_time": {"day": "Sunday", "start": 6, "end": 22, "timezone": "America/Los_Angeles" }},
					    { "specific_day_and_time": {"day": "Monday", "start": 6, "end": 22, "timezone": "America/Los_Angeles" }},
					    { "specific_day_and_time": {"day": "Tuesday", "start": 6, "end": 22, "timezone": "America/Los_Angeles" }},
					    { "specific_day_and_time": {"day": "Wednesday", "start": 6, "end": 22, "timezone": "America/Los_Angeles" }},
					    { "specific_day_and_time": {"day": "Thursday", "start": 6, "end": 22, "timezone": "America/Los_Angeles" }},
					    { "specific_day_and_time": {"day": "Friday", "start": 6, "end": 22, "timezone": "America/Los_Angeles" }},
					    { "specific_day_and_time": {"day": "Saturday", "start": 6, "end": 22, "timezone": "America/Los_Angeles" }}
					  ]
					}
				}
		timekit.findTime(data).then(res => {
			this.props.dispatch(getAvailability(res.data))
			this.setState({loading: false})
		})

		let vehicleData = await this.props.dispatch(getFromLocalStorage('vehicleData'))
		this.setState({ vehicleData: vehicleData })
		if (vehicleData && vehicleData.timeslot) {
			this.setState({selectedTime: vehicleData.timeslot})
		}
		const api = await this.props.dispatch(getBookings())
	}
	onButtonPress() {
		if(this.state.selectedTime.start){
			let vehicleData = this.state.vehicleData
			vehicleData.timeslot = this.state.selectedTime
			let data = JSON.stringify(vehicleData)
	  		this.props.dispatch(saveToLocalStorage('vehicleData' , data))
		  	this.props.history.push('/recomended-oil');
		}
	}
	onButtonPress2() {
	  	this.props.history.push('/address');
	}
	booking(item, isClickAble){
		console.log(isClickAble,777)
		if (!isClickAble) {
			this.setState({ selectedTime: item })
		}
		
	}
	filterDate(date){
		 if (date && moment(this.state.filterTime).format('M') == moment(date.start).format('M') && moment(this.state.filterTime).date() == moment(date.start).date()) {
			return date
		}
	}
	formatDate(date){ 
		return (moment(date.start).format('hh')+ ':' +moment(date.start).format('mm') +' '+ moment(date.start).format('a')+ ' - ' + moment(date.end).format('hh')+ ':' +moment(date.end).format('mm') + ' ' + moment(date.end).format('a'))
	}
	nextDate(){
		let {filterTime} = this.state;
		filterTime = moment(filterTime).add(1, 'days');
		this.setState({filterTime})
	}
	prevDate(){
		let {filterTime} = this.state;
		filterTime = moment(filterTime).subtract(1, 'days');
		this.setState({filterTime})
	}
	render(){
		const miniCardStyle = {shadowColor: '#000000',shadowOpacity: 19.9,shadowRadius: 5,backgroundColor: '#ffffff',borderWidth: 2,elevation:20,borderColor: 'transparent'
    };
		let curAvailbility = this.props.VehicleForm.availabilityList && this.props.VehicleForm.availabilityList.filter(item=> this.filterDate(item) )
		let child = <View style={styles.container}>
						<StatusBar
					      barStyle="light-content"
					      backgroundColor="blue"
					    />
						<View style={styles.view}>
							<FontComponent className="mainHeadingTop" style={{fontSize: FONT_BACK_26,fontFamily: 'dosis-bold'}} text="Select Time slot"/>
						</View>
						<View style={styles.oilss}>
							<View style={styles.left}>
								<TouchableOpacity style={styles.row} onPress={this.prevDate.bind(this)}>
									<FontAwesomeIcon iconClass="fas fa-arrow-left" nativeBaseIconName="ios-arrow-dropleft" />
								</TouchableOpacity>
								<View style={styles.row}>
									<Text className="timeheading">{moment(this.state.filterTime).format('ddd MM/DD') }</Text>
								</View>
								<TouchableOpacity style={styles.row} onPress={this.nextDate.bind(this)}>
									<FontAwesomeIcon iconClass="fas fa-arrow-right" nativeBaseIconName="ios-arrow-dropright" />
								</TouchableOpacity>
							</View>
							{/*<View style={{flex: 2,borderWidth: 1,shadowOpacity: 1, shadowRadius: 4,shadowColor: 'grey'}}>*/}
							<ScrollView style={styles.last2} showsVerticalScrollIndicator={true} indicatorStyle={'black'}  >

							{this.state.loading && <View style={styles.loading}>
									<Text style={styles.innerLoader}><Image source={require('../../img/loading.gif')} style={styles.last3} /></Text>
								</View>
							}
							{!this.state.loading && curAvailbility && curAvailbility.length == 0 && <Text style={styles.center}>No time slot available</Text>}
							
							{!this.state.loading && curAvailbility && curAvailbility.map((item, index) =>{
								const bookingIndex = this.props.VehicleForm && this.props.VehicleForm.bookingList && this.props.VehicleForm.bookingList.findIndex(bookingItem => bookingItem.date == item.start);
								const bookingObject = this.props.VehicleForm && this.props.VehicleForm.bookingList && this.props.VehicleForm.bookingList.find(bookingItem => bookingItem.date == item.start);
								let isClickAble = bookingObject && bookingObject.token && bookingObject.token != 'undefined' && (bookingIndex != -1);
								return  <TouchableOpacity activeOpacity={bookingIndex != -1 ? 1 : 0} style={((this.state.selectedTime.start == item.start) && (this.state.selectedTime.end == item.end)) ? styles.fullSelected : (isClickAble ? styles.booked : styles.full)} key={index} onPress={this.booking.bind(this,item, isClickAble)}>
											<Text className="timeSlot" style={((this.state.selectedTime.start == item.start) && (this.state.selectedTime.end == item.end)) ? styles.fullSelectedText : (isClickAble ? styles.fullSelectedText : null)}>{this.formatDate(item)}</Text>
										</TouchableOpacity>
								})
							}
							</ScrollView>
							{!this.state.loading &&<View>
								<Shadow />
							</View>}
						</View>
						<View style={styles.lastss}>
							<View style={styles.lasts}>
								<View style={styles.last4}>
									<ArrowLeftButton onPress={this.onButtonPress2.bind(this)} onPressWeb={this.onButtonPress2.bind(this)} />
								</View>
								<View style={styles.last4}>
									<ArrowRightButton onPress={this.onButtonPress.bind(this)} onPressWeb={this.onButtonPress.bind(this)} disabled={this.state.selectedTime && !this.state.selectedTime.start} />
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
}, mapDispatch))(TimeSlot);

const mapDispatch = (dispatch) => {
   const allActionProps = Object.assign({}, dispatch);
   return allActionProps;
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	view: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 40
	},
	left: {
		width: '100%',
		height: 40,
		backgroundColor: '#fff',
		borderRadius: 5,
		marginBottom: 5,
		flexDirection: 'row'
	},
	row: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	full: {
		width: '100%',
		height: 40,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginBottom: 5
	},
	fullSelected:{
		width: '100%',
		height: 40,
		backgroundColor: '#e84b33',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginBottom: 5
	},
	booked:{
		width: '100%',
		height: 40,
		backgroundColor: '#ccc',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginBottom: 5,
	},

	
	fullSelectedText: {
		color: '#fff'
	},
	row2: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
		flexDirection: 'row',
		
	},
	bottom: {
		flex: 1,
		justifyContent: 'center',
	},
	bottom2: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center'
	},
	leftArrow: {
		margin: 24
	},
	oilss: {
		flex: 3,
		paddingRight: 20,
		paddingLeft: 20,
		justifyContent: 'center',
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
	  	paddingBottom: 30
	  },
	center:{
	  	textAlign: 'center',
	  	marginTop: 20,
	  	fontSize: FONT_BACK_20,
	  	color: '#fff'
	},
	last2: {
		height: 150,
		marginTop: 20
	},
	last3: {
		width: 60, 
		height: 60
	},
	last4: {
		width: '50%', 
		alignSelf: 'flex-start'
	},
	lastss: {
		flex: 1,
		justifyContent: 'flex-end'
	}
})