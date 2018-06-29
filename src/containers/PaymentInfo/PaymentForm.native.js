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
import {getFromLocalStorage,saveToLocalStorage,removeLocalStorage} from '../../components/localStorage'
import {stripeKey} from '../../actions/remoteAPIKeys'
import ArrowLeftButton from '../../components/Buttons/ArrowLeftButton'
import ArrowRightButton from '../../components/Buttons/ArrowRightButton'

class PaymentForm extends React.Component{

	constructor() {
	    super();
	    this.state = {
	    	cardDetail: {
	    		'card_number': '',
	    		'card_cvc': '',
	    		'card_exp_date': ''
	    	},
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
    				"key" : stripeKey
    			}
    			this.props.dispatch(createToken(data)).then(res=>{
    				this.props.payAmount(res.id)
    				this.setState({loading: false})
    			})
      }	
	}
  onButtonPress2() {
      this.props.history.push('/summary');
    }
	render(){
		const{ cardDetail } = this.state;
		return(
			<View style={styles.container}>
				<View style={styles.text7}>
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
				<View style={styles.secondCon}>
          <View style={styles.text5}><Text style={styles.text6}>enter card info to confirm booking, (you won't be charged until after service completion)</Text></View>
          
          <View style={styles.container}>
					<ConfirmButton label="Confirm Booking" onButtonPress={this.onSubmit.bind(this)}/>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <View style={styles.last4}>
              <ArrowLeftButton onPress={this.onButtonPress2.bind(this)} />
            </View>
            {/*<View style={styles.last4}>
              <ArrowRightButton onPress={this.onButtonPress.bind(this)} disabled={this.state.selectedTime && !this.state.selectedTime.start} />
            </View>*/}
          </View>

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
  },
  text5: {
    flex: 1,
    justifyContent: 'center'
  },
  text6: {
    fontSize: 16,
    textAlign: 'center'
  },
  secondCon: {
    flex: 2
  },
  text7: {
    flex: 3
  },
  last4: {
    width: '50%', 
    alignSelf: 'flex-start'
  }
});