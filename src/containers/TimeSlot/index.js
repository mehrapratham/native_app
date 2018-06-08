import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,ScrollView} from 'react-native'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import { connect } from 'react-redux'
import {getAvailability} from '../../actions/VehicleForm'
import moment from 'moment'
import {getFromLocalStorage,saveToLocalStorage} from '../../components/localStorage'
var timekit = require('timekit-sdk');
console.log(timekit);
class TimeSlot extends React.Component{

	constructor(){
		super();
		this.state = {
			filterTime: moment().format(),
			loading: false,
			selectedTime: '',
			vehicleData: {},
		}
	}
	
	async componentWillMount(){
		timekit.configure({
		  appKey: 'test_api_key_qNYEtidaxMtFyopx2ofjqwJriNsi9TBI',
		 
		})
		this.setState({loading: true})
		let data = {
					resource_ids: ["286d96b5-567d-4eb3-b34a-dd085a25185d"], 
					future: '1 month' , 
					length : '1 hour'
				}
		timekit.findTime(data).then(res => {
			this.props.dispatch(getAvailability(res.data))
			this.setState({loading: false})
		})
		let vehicleData = await this.props.dispatch(getFromLocalStorage('vehicleData'))
			this.setState({ vehicleData: vehicleData })

	}
	onButtonPress() {
		let vehicleData = this.state.vehicleData
		vehicleData.timeslot = this.state.selectedTime
		let data = JSON.stringify(vehicleData)
  		this.props.dispatch(saveToLocalStorage('vehicleData' , data))
	  	this.props.history.push('/summary');
	}
	onButtonPress2() {
	  	this.props.history.push('/address');
	}
	booking(item){
		this.setState({ selectedTime: item })
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
		let curAvailbility = this.props.VehicleForm.availabilityList && this.props.VehicleForm.availabilityList.filter(item=> this.filterDate(item) )
		return(
			
			<View style={styles.container}>
				
				<View style={styles.leftArrow}>
					<TouchableOpacity onPress={this.onButtonPress2.bind(this)} style={styles.oil}>
						<FontAwesomeIcon iconClass="fas fa-arrow-left" nativeBaseIconName="ios-arrow-dropleft" />
					</TouchableOpacity>
				</View>
				
				<View style={styles.view}>
					<Text style={styles.heading}>Select Time slot</Text>
				</View>
				<View style={styles.oilss}>
					
					<View style={styles.left}>
						<TouchableOpacity style={styles.row} onPress={this.prevDate.bind(this)}>
							<FontAwesomeIcon iconClass="fas fa-arrow-left" nativeBaseIconName="ios-arrow-dropleft" />
						</TouchableOpacity>
						<View style={styles.row}>
							<Text>{moment(this.state.filterTime).format('ddd MM/DD') }</Text>
						</View>
						<TouchableOpacity style={styles.row} onPress={this.nextDate.bind(this)}>
							<FontAwesomeIcon iconClass="fas fa-arrow-right" nativeBaseIconName="ios-arrow-dropright" />
						</TouchableOpacity>
					</View>
					<ScrollView>

					{this.state.loading && <View style={styles.loading}>
							<Text style={styles.innerLoader}><Image source={require('../../img/loading.gif')} style={{width: 60, height: 60}} /></Text>
						</View>
					}

					{curAvailbility && curAvailbility.map((item, index)=>{
						return  <TouchableOpacity style={this.state.selectedTime == item ? styles.fullSelected : styles.full} key={index} onPress={this.booking.bind(this,item)}>
									<Text style={this.state.selectedTime == item ? styles.fullSelectedText : null}>{this.formatDate(item)}</Text>
								</TouchableOpacity>
						})
					}
					</ScrollView>					
				</View>
				<View style={styles.row2}>
					<View style={styles.bottom}>
						<TouchableOpacity onPress={this.onButtonPress2.bind(this)} style={styles.oil}>
							<FontAwesomeIcon iconClass="fas fa-arrow-left" nativeBaseIconName="ios-arrow-dropleft" />
						</TouchableOpacity>
					</View>
					<View style={styles.bottom2}>
						<TouchableOpacity onPress={this.onButtonPress.bind(this)} >
							<FontAwesomeIcon iconClass="fas fa-arrow-right" nativeBaseIconName="ios-arrow-dropright" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
			
		)
	}
}
export default connect(state => ({
  // vehicleForm: state.vehicleForm,
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
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20
	},
	heading: {
		fontSize: 26,
		textAlign: 'center'
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
		backgroundColor: '#21409a',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginBottom: 5
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
		paddingLeft: 20
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
	}
})