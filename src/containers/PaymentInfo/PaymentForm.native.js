import React from 'react'
import {StripeProvider, Elements, CardElement} from 'react-stripe-elements';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import CardForm from './checkout'
import InputBox from '../../components/InputBox'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import SelectBox from '../../components/SelectBox'
import {createToken} from '../../actions/VehicleForm'
import { connect } from 'react-redux'

class PaymentForm extends React.Component{

	constructor() {
	    super();
	    this.state = {
	    	cardDetail: {
	    		'card_number': '',
	    		'card_cvc': '',
	    		'card_exp_month': '',
	    		'card_exp_year': ''
	    	},
	    	yearList: ["2019","2020","2021","2022","2023"],
	    	monthList: ["1","2","3","4","5","6","7","8","9","10","11","12"]
	    };
	}


	onValueChange(key,event){
		const{ cardDetail } = this.state;
		console.log(event)
		cardDetail[key] = event;
	    this.setState({cardDetail});

	}
	onSubmit(){
		console.log('hi')
		let data = {
			"card[number]": '4242424242424242',
			"card[cvc]": '123',
			"card[exp_month]": '03',
			"card[exp_year]": '43',
			"key" : 'pk_test_a6Bqs1yFWSPwBYlDKiYaKcVl'
		}

		this.props.dispatch(createToken(data)).then(res=>{
			this.props.payAmount(res.id)
		})

	}

	render(){
		const{ cardDetail, yearList, monthList } = this.state;
		return(
				<View>
					<View style={styles.address}>
						<InputBox placeholder="Enter Card number" onChange={this.onValueChange.bind(this,'card_number')}/>
					</View>
					
					{/*<View style={styles.text}>
						<View style={styles.text2}>
							<View style={styles.text3}>
								<SelectBox placeholder="MM" list={monthList} selectedValue={cardDetail.card_exp_month} onValueChange={this.onValueChange.bind(this,'card_exp_month')}/>
							</View>
						</View>
						<View style={styles.text4}>
							<View style={styles.text3}>
								<SelectBox placeholder="YY" list={yearList} selectedValue="2" onValueChange={this.onValueChange.bind(this,'card[exp_year]')}/>
							</View>
						</View>
					</View>*/}
					<View>
						<SelectBox placeholder="MM" list={monthList} selectedValue={cardDetail.card_exp_month} onValueChange={this.onValueChange.bind(this,'card_exp_month')}/>
					</View>
					<View>
						<SelectBox placeholder="YY" list={yearList} selectedValue={cardDetail.card_exp_year} onValueChange={this.onValueChange.bind(this,'card_exp_year')}/>
					</View>
					<View style={styles.address}>
						<InputBox placeholder="CVC" onChange={this.onValueChange.bind(this,'card_cvc')}/>
					</View>
					<View style={{flex: 1,justifyContent: 'flex-end'}}>
						<ConfirmButton label="Pay now" onButtonPress={this.onSubmit.bind(this)}/>
					</View>
				</View>

		)
	}
}

export default connect(state => ({
  // vehicleForm: state.vehicleForm,
}, mapDispatch))(PaymentForm);


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
  	width: '100%',
  	paddingLeft: 20,
  	paddingRight: 20
  },
  arrow: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  heading: {
  	fontSize: 26
  },
  payment: {
  	marginBottom: 10,
  	width: '100%'
  },
  row: {
  	marginBottom: 10,
  	width: '100%',
  	flexDirection: 'row'
  },
  cw: {
  	width: '50%'
  },
  placeholder: {
  	width: '99%'
  },
  last: {
  	width: '50%', 
  	alignSelf: 'flex-end', 
  	alignItems: 'flex-end'
  },
  leftArrow: {
  	margin: 24
  },
  oil: {
  	width: 30
  },
  address: {
  	marginBottom: 10,
  	width: '100%'
  },
  text: {
  	marginBottom: 10,
  	width: '100%',
  	flexDirection: 'row'
  },
  text2: {
  	width: '50%',
  },
  text3: {
  	width: '99%'
  },
  text4: {
  	width: '50%', 
  	alignSelf: 'flex-end', 
  	alignItems: 'flex-end'
  }
});