import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

export default class SelectBox extends React.Component{
	onChange(index,value){
		console.log(index,value)
		this.props.onSelectValue(value)
	}

	render(){
		return(
			<RadioGroup style={styles.container} highlightColor="#fff" onSelect= {(index, value) => this.onChange(index, value)}>
				{this.props.list && this.props.list.map((item,key) => {
					return(
						<RadioButton value={item} key={key} style={{marginBottom: 10,backgroundColor: '#fff',height: 50,borderRadius: 5,alignItems: 'center'}}>
				          <Text>{item}</Text>
				        </RadioButton>
					)
				})}
			</RadioGroup>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
  }
});