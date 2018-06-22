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
	    		'card_exp_date': ''
	    	},
	    	yearList: ["2019","2020","2021","2022","2023"],
	    	monthList: ["1","2","3","4","5","6","7","8","9","10","11","12"],
	    	loading: true,
	    	error: {}
	    };
	}


	onValueChange(key,event){
		const{ cardDetail } = this.state;


	    let fields = ['card_number', 'card_cvc', 'card_exp_date']
    	let formValidation = IsValidForm(fields, this.state.cardDetail)
    	this.setState({ errors: formValidation.errors })
    	if (formValidation.validate) {
    		this.setState({loading: false})
    	}
    	else{
    		this.setState({loading: true})
    	}
      if(key == 'card_exp_date' && cardDetail[key].length < event.length){
        if (event.length == 1) {
          if (parseInt(event) > 1) {
            cardDetail[key] = '0';
          }
          else{
            cardDetail[key] = event;
          }
        }
        else if(event.length == 2){
          if (parseInt(event) > 12) {
            cardDetail[key] = '12/';
          }
          else{
            cardDetail[key] = event+'/';
          }
        }
        else if (event.length > 3){
          cardDetail[key] = event;
          this.setState({cardDetail})
        }
        this.setState({cardDetail})
      }
      else{
        cardDetail[key] = event;
        this.setState({cardDetail})
      }
	}

  validateDate(date){
    if (date.length == 1) {
      if (parseInt(date) > 1) {

      }
    }
    if (data.length == 2) {
      
    }
  }
	onSubmit(){
		let fields = ['card_number', 'card_cvc', 'card_exp_date']
      	let formValidation = IsValidForm(fields, this.state.cardDetail)
      	this.setState({ errors: formValidation.errors })
      	if (formValidation.validate) {
      		this.setState({loading: true})
    			let {cardDetail} = this.state;
          let seprateDate = cardDetail.card_exp_date.split('/')
    			let data = {
    				"card[number]": cardDetail.card_number,
    				"card[cvc]": cardDetail.card_cvc,
    				"card[exp_month]": seprateDate[0],
    				"card[exp_year]": seprateDate[1],
    				"key" : 'pk_test_a6Bqs1yFWSPwBYlDKiYaKcVl'
    			}
          console.log(data);
    			this.props.dispatch(createToken(data)).then(res=>{
            console.log('chl gya sir')
    				this.props.payAmount(res.id)
    				this.setState({loading: false})
    			})
      }	
	}
  

	render(){
		const{ cardDetail, yearList, monthList } = this.state;
    console.log(this.state.cardDetail)
		return(
			<View style={{flex: 1}}>
				<View style={{flex: 3}} >
					<View style={styles.address}>
						<Text style={styles.label}>Card Number</Text>
						<InputBox placeholder="Enter Card number" onChange={this.onValueChange.bind(this,'card_number')} maxLength={16} nextkey="done" keyboardType='numeric' />
					</View>
          <View style={styles.address}>
            <Text style={styles.label}>MM/YY</Text>
            <InputBox placeholder="MM/YY" onChange={this.onValueChange.bind(this,'card_exp_date')} value={cardDetail.card_exp_date} maxLength={5} nextkey="done" keyboardType='numeric'/>
          </View>
					<View style={styles.address}>
						<Text style={styles.label}>CVV</Text>
						<InputBox placeholder="CVC" onChange={this.onValueChange.bind(this,'card_cvc')} maxLength={3} keyboardType='numeric'/>
					</View>
				</View>
				<View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 30}}>
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
  label:{
  	marginBottom: 10,
  	fontSize: 18
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