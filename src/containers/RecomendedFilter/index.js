import React from 'react';
import { View, Text, Image,StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import RadioButton from '../../components/Buttons/RadioButton'
import {Link } from '../../Routing'
import FontAwesomeIcon from '../../components/Icon/FontAwesomeIcon'
import {getVehicleFilters} from '../../actions/VehicleForm'
import {getFromLocalStorage,saveToLocalStorage} from '../../components/localStorage'
import { connect } from 'react-redux'
import ArrowLeftButton from '../../components/Buttons/ArrowLeftButton'
import ArrowRightButton from '../../components/Buttons/ArrowRightButton'
import ReactNativeDrawer from '../../components/Common/ReactNativeDrawer'
import FontComponent from '../../components/FontComponent'
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
		const text = "Recomended filter For "+vehicleData.make+" "+vehicleData.model+" "+vehicleData.year
		let child = <View style={styles.container}>
						<StatusBar
					      barStyle="light-content"
					      backgroundColor="blue"
					    />
						<View style={styles.headingCon}>
							<FontComponent style={{fontSize: 26,textAlign: 'center',fontFamily: 'dosis-bold'}} text={text}/>
							<FontComponent style={{fontSize: 20,textAlign: 'center',fontFamily: 'dosis-medium'}} text="( Select one )"/>
						</View>
						<View style={styles.list}>
							<ScrollView style={styles.radio}>
							{this.state.loading ? <View style={styles.loading}>
									<Text style={styles.innerLoader}><Image source={require('../../img/loading.gif')} style={styles.last2} /></Text>
								</View>:
							<RadioButton list={filters && filters} value={this.state.selectedFilterType} onSelectValue={this.onChange.bind(this)}/>
							}
							{filters && filters.length == 0 && <FontComponent style={{textAlign: 'center',color: '#fff',fontSize: 22,fontFamily: 'dosis-bold'}} text="No OilType to show"/>}
							</ScrollView>
							<View style={styles.img}>
								<View style={styles.outerView}>
									<Image source={require('../../img/oiltype.jpeg')} style={styles.imgView}/>
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
	},
	outerView: {
		width: 100,
		height: 150,
		overflow: 'hidden'
	},
	imgView: {
		width: '100%',
		height: '100%'
	}
	
})
