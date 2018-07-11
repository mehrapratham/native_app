import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import {getFromLocalStorage,saveToLocalStorage,removeLocalStorage} from '../../components/localStorage'
import { connect } from 'react-redux'
import moment from 'moment'	
import {confirmOrder} from '../../actions/VehicleForm'
import ArrowLeftButton from '../../components/Buttons/ArrowLeftButton'
import ArrowRightButton from '../../components/Buttons/ArrowRightButton'
import ReactNativeDrawer from '../../components/Common/ReactNativeDrawer'
import {timekitAPI, defaultResourceId} from '../../actions/remoteAPIKeys'
import FontComponent from '../../components/FontComponent'
var timekit = require('timekit-sdk');
class Summary extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			vehicleData: {},
			addressData: {}
		}
	}
	async componentWillMount(){
		timekit.configure({
		  appKey: timekitAPI,
		})
		let vehicleData = await this.props.dispatch(getFromLocalStorage('vehicleData'))
		let addressData = await this.props.dispatch(getFromLocalStorage('addressData'))
		this.setState({ vehicleData,addressData })
	}
	onButtonPress() {
		const { vehicleData, addressData } = this.state;
		let data = '{year:"'+vehicleData.year+'",make:"'+vehicleData.make+'",model:"'+vehicleData.model+'",mileage:"'+vehicleData.mileage+'",oilType:"'+vehicleData.oilType+'",filterType:"'+vehicleData.filterType+'",street:"'+addressData.street+'",city:"'+addressData.city+'",zip:"'+addressData.zip+'",state:"'+addressData.state+'",time:"'+this.formatDate(vehicleData && vehicleData.timeslot)+ '",date:"'+ vehicleData.timeslot.start +'",oilGrade:"' +vehicleData.oilGrade +'",oilPrice:"' +vehicleData.oilPrice +'",phone:"' + addressData.phone +'"}'
		this.props.dispatch(confirmOrder(data)).then(res =>{
			let confirmOrder = JSON.stringify(res)
			this.props.dispatch(saveToLocalStorage('confirmOrder' , confirmOrder))
			return res
		})
		let bookingData = {
			start : vehicleData.timeslot.start, 
			end: vehicleData.timeslot.end, 
			what: 'test', 
			description: 'hi, this is description', 
			resource_id: defaultResourceId,
			graph: 'confirm_decline',
			customer: {
				name: vehicleData.make + ' ' +vehicleData.model,
				email: "shamubarak@hotmail.com",
			},
			where: "Courthouse, Hill Valley, CA 95420, USA"
		}
		timekit.createBooking(bookingData).then(res=>{
			let bookingDetail = JSON.stringify(res.data)
			this.props.dispatch(saveToLocalStorage('currentBookingDetail', bookingDetail))
		})
		this.props.history.push('/payment-info');
	}
	onButtonPress2() {
	  	this.props.history.push('/time-slot');
	}
	formatDate(date){
		if (date) {
			return (moment(date.start).format('hh')+ ':' +moment(date.start).format('mm') +' '+ moment(date.start).format('a')+ ' - ' + moment(date.end).format('hh')+ ':' +moment(date.end).format('mm') + ' ' + moment(date.start).format('a'))
		}
	}
	backButton(){
		this.props.history.push('/time-slot')
	}
	render(){
		const { vehicleData,addressData } = this.state;
		const text = vehicleData.make+' '+vehicleData.model+' '+vehicleData.year
		const timeText = vehicleData && vehicleData.timeslot && (moment(vehicleData.timeslot.start).format('M') + '/'+moment(vehicleData.timeslot.start).date())+' '+this.formatDate(vehicleData && vehicleData.timeslot)
		const addressText = addressData.street+' '+addressData.city+' '+addressData.zip+' '+addressData.state
		let child = <View style={styles.container}>
						<StatusBar
					      barStyle="light-content"
					      backgroundColor="blue"
					    />
						<View style={styles.headingView}>
							<FontComponent style={{fontSize: 26,fontFamily: 'dosis-bold'}} text="Order Summary"/>
						</View>
						<View style={styles.view}>
							<ScrollView style={{height: 100}}>
								<TouchableOpacity style={styles.lastCon} activeOpacity={1}>
									<View style={styles.innerCon}><FontComponent style={{fontSize: 18,fontWeight: 'bold',fontFamily: 'dosis-bold'}} text="Price"/></View>
									<View style={styles.innerCon3}><FontComponent style={{alignSelf: 'flex-end',fontFamily: 'dosis-medium'}} text={' ($' + vehicleData.oilPrice+')'}/></View>
								</TouchableOpacity>
								<TouchableOpacity style={styles.lastCon} activeOpacity={1}>
									<View style={styles.innerCon}><FontComponent style={{fontSize: 18,fontWeight: 'bold',fontFamily: 'dosis-bold'}} text="Oil Type"/></View>
									<View style={styles.innerCon3}><FontComponent style={{alignSelf: 'flex-end',fontFamily: 'dosis-medium'}} text={vehicleData.oilType}/></View>
								</TouchableOpacity>
								<TouchableOpacity style={styles.lastCon} activeOpacity={1}>
									<View style={styles.innerCon}><FontComponent style={{fontSize: 18,fontWeight: 'bold',fontFamily: 'dosis-bold'}} text="Filter Type"/></View>
									<View style={styles.innerCon3}><FontComponent style={{alignSelf: 'flex-end',fontFamily: 'dosis-medium'}} text={vehicleData.filterType}/></View>
								</TouchableOpacity>
								<TouchableOpacity style={styles.lastCon} activeOpacity={1}>
									<View style={styles.innerCon}><FontComponent style={{fontSize: 18,fontWeight: 'bold',fontFamily: 'dosis-bold'}} text="Car / Model"/></View>
									<View style={styles.innerCon3}><FontComponent style={{alignSelf: 'flex-end',fontFamily: 'dosis-medium'}} text={text}/></View>
								</TouchableOpacity>
								<TouchableOpacity style={styles.lastCon} activeOpacity={1}>
									<View style={styles.innerCon}><FontComponent style={{fontSize: 18,fontWeight: 'bold',fontFamily: 'dosis-bold'}} text="Time"/></View>
									<View style={styles.innerCon3}><FontComponent style={{alignSelf: 'flex-end',fontFamily: 'dosis-medium'}} text={timeText}/></View>
								</TouchableOpacity>
								<TouchableOpacity style={styles.lastCon} activeOpacity={1}>
									<View style={styles.innerCon}><FontComponent style={{fontSize: 18,fontWeight: 'bold',fontFamily: 'dosis-bold'}} text="Address"/></View>
									<View style={styles.innerCon3}><FontComponent style={{alignSelf: 'flex-end',fontFamily: 'dosis-medium'}} text={addressText}/></View>
								</TouchableOpacity>
								<TouchableOpacity style={styles.lastCon} activeOpacity={1}>
									<View style={styles.innerCon}><FontComponent style={{fontSize: 18,fontWeight: 'bold',fontFamily: 'dosis-bold'}} text="Phone"/></View>
									<View style={styles.innerCon3}><FontComponent style={{alignSelf: 'flex-end',fontFamily: 'dosis-medium'}} text={addressData.phone}/></View>
								</TouchableOpacity>
							</ScrollView>
						</View>
						<View style={styles.lastss}>
							<View style={styles.lasts}>
								<View>
									<ConfirmButton label="CONFIRM ORDER" onButtonPress={this.onButtonPress.bind(this)}/>
								</View>
								<View style={styles.last5}>
									<View style={styles.last4}>
										<ArrowLeftButton onPress={this.onButtonPress2.bind(this)} />
									</View>
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
}, mapDispatch))(Summary);

const mapDispatch = (dispatch) => {
   const allActionProps = Object.assign({}, dispatch);
   return allActionProps;
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	headingView:{
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 50
	},
	view: {
		flex: 2,
		paddingLeft: 20,
		paddingRight: 20,
		justifyContent: 'center'
	},
	left: {
		width: '100%',
		height: 40,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginBottom: 5
	},
	row: {
		width: 30
	},
	leftArrow: {
		margin: 24
	},
	lasts: {
	  	paddingRight: 20,
	  	paddingLeft: 20,
	  	marginBottom: 30
	  },
	lastCon: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		height: 40,
		backgroundColor: '#fff',
		marginBottom: 5,
		borderRadius: 5
	},
	innerCon: {
		width: '50%',
		paddingLeft: 30
	},
	lastCon2: {
		fontSize: 18,fontWeight: 'bold'
	},
	endFlex: {
		alignSelf: 'flex-end'
	},
	innerCon3: {
		width: '50%',
		paddingRight: 30
	},
	last4: {
		width: '50%', 
		alignSelf: 'flex-start'
	},
	last5: {
		flexDirection: 'row', 
		marginTop: 10
	},
	lastss: {
		flex: 1,
		justifyContent: 'flex-end'
	}
	
})