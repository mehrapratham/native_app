import React from 'react'
import {StripeProvider, Elements, CardElement} from 'react-stripe-elements';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
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
import ToastComponent from '../../components/ToastComponent'
import FontComponent from '../../components/FontComponent'
class PaymentForm extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
    	cardDetail: {
    		'card_number': '',
    		'card_cvc': '',
    		'card_exp_date': ''
    	},
    	loading: true,
    	error: {},
      showToast: false,
      toastmsg: ''
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

  isValidCardNo(){
    var cardvalidate = require('credit-card-validation')
    card = cardvalidate(this.state.cardDetail.card_number);
    return card.isValid()
  }
	onSubmit(){
		let fields = ['card_number', 'card_cvc', 'card_exp_date']
      	let formValidation = IsValidForm(fields, this.state.cardDetail)
      	this.setState({ errors: formValidation.errors })
      	if (formValidation.validate) {
      		this.setState({loading: true})
    			let {cardDetail} = this.state;
          let seprateDate = cardDetail.card_exp_date.split('/')
          let isValidCard = this.isValidCardNo()
          if(isValidCard){
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
          }else{
            this.setState({ showToast: true,toastmsg: "Please enter valid card number"})
            setTimeout(() => {
              this.setState({ showToast: false})
            }, 3000)
          }
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
            <FontComponent style={{marginBottom: 10,fontSize: 18,fontFamily: 'dosis-medium'}} text="Card Number"/>
						<InputBox placeholder="Enter Card number" onChange={this.onValueChange.bind(this,'card_number')} maxLength={16} nextkey="done" keyboardType='numeric' />
					</View>
          <View style={styles.address}>
            <FontComponent style={{marginBottom: 10,fontSize: 18,fontFamily: 'dosis-medium'}} text="MM/YY"/>
            <InputBox placeholder="MM/YY" onChange={this.onValueChange.bind(this,'card_exp_date')} value={cardDetail.card_exp_date} maxLength={5} nextkey="done" keyboardType='numeric'/>
          </View>
					<View style={styles.address}>
						<FontComponent style={{marginBottom: 10,fontSize: 18,fontFamily: 'dosis-medium'}} text="CVV"/>
						<InputBox placeholder="CVC" onChange={this.onValueChange.bind(this,'card_cvc')} maxLength={3} keyboardType='numeric'/>
					</View>
				</View>
				<View style={styles.secondCon}>          
          <View>
					 <ConfirmButton label="Confirm Booking" onButtonPress={this.onSubmit.bind(this)}/>
          </View>
          <View style={styles.nextButton}>
            <View style={styles.last4}>
              <ArrowLeftButton onPress={this.onButtonPress2.bind(this)} />
            </View>
          </View>
				</View>
     
        {this.state.showToast && this.state.toastmsg?<ToastComponent msg={this.state.toastmsg}/>: null}
			</View>
		)
	}
}
export default connect(state => ({
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
  	marginBottom: 2,
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
    
  },
  text7: {
    flex: 1,
    paddingBottom: 20,
  },
  last4: {
    width: '50%', 
    alignSelf: 'flex-start'
  },
  nextButton: {
    marginBottom: 10
  }
});