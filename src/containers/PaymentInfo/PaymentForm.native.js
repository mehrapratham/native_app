import React from 'react'
import {StripeProvider, Elements, CardElement} from 'react-stripe-elements';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import CardForm from './checkout'
import InputBox from '../../components/InputBox'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
import SelectBox from '../../components/SelectBox'
import {createToken} from '../../actions/VehicleForm'
import { connect } from 'react-redux'
import { IsValidForm } from '../../components/Common/validation'
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
	    	monthList: ["1","2","3","4","5","6","7","8","9","10","11","12"],
	    	loading: false,
	    	error: {}
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
		let fields = ['card_number', 'card_cvc', 'card_exp_month', 'card_exp_year']
      	let formValidation = IsValidForm(fields, this.state.cardDetail)
      	this.setState({ errors: formValidation.errors })
      	if (formValidation.validate) {
      		this.setState({loading: true})
			let {cardDetail} = this.state;
			let data = {
				"card[number]": cardDetail.card_number,
				"card[cvc]": cardDetail.card_cvc,
				"card[exp_month]": cardDetail.card_exp_month,
				"card[exp_year]": cardDetail.card_exp_year,
				"key" : 'pk_test_a6Bqs1yFWSPwBYlDKiYaKcVl'
			}
			this.props.dispatch(createToken(data)).then(res=>{
				this.props.payAmount(res.id)
				this.setState({loading: false})
			})
      	}	
	}

	render(){
		const{ cardDetail, yearList, monthList } = this.state;
		return(
			<View>
				<View style={styles.address}>
					<InputBox placeholder="Enter Card number" onChange={this.onValueChange.bind(this,'card_number')} maxLength={16}/>
				</View>
				<View>
					<SelectBox placeholder="MM" list={monthList} selectedValue={cardDetail.card_exp_month} onValueChange={this.onValueChange.bind(this,'card_exp_month')}/>
				</View>
				<View>
					<SelectBox placeholder="YY" list={yearList} selectedValue={cardDetail.card_exp_year} onValueChange={this.onValueChange.bind(this,'card_exp_year')}/>
				</View>
				<View style={styles.address}>
					<InputBox placeholder="CVC" onChange={this.onValueChange.bind(this,'card_cvc')} maxLength={4}/>
				</View>
				<View style={{flex: 1,justifyContent: 'flex-end'}}>
					<ConfirmButton label="Pay now" onButtonPress={this.onSubmit.bind(this)} disabled={this.state.loading}/>
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