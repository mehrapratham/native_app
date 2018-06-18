import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

export default class SelectBox extends React.Component{
	onChange(index,value){
		this.props.onSelectValue(value)
	}

	render(){
		let selectedIndex = this.props.value && this.props.list && this.props.list.findIndex(item=> item == this.props.value) || ''
		return(
			<RadioGroup color="#fff" thickness="10" style={styles.container} selectedIndex={selectedIndex && selectedIndex} onSelect= {(index, value) => this.onChange(index, value)}>
				{this.props.list && this.props.list.map((item,key) => {
					return(
						<RadioButton color="#666666" size="30" value={item} key={key} style={styles.view}>
				          <Text style={styles.view2}>{item}</Text>
				        </RadioButton>
					)
				})}
			</RadioGroup>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  view: {
  	marginBottom: 1,
  	height: 40,
  	borderRadius: 5,
  	alignItems: 'center', 
  	borderColor: '#3c3c3c'
  },
  view2: {
  	marginLeft: 15
  }
});